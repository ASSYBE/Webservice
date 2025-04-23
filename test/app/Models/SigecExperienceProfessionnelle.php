<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SigecExperienceProfessionnelle extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'sigec_experienceprofessionnelle';
    protected $keyType = 'id';
    protected $fillable = [
        'cin',
        'IntitulePoste',
        'activiteExercee',
        'periode',
        'circonstanceInterruption'
    ];
}
