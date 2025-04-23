<?php

namespace App\Http\Controllers;

use App\Models\Beneficier;
use App\Models\Fiche08;
use App\Models\Fiche08ExtraProfessionnelle;
use App\Models\Parametre;
use Illuminate\Http\Request;

class Fiche08ExtraProfessionnelleController extends Controller
{
    public function index(Request $request)
    {
        $input = $request->all();

        $fiche = Fiche08::where("uuid_condidat", $input['cin'])->first();

        $parametreType = Parametre::where('nom_liste', 'extrapro')->get();
        $parametreFrequence = Parametre::where('nom_liste', 'frequence')->get();


        $fiche08ExtraProfessionnelle = Fiche08ExtraProfessionnelle::where('uuid_fiche8', $fiche->id)->get();

        return response()->json([
            'fiche08ExtraProfessionnelle' => $fiche08ExtraProfessionnelle,
            'parametreType' => $parametreType,
            'parametreFrequence' => $parametreFrequence
        ]);
    }


    public function store(Request $request)
    {
        $input = $request->all();

        $fiche = Fiche08::where("uuid_condidat", $input['cin'])->first();

        $input = $request->validate([
            'description' => 'required|string',
            'frequence' => 'required|string',
            'lieu' => 'required|string',
            'avecQui' => 'required|string',
            'type' => 'required|string'
        ]);
        $input['uuid_fiche8'] = $fiche->id;

        Fiche08ExtraProfessionnelle::create($input);
        return response()->json([
            'message' => 'Fiche08 created successfully 2.',
        ]);
    }

    public function edit(string $id)
    {
        $fiche = Fiche08ExtraProfessionnelle::find($id);

        if (!$fiche) {
            return response()->json([
                'message' => 'Fiche not found for the provided ID.'
            ], 404);
        }

        return response()->json([
            'message' => 'Fiche08 updated successfully.',
            'fiche' => $fiche
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $fiche = Fiche08ExtraProfessionnelle::find($id);

        if (!$fiche) {
            return response()->json([
                'message' => 'Fiche not found for the provided ID.'
            ], 404);
        }

        $validatedData = $request->validate([
            'description' => 'required|string',
            'frequence' => 'required|string',
            'lieu' => 'required|string',
            'avecQui' => 'required|string',
            'type' => 'required|string',
        ]);

        $fiche->update($validatedData);

        return response()->json([
            'message' => 'Fiche08 updated successfully.',
            'fiche' => $fiche
        ], 200);
    }


    public function destroy(string $id)
    {
        $fiche = Fiche08ExtraProfessionnelle::find($id);

        if (!$fiche) {
            return response()->json([
                'message' => 'Fiche not found for the provided ID.'
            ], 404);
        }

        $fiche->delete();

        return response()->json([
            'message' => 'Fiche08 deleted successfully.'
        ], 200);
    }
}
