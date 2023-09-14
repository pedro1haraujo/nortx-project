<?php

namespace App\Http\Controllers\Api\Authenticated\Empresas;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use App\Models\Obrigacao;
use App\Models\ObrigacaoEmpresa;
use App\Models\Socio;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class AtualizaEmpresaController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $empresa = $this->atualizaEmpresa(request('empresa'));
        $proprietario = $this->atualizaProprietario(request('proprietario'), $empresa->id);
        $socios = $this->atualizaSocios(request('socios'), $empresa->id);
        $obrigacoes = $this->atualizaObrigacoes(request('obrigacoes'), $empresa->id);
        return response()->json(compact('empresa', 'proprietario', 'socios', 'obrigacoes'));
    }

    private function atualizaEmpresa(array $payload): Empresa
    {
        $empresaId = $payload['id'];
        if (!($empresa = Empresa::query()->where('id', $empresaId)->first())) {
            $empresa = Empresa::query()->create($payload);
        }
        $payload = collect($payload)->only([
            'nome', 'cnpj', 'endereco', 'numero', 'bairro', 'cidade', 'estado',
            'telefone', 'email', 'inscricao_municipal', 'inscricao_estadual',
        ])->toArray();
        $empresa->update($payload);
        return $empresa;
    }

    private function atualizaProprietario(array $payload, int $empresaId): Socio
    {
        $socioId = $payload['id'];
        $payload = collect($payload)->only([
            'nome', 'cpf', 'data_nascimento', 'telefone',
            'celular', 'endereco', 'numero', 'bairro',
        ])->toArray();
        if (!($proprietario = Socio::query()->where('id', $socioId)->first())) {
            $proprietario = Socio::query()->create($payload);
            $payload = ['empresa_proprietaria_id' => $empresaId];
        }
        $proprietario->update($payload);
        return $proprietario;
    }

    public function atualizaSocios(array $socios, int $empresaId): array
    {
        $result = [];
        $sociosId = collect($socios)->pluck('id')->toArray();
        Socio::query()->where('empresa_socio_id', $empresaId)->whereNotIn('id', $sociosId)->delete();
        foreach ($socios as $socioData) {
            $payload = collect($socioData)->only([
                'nome', 'cpf', 'data_nascimento', 'telefone',
                'celular', 'endereco', 'numero', 'bairro',
            ])->toArray();
            $socioId = $socioData['id'];
            if (!$socioId || !($socio = Socio::query()->where('id', $socioId)->first())) {
                $socio = Socio::query()->create($payload);
                $payload = ['empresa_socio_id' => $empresaId];
            }
            $socio->update($payload);
            $result[] = $socio;
        }
        return $result;
    }

    private function atualizaObrigacoes(array $obrigacoesId, int $empresaId): array
    {
        $obrigacoesIdQueExistem = ObrigacaoEmpresa::query()->where('empresa_id', $empresaId)->pluck('obrigacao_id')->toArray();

        $obrigacoesIdParaExcluir = collect($obrigacoesIdQueExistem)->filter(function ($obrigacaoId) use ($obrigacoesId) {
            return !in_array($obrigacaoId, $obrigacoesId, true);
        })->toArray();

        ObrigacaoEmpresa::query()->where('empresa_id', $empresaId)->whereIn('obrigacao_id', $obrigacoesIdParaExcluir)->delete();

        $obrigacoesIdParaAdicionar = collect($obrigacoesId)->filter(function ($obrigacaoId) use ($obrigacoesIdQueExistem) {
            return !in_array($obrigacaoId, $obrigacoesIdQueExistem, true);
        })->toArray();
        $obrigacoes = [];
        $obrigacoesParaAdicionar = [];
        collect($obrigacoesIdParaAdicionar)->each(function ($obrigacaoId) use ($empresaId, &$obrigacoes, &$obrigacoesParaAdicionar) {
            $obrigacoes[$obrigacaoId] = $obrigacoes[$obrigacaoId] ?? Obrigacao::query()->where('id', $obrigacaoId)->select('dia', 'mes')->first();
            $obrigacao = $obrigacoes[$obrigacaoId] ?? null;
            if (!$obrigacao) {
                return;
            }
            $date = today()->day($obrigacao->dia)->month($obrigacao->mes === 0? today()->format('m'): $obrigacao->mes);
            if (now()->lt($date)) {
                $obrigacoesParaAdicionar[] = [
                    'empresa_id' => $empresaId,
                    'obrigacao_id' => $obrigacaoId,
                    'date' => $date->format('Y-m-d'),
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            }
            if (!$obrigacao->mes) {
                $mesesAteDezembro = (clone $date)->diffInMonths(today()->endOfYear()->endOfMonth());
                for ($y = 0; $y < $mesesAteDezembro; $y++) {
                    $dateFilho = (clone $date)->addMonths($y + 1);
                    if ($date === $dateFilho) {
                        continue;
                    }
                    if (now()->gt($dateFilho)) {
                        continue;
                    }
                    $obrigacoesParaAdicionar[] = [
                        'empresa_id' => $empresaId,
                        'obrigacao_id' => $obrigacaoId,
                        'date' => $dateFilho->format('Y-m-d'),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        });
        ObrigacaoEmpresa::query()->insert($obrigacoesParaAdicionar);
        return ObrigacaoEmpresa::query()->where('empresa_id', $empresaId)->pluck('obrigacao_id')->unique()->values()->toArray();
    }
}
