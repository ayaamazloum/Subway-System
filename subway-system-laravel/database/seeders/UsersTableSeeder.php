<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            "email"=>'hanady@gmail.com',
            "name"=>'hanady',
            "password"=>'password123',
            "role_id"=>'2'
        ]);
    }
}
