@extends('welcome')
@section('content')
<div class="mt-7 px-6">
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-gray-700">Liste des Rendez-vous</h1>
        <div>
            <button class="bg-magenta text-white px-4 py-2 pb-2 rounded-md hover:bg-gray-dark transition duration-500">
                <span class="text-lg font-semibold">Filtrer</span>
            </button>
            <button class="bg-magenta text-white px-4 py-1 pb-2 rounded-md hover:bg-gray-dark transition duration-500">
                <a href="{{ url('/agenda/create') }}" class="text-2xl font-bold">+</a>
            </button>
        </div>
    </div>

    <div class="w-full bg-gray-light rounded-lg shadow-md px-4 pb-6">
        <div class="flex items-center justify-start bg-gray-800 text-black rounded-t-lg">
            <div class="font-semibold h-14 w-64 px-4 py-4 text-left">Objet</div> 
            <div class="font-semibold h-14 w-48 px-4 py-4 text-left">Date</div>
            <div class="font-semibold h-14 w-48 px-4 py-4 text-left">Heure</div>
            <div class="font-semibold h-14 w-56 px-4 py-4 text-left">Type rendez-vous</div>
            <div class="font-semibold h-14 w-48 px-4 py-4 text-left">Commentaire</div>
            <div class="font-semibold h-14 w-48 px-4 py-4 text-left">Present</div>
            <div class="font-semibold h-14 w-2 px-4 py-4 text-left"></div>
        </div>
        <hr class="mb-4 border-t-2 border-gray-dark">

        @if ($agendas !== null && $agendas->isNotEmpty())
            @foreach ($agendas as $agenda)
            <div class="flex items-center justify-start border-b border-gray-dark hover:bg-gray-dark">
  
                <div class="h-14 w-64 px-4 py-4 text-left">{{ $agenda->objet }}</div>
                <div class="h-14 w-48 px-4 py-4 text-left">{{ $agenda->date_RDV }}</div>
                <div class="h-14 w-48 px-4 py-4 text-left">{{ $agenda->heure_RDV }}</div>
                <div class="h-14 w-56 px-4 py-4 text-left">{{ $agenda->type_RDV }}</div>
                <div class="h-14 w-48 px-4 py-4 text-left">{{ Str::limit($agenda->commentaire, 20, '...') }}</div>
                <div class="h-14 w-48 px-4 py-4 text-left"><input  type="checkbox" name="agenda_present" value="{{ $agenda->present == '1' ? 'checked' : '' }}" ></div>

                <div><a href="{{ url('/agenda/'.$agenda->id.'/edit') }}"  class="h-14 w-2 px-4 py-4 text-left">E</a><a href="{{ url('/agenda/'.$agenda->id) }}"  class="h-14 w-2 px-4 py-4 text-left">D</a></div>
            </div>
            @endforeach
        @else
            
            <div class="flex items-center justify-center h-14 bg-gray-100 text-gray-600 font-semibold">
                Aucun rendez-vous disponible
            </div>
        @endif
    </div>
</div>
@endsection
