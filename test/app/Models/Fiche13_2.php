<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_2 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_2';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence2_Q1_outilspratique',
        'competence2_Q1_situation',
        'competence2_Q1_niveau',
        'competence2_Q2_outilspratique',
        'competence2_Q2_situation',
        'competence2_Q2_niveau',
        'competence2_Q3_outilspratique',
        'competence2_Q3_situation',
        'competence2_Q3_niveau',
        'competence2_Q4_outilspratique',
        'competence2_Q4_situation',
        'competence2_Q4_niveau',
        'competence2_Q5_outilspratique',
        'competence2_Q5_situation',
        'competence2_Q5_niveau',
        'competence2_Q6_outilspratique',
        'competence2_Q6_situation',
        'competence2_Q6_niveau',
        'competence2_Q7_outilspratique',
        'competence2_Q7_situation',
        'competence2_Q7_niveau',
        'competence2_Q8_outilspratique',
        'competence2_Q8_situation',
        'competence2_Q8_niveau',
        'competence2_Q9_outilspratique',
        'competence2_Q9_situation',
        'competence2_Q9_niveau',
        'competence2_Q10_outilspratique',
        'competence2_Q10_situation',
        'competence2_Q10_niveau',
        'competence2_Q11_outilspratique',
        'competence2_Q11_situation',
        'competence2_Q11_niveau',

    ];
}
