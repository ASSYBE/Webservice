<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche08;
use App\Models\Fiche08Connaissance;
use App\Models\Fiche08FormationInitialeContinue;
use App\Models\Formation;
use App\Models\Parametre;
use App\Models\SigecConnaissance;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;

class Fiche08FormationInitialeContinueController extends Controller
{
    public function create(Request $request)
    {

        $input = $request->all();

        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);

        $fiche08UuidCondidat = Fiche08::where("uuid_condidat", $input['cin'])->first();
        $parametreFormation = Formation::where('id_beneficier', $input['cin'])->get();
        $connaissanceFormation = Fiche08Connaissance::whereIn('uuid_parameter_formation', $parametreFormation->pluck('valeur_id'))
            ->where('CIN', $input['cin'])
            ->get();
        if ($fiche08UuidCondidat) {
            $fiche08FormationInitialeContinue = Fiche08FormationInitialeContinue::where('uuid_reponse_annexe8', $fiche08UuidCondidat->uuid)->get();
            if ($fiche08FormationInitialeContinue !== null) {
                return response()->json([
                    "fiche08FormationInitiale" => $fiche08FormationInitialeContinue,
                    "parametreFormation" => $parametreFormation,
                    "connaissanceFormation" => $connaissanceFormation,
                ]);
            }
            return response()->json('message', "fiche non trouvé");
        }

        return response()->json(['parametreFormation' => $parametreFormation], 200);
    }

    public function sigecCreate(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);

        $sigecConnaissance = SigecConnaissance::where('cin', $input['cin'])->get();

        return response()->json([
            "sigecConnaissance" => $sigecConnaissance
        ]);
    }

    public function store(Request $request)
    {
        try {
            $input = $request->all();

            Fiche08FormationInitialeContinue::create($input);
            return response()->json('message', "créé avec succée!");
        } catch (Exception $e) {
            return response()->json('error', $e->getMessage());
        }
    }
}
