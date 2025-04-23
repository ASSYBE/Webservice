import { StrictMode, useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './output.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './screens/HomePage'
import { BdcContext } from './contexts/BdcContext'
import BDCPage from './screens/BDCPage'
import Fiche03Screen from './pages/etape01/fiche03/Fiche03Screen'
import Fiche04Screen from './pages/etape01/fiche04/Fiche04Screen'
import Fiche05Screen from './pages/etape01/fiche05/Fiche05Screen'
import Fiche06Screen from './pages/etape01/fiche06/Fiche06Screen'
import Fiche07Screen from './pages/etape01/fiche07/Fiche07Screen'
import Fiche08Screen from './pages/etape01/fiche08/Fiche08Screen'
import Fiche08FormationInitialeContinueScreen from './pages/etape01/fiche08/formationInitialeContinue/Fiche08FormationInitialeContinueScreen'
import Fiche09Screen from './pages/etape02/fiche09/Fiche09Screen'
import Fiche10Screen from './pages/etape02/fiche10/Fiche10Screen'
import Fiche11Screen from './pages/etape02/fiche11/Fiche11Screen'
import Fiche12Screen from './pages/etape02/fiche12/Fiche12Screen'
import Fiche13Screen from './pages/etape02/fiche13/Fiche13Screen'
import { Fiche14Screen } from './pages/etape02/fiche14/Fiche14Screen'
import { Fiche15Screen } from './pages/etape02/fiche15/Fiche15Screen'
import { Fiche16Screen } from './pages/etape02/fiche16/Fiche16Screen'
import { Fiche17Screen } from './pages/etape02/fiche17/Fiche17Screen'
import { Fiche18Screen } from './pages/etape03/Fiche18/Fiche18Screen'
import { Fiche19Screen } from './pages/etape03/Fiche19/Fiche19Screen'
import { Fiche20Screen } from './pages/etape03/Fiche20/Fiche20Screen'
import { Fiche21Screen } from './pages/etape03/Fiche21/Fiche21Screen'
import { Fiche22Screen } from './pages/etape03/Fiche22/Fiche22Screen'
import Fiche08ExperienceProfessionnelleScreen from './pages/etape01/fiche08/experienceProfessionnelle/Fiche08ExperienceProfessionnelleScreen'
import Fiche08EvaluationExperienceScreen from './pages/etape01/fiche08/evaluationDeExperience/Fiche08EvaluationExperienceScreen'
import Fiche08AnalysePosteScreen from './pages/etape01/fiche08/analyseDuPoste/Fiche08AnalysePosteScreen'
import Fiche08ActiviteExtraProfessionnelleScreen from './pages/etape01/fiche08/activiteExtraProfessionnelle/Fiche08ActiviteExtraProfessionnelleScreen'
import Fiche08CompetenceScreen from './pages/etape01/fiche08/competences/Fiche08CompetenceScreen'
import Fiche10ActiviteScreen from './pages/etape02/fiche10/Fiche10ActiviteScreen'
import Fiche10DecisionScreen from './pages/etape02/fiche10/Fiche10DecisionScreen'
import { NotFound } from './screens/NotFound'
import { BeneficierContext } from './contexts/BeneficierContext'
import Fiche13_1 from './pages/etape02/fiche13/Fiche13_1'
import Fiche13_2 from './pages/etape02/fiche13/Fiche13_2'
import Fiche13_3 from './pages/etape02/fiche13/Fiche13_3'
import Fiche13_4 from './pages/etape02/fiche13/Fiche13_4'
import Fiche13_5 from './pages/etape02/fiche13/Fiche13_5'
import Fiche13_6 from './pages/etape02/fiche13/Fiche13_6'
import Fiche13_7 from './pages/etape02/fiche13/Fiche13_7'
import Fiche13_8 from './pages/etape02/fiche13/Fiche13_8'
import Fiche13_9 from './pages/etape02/fiche13/Fiche13_9'
import Fiche13_10 from './pages/etape02/fiche13/Fiche13_10'
import Fiche13_11 from './pages/etape02/fiche13/Fiche13_11'
import Fiche13_12 from './pages/etape02/fiche13/Fiche13_12'
import Fiche13_13 from './pages/etape02/fiche13/Fiche13_13'
import Fiche13_14 from './pages/etape02/fiche13/Fiche13_14'
import Fiche13_15 from './pages/etape02/fiche13/Fiche13_15'
import { Fiche15Reponse } from './pages/etape02/fiche15/Fiche15Reponse'
import { Fiche17Reponse } from './pages/etape02/fiche17/Fiche17Reponse'
import { FicheReponse } from './pages/etape02/fiche14/FicheReponse'
import { Fiche13_acquerir } from './pages/etape02/fiche13/Fiche13_acquerir'
import { ProfilGraphique } from './pages/etape02/fiche14/ProfilGraphique'
import Fiche09AScreen from './pages/etape02/fiche09A/Fiche09AScreen'
import Fiche09BScreen from './pages/etape02/fiche09B/Fiche09BScreen'
import { Fiche17 } from './pages/etape02/fiche17/Fiche17'
import { Fiche16Softskills } from './pages/etape02/fiche16/Fiche16Softskills'
import { Fiche14_interet } from './pages/etape02/fiche14/Fiche14_interet'
import { Fiche15 } from './pages/etape02/fiche15/Fiche15'
import { Fiche16 } from './pages/etape02/fiche16/Fiche16'
import { anapecRole, type_jeune } from './constants/Variables'
import { StartPage } from './screens/StartPage'
import { TokenContext } from './contexts/TokenContext'

function App() {

  const { bilanDC, getBdc } = useContext(BdcContext);
  const { beneficier, getBeneficier } = useContext(BeneficierContext)
  const { role, token, cin, getToken } = useContext(TokenContext)

  useEffect(() => {
    if (cin && token)
    {
      getBdc();
      console.log('************************')
    }
    else
      getToken();
  }, [cin, token]);

  return (
    <Router>
      <Routes>
        <Route path="/BDC" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/NotFound" element={<NotFound />} />

        <Route path="/" element={<StartPage />} />

        <Route path="/BDC" element={<BDCPage />}>
          <Route path="fiche03" element={<StrictMode><Fiche03Screen /></StrictMode>} />
          <Route path="fiche04" element={<StrictMode><Fiche04Screen /></StrictMode>} />
          <Route path="fiche05" element={<StrictMode><Fiche05Screen /></StrictMode>} />
          <Route path="fiche06" element={<StrictMode><Fiche06Screen /></StrictMode>} />
          <Route path="fiche07" element={<StrictMode><Fiche07Screen /></StrictMode>} />

          {/* fiche 08 */}
          <Route path="fiche08" element={<StrictMode><Fiche08Screen /></StrictMode>}>
            <Route index element={<Fiche08FormationInitialeContinueScreen />} />
            <Route path="formationInitialeContinue" element={<Fiche08FormationInitialeContinueScreen />} />
            {bilanDC?.type_beneficier !== type_jeune && (
              <>
                <Route path="experienceProfessionnelle" element={<Fiche08ExperienceProfessionnelleScreen />} />
                <Route path="evaluationExperience" element={<Fiche08EvaluationExperienceScreen />} />
                <Route path="analysePoste" element={<Fiche08AnalysePosteScreen />} />
              </>
            )}
            <Route path="activiteExtraProfessionnelle" element={<Fiche08ActiviteExtraProfessionnelleScreen />} />
            <Route path="competence" element={<Fiche08CompetenceScreen />} />
          </Route>

          <Route path="fiche09" element={<StrictMode><Fiche09Screen /></StrictMode>} />

          {/* fiche 10 */}
          {bilanDC?.type_beneficier !== type_jeune && (
            <>
              <Route path="fiche10" element={<StrictMode><Fiche10Screen /></StrictMode>}>
                <Route index element={<Fiche10ActiviteScreen />} />
                <Route path="activites" element={<Fiche10ActiviteScreen />} />
                <Route path="decisions" element={<Fiche10DecisionScreen />} />
              </Route>
              <Route path="fiche09A" element={<Fiche09AScreen />} />
              <Route path="fiche09B" element={<Fiche09BScreen />} />
            </>
          )}

          {/* fiche 11A et fiche 12 */}
          {bilanDC?.type_beneficier !== type_jeune && (
            <>
              <Route path="fiche11A" element={<StrictMode><Fiche11Screen /></StrictMode>} />

            </>
          )}

          <Route path="fiche12" element={<StrictMode><Fiche12Screen /></StrictMode>} />
          <Route path="fiche13" element={<StrictMode><Fiche13Screen /></StrictMode>} >
            <Route index element={<StrictMode><Fiche13_1 /></StrictMode>} />
            <Route path="competence1" element={<StrictMode><Fiche13_1 /></StrictMode>} />
            <Route path="competence2" element={<StrictMode><Fiche13_2 /></StrictMode>} />
            <Route path="competence3" element={<StrictMode><Fiche13_3 /></StrictMode>} />
            <Route path="competence4" element={<StrictMode><Fiche13_4 /></StrictMode>} />
            <Route path="competence5" element={<StrictMode><Fiche13_5 /></StrictMode>} />
            <Route path="competence6" element={<StrictMode><Fiche13_6 /></StrictMode>} />
            <Route path="competence7" element={<StrictMode><Fiche13_7 /></StrictMode>} />
            <Route path="competence8" element={<StrictMode><Fiche13_8 /></StrictMode>} />
            <Route path="competence9" element={<StrictMode><Fiche13_9 /></StrictMode>} />
            <Route path="competence10" element={<StrictMode><Fiche13_10 /></StrictMode>} />
            <Route path="competence11" element={<StrictMode><Fiche13_11 /></StrictMode>} />
            <Route path="competence12" element={<StrictMode><Fiche13_12 /></StrictMode>} />
            <Route path="competence13" element={<StrictMode><Fiche13_13 /></StrictMode>} />
            <Route path="competence14" element={<StrictMode><Fiche13_14 /></StrictMode>} />
            <Route path="competence15" element={<StrictMode><Fiche13_15 /></StrictMode>} />
            <Route path="acquerir" element={<StrictMode><Fiche13_acquerir /></StrictMode>} />
          </Route>

          <Route path="fiche14" element={<StrictMode><Fiche14_interet /></StrictMode>} >
            <Route index element={<StrictMode><Fiche14Screen /></StrictMode>} />
            {role == anapecRole && <Route path="ficheReponse" element={<FicheReponse />} />}
            <Route path="graph" element={<ProfilGraphique />} />
          </Route>

          <Route path="fiche15" element={<StrictMode><Fiche15 /></StrictMode>} >
            <Route index element={<StrictMode><Fiche15Screen /></StrictMode>} />
            <Route path="ficheReponse" element={<StrictMode><Fiche15Reponse /></StrictMode>} />
          </Route>

          <Route path="fiche16" element={<StrictMode><Fiche16 /></StrictMode>} >
            <Route index element={<StrictMode><Fiche16Screen /></StrictMode>} />
            <Route path="softskill" element={<StrictMode><Fiche16Softskills /></StrictMode>} />
          </Route >

          <Route path="fiche17" element={<StrictMode><Fiche17 /></StrictMode>} >
            <Route index element={<StrictMode><Fiche17Screen /></StrictMode>} />
            <Route path="ficheReponse" element={<StrictMode><Fiche17Reponse /></StrictMode>} />
          </Route>

          <Route path="fiche18" element={<StrictMode><Fiche18Screen /></StrictMode>} />
          <Route path="fiche19" element={<StrictMode><Fiche19Screen /></StrictMode>} />
          <Route path="fiche20" element={<StrictMode><Fiche20Screen /></StrictMode>} />
          <Route path="fiche21" element={<StrictMode><Fiche21Screen /></StrictMode>} />
          <Route path="fiche22" element={<StrictMode><Fiche22Screen /></StrictMode>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
