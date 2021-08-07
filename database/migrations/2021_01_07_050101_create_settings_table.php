<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->string('sub_title');
            $table->string('list_title');
            $table->boolean('is_chart_enabled')->default(0)->comment('1: Enable; 0: Disable');
            $table->string('chart_type');
            $table->boolean('is_table_enabled')->default(0)->comment('1: Enable; 0: Disable');
            $table->string('product_page_modal');
            $table->string('floating_logo_path');
            $table->string('logo_display_position');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete("CASCADE")->onUpdate("No ACTION");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
