<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche08ExtraProfessionnelle extends Model
{
    use HasFactory, HasUuids;

    protected $table = "reponse_fiche8_extraprofessionnelle";
    protected $keyType = "id";
    protected $fillable = [
        "uuid_fiche8",
        "description",
        "frequence",
        "lieu",
        "avecQui",
        "type",
    ];
}



