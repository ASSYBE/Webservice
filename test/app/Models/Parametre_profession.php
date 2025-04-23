<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parametre_profession extends Model
{
    use HasFactory, HasUuids;
    public $table = 'parametre_profession';

    protected $keyType = 'uuid';

    protected $fillable = [
        'nom_liste',
        'valeur_id',
        'libelle_FR',
        'libelle_AR',
    ];
}
