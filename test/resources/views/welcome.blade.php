<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        {{-- @vite('resources/css/app.css') --}}

    </head>
    <body >
        {{-- <div class="flex justify-between items-center mb-3">
                <div></div>
                <select name="langues" class="w-32 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"> --}}
                    {{-- @foreach ($langues as $langue)
                        <option value="{{ $langue->valeur_id }}">{{ $langue->libelle_FR }}</option>
                    @endforeach --}}
                {{-- </select>
        </div> --}}
        <div class="w-full h-auto px-10 py-4 bg-magenta shadow-lg">
            
            <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold text-white">ANAPEC</h2>
                <ul class="flex items-center space-x-4">
                    <li class="px-4 py-2 rounded-md text-center text-white hover:bg-gray-light hover:text-black transition duration-300 cursor-pointer">Accueil</li>
                    <li class="px-4 py-2 rounded-md text-center text-white hover:bg-gray-light hover:text-black transition duration-300 cursor-pointer">
                        <a href="{{ url('/agenda') }}">Agenda</a>
                    </li>
                    <li class="px-4 py-2 rounded-md text-center text-white hover:bg-gray-light hover:text-black transition duration-300 cursor-pointer">
                        <a href="{{url('/notification')}}">Notification</li></a>
                    <li class="px-4 py-2 rounded-md text-center text-white hover:bg-gray-light hover:text-black transition duration-300 cursor-pointer">Déconnexion</li>
                </ul>
            </div>
        </div>

        <div class="flex">
            <div class="h-screen w-72 bg-gray-dark shadow-lg px-2 flex flex-col pb-10">
                {{-- <h1 class="text-2xl font-bold text-center mb-4">
                    <a href="{{ url('/BDC') }}" class="hover:text-gray-light">Bilan de compétences</a>
                </h1>      --}}
                <h1 class="text-2xl font-bold text-center mb-4">
                    <a href="{{ url('/BDC') }}" class="hover:text-gray-300" id="toggle-steps">Bilan de compétences</a>
                </h1>
                {{-- id="steps" class="hidden" --}}
                        
                <div>
                    <button id="toggle-list-1" class="hover:bg-gray-light p-4 w-full text-left focus:outline-none flex justify-between items-center">
                        <h2 class="text-lg font-semibold pb-2">Etape 1</h2>
                        <svg id="list-icon-1" class="inline w-4 h-4 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                  
                    <ul id="step-list-1" class="hidden space-y-2 mt-2">
                        <li class="hover:bg-white rounded-md p-2 transition duration-200 cursor-pointer flex">
                            <a href="{{url('/fiche03')}}"><span class="font-bold text-lg">-></span> Fiche du premier contact</a>
                            <p class="text-magenta">En cours</p>
                        </li>
                        <li class="hover:bg-white rounded-md p-2 transition duration-200 cursor-pointer"><a href="{{url('/fiche04')}}"><span class="font-bold text-lg">-></span> Le contrat du Bilan des compétences</a>
                        </li>
                        <li class="hover:bg-white rounded-md p-2 transition duration-200 cursor-pointer"><a href="{{url('/fiche05')}}"><span class="font-bold text-lg">-></span> Fiche d’information</a></li>
                        <li class="hover:bg-white rounded-md p-2 transition duration-200 cursor-pointer"><a href="{{url('/agenda')}}"><span class="font-bold text-lg">-></span> La planification du parcours du Bilan des compétences</a></li>
                        <li class="hover:bg-white rounded-md p-2 transition duration-200 cursor-pointer"><a href="{{url('/fiche07')}}"><span class="font-bold text-lg">-></span> Qu’est-ce que j’attends du Bilan des compétences</a></li>
                        <li class="hover:bg-white rounded-md p-2 transition duration-200 cursor-pointer"><a href="{{url('/fiche08')}}"><span class="font-bold text-lg">-></span> La Carte des Compétences</a></li>
                    </ul>
                </div>
                <div>
                    <button id="toggle-list-2" class="hover:bg-gray-light p-4 w-full text-left focus:outline-none flex justify-between items-center">
                        <h2 class="text-lg font-semibold pb-2">Etape 2</h2>
                        <svg id="list-icon-2" class="inline w-4 h-4 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <ul id="step-list-2" class="hidden space-y-2 mt-2">
                        <li class="hover:bg-white rounded-md p-2 transition duration-200 cursor-pointer"><span class="font-bold text-lg">-></span> Fiche d’information</li>
                        <li class="hover:bg-white rounded-md p-2 transition duration-200 cursor-pointer"><span class="font-bold text-lg">-></span> La planification du parcours du Bilan des compétences</li>
                    </ul>
                </div>
                <div>
                    <button id="toggle-list-3" class="hover:bg-gray-light p-4 w-full text-left focus:outline-none flex justify-between items-center">
                        <h2 class="text-lg font-semibold pb-2">Etape 3</h2>
                        <svg id="list-icon-3" class="inline w-4 h-4 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <ul id="step-list-3" class="hidden space-y-2 mt-2">
                        <li class="hover:bg-white rounded-md p-2 transition duration-200 cursor-pointer"><span class="font-bold text-lg">-></span> Qu’est-ce que j’attends du Bilan des compétences</li>
                        <li class="hover:bg-white rounded-md p-2 transition duration-200 cursor-pointer"><span class="font-bold text-lg">-></span> La Carte des Compétences</li>
                    </ul>
                </div>
        
            </div>

            <div class="container p-6 bg-white ">
                @yield('content')
            </div>
        </div>
    </body>
    
    <script>
        const toggleStepList = (step) => {
           
            //const steps = document.getElementById('steps');
            const toggleButton = document.getElementById('toggle-steps');
            const stepList = document.getElementById(`step-list-${step}`);
            const listIcon = document.getElementById(`list-icon-${step}`);
            // toggleButton.addEventListener('click', function (event) {
            //     //event.preventDefault(); 
            //     steps.classList.toggle('hidden'); 
            // });
            
            const allStepLists = document.querySelectorAll('[id^="step-list-"]');
            allStepLists.forEach((list, index) => {
                if (index + 1 !== step) {
                    list.classList.add('hidden');
                    document.getElementById(`list-icon-${index + 1}`).style.transform = 'rotate(0deg)';
                    const button = document.getElementById(`toggle-list-${index + 1}`);
                    button.classList.remove('bg-gray-light');
                    button.classList.add('bg-gray-dark');
                }
            });
            stepList.classList.toggle('hidden');
            
            listIcon.style.transform = stepList.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            
            const button = document.getElementById(`toggle-list-${step}`);
            button.classList.toggle('bg-gray-light', !stepList.classList.contains('hidden'));
            button.classList.toggle('bg-gray-dark', stepList.classList.contains('hidden'));
        };

       
    
        document.getElementById('toggle-list-1').addEventListener('click', () => toggleStepList(1));
        document.getElementById('toggle-list-2').addEventListener('click', () => toggleStepList(2));
        document.getElementById('toggle-list-3').addEventListener('click', () => toggleStepList(3));
    </script>
    
</html>


