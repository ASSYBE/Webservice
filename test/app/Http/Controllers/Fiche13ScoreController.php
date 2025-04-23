<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Fiche13_score;
use Illuminate\Http\Request;

class Fiche13ScoreController extends Controller
{
    function storeFiche131(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json([
                'message' => 'not found! '
            ], 404);
        }

        $fiche = Fiche13_score::where('id_competence', $input['ficheId'])->first();
        if (!$fiche) {
            Fiche13_score::create([
                'cin' => $input['cin'],
                'UUID_BDC' => $bdc->id,
                'id_competence' => $input['id_competence'],
                'total_beaucoup' => $input['total_beaucoup'],
                'total_assez' => $input['total_assez'],
                'total_peu' => $input['total_peu'],
                'total_rien' => $input['total_beaucoup'],
                'total' => $input['total'],
            ]);
        }

        function storeFiche132(Request $request)
        {
            $input = $request->all();

            $bdc = BDC::where('cin', $input['cin'])->first();
            if (!$bdc) {
                return response()->json([
                    'message' => 'not found! '
                ], 404);
            }

            Fiche13_score::create([
                'cin' => $input['cin'],
                'UUID_BDC' => $bdc->id,
                'id_competence' => $input['id_competence'],
                'total_beaucoup' => $input['total_beaucoup'],
                'total_assez' => $input['total_assez'],
                'total_peu' => $input['total_peu'],
                'total_rien' => $input['total_beaucoup'],
            ]);
        }

        function storeFiche133(Request $request)
        {
            $input = $request->all();

            $bdc = BDC::where('cin', $input['cin'])->first();
            if (!$bdc) {
                return response()->json([
                    'message' => 'not found! '
                ], 404);
            }

            Fiche13_score::create([
                'cin' => $input['cin'],
                'UUID_BDC' => $bdc->id,
                'id_competence' => $input['id_competence'],
                'total_beaucoup' => $input['total_beaucoup'],
                'total_assez' => $input['total_assez'],
                'total_peu' => $input['total_peu'],
                'total_rien' => $input['total_beaucoup'],
            ]);
        }

        function storeFiche134(Request $request)
        {
            $input = $request->all();

            $bdc = BDC::where('cin', $input['cin'])->first();
            if (!$bdc) {
                return response()->json([
                    'message' => 'not found! '
                ], 404);
            }

            Fiche13_score::create([
                'cin' => $input['cin'],
                'UUID_BDC' => $bdc->id,
                'id_competence' => $input['id_competence'],
                'total_beaucoup' => $input['total_beaucoup'],
                'total_assez' => $input['total_assez'],
                'total_peu' => $input['total_peu'],
                'total_rien' => $input['total_beaucoup'],
            ]);
        }

        function storeFiche135(Request $request)
        {
            $input = $request->all();

            $bdc = BDC::where('cin', $input['cin'])->first();
            if (!$bdc) {
                return response()->json([
                    'message' => 'not found! '
                ], 404);
            }

            Fiche13_score::create([
                'cin' => $input['cin'],
                'UUID_BDC' => $bdc->id,
                'id_competence' => $input['id_competence'],
                'total_beaucoup' => $input['total_beaucoup'],
                'total_assez' => $input['total_assez'],
                'total_peu' => $input['total_peu'],
                'total_rien' => $input['total_beaucoup'],
            ]);
        }
    }
}
