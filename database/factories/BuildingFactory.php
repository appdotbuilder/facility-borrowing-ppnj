<?php

namespace Database\Factories;

use App\Models\Building;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Building>
 */
class BuildingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true) . ' Building',
            'description' => $this->faker->paragraph(),
            'capacity' => $this->faker->numberBetween(20, 500),
            'specifications' => $this->faker->paragraph(),
            'images' => ['/images/buildings/default.jpg'],
            'status' => $this->faker->randomElement(['available', 'maintenance', 'unavailable']),
        ];
    }

    /**
     * Indicate that the building is available.
     */
    public function available(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'available',
        ]);
    }
}