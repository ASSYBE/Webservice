@extends('welcome')
@section('content')
<div class="w-full h-auto mt-14 bg-gray-light p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl text-black font-bold mb-6">Créer une Notification</h1>
    <form action="{{ url('/notification') }}" class="flex flex-col space-y-4" method="POST">
        @csrf
        
        <div class="flex flex-col">
            <label for="sujet" class="text-md font-semibold text-gray-200">Sujet</label>
            <input type="text" name="sujet" class="border {{ $errors->has('sujet') ? 'border-red-normal bg-red-salmon' : 'border-gray-dark' }} h-10 rounded-md px-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            @if ($errors->has('sujet'))
                <p class="text-orange text-sm mt-1">{{ $errors->first('sujet') }}</p>
            @endif
        </div>

        <div class="flex flex-col">
            <label for="message" class="text-md font-semibold text-gray-200">Message</label>
            <textarea name="message" rows="4" class="border {{ $errors->has('message') ? 'border-red-normal bg-red-salmon' : 'border-gray-dark' }} rounded-md px-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            @error('message')
                <p class="text-orange text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>
        <div class="flex flex-col">
            <input type="hidden" name="status" value="{{$first_status->libelle_FR}}">
            @error('status')
                <p class="text-orange text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <button type="submit" class="mt-4 bg-magenta text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-dark hover:text-black transition duration-200">Créer</button>
    </form>
</div>
@endsection
