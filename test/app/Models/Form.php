<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasUuids;
    //protected $table = 'forms';
    protected $keyType = 'uuid';
    protected $fillable = [
        'title',
        'date_initialisation',
        'user_id'
    ];
    use HasFactory;

    public function user()
    {
        return $this->belongsTo('users');
    }
}
