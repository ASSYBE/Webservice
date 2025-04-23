<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Fiche19;
use App\Models\Fiche19_hypothese_valide;
use App\Models\Fiche20;
use App\Models\Fiche20_PlanAction;
use App\Models\Parametre_profession;
use Illuminate\Http\Request;

class Fiche20Controller extends Controller
{
    public function create(Request $request)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);


        $fiche19 = Fiche19::where('UUID_BDC', $bdc->id)->first();

        $parametreProfession = Parametre_profession::where('nom_liste', 'profession')->get();
        $fiche_hypothese_valide = Fiche19_hypothese_valide::where('reponse_fiche19_id', $fiche19->id)->get()
            ->mapWithKeys(function ($question, $index) {
                return [
                    'valide' . ($index + 1) => [
                        'id' => $question->id,
                        'hypothese_parcours_valide' => $question->hypothese_parcours_valide,
                    ]
                ];
            });;
        $fiche = Fiche20::where('cin', $input['cin'])->first();
        if (!$fiche) {
            $fiche = Fiche20::create([
                'cin' => $input['cin'],
                'UUID_BDC' => $bdc->id,
            ]);
            $bdc->update([
                'statusFiche20' => 'Initier',
            ]);
        }
        return response()->json([
            'message' => 'happen successfully',
            'fiche' => $fiche,
            'fiche_hypothese_valide' => $fiche_hypothese_valide,
            'parametreProfession' => $parametreProfession
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $bdc->update([
            'statusFiche20' => 'Terminé',
            'dateCreationFiche20' => now(),
        ]);

        $fiche = Fiche20::findOrFail($id);
        if (!$fiche) {
            return response()->json([
                'massage' => 'not found',
            ], 404);
        }
        $fiche->update($input);
        return response()->json([
            'message' => 'updates successfully ! ',
            'fiche' => $fiche
        ]);
    }

    public function indexPlanAction(Request $request)
    {
        $request->validate([
            'cin' => 'required|string',
        ]);

        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);
        $planAction = Fiche20_PlanAction::where('UUID_BDC', $bdc->id)->get();

        return response()->json([
            'message' => "all plans",
            'planAction' => $planAction,

        ], 200);
    }

    public function storePlanAction(Request $request)
    {
        $validatedData = $request->validate([
            'cin' => 'required|string',
            'quoiFaire' => 'required|string',
            'quand' => 'required|string',
            'ou' => 'required|string',
            'financement' => 'required|string',
        ]);

        $bdc = BDC::where('cin', $validatedData['cin'])->first();

        if (!$bdc) {
            return response()->json([
                'message' => 'BDC not found for the provided CIN.'
            ], 404);
        }

        Fiche20_PlanAction::create([
            'cin' => $validatedData['cin'],
            'UUID_BDC' => $bdc->id,
            'quoiFaire' => $validatedData['quoiFaire'],
            'quand' => $validatedData['quand'],
            'ou' => $validatedData['ou'],
            'financement' => $validatedData['financement'],
        ]);

        return response()->json([
            'message' => 'Plan action added successfully!',
        ], 200);
    }


    public function deletePlanAction(string $id)
    {
        $fiche = Fiche20_PlanAction::findOrFail($id);
        $fiche->delete();
        return response()->json(
            [
                'message' => 'Data deleted successfully ! ',
            ],
            200
        );
    }
}
