<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche08Connaissance extends Model
{
    use
        HasFactory,
        HasUuids;

    protected $table = "fiche8_connaissance";
    protected $keyType = "id";
    protected $fillable = [
        "uuid_parameter_formation",
        "connaissance",
        "autoEvaluationMaitrise",
        "autoEvaluationInteret",
        "uuid_fiche8",
        "CIN",
        "UUID_BDC",
        "createur"
    ];
}
