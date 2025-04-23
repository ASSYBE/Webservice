<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche08Competence extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche8_competence";
    protected $keyType = "uuid";
    protected $fillable = [
        "uuid_reponse_annexe8",
        "connaissance",
        "competenceTechnique",
        "qualites"
    ];
}
