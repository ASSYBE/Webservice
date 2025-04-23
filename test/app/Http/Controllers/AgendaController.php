<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\Beneficier;
use App\Models\Fiche03;
use App\Models\Parametre;
use App\Models\User;
use Exception;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Mockery\Generator\Parameter;

class AgendaController extends Controller
{

    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {

        try {

            $input = $request->all();
            $status = Parametre::where('nom_liste', 'status')->get();
            $type_rdv = Parametre::where('nom_liste', 'RDV')->get();

            $totalHours = 0.0;

            $agendas = Agenda::where("beneficier_id", $input['cin'])->get();
            $fiche03 = Fiche03::where("CIN", $input['cin'])->first();

            foreach ($agendas as $agenda) {
                $heure_debut = Carbon::parse($agenda->heure_RDV_debut);
                $heure_fin = Carbon::parse($agenda->heure_RDV_fin);

                $diffInMinutes = $heure_debut->diffInMinutes($heure_fin);
                $diffInHours = $diffInMinutes / 60;

                $totalHours += $diffInHours;
            }

            $roundedHours = floor($totalHours);
            return response()->json([
                'agendas' => $agendas,
                'status' => $status,
                'type_rdv' => $type_rdv,
                'total_hours' => $roundedHours,
                'fiche03' => $fiche03,
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => 'error: ' . $e->getMessage()], 500);
        }
    }


    public function store(Request $request)
    {
        try {
            $input = $request->all();

            $validatedData = $request->validate([
                'objet' => 'required|string|max:255',
                'date_RDV' => 'required|date',
                'heure_RDV_debut' => 'required',
                'heure_RDV_fin' => 'required',
                'type_RDV' => 'required|string',
            ]);

            $validatedData['commentaire'] = $request->has('commentaire') ? $input['commentaire'] : '';
            $validatedData['present'] = $input['present'];
            $validatedData['beneficier_id'] = $input['cin'];
            $validatedData['createur'] = $input['nom'];
            Agenda::create($validatedData);
            return response()->json([
                'message' => 'Rendez-vous créé avec succès'
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something is wrong. Please check your input'
            ], 500);
        }
    }


    public function update(Request $request, string $id)
    {
        $input = $request->all();
        $validatedData = $request->validate([
            'objet' => 'required|string|max:255',
            'date_RDV' => 'required|date',
            'heure_RDV_debut' => 'required',
            'heure_RDV_fin' => 'required',
            'type_RDV' => 'required|string',
        ]);
        if ($request->has('commentaire')) {
            $validatedData['commentaire'] = $input['commentaire'];
        }
        $validatedData['present'] = $input['present'];
        $agenda = Agenda::where('id', $id)->firstOrFail();

        try {
            $agenda->update($validatedData);
            return response()->json([
                'message' => 'Rendez-vous créé avec succès'
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something is wrong. Please check your input'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            Agenda::destroy($id);
            return view('pages.agenda')->with('message', 'deleted successfully');
        } catch (Exception $e) {
            return view('pages.agenda')->with('message', $e->getMessage());
        }
    }
}
