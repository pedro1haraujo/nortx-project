<?php

namespace App\Http\Controllers\Api\Authenticated\Lembretes;

use App\Http\Controllers\Controller;
use App\Models\Lembrete;
use App\Models\Notificacao;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BuscaTodosOsLembretesController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $lembretes = Notificacao::query()->where('lida', '0')->get();
        return response()->json(compact('lembretes'));
    }
}
