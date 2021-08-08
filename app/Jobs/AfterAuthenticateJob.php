<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Webhook;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class AfterAuthenticateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public $shopDomain;

    /**
     * AfterAuthenticateJob constructor.
     * @param $shopDomain
     */
    public function __construct($shopDomain)
    {
        $this->shopDomain = $shopDomain['name'];
    }

    /**
     *
     *
     * @return bool
     */
    public function handle()
    {
        set_time_limit(0);
        // Convert domain
        $shop = User::where('name', $this->shopDomain)->firstOrFail();
        $this->saveShopTimeZone($shop);
        $this->snippet($shop);
        if($shop->is_sync==0){
            $response = $shop->api()->rest('GET', "/admin/orders.json", ["limit" => 250, 'status' => 'any']);
            self::getOrders($shop, $response);
        }
        Log::info('AfterAuthorizeJob/handler ended');
        return true;
        // Do what you wish with the data
        // Access domain name as $this->shopDomain->toNative()
    }

    /**
     * @param $shop
     *
     *
     */
    public function saveShopTimeZone($shop)
    {
        Log::info("TimeZone Saved----------------------------------");
        $response = $shop->api()->rest('GET', "/admin/shop.json");
        if(!$response['errors']){
            $shop->timezone =$response['body']->container['shop']['iana_timezone'];
            $shop->save();
        }
    }

    /**
     * @param $shop
     * @param $response
     *
     *
     * @return bool
     */
    public static function getOrders($shop, $response)
    {
        Log::info('AfterAuthorizeJob/getOrders started');
        if(!$response['errors']){
            foreach($response['body']->container['orders'] as $order){
                $data = json_encode($order);
                $shopify_id = $order['id'];
                $entity = Webhook::updateOrCreate(
                    ['shopify_id' => $shopify_id, 'topic' => 'orders/create', 'user_id' => $shop->id],
                    ['shopify_id' => $shopify_id, 'topic' => 'orders/create', 'user_id' => $shop->id, 'data' => $data, 'tags' => 'last_60_days_orders']
                );
                ExecuteWebhookJob::dispatch($entity->id);
            }
            $nextPage = false;
            if($response['link'] != null)
                $nextPage =  explode(";", $response['link']->container['next'])[0];
            if($nextPage)
            {
                $response = $shop->api()->rest('GET', "/admin/orders.json", ["limit" => 250, 'page_info' => $nextPage]);
                self::getOrders($shop,$response);
            }else
            {
                $shop->is_sync = 1;
                $shop->save();
            }
            Log::info('AfterAuthorizeJob/getOrders ended');
            return true;
        }
    }

    /**
     * @param $shop
     *
     *
     * @return string
     */
    public function snippet($shop)
    {
        Log::info('IN----------SNIPPET-------METHOD');
        $value = <<<EOF
        <script id="transaction-app" type="application/json">
            {
                "shop": {
                    "domain": "{{ shop.domain }}",
                    "permanent_domain": "{{ shop.permanent_domain }}",
                    "url": "{{ shop.url }}",
                    "secure_url": "{{ shop.secure_url }}",
                    "money_format": {{ shop.money_format | json }},
                    "currency": {{ shop.currency | json }}
                },
                "customer": {
                    "id": {{ customer.id | json }},
                    "tags": {{ customer.tags | json }}
                },
                "cart": {{ cart | json }},
                "template": "{{ template | split: "." | first }}",
                "product": {{ product | json }},
                "collection": {{ collection.products | json }}
            }
        </script>
EOF;
        Log::info($shop->name);
        $sh_theme = $shop->api()->rest('GET', '/admin/api/themes.json',['role' => 'main']);
        $main_theme = $sh_theme['body']->container['themes'][0]['id'];

        $parameter['asset']['key'] = 'snippets/transaction-app.liquid';
        $parameter['asset']['value'] = $value;

        //check if panther-label file already exist
        $isFileExist = $shop->api()->rest('GET', '/admin/themes/'.$main_theme.'/assets.json', $parameter);
        if ($isFileExist['errors'] === false) {
            return "Error :- contents found!";
        }

        // add new liquid file ( panther-label )
        $asset = $shop->api()->rest('PUT', '/admin/themes/'.$main_theme.'/assets.json',$parameter);
        // include that liquid file in theme file
        $asset = $shop->api()->rest('GET', '/admin/themes/'.$main_theme.'/assets.json',["asset[key]" => 'layout/theme.liquid']);
        if(@$asset['body']->container['asset']) {
            $asset = $asset['body']->container['asset']['value'];

            // check if already included
            if(!strpos($asset ,"{% include 'transaction-app' %}")) {
                $asset = str_replace('</head>',"{% include 'transaction-app' %}</head> ",$asset);
                $parameter = [];
                $parameter['asset']['key'] = 'layout/theme.liquid';
                $parameter['asset']['value'] = $asset;
                $asset = $shop->api()->rest('PUT', '/admin/themes/'.$main_theme.'/assets.json',$parameter);
                Log::info('IN----------SNIPPET-------METHOD----------END');
            }
        }
    }
}
