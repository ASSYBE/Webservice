import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axios-client';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import ButtonComponent from '../../../component/ButtonComponent';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import { FreeButton } from '../../../component/FreeButton';
import { ResponseOutput } from '../../../component/ResponseOutput';
import { anapecRole } from '../../../constants/Variables';

export default function Fiche04ModifScreen({ fiche, nom, prenom, questionFiche04, role, cin, setLoading, nomAgent }) {
    const date = new Date()

    const [reponse_Q1, setReponse_Q1] = useState(fiche?.reponse_Q1)
    const [reponse_Q2, setReponse_Q2] = useState(fiche?.reponse_Q2);
    const [reponse_Q3, setReponse_Q3] = useState(fiche?.reponse_Q3);
    const [message, setMessage] = useState('')
    const { language, getTraduction } = useContext(LanguageContext);
    const [date_creation, setDate_creation] = useState(date.toISOString().split('T')[0])
    const [isOpen, setIsOpen] = useState(false)
    const [RQ2, setRQ2] = useState(false)
    const [RQ3, setRQ3] = useState(false)
    const [createur, setCreateur] = useState(nomAgent || fiche?.createur || '');

    const [signature, setSignature] = useState(fiche?.signature || false)


    const navigate = useNavigate();

    const MAX_CHARACTERS = 50;

    // useEffect(() => {
    //     setCreateur(nomAgent == null ? fiche?.createur : nomAgent);
    // }, [nomAgent, fiche?.createur]);

    function validateFields() {
        const isRQ2Valid = reponse_Q2.trim() !== '';
        const isRQ3Valid = reponse_Q3.trim() !== '';

        setRQ2(isRQ2Valid);
        setRQ3(isRQ3Valid);

        return isRQ2Valid && isRQ3Valid;
    }


    const validateData = () => {
        const reponseQ2Number = parseInt(reponse_Q2, 10);
        const reponseQ3Number = parseInt(reponse_Q3, 10);

        if (reponseQ2Number <= 0 || reponseQ3Number <= 0) {
            alert("Le nombre de caractères doit être supérieur à 0.");
            return false;
        }

        if (reponseQ2Number > MAX_CHARACTERS || reponseQ3Number > MAX_CHARACTERS) {
            alert("Le nombre de caractères dépasse la limite de 50.");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {

        if (!validateFields())
            return;
        if (!validateData())
            return;

        //console.log('signature : ', signature)

        const formData = {
            reponse_Q1,
            reponse_Q2,
            reponse_Q3,
            signature,
            createur
        }

        console.log("Données soumises", formData);
        try {
            setLoading(true)
            openPopup()
            const response = await axiosClient.put(`/fiche04/${fiche.id}/update?cin=${cin}&nom=${nomAgent}`, formData);
            setMessage(response.data.message);
            console.log(formData)
            navigate('/BDC/fiche05');

        } catch (error) {
            console.error("Erreur lors de l'envoi des données", error);
            setMessage("Une erreur est survenue lors de l'enregistrement.");
        }
    }

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    const isRtl = language === 'AR';
    const directionClass = isRtl ? 'rtl' : 'ltr';
    const alignmentClass = isRtl ? 'text-right' : 'text-left';

    return (
        <div className={` px-4 mx-auto py-6 ${directionClass}`}>

            <SubHeaderComponent
                alignmentClass={alignmentClass}
                color='text-black'
                date={date}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title={getTraduction(`contrat_bilan`, {
                    FR: `Le contrat du Bilan des compétences`,
                    AR: `عقد تقييم المهارات`,
                    EN: `The Skills Assessment Agreement`
                })} />

            <form className='w-full h-auto max-w-8xl bg-gray-light bg-opacity-40 p-6 mt-4 rounded-2xl relative ' onSubmit={(e) => e.preventDefault()}>
                <div className={`flex flex-col mt-3`}>
                    <div className={`mb-3`}>
                        <input type={`hidden`} name={`dateCreation`} id={`date`} className={`mt-1 block w-60 h-12 border-2 rounded-md px-4 focus:ring focus:ring-blue-300 ${alignmentClass}`} required />
                    </div>
                    <label className={`font-normal text-base mb-4 ${alignmentClass}`} >
                        {getTraduction(`soussigne_beneficiaire`, {
                            FR: `Le/La soussigné.e bénéficiaire`,
                            AR: `الموقع/ة أدناه المستفيد/ة`,
                            EN: `The undersigned beneficiary`
                        })} <strong>{nom} {prenom}</strong>
                    </label>
                    <div className={`${alignmentClass}`}>
                        <h1 className={`font-normal text-base mb-1 ${alignmentClass}`}>{getTraduction(`declare`, {
                            FR: `DÉCLARE`,
                            AR: `إعلان`,
                            EN: `DECLARE`
                        })}</h1>
                        <ul>
                            <li className={`font-normal text-base mb-1 ${alignmentClass} flex items-center`} ><div className='bg-orange w-2 h-2 rounded-full mr-3'></div>{getTraduction(questionFiche04.question1?.uuid, questionFiche04.question1)}</li>
                            <li className={`font-normal text-base mb-1 ${alignmentClass} flex items-center`} ><div className='bg-orange w-2 h-2 rounded-full mr-3'></div>{getTraduction(questionFiche04.question2?.uuid, questionFiche04.question2)}</li>
                            <li className={`font-normal text-base mb-1 ${alignmentClass} flex items-center`} ><div className='bg-orange w-2 h-2 rounded-full mr-3'></div>
                                {getTraduction(questionFiche04.question3?.uuid, questionFiche04.question3) + " "}
                                <input type={`number`} name={`reponse_Q1`} value={reponse_Q2} onChange={(e) => setReponse_Q2(e.target.value)} className={`mt-1 w-16 h-10 rounded-md px-2 mx-3 ${!RQ3 ? 'bg-white' : 'bg-red-salmon'} border border-gray-dark focus:border ${alignmentClass}`} />
                                {" " + getTraduction(questionFiche04.question4?.uuid, questionFiche04.question4) + " "}
                                <input type={`number`} name={`reponse_Q2`} value={reponse_Q3} onChange={(e) => setReponse_Q3(e.target.value)} className={`mt-1 w-16 h-10 rounded-md px-2 mx-3 ${!RQ2 ? 'bg-white' : 'bg-red-salmon'} border border-gray-dark focus:border ${alignmentClass}`} />
                                {" " + getTraduction(questionFiche04.question5?.uuid, questionFiche04.question5)}
                            </li>
                            <li className={`font-normal text-base mb-1 ${alignmentClass} flex items-center`} ><div className='bg-orange w-2 h-2 rounded-full mr-3'></div>{getTraduction(questionFiche04.question6?.uuid, questionFiche04.question6)}</li>
                            <li className={`font-normal text-base mb-1 ${alignmentClass} flex items-center`} ><div className='bg-orange w-2 h-2 rounded-full mr-3'></div>{getTraduction(questionFiche04.question7?.uuid, questionFiche04.question7)}</li>
                            <li className={`font-normal text-base mb-1 ${alignmentClass} flex items-center`} ><div className='bg-orange w-2 h-2 rounded-full mr-3'></div>{getTraduction(questionFiche04.question8?.uuid, questionFiche04.question8)}</li>
                        </ul>
                        <div className='flex flex-col'>
                            <div className='mb-7 mt-3 flex items-center'>
                                <label className={`font-normal text-base my-10 ${alignmentClass}`} >{getTraduction(questionFiche04.question9?.uuid, questionFiche04.question9)}</label>
                                <input
                                    type="checkbox"
                                    checked={signature}
                                    onChange={(e) => setSignature(e.target.checked)}
                                    className="ml-4 w-5 h-5 rounded-md border border-gray-dark focus:border"
                                />                            </div>
                            <label className={`font-normal text-base mb-1 ${alignmentClass}`} >{getTraduction(questionFiche04.question10?.uuid, questionFiche04.question10)} <span className='font-semibold'>{createur}</span></label>
                        </div>
                    </div>
                    <div className={`mt-16`} >
                        <h1 className={`font-normal text-base mb-1 ${alignmentClass}`}>{getTraduction(`declare`, {
                            FR: `DÉCLARE`,
                            AR: `إعلان`,
                            EN: `DECLARE`
                        })}</h1>
                        <ul>
                            <li className={`font-normal text-base mb-1 ${alignmentClass}`} >{getTraduction(questionFiche04.question11?.uuid, questionFiche04.question11)}</li>
                            <li className={`font-normal text-base mb-1 ${alignmentClass}`} >{getTraduction(questionFiche04.question12?.uuid, questionFiche04.question12)}</li>
                            <li className={`font-normal text-base mb-1 ${alignmentClass}`} >{getTraduction(questionFiche04.question13?.uuid, questionFiche04.question13)}</li>
                        </ul>
                    </div>

                </div>

            </form>
            <ButtonComponent type={`button`} color={`bg-magenta`} onClick={handleSubmit}>
                {getTraduction(`modifier`, { FR: `Enregistrer`, AR: `حفظ`, EN: `Save` })}
            </ButtonComponent>
            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={getTraduction(`contrat_bilan`, {
                    FR: `Le contrat du Bilan des compétences`,
                    AR: `عقد تقييم المهارات`,
                    EN: `The Skills Assessment Agreement`
                })}
                buttonVName="Oui"
                buttonCName="Non"
            />
        </div>
    );
}
