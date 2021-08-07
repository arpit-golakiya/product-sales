<?php

namespace App\Jobs;

class AppUninstalledJob extends \Osiset\ShopifyApp\Messaging\Jobs\AppUninstalledJob
{
        Log::Info("=============== APP UNINSTALL JOB ==================");
//     public function handle(
//         IShopCommand $shopCommand,
//         IShopQuery $shopQuery,
//         CancelCurrentPlan $cancelCurrentPlanAction
//     ): bool {
//         Log::Info("=============== APP UNINSTALL JOB ==================");
//         return parent::handle($shopCommand, $shopQuery,
//             $cancelCurrentPlanAction);
    }
}
