<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche03 extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'fiche03';

    protected $keytype = "id";
    protected $fillable = [
        'dateCreation',
        'UUID_BDC',
        'CIN',
        'createur',
        'reponse_Q1',
        'reponse_Q2',
        'reponse_Q3',
        'reponse_Q4',
        'reponse_Q5',
        'reponse_Q6',
        'objet',
        'date_RDV',
        'heure_RDV_debut',
        'heure_RDV_fin',
        'type_RDV',
        'status_fiche'
    ];
}
