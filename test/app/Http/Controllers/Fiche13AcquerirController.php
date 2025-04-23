<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Fiche13_acquerir;
use App\Models\Fiche13_score;
use App\Models\Parametre;
use Illuminate\Http\Request;

class Fiche13AcquerirController extends Controller
{
    public function create(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);



        $cinqMScore = Fiche13_score::orderBy('total', 'desc')->take(5)->get();

        $parametreMScore = Parametre::whereIn('valeur_id', $cinqMScore->pluck('valeur_id'))->get();

        $parametreMScore = $parametreMScore->mapWithKeys(function ($parametre, $index) {
            return [
                'parametre' . ($index + 1) => [
                    'valeur_id' => $parametre->valeur_id,
                    'FR' => $parametre->FR,
                    'AR' => $parametre->AR,
                    'EN' => $parametre->EN
                ]
            ];
        });

        $parametreBScore = Parametre::whereNotIn('valeur_id', $cinqMScore->pluck('valeur_id'))
            ->where('nom_liste', 'fiche13')
            ->get();

        $fiche_acquerir = Fiche13_acquerir::where('cin', $input['cin'])->get();

        $fiche_acquerir = $fiche_acquerir->mapWithKeys(function ($fiche_acquerir, $index) {
            return [
                'result' . ($index + 1) => [
                    'id' => $fiche_acquerir->id,
                    'id_competence_acquerir' => $fiche_acquerir->id_competence_acquerir,
                ]
            ];
        });

        if ($fiche_acquerir->isNotEmpty()) {
            return response()->json([
                'fiche_acquerir' => $fiche_acquerir,
                'parametreBScore' => $parametreBScore,
                'parametreMScore' => $parametreMScore
            ]);
        }
        return response()->json([
            'score' => $cinqMScore,
            'parametreBScore' => $parametreBScore,
            'parametreMScore' => $parametreMScore
        ], 200);
    }

    public function store(Request $request)
    {
        $input = $request->validate([
            'cin' => 'required|string',
            'competence_acquerir' => 'required|array',
            'competence_acquerir.*.id_competence_acquerir' => 'required|string',
        ]);

        $bdc = BDC::where('cin', $input['cin'])->first();

        if (!$bdc) {
            return response()->json([
                'message' => 'not found!'
            ], 404);
        }

        foreach ($input['competence_acquerir'] as $CA) {
            $fiche = Fiche13_acquerir::create([
                'cin' => $input['cin'],
                'UUID_BDC' => $bdc->id,
                'createur' => $input['cin'],
                'id_competence_acquerir' => $CA['id_competence_acquerir'],
            ]);
        }

        $bdc->update([
            'dateCreationFiche13' => now(),
            'statusFiche13' => 'Terminé',
        ]);

        return response()->json([
            'message' => 'ajouter avec succès',
            'fiche' => $fiche
        ], 200);
    }

    public function update(Request $request)
    {
        $input = $request->validate([
            'cin' => 'required|string',
            'competence_acquerir' => 'required|array',
            'competence_acquerir.*.id' => 'required|string',
            'competence_acquerir.*.id_competence_acquerir' => 'required|string',
        ]);

        $bdc = BDC::where('cin', $input['cin'])->first();

        if (!$bdc) {
            return response()->json([
                'message' => 'BDC not found!'
            ], 404);
        }

        foreach ($input['competence_acquerir'] as $CA) {
            $existingFiche = Fiche13_acquerir::where('id', $CA['id'])->first();

            if ($existingFiche) {
                $existingFiche->update([
                    'id_competence_acquerir' => $CA['id_competence_acquerir'],
                ]);
            }
        }
        $bdc->update([
            'statusFiche13' => 'Terminé',
        ]);


        return response()->json([
            'message' => 'Updated successfully'
        ], 200);
    }
}
