<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rides', function (Blueprint $table) {
            $table->id();
            $table->foreignId("start_station_id")->references("id")->on("stations")->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId("end_station_id")->references("id")->on("stations")->cascadeOnDelete()->cascadeOnUpdate();
            $table->time("start_time");
            $table->time("end_time");
            $table->integer("capacity");
            $table->enum('status', ['ongoing', 'delyaed', 'canceled'])->default('ongoing');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rides');
    }
};
