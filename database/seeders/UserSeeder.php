<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create Admin 1 (Kepala Kerumahtanggaan)
        User::create([
            'name' => 'Ahmad Syukri',
            'email' => 'admin1@nuruljidd.ac.id',
            'password' => Hash::make('password'),
            'role' => 'admin1',
            'organization' => 'PP. Nurul Jadid',
            'phone' => '+62812-3456-7890',
            'email_verified_at' => now(),
        ]);

        // Create Admin 2 (Sekretariat)
        User::create([
            'name' => 'Fatimah Zahara',
            'email' => 'admin2@nuruljidd.ac.id',
            'password' => Hash::make('password'),
            'role' => 'admin2',
            'organization' => 'PP. Nurul Jadid',
            'phone' => '+62812-3456-7891',
            'email_verified_at' => now(),
        ]);

        // Create regular users
        $users = [
            [
                'name' => 'Muhammad Rizki',
                'email' => 'rizki@example.com',
                'organization' => 'OSIS SMA Nurul Jadid',
                'phone' => '+62812-1111-1111',
            ],
            [
                'name' => 'Siti Aisyah',
                'email' => 'aisyah@example.com',
                'organization' => 'BEM Universitas Nurul Jadid',
                'phone' => '+62812-2222-2222',
            ],
            [
                'name' => 'Abdul Rahman',
                'email' => 'rahman@example.com',
                'organization' => 'Alumni Association',
                'phone' => '+62812-3333-3333',
            ],
            [
                'name' => 'Khadijah Muslimah',
                'email' => 'khadijah@example.com',
                'organization' => 'Teachers Association',
                'phone' => '+62812-4444-4444',
            ],
        ];

        foreach ($users as $userData) {
            User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => Hash::make('password'),
                'role' => 'user',
                'organization' => $userData['organization'],
                'phone' => $userData['phone'],
                'email_verified_at' => now(),
            ]);
        }
    }
}