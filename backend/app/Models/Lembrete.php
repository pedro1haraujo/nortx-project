<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lembrete extends Model
{
    protected $table = 'lembretes';

    protected $fillable = [
        'titulo',
        'descricao',
        'date',
    ];
}
