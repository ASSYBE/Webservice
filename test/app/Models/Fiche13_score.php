<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_score extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_score';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'id_competence',
        'valeur_id',
        'total_beaucoup',
        'total_assez',
        'total_peu',
        'totle_rien',
        'total'
    ];
}
