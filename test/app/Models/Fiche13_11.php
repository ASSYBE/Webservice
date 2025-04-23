<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_11 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_11';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence11_Q1_outilspratique',
        'competence11_Q1_situation',
        'competence11_Q1_niveau',
        'competence11_Q2_outilspratique',
        'competence11_Q2_situation',
        'competence11_Q2_niveau',
        'competence11_Q3_outilspratique',
        'competence11_Q3_situation',
        'competence11_Q3_niveau',
        'competence11_Q4_outilspratique',
        'competence11_Q4_situation',
        'competence11_Q4_niveau',
        'competence11_Q5_outilspratique',
        'competence11_Q5_situation',
        'competence11_Q5_niveau',
        'competence11_Q6_outilspratique',
        'competence11_Q6_situation',
        'competence11_Q6_niveau',
        'competence11_Q7_outilspratique',
        'competence11_Q7_situation',
        'competence11_Q7_niveau',
        'competence11_Q8_outilspratique',
        'competence11_Q8_situation',
        'competence11_Q8_niveau',
        'competence11_Q9_outilspratique',
        'competence11_Q9_situation',
        'competence11_Q9_niveau',
        'competence11_Q10_outilspratique',
        'competence11_Q10_situation',
        'competence11_Q10_niveau',
        'competence11_Q11_outilspratique',
        'competence11_Q11_situation',
        'competence11_Q11_niveau',

    ];
}
