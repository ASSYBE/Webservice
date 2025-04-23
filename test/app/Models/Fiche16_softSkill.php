<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche16_softSkill extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche16_softskills";
    protected $keyType = "string";
    protected $fillable = [
        'id',
        'reponse_fiche16_id',
        'softskill',
    ];
}
