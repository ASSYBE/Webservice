<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche15_resultat extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche15_resultat';

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'valeurPro_P1',
        'contextPro_1',
        'valeurPro_P2',
        'contextPro_2',
        'valeurPro_P3',
        'contextPro_3',
        'valeurPro_P4',
        'contextPro_4',
        'valeurPro_P5',
        'contextPro_5',
    ];
}
