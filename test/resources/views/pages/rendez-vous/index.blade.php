@extends('welcome')
@section('content')
    <div>
        <h1 class="font-bold text-2xl text-white mb-8">Agenda</h1>

        <div class="flex justify-center items-center">
            <div class="w-2/4 h-16 bg-gray-light flex items-center p-4 rounded-md">
                <div class="w-36 text-md font-semibold">22:45</div>
                <div class="w-36 text-md font-semibold">12 - 12 - 2023</div>
                <div class="text-md font-semibold">Rendez - vous</div>
            </div>
            <a href="">Modifier</a>
            <a href="">Supprimer</a>
        </div>
        
        @foreach ($agendas as $agenda)
        <div class="w-2/4 h-16 bg-gray-light flex items-center p-4 rounded-md">
            <div class="w-36 text-md font-semibold">{{$agenda->heure_rendezvous}}</div>
            <div class="w-36 text-md font-semibold">{{$agenda->date_rendezvous}}</div>
            <div class="text-md font-semibold">{{$agenda->description}}</div>
        </div>
        @endforeach
    </div>
@endsection