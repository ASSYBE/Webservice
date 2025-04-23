@extends('welcome')
@section('content')
<h2 class="text-2xl font-bold mb-6 text-center">Le contrat du Bilan des compétences</h2>
    <form action="{{ route('fiche04.store') }}" method="POST">
    @csrf

    <div class="flex flex-col mt-10">
        <div class="mb-3">
            <label for="date" class="block text-sm font-semibold text-gray-700">DATE :</label>
            <input type="date" name="dateCreation" id="date" class="mt-1 block w-60 h-12 border-2 rounded-md px-4 focus:ring focus:ring-blue-300" required>
        </div>
        <label class="text-xl mb-4">Le/La soussigné.e bénéficiaire <strong>{{$nom }} {{ $prenom}}</strong></label>
        <div>
            <h1>DECLARE :</h1>
            <ul>
                <li class="text-xl mb-1">avoir pris en considération ma propre situation professionnelle,scolaire et personnelle :</li>
                <li class="text-xl mb-1">avoir reconnu un besoin d'évalution et de changement dans ma situation professionnelle et/ou de formation:</li>
                <li class="text-xl mb-1">avoir pris connaissance de la proposition du bilan de Conpétences qui sera organisée en n
                    <input type="text" name="reponse_Q1" id="number" class="mt-1 w-60 h-12 border-2 rounded-md px-4 focus:ring focus:ring-blue-300">
                    recontres individuelles et n<input type="number" name="" id="number" class="mt-1 w-60 h-12 border-2 rounded-md px-4 focus:ring focus:ring-blue-300"> rencontres de groupe;</li>
                <li class="text-xl mb-1">être conscient.e qu'il s'agit pour le moment d'un outil de réflexion et accepter les régles d'elaboration et de mise en oeuvre;</li>
                <li class="text-xl mb-1">avoir rencontré le/la Conseiller.ére qui m'accompagnera sur ce parcours et de travailler avec lui/elle;</li>
                <li class="text-xl mb-1">couloir s'engager activement dans la mise en oevre du parcours proposé et de fournir toutes les infromations utiles à la réalisation du Bilan des compétences.</li>
            </ul>
            <label class="text-xl mb-1">Signature de la personne bénéficiere ..................</label>
            <label class="text-xl mb-1">Le/La conseiller.ére en emploi ..........................</label>
        </div>
        <div class="mt-24">
            <h1>DECLARE :</h1>
            <ul>
                <li class="text-xl mb-1">-  à la confidentialité des informations qui émergeront pendant le parcours du Bilan des 
                    compétences;</li>
                <li class="text-xl mb-1">-  à soutenir le parcours avec la disponibilité de la structure, des outils, de la documentation et du 
                    professionnalisme adéquat ;</li>
                <li class="text-xl mb-1">-  à accompagner le / la bénéficiaire dans le parcours du Bilan.
            </ul>
        </div>
        <button type="submit" class="bg-gray-dark hover:bg-orange px-4 py-2 rounded">
            Suivant
        </button>
    </div>
</form>
@endsection