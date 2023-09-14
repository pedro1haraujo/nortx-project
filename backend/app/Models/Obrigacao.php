<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Obrigacao extends Model
{
    protected $table = 'obrigacoes';
    protected $fillable = [
        'titulo',
        'descricao',
        'dia',
        'mes'
    ];
}
