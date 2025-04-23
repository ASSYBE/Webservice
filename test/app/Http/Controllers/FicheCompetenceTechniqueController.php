<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche08;
use App\Models\FicheCompetenceTechnique;
use Illuminate\Http\Request;

class FicheCompetenceTechniqueController extends Controller
{
    public function index(Request $request)
    {
        $input = $request->all();

        $fiche08 = Fiche08::where("uuid_condidat", $input['cin'])->first();
        if ($fiche08 !== null) {
            $ficheCompetenceTechnique = FicheCompetenceTechnique::where("uuid_fiche8", $fiche08->id)->get();
            return response()->json([
                'ficheCompetenceTechnique' => $ficheCompetenceTechnique
            ], 200);
        }
        return response()->json(["message", "not found"], 404);
    }

    public function store(Request $request)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json(
                [
                    "message" => "BDC not found"
                ],
                404
            );
        }

        $fiche08 = Fiche08::where("uuid_condidat", $input['cin'])->first();
        if (!$fiche08) {
            return response()->json(
                [
                    "message" => "Fiche 08 not found"
                ],
                404
            );
        }

        $validatedData = $request->validate([
            'technique' => 'required|string|max:255',
        ]);

        $validatedData['uuid_fiche8'] = $fiche08->id;
        $validatedData['CIN'] = $input['cin'];
        $validatedData['UUID_BDC'] = $bdc->id;
        $validatedData['createur'] = $input['cin'];

        $ficheCompetenceTechnique = FicheCompetenceTechnique::create($validatedData);

        return response()->json(
            [
                "fiche" => $ficheCompetenceTechnique,
                "message" => "Created successfully"
            ],
            200
        );
    }

    public function delete(string $id)
    {
        $ficheCompetenceTechnique = FicheCompetenceTechnique::find($id);

        if (!$ficheCompetenceTechnique) {
            return response()->json([
                "message" => "Record not found"
            ], 404);
        }

        $ficheCompetenceTechnique->delete();

        return response()->json([
            "message" => "Record deleted successfully"
        ], 200);
    }
}
