<?php

namespace App\Http\Controllers\Api\Authenticated\Agendas;

use App\Http\Controllers\Controller;
use App\Models\Evento;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AtualizaEventoController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $eventoData = request('evento');
        $eventoId = $eventoData['id'];
        $eventoData = collect($eventoData)->only([
            'titulo', 'empresa_id', 'plataforma_reuniao', 'link_reuniao', 'descricao', 'data_inicio', 'data_fim'
        ])->toArray();
        $evento = Evento::query()->where('id', $eventoId)->first();
        if (!$evento) {
            $evento = Evento::query()->create($eventoData);
            return response()->json(compact('evento'));
        }
        $evento->update($eventoData);
        return response()->json(compact('evento'));
    }
}
