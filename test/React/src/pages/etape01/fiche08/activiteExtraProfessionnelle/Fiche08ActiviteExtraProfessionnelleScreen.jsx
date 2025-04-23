import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../../api/axios-client';
import { MdDeleteForever } from 'react-icons/md';
import { BeneficierContext } from '../../../../contexts/BeneficierContext';
import { FreeButton } from '../../../../component/FreeButton';
import { FreeIconButton } from '../../../../component/FreeIconButton';
import { TiDeleteOutline } from 'react-icons/ti';
import ButtonComponent from '../../../../component/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../../../contexts/LanguageContext';
import { TokenContext } from '../../../../contexts/TokenContext';

export default function Fiche08ActiviteExtraProfessionnelleScreen() {
    const [description, setDescription] = useState("");
    const [frequence, setFrequence] = useState("");
    const [lieu, setLieu] = useState("");
    const [avecQui, setAvecQui] = useState("");
    const [type, setType] = useState("");
    const [parametreType, setParametreType] = useState([]);
    const [parametreFrequence, setParametreFrequence] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [activites, setActivites] = useState([]);
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { getTraduction } = useContext(LanguageContext)
    const MAX_CHARACTERS = 255;

    const [RQ1, setRQ1] = useState(false)
    const [RQ2, setRQ2] = useState(false)
    const [RQ3, setRQ3] = useState(false)
    const [RQ4, setRQ4] = useState(false)
    const [RQ5, setRQ5] = useState(false)




    function validateFields() {
        const isRQ1Valid = description.trim() !== '';
        const isRQ2Valid = frequence.trim() !== '';
        const isRQ3Valid = lieu.trim() !== '';
        const isRQ4Valid = avecQui.trim() !== '';
        const isRQ5Valid = type.trim() !== '';

        setRQ1(!isRQ1Valid);
        setRQ2(!isRQ2Valid);
        setRQ3(!isRQ3Valid);
        setRQ4(!isRQ4Valid);
        setRQ5(!isRQ5Valid);

        return isRQ1Valid && isRQ2Valid && isRQ3Valid && isRQ4Valid && isRQ5Valid;
    }


    async function fetchData() {
        const response = await axiosClient.get(`/fiche08ExtraProfessionnelle?cin=${cin}`);
        setActivites(response.data.fiche08ExtraProfessionnelle);
        setParametreType(response.data.parametreType)
        setParametreFrequence(response.data.parametreFrequence)
    }

    useEffect(() => {
        if (cin)
            fetchData();
        else
            getToken()
    }, [cin]);

    const validateData = () => {
        if (
            description.length > MAX_CHARACTERS ||
            lieu.length > MAX_CHARACTERS ||
            avecQui.length > MAX_CHARACTERS
        ) {
            alert("Le nombre de caractères dépasse la limite de 255 caractéres.");
            return false;
        }

        return true;
    };


    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateData())
            return;

        if (!validateFields()) {
            console.log('Please fill in all required fields.');
            return;
        }

        const formData = {
            description,
            frequence,
            lieu,
            avecQui,
            type
        };

        try {
            setDescription("");
            setFrequence("");
            setLieu("");
            setAvecQui("");
            setType("");

            setSuccessMessage("Activité extra-professionnelle ajoutée avec succès !");
            setErrorMessage("");

            await axiosClient.post(`/fiche08ExtraProfessionnelle?cin=${cin}`, formData);
            fetchData()
        } catch (error) {
            setErrorMessage("Une erreur est survenue, veuillez réessayer.");
            setSuccessMessage("");
        }
    }

    async function deleteActivity(id) {
        try {
            await axiosClient.delete('/fiche08ExtraProfessionnelle/' + id);
            setActivites(activites.filter(activity => activity.id !== id));
            setSuccessMessage("Activité supprimée avec succès.");
            fetchData()
        } catch (error) {
            setErrorMessage("Une erreur est survenue lors de la suppression.");
        }
    }
    const navigate = useNavigate()

    function navigator() {
        navigate('/BDC/fiche08/competence')
    }

    return (
        <div className='pt-6'>
            <ButtonComponent type="button" onClick={navigator} color='bg-magenta'>Suivant</ButtonComponent>
            <h1 className='text-lg font-bold mb-6 text-black'>
                Activités Extra-Professionnelles (Bénévolat, associatif, culturel, sportif, etc.)
            </h1>


            <form onSubmit={handleSubmit}>
                <div className=''>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex flex-col'>
                            <label htmlFor="lieu" className='font-semibold text-sm'>
                                Type d'activité <span className='text-red-normal font-semibold'>(*)</span>
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                id="type" className={`w-full sm:w-full h-12 rounded-md ${!RQ5 ? 'border border-gray-dark' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} p-2 focus:border-black font-normal text-sm`}
                            >
                                <option value="" disabled>Sélectionner le type</option>
                                {parametreType && parametreType.map((e) => (
                                    <option key={e.uuid} value={e?.valeur_id}>{getTraduction(e?.valeur_id, e)}</option>
                                ))}
                            </select>

                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="activites-principales" className='font-semibold text-sm'>
                                Description activité <span className='text-red-normal font-semibold'>(*)</span>
                            </label>
                            <input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                id="activites-principales"
                                className={`w-full sm:w-full h-12 rounded-md ${!RQ1 ? 'border border-gray-dark' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} p-2 focus:border-black font-normal text-sm`}
                                placeholder="Décrivez l'activité ici..."
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="frequence" className="font-semibold text-sm">
                                Fréquence <span className='text-red-normal font-semibold'>(*)</span>
                            </label>
                            <select
                                id="frequence"
                                value={frequence}
                                onChange={(e) => setFrequence(e.target.value)}
                                className={`w-full sm:w-full h-12 rounded-md ${!RQ2 ? 'border border-gray-dark' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} p-2 focus:border-black font-normal text-sm`}

                            >
                                <option value="" disabled>Sélectionner la fréquence</option>
                                {parametreFrequence && parametreFrequence.map((e) => (
                                    <option key={e.uuid} value={e?.valeur_id}>{getTraduction(e?.valeur_id, e)}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="lieu" className='font-semibold text-sm'>
                                Lieu <span className='text-red-normal font-semibold'>(*)</span>
                            </label>
                            <input
                                type='text'
                                value={lieu}
                                onChange={(e) => setLieu(e.target.value)}
                                id="lieu"
                                className={`w-full sm:w-full h-12 rounded-md ${!RQ3 ? 'border border-gray-dark' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} p-2 focus:border-black font-normal text-sm`}
                                placeholder="Indiquez le lieu ici..."

                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="avecQui" className='font-semibold text-sm'>
                                Avec qui <span className='text-red-normal font-semibold'>(*)</span>
                            </label>
                            <input
                                type='text'
                                id="avecQui"
                                value={avecQui}
                                onChange={(e) => setAvecQui(e.target.value)}
                                className={`w-full sm:w-full h-12 rounded-md ${!RQ4 ? 'border border-gray-dark' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} p-2 focus:border-black font-normal text-sm`}
                                placeholder="Indiquez avec qui ici..."

                            />
                        </div>



                    </div>
                </div>

                <div className="mt-2">
                    <FreeButton type='submit' color='bg-magenta'>Ajouter</FreeButton>
                </div>
            </form>


            {activites.length > 0 && (
                <div className="mt-8">
                    <h2 className="font-semibold text-base mb-4">Liste des activités ajoutées</h2>
                    <div className='relative overflow-x-auto bg-white rounded-lg'>
                        <table className="min-w-full table-auto ">
                            <thead className="bg-magenta text-white border-y-2 border-x-2 border-magenta">
                                <tr>
                                    <th className="p-3 text-left border-b border-r">Type</th>
                                    <th className="p-3 text-left border-b border-r">Description</th>
                                    <th className="p-3 text-left border-b border-r">Fréquence</th>
                                    <th className="p-3 text-left border-b border-r">Lieu</th>
                                    <th className="p-3 text-left border-b border-r">Avec Qui</th>
                                    <th className="p-3 w-10 text-left border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody className='border-x border-y border-magenta'>
                                {activites.map((activite, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-3 py-1 font-normal text-sm border-x border-y border-magenta">{getTraduction(parametreType.find((e) => (e.valeur_id === activite.type)).valeur_id, parametreType.find((e) => (e.valeur_id === activite.type)))}</td>
                                        <td className="px-3 py-1 font-normal text-sm border-x border-y border-magenta">
                                            {activite.description}</td>
                                        <td className="px-3 py-1 font-normal text-sm border-x border-y border-magenta">{activite.frequence}</td>
                                        <td className="px-3 py-1 font-normal text-sm border-x border-y border-magenta">{activite.lieu}</td>
                                        <td className="px-3 py-1 font-normal text-sm border-x border-y border-magenta">{activite.avecQui}</td>
                                        <td className="px-3 py-1 font-normal text-sm text-center border-x border-y border-magenta">
                                            <div className="relative group flex w-auto">
                                                <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                    Supprimer
                                                </div>
                                                <FreeIconButton
                                                    onClick={() => deleteActivity(activite.id)}
                                                    color='text-magenta'
                                                    hover='transparent'
                                                >
                                                    <TiDeleteOutline size={25} />
                                                </FreeIconButton>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
