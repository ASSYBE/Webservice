@extends('welcome')
@section('content')
<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white w-full max-w-2xl rounded-lg shadow-lg p-8 m-4">
        <h1 class="text-3xl font-bold  text-center mb-6">Détails du Notification</h1>
        
        <div class="flex flex-col mb-4">
            <label class="text-lg font-semibold ">Sujet :</label>
            <p class="bg-gray-light rounded-md px-4 py-2">{{ $notification->sujet }}</p>
        </div>

        <div class="flex flex-col mb-4">
            <label class="text-lg font-semibold ">Message :</label>
            <p class="bg-gray-light rounded-md px-4 py-2">{{ $notification->message }}</p>
        </div>

        <div class="flex flex-col mb-4">
            <label class="text-lg font-semibold ">Status :</label>
            <p class="bg-gray-light rounded-md px-4 py-2">{{ $notification->status }}</p>
        </div>

        <div class="text-center mt-6">
            <a href="{{ url('/notification') }}" class="inline-block bg-magenta text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200">
                Retour à la liste
            </a>
        </div>
    </div>
</div>    


@endsection