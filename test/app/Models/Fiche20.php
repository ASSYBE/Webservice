<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche20 extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche20";
    protected $keyType = "string";
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'perspectivesEvolutionProfessionnelPrincipal',
        'perspectivesEvolutionProfessionnelAlternatif',
        'aspectsPorterAttention',
        'conseiller'
    ];
}
