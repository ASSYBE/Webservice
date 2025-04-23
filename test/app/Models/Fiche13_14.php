<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_14 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_14';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence14_Q1_outilspratique',
        'competence14_Q1_situation',
        'competence14_Q1_niveau',
        'competence14_Q2_outilspratique',
        'competence14_Q2_situation',
        'competence14_Q2_niveau',
        'competence14_Q3_outilspratique',
        'competence14_Q3_situation',
        'competence14_Q3_niveau',
        'competence14_Q4_outilspratique',
        'competence14_Q4_situation',
        'competence14_Q4_niveau',
        'competence14_Q5_outilspratique',
        'competence14_Q5_situation',
        'competence14_Q5_niveau',
        'competence14_Q6_outilspratique',
        'competence14_Q6_situation',
        'competence14_Q6_niveau',
        'competence14_Q7_outilspratique',
        'competence14_Q7_situation',
        'competence14_Q7_niveau',
        'competence14_Q8_outilspratique',
        'competence14_Q8_situation',
        'competence14_Q8_niveau',
        'competence14_Q9_outilspratique',
        'competence14_Q9_situation',
        'competence14_Q9_niveau',
        'competence14_Q10_outilspratique',
        'competence14_Q10_situation',
        'competence14_Q10_niveau',
        'competence14_Q11_outilspratique',
        'competence14_Q11_situation',
        'competence14_Q11_niveau',

    ];
}
