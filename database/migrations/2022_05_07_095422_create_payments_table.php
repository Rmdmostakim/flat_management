<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('tenant_id');
            $table->double('gas',$precision = 8, $scale = 2);
            $table->double('electricity',$precision = 8, $scale = 2);
            $table->double('water',$precision = 8, $scale = 2);
            $table->double('garbage',$precision = 8, $scale = 2);
            $table->double('security',$precision = 8, $scale = 2);
            $table->double('internet',$precision = 8, $scale = 2);
            $table->double('dish_antenna',$precision = 8, $scale = 2);
            $table->double('service',$precision = 8, $scale = 2);
            $table->double('others',$precision = 8, $scale = 2);
            $table->double('rent',$precision = 8, $scale = 2);
            $table->double('total',$precision = 8, $scale = 2);
            $table->double('paid',$precision = 8, $scale = 2);
            $table->double('due',$precision = 8, $scale = 2);
            $table->double('meter_reading',$precision = 8, $scale = 2);
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
        Schema::dropIfExists('payments');
    }
}
