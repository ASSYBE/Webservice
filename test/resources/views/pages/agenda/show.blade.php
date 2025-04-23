@extends('welcome')
@section('content')
<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white w-full max-w-2xl rounded-lg shadow-lg p-8 m-4">
        <h1 class="text-3xl font-bold  text-center mb-6">Détails du Rendez-vous</h1>
        
        <div class="flex flex-col mb-4">
            <label class="text-lg font-semibold ">Objet :</label>
            <p class="bg-gray-light rounded-md px-4 py-2">{{ $agenda->objet }}</p>
        </div>

        <div class="flex flex-col mb-4">
            <label class="text-lg font-semibold ">Date :</label>
            <p class="bg-gray-light rounded-md px-4 py-2">{{ $agenda->date_RDV }}</p>
        </div>

        <div class="flex flex-col mb-4">
            <label class="text-lg font-semibold ">Heure :</label>
            <p class="bg-gray-light rounded-md px-4 py-2">{{ $agenda->heure_RDV }}</p>
        </div>

        <div class="flex flex-col mb-4">
            <label class="text-lg font-semibold ">Type de rendez-vous :</label>
            <p class="bg-gray-light rounded-md px-4 py-2">{{ $agenda->type_RDV }}</p>
        </div>
        <div class="flex flex-col mb-4">
            <label class="text-lg font-semibold ">Present :</label>
            <p class="bg-gray-light rounded-md px-4 py-2">{{ $agenda->present }}</p>
        </div>
        <div class="flex flex-col mb-4">
            <label class="text-lg font-semibold ">Commentaire :</label>
            <p class="bg-gray-light rounded-md px-4 py-2">{{ $agenda->commentaire }}</p>
        </div>

        <div class="text-center mt-6">
            <a href="{{ url('/agenda') }}" class="inline-block bg-magenta text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200">
                Retour à la liste
            </a>
        </div>
    </div>
</div>    


@endsection