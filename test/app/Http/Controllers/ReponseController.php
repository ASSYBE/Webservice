<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\Form;
use App\Models\Question;
use App\Models\Reponse;
use App\Models\User;
use Illuminate\Http\Request;

class ReponseController extends Controller
{
    public function storeFormule1(Request $request)
    {
        $user = User::first();
        $form = Form::all();
        $questions = Question::where('form_id', $form[1]->id)->get();

        if ($request->has('reponses') && $request->has('description') && $request->has('date_rendezvous') && $request->has('heure_rendezvous')) {
            foreach ($request->input('reponses') as $questionId => $reponseText) {
                Reponse::create([
                    'reponse_text' => $reponseText,
                    'user_id' => $user->id,
                    'question_id' => $questionId,
                ]);
            }
            Agenda::create([
                'description' => $request->input('description'),
                'date_rendezvous' => $request->input('date_rendezvous'),
                'heure_rendezvous' => $request->input('heure_rendezvous'),
                'user_id' => $user->id
            ]);

            return view('pages.etape01.fiche04')->with(['user' => $user, 'success' => 'Vos réponses ont été enregistrées avec succès.']);
        }

        return redirect()->back()->with('error', 'Aucune réponse soumise.');
    }
    public function storeFormule2(Request $request)
    {
        $user = User::first();

        if ($request->has('reponses')) {
            foreach ($request->input('reponses') as $questionId => $reponseText) {
                Reponse::create([
                    'reponse_text' => $reponseText,
                    'user_id' => $user->id,
                    'question_id' => $questionId,
                ]);
            }
            return view('pages.etape01.fiche05')->with('success', 'Vos réponses ont été enregistrées avec succès.');
        }

        return redirect()->back()->with('error', 'Aucune réponse soumise.');
    }

    public function storeFormule3(Request $request)
    {
        $user = User::first();

        if ($request->has('reponses')) {
            foreach ($request->input('reponses') as $questionId => $reponseText) {
                Reponse::create([
                    'reponse_text' => $reponseText,
                    'user_id' => $user->id,
                    'question_id' => $questionId,
                ]);
            }
            return view('pages.formule3.create')->with('success', 'Vos réponses ont été enregistrées avec succès.');
        }

        return redirect()->back()->with('error', 'Aucune réponse soumise.');
    }

}
