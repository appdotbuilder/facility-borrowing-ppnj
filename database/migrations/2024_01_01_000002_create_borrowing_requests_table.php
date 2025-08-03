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
        Schema::create('borrowing_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('building_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->string('organization');
            $table->string('contact_person');
            $table->string('contact_phone');
            $table->date('request_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('expected_participants');
            $table->text('equipment_needed')->nullable();
            $table->string('pdf_attachment')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected', 'scheduled'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users');
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index(['building_id', 'request_date']);
            $table->index('status');
            $table->index('request_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('borrowing_requests');
    }
};