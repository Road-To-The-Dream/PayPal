<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsCharacteristicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products_characteristics', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->integer('product_id');
            $table->integer('characteristic_id');
            $table->string('value');
            $table->foreign('product_id')
                ->references('id')->on('products')
                ->onDelete('cascade');
            $table->foreign('characteristic_id')
                ->references('id')->on('characteristics')
                ->onDelete('cascade');
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
        Schema::dropIfExists('products_characteristics');
    }
}
