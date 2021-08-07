<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('shopify_order_id');
            $table->unsignedBigInteger('shopify_product_id');
            $table->unsignedBigInteger('shopify_variant_id');
            $table->unsignedBigInteger('shopify_customer_id');
            $table->string('buyer_name');
            $table->string('country');
            $table->unsignedInteger('quantity');
            $table->dateTime('date');
            $table->longText('order_details');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
