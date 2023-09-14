<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ObrigacaoEmpresa extends Model
{
    protected $table = 'obrigacao_empresas';

    protected $fillable = [
        'empresa_id',
        'obrigacao_id',
        'date',
        'status',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function obrigacao()
    {
        return $this->belongsTo(Obrigacao::class, 'obrigacao_id');
    }
}
