<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche19_hypothese_valide extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche19_hypothese_valide";
    protected $keyType = "string";
    protected $fillable = [
        'id',
        'reponse_fiche19_id',
        'hypothese_parcours_valide',
    ];
}
