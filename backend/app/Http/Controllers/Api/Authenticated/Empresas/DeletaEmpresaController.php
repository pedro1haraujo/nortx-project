<?php

namespace App\Http\Controllers\Api\Authenticated\Empresas;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use App\Models\Evento;
use App\Models\Notificacao;
use App\Models\ObrigacaoEmpresa;
use App\Models\Socio;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeletaEmpresaController extends Controller
{
    public function __invoke(int $empresaId): JsonResponse
    {
        $empresa = Empresa::query()->find($empresaId);
        if (!$empresa) {
            return response()->json(['message' => 'Empresa não encontrada'], 404);
        }
        $obrigacoesEmpresa = ObrigacaoEmpresa::query()->where('empresa_id', $empresaId)->get();
        Notificacao::query()->whereIn('obrigacao_empresa_id', $obrigacoesEmpresa->pluck('id')->toArray())->delete();
        Socio::query()->where('empresa_proprietaria_id', $empresaId)->delete();
        Evento::query()->where('empresa_id', $empresaId)->delete();
        $obrigacoesEmpresa->each(function ($obrigacao) {
            $obrigacao->delete();
        });
        $empresa->delete();
        return response()->json(['message' => 'Empresa deletada com sucesso']);
    }
}
