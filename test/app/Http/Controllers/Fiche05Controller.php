<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\BDC;
use App\Models\Beneficier;
use App\Models\Fiche05;
use App\Models\Fiche05_categorie;
use App\Models\Fiche05_objectif;
use App\Models\Fiche05_secteur;
use App\Models\Fiche05_source;
use App\Models\Fichier;
use App\Models\Formation;
use App\Models\Parametre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class Fiche05Controller extends Controller
{
    public function create(Request $request)
    {

        $input = $request->all();

        $parametreSecteur = Parametre::where('nom_liste', 'Secteur')->get();
        $parametreCategorie = Parametre::where('nom_liste', 'Categorie')->get();
        $parametreObjectif = Parametre::where('nom_liste', 'objectif')->get();
        $parametreSource = Parametre::where('nom_liste', 'source')->get();
        $fichier = Fichier::all();


        $fiche = Fiche05::where('CIN', $input['cin'])->first();

        if ($fiche == null) {
            $bdc = BDC::where("cin", $input['cin'])->first();
            if (!$bdc)
                return response()->json([
                    "message" => "not found",
                ], 404);
            Fiche05::create([
                'CIN' => $input['cin'],
                'date_creation' => now(),
                'UUID_BDC' => $bdc->id
            ]);

            $bdc->update([
                'fiche_actuel' => 'fiche05',
                'statusFiche05' => 'Initier',
            ]);
        }

        $ficheSecteur = Fiche05_secteur::where('CIN', $input['cin'])->get();
        $ficheCategorie = Fiche05_categorie::where('CIN', $input['cin'])->get();
        $ficheObjectif = Fiche05_objectif::where('CIN', $input['cin'])->get();
        $ficheSource = Fiche05_source::where('CIN', $input['cin'])->get();


        $reponseSecteur = null;
        if ($ficheSecteur->isNotEmpty()) {
            $reponseSecteur = Parametre::whereIn('valeur_id', $ficheSecteur->pluck('valeur_id_secteur'))->get();
        }

        $reponseCategorie = null;
        if ($ficheCategorie->isNotEmpty()) {
            $reponseCategorie = Parametre::whereIn('valeur_id', $ficheCategorie->pluck('valeur_id_categorie'))->get();
        }

        $reponseObjectif = null;
        if ($ficheObjectif->isNotEmpty()) {
            $reponseObjectif = Parametre::whereIn('valeur_id', $ficheObjectif->pluck('valeur_id_objectif'))->get();
        }

        $reponseSource = null;
        if ($ficheSource->isNotEmpty()) {
            $reponseSource = Parametre::whereIn('valeur_id', $ficheSource->pluck('valeur_id_source'))->get();
        }

        return response()->json([
            'fiche' => $fiche,
            'parametreSecteur' => $parametreSecteur,
            'parametreCategorie' => $parametreCategorie,
            'parametreObjectif' => $parametreObjectif,
            'parametreSource' => $parametreSource,
            'reponseSecteur' => $reponseSecteur,
            'reponseCategorie' => $reponseCategorie,
            'reponseObjectif' => $reponseObjectif,
            'reponseSource' => $reponseSource,
            'fichier' => $fichier
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'date_creation' => 'required|date',
            'secteurs' => 'array',
            'secteurs.*' => 'exists:parametre,valeur_id',
            'objectifs' => 'array',
            'objectifs.*' => 'exists:parametre,valeur_id',
            'categories' => 'array',
            'categories.*' => 'exists:parametre,valeur_id',
            'sources' => 'array',
            'sources.*' => 'exists:parametre,valeur_id',
        ]);
        $input = $request->all();

        $fiche = Fiche05::findOrFail($id);

        $data = [
            'CIN' => $input['cin'],
            'date_creation' => $request->input('date_creation'),
        ];

        $fiche->update($data);

        $this->addNewData($fiche->id, $fiche->CIN, 'secteurs', $request->input('secteurs'));
        $this->addNewData($fiche->id, $fiche->CIN, 'categories', $request->input('categories'));
        $this->addNewData($fiche->id, $fiche->CIN, 'objectifs', $request->input('objectifs'));
        $this->addNewData($fiche->id, $fiche->CIN, 'sources', $request->input('sources'));

        $bdc = BDC::where('cin', $input['cin'])->first();
        if ($bdc) {
            $bdc->update([
                'fiche_actuel' => 'fiche05',
                'statusFiche05' => 'Terminé',
                'dateCreationFiche05' => now(),
            ]);
        } else {
            return response()->json([
                'message' => 'Le BDC correspondant n\'a pas été trouvé.',
            ], 404);
        }

        return response()->json([
            'message' => 'Fiche mise à jour avec succès.',
            'fiche' => $fiche,
        ], 200);
    }

    public function destroySecteur(string $valeur_id)
    {
        $secteur = Fiche05_secteur::where('valeur_id_secteur', $valeur_id);

        if (!$secteur) {
            return response()->json(['message' => 'Secteur not found'], 404);
        }

        $secteur->delete();

        return response()->json(['message' => 'Secteur deleted successfully']);
    }
    public function destroyCategorie(string $valeur_id)
    {
        $categorie = Fiche05_categorie::where('valeur_id_categorie', $valeur_id);

        if (!$categorie) {
            return response()->json(['message' => 'categorie not found'], 404);
        }

        $categorie->delete();

        return response()->json(['message' => 'categorie deleted successfully']);
    }
    public function destroyObjectif(string $valeur_id)
    {
        $objectif = Fiche05_objectif::where('valeur_id_objectif', $valeur_id);

        if (!$objectif) {
            return response()->json(['message' => 'objectif not found'], 404);
        }

        $objectif->delete();

        return response()->json(['message' => 'objectif deleted successfully']);
    }
    public function destroySource(string $valeur_id)
    {
        $source = Fiche05_source::where('valeur_id_source', $valeur_id);

        if (!$source) {
            return response()->json(['message' => 'source not found'], 404);
        }

        $source->delete();

        return response()->json(['message' => 'source deleted successfully']);
    }

    private function addNewData($ficheId, $cin, $type, $newData)
    {
        foreach ($newData as $itemId) {
            switch ($type) {
                case 'secteurs':
                    Fiche05_secteur::create([
                        'UUID_BDC' => $ficheId,
                        'CIN' => $cin,
                        'uuid_fiche05' => $ficheId,
                        'valeur_id_secteur' => $itemId,
                    ]);
                    break;
                case 'categories':
                    Fiche05_categorie::create([
                        'UUID_BDC' => $ficheId,
                        'CIN' => $cin,
                        'uuid_fiche05' => $ficheId,
                        'valeur_id_categorie' => $itemId,
                    ]);
                    break;
                case 'objectifs':
                    Fiche05_objectif::create([
                        'UUID_BDC' => $ficheId,
                        'CIN' => $cin,
                        'uuid_fiche05' => $ficheId,
                        'valeur_id_objectif' => $itemId,
                    ]);
                    break;
                case 'sources':
                    Fiche05_source::create([
                        'UUID_BDC' => $ficheId,
                        'CIN' => $cin,
                        'uuid_fiche05' => $ficheId,
                        'valeur_id_source' => $itemId,
                    ]);
                    break;
            }
        }
    }
}
