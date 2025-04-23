<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sigec_experienceprofessionnelle extends Model
{
    use HasFactory, HasUuids;
    protected $table = "sigec_experienceprofessionnelle";
    protected $keyType = "uuid";
    protected $fillable = [
        "uuid_fiche8",
        "IntitulePoste",
        "activiteExercee",
        "periode",
        "circonstanceInterruption"
    ];
}
