<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sigec_connaissance extends Model
{
    use HasFactory, HasUuids;
    
    protected $table = "sigec_connaissance";
    
    protected $keyType = "uuid";

    protected $fillable = [
        "uuid_parameter_formation",
        "connaissance",
    ];
}
