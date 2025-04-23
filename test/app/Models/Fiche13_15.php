<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_15 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_15';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence15_Q1_outilspratique',
        'competence15_Q1_situation',
        'competence15_Q1_niveau',
        'competence15_Q2_outilspratique',
        'competence15_Q2_situation',
        'competence15_Q2_niveau',
        'competence15_Q3_outilspratique',
        'competence15_Q3_situation',
        'competence15_Q3_niveau',
        'competence15_Q4_outilspratique',
        'competence15_Q4_situation',
        'competence15_Q4_niveau',
        'competence15_Q5_outilspratique',
        'competence15_Q5_situation',
        'competence15_Q5_niveau',
        'competence15_Q6_outilspratique',
        'competence15_Q6_situation',
        'competence15_Q6_niveau',
        'competence15_Q7_outilspratique',
        'competence15_Q7_situation',
        'competence15_Q7_niveau',
        'competence15_Q8_outilspratique',
        'competence15_Q8_situation',
        'competence15_Q8_niveau',
        'competence15_Q9_outilspratique',
        'competence15_Q9_situation',
        'competence15_Q9_niveau',
        'competence15_Q10_outilspratique',
        'competence15_Q10_situation',
        'competence15_Q10_niveau',
        'competence15_Q11_outilspratique',
        'competence15_Q11_situation',
        'competence15_Q11_niveau',

    ];
}
