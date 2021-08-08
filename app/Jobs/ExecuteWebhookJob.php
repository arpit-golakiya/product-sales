<?php

namespace App\Jobs;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Webhook;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ExecuteWebhookJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $webhookId;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($webhookId)
    {
        $this->webhookId = $webhookId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
    //  $webhook = Webhook::where('is_executed',1)->find($this->webhookId);
        $webhook = Webhook::find($this->webhookId);
        if($webhook) {
            if ($webhook->topic == "orders/create") {
                $this->orderCreate($webhook);
            }
            elseif ($webhook->topic == "themes/update"){
                $this->themeUpdate($webhook);
            }
        }
    }

    /**
     * @param $webhook
     *
     *
     */
    public function orderCreate($webhook){
        Log::info('ExecuteWebhookJob/orderCreate started');
        $data = json_decode($webhook->data, 1);
        $customerDetail = isset($data['customer']) ? $data['customer'] : "";
        $products = isset($data['line_items']) ? $data['line_items'] : "";
        $buyerName='';
        if(isset($customerDetail['first_name']) && isset($customerDetail['last_name']))
        {
            $buyerName = $customerDetail['first_name']." ".$customerDetail['last_name'];
        }
        if(isset($data['shipping_address']['first_name']) && isset($data['shipping_address']['last_name']))
        {
            $buyerName = $data['shipping_address']['first_name']." ".$data['shipping_address']['last_name'];
        }
        try {
                foreach ($products as $product){
                    Transaction::create([
                        'user_id'=> $webhook->user_id,
                        'shopify_order_id' => $webhook->shopify_id,
                        'shopify_product_id' => $product['product_id'],
                        'shopify_variant_id' => $product['variant_id'],
                        'shopify_customer_id' => $customerDetail['id']??0,
                        'buyer_name' => $buyerName ?? '',
                        'quantity' => $product['quantity'],
                        'country' => $data['shipping_address']['country'] ?? $customerDetail['default_address']['country']??'',
                        'date' => Carbon::parse($data['created_at'])->format('Y-m-d H:i:s'),
                        'order_details' => $webhook->data
                    ]);
                }
        }catch (\Exception $exception)
        {
           Log::info('ExecuteWebhookJob/orderCreate ended with Error');
           Log::error($exception->getMessage());
        }
        Log::info('ExecuteWebhookJob/orderCreate ended');

    }

    /**
     * @param $webhook
     *
     *
     * @return string
     */
    public function themeUpdate($webhook){
        Log::info('Webhook ThemeUpdate Started');
        $userId =  $webhook->user_id;
        $shop = User::findOrFail($userId);
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
        \Log::info($shop->name);
        $sh_theme = $shop->api()->rest('GET', '/admin/themes.json',['role' => 'main']);

        $main_theme = $sh_theme['body']->container['themes'][0]['id'];

        $parameter['asset']['key'] = 'snippets/transaction-app.liquid';
        $parameter['asset']['value'] = $value;

        //check if panther-label file already exist
        $isFileExist = $shop->api()->rest('GET', '/admin/themes/'.$main_theme.'/assets.json', $parameter);
        if ($isFileExist['errors'] === false) {
            return "Error :- contents found!";
        }

        // add new liquid file ( transaction-app )
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
            }
        }
    }
}
