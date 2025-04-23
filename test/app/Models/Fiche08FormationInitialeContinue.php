<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche08FormationInitialeContinue extends Model
{
    use HasFactory, HasUuids;

    protected $table = "reponse_fiche8_formationinitialecontinue";
    protected $keyType = "id";
    protected $fillable = [
        "uuid_parameter_formation",
        "uuid_parameter_connaissance",
        "autoEvaluationMaitrise",
        "autoEvaluationInteret",
        "uuid_reponse_annexe8"
    ];
}
