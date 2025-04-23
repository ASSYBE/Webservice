<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_8 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_8';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence8_Q1_outilspratique',
        'competence8_Q1_situation',
        'competence8_Q1_niveau',
        'competence8_Q2_outilspratique',
        'competence8_Q2_situation',
        'competence8_Q2_niveau',
        'competence8_Q3_outilspratique',
        'competence8_Q3_situation',
        'competence8_Q3_niveau',
        'competence8_Q4_outilspratique',
        'competence8_Q4_situation',
        'competence8_Q4_niveau',
        'competence8_Q5_outilspratique',
        'competence8_Q5_situation',
        'competence8_Q5_niveau',
        'competence8_Q6_outilspratique',
        'competence8_Q6_situation',
        'competence8_Q6_niveau',
        'competence8_Q7_outilspratique',
        'competence8_Q7_situation',
        'competence8_Q7_niveau',
        'competence8_Q8_outilspratique',
        'competence8_Q8_situation',
        'competence8_Q8_niveau',
        'competence8_Q9_outilspratique',
        'competence8_Q9_situation',
        'competence8_Q9_niveau',
        'competence8_Q10_outilspratique',
        'competence8_Q10_situation',
        'competence8_Q10_niveau',
        'competence8_Q11_outilspratique',
        'competence8_Q11_situation',
        'competence8_Q11_niveau',

    ];
}
