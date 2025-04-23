<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Fiche;
use App\Models\Fiche05_secteur;
use App\Models\Fiche21;
use App\Models\Fiche21_projet;
use App\Models\Parametre;
use Illuminate\Http\Request;

class Fiche21Controller extends Controller
{
    public function create(Request $request)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche21::where('UUID_BDC', $bdc->id)->get();
        $zoneParametre = Parametre::where('nom_liste', 'zoneTerritorial')->get();
        $fiche_secteur = Fiche05_secteur::where('CIN', $input['cin'])->get();
        $parametreSecteur = Parametre::where('nom_liste', 'Secteur')->get();


        return response()->json([
            'message' => "all plans",
            'fiche' => $fiche,
            'zoneParametre' => $zoneParametre,
            'fiche_secteur' => $fiche_secteur,
            'parametreSecteur' => $parametreSecteur

        ], 200);
    }

    public function create_projet(Request $request)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche_project = Fiche21_projet::where('UUID_BDC', $bdc->id)->first();

        if (!$fiche_project) {
            Fiche21_projet::create([
                'cin' => $input['cin'],
                'UUID_BDC' => $bdc->id,
            ]);

            $bdc->update([
                'statusFiche21' => 'Initier',
            ]);
        }

        return response()->json([
            'message' => "all plans",
            'fiche_project' => $fiche_project,
        ], 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'cin' => 'required|string',
            'professions_identifee' => 'required|string',
            'zone_territoriale' => 'required|string',
            'secteur_developpement' => 'required|string',
            'contrainte_opportunite' => 'required|string',
        ]);

        $bdc = BDC::where('cin', $validatedData['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        Fiche21::create([
            'cin' => $validatedData['cin'],
            'UUID_BDC' => $bdc->id,
            'professions_identifee' => $validatedData['professions_identifee'],
            'zone_territoriale' => $validatedData['zone_territoriale'],
            'secteur_developpement' => $validatedData['secteur_developpement'],
            'contrainte_opportunite' => $validatedData['contrainte_opportunite'],
        ]);

        return response()->json([
            'message' => 'Plan action added successfully!',
        ], 200);
    }

    public function delete(string $id)
    {
        $fiche = Fiche21::findOrFail($id);
        $fiche->delete();
        return response()->json(
            [
                'message' => 'Data deleted successfully ! ',
            ],
            200
        );
    }

    public function update(Request $request, string $id)
    {
        // $input = $request->all();
        $validatedData = $request->validate([
            'cin' => 'required|string',
            'profil_choisi' => 'required|string',
            'domaine_ou_secteur' => 'required|string',
            'profil_identifie_tache' => 'required|string',
            'profil_identifie_competence' => 'required|string',
            'analyse_ressources_partie1' => 'required|string',
            'analyse_ressources_ai_deja' => 'required|string',
            'analyse_ressources_a_devlopper' => 'required|string',
            'analyse_ressources_a_aquerir' => 'required|string',
            'parcours_entreprendre_actions' => 'required|string',
            'parcours_entreprendre_contact' => 'required|string',
            'parcours_entreprendre_tems' => 'required|string'
        ]);

        $bdc = BDC::where('cin', $validatedData['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche21_projet::findOrFail($id);

        $fiche->update($validatedData);

        $bdc->update([
            'statusFiche21' => 'Terminé',
            'dateCreationFiche21' => now()
        ]);

        return response()->json(
            [
                'message' => 'Data updated successfully ! ',
            ],
            200
        );
    }
}
