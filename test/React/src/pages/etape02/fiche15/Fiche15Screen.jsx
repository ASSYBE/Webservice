import React, { useContext, useEffect, useState } from 'react'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { BdcContext } from '../../../contexts/BdcContext'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonComponent from '../../../component/ButtonComponent'
import SubHeaderComponent from '../../../component/SubHeaderComponent'
import { Row14Component } from '../../../component/Row14Component'
import axiosClient from '../../../api/axios-client'
import { Row15Component } from '../../../component/Row15Component'
import { ResponseOutput } from '../../../component/ResponseOutput'
import { ButtonsComponent } from '../../../component/ButtonsComponent'
import { TokenContext } from '../../../contexts/TokenContext'


function noteNumber(note) {
    if (note === 'degre_importance_1')
        return 0;
    if (note === 'degre_importance_2')
        return 1;
    if (note === 'degre_importance_3')
        return 2;
    if (note === 'degre_importance_4')
        return 3;
    if (note === 'degre_importance_5')
        return 4;

}

function noteValeurId(note) {
    if (note === 0)
        return 'degre_importance_1';
    if (note === 1)
        return 'degre_importance_2';
    if (note === 2)
        return 'degre_importance_3';
    if (note === 3)
        return 'degre_importance_4';
    if (note === 4)
        return 'degre_importance_5';

}

const styleActive = 'w-10 h-10 rounded-full bg-magenta flex items-center justify-center text-white font-semibold text-base scale-110 hover:scale-110 transition-all'
const styleNoActive = 'w-10 h-10 rounded-full bg-gray-light flex items-center justify-center text-black font-semibold text-base '
export const Fiche15Screen = () => {

    const date = new Date()
    const location = useLocation()
    const { beneficier, getBeneficier, type } = useContext(BeneficierContext)
    const { language, getTraduction } = useContext(LanguageContext)
    const { bilanDC, getBdc } = useContext(BdcContext)
    const navigate = useNavigate()

    const [page, setPage] = useState(1);
    const [fiche, setFiche] = useState({})

    const [questionnaires, setQuestionnaires] = useState({})
    const [typeQuestionnaires, setTypeQuestionnaires] = useState({})
    const [parametres, setParametres] = useState([])

    const [notesFirstHalf, setNotesFirstHalf] = useState(new Array(18).fill(null));
    const [notesSecondHalf, setNotesSecondHalf] = useState(new Array(18).fill(null));

    const [isOpen, setIsOpen] = useState(false)
    const [goBack, setGoBack] = useState(false)


    const [invalidFields, setInvalidFields] = useState({
        first: new Array(18).fill(false),
        second: new Array(18).fill(false),
    });


    async function fetchData() {
        const response = await axiosClient.get(`/fiche15?cin=${cin}`)
        const { formattedTypeQuestions, formattedQuestions, parametres, fiche } = response.data

        setParametres(parametres);
        setTypeQuestionnaires(formattedTypeQuestions);
        setQuestionnaires(formattedQuestions)
        setFiche(fiche)

        const notesFromDatabase = fiche;
        const firstHalfNotes = [];
        const secondHalfNotes = [];

        for (let i = 0; i < 18; i++) {
            firstHalfNotes.push(noteValeurId(notesFromDatabase[`noteQ${i + 1}`]));
            secondHalfNotes.push(noteValeurId(notesFromDatabase[`noteQ${i + 19}`]));
        }

        setNotesFirstHalf(firstHalfNotes);
        setNotesSecondHalf(secondHalfNotes);
    }

    const handleNoteChange = (index, value, part) => {
        if (part === 'first') {
            const updatedNotes = [...notesFirstHalf];
            updatedNotes[index] = value;
            setNotesFirstHalf(updatedNotes);
        } else {
            const updatedNotes = [...notesSecondHalf];
            updatedNotes[index] = value;
            setNotesSecondHalf(updatedNotes);
        }
    }

    const handleSubmit = async () => {

        const allNotes = [
            ...notesFirstHalf.map((note, index) => ({
                [`noteQ${index + 1}`]: noteNumber(note),
                [`valeur_id_NoteQ${index + 1}`]: typeQuestionnaires?.[`question${index + 1}`].valeur_id,
            })),
            ...notesSecondHalf.map((note, index) => ({
                [`noteQ${index + 19}`]: noteNumber(note),
                [`valeur_id_NoteQ${index + 19}`]: typeQuestionnaires?.[`question${index + 19}`].valeur_id,
            })),
        ];

        const formData = allNotes.reduce((acc, curr) => ({ ...acc, ...curr }), {});

        try {
            const response = await axiosClient.put(`/fiche15/${fiche?.id}?cin=${cin}`, formData);
            console.log('Form submitted successfully:', JSON.stringify(formData, null, 3));

            navigate('/BDC/fiche15/ficheReponse')
            setNotesFirstHalf(new Array(18).fill());
            setNotesSecondHalf(new Array(18).fill());
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    const nextPage = () => {
        setPage(page + 1);
    };

    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token && nomAgent) {
            fetchData()
            getBdc()
        } else
            getToken()
    }, [cin, token, nomAgent])
    return (
        < >
            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={`Liste des valeurs professionnelles`}
                buttonVName="Oui"
                buttonCName="Non"
            />
            <ResponseOutput
                isOpen={goBack}
                handleSubmit={() => setPage(1)}
                closePopup={() => setGoBack(false)}
                title={`Liste des valeurs professionnelles`}
                message={`Voulez-vous revenir à la première page sans enregistrer vos modifications ?`}
                buttonVName="Oui"
                buttonCName="Non"
            />

            <div className='w-full flex justify-center items-center px-4 space-x-6'>

                <div
                    className={(location.pathname === "/BDC/fiche15" && page === 1) ? styleActive : styleNoActive}
                >
                    1
                </div>
                <div
                    className={page === 2 ? styleActive : styleNoActive}
                >
                    2
                </div>
            </div>
            <form className="mt-6">
                <table className="mt-4 w-full table-auto text-left">
                    <thead className="bg-magenta ">
                        <tr className='border-2 border-magenta'>
                            <th className="border-r border-white p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Théme
                                </p>
                            </th>
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
                        {page === 1 ? Array.from({ length: 18 }).map((_, index) => (
                            <Row15Component
                                key={index}
                                note={notesFirstHalf[index]}
                                setNote={(value) => handleNoteChange(index, value, 'first')}
                                question={questionnaires?.[`question${index + 1}`]}
                                typeQuestion={typeQuestionnaires?.[`question${index + 1}`]}
                                importance={parametres}
                                color={invalidFields.first[index] ? 'bg-red-normal bg-opacity-20' : 'bg-gray-light'}
                            />
                        )) :
                            Array.from({ length: 18 }).map((_, index) => (
                                <Row15Component
                                    key={index + 18}
                                    note={notesSecondHalf[index]}
                                    setNote={(value) => handleNoteChange(index, value, 'second')}
                                    question={questionnaires?.[`question${index + 19}`]}
                                    typeQuestion={typeQuestionnaires?.[`question${index + 19}`]}
                                    importance={parametres}
                                    color={invalidFields.second[index] ? 'bg-red-normal bg-opacity-20' : 'bg-gray-light'}
                                />
                            ))}
                    </tbody>
                </table>

            </form>
            {page !== 2 ? (
                bilanDC?.statusFiche15 === 'Terminé' ? <ButtonsComponent
                    type="button"
                    color2="bg-gray-dark"
                    onClick2={nextPage}
                    titleButton2={getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
                    color1="bg-magenta"
                    onClick1={() => navigate('/BDC/fiche15/ficheReponse')}
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
