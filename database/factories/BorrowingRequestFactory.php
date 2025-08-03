<?php

namespace Database\Factories;

use App\Models\BorrowingRequest;
use App\Models\Building;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BorrowingRequest>
 */
class BorrowingRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'building_id' => Building::factory(),
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(),
            'organization' => $this->faker->company(),
            'contact_person' => $this->faker->name(),
            'contact_phone' => $this->faker->phoneNumber(),
            'request_date' => $this->faker->dateTimeBetween('+1 day', '+30 days')->format('Y-m-d'),
            'start_time' => $this->faker->time('H:i'),
            'end_time' => $this->faker->time('H:i'),
            'expected_participants' => $this->faker->numberBetween(10, 200),
            'equipment_needed' => $this->faker->optional()->paragraph(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected', 'scheduled']),
        ];
    }

    /**
     * Indicate that the request is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    /**
     * Indicate that the request is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'approved_by' => User::factory(),
            'approved_at' => $this->faker->dateTimeBetween('-7 days', 'now'),
        ]);
    }
}