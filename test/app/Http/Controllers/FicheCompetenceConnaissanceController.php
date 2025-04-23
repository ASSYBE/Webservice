<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche05_secteur;
use App\Models\Fiche08;
use App\Models\FicheCompetenceConnaissance;
use App\Models\Fichier;
use App\Models\Files;
use Illuminate\Http\Request;

class FicheCompetenceConnaissanceController extends Controller
{
    public function index(Request $request)
    {
        $input = $request->all();

        $fiche08 = Fiche08::where("uuid_condidat", $input['cin'])->first();

        if ($fiche08 !== null) {
            $files = Fichier::whereIn('id', function ($query) use ($input) {
                $query->select('valeur_id_secteur')
                    ->from('fiche05_secteur')
                    ->where('CIN', $input['cin']);
            })->get();

            $ficheCompetenceConnaissance = FicheCompetenceConnaissance::where("uuid_fiche8", $fiche08->id)->get();

            if ($files->isNotEmpty()) {
                return response()->json([
                    'ficheCompetenceConnaissance' => $ficheCompetenceConnaissance,
                    'files' => $files,
                ], 200);
            } else {
                return response()->json(['ficheCompetenceConnaissance' => $ficheCompetenceConnaissance,], 200);
            }
        }

        return response()->json(['message' => 'Fiche08 not found'], 404);
    }

    public function indexFiles(Request $request)
    {

        $input = $request->all();

        $files = Fichier::whereIn('id', function ($query) use ($input) {
            $query->select('valeur_id_secteur')
                ->from('fiche05_secteur')
                ->where('CIN', $input['cin']);
        })->get();

        if ($files->isNotEmpty()) {
            return response()->json([
                'files' => $files,
            ], 200);
        }
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
            'connaissance' => 'required|string|max:255',
        ]);

        $validatedData['uuid_fiche8'] = $fiche08->id;
        $validatedData['CIN'] = $input['cin'];
        $validatedData['UUID_BDC'] = $bdc->id;
        $validatedData['createur'] = $input['cin'];

        $ficheCompetenceConnaissance = FicheCompetenceConnaissance::create($validatedData);

        return response()->json(
            [
                "fiche" => $ficheCompetenceConnaissance,
                "message" => "Created successfully"
            ],
            200
        );
    }

    public function delete(string $id)
    {
        $ficheCompetenceConnaissance = FicheCompetenceConnaissance::find($id);

        if (!$ficheCompetenceConnaissance) {
            return response()->json([
                "message" => "Record not found"
            ], 404);
        }

        $ficheCompetenceConnaissance->delete();

        return response()->json([
            "message" => "Record deleted successfully"
        ], 200);
    }
}
