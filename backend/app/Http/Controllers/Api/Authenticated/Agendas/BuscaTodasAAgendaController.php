<?php

namespace App\Http\Controllers\Api\Authenticated\Agendas;

use App\Http\Controllers\Controller;
use App\Models\Evento;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BuscaTodasAAgendaController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $eventos = Evento::query()->with('empresa')->orderByDesc('id')->get();
        return response()->json(compact('eventos'));
    }
}
