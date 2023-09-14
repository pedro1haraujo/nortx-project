<?php

namespace App\Http\Controllers\Api\Authenticated\Empresas;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use App\Models\Obrigacao;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BuscaEmpresaController extends Controller
{
    public function __invoke(int $empresaId): JsonResponse
    {
        $empresa = Empresa::query()->where('id', $empresaId)->first();
        if (!$empresa) {
            return response()->json(['message' => 'Empresa não encontrada'], 404);
        }
        $obrigacoes = Obrigacao::all();
        $obrigacoes_empresa = $empresa->obrigacoes()->pluck('obrigacao_id')->unique()->values()->toArray();
        $proprietario = $empresa->proprietario()->first();
        $socios = $empresa->socios()->get();
        return response()->json([
            'empresa' => $empresa,
            'obrigacoes' => $obrigacoes,
            'obrigacoes_empresa' => $obrigacoes_empresa,
            'proprietario' => $proprietario,
            'socios' => $socios,
        ]);
    }
}
