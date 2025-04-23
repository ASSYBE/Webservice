<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche18 extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche18";
    protected $keyType = "string";
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
    ];
}
