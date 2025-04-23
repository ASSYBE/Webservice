<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BDC extends Model
{
    use HasFactory, HasUuids;
    public $table = "bdc";
    protected $keytype = "id";

    protected $fillable = [
        'cin',
        'date_creation',
        'type_beneficier',
        'fiche_actuel',
        'statusBDC',
        'statusEtape01',
        'statusEtape02',
        'statusEtape03',
        'dateCreationEtape01',
        'dateCreationEtape02',
        'dateCreationEtape03',
        'statusFiche03',
        'statusFiche04',
        'statusFiche05',
        'statusFiche06',
        'statusFiche07',
        'statusFiche08',
        'statusFiche09',
        'statusFiche10',
        'statusFiche9A',
        'statusFiche9B',
        'statusFiche11A',
        'statusFiche11B',
        'statusFiche11C',
        'statusFiche12',
        'statusFiche13',
        'statusFiche14',
        'statusFiche15',
        'statusFiche16',
        'statusFiche17A',
        'statusFiche17B',
        'statusFiche18',
        'statusFiche19',
        'statusFiche20',
        'statusFiche21',
        'statusFiche22',
        'dateCreationFiche03',
        'dateCreationFiche04',
        'dateCreationFiche05',
        'dateCreationFiche06',
        'dateCreationFiche07',
        'dateCreationFiche08',
        'dateCreationFiche09',
        'dateCreationFiche10',
        'dateCreationFiche09A',
        'dateCreationFiche09B',
        'dateCreationFiche11A',
        'dateCreationFiche11B',
        'dateCreationFiche11C',
        'dateCreationFiche12',
        'dateCreationFiche13',
        'dateCreationFiche14',
        'dateCreationFiche15',
        'dateCreationFiche16',
        'dateCreationFiche17A',
        'dateCreationFiche17B',
        'dateCreationFiche18',
        'dateCreationFiche19',
        'dateCreationFiche20',
        'dateCreationFiche21',
        'dateCreationFiche22'
    ];
}
