<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'fiche';

    protected $keytype = "uuid";
    protected $fillable = [
        'reponse',
        'question_id',
        'bdc_id'
    ];

}
