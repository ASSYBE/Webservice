@extends('welcome')

@section('content')
    <div class="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">
            Validation de l'accès au bilan de compétences
        </h1>
        <p class="text-gray-600 mb-4">
            Veuillez confirmer votre accès au bilan de compétences en cliquant sur le bouton ci-dessous.
        </p>
        <button class="w-full bg-gray-dark hover:bg-orange text-white font-semibold px-4 py-2 rounded transition duration-200">
            <a href="{{ url('/fiche03') }}" class="flex items-center justify-center">
                Suivant
            </a>
        </button>
    </div>
@endsection
