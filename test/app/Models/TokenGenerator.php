<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TokenGenerator extends Model
{
    use HasFactory, HasUuids;
    protected $table = "random_token";
    protected $keyType = 'id';
    protected $fillable = [
        "token",
        "cin",
        "nomAgent",
        'role',
        "date_expire"
    ];
}
