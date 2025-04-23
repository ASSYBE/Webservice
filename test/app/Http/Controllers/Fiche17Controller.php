<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Fiche17;
use App\Models\Fiche17_parametre;
use App\Models\Fiche17Competences;
use App\Models\Parametre;
use App\Models\Question;
use Illuminate\Http\Request;

class Fiche17Controller extends Controller
{
    public function create(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $questions = Question::where('nom_liste', 'fiche17')->get();
        $parametre = Parametre::where('nom_liste', 'fiche14')->get();


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

        $fiche = Fiche17::where('cin', $input['cin'])->first();
        if (!$fiche) {
            $fiche = Fiche17::create([
                'cin' => $bdc->cin,
                'UUID_BDC' => $bdc->id,
                'createur' => $bdc->cin
            ]);

            $bdc->update([
                'statusFiche17B' => 'Initier',
            ]);
        }
        $competences = Fiche17Competences::where('reponse_fiche17b_id', $fiche->id)
            ->get();

        return response()->json([
            'message' => 'added successfully',
            'fiche' => $fiche,
            'questionnaires' => $formattedQuestions,
            'parametre' => $parametre,
            'competences' => $competences
        ]);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'cin' => 'required|string',
            'competences' => 'required|array',
            'competences.*.competence_id' => 'required|string',
            'competences.*.competence_note' => 'required|integer'
        ]);
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $bdc->update([
            'statusFiche17B' => 'Terminé',
            'dateCreationFiche17B' => now(),
            'statusEtape02' => 'Terminé',
        ]);

        $fiche = Fiche17::where('cin', $input['cin'])->first();

        foreach ($input['competences'] as $value) {
            Fiche17Competences::create([
                'reponse_fiche17b_id' => $fiche->id,
                'competence_id' => $value['competence_id'],
                'competence_note' => $value['competence_note']
            ]);
        }

        return response()->json([
            'message' => 'added successfully',
            'fiche' => $input['competences']
        ]);
    }


    public function update(Request $request, string $id)
    {
        $validated = $request->all();

        $bdc = BDC::where('cin', $validated['cin'])->first();
        if (!$bdc) {
            return response()->json([
                'message' => 'BDC not found!'
            ], 404);
        }
        $bdc->update([
            'statusFiche17B' => 'Terminé',
            'statusEtape02' => 'Terminé',
        ]);

        $fiche = Fiche17::findOrFail($id);

        foreach ($validated['competences'] as $value) {
            $existingCompetence = Fiche17Competences::where('id', $value['id'])
                ->where('reponse_fiche17b_id', $fiche->id)
                ->first();

            if ($existingCompetence) {
                $existingCompetence->update([
                    'competence_note' => $value['competence_note']
                ]);
            }
        }

        return response()->json([
            'message' => 'Competences updated successfully!',
            'competenses' => $validated['competences']
        ]);
    }


    public function sommeCompetence(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json([
                'message' => 'BDC not found!'
            ], 404);
        }

        $competenceTitle = Question::where("nom_liste", 'fiche17R')->get();
        $titleResultat = Question::where("nom_liste", 'fiche17Q')->get();

        $formattedQuestions = $titleResultat->mapWithKeys(function ($question, $index) {
            return [
                'question' . ($index + 1) => [
                    'valeur_id' => $question->valeur_id,
                    'FR' => $question->FR,
                    'AR' => $question->AR,
                    'EN' => $question->EN
                ]
            ];
        });

        $competenceResults = [];

        $competenceIds = ['competence_1', 'competence_2', 'competence_3', 'competence_4', 'competence_5', 'competence_6'];

        foreach ($competenceIds as $competenceId) {
            $totalNotes = 0;

            $competences = Fiche17_parametre::where('competence_id', $competenceId)->get();

            foreach ($competences as $competence) {
                $notes = Fiche17Competences::where('competence_id', $competence->type_id)->get();

                if (!$notes->isEmpty()) {
                    foreach ($notes as $note) {
                        $totalNotes += $note->competence_note;
                    }
                }
            }

            $competenceResults[] = [
                'competence_id' => $competenceId,
                'total_notes' => $totalNotes
            ];
        }

        usort($competenceResults, function ($a, $b) {
            return $b['total_notes'] <=> $a['total_notes'];
        });

        $rankedCompetences = [];
        $rank = 1;
        foreach ($competenceResults as $result) {
            $rankedCompetences[] = [
                'rank' => $rank,
                'competence_id' => $result['competence_id'],
                'total_notes' => $result['total_notes']
            ];
            $rank++;
        }

        return response()->json([
            'message' => 'Les données sont récupérées avec succès!',
            'competence_results' => $rankedCompetences,
            'competenceTitle' => $competenceTitle,
            'formattedQuestions' => $formattedQuestions,
        ]);
    }
}
