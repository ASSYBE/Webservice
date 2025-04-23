<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche17Competences extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche17b_competences';
    protected $keyType = 'string';
    protected $fillable =  [
        'id',
        'reponse_fiche17b_id',
        'competence_id',
        'competence_note'
    ];
}
