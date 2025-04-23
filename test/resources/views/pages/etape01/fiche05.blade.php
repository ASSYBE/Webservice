@extends('welcome')

@section('content')
    <div class="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Fiche d’information</h2>
        <form action="{{ route('fiche05.store') }}" method="POST">
            @csrf
            <div class="flex flex-col space-y-4">
                <div class="mb-6">
                    <label for="dateCreation" class="block text-lg font-semibold text-gray-800 mb-1">Date :</label>
                    <input type="date" name="dateCreation" id="date" class="mt-1 block w-60 h-12 border-2 rounded-md px-4 focus:ring focus:ring-blue-300" required>
                </div>
            
                <div class="mb-6 flex items-center">
                    <label class=" text-lg font-semibold mr-3">NOM ET PRENOM :</label>
                    <p class="text-gray-700">{{ $nom }} {{ $prenom }}</p>
                </div>
            </div>
            <div class="mb-4">
                <label class="block font-medium text-gray-700">Formation :</label>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    @foreach ($listFormations as $formation)
                        <div class="bg-orange p-4 rounded-lg shadow-md">
                            <p class="text-sm font-semibold text-white">{{ $formation }}</p>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="mb-4">
                <label class="block font-medium text-gray-700">Les principaux secteurs d'activité :</label>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    @foreach ($listSectors as $listSector)
                        <div class="bg-orange p-4 rounded-lg shadow-md">
                            <p class="text-sm font-semibold text-white">{{ $listSector }}</p>
                        </div>
                    @endforeach
                </div>
               
            </div>
            <div class="mb-4">
                <label class="block font-medium text-gray-700">Catégorie professionnelle :</label>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    @foreach ($listCategories as $listCategorie)
                        <div class="bg-orange p-4 rounded-lg shadow-md">
                            <p class="text-sm font-semibold text-white">{{ $listCategorie }}</p>
                        </div>
                    @endforeach
                </div>
                
            </div>
            <div class="mb-4">
                <label class="block font-medium text-gray-700">Objectif :</label>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    @foreach ($listObjectives as $listObjective)
                        <div class="bg-orange p-4 rounded-lg shadow-md">
                            <p class="text-sm font-semibold text-white">{{ $listObjective }}</p>
                        </div>
                    @endforeach
                </div>
                
            <div class="mb-4">
                <label class="block font-medium text-gray-700">Source d'information :</label>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    @foreach ($listSources as $listSource)
                        <div class="bg-orange p-4 rounded-lg shadow-md">
                            <p class="text-sm font-semibold text-white">{{ $listSource }}</p>
                        </div>
                    @endforeach
                </div>
               
            </div>
            <button type="submit" class="w-full py-2 mt-4 bg-gray-dark text-white font-semibold rounded-md hover:bg-orange transition duration-150">Suivant</button>
        </form>
    </div>
@endsection