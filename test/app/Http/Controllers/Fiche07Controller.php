<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche07;
use Illuminate\Http\Request;

class Fiche07Controller extends Controller
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


        $fiche = Fiche07::where('CIN', $input['cin'])->first();
        if ($fiche == null) {
            $bdc = BDC::where("cin", $input['cin'])->first();
            if (!$bdc)
                return response()->json([
                    "message" => "not found",
                ], 404);
            Fiche07::create([
                'CIN' => $input['cin'],
                'reponse_Q1' => now(),
                'status_fiche' => 'Initier',
                'UUID_BDC' => $bdc->id
            ]);

            $bdc->update([
                'fiche_actuel' => 'fiche07',
                'statusFiche07' => 'Initier',
            ]);
        }
        return response()->json([
            'fiche' => $fiche,
        ]);
    }

    public function store(Request $request)
    {


        $data = $request->all();

        $bdc = BDC::where("cin", $data['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);

        $data['CIN'] = $data['cin'];
        $data['UUID_BDC'] = $bdc->id;
        $data['createur'] = $data['nom'];
        $data['status_fiche'] = "En cours";

        $fiche = Fiche07::where('CIN', $data['cin'])->first();

        $bdc->update([
            'fiche_actuel' => 'fiche07',
            'statusBDC' => 'En cours',
            'statusEtape01' => 'En cours',
            'statusFiche07' => 'Initier',
        ]);

        return response()->json([
            'message' => 'Fiche enregistrée avec succès',
            'fiche' => $fiche,
        ], 200);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fiche07 $fiche07)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $fiche = Fiche07::findOrFail($id);

        $data = $request->all();

        $bdc = BDC::where("cin", $data['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);

        $data['CIN'] = $data['cin'];
        $data['UUID_BDC'] = $bdc->id;
        $data['createur'] = $data['nom'];
        $data['status_fiche'] = "Terminé";
        $fiche->update($data);
        $bdc = BDC::where('cin', $data['cin'])->first();
        $bdc->update([
            'fiche_actuel' => 'fiche07',
            'statusFiche07' => 'Terminé',
            'dateCreationFiche07' => now(),
        ]);

        return response()->json([
            'message' => 'Fiche mise à jour avec succès',
            'fiche' => $fiche,
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fiche07 $fiche07)
    {
        //
    }
}
