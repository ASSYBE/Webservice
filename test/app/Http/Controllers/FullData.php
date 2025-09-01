<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Beneficiaire;
use SimpleXMLElement;
use Illuminate\Support\Facades\Log;
use App\Models\Formation;
use App\Models\Sigec_connaissance;
use App\Models\Sigec_experienceprofessionnelle;
use Carbon\Carbon;


class FullData extends Controller
{
    public function login(Request $req){
        $data = $req->all();
        return response()->json(($data), 200);
    }

  public function hold_data()
    {
        // Create the root element
        $xml = new SimpleXMLElement('<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://schema.example.com" xmlns:ns2="http://xml.apache.org/xml-soap"></SOAP-ENV:Envelope>');

        // Add the Body element
        $body = $xml->addChild('SOAP-ENV:Body');

        // Add the GetChercheurResponse element
        $getChercheurResponse = $body->addChild('GetChercheurResponse', null, 'http://schema.example.com');

        // Add the GetChercheurReturn element
        $getChercheurReturn = $getChercheurResponse->addChild('GetChercheurReturn');

        // Add the item elements
        $item1 = $getChercheurReturn->addChild('item');
        $item1->addChild('key', 'Error');
        $item1->addChild('value', '');

        $item2 = $getChercheurReturn->addChild('item');
        $item2->addChild('key', 'Action');
        $item2->addChild('value', 'SELECT');

        $item3 = $getChercheurReturn->addChild('item');
        $item3->addChild('key', 'Infos');
        $infosValue = $item3->addChild('value');

        // Add the chercheur details
        $chercheurItem = $infosValue->addChild('item');
        $chercheurItem->addChild('key', 'chercheur');
        $chercheurValue = $chercheurItem->addChild('value');

        $chercheurDetails = [
            'id' => '6905981',
            'cin' => 'TN33333',
            'date_inscription' => '2013-03-04 00:00:00',
            'date_derniere_actualisation' => '2025-01-29 00:00:00',
            'nom_candidat' => 'Adam',
            'prenom' => 'Ben Yazine',
            'sexe' => 'M',
            'situation_familiale' => 'Célibataire',
            'date_naissance' => '1989-05-03 00:00:00',
            'situation_p_r_emploi' => 'Sans emploi',
            'adresse' => 'Avenue Raihane, Quartier blanc , numéro 22',
            'e_mail' => 'accountfortest@gmail.ma',
            'vemail' => '',
            'tel' => '',
            'n_gsm' => '0668821778',
            'operateur' => '',
            'status_validation_enregistrement' => '',
            'status_profil' => '',
            'commentaire' => '',
            'provenance' => 'F',
            'connaissances_info' => '',
            'photo' => '',
            'activites_extra_pro' => 'Sport, Natation et les voyages',
            'agence_id' => '138',
            'competences_specifiques' => 'PHP, Java, Javascript, Python,',
            'n_gsm2' => '',
            'status_inscription' => '',
            'statut_accompagnement_id' => '3',
            'statut_activite_id' => '2',
            'statut_positionnement_id' => '1',
            'statut_inscription_id' => '2',
            'date_insertion_trig' => '2013-03-04 00:00:00',
            'date_actualisation_trig' => '2025-01-29 11:19:38',
            'date_derniere_cnx' => '2016-07-04 00:00:00',
            'ipe' => '',
            'num_cnss' => '999999999',
            'nationalite' => '0',
            'ville_id' => '411',
            'competences' => [
                'bureautique' => '',
                'internet' => '',
                'installation_logiciels' => '',
            ],
        ];

        foreach ($chercheurDetails as $key => $value) {
            $item = $chercheurValue->addChild('item');
            $item->addChild('key', $key);
            if (is_array($value)) {
                $subValue = $item->addChild('value');
                foreach ($value as $subKey => $subVal) {
                    $subItem = $subValue->addChild('item');
                    $subItem->addChild('key', $subKey);
                    $subItem->addChild('value', $subVal);
                }
            } else {
                $item->addChild('value', $value);
            }
        }

        // Add the ville details
        $villeItem = $infosValue->addChild('item');
        $villeItem->addChild('key', 'ville');
        $villeItem->addChild('value', 'OUJDA ANGAD');

        // Add the emploi_metier details
        $emploiMetierItem = $infosValue->addChild('item');
        $emploiMetierItem->addChild('key', 'emploi_metier');
        $emploiMetierValue = $emploiMetierItem->addChild('value');

        $emploiMetiers = [
            [
                'id' => '55511',
                'appelation' => 'Analyste-développeur',
            ],
            [
                'id' => '55514',
                'appelation' => 'Responsable déploiement réseaux et télécoms',
            ],
            [
                'id' => '41228',
                'appelation' => 'Téléconseiller',
            ],
        ];

        foreach ($emploiMetiers as $emploiMetier) {
            $map = $emploiMetierValue->addChild('Map', null, 'http://xml.apache.org/xml-soap');
            $item = $map->addChild('item');
            $item->addChild('key', 'em');
            $emValue = $item->addChild('value');
            foreach ($emploiMetier as $key => $value) {
                $emItem = $emValue->addChild('item');
                $emItem->addChild('key', $key);
                $emItem->addChild('value', $value);
            }
        }

        // Add the appelation_competence details
        $appelationCompetenceItem = $infosValue->addChild('item');
        $appelationCompetenceItem->addChild('key', 'appelation_competence');
        $appelationCompetenceValue = $appelationCompetenceItem->addChild('value');

        $appelationCompetences = [
            [
                'id' => '597',
                'appelation' => 'Émettre ou réceptionner des appels pour atteindre les objectifs fixés',
                'emploi_metier_id' => '41228',
            ],
            [
                'id' => '600',
                'appelation' => 'Collecter ou échanger des informations',
                'emploi_metier_id' => '41228',
            ],
            [
                'id' => '601',
                'appelation' => 'Renseigner le système d’information',
                'emploi_metier_id' => '41228',
            ],
            [
                'id' => '595',
                'appelation' => 'Préparer le travail au cours de réunion d’équipe',
                'emploi_metier_id' => '41228',
            ],
        ];

        foreach ($appelationCompetences as $appelationCompetence) {
            $map = $appelationCompetenceValue->addChild('Map', null, 'http://xml.apache.org/xml-soap');
            $item = $map->addChild('item');
            $item->addChild('key', 'appelation_competence');
            $acValue = $item->addChild('value');
            foreach ($appelationCompetence as $key => $value) {
                $acItem = $acValue->addChild('item');
                $acItem->addChild('key', $key);
                $acItem->addChild('value', $value);
            }
        }

        // Add the diplomes details
        $diplomesItem = $infosValue->addChild('item');
        $diplomesItem->addChild('key', 'diplomes');
        $diplomesValue = $diplomesItem->addChild('value');

        $diplomes = [
            [
                'specialite' => [
                    'specialite_id' => '44551',
                    'nom_specialite' => 'Conseil en SI maitrise douvrage',
                ],
                'diplome' => [
                    'diplome_id' => '44',
                    'nom_diplome' => 'Ingénieur',
                ],
                'option_diplome' => [
                    'option_diplome_id' => '445510769',
                    'nom_option_diplome' => 'Ingénierie Informatique & réseaux',
                ],
                'groupe_etablissement' => [
                    'groupe_etablissement_id' => '9',
                    'nom_groupe_etablissement' => 'EMSI',
                ],
                'etablissement' => [
                    'etablissement_id' => '722',
                    'nom_etablissement' => 'EMSI',
                ],
                'ad' => [
                    'date_optention' => '2022',
                    'commentaire' => 'Je suis un ingénieur en SI à lEMSI',
                ],
            ],
            [
                'specialite' => [
                    'specialite_id' => '32552',
                    'nom_specialite' => 'Développement et intégration informatique',
                ],
                'diplome' => [
                    'diplome_id' => '32',
                    'nom_diplome' => 'Bac + 3, bachelor',
                ],
                'option_diplome' => [
                    'option_diplome_id' => '325520558',
                    'nom_option_diplome' => 'Génie logiciel',
                ],
                'groupe_etablissement' => [
                    'groupe_etablissement_id' => '37',
                    'nom_groupe_etablissement' => 'UNIVERSITE MOHAMMED V-AGDAL',
                ],
                'etablissement' => [
                    'etablissement_id' => '777',
                    'nom_etablissement' => 'FACULTE DES SCIENCES',
                ],
                'ad' => [
                    'date_optention' => '2021',
                    'commentaire' => 'Jai obtenu ma licence en informatique à la faculté des sciences de Rabat',
                ],
            ],
        ];

        foreach ($diplomes as $diplome) {
            $map = $diplomesValue->addChild('Map', null, 'http://xml.apache.org/xml-soap');
            foreach ($diplome as $key => $value) {
                $item = $map->addChild('item');
                $item->addChild('key', $key);
                $diplomeValue = $item->addChild('value');
                foreach ($value as $subKey => $subValue) {
                    $subItem = $diplomeValue->addChild('item');
                    $subItem->addChild('key', $subKey);
                    // Escape special characters in the value
                    $subItem->addChild('value', htmlspecialchars($subValue, ENT_XML1, 'UTF-8'));
                }
            }
        }

        // Add the experiences details
        $experiencesItem = $infosValue->addChild('item');
        $experiencesItem->addChild('key', 'experiences');
        $experiencesValue = $experiencesItem->addChild('value');

        $experiences = [
            [
                'date_debut' => '2024-01-01 00:00:00',
                'date_fin' => '2024-04-30 00:00:00',
                'entreprise' => 'Media Com',
                'poste' => 'Développeur',
                'commentaire as description' => 'Ma mission étais de développer les sites webs des clients',
                'ce_jour' => '0',
            ],
            [
                'date_debut' => '2024-05-01 00:00:00',
                'date_fin' => '2024-10-31 00:00:00',
                'entreprise' => 'Africa Ways',
                'poste' => 'Webmaster',
                'commentaire as description' => 'Ma mission étais de gérer le site de lentreprise',
                'ce_jour' => '0',
            ],
        ];

        foreach ($experiences as $experience) {
            $map = $experiencesValue->addChild('Map', null, 'http://xml.apache.org/xml-soap');
            $item = $map->addChild('item');
            $item->addChild('key', 'Experience');
            $experienceValue = $item->addChild('value');
            foreach ($experience as $key => $value) {
                $expItem = $experienceValue->addChild('item');
                $expItem->addChild('key', $key);
                $expItem->addChild('value', $value);
            }
        }

        // Return the XML as a response
        return response($xml->asXML(), 200)->header('Content-Type', 'text/xml');
    }

    public function testBilan(Request $req)
    {

        $todayFormatted = Carbon::now()->format('dmY');
        $currentHour = Carbon::now()->hour;
        $pass = '#@' . ($currentHour + 2) . $todayFormatted . '%@';

        $dom = new \DOMDocument();
        libxml_use_internal_errors(true);
    
        if ($dom->loadXML($req->getContent())) {
            // Register the namespaces (you can register both soapenv and sch namespaces)
            $xpath = new \DOMXPath($dom);
            $xpath->registerNamespace('soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
            $xpath->registerNamespace('sch', 'http://schema.example.com');
    
            // Extract specific values using XPath queries
            $login = $xpath->evaluate('string(//sch:GetChercheur/child::login)');
            $password = $xpath->evaluate('string(//sch:GetChercheur/child::password)');
            $cin = $xpath->evaluate('string(//sch:GetChercheur/child::cin)');
            $passwordCh = $xpath->evaluate('string(//sch:GetChercheur/child::password_ch)');
        }

        if ($login != 'bilan') {
            return response('<?xml version="1.0" encoding="UTF-8"?><error><code>400</code><message>Login Wrong</message></error>', 400)
                ->header('Content-Type', 'application/xml');    
        }
        if ($pass != $password) {
            return response('<?xml version="1.0" encoding="UTF-8"?><error><code>400</code><message>Password Wrong</message></error>', 400)
                ->header('Content-Type', 'application/xml');    
        }
  
        
    return response()->make('<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://schema.example.com" xmlns:ns2="http://xml.apache.org/xml-soap">
    <SOAP-ENV:Body>
        <ns1:GetChercheurResponse>
            <GetChercheurReturn>
                <item>
                    <key>Error</key>
                    <value/>
                </item>
                <item>
                    <key>Action</key>
                    <value>SELECT</value>
                </item>
                <item>
                    <key>Infos</key>
                    <value>
                        <item>
                            <key>chercheur</key>
                            <value>
                                <item><key>id</key><value>6905981</value></item>
                                <item><key>cin</key><value>'.$cin.'</value></item>
                                <item><key>date_inscription</key><value>2013-03-04 00:00:00</value></item>
                                <item><key>date_derniere_actualisation</key><value>2025-01-29 00:00:00</value></item>
                                <item><key>nom_candidat</key><value>Adam'.$cin.'</value></item>
                                <item><key>prenom</key><value>Ben Yazine'.$cin.'</value></item>
                                <item><key>sexe</key><value>M</value></item>
                                <item><key>situation_familiale</key><value>Célibataire</value></item>
                                <item><key>date_naissance</key><value>1989-05-03 00:00:00</value></item>
                                <item><key>situation_p_r_emploi</key><value>Sans emploi</value></item>
                                <item><key>adresse</key><value>Avenue Raihane, Quartier blanc , numéro 22</value></item>
                                <item><key>e_mail</key><value>accountfortest@gmail.ma</value></item>
                                <item><key>n_gsm</key><value>0668821778</value></item>
                                <item><key>commentaire</key><value/></item>
                                <item><key>provenance</key><value>F</value></item>
                                <item><key>connaissances_info</key><value/></item>
                                <item><key>photo</key><value/></item>
                                <item><key>activites_extra_pro</key><value>Sport, Natation et les voyages</value></item>
                                <item><key>agence_id</key><value>138</value></item>
                                <item><key>competences_specifiques</key><value>PHP, Java, Javascript, Python</value></item>
                                <item><key>n_gsm2</key><value/></item>
                                <item><key>status_inscription</key><value/></item>
                                <item><key>statut_accompagnement_id</key><value>3</value></item>
                                <item><key>statut_activite_id</key><value>2</value></item>
                                <item><key>statut_positionnement_id</key><value>1</value></item>
                                <item><key>statut_inscription_id</key><value>2</value></item>
                                <item><key>date_insertion_trig</key><value>2013-03-04 00:00:00</value></item>
                                <item><key>date_actualisation_trig</key><value>2025-01-29 11:19:38</value></item>
                                <item><key>date_derniere_cnx</key><value>2016-07-04 00:00:00</value></item>
                                <item><key>ipe</key><value/></item>
                                <item><key>num_cnss</key><value>999999999</value></item>
                                <item><key>nationalite</key><value>0</value></item>
                                <item><key>ville_id</key><value>411</value></item>
                                <item><key>competences</key>
                                    <value>
                                        <item><key>bureautique</key><value/></item>
                                        <item><key>internet</key><value/></item>
                                        <item><key>installation_logiciels</key><value/></item>
                                    </value>
                                </item>
                            </value>
                        </item>
                        <item><key>ville</key><value>OUJDA ANGAD</value></item>
                        <item><key>emploi_metier</key>
                            <value>
                                <ns2:Map>
                                    <item>
                                        <key>em</key>
                                        <value>
                                            <item><key>id</key><value>55511</value></item>
                                            <item><key>appelation</key><value>Analyste-développeur</value></item>
                                        </value>
                                    </item>
                                </ns2:Map>
                                <ns2:Map>
                                    <item>
                                        <key>em</key>
                                        <value>
                                            <item><key>id</key><value>55514</value></item>
                                            <item><key>appelation</key><value>Responsable déploiement réseaux et télécoms</value></item>
                                        </value>
                                    </item>
                                </ns2:Map>
                                <ns2:Map>
                                    <item>
                                        <key>em</key>
                                        <value>
                                            <item><key>id</key><value>41228</value></item>
                                            <item><key>appelation</key><value>Téléconseiller</value></item>
                                        </value>
                                    </item>
                                </ns2:Map>
                            </value>
                        </item>
                        <item>
                            <key>appelation_competence</key>
                            <value>
                                <ns2:Map>
                                    <item>
                                        <key>appelation_competence</key>
                                        <value>
                                            <item><key>id</key><value>597</value></item>
                                            <item><key>appelation</key><value>Émettre ou réceptionner des appels pour atteindre les objectifs fixés</value></item>
                                            <item><key>emploi_metier_id</key><value>41228</value></item>
                                        </value>
                                    </item>
                                </ns2:Map>
                                <ns2:Map>
                                    <item>
                                        <key>appelation_competence</key>
                                        <value>
                                            <item><key>id</key><value>600</value></item>
                                            <item><key>appelation</key><value>Collecter ou échanger des informations</value></item>
                                            <item><key>emploi_metier_id</key><value>41228</value></item>
                                        </value>
                                    </item>
                                </ns2:Map>
                                <ns2:Map>
                                    <item>
                                        <key>appelation_competence</key>
                                        <value>
                                            <item><key>id</key><value>601</value></item>
                                            <item><key>appelation</key><value>Renseigner le système d’information</value></item>
                                            <item><key>emploi_metier_id</key><value>41228</value></item>
                                        </value>
                                    </item>
                                </ns2:Map>
                                <ns2:Map>
                                    <item>
                                        <key>appelation_competence</key>
                                        <value>
                                            <item><key>id</key><value>595</value></item>
                                            <item><key>appelation</key><value>Préparer le travail au cours de réunion d’équipe</value></item>
                                            <item><key>emploi_metier_id</key><value>41228</value></item>
                                        </value>
                                    </item>
                                </ns2:Map>
                            </value>
                        </item>
                        <item>
                            <key>diplomes</key>
                            <value>
                                <ns2:Map>
                                    <item>
                                        <key>specialite</key>
                                        <value>
                                            <item><key>specialite_id</key><value>44551</value></item>
                                            <item><key>nom_specialite</key><value>Conseil en SI maitrise douvrage</value></item>
                                        </value>
                                    </item>
                                    <item>
                                        <key>diplome</key>
                                        <value>
                                            <item><key>diplome_id</key><value>44</value></item>
                                            <item><key>nom_diplome</key><value>Ingénieur</value></item>
                                        </value>
                                    </item>
                                    <item>
                                        <key>option_diplome</key>
                                        <value>
                                            <item><key>option_diplome_id</key><value>445510769</value></item>
                                            <item><key>nom_option_diplome</key><value>Ingénierie Informatique &amp; réseaux</value></item>
                                        </value>
                                    </item>
                                    <item>
                                        <key>groupe_etablissement</key>
                                        <value>
                                            <item><key>groupe_etablissement_id</key><value>9</value></item>
                                            <item><key>nom_groupe_etablissement</key><value>EMSI</value></item>
                                        </value>
                                    </item>
                                    <item>
                                        <key>etablissement</key>
                                        <value>
                                            <item><key>etablissement_id</key><value>722</value></item>
                                            <item><key>nom_etablissement</key><value>EMSI</value></item>
                                        </value>
                                    </item>
                                    <item>
                                        <key>ad</key>
                                        <value>
                                            <item><key>date_optention</key><value>2022</value></item>
                                            <item><key>commentaire</key><value>Je suis un ingénieur en SI à lEMSI</value></item>
                                        </value>
                                    </item>
                                </ns2:Map>
                                <ns2:Map>
                                    <item>
                                        <key>specialite</key>
                                        <value>
                                            <item><key>specialite_id</key><value>32552</value></item>
                                            <item><key>nom_specialite</key><value>Développement et intégration informatique</value></item>
                                        </value>
                                    </item>
                                    <item>
                                        <key>diplome</key>
                                        <value>
                                            <item><key>diplome_id</key><value>32</value></item>
                                            <item><key>nom_diplome</key><value>Bac + 3, bachelor</value></item>
                                        </value>
                                    </item>
                                    <item>
                                        <key>option_diplome</key>
                                        <value>
                                            <item><key>option_diplome_id</key><value>325520558</value></item>
                                            <item><key>nom_option_diplome</key><value>Génie logiciel</value></item>
                                        </value>
                                    </item>
                                    <item>
                                        <key>groupe_etablissement</key>
                                        <value>
                                            <item><key>groupe_etablissement_id</key><value>37</value></item>
                                            <item><key>nom_groupe_etablissement</key><value>UNIVERSITE MOHAMMED V-AGDAL</value></item>
                                        </value>
                                    </item>
                                    <item>
                                        <key>etablissement</key>
                                        <value>
                                            <item><key>etablissement_id</key><value>777</value></item>
                                            <item><key>nom_etablissement</key><value>FACULTE DES SCIENCES</value></item>
                                        </value>
                                    </item>
                                    <item>
                                        <key>ad</key>
                                        <value>
                                            <item><key>date_optention</key><value>2021</value></item>
                                            <item><key>commentaire</key><value>Jai obtenu ma licence en informatique à la faculté des sciences de Rabat</value></item>
                                        </value>
                                    </item>
                                </ns2:Map>
                            </value>
                        </item>
                        <item>
                            <key>experiences</key>
                            <value>
                                <ns2:Map>
                                    <item>
                                        <key>Experience</key>
                                        <value>
                                            <item><key>id</key><value>1 '.$cin.'</value></item>    
                                            <item><key>date_debut</key><value>2024-01-01 00:00:00</value></item>
                                            <item><key>date_fin</key><value>2024-04-30 00:00:00</value></item>
                                            <item><key>entreprise</key><value>Media Com</value></item>
                                            <item><key>poste</key><value>Développeur</value></item>
                                            <item><key>commentaire as description</key><value>Ma mission étais de développer les sites webs des clients</value></item>
                                            <item><key>ce_jour</key><value>0</value></item>
                                        </value>
                                    </item>
                                </ns2:Map>
                                <ns2:Map>
                                    <item>
                                        <key>Experience</key>
                                        <value>
                                            <item><key>id</key><value>2 '.$cin.'</value></item>    
                                            <item><key>date_debut</key><value>2024-05-01 00:00:00</value></item>
                                            <item><key>date_fin</key><value>2024-10-31 00:00:00</value></item>
                                            <item><key>entreprise</key><value>Africa Ways</value></item>
                                            <item><key>poste</key><value>Webmaster</value></item>
                                            <item><key>commentaire as description</key><value>Ma mission étais de gérer le site de lentreprise</value></item>
                                            <item><key>ce_jour</key><value>0</value></item>
                                        </value>
                                    </item>
                                </ns2:Map>
                            </value>
                        </item>
                    </value>
                </item>
            </GetChercheurReturn>
        </ns1:GetChercheurResponse>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>', 200, [
        'Content-Type' => 'application/xml',
    ]);
}


}
    

  