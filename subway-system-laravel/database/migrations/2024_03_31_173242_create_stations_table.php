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
        Schema::create('stations', function (Blueprint $table) {
            $table->id();
            $table->foreignId("branch_id")->references("id")->on("branches")->cascadeOnDelete();
            $table->string("name");
            $table->text("facilities");
            $table->string("operating_hours");
            $table->enum("service_status", ["active", "closed"])->default("active");
            $table->double("latitude");
            $table->double("longitude");
            $table->float("average_rating")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stations');
    }
};
