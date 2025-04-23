<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FicheCompetenceQualite extends Model
{
    use
        HasFactory,
        HasUuids;

    protected $table = "fiche8_competence_qualite";
    protected $keyType = "id";
    protected $fillable = [
        "qualite",
        "uuid_fiche8",
        "CIN",
        "UUID_BDC",
        "createur"
    ];
}
