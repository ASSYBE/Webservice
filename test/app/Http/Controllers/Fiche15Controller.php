<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Fiche;
use App\Models\Fiche15;
use App\Models\Parametre;
use App\Models\Question;
use Illuminate\Http\Request;

class Fiche15Controller extends Controller
{

    public function create(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => "not Found ! ",
            ], 404);

        $questions = Question::where('nom_liste', 'fiche15')->get();

        $typeQuestion = Question::where('nom_liste', 'Tfiche15')->get();

        $parametres = Parametre::where('nom_liste', 'importance')->get();

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

        $formattedTypeQuestions = $typeQuestion->mapWithKeys(function ($question, $index) {
            return [
                'question' . ($index + 1) => [
                    'valeur_id' => $question->valeur_id,
                    'FR' => $question->FR,
                    'AR' => $question->AR,
                    'EN' => $question->EN
                ]
            ];
        });

        $fiche = Fiche15::where('cin', $input['cin'])->first();
        if (!$fiche) {
            Fiche15::create([
                'cin' => $bdc->cin,
                'UUID_BDC' => $bdc->id,
                'createur' => $bdc->cin
            ]);
            $bdc->update([
                'statusFiche15' => 'Initier',
            ]);
        }

        return response()->json([
            'message' => 'la fiche initier successfully',
            'fiche' => $fiche,
            'parametres' => $parametres,
            'formattedQuestions' => $formattedQuestions,
            'formattedTypeQuestions' => $formattedTypeQuestions
        ]);
    }

    public function update(Request $request, string $id)
    {
        $fiche = Fiche15::findOrFail($id);
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => "not Found ! ",
            ], 404);
        if (!$fiche)
            return response()->json([
                'message' => "not Found ! ",
            ], 404);

        $fiche->update($input);
        $bdc->update([
            'statusFiche15' => 'Terminé',
            'dateCreationFiche15' => now()
        ]);


        return response()->json([
            'message' => "updated successfully ! ",
            'fiche' => $fiche
        ], 200);
    }
}
