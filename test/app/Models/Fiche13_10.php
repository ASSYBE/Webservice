<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_10 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_10';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence10_Q1_outilspratique',
        'competence10_Q1_situation',
        'competence10_Q1_niveau',
        'competence10_Q2_outilspratique',
        'competence10_Q2_situation',
        'competence10_Q2_niveau',
        'competence10_Q3_outilspratique',
        'competence10_Q3_situation',
        'competence10_Q3_niveau',
        'competence10_Q4_outilspratique',
        'competence10_Q4_situation',
        'competence10_Q4_niveau',
        'competence10_Q5_outilspratique',
        'competence10_Q5_situation',
        'competence10_Q5_niveau',
        'competence10_Q6_outilspratique',
        'competence10_Q6_situation',
        'competence10_Q6_niveau',
        'competence10_Q7_outilspratique',
        'competence10_Q7_situation',
        'competence10_Q7_niveau',
        'competence10_Q8_outilspratique',
        'competence10_Q8_situation',
        'competence10_Q8_niveau',
        'competence10_Q9_outilspratique',
        'competence10_Q9_situation',
        'competence10_Q9_niveau',
        'competence10_Q10_outilspratique',
        'competence10_Q10_situation',
        'competence10_Q10_niveau',
        'competence10_Q11_outilspratique',
        'competence10_Q11_situation',
        'competence10_Q11_niveau',

    ];
}
