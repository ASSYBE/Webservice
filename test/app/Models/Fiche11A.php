<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche11A extends Model
{
    use
        HasFactory,
        HasUuids;

    protected $table = "reponse_fiche11a";
    protected $keyType = "string";
    protected $fillable = [
        'id',
        'UUID_BDC',
        'createur',
        "cin",
        "reponse_fiche8_id",
        "experience",
        "date_debut",
        "date_fin",
        "tacheEffectue",
        "type",
    ];
}
