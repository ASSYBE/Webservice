<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Fiche16;
use App\Models\Fiche16_softSkill;
use App\Models\Fiche19;
use App\Models\Fiche19_hypothese_desire;
use App\Models\Fiche19_hypothese_valide;
use App\Models\Fiche19_softSkill;
use App\Models\Parametre_profession;
use Illuminate\Http\Request;

class Fiche19Controller extends Controller
{
    public function create(Request $request)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche19::where('UUID_BDC', $bdc->id)->first();


        if (!$fiche) {
            Fiche19::create([
                'cin' => $input['cin'],
                'UUID_BDC' => $bdc->id,
            ]);

            $bdc->update([
                'statusFiche19' => 'Initier',
            ]);
        }

        $fiche_hypothese_valide = Fiche19_hypothese_valide::where('reponse_fiche19_id', $fiche->id)->get();
        $fiche_hypothese_desire = Fiche19_hypothese_desire::where('reponse_fiche19_id', $fiche->id)->get();


        return response()->json([
            'message' => 'seeking information finished successfully!',
            'fiche' => $fiche,
            'fiche_hypothese_valide' => $fiche_hypothese_valide,
            'fiche_hypothese_desire' => $fiche_hypothese_desire,
        ], 200);
    }

    public function index_profession()
    {
        $parametreProfession = Parametre_profession::where('nom_liste', 'profession')->get();
        return response()->json([
            'message' => 'seeking profession successfully!',
            'parametreProfession' => $parametreProfession
        ], 200);
    }

    public function store_hypothese_valide(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found BDC !'
            ], 404);

        $fiche = Fiche19::findOrFail($id);

        Fiche19_hypothese_valide::create([
            'reponse_fiche19_id' => $fiche->id,
            'hypothese_parcours_valide' => $input['hypothese_parcours_valide']
        ]);


        $bdc->update([
            'statusFiche19' => 'Terminé',
            'dateCreationFiche19' => now(),
        ]);

        return response()->json([
            'message' => "hypothese valide added successfully!"
        ]);
    }

    public function delete_hypothese_valide(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found BDC !'
            ], 404);

        $fiche = Fiche19_hypothese_valide::findOrFail($id);
        $fiche->delete();

        return response()->json([
            'message' => "hypothese valide deleted successfully!"
        ]);
    }

    public function store_hypothese_desire(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found BDC !'
            ], 404);

        $fiche = Fiche19::findOrFail($id);

        Fiche19_hypothese_desire::create([
            'reponse_fiche19_id' => $fiche->id,
            'hypothese_parcours_desire' => $input['hypothese_parcours_desire']
        ]);

        $bdc->update([
            'statusFiche19' => 'Terminé',
            'dateCreationFiche19' => now(),
        ]);

        return response()->json([
            'message' => "hypothese desire added successfully!"
        ]);
    }

    public function delete_hypothese_desire(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found BDC !'
            ], 404);

        $fiche = Fiche19_hypothese_desire::findOrFail($id);
        $fiche->delete();

        return response()->json([
            'message' => "hypothese desire deleted successfully!"
        ]);
    }
}
