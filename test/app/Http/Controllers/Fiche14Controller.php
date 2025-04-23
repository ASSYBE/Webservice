<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Fiche14;
use App\Models\Parametre;
use App\Models\Question;
use Illuminate\Http\Request;

class Fiche14Controller extends Controller
{
    public function index(Request $request)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => 'not found !'
            ], 404);

        $fiche = Fiche14::where("cin", $bdc->cin)->first();

        if (!$fiche) {
            return response()->json([
                "message" => 'not found !'
            ], 404);
        }

        $bdc->update([
            'dateCreationFiche14' => now(),
            'statusFiche14' => 'Terminé',
        ]);
        return response()->json([
            'message' => 'la fiche Termin2 successfully',
            'fiche' => $fiche
        ], 200);
    }

    public function create(Request $request)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => 'not found !'
            ], 404);

        $questions = Question::where('nom_liste', 'fiche14')->get();

        $formattedQuestions = $questions->mapWithKeys(function ($question, $index) {
            return [
                'question' . ($index + 1) => [
                    'valeur_id' => $question->valeur_id,
                    'FR' => $question->FR,
                    'AR' => $question->AR,
                    'EN' => $question->EN
                ]
            ];
        });

        $parametres = Parametre::where('nom_liste', 'fiche14')->get();
        $fiche = Fiche14::where("cin", $bdc->cin)->first();

        if (!$fiche) {

            $fiche = Fiche14::create([
                'cin' => $bdc->cin,
                'UUID_BDC' => $bdc->id,
                'createur' => $bdc->cin
            ]);

            $bdc->update([
                'statusFiche14' => 'Initier',
            ]);
        }
        return response()->json([
            'message' => 'la fiche initier successfully',
            'fiche' => $fiche,
            'formattedQuestions' => $formattedQuestions,
            'parametre' => $parametres
        ]);
    }

    public function update(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => 'not found !'
            ], 404);
        $fiche = Fiche14::findOrFail($id);
        $bdc->update([
            'dateCreationFiche14' => now(),
            'statusFiche14' => 'Terminé',
        ]);
        if (!$fiche)
            return response()->json([
                'message' => 'not found !',
            ], 404);

        $fiche->update($input);
        return response()->json([
            'message' => 'updated successfully ! ',
            'fiche' => $fiche
        ]);
    }
}
