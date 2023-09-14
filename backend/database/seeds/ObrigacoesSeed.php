<?php

use Illuminate\Database\Seeder;

class ObrigacoesSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Obrigacao::query()->insert([
            [
                'titulo' => 'GFIP',
                'descricao' => 'Guia de Recolhimento do FGTS e Informações à Previdência Social',
                'dia' => 7,
                'mes' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'DRF',
                'descricao' => 'Declaração de Rendimentos Pagos a Pessoa Física',
                'dia' => 1,
                'mes' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'DIMOB',
                'descricao' => 'Declaração de Informações sobre Atividades Imobiliárias',
                'dia' => 28,
                'mes' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'DMEB',
                'descricao' => 'Declaração de Serviços Médicos e de Saúde',
                'dia' => 28,
                'mes' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'DEFIS',
                'descricao' => 'Declaração de Informações Socioeconômicas e Fiscais',
                'dia' => 31,
                'mes' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'DIRPF',
                'descricao' => 'Declaração de Imposto de Renda Pessoa Física',
                'dia' => 31,
                'mes' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
