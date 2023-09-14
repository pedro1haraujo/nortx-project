<?php

namespace App\Http\Controllers\Api\Authenticated\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ObrigacaoEmpresa;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AtualizaCompromissoDashboardController extends Controller
{
    public function __invoke(int $compromissoId): JsonResponse
    {
        $status = request()->validate([
            'status' => 'required|boolean|in:0,1'
        ])['status'];
        $obrigacao = ObrigacaoEmpresa::query()->find($compromissoId);
        if (!$obrigacao) {
            return response()->json([
                'status' => false,
                'message' => 'Compromisso não encontrado'
            ], 404);
        }
        $obrigacao->update(['status' => $status,]);
        return response()->json(true);
    }
}
