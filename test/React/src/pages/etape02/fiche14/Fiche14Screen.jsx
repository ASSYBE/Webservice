import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import SubHeaderComponent from '../../../component/SubHeaderComponent'
import { FreeButton } from '../../../component/FreeButton'
import { RowComponent } from '../../../component/RowComponent'
import ButtonComponent from '../../../component/ButtonComponent'
import axiosClient from '../../../api/axios-client'
import { Row14Component } from '../../../component/Row14Component'
import { FicheReponse } from './FicheReponse'
import { ResponseOutput } from '../../../component/ResponseOutput'
import { ButtonsComponent } from '../../../component/ButtonsComponent'
import { BdcContext } from '../../../contexts/BdcContext'
import { anapecRole } from '../../../constants/Variables'
import { TokenContext } from '../../../contexts/TokenContext'
import { NotFound } from '../../../screens/NotFound'

function noteNumber(note) {
    if (note === 'fiche14_1')
        return 0;
    if (note === 'fiche14_2')
        return 1;
    if (note === 'fiche14_3')
        return 2;
    if (note === 'fiche14_4')
        return 3;

}
function noteValeurId(note) {
    if (note === 0)
        return 'fiche14_1';
    if (note === 1)
        return 'fiche14_2';
    if (note === 2)
        return 'fiche14_3';
    if (note === 3)
        return 'fiche14_4';

}

const styleActive = 'w-10 h-10 rounded-full bg-magenta flex items-center justify-center text-white font-semibold text-base scale-110 hover:scale-110 transition-all'
const styleNoActive = 'w-10 h-10 rounded-full bg-gray-light flex items-center justify-center text-black font-semibold text-base '

export const Fiche14Screen = () => {
    const date = new Date()
    const [interets, setInterets] = useState([])
    const [questionnaires, setQuestionnaires] = useState({})
    const [page, setPage] = useState(1);
    const [fiche, setFiche] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [goBack, setGoBack] = useState(false)

    const [notesFirstHalf, setNotesFirstHalf] = useState(new Array(14).fill(null));
    const [notesSecondHalf, setNotesSecondHalf] = useState(new Array(14).fill(null));
    const [notesThirdHalf, setNotesThirdHalf] = useState(new Array(14).fill(null));
    const [notesFourthHalf, setNotesFourthHalf] = useState(new Array(14).fill(null));
    const [notesFifthHalf, setNotesFifthHalf] = useState(new Array(14).fill(null));
    const { bilanDC, getBdc } = useContext(BdcContext)


    const { beneficier, getBeneficier, type } = useContext(BeneficierContext)
    const { language, getTraduction } = useContext(LanguageContext)
    const navigate = useNavigate()

    async function fetchData() {
        const response = await axiosClient.get(`/fiche14?cin=${cin}`)
        const { parametre, formattedQuestions, fiche } = response.data

        setInterets(parametre);
        setQuestionnaires(formattedQuestions)
        setFiche(fiche)
        const notesFromDatabase = fiche;
        const firstHalfNotes = [];
        const secondHalfNotes = [];
        const thirdHalfNotes = [];
        const fourthHalfNotes = [];
        const fifthHalfNotes = [];

        for (let i = 0; i < 14; i++) {
            firstHalfNotes.push(noteValeurId(notesFromDatabase[`noteQ${i + 1}`]));
            secondHalfNotes.push(noteValeurId(notesFromDatabase[`noteQ${i + 15}`]));
            thirdHalfNotes.push(noteValeurId(notesFromDatabase[`noteQ${i + 29}`]));
            fourthHalfNotes.push(noteValeurId(notesFromDatabase[`noteQ${i + 43}`]));
            fifthHalfNotes.push(noteValeurId(notesFromDatabase[`noteQ${i + 57}`]));
        }

        setNotesFirstHalf(firstHalfNotes);
        setNotesSecondHalf(secondHalfNotes);
        setNotesThirdHalf(thirdHalfNotes);
        setNotesFourthHalf(fourthHalfNotes);
        setNotesFifthHalf(fifthHalfNotes);

    }
    const handleNoteChange = (index, value, part) => {
        if (part === 'first') {
            const updatedNotes = [...notesFirstHalf];
            updatedNotes[index] = value;
            setNotesFirstHalf(updatedNotes);
        }
        if (part === 'second') {
            const updatedNotes = [...notesSecondHalf];
            updatedNotes[index] = value;
            setNotesSecondHalf(updatedNotes);
        }
        if (part === 'third') {
            const updatedNotes = [...notesThirdHalf];
            updatedNotes[index] = value;
            setNotesThirdHalf(updatedNotes);
        }
        if (part === 'fourth') {
            const updatedNotes = [...notesFourthHalf];
            updatedNotes[index] = value;
            setNotesFourthHalf(updatedNotes);
        }
        if (part === 'fifth') {
            const updatedNotes = [...notesFifthHalf];
            updatedNotes[index] = value;
            setNotesFifthHalf(updatedNotes);
        }
    }


    async function handleSubmit() {

        try {
            const allNotes = [
                ...notesFirstHalf.map((note, index) => ({
                    [`noteQ${index + 1}`]: noteNumber(note),
                })),
                ...notesSecondHalf.map((note, index) => ({
                    [`noteQ${index + 15}`]: noteNumber(note),
                })),
                ...notesThirdHalf.map((note, index) => ({
                    [`noteQ${index + 29}`]: noteNumber(note),
                })),
                ...notesFourthHalf.map((note, index) => ({
                    [`noteQ${index + 43}`]: noteNumber(note),
                })),
                ...notesFifthHalf.map((note, index) => ({
                    [`noteQ${index + 57}`]: noteNumber(note),
                })),
            ];

            console.log('Form submitted successfully99:', JSON.stringify(notesFifthHalf, null, 3));

            const formData = allNotes.reduce((acc, curr) => ({ ...acc, ...curr }), {});


            if (page == 5) {
                role == anapecRole ?
                    navigate('/BDC/fiche14/ficheReponse')
                    : navigate('/BDC/fiche14/graph')
            }
            console.log(`fromData all : `, notesFifthHalf)
            console.log(`fromData all : `, formData)

            const response = await axiosClient.put(`/fiche14/${fiche.id}?cin=${cin}`, formData);

            console.log("message :", response.data.message);

        } catch (error) {
            console.error("message :", response.data.message);
        }
    }
    const nextPage = () => {
        setPage(page + 1);
    };


    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    useEffect(() => {
        getToken()
        const fetchData2 = async () => {
            await fetchData();
            await getBdc()
        }
        fetchData2()
    }, [cin, token]);

    if (!cin || !token) {
        return (
            <NotFound />
        )
    }


    return (
        <div>
            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={`Les Intérêts`}
                buttonVName="Oui"
                buttonCName="Non"
            />
            <ResponseOutput
                isOpen={goBack}
                handleSubmit={() => setPage(1)}
                closePopup={() => setGoBack(false)}
                title={`Les Intérêts`}
                message={`Voulez-vous revenir à la première page sans enregistrer vos modifications ?`}
                buttonVName="Oui"
                buttonCName="Non"
            />
            <div className='w-full flex justify-center items-center px-4 space-x-6'>

                <div
                    className={(location.pathname === "/BDC/fiche14" && page === 1) ? styleActive : styleNoActive}
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
                <div
                    className={page === 4 ? styleActive : styleNoActive}
                >
                    4
                </div>
                <div
                    className={page === 5 ? styleActive : styleNoActive}
                >
                    5
                </div>
            </div>
            <form className="mt-6" >
                <table className="mt-4 w-full table-auto text-left">
                    <thead className="bg-magenta ">
                        <tr className='border-2 border-magenta'>
                            <th className="border-r border-white p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Questionnaires
                                </p>
                            </th>

                            <th className="p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Niveau d'intérêt
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {page === 1 && Array.from({ length: 14 }).map((_, index) => (
                            <Row14Component
                                key={index}
                                note={notesFirstHalf[index]}
                                setNote={(value) => handleNoteChange(index, value, 'first')}
                                question={questionnaires?.[`question${index + 1}`]}
                                interets={interets}
                                color={'bg-gray-light'}
                            />
                        ))}
                        {page === 2 && Array.from({ length: 14 }).map((_, index) => (
                            <Row14Component
                                key={index + 14}
                                note={notesSecondHalf[index]}
                                setNote={(value) => handleNoteChange(index, value, 'second')}
                                question={questionnaires?.[`question${index + 15}`]}
                                interets={interets}
                                color={'bg-gray-light'}
                            />
                        ))}
                        {page === 3 && Array.from({ length: 14 }).map((_, index) => (
                            <Row14Component
                                key={index + 28}
                                note={notesThirdHalf[index]}
                                setNote={(value) => handleNoteChange(index, value, 'third')}
                                question={questionnaires?.[`question${index + 29}`]}
                                interets={interets}
                                color={'bg-gray-light'}
                            />
                        ))}
                        {page === 4 && Array.from({ length: 14 }).map((_, index) => (
                            <Row14Component
                                key={index + 42}
                                note={notesFourthHalf[index]}
                                setNote={(value) => handleNoteChange(index, value, 'fourth')}
                                question={questionnaires?.[`question${index + 43}`]}
                                interets={interets}
                                color={'bg-gray-light'}
                            />
                        ))}
                        {page === 5 && Array.from({ length: 14 }).map((_, index) => (
                            <Row14Component
                                key={index + 56}
                                note={notesFifthHalf[index]}
                                setNote={(value) => handleNoteChange(index, value, 'fifth')}
                                question={questionnaires?.[`question${index + 57}`]}
                                interets={interets}
                                color={'bg-gray-light'}
                            />
                        ))}

                    </tbody>
                </table>

            </form>
            {page !== 5 ? (
                bilanDC?.statusFiche14 === 'Terminé' ? <ButtonsComponent
                    type="button"
                    color2="bg-gray-dark"
                    onClick2={nextPage}
                    titleButton2={getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
                    color1="bg-magenta"
                    onClick1={() => { role === anapecRole ? navigate('/BDC/fiche14/ficheReponse') : navigate('/BDC/fiche14/graph') }}
                    titleButton1={role === anapecRole ? getTraduction('Synthése de la réponse', { FR: 'Synthése de la réponse', AR: 'التالي', EN: 'Next' }) : getTraduction('profil graphique', { FR: 'Profil graphique', AR: 'التالي', EN: 'Next' })}
                >
                </ButtonsComponent> :
                    <ButtonComponent type="button" onClick={nextPage} color="bg-magenta">
                        {getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
                    </ButtonComponent>) :

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
            }
        </div>

    )
}
