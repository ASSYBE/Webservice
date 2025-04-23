@extends('welcome')
@section('content')


<div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-gray-700">Notifications</h1>
    <div>
        <button class="bg-magenta text-white px-4 py-2 pb-2 rounded-md hover:bg-gray-dark transition duration-500">
            <span class="text-lg font-semibold">Filtrer</span>
        </button>
        <button class="bg-magenta text-white px-4 py-1 pb-2 rounded-md hover:bg-gray-dark transition duration-500">
            <a href="{{ url('/notification/create') }}" class="text-2xl font-bold">+</a>
        </button>
    </div>
</div>

<div class="w-full bg-gray-light rounded-lg shadow-md px-4 pb-6">
    <div class="flex items-center justify-start bg-gray-800 text-black rounded-t-lg">
        <div class="font-semibold h-14 w-64 px-4 py-4 text-left">Date</div> 
        <div class="font-semibold h-14 w-64 px-4 py-4 text-left">Sujet</div>
        <div class="font-semibold h-14 w-48 px-4 py-4 text-left">Status</div>
        <div class="font-semibold h-14 w-80 px-4 py-4 text-left">Message</div>
        <div class="font-semibold h-14 w-2 px-4 py-4 text-left"></div>
    </div>
    <hr class="mb-4 border-t-2 border-gray-dark">

    @if($notifications->isEmpty())
        <div class="flex items-center justify-center h-14 bg-gray-100 text-gray-600 font-semibold">
            Aucun rendez-vous disponible
        </div>
    @else
    @foreach($notifications as $notification)
        <div class="flex items-center justify-start border-b border-gray-dark hover:bg-gray-dark">
            <div class="h-14 w-64 px-4 py-4 text-left">{{ $notification->date_creation  }}</div>
            <div class="h-14 w-64 px-4 py-4 text-left">{{ $notification->sujet  }}</div>
            <div class="h-14 w-48 px-4 py-4 text-left">{{$notification->status  }}</div>
            <div class="h-14 w-80 px-4 py-4 text-left">{{ $notification->message    }}</div>
            <div><a href="{{ url('/notification/'.$notification->id.'/edit') }}"  class="h-14 w-2 px-4 py-4 text-left">E</a><a href="{{ url('/notification/'.$notification->id) }}"  class="h-14 w-2 px-4 py-4 text-left">D</a></div>
        </div>
        @endforeach
    @endif
</div>
</div>
@endsection