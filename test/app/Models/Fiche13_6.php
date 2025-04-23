<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_6 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_6';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence6_Q1_outilspratique',
        'competence6_Q1_situation',
        'competence6_Q1_niveau',
        'competence6_Q2_outilspratique',
        'competence6_Q2_situation',
        'competence6_Q2_niveau',
        'competence6_Q3_outilspratique',
        'competence6_Q3_situation',
        'competence6_Q3_niveau',
        'competence6_Q4_outilspratique',
        'competence6_Q4_situation',
        'competence6_Q4_niveau',
        'competence6_Q5_outilspratique',
        'competence6_Q5_situation',
        'competence6_Q5_niveau',
        'competence6_Q6_outilspratique',
        'competence6_Q6_situation',
        'competence6_Q6_niveau',
        'competence6_Q7_outilspratique',
        'competence6_Q7_situation',
        'competence6_Q7_niveau',
        'competence6_Q8_outilspratique',
        'competence6_Q8_situation',
        'competence6_Q8_niveau',
        'competence6_Q9_outilspratique',
        'competence6_Q9_situation',
        'competence6_Q9_niveau',
        'competence6_Q10_outilspratique',
        'competence6_Q10_situation',
        'competence6_Q10_niveau',
        'competence6_Q11_outilspratique',
        'competence6_Q11_situation',
        'competence6_Q11_niveau',

    ];
}
