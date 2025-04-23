import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../api/axios-client';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../../contexts/LanguageContext';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import ButtonComponent from '../../../component/ButtonComponent';
import { ResponseOutput } from '../../../component/ResponseOutput';

export default function Fiche07ModifScreen({ fiche, cin, nomAgent }) {
    const [reponse_Q1, setReponse_Q1] = useState(new Date().toISOString().split('T')[0]);
    const [reponse_Q2, setReponse_Q2] = useState("");
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const date = new Date()
    const { language, getTraduction } = useContext(LanguageContext)
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate();

    const [RQ1, setRQ1] = useState(false)



    function validateFields() {
        const isRQ1Valid = reponse_Q2.trim() !== '';

        setRQ1(!isRQ1Valid);

        return isRQ1Valid
    }

    useEffect(() => {
        if (fiche?.reponse_Q2) {
            setReponse_Q2(fiche.reponse_Q2);
        }
    }, [fiche]);

    const MAX_CHARACTERS = 1000;

    const validateData = () => {
        if (
            reponse_Q2.length > MAX_CHARACTERS) {
            alert("Le nombre de caractères dépasse la limite de 1000 caractéres.");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {

        const formData = {
            reponse_Q1,
            reponse_Q2
        };

        try {
            setIsLoading(true);
            const response = await axiosClient.put(`fiche07/${fiche?.id}/update?cin=${cin}&nom=${nomAgent}`, formData);
            setMessage(response.data.message);
            console.log(response.data.message);
            navigate('/BDC/fiche08');
        } catch (error) {
            setMessage("Une erreur s'est produite lors de la soumission. Veuillez réessayer.");
            console.error("Error fetching element:", error);
        } finally {
            setIsLoading(false);
        }
    };

    function openPopup() {
        if (!validateData())
            return;

        if (!validateFields()) {
            return;
        }

        setIsOpen(true)
    }
    function closePopup() {
        setIsOpen(false)
    }

    const isRtl = language === 'AR';
    const directionClass = isRtl ? 'rtl' : 'ltr';
    const alignmentClass = isRtl ? 'text-right' : 'text-left';

    return (
        <div className="py-6 px-6">

            <SubHeaderComponent
                alignmentClass={alignmentClass}
                color='text-black'
                date={date}
                content="Décrivez ci-dessous les objectifs que vous comptez poursuivre à travers le bilan de compétences et des résultats concrets que vous attendez d’obtenir à la fin du parcours."
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title={getTraduction('Qu\'est-ce que j\'attends du Bilan des compétences ?', {
                    FR: 'Qu\'est-ce que j\'attends du Bilan des compétences ?',
                    AR: 'ماذا أتوقع من تقييم المهارات؟',
                    EN: 'What do I expect from the skills assessment?'
                })} />

            <div className="flex justify-center items-center px-8 bg-gray-100">

                <form onSubmit={(e) => e.preventDefault()} className="w-full bg-gray-light bg-opacity-40 p-8 rounded-lg shadow-lg">
                    <h2 className="font-normal text-sm text-center mb-6">
                        {getTraduction('Décrivez ci-dessous les objectifs que vous comptez poursuivre à travers le bilan de compétences et des résultats concrets que vous attendez d’obtenir à la fin du parcours.', {
                            FR: 'Décrivez ci-dessous les objectifs que vous comptez poursuivre à travers le bilan de compétences et des résultats concrets que vous attendez d’obtenir à la fin du parcours.',
                            AR: 'يرجى وصف الأهداف التي تنوون السعي لتحقيقها من خلال تقييم المهارات والنتائج الملموسة التي تتوقعون الحصول عليها في نهاية البرنامج.',
                            EN: 'Please describe the objectives you plan to pursue through the skills assessment and the concrete results you expect to achieve at the end of the program.'
                        })}
                    </h2>

                    {message && (
                        <div className={`text-center mb-4`}>
                            {message}
                        </div>
                    )}

                    <div className="mb-6">
                        <textarea
                            id="reponse_Q2"
                            name="reponse_Q2"
                            rows="15"
                            value={reponse_Q2}
                            onChange={(e) => setReponse_Q2(e.target.value)}
                            className={`w-full px-4 py-2 border font-normal text-sm ${!RQ1 ? 'border-gray-dark' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} focus:border-black rounded-md `}
                        />
                    </div>
                    <div className="text-center">
                        <ButtonComponent type="button" color={`bg-magenta`} onClick={openPopup}>
                            {getTraduction(`modifier`, { FR: `Enregistrer`, AR: `حفظ`, EN: `Save` })}
                        </ButtonComponent>
                    </div>
                </form>
                <ResponseOutput
                    isOpen={isOpen}
                    handleSubmit={handleSubmit}
                    closePopup={() => setIsOpen(false)}
                    title={getTraduction('Qu\'est-ce que j\'attends du Bilan des compétences ?', {
                        FR: 'Qu\'est-ce que j\'attends du Bilan des compétences ?',
                        AR: 'ماذا أتوقع من تقييم المهارات؟',
                        EN: 'What do I expect from the skills assessment?'
                    })}
                    buttonVName="Oui"
                    buttonCName="Non"
                />
            </div>
        </div>
    );
}
