<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_1 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_1';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence1_Q1_outilspratique',
        'competence1_Q1_situation',
        'competence1_Q1_niveau',
        'competence1_Q2_outilspratique',
        'competence1_Q2_situation',
        'competence1_Q2_niveau',
        'competence1_Q3_outilspratique',
        'competence1_Q3_situation',
        'competence1_Q3_niveau',
        'competence1_Q4_outilspratique',
        'competence1_Q4_situation',
        'competence1_Q4_niveau',
        'competence1_Q5_outilspratique',
        'competence1_Q5_situation',
        'competence1_Q5_niveau',
        'competence1_Q6_outilspratique',
        'competence1_Q6_situation',
        'competence1_Q6_niveau',
        'competence1_Q7_outilspratique',
        'competence1_Q7_situation',
        'competence1_Q7_niveau',
        'competence1_Q8_outilspratique',
        'competence1_Q8_situation',
        'competence1_Q8_niveau',
        'competence1_Q9_outilspratique',
        'competence1_Q9_situation',
        'competence1_Q9_niveau',
        'competence1_Q10_outilspratique',
        'competence1_Q10_situation',
        'competence1_Q10_niveau',
        'competence1_Q11_outilspratique',
        'competence1_Q11_situation',
        'competence1_Q11_niveau',

    ];
}
