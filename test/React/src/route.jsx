import React, { useContext } from 'react'
import HomePage from './screens/HomePage';
import BDCPage from './screens/BDCPage';
import { createBrowserRouter } from 'react-router-dom';
import Fiche04Screen from './pages/etape01/fiche04/Fiche04Screen';
import Fiche05Screen from './pages/etape01/fiche05/Fiche05Screen';
import Fiche06Screen from './pages/etape01/fiche06/Fiche06Screen';
import Fiche07Screen from './pages/etape01/fiche07/Fiche07Screen';
import Fiche03Screen from './pages/etape01/fiche03/Fiche03Screen';
import Fiche08Screen from './pages/etape01/fiche08/Fiche08Screen';
import Fiche08ExperienceProfessionnelleScreen from './pages/etape01/fiche08/experienceProfessionnelle/Fiche08ExperienceProfessionnelleScreen';
import Fiche08EvaluationExperienceScreen from './pages/etape01/fiche08/evaluationDeExperience/Fiche08EvaluationExperienceScreen';
import Fiche08AnalysePosteScreen from './pages/etape01/fiche08/analyseDuPoste/Fiche08AnalysePosteScreen';
import Fiche08ActiviteExtraProfessionnelleScreen from './pages/etape01/fiche08/activiteExtraProfessionnelle/Fiche08ActiviteExtraProfessionnelleScreen';
import Fiche08CompetenceScreen from './pages/etape01/fiche08/competences/Fiche08CompetenceScreen';
import Fiche09Screen from './pages/etape02/fiche09/Fiche09Screen';
import Fiche10Screen from './pages/etape02/fiche10/Fiche10Screen';
import Fiche08FormationInitialeContinueScreen from './pages/etape01/fiche08/formationInitialeContinue/Fiche08FormationInitialeContinueScreen';
import Fiche09AScreen from './pages/etape02/fiche09A/Fiche09AScreen';
import Fiche09BScreen from './pages/etape02/fiche09B/Fiche09BScreen';
import Fiche11Screen from './pages/etape02/fiche11/Fiche11Screen';
import Fiche12Screen from './pages/etape02/fiche12/Fiche12Screen';
import Fiche10ActiviteScreen from './pages/etape02/fiche10/Fiche10ActiviteScreen';
import Fiche10DecisionScreen from './pages/etape02/fiche10/Fiche10DecisionScreen';
import Fiche13Screen from './pages/etape02/fiche13/Fiche13Screen';
import Fiche13_1 from './pages/etape02/fiche13/Fiche13_1';
import Fiche13_2 from './pages/etape02/fiche13/Fiche13_2';
import Fiche13_3 from './pages/etape02/fiche13/Fiche13_3';
import Fiche13_4 from './pages/etape02/fiche13/Fiche13_4';
import Fiche13_5 from './pages/etape02/fiche13/Fiche13_5';
import Fiche13_6 from './pages/etape02/fiche13/Fiche13_6';
import Fiche13_7 from './pages/etape02/fiche13/Fiche13_7';
import Fiche13_8 from './pages/etape02/fiche13/Fiche13_8';
import Fiche13_9 from './pages/etape02/fiche13/Fiche13_9';
import Fiche13_10 from './pages/etape02/fiche13/Fiche13_10';
import Fiche13_11 from './pages/etape02/fiche13/Fiche13_11';
import Fiche13_12 from './pages/etape02/fiche13/Fiche13_12';
import Fiche13_13 from './pages/etape02/fiche13/Fiche13_13';
import Fiche13_14 from './pages/etape02/fiche13/Fiche13_14';
import Fiche13_15 from './pages/etape02/fiche13/Fiche13_15';

import { BdcContext } from './contexts/BdcContext';
import { Fiche13_acquerir } from './pages/etape02/fiche13/Fiche13_acquerir';
import { Fiche14Screen } from './pages/etape02/fiche14/Fiche14Screen';
import { FicheReponse } from './pages/etape02/fiche14/FicheReponse';
import { Fiche14_interet } from './pages/etape02/fiche14/Fiche14_interet';
import { Fiche15Screen } from './pages/etape02/fiche15/Fiche15Screen';
import { Fiche16Screen } from './pages/etape02/fiche16/Fiche16Screen';
import { Fiche15Reponse } from './pages/etape02/fiche15/Fiche15Reponse';
import { Fiche15 } from './pages/etape02/fiche15/Fiche15';
import { Fiche17 } from './pages/etape02/fiche17/Fiche17';
import { Fiche17Screen } from './pages/etape02/fiche17/Fiche17Screen';
import { ProfilGraphique } from './pages/etape02/fiche14/ProfilGraphique';
import { Fiche17Reponse } from './pages/etape02/fiche17/Fiche17Reponse';
import { Fiche20Screen } from './pages/etape03/Fiche20/Fiche20Screen';
import { Fiche18Screen } from './pages/etape03/Fiche18/Fiche18Screen';
import { Fiche19Screen } from './pages/etape03/Fiche19/Fiche19Screen';
import { Fiche21Screen } from './pages/etape03/Fiche21/Fiche21Screen';
import { Fiche22Screen } from './pages/etape03/Fiche22/Fiche22Screen';



const route = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '*',
        element: <HomePage />,
    },
    {
        path: '/BDC',
        element: <BDCPage />,
        children: [
            {
                path: '',
                element: <Fiche03Screen />,
            },
            {
                path: 'fiche03',
                element: <Fiche03Screen />,
            },
            {
                path: 'fiche04',
                element: <Fiche04Screen />,
            },
            {
                path: 'fiche05',
                element: <Fiche05Screen />,

            },
            {
                path: 'fiche06',
                element: <Fiche06Screen />,
            },
            {
                path: 'fiche07',
                element: <Fiche07Screen />,
            },
            {
                path: 'fiche08',
                element: <Fiche08Screen />,
                children: [
                    {
                        path: '',
                        element: <Fiche08FormationInitialeContinueScreen />
                    },
                    {
                        path: 'formationInitialeContinue',
                        element: <Fiche08FormationInitialeContinueScreen />
                    },
                    {// if(bilanDC.type_beneficier !== 'jeunes')
                        path: 'experienceProfessionnelle',
                        element: <Fiche08ExperienceProfessionnelleScreen />
                    },
                    {// if(bilanDC.type_beneficier !== 'jeunes')
                        path: 'evaluationExperience',
                        element: <Fiche08EvaluationExperienceScreen />
                    },
                    {// if(bilanDC.type_beneficier !== 'jeunes')
                        path: 'analysePoste',
                        element: <Fiche08AnalysePosteScreen />
                    },
                    {// if(bilanDC.type_beneficier !== 'jeunes')
                        path: 'activiteExtraProfessionnelle',
                        element: <Fiche08ActiviteExtraProfessionnelleScreen />
                    },
                    {
                        path: 'competence',
                        element: <Fiche08CompetenceScreen />
                    }
                ]
            },
            {
                path: 'fiche09',
                element: <Fiche09Screen />,
            },
            {// if(bilanDC.type_beneficier !== 'jeunes')
                path: 'fiche10',
                element: <Fiche10Screen />,
                children: [
                    {
                        path: '',
                        element: <Fiche10ActiviteScreen />
                    },
                    {
                        path: 'activites',
                        element: <Fiche10ActiviteScreen />
                    },
                    {
                        path: 'decisions',
                        element: <Fiche10DecisionScreen />
                    },
                ]
            },
            {// if(bilanDC.type_beneficier !== 'jeunes')
                path: 'fiche09A',
                element: <Fiche09AScreen />,
            },
            {
                path: 'fiche09B',
                element: <Fiche09BScreen />,
            },
            {// if(bilanDC.type_beneficier === 'jeunes')
                path: 'fiche11A',
                element: <Fiche11Screen />,
            },
            {// if(bilanDC.type_beneficier === 'jeunes')
                path: 'fiche12',
                element: <Fiche12Screen />,
            },
            {
                path: 'fiche13',
                element: <Fiche13Screen />,
                children: [
                    {
                        path: '',
                        element: <Fiche13_1 />,
                    },
                    {
                        path: 'competence1',
                        element: <Fiche13_1 />,
                    },
                    {
                        path: 'competence2',
                        element: <Fiche13_2 />,
                    },
                    {
                        path: 'competence3',
                        element: <Fiche13_3 />,
                    },
                    {
                        path: 'competence4',
                        element: <Fiche13_4 />,
                    },
                    {
                        path: 'competence5',
                        element: <Fiche13_5 />,
                    },
                    {
                        path: 'competence6',
                        element: <Fiche13_6 />,
                    },
                    {
                        path: 'competence7',
                        element: <Fiche13_7 />,
                    },
                    {
                        path: 'competence8',
                        element: <Fiche13_8 />,
                    },
                    {
                        path: 'competence9',
                        element: <Fiche13_9 />,
                    },
                    {
                        path: 'competence10',
                        element: <Fiche13_10 />,
                    },
                    {
                        path: 'competence11',
                        element: <Fiche13_11 />,
                    },
                    {
                        path: 'competence12',
                        element: <Fiche13_12 />,
                    },
                    {
                        path: 'competence13',
                        element: <Fiche13_13 />,
                    },
                    {
                        path: 'competence14',
                        element: <Fiche13_14 />,
                    },
                    {
                        path: 'competence15',
                        element: <Fiche13_15 />,
                    },
                    {
                        path: 'acquerir',
                        element: <Fiche13_acquerir />,
                    },
                ]
            },
            {
                path: 'fiche14',
                element: <Fiche14_interet />,
                children: [
                    {
                        path: '',
                        element: <Fiche14Screen />
                    },
                    {
                        path: 'ficheReponse',
                        element: <FicheReponse />
                    },
                    {
                        path: 'graph',
                        element: <ProfilGraphique />
                    }
                ]

            },
            {
                path: 'fiche15',
                element: <Fiche15 />,
                children: [
                    {
                        path: '',
                        element: <Fiche15Screen />
                    },
                    {
                        path: 'ficheReponse',
                        element: <Fiche15Reponse />
                    }
                ]
            },
            {
                path: 'fiche16',
                element: <Fiche16Screen />,
            },
            {
                path: 'fiche17',
                element: <Fiche17 />,
                children: [
                    {
                        path: '',
                        element: <Fiche17Screen />
                    },
                    {
                        path: 'ficheReponse',
                        element: <Fiche17Reponse />
                    }
                ]
            },
            {
                path: 'fiche18',
                element: <Fiche18Screen />,
            },
            {
                path: 'fiche19',
                element: <Fiche19Screen />,
            },
            {
                path: 'fiche20',
                element: <Fiche20Screen />,
            },
            {
                path: 'fiche21',
                element: <Fiche21Screen />,
            },
            {
                path: 'fiche22',
                element: <Fiche22Screen />,
            },
        ],
    },
]);

export default route;