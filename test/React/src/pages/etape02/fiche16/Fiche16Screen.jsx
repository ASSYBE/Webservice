import React, { useContext, useEffect, useState } from 'react'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { BdcContext } from '../../../contexts/BdcContext'
import axiosClient from '../../../api/axios-client'
import SubHeaderComponent from '../../../component/SubHeaderComponent'
import { Row16Component } from '../../../component/Row16Component'
import ButtonComponent from '../../../component/ButtonComponent'
import { ResponseOutput } from '../../../component/ResponseOutput'
import { ButtonsComponent } from '../../../component/ButtonsComponent'
import { TokenContext } from '../../../contexts/TokenContext'


function noteNumber(note) {
    if (note === 'niveau_1')
        return 1;
    if (note === 'niveau_2')
        return 2;
    if (note === 'niveau_3')
        return 3;
    if (note === 'niveau_4')
        return 4;
    if (note === 'niveau_5')
        return 5;

}

function noteValeurId(note) {
    if (note === 1)
        return 'niveau_1';
    if (note === 2)
        return 'niveau_2';
    if (note === 3)
        return 'niveau_3';
    if (note === 4)
        return 'niveau_4';
    if (note === 5)
        return 'niveau_5';

}

const styleActive = 'w-10 h-10 rounded-full bg-magenta flex items-center justify-center text-white font-semibold text-base scale-110 hover:scale-110 transition-all'
const styleNoActive = 'w-10 h-10 rounded-full bg-gray-light flex items-center justify-center text-black font-semibold text-base '
export const Fiche16Screen = () => {

    const { beneficier, getBeneficier, type } = useContext(BeneficierContext)
    const location = useLocation()
    const { language, getTraduction } = useContext(LanguageContext)
    const { bilanDC, getBdc } = useContext(BdcContext)

    const [page, setPage] = useState(1);
    const [fiche, setFiche] = useState({})

    const [questionnaires, setQuestionnaires] = useState({})
    const [typeQuestionnaires, setTypeQuestionnaires] = useState({})
    const [parametres, setParametres] = useState([])
    const [softskills, setSoftskills] = useState([])

    const [notesFirstHalf, setNotesFirstHalf] = useState(new Array(14).fill(null));
    const [notesSecondHalf, setNotesSecondHalf] = useState(new Array(14).fill(null));
    const [notesThirdHalf, setNotesThirdHalf] = useState(new Array(14).fill(null));
    const [seftskill, setSoftskill] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [goBack, setGoBack] = useState(false)
    const navigate = useNavigate()



    async function fetchData() {
        const response = await axiosClient.get(`/fiche16?cin=${cin}`)
        const { formattedTypeQuestions, formattedQuestions, parametres, fiche } = response.data

        setParametres(parametres);
        setTypeQuestionnaires(formattedTypeQuestions);
        setQuestionnaires(formattedQuestions)
        setFiche(fiche)

        const notesFromDatabase = fiche;
        const firstHalfNotes = [];
        const secondHalfNotes = [];
        const thirdHalfNotes = [];

        for (let i = 0; i < 14; i++) {
            firstHalfNotes.push(noteValeurId(notesFromDatabase[`noteQ${i + 1}`]));
            secondHalfNotes.push(noteValeurId(notesFromDatabase[`noteQ${i + 15}`]));
            thirdHalfNotes.push(noteValeurId(notesFromDatabase[`noteQ${i + 30}`]));

        }

        console.log("fiche : ", fiche)
        setSoftskills(fiche?.softskills)
        setNotesFirstHalf(firstHalfNotes);
        setNotesSecondHalf(secondHalfNotes);
        setNotesThirdHalf(thirdHalfNotes);
    }



    const handleNoteChange = (index, value, part) => {
        if (part === 'first') {
            const updatedNotes = [...notesFirstHalf];
            updatedNotes[index] = value;
            setNotesFirstHalf(updatedNotes);
        } else if (part === 'second') {
            const updatedNotes = [...notesSecondHalf];
            updatedNotes[index] = value;
            setNotesSecondHalf(updatedNotes);
        }
        else {
            const updatedNotes = [...notesThirdHalf];
            updatedNotes[index] = value;
            setNotesThirdHalf(updatedNotes);
        }
    }

    async function handleSubmit() {
        const allNotes = [
            ...notesFirstHalf.map((note, index) => ({
                [`noteQ${index + 1}`]: noteNumber(note),
                [`valeur_id_NoteQ${index + 1}`]: questionnaires?.[`question${index + 1}`]?.valeur_id,
            })),
            ...notesSecondHalf.map((note, index) => ({
                [`noteQ${index + 15}`]: noteNumber(note),
                [`valeur_id_NoteQ${index + 15}`]: questionnaires?.[`question${index + 15}`]?.valeur_id,
            })),
            ...notesThirdHalf.map((note, index) => ({
                [`noteQ${index + 30}`]: noteNumber(note),
                [`valeur_id_NoteQ${index + 30}`]: questionnaires?.[`question${index + 30}`]?.valeur_id,
            })),
        ];

        const allNotesObj = allNotes.reduce((acc, curr) => ({ ...acc, ...curr }), {});

        const formData = { ...allNotesObj };
        try {

            const response = await axiosClient.put(`/fiche16/${fiche?.id}?cin=${cin}`, formData);
            console.log('Form submitted successfully:', JSON.stringify(formData, null, 3));
            navigate('/BDC/fiche16/softskill')

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    const nextPage = () => {
        setPage(page + 1);
    };

    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
            getBdc()
        } else
            getToken()
    }, [cin, token, setFiche])

    return (
        <>

            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={`Les soft skills`}
                buttonVName="Oui"
                buttonCName="Non"
            />
            <ResponseOutput
                isOpen={goBack}
                handleSubmit={() => setPage(1)}
                closePopup={() => setGoBack(false)}
                title={`Les soft skills`}
                message={`Voulez-vous revenir à la première page sans enregistrer vos modifications ?`}
                buttonVName="Oui"
                buttonCName="Non"
            />

            <div className='w-full flex justify-center items-center px-4 space-x-6'>

                <div
                    className={(page === 1) ? styleActive : styleNoActive}
                >
                    1
                </div>
                <div
                    className={page === 2 ? styleActive : styleNoActive}
                >
                    2
                </div>
                <div
                    className={page === 3 ? styleActive : styleNoActive}
                >
                    3
                </div>
            </div>
            <form className="mt-6">

                <table className="mt-4 w-full table-auto text-left">
                    <thead className="bg-magenta ">
                        <tr className='border-2 border-magenta'>
                            <th className="border-r border-white p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Description
                                </p>
                            </th>

                            <th className=" p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Degré d'importance
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {page === 1 && Array.from({ length: 14 }).map((_, index) => (
                            <Row16Component
                                key={index}
                                note={notesFirstHalf[index]}
                                setNote={(value) => handleNoteChange(index, value, 'first')}
                                question={questionnaires?.[`question${index + 1}`]}
                                typeQuestion={typeQuestionnaires?.[`question${index + 1}`]}
                                interets={parametres}
                                color={'bg-gray-light'}
                            />
                        ))}
                        {page === 2 && Array.from({ length: 14 }).map((_, index) => (
                            <Row16Component
                                key={index + 14}
                                note={notesSecondHalf[index]}
                                setNote={(value) => handleNoteChange(index, value, 'second')}
                                question={questionnaires?.[`question${index + 15}`]}
                                typeQuestion={typeQuestionnaires?.[`question${index + 15}`]}
                                interets={parametres}
                                color={'bg-gray-light'}
                            />
                        ))}
                        {page === 3 && Array.from({ length: 14 }).map((_, index) => (
                            <Row16Component
                                key={index + 28}
                                note={notesThirdHalf[index]}
                                setNote={(value) => handleNoteChange(index, value, 'third')}
                                question={questionnaires?.[`question${index + 30}`]}
                                typeQuestion={typeQuestionnaires?.[`question${index + 30}`]}
                                interets={parametres}
                                color={'bg-gray-light'}
                            />))

                        }
                    </tbody>
                </table>

            </form>
            {page !== 3 ? (
                bilanDC?.statusFiche16 === 'Terminé' ? <ButtonsComponent
                    type="button"
                    color2="bg-gray-dark"
                    onClick2={nextPage}
                    titleButton2={getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
                    color1="bg-magenta"
                    onClick1={() => navigate('/BDC/fiche16/softskill')}
                    titleButton1={getTraduction('Synthése de la réponse', { FR: 'Synthése de la réponse', AR: 'التالي', EN: 'Next' })}
                >
                </ButtonsComponent> :
                    <ButtonComponent type="button" onClick={nextPage} color="bg-magenta">
                        {getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
                    </ButtonComponent>
            ) : (
                <ButtonsComponent
                    type="button"
                    color1="bg-gray-dark"
                    onClick1={() => setGoBack(true)}
                    titleButton1={getTraduction('revenir', { FR: 'Revenir', AR: 'التالي', EN: 'Next' })}
                    color2="bg-magenta"
                    onClick2={() => setIsOpen(true)}
                    titleButton2={getTraduction('Enregistrer', { FR: 'Enregistrer', AR: 'التالي', EN: 'Next' })}
                >
                </ButtonsComponent>
            )}
        </>
    )
}
