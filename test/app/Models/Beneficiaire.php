<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beneficiaire extends Model
{
    use HasFactory, HasUuids;
    protected $table = "beneficier";
    protected $keyType = "id";
    protected $fillable = [
        'prenom',
        'nom',
        'cin',
        'motifDeSejour',
        'adresse',
        'email',
        'natinnalite',
        'date_naissance',
        'telephone',
        'statusProfessionnel',
        'paysNaissance'
    ];
}
