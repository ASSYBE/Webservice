@extends('welcome')
@section('content')
    <div class="flex  justify-evenly items-center ">
        <a href="{{url('/billan')}}" >
            <div class="flex items-center justify-center w-28 h-28 rounded-full bg-gray-dark hover:bg-orange">
                <h3 class="font-bold text-lg">Etape 01</h3>
            </div>
        </a>
       
        <a >
            <div class="flex justify-center items-center w-28 h-28 rounded-full bg-gray-dark hover:bg-orange">
               
                <h3 class="font-bold text-lg">Etape 02</h3>
            </div>
        </a>

        <a >
            <div class="flex justify-center items-center w-28 h-28 rounded-full bg-gray-dark hover:bg-orange">
                <h3 class="font-bold text-lg">Etape 03</h3>
            </div>
        </a>
    </div>
@endsection