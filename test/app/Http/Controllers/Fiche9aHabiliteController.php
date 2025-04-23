<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche9a;
use App\Models\Fiche9aHabilite;
use Illuminate\Http\Request;

class Fiche9aHabiliteController extends Controller
{
    public function store(Request $request)
    {

        $input = $request->all();

        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);

        $fiche9a = Fiche9a::where("cin", $input['cin'])->first();

        if (!$fiche9a) {
            return response()->json([
                'message' => 'Fiche09a not found for the provided CIN.'
            ], 404);
        }

        $validatedData = $request->all();

        $validatedData['uuid_fiche9'] = $fiche9a->id;
        $validatedData['UUID_BDC'] = $bdc->id;
        $validatedData['createur'] = $input['nom'];

        $fiche9aHabilite = Fiche9aHabilite::create($validatedData);

        return response()->json([
            'message' => 'Fiche09a habilité created successfully.',
            'fiche' => $fiche9aHabilite
        ], 201);
    }

    public function delete(string $id)
    {
        $habilite = Fiche9aHabilite::findOrFail($id);
        $habilite->delete();

        return response()->json([
            'message' => 'Habilite deleted successfully'
        ], 200);
    }
}
