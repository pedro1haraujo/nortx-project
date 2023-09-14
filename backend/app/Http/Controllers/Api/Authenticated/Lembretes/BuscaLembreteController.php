<?php

namespace App\Http\Controllers\Api\Authenticated\Lembretes;

use App\Http\Controllers\Controller;
use App\Models\Lembrete;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BuscaLembreteController extends Controller
{
    public function __invoke(int $lembreteId): JsonResponse
    {
        $lembrete = Lembrete::query()->find($lembreteId);
        if (!$lembrete) {
            return response()->json(['message' => 'Lembrete não encontrado'], 404);
        }
        return response()->json(compact('lembrete'));
    }
}
