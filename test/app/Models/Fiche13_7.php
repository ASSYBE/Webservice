<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_7 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_7';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence7_Q1_outilspratique',
        'competence7_Q1_situation',
        'competence7_Q1_niveau',
        'competence7_Q2_outilspratique',
        'competence7_Q2_situation',
        'competence7_Q2_niveau',
        'competence7_Q3_outilspratique',
        'competence7_Q3_situation',
        'competence7_Q3_niveau',
        'competence7_Q4_outilspratique',
        'competence7_Q4_situation',
        'competence7_Q4_niveau',
        'competence7_Q5_outilspratique',
        'competence7_Q5_situation',
        'competence7_Q5_niveau',
        'competence7_Q6_outilspratique',
        'competence7_Q6_situation',
        'competence7_Q6_niveau',
        'competence7_Q7_outilspratique',
        'competence7_Q7_situation',
        'competence7_Q7_niveau',
        'competence7_Q8_outilspratique',
        'competence7_Q8_situation',
        'competence7_Q8_niveau',
        'competence7_Q9_outilspratique',
        'competence7_Q9_situation',
        'competence7_Q9_niveau',
        'competence7_Q10_outilspratique',
        'competence7_Q10_situation',
        'competence7_Q10_niveau',
        'competence7_Q11_outilspratique',
        'competence7_Q11_situation',
        'competence7_Q11_niveau',

    ];
}
