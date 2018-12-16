<?php

use Illuminate\Database\Seeder;
use App\Models\Dictionary;

class DictionariesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Dictionary::create([
            'word'      =>'hola'
        ]);

        Dictionary::create([
            'word'      =>'actitud'
        ]);

        Dictionary::create([
            'word'      =>'altitud'
        ]);

        Dictionary::create([
            'word'      =>'aptitud'
        ]);

        Dictionary::create([
            'word'      =>'cruzar'
        ]);

        Dictionary::create([
            'word'      =>'deporte'
        ]);

    }
}
