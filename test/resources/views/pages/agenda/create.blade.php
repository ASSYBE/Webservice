@extends('welcome')
@section('content')
<div class="w-full h-auto mt-14 bg-gray-light p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl text-black font-bold mb-6">Créer un rendez-vous</h1>
    <form action="{{url('/agenda')}}" class="flex flex-col space-y-4" method="POST">
        {{ csrf_field() }}
        <div class="flex items-center justify-between">
            <div class="flex flex-col w-1/2 mr-1">
                <label for="objet" class="text-md font-semibold text-gray-200">Objet</label>
                <input type="text" name="objet" class="border {{ $errors->has('objet') ? 'border-red-normal bg-red-salmon' : 'border-gray-dark' }} h-10 rounded-md px-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                @if ($errors->has('objet'))
                    <p class="text-orange text-sm mt-1">{{ $errors->first('objet') }}</p>
                @endif
            </div>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex flex-col w-1/2 mr-1">
                <label for="date" class="text-md font-semibold text-gray-200">Date</label>
                <input type="date" name="date_RDV" class="border {{ $errors->has('date') ? 'border-red-normal bg-red-salmon' : 'border-gray-dark' }} h-10 rounded-md px-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                @error('date_RDV')
                    <p class="text-orange text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
            <div class="flex flex-col w-1/2">
                <label for="heure" class="text-md font-semibold text-gray-200">Heure</label>
                <input type="time" name="heure_RDV" class="border {{ $errors->has('heure') ? 'border-red-normal bg-red-salmon' : 'border-gray-dark' }} h-10 rounded-md px-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                @error('heure_RDV')
                    <p class="text-orange text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex flex-col w-1/2 mr-1">
                <label for="type_rdv" class="text-md font-semibold text-gray-200">Type de rendez-vous</label>
                <select name="type_RDV" class="border {{ $errors->has('type_RDV') ? 'border-red-normal bg-red-salmon' : 'border-gray-dark' }} h-10 rounded-md px-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    @foreach($type_rdv as $type)
                        <option value="{{ $type->valeur_id }}">{{ $type->libelle_FR }}</option>
                    @endforeach
                </select>
                @error('type_rdv')
                    <p class="text-orange text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
            <div class="flex flex-col w-1/2">
                <label for="status" class="text-md font-semibold text-gray-200">Status</label>
                <select name="status" class="border {{ $errors->has('status') ? 'border-red-normal bg-red-salmon' : 'border-gray-dark' }} h-10 rounded-md px-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    @foreach($status as $stat)
                        <option value="{{ $stat->valeur_id }}">{{ $stat->libelle_FR }}</option>
                    @endforeach
                </select>
                @error('status')
                    <p class="text-orange text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
        </div>
        <div class="flex flex-col">
            <label for="commentaire" class="text-md font-semibold text-gray-200">Commentaire</label>
            <textarea name="commentaire" rows="4" class="border {{ $errors->has('commentaire') ? 'border-red-normal bg-red-salmon' : 'border-gray-dark' }} rounded-md px-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            @error('commentaire')
                <p class="text-orange text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>
        <button type="submit" class="mt-4 bg-magenta text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-dark hover:text-black transition duration-200">Créer</button>
    </form>
</div>
    
@endsection