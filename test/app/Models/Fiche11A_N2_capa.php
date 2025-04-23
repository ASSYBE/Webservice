<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche11A_N2_capa extends Model
{
    use
        HasFactory,
        HasUuids;

    protected $table = "reponse_fiche11a_n2_capa";
    protected $keyType = "string";
    protected $fillable = [
        "id",
        "liste_id",
        "capacite_operationnelles",
        "uuid_reponse_fiche11a_n1",
        "cod",
    ];
}
