<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_3 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_3';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence3_Q1_outilspratique',
        'competence3_Q1_situation',
        'competence3_Q1_niveau',
        'competence3_Q2_outilspratique',
        'competence3_Q2_situation',
        'competence3_Q2_niveau',
        'competence3_Q3_outilspratique',
        'competence3_Q3_situation',
        'competence3_Q3_niveau',
        'competence3_Q4_outilspratique',
        'competence3_Q4_situation',
        'competence3_Q4_niveau',
        'competence3_Q5_outilspratique',
        'competence3_Q5_situation',
        'competence3_Q5_niveau',
        'competence3_Q6_outilspratique',
        'competence3_Q6_situation',
        'competence3_Q6_niveau',
        'competence3_Q7_outilspratique',
        'competence3_Q7_situation',
        'competence3_Q7_niveau',
        'competence3_Q8_outilspratique',
        'competence3_Q8_situation',
        'competence3_Q8_niveau',
        'competence3_Q9_outilspratique',
        'competence3_Q9_situation',
        'competence3_Q9_niveau',
        'competence3_Q10_outilspratique',
        'competence3_Q10_situation',
        'competence3_Q10_niveau',
        'competence3_Q11_outilspratique',
        'competence3_Q11_situation',
        'competence3_Q11_niveau',

    ];
}
