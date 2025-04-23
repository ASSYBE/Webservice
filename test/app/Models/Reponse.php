<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reponse extends Model
{
    use HasUuids;
    protected $table = "reponses";
    protected $keyType = 'uuid';
    protected $fillable = [
        'reponse_text',
        'user_id',
        'question_id'
    ];
    use HasFactory;

    public function question()
    {
        return $this->belongsTo('questions');
    }
}
