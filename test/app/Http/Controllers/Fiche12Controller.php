<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche08Connaissance;
use App\Models\Fiche12;
use App\Models\Fiche12_connaissance;
use App\Models\Fichier;
use App\Models\Formation;
use App\Models\Parametre;
use App\Models\SigecConnaissance;
use Illuminate\Http\Request;

class Fiche12Controller extends Controller
{
    public function create(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json(['message' => 'BDC not found!'], 404);
        }

        $fiche12 = Fiche12::where('cin', $input['cin'])->first();
        $formation = Formation::all();
        $connaissancefiche8 = Fiche08Connaissance::where('CIN', $input['cin'])->get();


        $files = Fichier::whereIn('id', function ($query) use ($input) {
            $query->select('valeur_id_secteur')
                ->from('fiche05_secteur')
                ->where('CIN', $input['cin']);
        })->get();

        if (!$fiche12) {
            Fiche12::create([
                'cin' => $input['cin'],
                'UUID_BDC' => $bdc->id,
                'createur' => $input['nom'],
            ]);
            $bdc->update([
                'fiche_actuel' => 'fiche12',
                'statusFiche12' => 'Initier',
            ]);
        }


        return response()->json([
            'fiche12' => $fiche12,
            'formation' => $formation,
            'files' => $files,
            'connaissancefiche8' => $connaissancefiche8,
        ]);
    }

    function connaissanceIndex(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json(['message' => 'BDC not found!'], 404);
        }

        $fiche12 = Fiche12::where('cin', $input['cin'])->first();

        $connaissance = Fiche12_connaissance::where('reponse_fiche12_id', $fiche12->id)->get();
        return response()->json([
            'connaissance' => $connaissance,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $input = $request->all();

        $fiche12 = Fiche12::find($id);
        if (!$fiche12) {
            return response()->json([
                "message" => "Fiche 12 not found",
            ], 404);
        }

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json(['message' => 'BDC not found!'], 404);
        }

        $validated = $request->validate([
            'formationIC_FormationQ1' => 'required|string',
            'histoireProfessionalle_Q3' => 'nullable|string',
            'histoireProfessionalle_Q4' => 'nullable|string',
            'histoireProfessionalle_Q5' => 'nullable|string',
            'histoireProfessionalle_Q6' => 'nullable|string',
            'histoireProfessionalle_Q7' => 'nullable|string',
            'histoireProfessionalle_Q8' => 'nullable|string',
        ]);

        $fiche12->update($validated);

        $bdc->update([
            'fiche_actuel' => 'fiche12',
            'statusFiche12' => 'Terminé',
        ]);

        return response()->json([
            'fiche12' => $fiche12,
            'message' => "Updated successfully!",
        ]);
    }

    public function createConnaissanceSigec(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json(['message' => 'BDC not found!'], 404);
        }

        $fiche12 = Fiche12::where('cin', $bdc->cin)->first();
        if (!$fiche12)
            return response()->json([
                'message' => 'doesn\'t exist!'
            ], 404);


        foreach ($input['connaissances'] as $connaissance) {
            $existingRecord = Fiche12_connaissance::where('id', $connaissance['id'])->first();
            $connaissance["id"] = $connaissance->id;
            $connaissance['response_fiche12_id'] = $fiche12->id;
            if (!$existingRecord) {
                Fiche12_connaissance::create($connaissance);
            }
        }

        return response()->json([
            'message' => 'connaissance sigec added successfully !'
        ], 200);
    }



    public function storeConnaissance(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json(['message' => 'BDC not found!'], 404);
        }

        $fiche12 = Fiche12::where('cin', $bdc->cin)->first();
        if (!$fiche12)
            return response()->json([
                'message' => 'doesn\'t exist!'
            ]);

        $input['reponse_fiche12_id'] = $fiche12->id;
        Fiche12_connaissance::create($input);

        return response()->json([
            'message' => 'connaissance added successfully !'
        ], 200);
    }

    public function deleteConnaissance(Request $request, string $id)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json(['message' => 'BDC not found!'], 404);
        }

        $connaissance = Fiche12_connaissance::find($id);

        if (!$connaissance) {
            return response()->json(['message' => 'Connaissance not found!'], 404);
        }

        $connaissance->delete();

        return response()->json([
            'message' => 'Connaissance deleted successfully!'
        ], 200);
    }
}
