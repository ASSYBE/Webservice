<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Fiche;
use App\Models\Fiche15;
use App\Models\Fiche15_resultat;
use App\Models\Question;
use Illuminate\Http\Request;

class Fiche15ResultatController extends Controller
{

    public function index(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json([
                'message' => "Not Found!",
            ], 404);
        }

        $fiche = Fiche15::where('cin', $input['cin'])->first();

        if (!$fiche) {
            return response()->json([
                'message' => "Fiche not found!",
            ], 404);
        }

        $ficheResultat = Fiche15_resultat::where('cin', $input['cin'])->first();


        $filteredQuestions = [];

        foreach (range(1, 36) as $i) {
            if ($fiche->{"noteQ{$i}"} == 4) {
                $filteredQuestions[] = [
                    'valeur_id' => Question::where('valeur_id', $fiche->{"valeur_id_NoteQ{$i}"})->first(),
                ];
            }
        }

        return response()->json([
            'fiche' => $filteredQuestions,
            'ficheResultat' => $ficheResultat,
        ], 200);
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json([
                'message' => "Not Found!",
            ], 404);
        }

        $input['cin'] = $bdc->cin;
        $input['UUID_BDC'] = $bdc->id;
        $input['createur'] = $bdc->cin;
        $resultatFiche = Fiche15_resultat::create($input);

        return response()->json([
            'message' => "added successfuly !",
            'fiche' => $resultatFiche,
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $fiche = Fiche15_resultat::findOrFail($id);
        if (!$fiche) {
            return response()->json([
                'message' => "Not Found!",
            ], 404);
        }

        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json([
                'message' => "Not Found!",
            ], 404);
        }

        $fiche->update($input);
        return response()->json([
            'message' => "updated successfuly !",
        ], 200);
    }
}
