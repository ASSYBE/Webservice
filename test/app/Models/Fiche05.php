<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche05 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'fiche05';

    protected $keytype = "id";
    protected $fillable = [
        'date_creation',
        'UUID_BDC',
        'CIN',
        'createur',
        'status_fiche',
    ];
}
