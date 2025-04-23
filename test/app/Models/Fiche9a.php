<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche9a extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'reponse_fiche9a';
    protected $keyType = 'string';
    protected $primaryKey = 'id';

    protected $fillable = [
        'cin',
        'UUID_BDC',
        'dateCreation',
        'activites_effecacites',
        'activites_effecacites_pourquoi',
        'activites_difficultes',
        'activites_difficultes_pourquoi',
    ];
}
