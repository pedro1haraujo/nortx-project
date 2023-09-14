<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Socio extends Model
{
    protected $table = 'socios';
    protected $fillable = [
        'nome',
        'cpf',
        'empresa_proprietaria_id',
        'empresa_socio_id',
        'data_nascimento',
        'telefone',
        'celular',
        'endereco',
        'numero',
        'bairro',
    ];
}
