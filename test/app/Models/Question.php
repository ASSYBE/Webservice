<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasUuids;
    protected $table = 'question';
    protected $keyType = 'uuid';
    protected $fillable = [
        'question_text_FR',
        'question_text_AR',
        'type',
        'fiche_id'
    ];
    use HasFactory;
}
