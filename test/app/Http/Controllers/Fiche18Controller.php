<?php

namespace App\Http\Controllers;

use App\Models\BDC;
use App\Models\Fiche18;
use App\Models\Fiche18_categorie1;
use App\Models\Fiche18_categorie2;
use App\Models\Fiche18_categorie3;
use App\Models\Fiche18_categorie4;
use App\Models\Fiche18_contenu;
use App\Models\Fiche18_Environnement_Categorie1;
use App\Models\Fiche18_Environnement_Categorie2;
use App\Models\Fiche18_Environnement_Categorie3;
use App\Models\Fiche18_profession;
use App\Models\Formation;
use App\Models\Parametre_profession;
use Illuminate\Http\Request;

class Fiche18Controller extends Controller
{


    public function create(Request $request)
    {
        try {
            $input = $request->all();
            $bdc = BDC::where('cin', $input['cin'])->first();

            if (!$bdc) {
                return response()->json([
                    'message' => 'BDC not found!'
                ], 404);
            }

            $fiche = Fiche18::where('UUID_BDC', $bdc->id)->first();
            $parametreFormation = Formation::where('id_beneficier', $input['cin'])->get();
            $parametreProfession = Parametre_profession::where('nom_liste', 'profession')->get();

            if (!$fiche) {
                $fiche = Fiche18::create([
                    'cin' => $input['cin'],
                    'UUID_BDC' => $bdc->id,
                ]);

                $bdc->update([
                    'statusFiche18' => 'Initier',
                    'statusEtape03' => 'Initier'
                ]);
            }

            return response()->json([
                'message' => 'Information retrieved successfully!',
                'fiche' => $fiche,
                'parametreFormation' => $parametreFormation,
                'parametreProfession' => $parametreProfession
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving the information!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function edit(Request $request)
    {
        try {
            $input = $request->all();
            $bdc = BDC::where('cin', $input['cin'])->first();

            if (!$bdc) {
                return response()->json([
                    'message' => 'BDC not found!'
                ], 404);
            }
            $bdc->update([
                'statusFiche18' => 'Terminé',
                'statusEtape03' => 'En cours'
            ]);

            return response()->json([
                'message' => 'update state successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving the information!',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function store(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche18::findOrFail($id);
        Fiche18_contenu::create([
            'reponse_fiche18_id' => $fiche->id,
            'poste_intitule_id' => $input['poste_intitule_id'],
            'combien_gagne' => $input['combien_gagne'],
            'horaire_rythme' => $input['horaire_rythme'],
        ]);

        return response()->json([
            'message' => 'profession added successfully!',
        ], 200);
    }

    public function update(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $post = Fiche18_contenu::findOrFail($id);

        $post->update($input);

        return response()->json([
            'message' => 'profession added successfully!',
        ], 200);
    }

    // profession 
    public function storeProfession(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche18::findOrFail($id);
        Fiche18_profession::create([
            'reponse_fiche18_id' => $fiche->id,
            'poste_intitule_id' => $input['poste_intitule_id'],
            'profession' => $input['profession'],
        ]);

        return response()->json([
            'message' => 'profession added successfully!',
        ], 200);
    }

    public function indexProfession(Request $request)
    {
        $validatedData = $request->all();

        try {
            $professionValue = Fiche18_profession::where('poste_intitule_id', $validatedData['poste_intitule_id'])->get();

            return response()->json([
                'message' => 'Data retrieved successfully!',
                'professions' => $professionValue,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving data!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /// 4 Categories 
    public function indexCategories(Request $request)
    {
        $validatedData = $request->all();

        try {
            $categorie1Values = Fiche18_categorie1::where('poste_intitule_id', $validatedData['poste_intitule_id'])->get();
            $categorie2Values = Fiche18_categorie2::where('poste_intitule_id', $validatedData['poste_intitule_id'])->get();
            $categorie3Values = Fiche18_categorie3::where('poste_intitule_id', $validatedData['poste_intitule_id'])->get();
            $categorie4Values = Fiche18_categorie4::where('poste_intitule_id', $validatedData['poste_intitule_id'])->get();

            $environnementCategorie1Values = Fiche18_Environnement_Categorie1::where('poste_intitule_id', $validatedData['poste_intitule_id'])->get();
            $environnementCategorie2Values = Fiche18_Environnement_Categorie2::where('poste_intitule_id', $validatedData['poste_intitule_id'])->get();
            $environnementCategorie3Values = Fiche18_Environnement_Categorie3::where('poste_intitule_id', $validatedData['poste_intitule_id'])->get();

            $fiche18_contenu = Fiche18_contenu::where('poste_intitule_id', $validatedData['poste_intitule_id'])->first();

            return response()->json([
                'message' => 'Data retrieved successfully!',
                'categorie1Values' => $categorie1Values,
                'categorie2Values' => $categorie2Values,
                'categorie3Values' => $categorie3Values,
                'categorie4Values' => $categorie4Values,
                'environnementCategorie1Values' => $environnementCategorie1Values,
                'environnementCategorie2Values' => $environnementCategorie2Values,
                'environnementCategorie3Values' => $environnementCategorie3Values,
                'fiche18_contenu' => $fiche18_contenu,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving data!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function deleteProfession(string $id)
    {
        try {
            $profession = Fiche18_profession::findOrFail($id);
            $profession->delete();

            return response()->json([
                'message' => 'Profession deleted successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting profession!',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function storeCategorie1(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche18::findOrFail($id);
        Fiche18_categorie1::create([
            'reponse_fiche18_id' => $fiche->id,
            'poste_intitule_id' => $input['poste_intitule_id'],
            'categorie1' => $input['categorie1'],
        ]);

        return response()->json([
            'message' => 'categorie added successfully!',
        ], 200);
    }

    public function storeCategorie2(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche18::findOrFail($id);
        Fiche18_categorie2::create([
            'reponse_fiche18_id' => $fiche->id,
            'poste_intitule_id' => $input['poste_intitule_id'],
            'categorie2' => $input['categorie2'],
        ]);

        return response()->json([
            'message' => 'categorie added successfully!',
        ], 200);
    }

    public function storeCategorie3(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche18::findOrFail($id);
        Fiche18_categorie3::create([
            'reponse_fiche18_id' => $fiche->id,
            'poste_intitule_id' => $input['poste_intitule_id'],
            'categorie3' => $input['categorie3'],
        ]);

        return response()->json([
            'message' => 'categorie added successfully!',
        ], 200);
    }

    public function storeCategorie4(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche18::findOrFail($id);
        Fiche18_categorie4::create([
            'reponse_fiche18_id' => $fiche->id,
            'poste_intitule_id' => $input['poste_intitule_id'],
            'categorie4' => $input['categorie4'],
        ]);

        return response()->json([
            'message' => 'categorie added successfully!',
        ], 200);
    }

    public function deleteCategorie1(string $id)
    {
        try {
            $categorie1 = Fiche18_categorie1::findOrFail($id);
            $categorie1->delete();

            return response()->json([
                'message' => 'Category deleted successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting category!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteCategorie2(string $id)
    {
        try {
            $categorie2 = Fiche18_categorie2::findOrFail($id);
            $categorie2->delete();

            return response()->json([
                'message' => 'Category deleted successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting category!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteCategorie3(string $id)
    {
        try {
            $categorie3 = Fiche18_categorie3::findOrFail($id);
            $categorie3->delete();

            return response()->json([
                'message' => 'Category deleted successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting category!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteCategorie4(string $id)
    {
        try {
            $categorie4 = Fiche18_categorie4::findOrFail($id);
            $categorie4->delete();

            return response()->json([
                'message' => 'Category deleted successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting category!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function storeEnvironnementCategorie1(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche18::findOrFail($id);
        Fiche18_Environnement_Categorie1::create([
            'reponse_fiche18_id' => $fiche->id,
            'poste_intitule_id' => $input['poste_intitule_id'],
            'categorie1' => $input['categorie1'],
        ]);

        return response()->json([
            'message' => 'categorie added successfully!',
        ], 200);
    }

    public function storeEnvironnementCategorie2(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche18::findOrFail($id);
        Fiche18_Environnement_Categorie2::create([
            'reponse_fiche18_id' => $fiche->id,
            'poste_intitule_id' => $input['poste_intitule_id'],
            'categorie2' => $input['categorie2'],
        ]);

        return response()->json([
            'message' => 'categorie added successfully!',
        ], 200);
    }

    public function storeEnvironnementCategorie3(Request $request, string $id)
    {
        $input = $request->all();
        $bdc = BDC::where('cin', $input['cin'])->first();
        if (!$bdc)
            return response()->json([
                'message' => 'not found !'
            ], 404);

        $fiche = Fiche18::findOrFail($id);
        Fiche18_Environnement_Categorie3::create([
            'reponse_fiche18_id' => $fiche->id,
            'poste_intitule_id' => $input['poste_intitule_id'],
            'categorie3' => $input['categorie3'],
        ]);

        return response()->json([
            'message' => 'categorie added successfully!',
        ], 200);
    }

    public function deleteEnvironnementCategorie1(string $id)
    {
        try {
            $categorie1 = Fiche18_Environnement_Categorie1::findOrFail($id);
            $categorie1->delete();

            return response()->json([
                'message' => 'Category deleted successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting category!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteEnvironnementCategorie2(string $id)
    {
        try {
            $categorie2 = Fiche18_Environnement_Categorie2::findOrFail($id);
            $categorie2->delete();

            return response()->json([
                'message' => 'Category deleted successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting category!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteEnvironnementCategorie3(string $id)
    {
        try {
            $categorie3 = Fiche18_Environnement_Categorie3::findOrFail($id);
            $categorie3->delete();

            return response()->json([
                'message' => 'Category deleted successfully!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting category!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
