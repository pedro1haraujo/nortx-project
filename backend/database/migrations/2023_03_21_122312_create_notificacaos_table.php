<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificacaosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notificacoes', static function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->integer('obrigacao_empresa_id')->nullable();
            $table->string('titulo');
            $table->string('descricao');
            $table->tinyInteger('lida')->default(0);
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
        Schema::dropIfExists('notificacoes');
    }
}
