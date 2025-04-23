<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche08ExperienceProfessionnelle;
use App\Models\Fiche10;
use App\Models\Fichier;
use App\Models\Parametre;
use Illuminate\Http\Request;

class Fiche10Controller extends Controller
{
    public function create(Request $request)
    {

        $input = $request->all();

        $fiche = Fiche10::where('uuid_condidat', $input['cin'])->first();
        $fiche8analysePoste = Fiche08ExperienceProfessionnelle::where('CIN', $input['cin'])
            ->orderBy('created_at', 'desc')
            ->first();

        $files = Fichier::whereIn('id', function ($query) {
            $query->select('valeur_id_secteur')
                ->from('fiche05_secteur');
        })->get();

        if ($fiche == null) {
            $bdc = BDC::where('cin', $input['cin'])->first();

            Fiche10::create([
                'uuid_condidat' => $input['cin'],
            ]);

            $bdc->update([
                'fiche_actuel' => 'fiche10',
                'statusFiche10' => 'Initier',
            ]);
        }

        return response()->json([
            'fiche' => $fiche,
            'fiche8analysePoste' => $fiche8analysePoste,
            'file' => $files,
        ]);
    }

    public function update(Request $request, string $id)
    {

        $input = $request->all();
        $fiche = Fiche10::findOrFail($id);

        if ($fiche) {

            $input = $request->all();

            $fiche->update($input);

            $bdc = BDC::where('cin', $input['cin'])->first();
            if (!$bdc) {
                return response()->json([
                    'message' => 'BDC not found for this user.',
                ], 404);
            }
            $bdc->update([
                'fiche_actuel' => 'fiche10',
                'statusFiche10' => 'Terminé',
                'dateCreationFiche10' => now(),
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
