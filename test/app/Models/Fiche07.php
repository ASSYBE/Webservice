<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche07 extends Model
{
    use HasFactory, HasUuids;

    protected $table = "fiche07";
    protected $keytype = "id";
    protected $fillable = [
        'UUID_BDC',
        'CIN',
        'createur',
        'status_fiche',
        'reponse_Q1',
        'reponse_Q2'
    ];
}
