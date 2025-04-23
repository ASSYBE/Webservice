<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche04 extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'fiche04';

    protected $keytype = "id";
    protected $fillable = [
        'UUID_BDC',
        'CIN',
        'createur',
        'reponse_Q1',
        'reponse_Q2',
        'reponse_Q3',
        'signature',
        'status_fiche'
    ];
}
