<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche05_secteur extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'fiche05_secteur';

    protected $keytype = "id";
    protected $fillable = [
        'UUID_BDC',
        'CIN',
        'uuid_fiche05',
        'valeur_id_secteur'
    ];
}
