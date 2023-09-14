<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(ObrigacoesSeed::class);
        $this->call(EmpresaSeed::class);
        $this->call(EventoSeed::class);
        $this->call(LembretesSeed::class);
    }
}
