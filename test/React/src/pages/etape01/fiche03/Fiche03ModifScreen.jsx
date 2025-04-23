import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axios-client';
import { LanguageContext } from '../../../contexts/LanguageContext';
import ButtonComponent from '../../../component/ButtonComponent';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import { ResponseOutput } from '../../../component/ResponseOutput';
import { BdcContext } from '../../../contexts/BdcContext';

function Fiche03ModifScreen({ fiche, appele, demande, degre, beneficier, questionFiche03, setLoading, cin }) {
    const date = new Date();
    const { language, getTraduction } = useContext(LanguageContext);

    const { bilanDC, getBdc, type, types } = useContext(BdcContext)


    const [message, setMessage] = useState("")
    const navigate = useNavigate();


    const [reponse_Q1, setReponse_Q1] = useState(fiche?.reponse_Q1);
    const [reponse_Q2, setReponse_Q2] = useState(fiche?.reponse_Q2);
    const [reponse_Q3, setReponse_Q3] = useState(fiche?.reponse_Q3 || degre[0]?.valeur_id);
    const [reponse_Q4, setReponse_Q4] = useState(fiche?.reponse_Q4);
    const [reponse_Q5, setReponse_Q5] = useState(fiche?.reponse_Q5 || appele[0]?.valeur_id);
    // agenda
    const [objet, setObjet] = useState(fiche?.objet);
    const [date_RDV, setDate_RDV] = useState(fiche?.date_RDV);
    const [heure_RDV_debut, setHeure_RDV_debut] = useState(fiche?.heure_RDV_debut);
    const [heure_RDV_fin, setHeure_RDV_fin] = useState(fiche?.heure_RDV_fin);
    const [type_RDV, setType_RDV] = useState(fiche?.type_RDV || 'Accueil');



    const [isOpen, setIsOpen] = useState(false)

    const MAX_CHARACTERS = 255;

    const validateFields = () => {
        if (!reponse_Q2 || !reponse_Q3 || !reponse_Q5) {
            alert("Tous les champs sont requis.");
            return false;
        }

        if (
            (reponse_Q2 && reponse_Q2.length > MAX_CHARACTERS) ||
            (reponse_Q3 && reponse_Q3.length > MAX_CHARACTERS) ||
            (reponse_Q5 && reponse_Q5.length > MAX_CHARACTERS) ||
            (heure_RDV_debut && heure_RDV_debut.length > MAX_CHARACTERS) ||
            (heure_RDV_fin && heure_RDV_fin.length > MAX_CHARACTERS)
        ) {
            alert("Le nombre de caractères dépasse la limite de 255 caractères.");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {

        if (!validateFields()) {
            return;
        }

        const formData = {
            reponse_Q1,
            reponse_Q2,
            reponse_Q3,
            reponse_Q4,
            reponse_Q5,
            objet,
            date_RDV,
            heure_RDV_debut,
            heure_RDV_fin,
            type_RDV
        };
        setLoading(true)
        console.log(`Données soumises :`, formData);

        try {
            const response = await axiosClient.put(`/fiche03/${fiche.id}/update?cin=${cin}`, formData);
            setMessage(response.data.message);

            console.log(response.data);
            navigate('/BDC/fiche04');

        } catch (error) {
            console.error(`Erreur lors de l'envoi des données`, error);
            setMessage(`Une erreur est survenue lors de l'enregistrement.`);
        }
    };

    const getOrigineDemandeTraduction = (questionKey) => {
        const question = demande?.find(q => q?.uuid === questionKey);

        return question ? question[language] : questionKey;
    };

    const getDegreTraduction = (questionKey) => {
        const question = degre?.find(q => q?.uuid === questionKey);

        return question ? question[language] : questionKey;
    };
    const getAppeleTraduction = (questionKey) => {
        const question = appele?.find(q => q?.uuid === questionKey);

        return question ? question[language] : questionKey;
    };

    const isRtl = language === 'AR';
    const directionClass = isRtl ? 'rtl' : 'ltr';
    const alignmentClass = isRtl ? 'text-right' : 'text-left';

    const openPopup = () => {
        setIsOpen(true);
    };


    return (
        <div className={`px-6 py-6 ${directionClass}`}>

            <SubHeaderComponent
                alignmentClass={alignmentClass}
                color='text-black'
                date={date}
                firstName={beneficier?.prenom}
                lastName={beneficier?.nom}
                labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title={getTraduction(`title`, { FR: `Fiche du premier contact`, AR: `استمارة الاتصال الأول`, EN: `First Contact Form` })} />

            <form onSubmit={(e) => e.preventDefault()} className={`${alignmentClass}`}>
                <div className='flex flex-wrap justify-start gap-4'>
                    <div className={`mb-6 w-full h-auto max-w-2xl bg-gray-light bg-opacity-40 p-6 rounded-2xl  ${alignmentClass}`}>
                        <h3 className={`text-lg font-semibold mb-6 ${alignmentClass}`}>{getTraduction(`info`, { FR: `Informations Personnelles`, AR: `المعلومات الشخصية`, EN: `Personal Information` })}</h3>

                        <div className={`grid grid-cols-1 md:grid-cols-2 ${alignmentClass}`}>

                            <div className={`mb-3 flex`}>
                                <label htmlFor={`nom`} className={`block text-sm mr-2 font-semibold ${alignmentClass}`}><span className='font-normal'>{getTraduction(questionFiche03.question10?.uuid, questionFiche03.question10)}:</span> {beneficier?.nom}</label>
                            </div>
                            <div className={`mb-3 flex`}>
                                <label htmlFor={`prenom`} className={`block text-sm mr-2 font-semibold ${alignmentClass}`}><span className='font-normal'>{getTraduction(questionFiche03.question11?.uuid, questionFiche03.question11)} :</span> {beneficier?.prenom}</label>
                            </div>
                            <div className={`mb-3 flex`}>
                                <label htmlFor={`DN`} className={`block text-sm mr-2 font-semibold ${alignmentClass}`}><span className='font-normal'>{getTraduction(questionFiche03.question14?.uuid, questionFiche03.question14)} :</span> {beneficier?.date_naissance}</label>
                            </div>
                            <div className={`mb-3 flex`}>
                                <label htmlFor={`status`} className={`block text-sm mr-2 font-semibold`}><span className='font-normal'>Pays de naissance :</span> {beneficier?.paysNaissance}</label>
                            </div>
                            <div className={`mb-3 flex`}>
                                <label htmlFor={`status`} className={`block text-sm mr-2 font-semibold`}><span className='font-normal'>Nationnalité :</span> {beneficier?.nationnalite}</label>
                            </div>
                            <div className={`mb-3 flex`}>
                                <label htmlFor={`cin`} className={`block text-sm mr-2 font-semibold ${alignmentClass}`}><span className='font-normal'>{getTraduction(questionFiche03.question12?.uuid, questionFiche03.question12)} :</span> {cin}</label>
                            </div>


                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 ${alignmentClass}`}>
                            <div className={`mb-3 flex`}>
                                <label htmlFor={`adresse`} className={`block text-sm mr-2 font-semibold`}><span className='font-normal'>{getTraduction(questionFiche03.question15?.uuid, questionFiche03.question15)} :</span> {beneficier?.adresse}</label>
                            </div>
                            <div className={`mb-3 flex`}>
                                <label htmlFor={`telephone`} className={`block text-sm mr-2 font-semibold`}><span className='font-normal'>{getTraduction(questionFiche03.question16?.uuid, questionFiche03.question16)} :</span> {beneficier?.telephone}</label>
                            </div>
                            <div className={`mb-3 flex`}>
                                <label htmlFor={`email`} className={`block text-sm mr-2 font-semibold`}><span className='font-normal'>{getTraduction(questionFiche03.question17?.uuid, questionFiche03.question17)}:</span> {beneficier?.email}</label>
                            </div>
                            <div className={`mb-3 flex`}>
                                <label htmlFor={`nom`} className={`block text-sm mr-2 font-semibold ${alignmentClass}`}><span className='font-normal'>Type beneficier:</span> {types?.find((t) => t.valeur_id === type)?.FR}</label>
                            </div>
                            <div className={`mb-3 flex`}>
                                <label htmlFor={`status`} className={`block text-sm mr-2 font-semibold`}><span className='font-normal'>{getTraduction(questionFiche03.question2?.uuid, questionFiche03.question2)} :</span> {beneficier?.statusProfessionnel}</label>
                            </div>
                            <div className={`mb-3 flex`}>
                                <label htmlFor={`MS`} className={`block text-sm mr-2 font-semibold ${alignmentClass}`}><span className='font-normal'>{getTraduction(questionFiche03.question13?.uuid, questionFiche03.question13)}:</span> {beneficier?.motifDeSejour}</label>
                            </div>

                        </div>
                    </div>

                    <div className={`mb-6 w-full h-auto max-w-2xl bg-gray-light bg-opacity-40 p-6 rounded-2xl  ${alignmentClass}`}>
                        <h3 className={`text-lg font-semibold mb-6 ${alignmentClass}`}>{getTraduction(`contact_info`, { FR: `Informations de Contact`, AR: `معلومات الاتصال`, EN: `Contact Information` })}</h3>

                        <div className={`mb-3`}>
                            <label className={`block text-sm font-semibold ${alignmentClass}`}>{getTraduction(questionFiche03.question3?.uuid, questionFiche03.question3)}</label>
                            <div className={`items-center block ml-5 ${alignmentClass}`}>
                                {demande.map((e) => (
                                    <div key={e?.uuid} className={`flex items-center space-x-2 mr-6 text-sm ${alignmentClass}`}>
                                        <input
                                            type={`radio`}
                                            id={`question-${e?.uuid}`}
                                            name={`question`}
                                            value={e.valeur_id}
                                            checked={reponse_Q2 === e.valeur_id}
                                            onChange={(e) => setReponse_Q2(e.target.value)}

                                        />
                                        <label htmlFor={`question-${e?.uuid}`}>{getOrigineDemandeTraduction(e?.uuid)}</label>
                                    </div>
                                ))}
                                {reponse_Q2 === "demande_2" && <input
                                    id="degre"
                                    type={`text`}
                                    name={`reponse_Q4`}
                                    value={reponse_Q4 || ''}
                                    onChange={(e) => setReponse_Q4(e.target.value)}
                                    className={`mt-1 block w-1/3 h-10 rounded-md px-4 border border-gray-dark focus:border ${alignmentClass}`}
                                />}
                            </div>
                        </div>

                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${alignmentClass}`}>
                            <div className={`mb-1`}>
                                <label htmlFor={`contraintes`} className={`block text-sm font-semibold ${alignmentClass}`}>{getTraduction(questionFiche03.question5?.uuid, questionFiche03.question5)}</label>
                                <select
                                    id='contraintes'
                                    name={`reponse_Q3`}
                                    value={reponse_Q3}
                                    onChange={(e) => setReponse_Q3(e.target.value)}
                                    className={`mt-1 block w-full h-10 rounded-md px-4  border border-gray-dark focus:border ${alignmentClass}`}
                                >
                                    {degre.map((e) => (
                                        <option key={e?.uuid} value={e.valeur_id}>
                                            {getDegreTraduction(e?.uuid)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="semaine"
                                    className={`block text-sm font-semibold ${alignmentClass}`}
                                >
                                    {getTraduction(questionFiche03.question6?.uuid, questionFiche03.question6)}
                                </label>

                                <select
                                    id="semaine"
                                    name="reponse_Q5"
                                    value={reponse_Q5}
                                    onChange={(e) => setReponse_Q5(e.target.value)}
                                    className={`mt-1 block w-full h-10 rounded-md px-4  border border-gray-dark focus:border ${alignmentClass}`}
                                >
                                    {appele.map((e) => (
                                        <option key={e?.uuid} value={e.valeur_id}>
                                            {getAppeleTraduction(e?.uuid)}
                                        </option>
                                    ))}
                                </select>

                                {reponse_Q5 === "appele_4" && (
                                    <input
                                        id="appele"
                                        type="text"
                                        name="reponse_Q1"
                                        value={reponse_Q1}
                                        onChange={(e) => setReponse_Q1(e.target.value)}
                                        className={`mt-1 block w-full h-10  rounded-md px-4  border border-gray-dark focus:border ${alignmentClass}`}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`w-full max-w-2xl h-auto bg-gray-light bg-opacity-40 p-6 rounded-2xl `}>
                    <div className={`mb-2 flex items-end`}>
                        <label className={`text-lg font-semibold mr-4 ${alignmentClass}`}>{getTraduction(`appointment`, { FR: `Rendez-vous`, AR: `موعد`, EN: `Appointment` })} </label>
                        <input type={`hidden`} name={`reponse_Q6`} value={type_RDV} onChange={(e) => setType_RDV(e.target.value)} />
                    </div>
                    <div className={`flex items-center justify-between gap-4 ${alignmentClass}`}>
                        <div >
                            <label htmlFor={`date_RDV`} className={`text-sm font-semibold ${alignmentClass}`}>{getTraduction(questionFiche03.question8?.uuid, questionFiche03.question8)}</label>
                            <input
                                type={`date`}
                                id={`date_RDV`}
                                value={date_RDV || ''}
                                onChange={(e) => setDate_RDV(e.target.value)}
                                className={`w-full h-10 rounded-md px-4 text-sm font-normal  border border-gray-dark focus:border ${alignmentClass}`}
                                name={`reponse_Q7`}
                                required
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <div >
                                <label htmlFor={`heure_RDV`} className={`text-sm font-semibold ${alignmentClass}`}>{`Heure début`}</label>
                                <input
                                    type={`time`}
                                    id={`heure_RDV`}
                                    value={heure_RDV_debut || ''}
                                    onChange={(e) => setHeure_RDV_debut(e.target.value)}
                                    className={`w-full h-10 rounded-md text-sm font-normal px-4  border border-gray-dark focus:border ${alignmentClass}`}
                                    name={`reponse_Q8`}
                                    required
                                />
                            </div>
                            <div >
                                <label htmlFor={`heure_RDV`} className={`text-sm font-semibold ${alignmentClass}`}>{`Heure fin`}</label>
                                <input
                                    type={`time`}
                                    id={`heure_RDV`}
                                    value={heure_RDV_fin || ''}
                                    onChange={(e) => setHeure_RDV_fin(e.target.value)}
                                    className={`w-full h-10 text-sm font-normal rounded-md px-4  border border-gray-dark focus:border ${alignmentClass}`}
                                    name={`reponse_Q8`}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <ButtonComponent
                    type={`button`}
                    color={`bg-magenta`}
                    onClick={openPopup}
                >
                    {getTraduction(`modifier`, { FR: `Enregistrer`, AR: `حفظ`, EN: `Save` })}
                </ButtonComponent>
            </form>
            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={getTraduction(`title`, { FR: `Fiche du premier contact`, AR: `استمارة الاتصال الأول`, EN: `First Contact Form` })}
                // message="Voulez-vous sauvegarder les modifications effectuées ?"
                buttonVName="Oui"
                buttonCName="Non"
            />

        </div>
    );
}

export default Fiche03ModifScreen;
