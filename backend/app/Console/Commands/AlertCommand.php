<?php

namespace App\Console\Commands;

use App\Models\Notificacao;
use App\Models\ObrigacaoEmpresa;
use Carbon\Carbon;
use Illuminate\Console\Command;

class AlertCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'alert';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cria alertas para as demandas que estão com prazo de entrega vencido ou que estão com prazo de entrega para vencer em 5 dias.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $obrigacoes = ObrigacaoEmpresa::query()
            ->with('empresa')
            ->with('obrigacao')
            ->where('date', '<=', now()->addDays(5))
            ->where('date', '>=', now())
            ->where('status', '0')
            ->get();
        $obrigacoes->each(static function ($obrigacao) {
            $obrigacaoDate = Carbon::parse($obrigacao->date);
            if (Notificacao::query()->where('obrigacao_empresa_id', $obrigacao->id)->exists()) {
                return;
            }
            Notificacao::query()->create([
                'obrigacao_empresa_id' => $obrigacao->id,
                'titulo' => 'Prazo de entrega da demanda ' . $obrigacao->obrigacao->titulo . ' da empresa ' . $obrigacao->empresa->nome . ' vence em ' . $obrigacaoDate->diffInDays(now()) . ' dias.',
                'descricao' => 'Prazo de entrega da demanda ' . $obrigacao->obrigacao->titulo . ' da empresa ' . $obrigacao->empresa->nome . ' vence em ' . $obrigacaoDate->diffInDays(now()) . ' dias.',
            ]);
        });
        return 0;
    }
}
