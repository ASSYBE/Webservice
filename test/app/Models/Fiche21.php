<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche21 extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche21";
    protected $keyType = "string";
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'professions_identifee',
        'zone_territoriale',
        'secteur_developpement',
        'contrainte_opportunite',
    ];
}
