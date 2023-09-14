<?php

use Illuminate\Database\Seeder;

class EventoSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plataformas = ['', 'Zoom', 'Meet', 'Teams', 'Skype', 'Hangouts'];
        $empresasId = \App\Models\Empresa::query()->pluck('id')->toArray();
        for ($x=0; $x<20; $x++) {
            $faker = \Faker\Factory::create('pt_BR');
            $plataforma = $plataformas[array_rand($plataformas)];
            $empresaId = $empresasId[array_rand($empresasId)];
            \App\Models\Evento::query()->insert([
                'titulo' => $faker->sentence(3),
                'empresa_id' => $empresaId,
                'plataforma_reuniao' => $plataforma,
                'link_reuniao' => $plataforma? $faker->url : null,
                'descricao' => $faker->text(200),
                'data_inicio' => now()->addDays($x),
                'data_fim' => now()->addDays($x)->addHours(2),
            ]);
        }
    }
}
