<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParametreCapacit extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'parametre_capacite';
    protected $keyType = 'id';
}
