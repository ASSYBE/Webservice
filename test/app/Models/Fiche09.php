<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche09 extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche9";
    protected $keyType = "id";
    protected $fillable = [
        "uuid_condidat",
        "sensResponsablite",
        "capacitesComminicationRelation",
        "ponctualite",
        "fiabilite",
        "autonomieTravail"
    ];
}
