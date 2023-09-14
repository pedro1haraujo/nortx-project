<?php

namespace App\Http\Controllers\Api\Authenticated\Empresas;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BuscaTodasAsEmpresasController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $limite = (int) request()->get('limite', 10);
        $pagina = request()->get('pagina', 1);
        $search = request()->get('search', null);
        $only = request()->get('only', '[]');
        $only = json_decode($only, true);
        $onlyAccepted = ['id', 'nome', 'cnpj', 'endereco', 'numero', 'bairro', 'cidade', 'estado', 'telefone', 'email', 'inscricao_municipal', 'inscricao_estadual'];
        $only = array_filter($only, static function ($item) use ($onlyAccepted) {
            return in_array($item, $onlyAccepted, true);
        });
        $only = $only? array_values($only): $onlyAccepted;
        $limite = $search? 200000: $limite;
        $offset = ($pagina - 1) * $limite;
        $empresas  = Empresa::query()
            ->offset($offset)
            ->limit($limite)
            ->select($only)
            ->when($search, function ($query, $search) {
                $query->where('nome', 'like', "%{$search}%")
                    ->orWhere('cnpj', 'like', "%{$search}%")
                    ->orWhere('endereco', 'like', "%{$search}%")
                    ->orWhere('numero', 'like', "%{$search}%")
                    ->orWhere('bairro', 'like', "%{$search}%")
                    ->orWhere('cidade', 'like', "%{$search}%")
                    ->orWhere('estado', 'like', "%{$search}%")
                    ->orWhere('telefone', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('inscricao_municipal', 'like', "%{$search}%")
                    ->orWhere('inscricao_estadual', 'like', "%{$search}%");
            })
            ->orderByDesc('id')
            ->get();
        $total = Empresa::query()->count();
        $totalPaginas = ceil($total / $limite);
        return response()->json([
            'empresas' => $empresas,
            'total' => $total,
            'pagina' => $pagina,
            'total_paginas' => $totalPaginas,
            'limite' => $limite,
        ]);
    }
}
