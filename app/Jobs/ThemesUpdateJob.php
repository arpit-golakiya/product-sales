<?php namespace App\Jobs;

use App\Models\User;
use App\Models\Webhook;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use stdClass;

class ThemesUpdateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Shop's myshopify domain
     *
     * @var ShopDomain|string
     */
    public $shopDomain;

    /**
     * The webhook data
     *
     * @var object
     */
    public $data;

    /**
     * Create a new job instance.
     *
     * @param string   $shopDomain The shop's myshopify domain.
     * @param stdClass $data       The webhook data (JSON decoded).
     *
     * @return void
     */
    public function __construct($shopDomain, $data)
    {
        $this->shopDomain = $shopDomain;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Convert domain
//        $this->shopDomain = ShopDomain::fromNative($this->domain);

        // Do what you wish with the data
        // Access domain name as $this->shopDomain->toNative()


        Log::Info("=============== Theme Update Webhook ==================");
        // Convert domain
        $shop = User::where('name',$this->shopDomain)->first();
        Log::info("ShopDomain------------------". json_encode($this->shopDomain));
        Log::info("Shop------------------------". json_encode($shop));
        Log::info("---- ThemeUpdatedJob");
        $data = json_encode($this->data);

        $shopify_id = $this->data->id;

        Webhook::updateOrCreate(
            ['shopify_id' => $shopify_id, 'topic' => 'themes/update', 'user_id' => $shop->id],
            ['shopify_id' => $shopify_id, 'topic' => 'themes/update', 'user_id' => $shop->id, 'data' => $data]
        );
        $entity = Webhook::where([['shopify_id',$shopify_id],['topic','themes/update'],['user_id',$shop->id]])->first();
        ExecuteWebhookJob::dispatch($entity->id);
//        return response('', 200);
    }
}
