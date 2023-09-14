<?php

namespace App\Http\Controllers\Api\Authenticated\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Evento;
use App\Models\ObrigacaoEmpresa;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class BuscaCompromissosDashboardController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $date = request('date');
        $date = $date? @Carbon::parse($date) : null;
        $limite = request('limite', 10);
        $pagina = request('pagina', 1);
        $offset = ($pagina - 1) * $limite;
        $builder = ObrigacaoEmpresa::query()
            ->with('empresa', 'obrigacao')
            ->where('status', '0')
            ->when($date, static function ($q) use ($date) {
                $q->whereDate('date', $date);
            });
        $obrigacoes = (clone $builder)
            ->offset($offset)
            ->limit($limite)
            ->orderBy('date')
            ->get()
            ->map(static function ($obrigacao) {
                if (optional($obrigacao->obrigacao)->date) {
                    $date = Carbon::parse($obrigacao->obrigacao->date);
                    $obrigacao->obrigacao->proximo = today()->gt($date) || today()->diffInDays($date, false) < 7;
                }
                return $obrigacao;
            })
            ->filter(function ($obrigacao) {
                return $obrigacao->empresa;
            });
        $total = (clone $builder)->count();
        $totalPaginas = ceil($total / $limite);
        $eventos = Evento::query()
            ->whereDate('data_inicio', '>=', today()->startOfMonth())
            ->whereDate('data_fim', '<=', today()->endOfMonth())
            ->get();
        return response()->json(compact('obrigacoes', 'eventos', 'total', 'totalPaginas'));
    }
}
