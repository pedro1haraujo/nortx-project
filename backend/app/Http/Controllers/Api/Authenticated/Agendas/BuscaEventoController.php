<?php

namespace App\Http\Controllers\Api\Authenticated\Agendas;

use App\Http\Controllers\Controller;
use App\Models\Evento;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BuscaEventoController extends Controller
{
    public function __invoke(int $eventoId): JsonResponse
    {
        $evento = Evento::query()->where('id', $eventoId)->first();
        if (!$evento) {
            return response()->json(['message' => 'Evento não encontrado'], 404);
        }
        return response()->json(compact('evento'));
    }
}
