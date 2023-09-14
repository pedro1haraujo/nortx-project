<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $table = 'empresas';
    protected $fillable = [
        'nome',
        'cnpj',
        'endereco',
        'numero',
        'bairro',
        'cidade',
        'estado',
        'telefone',
        'email',
        'inscricao_municipal',
        'inscricao_estadual',
    ];

    public function proprietario()
    {
        return $this->hasOne(Socio::class, 'empresa_proprietaria_id');
    }

    public function socios()
    {
        return $this->hasMany(Socio::class, 'empresa_socio_id');
    }

    public function obrigacoes()
    {
        return $this->belongsToMany(Obrigacao::class, 'obrigacao_empresas', 'empresa_id', 'obrigacao_id');
    }
}
