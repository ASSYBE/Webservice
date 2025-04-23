import React, { useContext, useEffect, useState } from 'react'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { Row17Component } from '../../../component/Row17Component'
import axiosClient from '../../../api/axios-client'
import ButtonComponent from '../../../component/ButtonComponent'
import { ResponseOutput } from '../../../component/ResponseOutput'
import { ButtonsComponent } from '../../../component/ButtonsComponent'
import { BdcContext } from '../../../contexts/BdcContext'
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { TokenContext } from '../../../contexts/TokenContext'


function noteNumber(note) {

    if (note === 'fiche14_2')
        return 1;
    if (note === 'fiche14_3')
        return 2;
    if (note === 'fiche14_4')
        return 3;
    else
        return 0;

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

export const Fiche17Screen = () => {
    const { beneficier, getBeneficier, type } = useContext(BeneficierContext)
    const { getBdc, bilanDC } = useContext(BdcContext)
    const date = new Date()
    const { language, getTraduction } = useContext(LanguageContext)

    const [page, setPage] = useState(1)
    const [question, setQuestion] = useState("")
    const [questionnaires, setQuestionnaires] = useState({})
    const [parametres, setParametre] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [goBack, setGoBack] = useState(false)


    const [notesFirstHalf, setNotesFirstHalf] = useState(new Array(20).fill(null));
    const [notesSecondHalf, setNotesSecondHalf] = useState(new Array(20).fill(null));
    const [notesThirdHalf, setNotesThirdHalf] = useState(new Array(20).fill(null));
    const [notesFourthHalf, setNotesFourthHalf] = useState(new Array(20).fill(null));
    const [notesFifthHalf, setNotesFifthHalf] = useState(new Array(21).fill(null));
    const [fiche, setFiche] = useState({})
    const [competencesFiche, setCompetencesFiche] = useState([])

    const navigate = useNavigate()

    async function fetchData() {
        try {

            const response = await axiosClient.get(`/fiche17?cin=${cin}`);
            const { parametre, questionnaires, fiche, competences } = response.data;

            setQuestionnaires(questionnaires);
            setParametre(parametre);
            setFiche(fiche);
            setCompetencesFiche(competences);

            const firstHalfNotes = [];
            const secondHalfNotes = [];
            const thirdHalfNotes = [];
            const fourthHalfNotes = [];
            const fifthHalfNotes = [];

            competences.forEach((competence, index) => {
                const note = competence.competence_note;

                if (index < 20) {
                    firstHalfNotes.push(noteValeurId(note));
                } else if (index < 40) {
                    secondHalfNotes.push(noteValeurId(note));
                } else if (index < 60) {
                    thirdHalfNotes.push(noteValeurId(note));
                } else if (index < 80) {
                    fourthHalfNotes.push(noteValeurId(note));
                } else if (index < 101) {
                    fifthHalfNotes.push(noteValeurId(note));
                }
            });

            setNotesFirstHalf(firstHalfNotes);
            setNotesSecondHalf(secondHalfNotes);
            setNotesThirdHalf(thirdHalfNotes);
            setNotesFourthHalf(fourthHalfNotes);
            setNotesFifthHalf(fifthHalfNotes);


        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    }

    const handleNoteChange = (index, value, page) => {
        if (page === 1) {
            setNotesFirstHalf(prev => {
                const newNotes = [...prev];
                newNotes[index] = value;
                return newNotes;
            });
        } else if (page === 2) {
            setNotesSecondHalf(prev => {
                const newNotes = [...prev];
                newNotes[index] = value;
                return newNotes;
            });
        } else if (page === 3) {
            setNotesThirdHalf(prev => {
                const newNotes = [...prev];
                newNotes[index] = value;
                return newNotes;
            });
        } else if (page === 4) {
            setNotesFourthHalf(prev => {
                const newNotes = [...prev];
                newNotes[index] = value;
                return newNotes;
            });
        } else if (page === 5) {
            setNotesFifthHalf(prev => {
                const newNotes = [...prev];
                newNotes[index] = value;
                return newNotes;
            });
        }
    };

    const nextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSubmit = async () => {

        const competences = [];

        const mapNotesToCompetencies = (pageNotes, startIndex) => {
            return pageNotes.map((note, index) => {
                const question = questionnaires[`question${startIndex + index}`];

                return {
                    competence_id: question?.valeur_id,
                    competence_note: noteNumber(note)
                };
            });
        };

        competences.push(...mapNotesToCompetencies(notesFirstHalf, 1));
        competences.push(...mapNotesToCompetencies(notesSecondHalf, 21));
        competences.push(...mapNotesToCompetencies(notesThirdHalf, 41));
        competences.push(...mapNotesToCompetencies(notesFourthHalf, 61));
        competences.push(...mapNotesToCompetencies(notesFifthHalf, 81));

        const data = {
            competences
        };

        try {
            const response = await axiosClient.post(`/fiche17/post?cin=${cin}`, data);
            navigate('/BDC/fiche17/ficheReponse')
        } catch (error) {
            console.error("Failed to submit data", error);
        }
    };

    const handleUpdate = async () => {
        const competences = [];

        const mapNotesToCompetencies = (pageNotes, startIndex) => {
            return pageNotes.map((note, index) => {
                const question = questionnaires[`question${startIndex + index}`];

                const competence = competencesFiche[index]
                return {
                    id: competence.id,
                    competence_id: question?.valeur_id,
                    competence_note: noteNumber(note)
                };
            });
        };

        competences.push(...mapNotesToCompetencies(notesFirstHalf, 0));
        competences.push(...mapNotesToCompetencies(notesSecondHalf, 20));
        competences.push(...mapNotesToCompetencies(notesThirdHalf, 40));
        competences.push(...mapNotesToCompetencies(notesFourthHalf, 60));
        competences.push(...mapNotesToCompetencies(notesFifthHalf, 80));

        const data = {
            competences
        };
        try {
            const response = await axiosClient.put(`/fiche17/${fiche?.id}/edit?cin=${cin}`, data);
            navigate('/BDC/fiche17/ficheReponse')
        } catch (error) {
            console.error("Failed to submit data", error);
        }
    };

    // const handleUpdate = async () => {
    //     // Array to hold all competences for the page
    //     const competences = [];

    //     // Helper function to map notes to competencies
    //     const mapNotesToCompetencies = (pageNotes, startIndex) => {
    //         return pageNotes.map((note, index) => {
    //             const question = questionnaires[`question${startIndex + index}`];
    //             const competence = competencesFiche[index];
    //             console.log("competence : ", JSON.stringify(competence, null, 3));
    //             return {
    //                 id: competence.id,
    //                 competence_id: question?.valeur_id,
    //                 competence_note: noteNumber(note),
    //             };
    //         });
    //     };

    //     // Define a function to handle each page update
    //     const updatePage = async (pageNotes, startIndex) => {
    //         competences.length = 0; // Clear competences array for current page

    //         // Add competences from the current page
    //         competences.push(...mapNotesToCompetencies(pageNotes, startIndex));

    //         const data = { competences };

    //         try {
    //             console.log("Updating data with competences for page:", startIndex / 20 + 1);
    //             const response = await axiosClient.put(`/fiche17/${fiche?.id}/edit?cin=${cin}`, data);
    //             console.log('Update response:', response.data);
    //             // Optionally, you can navigate to a new page or show a success message here
    //         } catch (error) {
    //             console.error("Failed to submit data for page", startIndex / 20 + 1, error);
    //         }
    //     };

    //     // Handle each page one by one
    //     try {
    //         await updatePage(notesFirstHalf, 0); // Page 1
    //         await updatePage(notesSecondHalf, 20); // Page 2
    //         await updatePage(notesThirdHalf, 40); // Page 3
    //         await updatePage(notesFourthHalf, 60); // Page 4
    //         await updatePage(notesFifthHalf, 80); // Page 5

    //         // After all pages are updated, navigate to another page (if required)
    //         //navigate('/BDC/fiche17/ficheReponse');
    //     } catch (error) {
    //         console.error("Error while processing pages", error);
    //     }
    // };


    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
            getBdc()
        } else
            getToken()
    }, [cin, token])

    return (
        <div>
            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={competencesFiche.length > 0 ? handleUpdate : handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={"Le bilan des capacités"}
                buttonVName="Oui"
                buttonCName="Non"
            />

            <ResponseOutput
                isOpen={goBack}
                handleSubmit={() => setPage(1)}
                closePopup={() => setGoBack(false)}
                title={`Le bilan des capacités`}
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
            {page !== 5 ? (
                bilanDC?.statusFiche17B === 'Terminé' ? <ButtonsComponent
                    type="button"
                    color2="bg-gray-dark"
                    onClick2={nextPage}
                    titleButton2={getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
                    color1="bg-magenta"
                    onClick1={() => navigate('/BDC/fiche17/ficheReponse')}
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
            <form className="mt-6">
                <table className="mt-4 w-full table-auto text-left">
                    <thead className="bg-magenta ">
                        <tr className='border-2 border-magenta'>
                            <th className="border-r border-white p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Description
                                </p>
                            </th>

                            <th className="p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Degré d'importance
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {page === 1 &&
                            Array.from({ length: 20 }).map((_, index) => (
                                <Row17Component
                                    key={index}
                                    note={notesFirstHalf[index]}
                                    setNote={(value) => handleNoteChange(index, value, 1)}
                                    question={questionnaires?.[`question${index + 1}`]}
                                    interets={parametres}
                                />
                            ))}
                        {page === 2 &&
                            Array.from({ length: 20 }).map((_, index) => (
                                <Row17Component
                                    key={index}
                                    note={notesSecondHalf[index]}
                                    setNote={(value) => handleNoteChange(index, value, 2)}
                                    question={questionnaires?.[`question${index + 21}`]}
                                    interets={parametres}
                                />
                            ))}
                        {page === 3 &&
                            Array.from({ length: 20 }).map((_, index) => (
                                <Row17Component
                                    key={index}
                                    note={notesThirdHalf[index]}
                                    setNote={(value) => handleNoteChange(index, value, 3)}
                                    question={questionnaires?.[`question${index + 41}`]}
                                    interets={parametres}
                                />
                            ))}
                        {page === 4 &&
                            Array.from({ length: 20 }).map((_, index) => (
                                <Row17Component
                                    key={index}
                                    note={notesFourthHalf[index]}
                                    setNote={(value) => handleNoteChange(index, value, 4)}
                                    question={questionnaires?.[`question${index + 61}`]}
                                    interets={parametres}
                                />
                            ))}
                        {page === 5 &&
                            Array.from({ length: 21 }).map((_, index) => (
                                <Row17Component
                                    key={index}
                                    note={notesFifthHalf[index]}
                                    setNote={(value) => handleNoteChange(index, value, 5)}
                                    question={questionnaires?.[`question${index + 81}`]}
                                    interets={parametres}
                                />
                            ))}
                    </tbody>
                </table>

            </form>

        </div>
    )
}
