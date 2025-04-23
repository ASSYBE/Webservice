<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Fiche16;
use App\Models\Fiche16_softSkill;
use App\Models\Parametre;
use App\Models\Question;
use Illuminate\Http\Request;

class Fiche16Controller extends Controller
{

    public function indexSkills(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => "not Found ! ",
            ], 404);

        $fiche = Fiche16::where('cin', $input['cin'])->first();

        $fiche_softSkills = Fiche16_softSkill::where('reponse_fiche16_id', $fiche->id)->get();

        return response()->json([
            'message' => 'la fiche initier successfully',
            'softskills' => $fiche_softSkills
        ]);
    }
    public function create(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => "not Found ! ",
            ], 404);

        $questions = Question::where('nom_liste', 'fiche16')->get();

        $typeQuestion = Question::where('nom_liste', 'Tfiche16')->get();

        $parametres = Parametre::where('nom_liste', 'niveau')->get();



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

        $fiche = Fiche16::where('cin', $input['cin'])->first();
        if (!$fiche) {
            Fiche16::create([
                'cin' => $bdc->cin,
                'UUID_BDC' => $bdc->id,
                'createur' => $bdc->cin
            ]);
            $bdc->update([
                'statusFiche16' => 'Initier',
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
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => "not Found ! ",
            ], 404);

        $fiche = Fiche16::findOrFail($id);
        if (!$fiche)
            return response()->json([
                'message' => "not Found ! ",
            ], 404);

        $fiche->update($input);

        $ficheSoftskills = Fiche16_softSkill::where('reponse_fiche16_id', $fiche->id);
        $ficheSoftskills->delete();
        $bdc->update([
            'statusFiche16' => 'Terminé',
            'dateCreationFiche16' => now()
        ]);

        return response()->json([
            'message' => "updated with success ",
        ], 200);
    }

    public function updateReponseQ44(Request $request, string $id)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => "not Found ! ",
            ], 404);

        $fiche = Fiche16::findOrFail($id);
        if (!$fiche)
            return response()->json([
                'message' => "not Found ! ",
            ], 404);

        $fiche->update($input);

        return response()->json([
            'message' => "updated with success ",
        ], 200);
    }

    public function resultOfFiche16(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => "not Found ! ",
            ], 404);

        $fiche = Fiche16::where('cin', $input['cin'])->first();

        if (!$fiche)
            return response()->json([
                'message' => "not Found ! ",
            ], 404);


        $filteredQuestions = [];

        foreach (range(1, 36) as $i) {
            if ($fiche->{"noteQ{$i}"} >= 3) {
                $filteredQuestions[] = [
                    'valeur_id' => Question::where('valeur_id', $fiche->{"valeur_id_NoteQ{$i}"})->first(),
                ];
            }
        }

        $fiche_softSkills = Fiche16_softSkill::where('reponse_fiche16_id', $fiche->id)->get();

        return response()->json([
            'message' => "selected successfuly ",
            'filtredQuestions' => $filteredQuestions,
            'fiche_softSkills' => $fiche_softSkills
        ], 200);
    }

    public function store_softskills(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche16::findOrFail($id);

        Fiche16_softSkill::create([
            'reponse_fiche16_id' => $fiche->id,
            'softskill' => $input['softskill']
        ]);

        $bdc->update([
            'statusFiche16' => 'Terminé',
            'dateCreationFiche16' => now(),
        ]);

        return response()->json([
            'message' => "hypothese desire added successfully!"
        ]);
    }

    public function delete_softskills(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found BDC !'
            ], 404);

        $fiche = Fiche16_softSkill::findOrFail($id);
        $fiche->delete();

        return response()->json([
            'message' => "hypothese valide softskill successfully!"
        ]);
    }
}
