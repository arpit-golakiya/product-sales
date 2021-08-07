<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary()->nullable(false);
            $table->string('first_name')->nullable(false);
            $table->string('last_name')->nullable(false);
            $table->string('phone')->nullable(false);
            $table->string('email')->nullable(false);
            $table->string('company')->nullable(false);
            $table->string('address1')->nullable(false);
            $table->string('address2')->nullable(false);
            $table->string('city')->nullable(false);
            $table->string('province')->nullable(false);
            $table->string('country')->nullable(false);
            $table->string('zip')->nullable(false);
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
        Schema::dropIfExists('customers');
    }
}
