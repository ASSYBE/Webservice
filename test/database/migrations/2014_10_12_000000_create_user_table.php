<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nom');
            $table->string("prenom");
            $table->string('email')->unique();
            $table->string('cin')->unique();
            $table->date('date_naissance');
            $table->string('adresse');
            $table->string("telephone");
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string("etape")->default(1);
            $table->string('status');
            $table->date("date_validation");
            $table->string('type_beneficier');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user');
    }
};
