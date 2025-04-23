<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche08;
use Illuminate\Http\Request;

class Fiche08Controller extends Controller
{

    public function create(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);

        $fiche = Fiche08::where("uuid_condidat", $input['cin'])->first();

        if ($fiche == null) {

            Fiche08::create([
                'uuid_condidat' => $input['cin'],
            ]);

            $bdc->update([
                'fiche_actuel' => 'fiche08',
                'statusFiche08' => 'Initier',
            ]);

            return response()->json([
                'message' => 'Fiche08 created successfully 1.',
                'fiche' => $fiche,
            ]);
        }

        return response()->json([
            'message' => 'Fiche08 created successfully 2.',
            'fiche' => $fiche,
        ]);
    }


    public function update(Request $request, string $id)
    {
        $fiche = Fiche08::find($id);
        if (!$fiche) {
            return response()->json([
                'message' => 'Fiche not found for the provided ID.'
            ], 404);
        }

        $validatedData = $request->validate([
            'reponseQ1' => 'required|string',
            'reponseQ2' => 'required|string',
            'reponseQ3' => 'required|string',
        ]);

        $fiche->update($validatedData);

        return response()->json([
            'message' => 'Fiche mise à jour avec succès.',
            'fiche' => $fiche,
        ], 200);
    }

    public function validateAll(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);
        $bdc->update([
            'statusFiche08' => 'Terminé',
            'statusFiche06' => 'Terminé',
            'statusFiche03' => 'Terminé',
            'statusFiche04' => 'Terminé',
            'statusFiche05' => 'Terminé',
            'statusFiche07' => 'Terminé',
            'statusEtape01' => 'Terminé',
        ]);
        return response()->json([
            "message" => "validated successfully",
        ], 200);
    }
}
