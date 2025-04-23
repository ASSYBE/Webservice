@extends('welcome')
 @section('content')

    <div class="w-1/2 h-full flex flex-col justify-between bg-gray-light">
        <div class="flex justify-between items-center" >
            <label for="" class="font-semibold text-lg ">Fiche du premier contact</label>
            <button class="w-40 h-7 bg-magenta px-2"><a href="{{url('/fiche1')}}" class="text-lg font-semibold text-white">Start</a></button>
        </div>
        <div class="flex justify-between items-center" >
            <label for="" class="font-semibold text-lg ">Le contrat du bilan de compétences</label>
            <button class="w-40 h-7 bg-magenta px-2"><a href="" class="text-lg font-semibold text-white">Start</a></button>
        </div>
        <div class="flex justify-between items-center" >
            <label for="" class="font-semibold text-lg ">Fiche d'information</label>
            <button class="w-40 h-7 bg-magenta px-2"><a href="" class="text-lg font-semibold text-white">Start</a></button>
        </div>
        <div class="flex justify-between items-center" >
            <label for="" class="font-semibold text-lg ">La planification du parcours de bilan</label>
            <button class="w-40 h-7 bg-magenta px-2"><a href="" class="text-lg font-semibold text-white">Start</a></button>
        </div>
        <div class="flex justify-between items-center" >
            <label for="" class="font-semibold text-lg ">Du bilan de compétences,j'attends...</label>
            <button class="w-40 h-7 bg-magenta px-2"><a href="" class="text-lg font-semibold text-white">Start</a></button>
        </div>
        <div class="flex justify-between items-center" >
            <label for="" class="font-semibold text-lg ">La carte des compétences</label>
            <button class="w-40 h-7 bg-magenta px-2"><a href="" class="text-lg font-semibold text-white">Start</a></button>
        </div>
        
    </div>
@endsection