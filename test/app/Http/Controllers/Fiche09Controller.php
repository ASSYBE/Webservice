<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche09;
use Illuminate\Http\Request;

class Fiche09Controller extends Controller
{
    public function create(Request $request)
    {

        $input = $request->all();

        $fiche = Fiche09::where('uuid_condidat', $input['cin'])->first();
        if ($fiche == null) {
            $bdc = BDC::where('cin', $input['cin'])->first();

            Fiche09::create([
                'uuid_condidat' => $input['cin'],
            ]);

            $bdc->update([
                'fiche_actuel' => 'fiche09',
                'statusFiche09' => 'Initier',
                'statusEtape02' => 'Initier',
            ]);
        }

        return response()->json([
            'fiche' => $fiche
        ]);
    }

    public function update(Request $request, string $id)
    {

        //$input = $request->all();
        $input = $request->validate([
            'cin' => 'required|string|exists:bdc,cin',
            'sensResponsablite' => 'required|string',
            'capacitesComminicationRelation' => 'required|string',
            'ponctualite' => 'required|string',
            'fiabilite' => 'required|string',
            'autonomieTravail' => 'required|string',
        ]);

        $fiche = Fiche09::findOrFail($id);
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
                'fiche_actuel' => 'fiche09',
                'statusFiche09' => 'Terminé',
                'dateCreationFiche09' => now(),
                'statusEtape02' => 'En cours',
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
