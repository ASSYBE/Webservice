import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../../../contexts/LanguageContext'
import ButtonComponent from '../../../component/ButtonComponent'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { RowComponent } from '../../../component/RowComponent'
import axiosClient from '../../../api/axios-client'
import { useNavigate } from 'react-router-dom'
import { TableHeader13Component } from '../../../component/TableHeader13Component'
import { ButtonsComponent } from '../../../component/ButtonsComponent'
import { BdcContext } from '../../../contexts/BdcContext'
import { TokenContext } from '../../../contexts/TokenContext'

function noteNumber(note) {
    if (note === 'fiche13_P1')
        return 3;
    if (note === 'fiche13_P2')
        return 2;
    if (note === 'fiche13_P3')
        return 1;
    if (note === 'fiche13_P4')
        return 0;

}
function noteValeurId(note) {
    if (note === 3)
        return 'fiche13_P1';
    if (note === 2)
        return 'fiche13_P2';
    if (note === 1)
        return 'fiche13_P3';
    if (note === 0)
        return 'fiche13_P4';

}
export default function Fiche13_2() {
    const [competence2_Q1_outilspratique, setCompetence2_Q1_outilspratique] = useState("")
    const [competence2_Q1_situation, setCompetence2_Q1_situation] = useState("")
    const [competence2_Q1_niveau, setCompetence2_Q1_niveau] = useState("")

    const [competence2_Q2_outilspratique, setCompetence2_Q2_outilspratique] = useState("")
    const [competence2_Q2_situation, setCompetence2_Q2_situation] = useState("")
    const [competence2_Q2_niveau, setCompetence2_Q2_niveau] = useState("")

    const [competence2_Q3_outilspratique, setCompetence2_Q3_outilspratique] = useState("")
    const [competence2_Q3_situation, setCompetence2_Q3_situation] = useState("")
    const [competence2_Q3_niveau, setCompetence2_Q3_niveau] = useState("")

    const [competence2_Q4_outilspratique, setCompetence2_Q4_outilspratique] = useState("")
    const [competence2_Q4_situation, setCompetence2_Q4_situation] = useState("")
    const [competence2_Q4_niveau, setCompetence2_Q4_niveau] = useState("")

    const [competence2_Q5_outilspratique, setCompetence2_Q5_outilspratique] = useState("")
    const [competence2_Q5_situation, setCompetence2_Q5_situation] = useState("")
    const [competence2_Q5_niveau, setCompetence2_Q5_niveau] = useState("")

    const [competence2_Q6_outilspratique, setCompetence2_Q6_outilspratique] = useState("")
    const [competence2_Q6_situation, setCompetence2_Q6_situation] = useState("")
    const [competence2_Q6_niveau, setCompetence2_Q6_niveau] = useState("")

    const [competence2_Q7_outilspratique, setCompetence2_Q7_outilspratique] = useState("")
    const [competence2_Q7_situation, setCompetence2_Q7_situation] = useState("")
    const [competence2_Q7_niveau, setCompetence2_Q7_niveau] = useState("")

    const [competence2_Q8_outilspratique, setCompetence2_Q8_outilspratique] = useState("")
    const [competence2_Q8_situation, setCompetence2_Q8_situation] = useState("")
    const [competence2_Q8_niveau, setCompetence2_Q8_niveau] = useState("")

    const [competence2_Q9_outilspratique, setCompetence2_Q9_outilspratique] = useState("")
    const [competence2_Q9_situation, setCompetence2_Q9_situation] = useState("")
    const [competence2_Q9_niveau, setCompetence2_Q9_niveau] = useState("")

    const [competence2_Q10_outilspratique, setCompetence2_Q10_outilspratique] = useState("")
    const [competence2_Q10_situation, setCompetence2_Q10_situation] = useState("")
    const [competence2_Q10_niveau, setCompetence2_Q10_niveau] = useState("")

    const [competence2_Q11_outilspratique, setCompetence2_Q11_outilspratique] = useState("")
    const [competence2_Q11_situation, setCompetence2_Q11_situation] = useState("")
    const [competence2_Q11_niveau, setCompetence2_Q11_niveau] = useState("")


    const [fiche13_2, setFiche13_2] = useState({})
    const [parametre, setParametre] = useState([])

    const navigate = useNavigate()

    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    async function fetchData() {
        try {
            const response = await axiosClient.get(`/fiche132?cin=${cin}`);
            const { fiche, parametre } = response.data;

            setFiche13_2(fiche);
            setParametre(parametre)

            setCompetence2_Q1_situation(fiche.competence2_Q1_situation);
            setCompetence2_Q1_outilspratique(fiche.competence2_Q1_outilspratique);
            setCompetence2_Q1_niveau(noteValeurId(fiche.competence2_Q1_niveau));

            setCompetence2_Q2_situation(fiche.competence2_Q2_situation);
            setCompetence2_Q2_outilspratique(fiche.competence2_Q2_outilspratique);
            setCompetence2_Q2_niveau(noteValeurId(fiche.competence2_Q2_niveau));

            setCompetence2_Q3_situation(fiche.competence2_Q3_situation);
            setCompetence2_Q3_outilspratique(fiche.competence2_Q3_outilspratique);
            setCompetence2_Q3_niveau(noteValeurId(fiche.competence2_Q3_niveau));

            setCompetence2_Q4_situation(fiche.competence2_Q4_situation);
            setCompetence2_Q4_outilspratique(fiche.competence2_Q4_outilspratique);
            setCompetence2_Q4_niveau(noteValeurId(fiche.competence2_Q4_niveau));

            setCompetence2_Q5_situation(fiche.competence2_Q5_situation);
            setCompetence2_Q5_outilspratique(fiche.competence2_Q5_outilspratique);
            setCompetence2_Q5_niveau(noteValeurId(fiche.competence2_Q5_niveau));

            setCompetence2_Q6_situation(fiche.competence2_Q6_situation);
            setCompetence2_Q6_outilspratique(fiche.competence2_Q6_outilspratique);
            setCompetence2_Q6_niveau(noteValeurId(fiche.competence2_Q6_niveau));

            setCompetence2_Q7_situation(fiche.competence2_Q7_situation);
            setCompetence2_Q7_outilspratique(fiche.competence2_Q7_outilspratique);
            setCompetence2_Q7_niveau(noteValeurId(fiche.competence2_Q7_niveau));

            setCompetence2_Q8_situation(fiche.competence2_Q8_situation);
            setCompetence2_Q8_outilspratique(fiche.competence2_Q8_outilspratique);
            setCompetence2_Q8_niveau(noteValeurId(fiche.competence2_Q8_niveau));

            setCompetence2_Q9_situation(fiche.competence2_Q9_situation);
            setCompetence2_Q9_outilspratique(fiche.competence2_Q9_outilspratique);
            setCompetence2_Q9_niveau(noteValeurId(fiche.competence2_Q9_niveau));

            setCompetence2_Q10_situation(fiche.competence2_Q10_situation);
            setCompetence2_Q10_outilspratique(fiche.competence2_Q10_outilspratique);
            setCompetence2_Q10_niveau(noteValeurId(fiche.competence2_Q10_niveau));

            setCompetence2_Q11_situation(fiche.competence2_Q11_situation);
            setCompetence2_Q11_outilspratique(fiche.competence2_Q11_outilspratique);
            setCompetence2_Q11_niveau(noteValeurId(fiche.competence2_Q11_niveau));

            console.log("fiche 13 : ", response);
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = {
            competence2_Q1_outilspratique,
            competence2_Q1_situation,
            competence2_Q1_niveau: noteNumber(competence2_Q1_niveau),

            competence2_Q2_outilspratique,
            competence2_Q2_situation,
            competence2_Q2_niveau: noteNumber(competence2_Q2_niveau),

            competence2_Q3_outilspratique,
            competence2_Q3_situation,
            competence2_Q3_niveau: noteNumber(competence2_Q3_niveau),

            competence2_Q4_outilspratique,
            competence2_Q4_situation,
            competence2_Q4_niveau: noteNumber(competence2_Q4_niveau),

            competence2_Q5_outilspratique,
            competence2_Q5_situation,
            competence2_Q5_niveau: noteNumber(competence2_Q5_niveau),

            competence2_Q6_outilspratique,
            competence2_Q6_situation,
            competence2_Q6_niveau: noteNumber(competence2_Q6_niveau),

            competence2_Q7_outilspratique,
            competence2_Q7_situation,
            competence2_Q7_niveau: noteNumber(competence2_Q7_niveau),

            competence2_Q8_outilspratique,
            competence2_Q8_situation,
            competence2_Q8_niveau: noteNumber(competence2_Q8_niveau),

            competence2_Q9_outilspratique,
            competence2_Q9_situation,
            competence2_Q9_niveau: noteNumber(competence2_Q9_niveau),

            competence2_Q10_outilspratique,
            competence2_Q10_situation,
            competence2_Q10_niveau: noteNumber(competence2_Q10_niveau),

            competence2_Q11_outilspratique,
            competence2_Q11_situation,
            competence2_Q11_niveau: noteNumber(competence2_Q11_niveau),

            id_competence: fiche13_2?.id,
            total_beaucoup: scoreBeaucoup,
            total_assez: scoreAssez,
            total_peu: scorePeu,
            total_rien: scoreRien,
            total

        };

        try {
            console.log('Sending data:', JSON.stringify(formData, null, 3));

            const response = await axiosClient.put(`/fiche132/${fiche13_2?.id}?cin=${cin}`, formData);

            if (response.status === 200) {
                navigate('/BDC/fiche13/competence3')
            } else {
                alert("Failed to update data.");
            }

        } catch (e) {
            console.error("Error: ", e);
            alert("An error occurred, please try again.");
        }
    }

    const [scoreBeaucoup, setScoreBeaucoup] = useState(0);
    const [scoreAssez, setScoreAssez] = useState(0);
    const [scorePeu, setScorePeu] = useState(0);
    const [scoreRien, setScoreRien] = useState(0);
    const [total, setTotal] = useState(0)

    const updateScores = () => {
        let beaucoup = 0;
        let assez = 0;
        let peu = 0;
        let rien = 0;

        const allNiveaux = [
            competence2_Q1_niveau,
            competence2_Q2_niveau,
            competence2_Q3_niveau,
            competence2_Q4_niveau,
            competence2_Q5_niveau,
            competence2_Q6_niveau,
            competence2_Q7_niveau,
            competence2_Q8_niveau,
            competence2_Q9_niveau,
            competence2_Q10_niveau,
            competence2_Q11_niveau,
        ];

        allNiveaux.forEach((niveau) => {
            switch (niveau) {
                case 3:
                    beaucoup += 1;
                    break;
                case 2:
                    assez += 1;
                    break;
                case 1:
                    peu += 1;
                    break;
                case 0:
                    rien += 1;
                    break;
                default:
                    break;
            }
        });

        setScoreBeaucoup(beaucoup);
        setScoreAssez(assez);
        setScorePeu(peu);
        setScoreRien(rien);

        const calculatedTotal = competenceTotal(beaucoup, assez, peu, rien);
        setTotal(calculatedTotal);
    };

    function competenceTotal(totalBCP, totalAssez, totalPeu) {
        return totalBCP * 3 + totalAssez * 2 + totalPeu;
    }

    useEffect(() => {
        updateScores();
    }, [
        competence2_Q1_niveau, competence2_Q2_niveau, competence2_Q3_niveau,
        competence2_Q4_niveau, competence2_Q5_niveau, competence2_Q6_niveau,
        competence2_Q7_niveau, competence2_Q8_niveau, competence2_Q9_niveau,
        competence2_Q10_niveau, competence2_Q11_niveau
    ]);


    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
            getBdc()
        } else
            getToken()
    }, [cin, token])


    const { getTraduction } = useContext(LanguageContext)
    const { bilanDC, getBdc } = useContext(BdcContext)

    return (
        <form onSubmit={handleSubmit} className='mt-6'>
            <h1 className='text-left text-xl font-semibold text-magenta'>Aptitudes athlétiques, activités de plein air et en contact avec la nature</h1>

            <table className="mt-1 w-full table-auto text-left">
                <TableHeader13Component />
                <tbody>
                    <RowComponent
                        parametre={parametre}
                        title={'Dessiner'}
                        competence_Q_niveau={competence2_Q1_niveau}
                        competence_Q_outilspratique={competence2_Q1_outilspratique}
                        competence_Q_situation={competence2_Q1_situation}
                        setCompetence_Q_niveau={setCompetence2_Q1_niveau}
                        setCompetence_Q_outilspratique={setCompetence2_Q1_outilspratique}
                        setCompetence_Q_situation={setCompetence2_Q1_situation} />
                    <RowComponent
                        parametre={parametre}
                        title={'Modeler'}
                        competence_Q_niveau={competence2_Q2_niveau}
                        competence_Q_outilspratique={competence2_Q2_outilspratique}
                        competence_Q_situation={competence2_Q2_situation}
                        setCompetence_Q_niveau={setCompetence2_Q2_niveau}
                        setCompetence_Q_outilspratique={setCompetence2_Q2_outilspratique}
                        setCompetence_Q_situation={setCompetence2_Q2_situation} />
                    <RowComponent
                        parametre={parametre}
                        title={'Créer'}
                        competence_Q_niveau={competence2_Q3_niveau}
                        competence_Q_outilspratique={competence2_Q3_outilspratique}
                        competence_Q_situation={competence2_Q3_situation}
                        setCompetence_Q_niveau={setCompetence2_Q3_niveau}
                        setCompetence_Q_outilspratique={setCompetence2_Q3_outilspratique}
                        setCompetence_Q_situation={setCompetence2_Q3_situation} />
                    <RowComponent
                        parametre={parametre}
                        title={'Construire'}
                        competence_Q_niveau={competence2_Q4_niveau}
                        competence_Q_outilspratique={competence2_Q4_outilspratique}
                        competence_Q_situation={competence2_Q4_situation}
                        setCompetence_Q_niveau={setCompetence2_Q4_niveau}
                        setCompetence_Q_outilspratique={setCompetence2_Q4_outilspratique}
                        setCompetence_Q_situation={setCompetence2_Q4_situation} />
                    <RowComponent
                        parametre={parametre}
                        title={'Manipuler'}
                        competence_Q_niveau={competence2_Q5_niveau}
                        competence_Q_outilspratique={competence2_Q5_outilspratique}
                        competence_Q_situation={competence2_Q5_situation}
                        setCompetence_Q_niveau={setCompetence2_Q5_niveau}
                        setCompetence_Q_outilspratique={setCompetence2_Q5_outilspratique}
                        setCompetence_Q_situation={setCompetence2_Q5_situation} />

                    <RowComponent
                        parametre={parametre}
                        title={'Travailler avec précision'}
                        competence_Q_niveau={competence2_Q6_niveau}
                        competence_Q_outilspratique={competence2_Q6_outilspratique}
                        competence_Q_situation={competence2_Q6_situation}
                        setCompetence_Q_niveau={setCompetence2_Q6_niveau}
                        setCompetence_Q_outilspratique={setCompetence2_Q6_outilspratique}
                        setCompetence_Q_situation={setCompetence2_Q6_situation} />
                    <RowComponent
                        parametre={parametre}
                        title={' Être rapide dans le travail manuel'}
                        competence_Q_niveau={competence2_Q7_niveau}
                        competence_Q_outilspratique={competence2_Q7_outilspratique}
                        competence_Q_situation={competence2_Q7_situation}
                        setCompetence_Q_niveau={setCompetence2_Q7_niveau}
                        setCompetence_Q_outilspratique={setCompetence2_Q7_outilspratique}
                        setCompetence_Q_situation={setCompetence2_Q7_situation} />
                    <RowComponent
                        parametre={parametre}
                        title={'Cuisiner'}
                        competence_Q_niveau={competence2_Q8_niveau}
                        competence_Q_outilspratique={competence2_Q8_outilspratique}
                        competence_Q_situation={competence2_Q8_situation}
                        setCompetence_Q_niveau={setCompetence2_Q8_niveau}
                        setCompetence_Q_outilspratique={setCompetence2_Q8_outilspratique}
                        setCompetence_Q_situation={setCompetence2_Q8_situation} />
                    <RowComponent
                        parametre={parametre}
                        title={'Couper'}
                        competence_Q_niveau={competence2_Q9_niveau}
                        competence_Q_outilspratique={competence2_Q9_outilspratique}
                        competence_Q_situation={competence2_Q9_situation}
                        setCompetence_Q_niveau={setCompetence2_Q9_niveau}
                        setCompetence_Q_outilspratique={setCompetence2_Q9_outilspratique}
                        setCompetence_Q_situation={setCompetence2_Q9_situation} />
                    <RowComponent
                        parametre={parametre}
                        title={'Coller'}
                        competence_Q_niveau={competence2_Q10_niveau}
                        competence_Q_outilspratique={competence2_Q10_outilspratique}
                        competence_Q_situation={competence2_Q10_situation}
                        setCompetence_Q_niveau={setCompetence2_Q10_niveau}
                        setCompetence_Q_outilspratique={setCompetence2_Q10_outilspratique}
                        setCompetence_Q_situation={setCompetence2_Q10_situation} />
                    <RowComponent
                        parametre={parametre}
                        title={'Réparer'}
                        competence_Q_niveau={competence2_Q11_niveau}
                        competence_Q_outilspratique={competence2_Q11_outilspratique}
                        competence_Q_situation={competence2_Q11_situation}
                        setCompetence_Q_niveau={setCompetence2_Q11_niveau}
                        setCompetence_Q_outilspratique={setCompetence2_Q11_outilspratique}
                        setCompetence_Q_situation={setCompetence2_Q11_situation} />
                </tbody>
            </table>
            {bilanDC.statusFiche13 === 'Terminé' ? <ButtonsComponent
                type="submit"
                color2="bg-gray-dark"
                titleButton2={getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
                color1="bg-magenta"
                onClick1={() => navigate('/BDC/fiche13/acquerir')}
                titleButton1={getTraduction('Synthése de la réponse', { FR: 'Synthése de la réponse', AR: 'التالي', EN: 'Next' })}
            >
            </ButtonsComponent> :
                <ButtonComponent type="submit" color="bg-magenta">
                    {getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
                </ButtonComponent>}

        </form >

    )
}
