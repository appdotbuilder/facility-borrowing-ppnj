<?php

namespace Database\Factories;

use App\Models\BorrowingRequest;
use App\Models\Building;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Schedule>
 */
class ScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'borrowing_request_id' => BorrowingRequest::factory(),
            'building_id' => Building::factory(),
            'title' => $this->faker->sentence(4),
            'scheduled_date' => $this->faker->dateTimeBetween('+1 day', '+30 days')->format('Y-m-d'),
            'start_time' => $this->faker->time('H:i'),
            'end_time' => $this->faker->time('H:i'),
            'notes' => $this->faker->optional()->paragraph(),
            'created_by' => User::factory(),
        ];
    }
}