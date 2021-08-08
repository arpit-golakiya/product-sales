<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Log;
use Osiset\ShopifyApp\Actions\CancelCurrentPlan;
use Osiset\ShopifyApp\Contracts\Commands\Shop as IShopCommand;
use Osiset\ShopifyApp\Contracts\Queries\Shop as IShopQuery;
class AppUninstalledJob extends \Osiset\ShopifyApp\Messaging\Jobs\AppUninstalledJob
{
    public function handle(
        IShopCommand $shopCommand,
        IShopQuery $shopQuery,
        CancelCurrentPlan $cancelCurrentPlanAction
    ): bool {
        Log::Info("=============== APP UNINSTALL JOB ==================");
        return parent::handle($shopCommand, $shopQuery,
            $cancelCurrentPlanAction);
    }
}
