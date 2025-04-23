<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche08;
use App\Models\Fiche08ExperienceProfessionnelle;
use App\Models\Fiche11A;
use App\Models\SigecExperienceProfessionnelle;
use Illuminate\Http\Request;

class Fiche08ExperienceProfessionnelleController extends Controller
{
    public function create(Request $request)
    {
        $input = $request->all();

        $fiche08 = Fiche08::where("uuid_condidat", $input['cin'])->first();
        if ($fiche08 !== null) {

            $fiche08ExperienceProfessionnelle = Fiche08ExperienceProfessionnelle::where("CIN", $input['cin'])->get();
            return response()->json([
                'fiche08ExperienceProfessionnelle' => $fiche08ExperienceProfessionnelle,
            ]);
        } else {
            return response()->json([
                'message' => "fiche08 not found ",
                404
            ]);
        }
    }
    public function createSigec()
    {
        $sigecExperienceProfessionnelle = SigecExperienceProfessionnelle::all();
        return response()->json([
            'sigecExperienceProfessionnelle' => $sigecExperienceProfessionnelle,
        ]);
    }

    public function sigecStore(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc) {
            return response()->json([
                "message" => "BDC not found",
            ], 404);
        }

        $fiche08 = Fiche08::where("uuid_condidat", $input['cin'])->first();
        if (!$fiche08) {
            return response()->json([
                "message" => "Fiche08 not found",
            ], 404);
        }

        $sigecExperienceProfessionnelle = SigecExperienceProfessionnelle::where('cin', $input['cin'])->get();

        if ($sigecExperienceProfessionnelle->isEmpty()) {
            return response()->json([
                "message" => "No Sigec experiences found",
            ], 404);
        }
        foreach ($sigecExperienceProfessionnelle as $sigec) {
            $existingRecord = Fiche08ExperienceProfessionnelle::where('id', $sigec['id'])->first();

            if (!$existingRecord) {
                Fiche08ExperienceProfessionnelle::create([
                    "id" => $sigec->id,
                    "uuid_fiche8" => $fiche08->id,
                    "IntitulePoste" => $sigec->IntitulePoste,
                    "activiteExercee" => $sigec->activiteExercee,
                    "periode_debut" => $sigec->periode_debut,
                    "periode_fin" => $sigec->periode_fin,
                    "circonstanceInterruption" => $sigec->circonstanceInterruption,
                    "CIN" => $input['cin'],
                    'UUID_BDC' => $bdc->id,
                    'type' => "sigec",
                    'createur' => $input['cin'],
                ]);
            }
        }

        return response()->json([
            "message" => "added successfully"
        ]);
    }


    // public function save(Request $request)
    // {
    //     $id = $request->query('id');

    //     $input = $request->all();
    //     $beneficier = Beneficier::where('cin', $input['cin'])->first();

    //     if (!$beneficier)
    //         return response()->json([
    //             "message" => "not found",
    //         ], 404);

    //     $bdc = BDC::where("cin", $input['cin'])->first();
    //     if (!$bdc)
    //         return response()->json([
    //             "message" => "not found",
    //         ], 404);

    //     $fiche08 = Fiche08::where("uuid_condidat", $input['cin'])->first();

    //     $fiche = Fiche08ExperienceProfessionnelle::create([
    //         'id' => $id,
    //         'uuid_fiche8' => $fiche08->id,
    //         'CIN' => $input['cin'],
    //         'UUID_BDC' => $bdc->id,
    //         'createur' => $input['cin'],
    //     ]);

    //     return response()->json([
    //         'fiche' => $fiche,
    //     ], 200);
    // }

    public function save(Request $request)
    {
        $id = $request->query('id');

        $input = $request->all();

        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);

        $fiche08 = Fiche08::where("uuid_condidat", $input['cin'])->first();

        $existingFiche = Fiche08ExperienceProfessionnelle::where('id', $id)->first();

        if ($existingFiche) {
            return response()->json([
                'message' => 'Record already exists.',
            ], 409);
        }

        $fiche = Fiche08ExperienceProfessionnelle::create([
            'id' => $id,
            'uuid_fiche8' => $fiche08->id,
            'CIN' => $input['cin'],
            'UUID_BDC' => $bdc->id,
            'createur' => $input['cin'],
        ]);

        return response()->json([
            'fiche' => $fiche,
        ], 200);
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where("cin", $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                "message" => "not found",
            ], 404);
        $fiche08 = Fiche08::where("uuid_condidat", $input['cin'])->first();

        if ($bdc) {
            $validatedData = $request->validate([
                'IntitulePoste' => 'required|string|max:255',
                'activiteExercee' => 'required|string',
                'periode_debut' => 'required',
                'circonstanceInterruption' => 'nullable|string',
            ]);

            $validatedData['uuid_fiche8'] = $fiche08->id;
            $validatedData['CIN'] = $input['cin'];
            $validatedData['UUID_BDC'] = $bdc->id;
            $validatedData['createur'] = $input['cin'];
            $validatedData['periode_fin'] = $input['periode_fin'];

            $fiche = Fiche08ExperienceProfessionnelle::create($validatedData);
            return response()->json(
                [
                    'message' => 'Fiche mise à jour avec succès',
                    'fiche' => $fiche,
                ],
                200
            );
        } else {
            return response()->json(
                [
                    'message' => 'BDC non trouvé pour le CIN fourni.',
                ],
                404
            );
        }
    }
    public function update(Request $request, string $id)
    {
        $validated = $request->all();

        $experience = Fiche08ExperienceProfessionnelle::find($id);

        if (!$experience) {
            return response()->json(['error' => 'Experience not found'], 404);
        }

        $experience->update([
            'activitesPrincipales' => $validated['activitesPrincipales'],
            'activitesSecondaires' => $validated['activitesSecondaires'],
            'aspectsPositifs' => $validated['aspectsPositifs'],
            'aspectsNegatifs' => $validated['aspectsNegatifs'],
            'connaissancesNecessaires' => $validated['connaissancesNecessaires'],
            'responsabilites' => $validated['responsabilites'],
            'problemesRencontres' => $validated['problemesRencontres'],
            'niveauAutonomie' => $validated['niveauAutonomie'],
            'savoirFaire' => $validated['savoirFaire'],
        ]);

        return response()->json(['message' => 'Experience updated successfully', 'data' => $experience], 200);
    }


    public function delete(string $id)
    {
        $fiche = Fiche08ExperienceProfessionnelle::find($id);
        if (!$fiche) {
            return response()->json([
                'message' => "Fiche d'expérience non trouvée !",
            ], 404);
        }

        $existingExperience = Fiche11A::where('experience', $fiche->IntitulePoste)->first();

        if ($existingExperience) {
            return response()->json([
                'message' => 'Cette expérience est liée à une fiche "Le bilan des expériences" et ne peut pas être supprimée.',
            ], 400);
        }

        $fiche->delete();

        return response()->json([
            'message' => 'Fiche d\'expérience supprimée avec succès',
        ], 200);
    }
}
