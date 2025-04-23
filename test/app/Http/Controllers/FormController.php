<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Parametre;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function createForm1()
    {
        $form = Form::first();
        $questions = Question::where('form_id', $form->id)->get();
        $parametresAppel = Parametre::where("nom_liste", "appele")->get();
        $parametresDemande = Parametre::where("nom_liste", "demande")->get();


        if ($questions->isEmpty()) {
            return view('pages.billan')->with('message', 'Aucune question trouvée.');
        }

        return view('pages.etape01.fiche03')->with(['questions' => $questions, 'parametresAppel' => $parametresAppel, 'parametresDemande' => $parametresDemande]);
    }
    public function createForm2()
    {
        //$form = Form::all();
        $user = User::first();

        //$questions = Question::where('form_id', $form[1]->id)->get();

        // if ($questions->isEmpty()) {
        //     return view('pages.billan')->with('message', 'Aucune question trouvée.');
        // }

        return view('pages.etape01.fiche04')->with('user', $user);
    }
    public function createForm3()
    {
        $form = Form::all();
        $questions = Question::where('form_id', "9d528eb8-62f2-4b2a-8791-002dd428268a")->get();

        if ($questions->isEmpty()) {
            return view('pages.billan')->with('message', 'Aucune question trouvée.');
        }

        return view('pages.etape01.fiche05')->with('questions', $questions);
    }
}
