<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_5 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_5';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence5_Q1_outilspratique',
        'competence5_Q1_situation',
        'competence5_Q1_niveau',
        'competence5_Q2_outilspratique',
        'competence5_Q2_situation',
        'competence5_Q2_niveau',
        'competence5_Q3_outilspratique',
        'competence5_Q3_situation',
        'competence5_Q3_niveau',
        'competence5_Q4_outilspratique',
        'competence5_Q4_situation',
        'competence5_Q4_niveau',
        'competence5_Q5_outilspratique',
        'competence5_Q5_situation',
        'competence5_Q5_niveau',
        'competence5_Q6_outilspratique',
        'competence5_Q6_situation',
        'competence5_Q6_niveau',
        'competence5_Q7_outilspratique',
        'competence5_Q7_situation',
        'competence5_Q7_niveau',
        'competence5_Q8_outilspratique',
        'competence5_Q8_situation',
        'competence5_Q8_niveau',
        'competence5_Q9_outilspratique',
        'competence5_Q9_situation',
        'competence5_Q9_niveau',
        'competence5_Q10_outilspratique',
        'competence5_Q10_situation',
        'competence5_Q10_niveau',
        'competence5_Q11_outilspratique',
        'competence5_Q11_situation',
        'competence5_Q11_niveau',

    ];
}
