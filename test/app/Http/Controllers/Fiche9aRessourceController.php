<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche9a;
use App\Models\Fiche9aRessource;
use Illuminate\Http\Request;

class Fiche9aRessourceController extends Controller
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

        $fiche9aRessource = Fiche9aRessource::create($validatedData);

        return response()->json([
            'message' => 'Fiche09a ressource created successfully.',
            'fiche' => $fiche9aRessource
        ], 201);
    }

    public function delete(string $id)
    {
        $ressource = Fiche9aRessource::findOrFail($id);
        $ressource->delete();

        return response()->json([
            'message' => 'Ressource deleted successfully'
        ], 200);
    }
}
