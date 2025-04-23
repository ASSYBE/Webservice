<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche12 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche12';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'formationIC_FormationQ1',
        'histoireProfessionalle_Q3',
        'histoireProfessionalle_Q4',
        'histoireProfessionalle_Q5',
        'histoireProfessionalle_Q6',
        'histoireProfessionalle_Q7',
        'histoireProfessionalle_Q8'
    ];
}
