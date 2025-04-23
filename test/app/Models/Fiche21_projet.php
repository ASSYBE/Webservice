<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche21_projet extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche21_projet";
    protected $keyType = "string";
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'profil_choisi',
        'domaine_ou_secteur',
        'profil_identifie_tache',
        'profil_identifie_competence',
        'analyse_ressources_partie1',
        'analyse_ressources_ai_deja',
        'analyse_ressources_a_devlopper',
        'analyse_ressources_a_aquerir',
        'parcours_entreprendre_actions',
        'parcours_entreprendre_contact',
        'parcours_entreprendre_tems'
    ];
}
