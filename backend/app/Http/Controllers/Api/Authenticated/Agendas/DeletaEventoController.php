<?php

namespace App\Http\Controllers\Api\Authenticated\Agendas;

use App\Http\Controllers\Controller;
use App\Models\Evento;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeletaEventoController extends Controller
{
    public function __invoke(int $eventoId): JsonResponse
    {
        $evento = Evento::find($eventoId);
        if (!$evento) {
            return response()->json(['message' => 'Evento não encontrado'], 404);
        }
        $evento->delete();
        return response()->json(['message' => 'Evento deletado com sucesso']);
    }
}
