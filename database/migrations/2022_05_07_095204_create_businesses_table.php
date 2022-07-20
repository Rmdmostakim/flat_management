<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusinessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->string('gas_single',$precision = 8, $scale = 2)->nullable();
            $table->string('gas_double',$precision = 8, $scale = 2)->nullable();
            $table->string('electricity',$precision = 8, $scale = 2)->nullable();
            $table->string('water',$precision = 8, $scale = 2);
            $table->string('garbage',$precision = 8, $scale = 2);
            $table->string('security',$precision = 8, $scale = 2);
            $table->string('internet',$precision = 8, $scale = 2);
            $table->string('dish_antenna',$precision = 8, $scale = 2);
            $table->string('service_charge',$precision = 8, $scale = 2);
            $table->string('others',$precision = 8, $scale = 2);
            $table->smallInteger('type');
            $table->smallInteger('house_id')->nullable();
            $table->smallInteger('flat_id')->nullable();
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
        Schema::dropIfExists('businesses');
    }
}
