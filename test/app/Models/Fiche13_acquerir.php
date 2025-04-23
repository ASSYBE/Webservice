<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_acquerir extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche13_acquerir";
    protected $keyType = "string";
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'id_competence_acquerir'
    ];
}
