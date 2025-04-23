import React, { useContext, useEffect, useState } from 'react'
import ButtonComponent from '../../../component/ButtonComponent'
import { LanguageContext } from '../../../contexts/LanguageContext'
import axiosClient from '../../../api/axios-client'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { RowComponent } from '../../../component/RowComponent'
import { useNavigate } from 'react-router-dom'
import { BdcContext } from '../../../contexts/BdcContext'
import { TableHeader13Component } from '../../../component/TableHeader13Component'
import { ButtonsComponent } from '../../../component/ButtonsComponent'
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
export default function Fiche13_1() {

    const [competence1_Q1_outilspratique, setCompetence1_Q1_outilspratique] = useState("")
    const [competence1_Q1_situation, setCompetence1_Q1_situation] = useState("")
    const [competence1_Q1_niveau, setCompetence1_Q1_niveau] = useState()

    const [competence1_Q2_outilspratique, setCompetence1_Q2_outilspratique] = useState("")
    const [competence1_Q2_situation, setCompetence1_Q2_situation] = useState("")
    const [competence1_Q2_niveau, setCompetence1_Q2_niveau] = useState()

    const [competence1_Q3_outilspratique, setCompetence1_Q3_outilspratique] = useState("")
    const [competence1_Q3_situation, setCompetence1_Q3_situation] = useState("")
    const [competence1_Q3_niveau, setCompetence1_Q3_niveau] = useState()

    const [competence1_Q4_outilspratique, setCompetence1_Q4_outilspratique] = useState("")
    const [competence1_Q4_situation, setCompetence1_Q4_situation] = useState("")
    const [competence1_Q4_niveau, setCompetence1_Q4_niveau] = useState()

    const [competence1_Q5_outilspratique, setCompetence1_Q5_outilspratique] = useState("")
    const [competence1_Q5_situation, setCompetence1_Q5_situation] = useState("")
    const [competence1_Q5_niveau, setCompetence1_Q5_niveau] = useState()

    const [competence1_Q6_outilspratique, setCompetence1_Q6_outilspratique] = useState("")
    const [competence1_Q6_situation, setCompetence1_Q6_situation] = useState("")
    const [competence1_Q6_niveau, setCompetence1_Q6_niveau] = useState()

    const [competence1_Q7_outilspratique, setCompetence1_Q7_outilspratique] = useState("")
    const [competence1_Q7_situation, setCompetence1_Q7_situation] = useState("")
    const [competence1_Q7_niveau, setCompetence1_Q7_niveau] = useState()

    const [competence1_Q8_outilspratique, setCompetence1_Q8_outilspratique] = useState("")
    const [competence1_Q8_situation, setCompetence1_Q8_situation] = useState("")
    const [competence1_Q8_niveau, setCompetence1_Q8_niveau] = useState()

    const [competence1_Q9_outilspratique, setCompetence1_Q9_outilspratique] = useState("")
    const [competence1_Q9_situation, setCompetence1_Q9_situation] = useState("")
    const [competence1_Q9_niveau, setCompetence1_Q9_niveau] = useState()

    const [competence1_Q10_outilspratique, setCompetence1_Q10_outilspratique] = useState("")
    const [competence1_Q10_situation, setCompetence1_Q10_situation] = useState("")
    const [competence1_Q10_niveau, setCompetence1_Q10_niveau] = useState()

    const [competence1_Q11_outilspratique, setCompetence1_Q11_outilspratique] = useState("")
    const [competence1_Q11_situation, setCompetence1_Q11_situation] = useState("")
    const [competence1_Q11_niveau, setCompetence1_Q11_niveau] = useState()

    const [parametre, setParametre] = useState([])

    const [fiche13_1, setFiche13_1] = useState({})

    const navigate = useNavigate()

    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { bilanDC, getBdc } = useContext(BdcContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    async function fetchData() {
        try {
            const response = await axiosClient.get(`/fiche131?cin=${cin}`);
            const { fiche, parametre } = response.data;

            setFiche13_1(fiche);
            setParametre(parametre)

            setCompetence1_Q1_situation(fiche.competence1_Q1_situation);
            setCompetence1_Q1_outilspratique(fiche.competence1_Q1_outilspratique);
            setCompetence1_Q1_niveau(noteValeurId(fiche.competence1_Q1_niveau));

            setCompetence1_Q2_situation(fiche.competence1_Q2_situation);
            setCompetence1_Q2_outilspratique(fiche.competence1_Q2_outilspratique);
            setCompetence1_Q2_niveau(noteValeurId(fiche.competence1_Q2_niveau));

            setCompetence1_Q3_situation(fiche.competence1_Q3_situation);
            setCompetence1_Q3_outilspratique(fiche.competence1_Q3_outilspratique);
            setCompetence1_Q3_niveau(noteValeurId(fiche.competence1_Q3_niveau));

            setCompetence1_Q4_situation(fiche.competence1_Q4_situation);
            setCompetence1_Q4_outilspratique(fiche.competence1_Q4_outilspratique);
            setCompetence1_Q4_niveau(noteValeurId(fiche.competence1_Q4_niveau));

            setCompetence1_Q5_situation(fiche.competence1_Q5_situation);
            setCompetence1_Q5_outilspratique(fiche.competence1_Q5_outilspratique);
            setCompetence1_Q5_niveau(noteValeurId(fiche.competence1_Q5_niveau));

            setCompetence1_Q6_situation(fiche.competence1_Q6_situation);
            setCompetence1_Q6_outilspratique(fiche.competence1_Q6_outilspratique);
            setCompetence1_Q6_niveau(noteValeurId(fiche.competence1_Q6_niveau));

            setCompetence1_Q7_situation(fiche.competence1_Q7_situation);
            setCompetence1_Q7_outilspratique(fiche.competence1_Q7_outilspratique);
            setCompetence1_Q7_niveau(noteValeurId(fiche.competence1_Q7_niveau));

            setCompetence1_Q8_situation(fiche.competence1_Q8_situation);
            setCompetence1_Q8_outilspratique(fiche.competence1_Q8_outilspratique);
            setCompetence1_Q8_niveau(noteValeurId(fiche.competence1_Q8_niveau));

            setCompetence1_Q9_situation(fiche.competence1_Q9_situation);
            setCompetence1_Q9_outilspratique(fiche.competence1_Q9_outilspratique);
            setCompetence1_Q9_niveau(noteValeurId(fiche.competence1_Q9_niveau));

            setCompetence1_Q10_situation(fiche.competence1_Q10_situation);
            setCompetence1_Q10_outilspratique(fiche.competence1_Q10_outilspratique);
            setCompetence1_Q10_niveau(noteValeurId(fiche.competence1_Q10_niveau));

            setCompetence1_Q11_situation(fiche.competence1_Q11_situation);
            setCompetence1_Q11_outilspratique(fiche.competence1_Q11_outilspratique);
            setCompetence1_Q11_niveau(noteValeurId(fiche.competence1_Q11_niveau));

            console.log("fiche 13 : ", response);
        } catch (error) {
            console.log("Error fetching data: ", error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            competence1_Q1_outilspratique,
            competence1_Q1_situation,
            competence1_Q1_niveau: noteNumber(competence1_Q1_niveau),

            competence1_Q2_outilspratique,
            competence1_Q2_situation,
            competence1_Q2_niveau: noteNumber(competence1_Q2_niveau),

            competence1_Q3_outilspratique,
            competence1_Q3_situation,
            competence1_Q3_niveau: noteNumber(competence1_Q3_niveau),

            competence1_Q4_outilspratique,
            competence1_Q4_situation,
            competence1_Q4_niveau: noteNumber(competence1_Q4_niveau),

            competence1_Q5_outilspratique,
            competence1_Q5_situation,
            competence1_Q5_niveau: noteNumber(competence1_Q5_niveau),

            competence1_Q6_outilspratique,
            competence1_Q6_situation,
            competence1_Q6_niveau: noteNumber(competence1_Q6_niveau),

            competence1_Q7_outilspratique,
            competence1_Q7_situation,
            competence1_Q7_niveau: noteNumber(competence1_Q7_niveau),

            competence1_Q8_outilspratique,
            competence1_Q8_situation,
            competence1_Q8_niveau: noteNumber(competence1_Q8_niveau),

            competence1_Q9_outilspratique,
            competence1_Q9_situation,
            competence1_Q9_niveau: noteNumber(competence1_Q9_niveau),

            competence1_Q10_outilspratique,
            competence1_Q10_situation,
            competence1_Q10_niveau: noteNumber(competence1_Q10_niveau),

            competence1_Q11_outilspratique,
            competence1_Q11_situation,
            competence1_Q11_niveau: noteNumber(competence1_Q11_niveau),

            id_competence: fiche13_1?.id,
            total_beaucoup: scoreBeaucoup,
            total_assez: scoreAssez,
            total_peu: scorePeu,
            total_rien: scoreRien,
            total

        };

        try {
            console.log('Sending data:', JSON.stringify(formData, null, 3));

            const response = await axiosClient.put(`/fiche131/${fiche13_1?.id}?cin=${cin}`, formData);

            if (response.status === 200) {
                navigate('/BDC/fiche13/competence2')
            } else {
                alert("Failed to update data.");
            }

        } catch (e) {
            console.error("Error: ", e);
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
            noteNumber(competence1_Q1_niveau),
            noteNumber(competence1_Q2_niveau),
            noteNumber(competence1_Q3_niveau),
            noteNumber(competence1_Q4_niveau),
            noteNumber(competence1_Q5_niveau),
            noteNumber(competence1_Q6_niveau),
            noteNumber(competence1_Q7_niveau),
            noteNumber(competence1_Q8_niveau),
            noteNumber(competence1_Q9_niveau),
            noteNumber(competence1_Q10_niveau),
            noteNumber(competence1_Q11_niveau),
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

    useEffect(() => {
        updateScores();
    }, [
        competence1_Q1_niveau, competence1_Q2_niveau, competence1_Q3_niveau,
        competence1_Q4_niveau, competence1_Q5_niveau, competence1_Q6_niveau,
        competence1_Q7_niveau, competence1_Q8_niveau, competence1_Q9_niveau,
        competence1_Q10_niveau, competence1_Q11_niveau
    ]);

    function competenceTotal(totalBCP, totalAssez, totalPeu) {
        return totalBCP * 3 + totalAssez * 2 + totalPeu;
    }

    useEffect(() => {
        if (cin && token) {
            fetchData()
            getBdc()
        } else
            getToken()
    }, [cin, token])

    const { getTraduction } = useContext(LanguageContext)
    return (

        <form onSubmit={handleSubmit} className='mt-6'>
            <h1 className='text-left text-xl font-semibold text-magenta'> Compétences manuelles</h1>

            <table className="mt-1 w-full table-auto text-left">
                <TableHeader13Component />
                <tbody>
                    <RowComponent
                        title={'Dessiner'}
                        competence_Q_niveau={competence1_Q1_niveau}
                        parametre={parametre}
                        competence_Q_outilspratique={competence1_Q1_outilspratique}
                        competence_Q_situation={competence1_Q1_situation}
                        setCompetence_Q_niveau={setCompetence1_Q1_niveau}
                        setCompetence_Q_outilspratique={setCompetence1_Q1_outilspratique}
                        setCompetence_Q_situation={setCompetence1_Q1_situation} />
                    <RowComponent
                        title={'Modeler'}
                        competence_Q_niveau={competence1_Q2_niveau}
                        parametre={parametre}
                        competence_Q_outilspratique={competence1_Q2_outilspratique}
                        competence_Q_situation={competence1_Q2_situation}
                        setCompetence_Q_niveau={setCompetence1_Q2_niveau}
                        setCompetence_Q_outilspratique={setCompetence1_Q2_outilspratique}
                        setCompetence_Q_situation={setCompetence1_Q2_situation} />
                    <RowComponent
                        title={'Créer'}
                        competence_Q_niveau={competence1_Q3_niveau}
                        parametre={parametre}
                        competence_Q_outilspratique={competence1_Q3_outilspratique}
                        competence_Q_situation={competence1_Q3_situation}
                        setCompetence_Q_niveau={setCompetence1_Q3_niveau}
                        setCompetence_Q_outilspratique={setCompetence1_Q3_outilspratique}
                        setCompetence_Q_situation={setCompetence1_Q3_situation} />
                    <RowComponent
                        title={'Construire'}
                        competence_Q_niveau={competence1_Q4_niveau}
                        parametre={parametre}
                        competence_Q_outilspratique={competence1_Q4_outilspratique}
                        competence_Q_situation={competence1_Q4_situation}
                        setCompetence_Q_niveau={setCompetence1_Q4_niveau}
                        setCompetence_Q_outilspratique={setCompetence1_Q4_outilspratique}
                        setCompetence_Q_situation={setCompetence1_Q4_situation} />
                    <RowComponent
                        title={'Manipuler'}
                        competence_Q_niveau={competence1_Q5_niveau}
                        parametre={parametre}
                        competence_Q_outilspratique={competence1_Q5_outilspratique}
                        competence_Q_situation={competence1_Q5_situation}
                        setCompetence_Q_niveau={setCompetence1_Q5_niveau}
                        setCompetence_Q_outilspratique={setCompetence1_Q5_outilspratique}
                        setCompetence_Q_situation={setCompetence1_Q5_situation} />

                    <RowComponent
                        title={'Travailler avec précision'}
                        competence_Q_niveau={competence1_Q6_niveau}
                        parametre={parametre}
                        competence_Q_outilspratique={competence1_Q6_outilspratique}
                        competence_Q_situation={competence1_Q6_situation}
                        setCompetence_Q_niveau={setCompetence1_Q6_niveau}
                        setCompetence_Q_outilspratique={setCompetence1_Q6_outilspratique}
                        setCompetence_Q_situation={setCompetence1_Q6_situation} />
                    <RowComponent
                        title={' Être rapide dans le travail manuel'}
                        competence_Q_niveau={competence1_Q7_niveau}
                        parametre={parametre}
                        competence_Q_outilspratique={competence1_Q7_outilspratique}
                        competence_Q_situation={competence1_Q7_situation}
                        setCompetence_Q_niveau={setCompetence1_Q7_niveau}
                        setCompetence_Q_outilspratique={setCompetence1_Q7_outilspratique}
                        setCompetence_Q_situation={setCompetence1_Q7_situation} />
                    <RowComponent
                        title={'Cuisiner'}
                        competence_Q_niveau={competence1_Q8_niveau}
                        parametre={parametre}
                        competence_Q_outilspratique={competence1_Q8_outilspratique}
                        competence_Q_situation={competence1_Q8_situation}
                        setCompetence_Q_niveau={setCompetence1_Q8_niveau}
                        setCompetence_Q_outilspratique={setCompetence1_Q8_outilspratique}
                        setCompetence_Q_situation={setCompetence1_Q8_situation} />
                    <RowComponent
                        title={'Couper'}
                        competence_Q_niveau={competence1_Q9_niveau}
                        parametre={parametre}
                        competence_Q_outilspratique={competence1_Q9_outilspratique}
                        competence_Q_situation={competence1_Q9_situation}
                        setCompetence_Q_niveau={setCompetence1_Q9_niveau}
                        setCompetence_Q_outilspratique={setCompetence1_Q9_outilspratique}
                        setCompetence_Q_situation={setCompetence1_Q9_situation} />
                    <RowComponent
                        title={'Coller'}
                        competence_Q_niveau={competence1_Q10_niveau}
                        parametre={parametre}
                        competence_Q_outilspratique={competence1_Q10_outilspratique}
                        competence_Q_situation={competence1_Q10_situation}
                        setCompetence_Q_niveau={setCompetence1_Q10_niveau}
                        setCompetence_Q_outilspratique={setCompetence1_Q10_outilspratique}
                        setCompetence_Q_situation={setCompetence1_Q10_situation} />
                    <RowComponent
                        title={'Réparer'}
                        competence_Q_niveau={competence1_Q11_niveau}
                        parametre={parametre}
                        competence_Q_outilspratique={competence1_Q11_outilspratique}
                        competence_Q_situation={competence1_Q11_situation}
                        setCompetence_Q_niveau={setCompetence1_Q11_niveau}
                        setCompetence_Q_outilspratique={setCompetence1_Q11_outilspratique}
                        setCompetence_Q_situation={setCompetence1_Q11_situation} />
                </tbody>
            </table>
            {bilanDC?.statusFiche13 === 'Terminé' ? <ButtonsComponent
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
