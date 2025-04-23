<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParametreStyle extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'parametre_style';
    protected $keyType = 'id';
}
