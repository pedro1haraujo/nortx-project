<?php

use Illuminate\Database\Seeder;

class LembretesSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($x=0; $x<= 10; $x++) {
            \App\Models\Lembrete::query()->insert([
                'titulo' => 'Lorem ipsum dolor sit amet ' . $x,
                'descricao' => 'Descrição do lembrete ' . $x,
                'date' => now()->addDays(rand(1, 30))->format('Y-m-d H:i:s'),
                'created_at' => date('Y-m-d H:i:s'),
            ]);
        }
    }
}
