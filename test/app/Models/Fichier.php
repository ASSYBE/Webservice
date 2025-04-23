<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fichier extends Model
{
    use HasFactory, HasUuids;
    protected $table = "fichier";
    protected $keyType = "id";
    protected $fillable = [
        "REM",
        "REC",
        "typeREM",
        "typeREC",
        "status"
    ];
}
