<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiche08 extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'reponse_fiche8';
    protected $keyType = 'string';
    protected $primaryKey = 'id';

    protected $fillable = [
        'uuid_condidat',
        'reponseQ1',
        'reponseQ2',
        'reponseQ3',
        'activitesPrincipales',
        'activitesSecondaires',
        'aspectsPositifs',
        'aspectsNegatifs',
        'connaissancesNecessaires',
        'responsabilites',
        'problemesRencontres',
        'niveauAutonomie',
        'savoirFaire',
        'r'
    ];

    public $timestamps = true;
}
