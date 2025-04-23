<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche10 extends Model
{
    use HasFactory,
        HasUuids;
    protected $table = "reponse_fiche10";
    protected $keyType = "id";
    protected $fillable = [
        "uuid_condidat",
        "entreprise",
        "service",
        "activite_principale",
        "activite_autre",
        "probleme",
        "decision_autonomie",
        "decision_autre",
        "decision_techno_outils",
        "decision_personne_entreprise",
        "decision_personne_hors_entreprise"
    ];
}
