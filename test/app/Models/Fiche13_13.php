<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_13 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_13';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence13_Q1_outilspratique',
        'competence13_Q1_situation',
        'competence13_Q1_niveau',
        'competence13_Q2_outilspratique',
        'competence13_Q2_situation',
        'competence13_Q2_niveau',
        'competence13_Q3_outilspratique',
        'competence13_Q3_situation',
        'competence13_Q3_niveau',
        'competence13_Q4_outilspratique',
        'competence13_Q4_situation',
        'competence13_Q4_niveau',
        'competence13_Q5_outilspratique',
        'competence13_Q5_situation',
        'competence13_Q5_niveau',
        'competence13_Q6_outilspratique',
        'competence13_Q6_situation',
        'competence13_Q6_niveau',
        'competence13_Q7_outilspratique',
        'competence13_Q7_situation',
        'competence13_Q7_niveau',
        'competence13_Q8_outilspratique',
        'competence13_Q8_situation',
        'competence13_Q8_niveau',
        'competence13_Q9_outilspratique',
        'competence13_Q9_situation',
        'competence13_Q9_niveau',
        'competence13_Q10_outilspratique',
        'competence13_Q10_situation',
        'competence13_Q10_niveau',
        'competence13_Q11_outilspratique',
        'competence13_Q11_situation',
        'competence13_Q11_niveau',

    ];
}
