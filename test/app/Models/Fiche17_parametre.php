<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche17_parametre extends Model
{
    use
        HasFactory,
        HasUuids;
    protected $table = 'reponse_fiche17b_parametre';
    protected $keyType = 'string';
    protected $fillable =  [
        'id',
        'competence_id',
        'type_id'
    ];
}
