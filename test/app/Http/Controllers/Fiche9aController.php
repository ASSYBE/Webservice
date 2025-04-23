<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche09;
use App\Models\Fiche9a;
use App\Models\Fiche9aConnaissances;
use App\Models\Fiche9aHabilite;
use App\Models\Fiche9aRessource;
use App\Models\FicheCompetenceConnaissance;
use App\Models\Fichier;
use Illuminate\Http\Request;

class Fiche9aController extends Controller
{
    public function create(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where("cin", $input['cin'])->first();

        if (!$bdc) {
            return response()->json([
                "message" => "BDC not found",
            ], 404);
        }

        $competenceConnaissance = FicheCompetenceConnaissance::where('CIN', $input['cin'])->get();

        $fiche09a = Fiche9a::where('cin', $input['cin'])->first();



        $files = Fichier::whereIn('id', function ($query) use ($input) {
            $query->select('valeur_id_secteur')
                ->from('fiche05_secteur')
                ->where('CIN', $input['cin']);
        })->get();
        if (!$fiche09a) {
            $fiche09a = Fiche9a::create([
                'cin' => $input['cin'],
                'dateCreation' => now(),
                'UUID_BDC' => $bdc->id
            ]);

            $bdc->update([
                'fiche_actuel' => 'fiche9a',
                'statusBDC' => 'Initier',
                'statusEtape02' => 'Initier',
                'statusFiche9A' => 'Initier',
            ]);
        }

        $connaissances = $fiche09a ? Fiche9aConnaissances::where('uuid_fiche9', $fiche09a->id)->get() : null;
        $habilites = $fiche09a ? Fiche9aHabilite::where('uuid_fiche9', $fiche09a->id)->get() : null;
        $ressources = $fiche09a ? Fiche9aRessource::where('uuid_fiche9', $fiche09a->id)->get() : null;

        return response()->json([
            'fiche9a' => $fiche09a,
            'competenceConnaissance' => $competenceConnaissance,
            'connaissances' => $connaissances,
            'habilites' => $habilites,
            'ressources' => $ressources,
            'files' => $files,
        ]);
    }


    public function update(Request $request, string $id)
    {
        $input = $request->all();

        $request->validate([
            'activites_effecacites' => 'required|string',
            'activites_effecacites_pourquoi' => 'required|string',
            'activites_difficultes' => 'required|string',
            'activites_difficultes_pourquoi' => 'required|string',
        ]);

        try {
            $fiche9a = Fiche9a::find($id);

            if (!$fiche9a) {
                return response()->json([
                    "message" => "Fiche9a not found",
                ], 404);
            }

            $fiche9a->update($input);

            $bdc = BDC::where("cin", $input['cin'])->first();

            if (!$bdc) {
                return response()->json([
                    "message" => "BDC not found",
                ], 404);
            }

            $bdc->update([
                'fiche_actuel' => 'fiche09A',
                'statusBDC' => 'En cours',
                'statusEtape02' => 'En cours',
                'statusFiche9A' => 'Terminé',
                'dateCreationFiche09A' => now(),
            ]);

            return response()->json([
                'message' => 'Fiche enregistrée avec succès.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de l\'enregistrement.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
