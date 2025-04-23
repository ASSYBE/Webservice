<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche04;
use App\Models\Question;
use Illuminate\Http\Request;

class Fiche04Controller extends Controller
{
    public function create(Request $request)
    {
        $input = $request->all();

        $fiche = Fiche04::where('CIN', $input['cin'])->first();

        if ($fiche == null) {
            $bdc = BDC::where("cin", $input['cin'])->first();
            if (!$bdc)
                return response()->json([
                    "message" => "not found",
                ], 404);

            Fiche04::create([
                'CIN' => $input['cin'],
                'reponse_Q1' => now(),
                'status_fiche' => 'Initier',
                'UUID_BDC' => $bdc->id
            ]);

            $bdc->update([
                'fiche_actuel' => 'fiche04',
                'statusBDC' => 'En cours',
                'statusEtape01' => 'En cours',
                'statusFiche04' => 'Initier',
            ]);
        }

        $questionFiche04 = Question::where('nom_liste', 'fiche04')
            ->get(['uuid', 'FR', 'AR', 'EN'])
            ->mapWithKeys(function ($question, $index) {
                return [
                    'question' . ($index + 1) => [
                        'uuid' => $question->uuid,
                        'FR' => $question->FR,
                        'AR' => $question->AR,
                        'EN' => $question->EN
                    ]
                ];
            });

        return response()->json([
            'fiche04' => $fiche,
            'questionFiche04' => $questionFiche04
        ], 200);
    }


    public function update(Request $request, $id)
    {

        $fiche = Fiche04::findOrFail($id);

        if (!$fiche) {
            return response()->json([
                'error' => 'Fiche not found',
            ], 404);
        }
        $input = $request->all();

        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);


        $data['CIN'] = $input['cin'];
        $data['UUID_BDC'] = $bdc->id;
        $data['createur'] = $input['nom'];
        $data['status_fiche'] = "En cours";
        $data['reponse_Q1'] = $input['reponse_Q1'];
        $data['reponse_Q2'] = $input['reponse_Q2'];
        $data['reponse_Q3'] = $input['reponse_Q3'];
        $data['signature'] = $input['signature'];


        $fiche->update($data);
        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);
        $bdc->update([
            'fiche_actuel' => 'fiche04',
            'statusBDC' => 'En cours',
            'statusEtape01' => 'En cours',
            'statusFiche04' => 'Terminé',
            'dateCreationFiche04' => now(),
        ]);

        return response()->json([
            'message' => 'Fiche mise à jour avec succès',
            'fiche04' => $fiche,
        ], 200);
    }
}
