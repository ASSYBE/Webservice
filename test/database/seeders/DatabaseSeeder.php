<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Agenda;
use App\Models\Form;
use App\Models\Parametre;
use App\Models\Question;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $user1 = \App\Models\User::factory()->create([
            'nom' => 'Abbes',
            'prenom' => 'Yassine',
            'email' => 'abyassine199722@gmail.com',
            'cin' => 'GB210236',
            'date_naissance' => '1997-01-01',
            'adresse' => 'napoli',
            'telephone' => '0701283773',
            'status' => '0',
            'date_validation' => now(),
            'type_beneficier' => 'professeur'
        ]);

        // Agenda::factory()->create([
        //     'description' => 'test 1',
        //     'date_rendezvous' => now()->toDateString(),
        //     'heure_rendezvous' => now()->toTimeString(),
        //     'type_RDV' => 'Entretien d\'accueil',
        //     'user_id' => $user1->id
        // ]);
    }

    // $form1 = Form::factory()->create(['title' => 'fiche 03', 'date_initialisation' => now(), 'user_id' => $user1->id]);
    // $form2 = Form::factory()->create(['title' => 'fiche 04', 'date_initialisation' => now(), 'user_id' => $user1->id]);
    // $form3 = Form::factory()->create(['title' => 'fiche 05', 'date_initialisation' => now(), 'user_id' => $user1->id]);


    // Question::factory()->create([
    //     'question_text_FR' => 'Origine de la demande',
    //     'question_text_AR' => '',
    //     'type' => 'radio',
    //     'form_id' => $form1->id,
    // ]);
    // Question::factory()->create([
    //     'question_text_FR' => 'Degré d’urgence',
    //     'question_text_AR' => '',
    //     'type' => 'text',
    //     'form_id' => $form1->id,
    // ]);
    // Question::factory()->create([
    //     'question_text_FR' => 'Disponibilité et contraintes',
    //     'question_text_AR' => '',
    //     'type' => 'text',
    //     'form_id' => $form1->id,
    // ]);
    // Question::factory()->create([
    //     'question_text_FR' => 'La personne sera appelée dans',
    //     'question_text_AR' => '',
    //     'type' => 'select',
    //     'form_id' => $form1->id,
    // ]);


    // Parametre::factory()->create([
    //     'nom_liste' => 'appele',
    //     'valeur' => 'un semaine',
    //     'libelle_FR' => 'Une semaine',
    //     'libelle_AR' => '',
    // ]);
    // Parametre::factory()->create([
    //     'nom_liste' => 'appele',
    //     'valeur' => 'deux semaines',
    //     'libelle_FR' => 'Deux semaines',
    //     'libelle_AR' => '',
    // ]);
    // Parametre::factory()->create([
    //     'nom_liste' => 'appele',
    //     'valeur' => 'un mois',
    //     'libelle_FR' => 'Un mois',
    //     'libelle_AR' => '',
    // ]);
    // Parametre::factory()->create([
    //     'nom_liste' => 'appele',
    //     'valeur' => 'autre specifier',
    //     'libelle_FR' => 'Autre, spécifier',
    //     'libelle_AR' => '',
    // ]);
    // Parametre::factory()->create([
    //     'nom_liste' => 'demande',
    //     'valeur' => 'candidature spontanee',
    //     'libelle_FR' => 'Candidature spontanée',
    //     'libelle_AR' => '',
    // ]);
    // Parametre::factory()->create([
    //     'nom_liste' => 'demande',
    //     'valeur' => 'autre specifier',
    //     'libelle_FR' => 'Autre, spécifier',
    //     'libelle_AR' => '',
    // ]);

}
