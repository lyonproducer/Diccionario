<?php

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'name'      =>'admin',
            'display_name' => 'Super Admin'
        ]);

        Role::create([
            'name'      =>'user',
            'display_name' => 'User'
        ]);
    }
}
