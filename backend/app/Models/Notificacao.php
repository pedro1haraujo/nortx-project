<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificacao extends Model
{
    protected $table = 'notificacoes';
    protected $fillable = [
        'id', 'user_id', 'obrigacao_empresa_id', 'titulo', 'descricao', 'lida', 'created_at', 'updated_at'
    ];
}
