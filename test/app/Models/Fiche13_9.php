<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_9 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_9';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence9_Q1_outilspratique',
        'competence9_Q1_situation',
        'competence9_Q1_niveau',
        'competence9_Q2_outilspratique',
        'competence9_Q2_situation',
        'competence9_Q2_niveau',
        'competence9_Q3_outilspratique',
        'competence9_Q3_situation',
        'competence9_Q3_niveau',
        'competence9_Q4_outilspratique',
        'competence9_Q4_situation',
        'competence9_Q4_niveau',
        'competence9_Q5_outilspratique',
        'competence9_Q5_situation',
        'competence9_Q5_niveau',
        'competence9_Q6_outilspratique',
        'competence9_Q6_situation',
        'competence9_Q6_niveau',
        'competence9_Q7_outilspratique',
        'competence9_Q7_situation',
        'competence9_Q7_niveau',
        'competence9_Q8_outilspratique',
        'competence9_Q8_situation',
        'competence9_Q8_niveau',
        'competence9_Q9_outilspratique',
        'competence9_Q9_situation',
        'competence9_Q9_niveau',
        'competence9_Q10_outilspratique',
        'competence9_Q10_situation',
        'competence9_Q10_niveau',
        'competence9_Q11_outilspratique',
        'competence9_Q11_situation',
        'competence9_Q11_niveau',

    ];
}
