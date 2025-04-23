<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Agenda>
 */
class AgendaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'description' => $this->faker->sentence,
            'date_rendezvous' => $this->faker->date,
            'heure_rendezvous' => $this->faker->time,
            'type_RDV' => $this->faker->randomElement(['Entretien d\'accueil', 'Suivi']),
            'user_id' => User::factory(),
        ];
    }
}
