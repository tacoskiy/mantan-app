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
        Schema::create('msessions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('status');
            $table->datetime('datetime');
            $table->datetime('end_at');
            $table->decimal('total_price');
            $table->integer('table_number');

            $table->uuid('table_id');
            $table->foreign('table_id')
                ->references('id')
                ->on('tables')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('msessions');
    }
};
