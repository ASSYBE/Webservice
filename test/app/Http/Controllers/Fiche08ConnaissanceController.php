<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche08;
use App\Models\Fiche08Connaissance;
use Exception;
use Illuminate\Http\Request;

class Fiche08ConnaissanceController extends Controller
{


    public function store(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);

        $fiche08 = Fiche08::where("uuid_condidat", $input['cin'])->first();

        if (!$fiche08) {
            return response()->json([
                'message' => 'Fiche08 not found for the provided CIN.'
            ], 404);
        }

        $validatedData = $request->validate([
            "uuid_parameter_formation" => "required|string",
            "connaissance" => "required|string",
            "autoEvaluationMaitrise" => "required|string",
            "autoEvaluationInteret" => "required|string"
        ]);

        $validatedData['uuid_fiche8'] = $fiche08->id;
        $validatedData['CIN'] = $input['cin'];
        $validatedData['UUID_BDC'] = $bdc->id;
        $validatedData['createur'] = $input['nom'];

        $fiche08Connaissance = Fiche08Connaissance::create($validatedData);

        return response()->json([
            'message' => 'Fiche08 Connaissance created successfully.',
            'fiche' => $fiche08Connaissance
        ], 201);
    }

    public function show(string $id)
    {
        $fiche08Connaissance = Fiche08Connaissance::find($id);

        if (!$fiche08Connaissance) {
            return response()->json([
                'message' => 'Fiche08 Connaissance not found for the provided ID.'
            ], 404);
        }

        return response()->json([
            'message' => 'Fiche08 Connaissance retrieved successfully.',
            'fiche' => $fiche08Connaissance
        ], 200);
    }

    public function edit(Request $request, string $id)
    {
        $fiche08Connaissance = Fiche08Connaissance::find($id);

        if (!$fiche08Connaissance) {
            return response()->json([
                'message' => 'Fiche08 Connaissance not found for the provided ID.'
            ], 404);
        }

        $validatedData = $request->validate([
            "uuid_parameter_formation" => "required|string",
            "connaissance" => "required|string",
            "autoEvaluationMaitrise" => "required|string",
            "autoEvaluationInteret" => "required|string"
        ]);

        $fiche08Connaissance->uuid_parameter_formation = $validatedData['uuid_parameter_formation'];
        $fiche08Connaissance->connaissance = $validatedData['connaissance'];
        $fiche08Connaissance->autoEvaluationMaitrise = $validatedData['autoEvaluationMaitrise'];
        $fiche08Connaissance->autoEvaluationInteret = $validatedData['autoEvaluationInteret'];

        $fiche08Connaissance->save();

        return response()->json(
            [
                'message' => 'Fiche08 Connaissance updated successfully.',
                'fiche' => $fiche08Connaissance
            ],
            200
        );
    }

    public function delete(string $id)
    {
        try {
            $fiche = Fiche08Connaissance::findOrFail($id);

            $fiche->delete();

            return response()->json(['message' => 'Fiche supprimée avec succès'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erreur lors de la suppression de la fiche'], 500);
        }
    }
}
