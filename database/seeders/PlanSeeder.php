<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \DB::table('plans')->truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1');

        \DB::table('plans')->insert(
            [
                [
                    'type' => "RECURRING",
                    'name' => env('PLAN_NAME'),
                    'price' => env('PLAN_PRICE'),
                    'interval' => 'EVERY_30_DAYS',
                    'capped_amount' => 0.00,
                    'terms' => env('PLAN_TERMS'),
                    'trial_days' => env('PLAN_TRIAL_DAYS'),
                    'test' => env('PLAN_TEST'), // 1 = Display test banner, 0 = it will hide that banner
                    'on_install' => env('PLAN_ON_INSTALL') // Means on app installation it will redirect you to "Approve subscription" page
                ]
            ]
        );
    }
}
