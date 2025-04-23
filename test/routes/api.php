<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\BDCController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Fiche03Controller;
use App\Http\Controllers\Fiche04Controller;
use App\Http\Controllers\Fiche05Controller;
use App\Http\Controllers\Fiche07Controller;
use App\Http\Controllers\Fiche08ConnaissanceController;
use App\Http\Controllers\Fiche08Controller;
use App\Http\Controllers\Fiche08ExperienceProfessionnelleController;
use App\Http\Controllers\Fiche08ExtraProfessionnelleController;
use App\Http\Controllers\Fiche08FormationInitialeContinueController;
use App\Http\Controllers\Fiche09Controller;
use App\Http\Controllers\Fiche10Controller;
use App\Http\Controllers\Fiche11AController;
use App\Http\Controllers\Fiche12Controller;
use App\Http\Controllers\Fiche1310Controller;
use App\Http\Controllers\Fiche1311Controller;
use App\Http\Controllers\Fiche1312Controller;
use App\Http\Controllers\Fiche1313Controller;
use App\Http\Controllers\Fiche1314Controller;
use App\Http\Controllers\Fiche1315Controller;
use App\Http\Controllers\Fiche131Controller;
use App\Http\Controllers\Fiche132Controller;
use App\Http\Controllers\Fiche133Controller;
use App\Http\Controllers\Fiche134Controller;
use App\Http\Controllers\Fiche135Controller;
use App\Http\Controllers\Fiche136Controller;
use App\Http\Controllers\Fiche137Controller;
use App\Http\Controllers\Fiche138Controller;
use App\Http\Controllers\Fiche139Controller;
use App\Http\Controllers\Fiche13AcquerirController;
use App\Http\Controllers\Fiche14Controller;
use App\Http\Controllers\Fiche15Controller;
use App\Http\Controllers\Fiche15ResultatController;
use App\Http\Controllers\Fiche16Controller;
use App\Http\Controllers\Fiche17Controller;
use App\Http\Controllers\Fiche18Controller;
use App\Http\Controllers\Fiche19Controller;
use App\Http\Controllers\Fiche20Controller;
use App\Http\Controllers\Fiche21Controller;
use App\Http\Controllers\Fiche9aConnaissanceController;
use App\Http\Controllers\Fiche9aController;
use App\Http\Controllers\Fiche9aHabiliteController;
use App\Http\Controllers\Fiche9aRessourceController;
use App\Http\Controllers\Fiche9bController;
use App\Http\Controllers\FicheCompetenceConnaissanceController;
use App\Http\Controllers\FicheCompetenceQualiteController;
use App\Http\Controllers\FicheCompetenceTechniqueController;
use App\Http\Controllers\VerificationController;
use App\Models\Fiche20_PlanAction;
use App\Http\Controllers\FullData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/beneficier/{id}', [Controller::class, 'show']);
Route::get('/formation', [Controller::class, 'formation']);

Route::get('/fiche03', [Fiche03Controller::class, 'create']);
Route::put('/fiche03/{id}/update', [Fiche03Controller::class, 'update']);


Route::get('/fiche04', [Fiche04Controller::class, 'create']);
Route::put('/fiche04/{id}/update', [Fiche04Controller::class, 'update']);


Route::get('/fiche05', [Fiche05Controller::class, 'create']);
Route::put('/fiche05/{id}/update', [Fiche05Controller::class, 'update']);

Route::delete('/fiche05/secteur/{valeur_id}', [Fiche05Controller::class, 'destroySecteur']);
Route::delete('/fiche05/objectif/{valeur_id}', [Fiche05Controller::class, 'destroyObjectif']);
Route::delete('/fiche05/categorie/{valeur_id}', [Fiche05Controller::class, 'destroyCategorie']);
Route::delete('/fiche05/source/{valeur_id}', [Fiche05Controller::class, 'destroySource']);


Route::get('/agenda', [AgendaController::class, 'index']);
Route::post('/agenda', [AgendaController::class, 'store']);
Route::put('/agenda/{id}/update', [AgendaController::class, 'update']);


Route::get('/fiche07', [Fiche07Controller::class, 'create']);
Route::put('/fiche07/{id}/update', [Fiche07Controller::class, 'update']);

Route::get('/fiche08FormationInitialeContinue', [Fiche08FormationInitialeContinueController::class, 'create']);
Route::get('/sigecConnaissance', [Fiche08FormationInitialeContinueController::class, 'sigecCreate']);

//Route::put('/fiche08FormationInitialeContinue', [Fiche08FormationInitialeContinueController::class, 'update']);


Route::post('/fiche08Connaissance', [Fiche08ConnaissanceController::class, 'store']);
Route::get('/fiche08Connaissance/{id}', [Fiche08ConnaissanceController::class, 'show']);
Route::put('/fiche08Connaissance/{id}', [Fiche08ConnaissanceController::class, 'edit']);
Route::delete('/fiche08Connaissance/{id}', [Fiche08ConnaissanceController::class, 'delete']);


// Route::get('/fiche08ExperienceProfessionnelleSigec', [Fiche08ExperienceProfessionnelleController::class, 'createSigec']);
// Route::get('/fiche08ExperienceProfessionnelle', [Fiche08ExperienceProfessionnelleController::class, 'create']);
// Route::post('/fiche08ExperienceProfessionnelle', [Fiche08ExperienceProfessionnelleController::class, 'store']);
// Route::put('/fiche08ExperienceProfessionnelle/{id}', [Fiche08ExperienceProfessionnelleController::class, 'update']);
// Route::delete('/fiche08ExperienceProfessionnelle/{id}', [Fiche08ExperienceProfessionnelleController::class, 'delete']);
// Route::get('/fiche08ExperienceProfessionnelle/sigec', [Fiche08ExperienceProfessionnelleController::class, 'save']);

Route::post('/fiche08ExperienceSigec', [Fiche08ExperienceProfessionnelleController::class, 'sigecStore']);
Route::get('/fiche08ExperienceProfessionnelle', [Fiche08ExperienceProfessionnelleController::class, 'create']);
Route::post('/fiche08ExperienceProfessionnelle', [Fiche08ExperienceProfessionnelleController::class, 'store']);
Route::put('/fiche08ExperienceProfessionnelle/{id}', [Fiche08ExperienceProfessionnelleController::class, 'update']);
Route::delete('/fiche08ExperienceProfessionnelle/{id}', [Fiche08ExperienceProfessionnelleController::class, 'delete']);
Route::get('/fiche08ExperienceProfessionnelle/sigec', [Fiche08ExperienceProfessionnelleController::class, 'createSigec']);


Route::get('/fiche08ExtraProfessionnelle', [Fiche08ExtraProfessionnelleController::class, 'index']);
Route::post('/fiche08ExtraProfessionnelle', [Fiche08ExtraProfessionnelleController::class, 'store']);
Route::get('/fiche08ExtraProfessionnelle/{id}', [Fiche08ExtraProfessionnelleController::class, 'edit']);
Route::put('/fiche08ExtraProfessionnelle/{id}/update', [Fiche08ExtraProfessionnelleController::class, 'update']);
Route::delete('/fiche08ExtraProfessionnelle/{id}', [Fiche08ExtraProfessionnelleController::class, 'destroy']);


Route::get('/fiche08', [Fiche08Controller::class, 'create']);
Route::put('/fiche08/{id}/update', [Fiche08Controller::class, 'update']);

Route::get('/ficheCompetenceConnaissance', [FicheCompetenceConnaissanceController::class, 'index']);
Route::post('/ficheCompetenceConnaissance', [FicheCompetenceConnaissanceController::class, 'store']);
Route::delete('/ficheCompetenceConnaissance/{id}', [FicheCompetenceConnaissanceController::class, 'delete']);

Route::get('/files', [FicheCompetenceConnaissanceController::class, 'indexFiles']);

Route::get('/ficheCompetenceQualite', [FicheCompetenceQualiteController::class, 'index']);
Route::post('/ficheCompetenceQualite', [FicheCompetenceQualiteController::class, 'store']);
Route::delete('/ficheCompetenceQualite/{id}', [FicheCompetenceQualiteController::class, 'delete']);


Route::get('/ficheCompetenceTechnique', [FicheCompetenceTechniqueController::class, 'index']);
Route::post('/ficheCompetenceTechnique', [FicheCompetenceTechniqueController::class, 'store']);
Route::delete('/ficheCompetenceTechnique/{id}', [FicheCompetenceTechniqueController::class, 'delete']);

Route::get('/fiche08/validation', [Fiche08Controller::class, 'validateAll']);

Route::get('/fiche09', [Fiche09Controller::class, 'create']);
Route::put('/fiche09/{id}/update', [Fiche09Controller::class, 'update']);

Route::get('/fiche9a', [Fiche9aController::class, 'create']);
Route::put('/fiche9a/{id}', [Fiche9aController::class, 'update']);

Route::post('/fiche9aConnaissance', [Fiche9aConnaissanceController::class, 'store']);
Route::delete('/fiche9aConnaissance/{id}', [Fiche9aConnaissanceController::class, 'delete']);

Route::post('/fiche9aHabilite', [Fiche9aHabiliteController::class, 'store']);
Route::delete('/fiche9aHabilite/{id}', [Fiche9aHabiliteController::class, 'delete']);

Route::post('/fiche9aRessource', [Fiche9aRessourceController::class, 'store']);
Route::delete('/fiche9aRessource/{id}', [Fiche9aRessourceController::class, 'delete']);

Route::get('/fiche9b', [Fiche9bController::class, 'create']);
Route::put('/fiche9b/{id}', [Fiche9bController::class, 'update']);

Route::get('/fiche10', [Fiche10Controller::class, 'create']);
Route::put('/fiche10/{id}/update', [Fiche10Controller::class, 'update']);

Route::get('/fiche11A', [Fiche11AController::class, 'index']);
Route::delete('/fiche11A/{id}', [Fiche11AController::class, 'delete']);
Route::get('/fiche11A/create', [Fiche11AController::class, 'create']);
Route::post('/fiche11A/post', [Fiche11AController::class, 'store']);
Route::post('/fiche11A/save', [Fiche11AController::class, 'save']);
Route::get('/fiche11A/{id}/edit', [Fiche11AController::class, 'edit']);
Route::put('/fiche11A/{id}', [Fiche11AController::class, 'update']);

Route::get('/fiche12', [Fiche12Controller::class, 'create']);
Route::post('/fiche12/{id}/update', [Fiche12Controller::class, 'update']);
Route::post('/fiche12Connaissance', [Fiche12Controller::class, 'storeConnaissance']);
Route::delete('/fiche12Connaissance/{id}', [Fiche12Controller::class, 'deleteConnaissance']);
Route::get('/fiche12Connaissance', [Fiche12Controller::class, 'connaissanceIndex']);


Route::get('/fiche131', [Fiche131Controller::class, 'create']);
Route::put('/fiche131/{id}', [Fiche131Controller::class, 'update']);

Route::get('/fiche132', [Fiche132Controller::class, 'create']);
Route::put('/fiche132/{id}', [Fiche132Controller::class, 'update']);

Route::get('/fiche133', [Fiche133Controller::class, 'create']);
Route::put('/fiche133/{id}', [Fiche133Controller::class, 'update']);

Route::get('/fiche134', [Fiche134Controller::class, 'create']);
Route::put('/fiche134/{id}', [Fiche134Controller::class, 'update']);

Route::get('/fiche135', [Fiche135Controller::class, 'create']);
Route::put('/fiche135/{id}', [Fiche135Controller::class, 'update']);

Route::get('/fiche136', [Fiche136Controller::class, 'create']);
Route::put('/fiche136/{id}', [Fiche136Controller::class, 'update']);

Route::get('/fiche137', [Fiche137Controller::class, 'create']);
Route::put('/fiche137/{id}', [Fiche137Controller::class, 'update']);

Route::get('/fiche138', [Fiche138Controller::class, 'create']);
Route::put('/fiche138/{id}', [Fiche138Controller::class, 'update']);

Route::get('/fiche139', [Fiche139Controller::class, 'create']);
Route::put('/fiche139/{id}', [Fiche139Controller::class, 'update']);

Route::get('/fiche1310', [Fiche1310Controller::class, 'create']);
Route::put('/fiche1310/{id}', [Fiche1310Controller::class, 'update']);

Route::get('/fiche1311', [Fiche1311Controller::class, 'create']);
Route::put('/fiche1311/{id}', [Fiche1311Controller::class, 'update']);

Route::get('/fiche1312', [Fiche1312Controller::class, 'create']);
Route::put('/fiche1312/{id}', [Fiche1312Controller::class, 'update']);

Route::get('/fiche1313', [Fiche1313Controller::class, 'create']);
Route::put('/fiche1313/{id}', [Fiche1313Controller::class, 'update']);

Route::get('/fiche1314', [Fiche1314Controller::class, 'create']);
Route::put('/fiche1314/{id}', [Fiche1314Controller::class, 'update']);

Route::get('/fiche1315', [Fiche1315Controller::class, 'create']);
Route::put('/fiche1315/{id}', [Fiche1315Controller::class, 'update']);

Route::post('/fiche13Acquerir', [Fiche13AcquerirController::class, 'store']);
Route::get('/fiche13Acquerir', [Fiche13AcquerirController::class, 'create']);
Route::put('/fiche13Acquerir/update', [Fiche13AcquerirController::class, 'update']);

Route::get('/fiche14', [Fiche14Controller::class, 'create']);
Route::put('/fiche14/{id}', [Fiche14Controller::class, 'update']);
Route::get('/fiche14/index', [Fiche14Controller::class, 'index']);

Route::get('/fiche15', [Fiche15Controller::class, 'create']);
Route::put('/fiche15/{id}', [Fiche15Controller::class, 'update']);
Route::get('/fiche15Resultat', [Fiche15ResultatController::class, 'index']);
Route::post('/fiche15Resultat', [Fiche15ResultatController::class, 'store']);
Route::put('/fiche15Resultat/{id}', [Fiche15ResultatController::class, 'update']);

Route::get('/fiche16', [Fiche16Controller::class, 'create']);
Route::put('/fiche16/{id}', [Fiche16Controller::class, 'update']);
Route::put('/fiche16/reponseQ44/{id}', [Fiche16Controller::class, 'updateReponseQ44']);

Route::get('/fiche16/select', [Fiche16Controller::class, 'resultOfFiche16']);

Route::post('/fiche16/store/{id}', [Fiche16Controller::class, 'store_softskills']);
Route::delete('/fiche16/{id}', [Fiche16Controller::class, 'delete_softskills']);




Route::get('/fiche17', [Fiche17Controller::class, 'create']);
Route::post('/fiche17/post', [Fiche17Controller::class, 'store']);
Route::put('/fiche17/{id}/edit', [Fiche17Controller::class, 'update']);
Route::get('/fiche17Competence', [Fiche17Controller::class, 'sommeCompetence']);

Route::get('/fiche20', [Fiche20Controller::class, 'create']);
Route::get('/fiche20PlanAction', [Fiche20Controller::class, 'indexPlanAction']);
Route::put('/fiche20/{id}', [Fiche20Controller::class, 'update']);
Route::post('/fiche20PlanAction', [Fiche20Controller::class, 'storePlanAction']);
Route::delete('/fiche20PlanAction/{id}', [Fiche20Controller::class, 'deletePlanAction']);


Route::get('/fiche21', [Fiche21Controller::class, 'create']);
Route::get('/fiche21/create', [Fiche21Controller::class, 'create_projet']);
Route::post('/fiche21', [Fiche21Controller::class, 'store']);
Route::delete('/fiche21/{id}', [Fiche21Controller::class, 'delete']);
Route::put('/fiche21/{id}/update', [Fiche21Controller::class, 'update']);

Route::get('/fiche19', [Fiche19Controller::class, 'create']);
Route::get('/fiche19/profession', [Fiche19Controller::class, 'index_profession']);

Route::post('/fiche19/storeHypotheseValide/{id}', [Fiche19Controller::class, 'store_hypothese_valide']);
Route::delete('/fiche19/deleteHypotheseValide/{id}', [Fiche19Controller::class, 'delete_hypothese_valide']);

Route::post('/fiche19/storeHypotheseDesire/{id}', [Fiche19Controller::class, 'store_hypothese_desire']);
Route::delete('/fiche19/deleteHypotheseDesire/{id}', [Fiche19Controller::class, 'delete_hypothese_desire']);

Route::post('/fiche19/storeSoftSkills/{id}', [Fiche19Controller::class, 'store_softskills']);
Route::delete('/fiche19/deleteSoftSkills/{id}', [Fiche19Controller::class, 'delete_softskills']);



Route::get('/fiche18', [Fiche18Controller::class, 'create']);
Route::put('/fiche18/edit/{id}', [Fiche18Controller::class, 'update']);
Route::post('/fiche18/{id}', [Fiche18Controller::class, 'store']);
Route::get('/fiche18/edit', [Fiche18Controller::class, 'edit']);
Route::post('/fiche18/categorie1/{id}', [Fiche18Controller::class, 'storeCategorie1']);
Route::post('/fiche18/categorie2/{id}', [Fiche18Controller::class, 'storeCategorie2']);
Route::post('/fiche18/categorie3/{id}', [Fiche18Controller::class, 'storeCategorie3']);
Route::post('/fiche18/categorie4/{id}', [Fiche18Controller::class, 'storeCategorie4']);
Route::get('/fiche18/categories', [Fiche18Controller::class, 'indexCategories']);
Route::delete('/fiche18/categorie1/{id}/delete', [Fiche18Controller::class, 'deleteCategorie1']);
Route::delete('/fiche18/categorie2/{id}/delete', [Fiche18Controller::class, 'deleteCategorie2']);
Route::delete('/fiche18/categorie3/{id}/delete', [Fiche18Controller::class, 'deleteCategorie3']);
Route::delete('/fiche18/categorie4/{id}/delete', [Fiche18Controller::class, 'deleteCategorie4']);

Route::post('/fiche18/environnementcategorie1/{id}', [Fiche18Controller::class, 'storeEnvironnementCategorie1']);
Route::post('/fiche18/environnementcategorie2/{id}', [Fiche18Controller::class, 'storeEnvironnementCategorie2']);
Route::post('/fiche18/environnementcategorie3/{id}', [Fiche18Controller::class, 'storeEnvironnementCategorie3']);
Route::delete('/fiche18/environnementcategorie1/{id}/delete', [Fiche18Controller::class, 'deleteEnvironnementCategorie1']);
Route::delete('/fiche18/environnementcategorie2/{id}/delete', [Fiche18Controller::class, 'deleteEnvironnementCategorie2']);
Route::delete('/fiche18/environnementcategorie3/{id}/delete', [Fiche18Controller::class, 'deleteEnvironnementCategorie3']);

Route::post('/fiche18/profession/{id}', [Fiche18Controller::class, 'storeProfession']);
Route::get('/fiche18/profession', [Fiche18Controller::class, 'indexProfession']);
Route::delete('/fiche18/profession/{id}/delete', [Fiche18Controller::class, 'deleteProfession']);

Route::get('/BDC', [BDCController::class, 'create']);
Route::post('/BDC/post', [BDCController::class, 'store']);
Route::put('/BDC/update', [BDCController::class, 'update']);


Route::post('/logout', [VerificationController::class, 'logout']);
Route::post('/verifier', [VerificationController::class, 'verifier']);
Route::get('/checkToken', [VerificationController::class, 'verifyToken1']);
Route::get('/token', [VerificationController::class, 'generateUniqueToken']);

// *****************************************************
Route::post('/login', [FullData::class, 'login']);
Route::post('/bo/service/call1/Bilan1', [FullData::class, 'hold_data']);
Route::post('/bo/service/call/Bilan', [FullData::class, 'testBilan']);
