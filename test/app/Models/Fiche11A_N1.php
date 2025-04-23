<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche11A_N1 extends Model
{
    use HasFactory, HasUuids;

    protected $table = "reponse_fiche11a_n1";
    protected $keyType = "id";
    protected $fillable = [
        "uuid_reponse_fiche11a",
        "connaissance",
    ];
}
