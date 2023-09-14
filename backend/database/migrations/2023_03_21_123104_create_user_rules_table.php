<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserRulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_rule', static function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('description', 255);
            $table->string('slug', 100);
            $table->timestamps();
        });

        \App\Models\UserRule::query()->insert([
            ['name' => 'Administrador', 'description' => 'Usuário com acesso total ao sistema', 'slug' => 'admin', 'created_at' => now()],
            ['name' => 'Aluno(a)', 'description' => 'Usuário com acesso limitado ao sistema', 'slug' => 'aluno', 'created_at' => now()],
            ['name' => 'Professor(a)', 'description' => 'Usuário com acesso limitado ao sistema', 'slug' => 'professor', 'created_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users_rule');
    }
}
