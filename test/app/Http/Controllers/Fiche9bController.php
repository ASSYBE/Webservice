<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficiaire;
use App\Models\Fiche9b;
use Illuminate\Http\Request;

class Fiche9bController extends Controller
{
    public function create(Request $request)
    {
        $input = $request->all();

        $fiche = Fiche9b::where('cin', $input['cin'])->get();

        if ($fiche->isEmpty()) {
            $bdc = BDC::where('cin', $input['cin'])->first();

            if (!$bdc) {
                return response()->json([
                    "message" => "BDC not found for this beneficiary",
                ], 404);
            }

            Fiche9b::create([
                'cin' => $input['cin'],
                'UUID_BDC' => $bdc->id,
                'createur' => $input['nom'],
            ]);

            $bdc->update([
                'fiche_actuel' => 'fiche9b',
                'statusFiche9B' => 'Initier',
            ]);
        }

        return response()->json([
            'fiche' => $fiche->first(),
        ], 200);
    }


    public function update(Request $request, string $id)
    {
        $input = $request->all();


        $fiche = Fiche9b::findOrFail($id);
        if (!$fiche) {
            return response()->json([
                'message' => 'Fiche not found',
            ], 404);
        }

        if ($fiche) {

            $fiche->update($input);

            $bdc = BDC::where('cin', $input['cin'])->first();
            if (!$bdc) {
                return response()->json([
                    'message' => 'BDC not found for this user.',
                ], 404);
            }
            $bdc->update([
                'fiche_actuel' => 'fiche9b',
                'statusFiche9B' => 'Terminé',
                'dateCreationFiche09B' => now(),
            ]);


            return response()->json([
                'message' => 'Fiche mise à jour avec succès',
                'fiche' => $fiche,
            ], 200);
        } else
            return response()->json([
                'message' => 'Not found',
            ], 404);
    }
}
