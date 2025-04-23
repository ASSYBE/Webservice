<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche08ExperienceProfessionnelle extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche8_experienceprofessionnelle";
    protected $keyType = "string";
    protected $fillable = [
        "id",
        "uuid_fiche8",
        "IntitulePoste",
        "activiteExercee",
        "periode_debut",
        "periode_fin",
        "circonstanceInterruption",
        "activitesPrincipales",
        "activitesSecondaires",
        "aspectsPositifs",
        "aspectsNegatifs",
        "connaissancesNecessaires",
        "responsabilites",
        "problemesRencontres",
        "niveauAutonomie",
        "savoirFaire",
        "type",
        "CIN",
        "UUID_BDC",
        "createur"
    ];
}
