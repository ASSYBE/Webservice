import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../../../../api/axios-client'
import { BeneficierContext } from '../../../../contexts/BeneficierContext'
import ButtonComponent from '../../../../component/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import { ResponseOutput } from '../../../../component/ResponseOutput'
import { TokenContext } from '../../../../contexts/TokenContext'


const styleError = ' border-red-normal bg-red-normal bg-opacity-20 w-full h-28 border-2 rounded-md mb-4 p-2'

export default function Fiche08EvaluationExperienceScreen() {

    const [reponseQ1, setReponseQ1] = useState("")
    const [reponseQ2, setReponseQ2] = useState("")
    const [reponseQ3, setReponseQ3] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [fiche, setFiche] = useState({});
    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const navigate = useNavigate()

    const [RQ1, setRQ1] = useState(false)
    const [RQ2, setRQ2] = useState(false)
    const [RQ3, setRQ3] = useState(false)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)



    function validateFields() {
        const isRQ1Valid = reponseQ1.trim() !== '';
        const isRQ2Valid = reponseQ2.trim() !== '';
        const isRQ3Valid = reponseQ3.trim() !== '';

        setRQ1(!isRQ1Valid);
        setRQ2(!isRQ2Valid);
        setRQ3(!isRQ3Valid);

        return isRQ1Valid && isRQ2Valid && isRQ3Valid;
    }

    async function fetchData() {
        try {
            const response = await axiosClient.get(`fiche08?cin=${cin}`);
            console.log('fiche08 :', response.data.fiche)
            setFiche(response.data.fiche)
            setReponseQ1(response.data.fiche.reponseQ1)
            setReponseQ2(response.data.fiche.reponseQ2)
            setReponseQ3(response.data.fiche.reponseQ3)

        } catch (e) {
            console.error("Error fetching element:", e);
        }
    }

    useEffect(() => {
        if (cin)
            fetchData();
        else
            getToken
    }, [cin]);

    const MAX_CHARACTERS = 255;

    const validateData = () => {
        if (
            reponseQ1.length > MAX_CHARACTERS ||
            reponseQ2.length > MAX_CHARACTERS ||
            reponseQ3.length > MAX_CHARACTERS
        ) {
            alert("Le nombre de caractères dépasse la limite de 255 caractéres.");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {

        if (!validateData())
            return;

        if (!validateFields()) {
            console.log('Please fill in all required fields.');
            return;
        }
        const formData = {
            reponseQ1,
            reponseQ2,
            reponseQ3
        };

        try {
            const response = await axiosClient.put(`/fiche08/${fiche.id}/update?cin=${cin}`, formData);

            console.log("Mise à jour réussie:", response.data);

            navigate('/BDC/fiche08/analysePoste')
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
        }

        console.log("Données envoyées:", formData);
    };


    function openPopup() {
        if (!validateFields()) {
            console.log('Please fill in all required fields.');
            return;
        }
        setIsOpen(true)
    }


    return (
        <div className='pt-6'>
            <h1 className='text-lg font-bold mb-6 text-black'>Évaluation de l'expérience professionnelle</h1>
            <div className='w-full'>
                <form onSubmit={handleSubmit} className='h-full relative'>
                    <div className="flex flex-wrap items-end">
                        <div className='w-1/2 mb-8 p-4 bg-white rounded-lg'>
                            <h3 className='font-normal text-sm mb-3 text-black'>Quelle évaluation faites-vous de votre parcours professionnel ?  <span className='text-red-normal'>(*)</span></h3>
                            <textarea
                                className={!RQ1 ? `w-full h-28 font-normal text-sm border border-gray-dark focus:border-black rounded-md mb-4 p-2` : styleError}
                                name="reponseQ1"
                                value={reponseQ1}
                                onChange={(e) => setReponseQ1(e.target.value)}
                                id="reponseQ1"
                                required
                            ></textarea>
                        </div>

                        <div className='w-1/2 mb-8 p-4 bg-white rounded-lg'>
                            <h3 className='font-normal text-sm mb-3 text-black'>Quelle image les collègues, les supérieurs, la famille et les amis ont-ils de votre parcours professionnel ?   <span className='text-red-normal'>(*)</span></h3>
                            <textarea
                                className={!RQ2 ? `w-full h-28 font-normal text-sm border border-gray-dark focus:border-black rounded-md mb-4 p-2` : styleError}
                                value={reponseQ2}
                                onChange={(e) => setReponseQ2(e.target.value)}
                                name="reponseQ2"
                                id="reponseQ2"
                                required
                            ></textarea>
                        </div>

                        <div className='w-1/2 mb-8 p-4 bg-white rounded-lg'>
                            <h3 className='font-normal text-sm mb-3 text-black'>Quelles tâches, exécutées par d'autres personnes sur votre lieu de travail, aimeriez-vous accomplir ?   <span className='text-red-normal'>(*)</span></h3>
                            <textarea
                                className={!RQ3 ? `w-full h-28 font-normal text-sm border border-gray-dark focus:border-black rounded-md mb-4 p-2` : styleError}
                                value={reponseQ3}
                                onChange={(e) => setReponseQ3(e.target.value)}
                                name="reponseQ3"
                                id="reponseQ3"
                                required
                            ></textarea>
                        </div>
                    </div>

                    <ButtonComponent type="button" onClick={openPopup} color='bg-magenta'>Suivant</ButtonComponent>
                </form>
                <ResponseOutput
                    isOpen={isOpen}
                    handleSubmit={handleSubmit}
                    closePopup={() => setIsOpen(false)}
                    title={"Évaluation de l'expérience professionnelle"}
                    message="Voulez-vous enregistrer ?"
                    buttonVName="Oui"
                    buttonCName="Non"
                />
            </div>

        </div>

    )
}
