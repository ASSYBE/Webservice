import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../../api/axios-client';
import { MdDeleteForever } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { ThreeDots } from 'react-loader-spinner';
import { FaFileDownload } from "react-icons/fa";
import { BeneficierContext } from '../../../../contexts/BeneficierContext';
import { FreeButton } from '../../../../component/FreeButton';
import { FreeIconButton } from '../../../../component/FreeIconButton';
import ButtonComponent from '../../../../component/ButtonComponent';
import { ResponseOutput } from '../../../../component/ResponseOutput'
import { useNavigate } from 'react-router-dom';
import { FaSquarePlus } from 'react-icons/fa6';
import { TokenContext } from '../../../../contexts/TokenContext';



export default function Fiche08CompetenceScreen() {
    const [competenceConnaissance, setCompetenceConnaissance] = useState([]);
    const [competenceTechnique, setCompetenceTechnique] = useState([]);
    const [competenceQualite, setCompetenceQualite] = useState([]);
    const [isOpen, setIsOpen] = useState(false)

    const [connaissance, setConnaissance] = useState('');
    const [technique, setTechnique] = useState('');
    const [qualite, setQualite] = useState('');
    const [fichier, setFichier] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const navigate = useNavigate()
    const MAX_CHARACTERS = 38;

    const [RQ1, setRQ1] = useState(false)
    const [RQ2, setRQ2] = useState(false)
    const [RQ3, setRQ3] = useState(false)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)



    function validateField1() {
        const isRQ1Valid = connaissance.trim() !== '';

        setRQ1(!isRQ1Valid);

        return isRQ1Valid;
    }
    function validateField2() {
        const isRQ2Valid = technique.trim() !== '';

        setRQ2(!isRQ2Valid);

        return isRQ2Valid;
    }
    function validateField3() {

        const isRQ3Valid = qualite.trim() !== '';


        setRQ3(!isRQ3Valid);

        return isRQ3Valid;
    }


    async function fetchDataConnaissance() {
        try {
            setErrorMessage('')
            const response = await axiosClient.get(`/ficheCompetenceConnaissance?cin=${cin}`);
            console.log("competence :", JSON.stringify(response.data.ficheCompetenceConnaissance, null, 3));
            setCompetenceConnaissance(response.data.ficheCompetenceConnaissance);
            setFichier(response.data.files);

            console.log("fichier : ", response.data.files);
        } catch (e) {
            console.error("Error fetching connaissance:", e);
        }
    }

    async function fetchDataTechnique() {
        try {
            setErrorMessage('')
            const response = await axiosClient.get(`/ficheCompetenceTechnique?cin=${cin}`);
            setCompetenceTechnique(response.data.ficheCompetenceTechnique);

        } catch (e) {
            console.error("Error fetching technique:", e);
        }
    }

    async function fetchDataQualite() {
        try {
            setErrorMessage('')
            const response = await axiosClient.get(`/ficheCompetenceQualite?cin=${cin}`);
            setCompetenceQualite(response.data.ficheCompetenceQualite);
            setLoading(false)
        } catch (e) {
            console.error("Error fetching qualite:", e);
        }
    }

    const validateQua = () => {

        if (qualite.length > MAX_CHARACTERS) {
            alert("Le nombre de caractères dépasse la limite de 38 caractéres.");
            return false;
        }

        return true;
    };
    const validateCon = () => {
        if (connaissance.length > MAX_CHARACTERS) {
            alert("Le nombre de caractères dépasse la limite de 38 caractéres.");
            return false;
        }
        return true;
    };
    const validateTec = () => {
        if (technique.length > MAX_CHARACTERS) {
            alert("Le nombre de caractères dépasse la limite de 38 caractéres.");
            return false;
        }
        return true;
    };


    async function handleSubmitConnaissance(e) {
        e.preventDefault();

        if (!validateCon())
            return;

        if (!validateField1()) {
            console.log('Please fill in all required fields.');
            return;
        }
        try {
            setLoading(true)
            const formData = { connaissance };
            const response = await axiosClient.post(`/ficheCompetenceConnaissance?cin=${cin}`, formData);
            console.log("Message:", response.data.message);
            fetchDataConnaissance();
            setConnaissance("")
            setLoading(false)
        } catch (e) {
            console.error("Error adding connaissance:", e);
        }
    }

    async function handleSubmitTechnique(e) {
        e.preventDefault();

        if (!validateTec())
            return;

        if (!validateField2()) {
            console.log('Please fill in all required fields.');
            return;
        }
        try {
            setLoading(true)
            const formData = { technique };
            const response = await axiosClient.post(`/ficheCompetenceTechnique?cin=${cin}`, formData);
            console.log("Message:", response.data.message);
            fetchDataTechnique();
            setTechnique("")
            setLoading(false)
        } catch (e) {
            console.error("Error adding technique:", e);
        }
    }

    async function handleSubmitQualite(e) {
        e.preventDefault();

        if (!validateQua())
            return;

        if (!validateField3()) {
            console.log('Please fill in all required fields.');
            return;
        }
        try {
            setLoading(true)
            const formData = { qualite };
            const response = await axiosClient.post(`/ficheCompetenceQualite?cin=${cin}`, formData);
            console.log("Message:", response.data.message);
            fetchDataQualite();
            setQualite("")
            setLoading(false)
        } catch (e) {
            console.error("Error adding qualite:", e);
        }
    }

    async function deleteConnaissance(id) {
        try {
            setLoading(true)
            setErrorMessage('')
            await axiosClient.delete(`/ficheCompetenceConnaissance/${id}`);
            setCompetenceConnaissance(competenceConnaissance.filter(c => c.id !== id));
            console.log("La connaissance a été supprimée");
            setLoading(false)
        } catch (error) {
            console.error("Erreur lors de la suppression de la connaissance :", error);
        }
    }

    async function deleteTechnique(id) {
        try {
            setLoading(true)
            setErrorMessage('')
            await axiosClient.delete(`/ficheCompetenceTechnique/${id}`);
            setCompetenceTechnique(competenceTechnique.filter(c => c.id !== id));
            console.log("La Technique a été supprimée");
            setLoading(false)
        } catch (error) {
            console.error("Erreur lors de la suppression de la Technique :", error);
        }
    }

    async function deleteQualite(id) {
        try {
            setLoading(true)
            setErrorMessage('')
            await axiosClient.delete(`/ficheCompetenceQualite/${id}`);
            setCompetenceQualite(competenceQualite.filter(c => c.id !== id));
            console.log("La Qualite a été supprimée");
            setLoading(false)
        } catch (error) {
            console.error("Erreur lors de la suppression de la Qualite :", error);
        }
    }

    const telechargerFile = (fileName, type) => {

        const fileUrl = `/files/${fileName}.${type}`;

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `${fileName}.${type}`;
        link.click();
    };



    useEffect(() => {
        if (cin) {
            fetchDataConnaissance();
            fetchDataTechnique();
            fetchDataQualite();
        } else
            getToken()

    }, [cin]);

    function openPopup() {

        setIsOpen(true)
    }

    function closePopup() {
        setIsOpen(false)
    }

    async function handleSubmit() {
        const response = await axiosClient.get(`/fiche08/validation?cin=${cin}`);
        console.log("message", response.data.message)
        navigate('/BDC/fiche09')
        navigate('/BDC/fiche09')
    }

    return (
        <div className='pt-6'>
            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={closePopup}
                title={'La carte des compétences'}
                message="Voulez-vous valider la phase préliminaire ?"
                buttonVName="Oui"
                buttonCName="Non"
            />
            <ButtonComponent type="button" onClick={openPopup} color='bg-magenta'>Enregistrer</ButtonComponent>

            <h1 className="text-lg font-bold text-black mb-6">Mes Compétences</h1>
            <div className="flex flex-wrap items-center gap-4">
                {fichier && fichier.length > 0 && (
                    fichier.map((f) => (
                        <div key={f.id} className=" flex items-center gap-3">
                            {f.REM && (
                                <button
                                    onClick={() => telechargerFile(f.REM, f.typeREM)}
                                    className="bg-gray-dark text-black py-1 px-3 rounded-md hover:bg-magenta hover:text-white transition duration-300 flex items-center gap-3"
                                >
                                    {f.REM} <FaFileDownload />
                                </button>
                            )}

                            {f.REC && (
                                <button
                                    onClick={() => telechargerFile(f.REC, f.typeREC)}
                                    className="bg-gray-dark text-black py-1 px-3 rounded-md hover:bg-magenta hover:text-white transition duration-300 flex items-center gap-3"
                                >
                                    {f.REC}<FaFileDownload />
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className='relative pt-4 rounded-md'>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-light bg-opacity-75 z-10">
                        <div className="flex flex-col items-center justify-center space-y-4 opacity-100">
                            <ThreeDots
                                visible={true}
                                height="80"
                                width="80"
                                color="#92348E"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                            <span className="text-lg font-semibold text-black opacity-100">Chargement des données...</span>
                        </div>
                    </div>
                )}

                {errorMessage.trim() && (
                    <div>
                        <label htmlFor="" className="text-red-normal">
                            {errorMessage}
                        </label>
                    </div>
                )}
                <div >
                    <div className="flex flex-nowrap gap-8 justify-start">
                        <div className="bg-white w-1/3 sm:w-1/3">
                            <h2 className="font-semibold text-lg text-black">Connaissances (Savoir)</h2>
                            <form onSubmit={handleSubmitConnaissance} className="flex items-center justify-between gap-4 mb-4">
                                <input
                                    type="text"
                                    value={connaissance}
                                    onChange={(e) => setConnaissance(e.target.value)}
                                    className={`w-full sm:w-full h-12 rounded-md ${!RQ1 ? 'border border-gray-dark' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} focus:border-black p-2 font-normal text-sm`}
                                    placeholder="Ajouter une connaissance"
                                />
                                <div className="relative group flex w-auto">
                                    <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                        Ajouter
                                    </div>
                                    <FreeIconButton type={'submit'} color={`${loading ? 'bg-gray-light hover:text-white' : 'bg-magenta'}  text-white px-2 py-2`} disabled={loading}><FaSquarePlus size={20} /></FreeIconButton>
                                </div>
                            </form>
                            <ul className="list-disc mt-4 text-black">
                                {competenceConnaissance && competenceConnaissance.map((c) => (
                                    <li key={c.id} className="grid grid-cols-[95%_5%] py-1 pl-5 pr-1 w-full bg-gray-light bg-opacity-40 mb-2 rounded-md">
                                        <span className="flex items-center gap-4 font-normal text-sm">
                                            <div className='w-2 h-2 rounded-full bg-magenta'></div> {c.connaissance}
                                        </span>
                                        <div className="relative group flex w-auto">
                                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                Supprimer
                                            </div>
                                            <FreeIconButton onClick={() => deleteConnaissance(c.id)} color='text-magenta flex justify-center p-0'>
                                                <TiDeleteOutline size={25} />
                                            </FreeIconButton>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white w-1/3 sm:w-1/3">
                            <h2 className="font-semibold text-lg">Compétences techniques (Savoir Faire)</h2>
                            <form onSubmit={handleSubmitTechnique} className="flex items-center justify-between gap-4 mb-4">
                                <input
                                    type="text"
                                    value={technique}
                                    onChange={(e) => setTechnique(e.target.value)}
                                    className={`w-full sm:w-full h-12 rounded-md ${!RQ2 ? 'border border-gray-dark' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} focus:border-black p-2 font-normal text-sm`}
                                    placeholder="Ajouter une compétence technique"
                                />
                                <div className="relative group flex w-auto">
                                    <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                        Ajouter
                                    </div>
                                    <FreeIconButton type={'submit'} color={`${loading ? 'bg-gray-light hover:text-white' : 'bg-magenta'}  text-white px-2 py-2`} disabled={loading}><FaSquarePlus size={20} /></FreeIconButton>
                                </div>                            </form>
                            <ul className="list-disc mt-4 text-black">
                                {competenceTechnique && competenceTechnique.map((t) => (
                                    <li key={t.id} className="grid grid-cols-[95%_5%] py-1 pl-5 pr-1 w-full bg-gray-light bg-opacity-40 mb-2 rounded-md">
                                        <span className="flex items-center gap-4 font-normal text-sm">
                                            <div className='w-2 h-2 rounded-full bg-magenta'></div> {t.technique}
                                        </span>
                                        <div className="relative group flex w-auto">
                                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                Supprimer
                                            </div>
                                            <FreeIconButton onClick={() => deleteTechnique(t.id)} color='text-magenta flex justify-center p-0'>
                                                <TiDeleteOutline size={25} />
                                            </FreeIconButton>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white w-1/3 sm:w-1/3">
                            <h2 className="font-semibold text-lg">Qualités personnelles (Savoir Être)</h2>
                            <form onSubmit={handleSubmitQualite} className="flex items-center justify-between gap-4 mb-4">
                                <input
                                    type="text"
                                    value={qualite}
                                    onChange={(e) => setQualite(e.target.value)}
                                    className={`w-full sm:w-full h-12 rounded-md ${!RQ3 ? 'border border-gray-dark' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} focus:border-black p-2 font-normal text-sm`}
                                    placeholder="Ajouter une qualité"
                                />
                                <div className="relative group flex w-auto">
                                    <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                        Ajouter
                                    </div>
                                    <FreeIconButton type={'submit'} color={`${loading ? 'bg-gray-light hover:text-white' : 'bg-magenta'}  text-white px-2 py-2`} disabled={loading}><FaSquarePlus size={20} /></FreeIconButton>
                                </div>
                            </form>
                            <ul className="list-disc mt-4 text-black">
                                {competenceQualite && competenceQualite.map((q) => (
                                    <li key={q.id} className="grid grid-cols-[95%_5%] py-1 pl-5 pr-1 w-full bg-gray-light bg-opacity-40 mb-2 rounded-md">
                                        <span className="flex items-center gap-4 font-normal text-sm">
                                            <div className='w-2 h-2 rounded-full bg-magenta'></div> {q.qualite}
                                        </span>
                                        <div className="relative group flex w-auto">
                                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                Supprimer
                                            </div>
                                            <FreeIconButton onClick={() => deleteQualite(q.id)} color='text-magenta flex justify-center p-0'>
                                                <TiDeleteOutline size={25} />
                                            </FreeIconButton>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>



                </div>
            </div>
        </div>

    );
}
