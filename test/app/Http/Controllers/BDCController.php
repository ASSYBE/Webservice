<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Parametre;
use Exception;
use Illuminate\Http\Request;

class BDCController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $input = $request->all();

        $ficheName = Parametre::where("nom_liste", 'fiche')->get();
        $phase = Parametre::where("nom_liste", 'phase')->get();
        $type = Parametre::where("nom_liste", 'type')->get();

        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "ficheName" => $ficheName,
                "phase" => $phase,
                "type" => $type,
            ], 200);


        return response()->json([
            "message" => "Bilan des compétences trouvé",
            "bdc" => $bdc,
            "ficheName" => $ficheName,
            "phase" => $phase,
            "type" => $type,
            "type_beneficier" => $bdc->type_beneficier
        ], 201);
    }

    public function store(Request $request)
    {
        try {
            $input = $request->all();
            $bdc = BDC::create($input);
            return response()->json([
                "message" => "Bilan des compétences créé avec succès",
                "data" => $bdc
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "message" => "Une erreur s'est produite lors de la création",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {

            $request->validate([
                'cin' => 'required|string',
            ]);

            $bdc = BDC::where("cin", $request->query('cin'))->first();

            if (!$bdc) {
                return response()->json([
                    "message" => "Not found",
                ], 404);
            }

            $data = $request->all();

            $bdc->update([
                'type_beneficier' => $data['type_beneficier']
            ]);

            return response()->json([
                "message" => "Updated successfully",
                "data" => $bdc
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "message" => "Une erreur s'est produite lors de la mise à jour",
                "error" => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
