<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche12_connaissance extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche12_connaissance";
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'reponse_fiche12_id',
        'formationIC_connaissance',
        'type'
    ];
}
