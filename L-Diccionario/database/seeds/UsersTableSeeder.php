<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name'      =>'Admin',
            'email' => 'admin085@gmail.com',
            'password' => 'leo123'
        ]);

        $adminRole=Role::Where('name','=','admin')->first();
        $admin->roles()->attach($adminRole->id);


        $user = User::create([
            'name'      =>'Leonardo',
            'email' => 'hernandezleonardo085@gmail.com',
            'password' => 'leo123'
        ]);

        $userRole=Role::Where('name','=','user')->first();
        $user->roles()->attach($userRole->id);

    }
}
