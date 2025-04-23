<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    use HasUuids;
    public $table = 'agenda';
    protected $keyType = 'id';
    protected $fillable = [
        'objet',
        'date_RDV',
        'heure_RDV_debut',
        'heure_RDV_fin',
        'type_RDV',
        'present',
        'beneficier_id',
        'date_modification',
        'commentaire',
        'createur'
    ];

    use HasFactory;
}
