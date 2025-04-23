@extends('welcome')

@section('content')
<div class="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-md">
    <form action="{{ route('fiche03.update', $fiche03->id) }}" method="POST" onsubmit="return confirm('Vous êtes sûr que vous voulez modifier ?');">
        {{ csrf_field() }}
        @method("PATCH")
        
        <h2 class="text-2xl font-bold mb-6 text-center">Fiche du premier contact</h2>

        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Informations Personnelles</h3>
            <div class="mb-3">
                <label for="date" class="block text-sm font-semibold text-gray-700">DATE :</label>
                <input type="date" name="reponse_Q1" id="date" value="{{$fiche03->reponse_Q1}}" class="mt-1 block w-1/2 h-12 border-2 rounded-md px-4 focus:ring focus:ring-blue-300">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="mb-3 flex">
                    <label class="block text-sm font-semibold text-gray-700 mr-2">NOM :</label>
                    <span class="block text-sm font-normal text-gray-700">{{ $user->getNom() }}</span>
                </div>
                <div class="mb-3 flex">
                    <label class="block text-sm font-semibold text-gray-700 mr-2">PRÉNOM :</label>
                    <span class="block text-sm font-normal text-gray-700">{{ $user->getPrenom() }}</span>
                </div>
                <div class="mb-3 flex">
                    <label class="block text-sm font-semibold text-gray-700 mr-2">Numéro CIN ou Carte de Séjour :</label>
                    <span class="block text-sm font-normal text-gray-700">{{ $user->getcin() }}</span>
                </div>
                <div class="mb-3 flex">
                    <label class="block text-sm font-semibold text-gray-700 mr-2">Motif de séjour :</label>
                    <span class="block text-sm font-normal text-gray-700">{{ $user->getSejour() }}</span>
                </div>
                <div class="mb-3 flex">
                    <label class="block text-sm font-semibold text-gray-700 mr-2">Date de naissance :</label>
                    <span class="block text-sm font-normal text-gray-700">{{ $user->getDateNaissance() }}</span>
                </div>
            </div>
        </div>

        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Informations de Contact</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="mb-3 flex">
                    <label class="block text-sm font-semibold text-gray-700 mr-2">Adresse :</label>
                    <span class="block text-sm font-normal text-gray-700">{{ $user->getAdresse() }}</span>
                </div>
                <div class="mb-3 flex">
                    <label class="block text-sm font-semibold text-gray-700 mr-2">Téléphone / portable :</label>
                    <span class="block text-sm font-normal text-gray-700">{{ $user->getTel() }}</span>
                </div>
                <div class="mb-3 flex">
                    <label class="block text-sm font-semibold text-gray-700 mr-2">E-mail :</label>
                    <span class="block text-sm font-normal text-gray-700">{{ $user->getEmail() }}</span>
                </div>
                <div class="mb-3 flex">
                    <label class="block text-sm font-semibold text-gray-700 mr-2">Statut professionnel actuel :</label>
                    <span class="block text-sm font-normal text-gray-700">{{ $user->getStatutProfessionnel() }}</span>
                </div>
            </div>
            <div class="mb-3 flex">
                <label class="block text-sm font-semibold text-gray-700 mr-2">Origine de la demande :</label>
                <div class="flex items-center">
                    @foreach($questionDemande as $demande)
                        <input type="radio" name="reponse_Q2" id="demande{{ $loop->index + 1 }}" value="{{ $demande->question_text_FR }}" class="mr-2" {{ old('reponse_Q2', $fiche03->reponse_Q2) == $demande->question_text_FR ? 'checked' : '' }}>
                        <label for="demande{{ $loop->index + 1 }}" class="mr-4 text-sm font-normal">{{ $demande->question_text_FR }}</label>
                    @endforeach
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="mb-3">
                    <label for="degre" class="block text-sm font-semibold text-gray-700">Degré d’urgence :</label>
                    <input type="text" name="reponse_Q3" id="degre" value="{{ old('reponse_Q3', $fiche03->reponse_Q3) }}" class="mt-1 block w-full h-12 border-2 rounded-md px-4 focus:ring focus:ring-blue-300">
                </div>
                <div class="mb-3">
                    <label for="contraintes" class="block text-sm font-semibold text-gray-700">Disponibilité et contraintes :</label>
                    <input type="text" name="reponse_Q4" id="contraintes" value="{{ old('reponse_Q4', $fiche03->reponse_Q4) }}" class="mt-1 block w-full h-12 border-2 rounded-md px-4 focus:ring focus:ring-blue-300">
                </div>
                <div class="mb-3">
                    <label for="semaine" class="block text-sm font-semibold text-gray-700">La personne sera appelée dans : </label>
                    <select name="reponse_Q5" class="mt-1 block w-full h-12 border-2 rounded-md px-4 focus:ring focus:ring-blue-300">
                        @foreach($questionAppele as $appele)
                            <option value="{{ $appele->valeur_id }}" {{ old('reponse_Q5', $fiche03->reponse_Q5) == $appele->valeur_id ? 'selected' : '' }}>{{ $appele->question_text_FR }}</option>
                        @endforeach 
                    </select>
                </div>
            </div>
        </div>

        <div class="my-8">
            <div class="mb-2">
                <div class="mb-2 flex items-end">
                    <label class="text-lg font-semibold mr-4">Rendez-vous :</label>
                    <input type="hidden" name="reponse_Q6" value="Accueil">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="mb-3">
                        <label for="date_RDV" class="block text-sm font-semibold text-gray-700">Date :</label>
                        <input type="date" id="date_RDV" class="w-full h-12 border-2 rounded-md px-4 mb-3" name="reponse_Q7" value="{{ old('reponse_Q7', $fiche03->reponse_Q7) }}">
                    </div>
                    <div class="mb-3">
                        <label for="heure_RDV" class="block text-sm font-semibold text-gray-700">Heure :</label>
                        <input type="time" id="heure_RDV" class="w-full h-12 border-2 rounded-md px-4" name="reponse_Q8" value="{{ old('reponse_Q8', $fiche03->reponse_Q8) }}" required>
                    </div>
                </div>
            </div>
        </div>

        <button type="submit" class="w-full bg-gray-dark hover:bg-orange text-white px-4 py-2 rounded transition duration-200">
            Modifier
        </button>
    </form>
</div>
@endsection
