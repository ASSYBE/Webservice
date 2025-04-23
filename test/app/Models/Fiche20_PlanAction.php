<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche20_PlanAction extends Model
{
    use HasFactory, HasUuids;
    protected $table = "reponse_fiche20_planaction";
    protected $keyType = "string";
    protected $fillable = [
        'id',
        'cin',
        'UUID_BDC',
        'quoiFaire',
        'quand',
        'ou',
        'financement'
    ];
}
