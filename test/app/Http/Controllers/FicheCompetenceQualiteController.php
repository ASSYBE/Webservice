<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche08;
use App\Models\FicheCompetenceQualite;
use Illuminate\Http\Request;

class FicheCompetenceQualiteController extends Controller
{
    public function index(Request $request)
    {
        $input = $request->all();

        $fiche08 = Fiche08::where("uuid_condidat", $input['cin'])->first();
        if ($fiche08 !== null) {
            $ficheCompetenceQualite = FicheCompetenceQualite::where("uuid_fiche8", $fiche08->id)->get();
            return response()->json([
                'ficheCompetenceQualite' => $ficheCompetenceQualite
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
            'qualite' => 'required|string|max:255',
        ]);

        $validatedData['uuid_fiche8'] = $fiche08->id;
        $validatedData['CIN'] = $input['cin'];
        $validatedData['UUID_BDC'] = $bdc->id;
        $validatedData['createur'] = $input['cin'];

        $ficheCompetenceQualite = FicheCompetenceQualite::create($validatedData);

        return response()->json(
            [
                "fiche" => $ficheCompetenceQualite,
                "message" => "Created successfully"
            ],
            200
        );
    }

    public function delete(string $id)
    {
        $ficheCompetenceQualite = FicheCompetenceQualite::find($id);

        if (!$ficheCompetenceQualite) {
            return response()->json([
                "message" => "Record not found"
            ], 404);
        }

        $ficheCompetenceQualite->delete();

        return response()->json([
            "message" => "Record deleted successfully"
        ], 200);
    }
}
