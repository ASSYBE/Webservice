<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche9b extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche9b";
    protected $keyType = "string";
    protected $primaryKey = "id";

    protected $fillable = [
        'cin',
        'UUID_BDC',
        'createur',
        'R_N1_l1',
        'R_N2_l1',
        'R1_N3_l1',
        'R2_N3_l1',
        'R_N1_l2',
        'R_N2_l2',
        'R_N3_l2',
        'R_N1_l3',
        'R_N1_l4',
        'R1_N2_l4',
        'R2_N2_l4',
        'R3_N2_l4',
        'R1_N3_l4',
        'R2_N3_l4',
        'R1_N1_l5',
        'R2_N1_l5',
        'R1_N2_l5',
        'R2_N2_l5',
        'R3_N2_l5',
        'R4_N2_l5',
        'R1_N3_l5',
        'R2_N3_l5',
        'R3_N3_l5',
        'R_N2_l6',
        'R_N3_l6',
        'R_N1_l7',
        'R1_N2_l7',
        'R2_N2_l7',
        'R_N1_l8',
        'R_N2_l8',
        'R_N3_l8',
        'R_N1_l9',
        'R_N2_l9',
        'R_N3_l9',
        'R_N1_l10',
        'R1_N2_l10',
        'R2_N2_l10',
        'R_N3_l10',
        'R_N1_l11',
        'R_N2_l11',
        'R1_N3_l11',
        'R2_N3_l11',
        'R3_N3_l11',
    ];
}
