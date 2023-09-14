<?php

use Illuminate\Database\Seeder;

class EmpresaSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        $obrigacoes = \App\Models\Obrigacao::query()->get();
        for ($x = 0; $x < 40; $x++) {
            $empresaFaker = \Faker\Factory::create('pt_BR');
            \App\Models\Empresa::query()->insert([
                'nome' => $empresaFaker->company,
                'cnpj' => $empresaFaker->cnpj(false),
                'endereco' => $empresaFaker->address,
                'numero' => $empresaFaker->buildingNumber,
                'bairro' => $empresaFaker->streetName,
                'cidade' => $empresaFaker->city,
                'estado' => $empresaFaker->stateAbbr,
                'telefone' => $empresaFaker->phoneNumber,
                'email' => $empresaFaker->email,
                'inscricao_municipal' => $this->generateRandomNumber(),
                'inscricao_estadual' => $this->generateRandomNumber(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $obrigacoesRandom = $obrigacoes->random(rand(1, 6));
            foreach ($obrigacoesRandom as $obrigacao) {
                $date = today()->day($obrigacao->dia)->month($obrigacao->mes === 0? today()->format('m'): $obrigacao->mes);
                $status = now()->gt($date) ? '1' : '0';
                \App\Models\ObrigacaoEmpresa::query()->insert([
                    'empresa_id' => $x + 1,
                    'obrigacao_id' => $obrigacao->id,
                    'date' => $date->format('Y-m-d'),
                    'status' => $status,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                if (!$obrigacao->mes) {
                    $mesesAteDezembro = (clone $date)->diffInMonths(today()->endOfYear()->endOfMonth()) - 1;
                    for ($y = 0; $y < $mesesAteDezembro; $y++) {
                        $date = (clone $date)->addMonths($y + 1);
                        $status = now()->gt($date) ? '1' : '0';
                        \App\Models\ObrigacaoEmpresa::query()->insert([
                            'empresa_id' => $x + 1,
                            'obrigacao_id' => $obrigacao->id,
                            'date' => $date->format('Y-m-d'),
                            'status' => $status,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            }
            \App\Models\Socio::query()->insert([
                'nome' => $empresaFaker->name,
                'cpf' => $empresaFaker->cpf(false),
                'empresa_proprietaria_id' => $x + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function generateRandomNumber(): string
    {
        $result = [];
        for ($i = 0; $i < 4; $i++) {
            $randomNumber = mt_rand(0, 999);
            $formattedNumber = str_pad($randomNumber, 3, '0', STR_PAD_LEFT);
            $result[] = $formattedNumber;
        }
        return implode('.', $result);
    }
}
