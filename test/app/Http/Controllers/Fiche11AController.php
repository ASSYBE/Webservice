<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche08ExperienceProfessionnelle;
use App\Models\Fiche11A;
use App\Models\Fiche11A_N1;
use App\Models\Fiche11A_N2_capa;
use App\Models\Fiche11A_N2_style;
use App\Models\ParametreCapacit;
use App\Models\ParametreStyle;
use App\Models\SigecExperienceProfessionnelle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Fiche11AController extends Controller
{
    public function index(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json(['message' => 'BDC not found!'], 404);
        }

        $fiche = Fiche11A::where('cin', $input['cin'])->get();

        $fiche11aN1 = Fiche11A_N1::whereIn('uuid_reponse_fiche11a', $fiche->pluck('id'))->get();

        $fiche11aN1Capa = Fiche11A_N2_capa::whereIn('uuid_reponse_fiche11a_n1', $fiche->pluck('id'))->get();
        $fiche11aN1Sty = Fiche11A_N2_style::whereIn('uuid_reponse_fiche11a_n1', $fiche->pluck('id'))->get();

        return response()->json([
            'message' => 'Added successfully!',
            'fiche11A' => $fiche,
            'fiche11aN1' => $fiche11aN1,
            'fiche11aN1Capa' => $fiche11aN1Capa,
            'fiche11aN1Sty' => $fiche11aN1Sty,
        ]);
    }


    public function create(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json(['message' => 'BDC not found!'], 404);
        }

        $fiche = Fiche11A::where('cin', $input['cin'])->first();

        $parametreCapacite = ParametreCapacit::all();
        $parametreStyle = ParametreStyle::all();

        $existingExperiences = Fiche11A::where('cin', $input['cin'])
            ->pluck('experience')
            ->toArray();

        $fiche8ExperiencePro = Fiche08ExperienceProfessionnelle::where('cin', $input['cin'])
            ->get();

        $fiche8ExperienceProUnique = $fiche8ExperiencePro->filter(function ($experience) use ($existingExperiences) {
            return !in_array($experience->IntitulePoste, $existingExperiences);
        })->values();

        $fiche8ExperienceProUniqueArray = $fiche8ExperienceProUnique->toArray();

        if (!$fiche) {
            $bdc->update([
                'fiche_actuel' => 'fiche11A',
                'statusFiche11A' => 'Initier',
            ]);
        }

        return response()->json([
            'message' => 'Added successfully!',
            'fiche11A' => $fiche,
            'fiche8Experience' => $fiche8ExperienceProUniqueArray,
            'parametreCapacite' => $parametreCapacite,
            'parametreStyle' => $parametreStyle,
        ]);
    }


    public function save(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json(['message' => 'BDC not found!'], 404);
        }

        $ficheEntries = [];

        if (isset($input['sigec']) && is_array($input['sigec'])) {
            foreach ($input['sigec'] as $sigec) {

                $tachesEffectue = isset($sigec['activitesPrincipales']) && isset($sigec['activitesSecondaires'])
                    ? $sigec['activitesPrincipales'] . ' ' . $sigec['activitesSecondaires']
                    : null;

                $existingRecord = Fiche11A::where('id', $sigec['id'])->first();

                if (!$existingRecord) {
                    $fiche11a = Fiche11A::create([
                        'id' => $sigec['id'],
                        'UUID_BDC' => $bdc->id,
                        'createur' => $input['cin'],
                        'cin' => $input['cin'],
                        'reponse_fiche8_id' => $input['reponse_fiche8_id'],
                        'experience' => $sigec['IntitulePoste'],
                        'date_debut' => $sigec['periode_debut'],
                        'date_fin' => $sigec['periode_fin'],
                        'tacheEffectue' => $tachesEffectue,
                        'type' => 'sigec'
                    ]);
                    $ficheEntries[] = $fiche11a;
                }
            }
        }

        return response()->json([
            'message' => 'Fiche 11A added successfully!',
            'fiche' => $ficheEntries
        ], 200);
    }



    public function store(Request $request)
    {
        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json(['message' => 'BDC not found!'], 404);
        }

        $fiche11a = Fiche11A::create([
            'UUID_BDC' => $bdc->id,
            'createur' => $input['cin'],
            'cin' => $input['cin'],
            'reponse_fiche8_id' => $input['reponse_fiche8_id'],
            'experience' => $input['experience'],
            'date_debut' => $input['date_debut'],
            'date_fin' => $input['date_fin'],
            'tacheEffectue' => $input['tacheEffectue'],
        ]);

        $bdc->update([
            'fiche_actuel' => 'fiche11A',
            'statusFiche11A' => 'Terminé',
        ]);


        $fiche11aN1 = Fiche11A_N1::where('uuid_reponse_fiche11a', $fiche11a->id)->first();
        if (!$fiche11aN1) {
            foreach ($input['connaissances'] as $connaissance) {
                Fiche11A_N1::create([
                    'uuid_reponse_fiche11a' => $fiche11a->id,
                    'connaissance' => $connaissance['connaissance'],
                ]);
            }
        }

        if ($fiche11a) {
            if (isset($input['capacite_operationnelles']) && !empty($input['capacite_operationnelles'])) {
                foreach ($input['capacite_operationnelles'] as $cap) {
                    Fiche11A_N2_capa::create([
                        'liste_id' => $cap['liste_id'],
                        'uuid_reponse_fiche11a_n1' => $fiche11a->id,
                        'capacite_operationnelles' => $cap['capacite_operationnelles'],
                        'cod' => $cap['cod'],
                    ]);
                }
            }

            if (isset($input['style_personnel']) && !empty($input['style_personnel'])) {
                foreach ($input['style_personnel'] as $style) {
                    Fiche11A_N2_style::create([
                        'liste_id' => $style['liste_id'],
                        'uuid_reponse_fiche11a_n1' => $fiche11a->id,
                        'style_personnel' => $style['style_personnel'],
                        'cod' => $style['cod'],
                    ]);
                }
            }
        } else {
            return response()->json(['message' => 'Failed to find or create Fiche11A_N1. Cannot insert capacite or style.'], 404);
        }

        return response()->json([
            'message' => 'Fiche 11A updated successfully!',
            'fiche' => $fiche11a
        ], 200);
    }

    public function edit($id)
    {
        $fiche11a = Fiche11A::find($id);
        if (!$fiche11a) {
            return response()->json(['message' => 'Fiche11A not found!'], 404);
        }

        $fiche11aN1 = Fiche11A_N1::where('uuid_reponse_fiche11a', $fiche11a->id)->get();

        $fiche11aN1Capa = Fiche11A_N2_capa::where('uuid_reponse_fiche11a_n1', $fiche11a->id)->get();
        $fiche11aN1Sty = Fiche11A_N2_style::where('uuid_reponse_fiche11a_n1', $fiche11a->id)->get();

        return response()->json([
            'fiche11A' => $fiche11a,
            'fiche11aN1' => $fiche11aN1,
            'fiche11aN1Capa' => $fiche11aN1Capa,
            'fiche11aN1Sty' => $fiche11aN1Sty,
        ]);
    }



    public function update(Request $request, $id)
    {

        $input = $request->all();

        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc) {
            return response()->json(['message' => 'BDC not found!'], 404);
        }

        $fiche11a = Fiche11A::find($id);
        if (!$fiche11a) {
            return response()->json(['message' => 'Fiche11A not found!'], 404);
        }

        $fiche11a->update([
            'experience' => $input['experience'],
            'date_debut' => $input['date_debut'],
            'date_fin' => $input['date_fin'],
            'tacheEffectue' => $input['tacheEffectue'],
        ]);

        $bdc->update([
            'fiche_actuel' => 'fiche11A',
            'statusFiche11A' => 'Terminé',
        ]);

        foreach ($input['connaissances'] as $connaissance) {
            Fiche11A_N1::updateOrCreate(
                [
                    'uuid_reponse_fiche11a' => $fiche11a->id,
                    'connaissance' => $connaissance['connaissance']
                ],
                ['connaissance' => $connaissance['connaissance']]
            );
        }

        if (isset($input['capacite_operationnelles']) && !empty($input['capacite_operationnelles'])) {
            Fiche11A_N2_capa::where('uuid_reponse_fiche11a_n1', $fiche11a->id)->delete();
            foreach ($input['capacite_operationnelles'] as $cap) {
                Fiche11A_N2_capa::updateOrCreate([
                    'liste_id' => $cap['liste_id'],
                    'uuid_reponse_fiche11a_n1' => $fiche11a->id,
                    'capacite_operationnelles' => $cap['capacite_operationnelles'],
                    'cod' => $cap['cod'],
                ]);
            }
        }

        if (isset($input['style_personnel']) && !empty($input['style_personnel'])) {
            Fiche11A_N2_style::where('uuid_reponse_fiche11a_n1', $fiche11a->id)->delete();
            foreach ($input['style_personnel'] as $style) {
                Fiche11A_N2_style::updateOrCreate([
                    'liste_id' => $style['liste_id'],
                    'uuid_reponse_fiche11a_n1' => $fiche11a->id,
                    'style_personnel' => $style['style_personnel'],
                    'cod' => $style['cod'],
                ]);
            }
        }

        return response()->json([
            'message' => 'Fiche 11A updated successfully!',
            'fiche' => $fiche11a
        ], 200);
    }



    public function delete(string $id)
    {
        DB::beginTransaction();

        try {
            $fiche = Fiche11A::findOrFail($id);

            $fiche11aN1 = Fiche11A_N1::where('uuid_reponse_fiche11a', $fiche->id)->get();
            foreach ($fiche11aN1 as $n1) {
                Fiche11A_N2_capa::where('uuid_reponse_fiche11a_n1', $n1->id)->delete();

                Fiche11A_N2_style::where('uuid_reponse_fiche11a_n1', $n1->id)->delete();
            }

            Fiche11A_N1::where('uuid_reponse_fiche11a', $fiche->id)->delete();

            $fiche->delete();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
