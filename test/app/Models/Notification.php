<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory,HasUuids;

    public $table = 'notification';
    protected $keytype='id';
    protected $fillable = [
        'date_creation',
        'sujet',
        'message',
        'cin',
        'status',
    ];
}
