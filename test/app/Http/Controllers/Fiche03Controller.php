<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche03;
use App\Models\Parametre;
use App\Models\Question;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;

class Fiche03Controller extends Controller
{



    public function index() {}


    public function create(Request $request)
    {

        $questionFiche03 = Question::where('nom_liste', 'fiche03')
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

        $input = $request->all();

        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);
        $parametreAppel = Parametre::where('nom_liste', 'delai_appel')->get();
        $parametreDemande = Parametre::where('nom_liste', 'origine_demande')->get();
        $parametreDegre = Parametre::where('nom_liste', 'urgence')->get();

        $fiche03 = Fiche03::where('CIN', $input['cin'])->first();
        $bdc = BDC::where('cin', $input['cin'])->first();

        if ($fiche03 == null) {
            $bdc = BDC::where('cin', $input['cin'])->first();
            dump($bdc);

            $fiche03 = Fiche03::create([
                'CIN' => $input['cin'],
                'dateCreation' => now(),
                'status_fiche' => 'Initier',
                'UUID_BDC' => $bdc->id
            ]);
            $bdc->update([
                'fiche_actuel' => 'fiche03',
                'statusBDC' => 'Initier',
                'statusEtape01' => 'Initier',
                'statusFiche03' => 'Initier',
            ]);
        }


        return response()->json([
            'fiche03' => $fiche03,
            'questionFiche03' => $questionFiche03,
            'parametreAppel' => $parametreAppel,
            'parametreDemande' => $parametreDemande,
            'parametreDegre' => $parametreDegre,
            'type_beneficier' => $bdc->type_beneficier
        ]);
    }


    public function update(Request $request, $id)
    {
        try {
            $input = $request->all();
            $fiche = Fiche03::findOrFail($id);


            $input['status_fiche'] = "Terminé";

            $fiche->update($input);
            $bdc = BDC::where('cin', $input['cin'])->first();
            $bdc->update([
                'fiche_actuel' => 'fiche03',
                'statusBDC' => 'En cours',
                'statusEtape01' => 'En cours',
                'statusFiche03' => 'Terminé',
                'dateCreationFiche03' => now(),
            ]);

            return response()->json([
                'message' => 'Fiche mise à jour avec succès.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la mise à jour.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
