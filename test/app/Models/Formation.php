<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'formation';
    protected $keyType = 'id';
    protected $fillable = [
        'id_beneficier',
        'valeur_id',
        'FR',
        'AR',
        'EN'
    ];
}
