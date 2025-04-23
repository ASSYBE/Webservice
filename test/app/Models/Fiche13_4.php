<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_4 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_4';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence4_Q1_outilspratique',
        'competence4_Q1_situation',
        'competence4_Q1_niveau',
        'competence4_Q2_outilspratique',
        'competence4_Q2_situation',
        'competence4_Q2_niveau',
        'competence4_Q3_outilspratique',
        'competence4_Q3_situation',
        'competence4_Q3_niveau',
        'competence4_Q4_outilspratique',
        'competence4_Q4_situation',
        'competence4_Q4_niveau',
        'competence4_Q5_outilspratique',
        'competence4_Q5_situation',
        'competence4_Q5_niveau',
        'competence4_Q6_outilspratique',
        'competence4_Q6_situation',
        'competence4_Q6_niveau',
        'competence4_Q7_outilspratique',
        'competence4_Q7_situation',
        'competence4_Q7_niveau',
        'competence4_Q8_outilspratique',
        'competence4_Q8_situation',
        'competence4_Q8_niveau',
        'competence4_Q9_outilspratique',
        'competence4_Q9_situation',
        'competence4_Q9_niveau',
        'competence4_Q10_outilspratique',
        'competence4_Q10_situation',
        'competence4_Q10_niveau',
        'competence4_Q11_outilspratique',
        'competence4_Q11_situation',
        'competence4_Q11_niveau',

    ];
}
