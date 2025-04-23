<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche17 extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'reponse_fiche17b';
    protected $keyType = 'string';
    protected $fillable =  [
        'id',
        'cin',
        'UUID_BDC',
        'createur',
    ];
}
