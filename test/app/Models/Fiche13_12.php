<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche13_12 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche13_12';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
        'competence12_Q1_outilspratique',
        'competence12_Q1_situation',
        'competence12_Q1_niveau',
        'competence12_Q2_outilspratique',
        'competence12_Q2_situation',
        'competence12_Q2_niveau',
        'competence12_Q3_outilspratique',
        'competence12_Q3_situation',
        'competence12_Q3_niveau',
        'competence12_Q4_outilspratique',
        'competence12_Q4_situation',
        'competence12_Q4_niveau',
        'competence12_Q5_outilspratique',
        'competence12_Q5_situation',
        'competence12_Q5_niveau',
        'competence12_Q6_outilspratique',
        'competence12_Q6_situation',
        'competence12_Q6_niveau',
        'competence12_Q7_outilspratique',
        'competence12_Q7_situation',
        'competence12_Q7_niveau',
        'competence12_Q8_outilspratique',
        'competence12_Q8_situation',
        'competence12_Q8_niveau',
        'competence12_Q9_outilspratique',
        'competence12_Q9_situation',
        'competence12_Q9_niveau',
        'competence12_Q10_outilspratique',
        'competence12_Q10_situation',
        'competence12_Q10_niveau',
        'competence12_Q11_outilspratique',
        'competence12_Q11_situation',
        'competence12_Q11_niveau',

    ];
}
