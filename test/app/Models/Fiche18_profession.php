<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche18_profession extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche18_profession";
    protected $keyType = "string";
    protected $fillable = [
        'id',
        'reponse_fiche18_id',
        'poste_intitule_id',
        'profession',
    ];
}
