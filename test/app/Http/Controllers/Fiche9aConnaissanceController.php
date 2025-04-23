<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche9a;
use App\Models\Fiche9aConnaissances;
use Illuminate\Http\Request;

class Fiche9aConnaissanceController extends Controller
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

        $data = $request->all();

        $data['uuid_fiche9'] = $fiche9a->id;
        $data['UUID_BDC'] = $bdc->id;
        $data['createur'] = $input['nom'];

        $fiche9Connaissance = Fiche9aConnaissances::create($data);

        return response()->json([
            'message' => 'Fiche09a Connaissance created successfully.',
            'fiche' => $fiche9Connaissance
        ], 201);
    }

    public function delete(string $id)
    {
        $connaissance = Fiche9aConnaissances::findOrFail($id);
        $connaissance->delete();

        return response()->json([
            'message' => 'Connaissance deleted successfully'
        ], 200);
    }
}
