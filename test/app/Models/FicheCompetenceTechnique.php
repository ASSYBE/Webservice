<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FicheCompetenceTechnique extends Model
{
    use
        HasFactory,
        HasUuids;

    protected $table = "fiche8_competence_technique";
    protected $keyType = "id";
    protected $fillable = [
        "technique",
        "uuid_fiche8",
        "CIN",
        "UUID_BDC",
        "createur"
    ];
}
