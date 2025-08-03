<?php

namespace Database\Seeders;

use App\Models\Building;
use Illuminate\Database\Seeder;

class BuildingSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $buildings = [
            [
                'name' => 'Aula Utama PP. Nurul Jadid',
                'description' => 'Main auditorium suitable for large events, seminars, and conferences',
                'capacity' => 500,
                'specifications' => 'Stage area, sound system, projector, air conditioning, parking space for 100 vehicles',
                'images' => ['/images/buildings/aula-utama.jpg'],
                'status' => 'available',
            ],
            [
                'name' => 'Ruang Serbaguna Gedung A',
                'description' => 'Multi-purpose hall in Building A for medium-sized events',
                'capacity' => 200,
                'specifications' => 'Flexible seating arrangement, basic sound system, whiteboard, air conditioning',
                'images' => ['/images/buildings/serbaguna-a.jpg'],
                'status' => 'available',
            ],
            [
                'name' => 'Ruang Rapat Gedung B',
                'description' => 'Conference room suitable for meetings and small gatherings',
                'capacity' => 50,
                'specifications' => 'Conference table, projector, flipchart, air conditioning, tea/coffee facilities',
                'images' => ['/images/buildings/rapat-b.jpg'],
                'status' => 'available',
            ],
            [
                'name' => 'Lapangan Olahraga Indoor',
                'description' => 'Indoor sports facility for various sports activities',
                'capacity' => 100,
                'specifications' => 'Basketball/volleyball court, changing rooms, equipment storage, spectator seating',
                'images' => ['/images/buildings/lapangan-indoor.jpg'],
                'status' => 'available',
            ],
            [
                'name' => 'Ruang Seminar Gedung C',
                'description' => 'Modern seminar room with advanced audio-visual equipment',
                'capacity' => 80,
                'specifications' => 'Interactive projector, wireless microphone, recording system, comfortable seating',
                'images' => ['/images/buildings/seminar-c.jpg'],
                'status' => 'available',
            ],
            [
                'name' => 'Mushola Al-Hikmah',
                'description' => 'Prayer facility for religious activities and gatherings',
                'capacity' => 150,
                'specifications' => 'Prayer mats, sound system for prayers, ablution facilities, separate sections',
                'images' => ['/images/buildings/mushola.jpg'],
                'status' => 'available',
            ],
        ];

        foreach ($buildings as $building) {
            Building::create($building);
        }
    }
}