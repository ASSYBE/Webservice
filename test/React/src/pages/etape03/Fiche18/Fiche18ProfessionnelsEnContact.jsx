import React, { useContext, useState } from 'react'
import Select, { useStateManager } from 'react-select';
import { FreeButton } from '../../../component/FreeButton';
import { FreeIconButton } from '../../../component/FreeIconButton';
import { TiDeleteOutline } from 'react-icons/ti';
import { LanguageContext } from '../../../contexts/LanguageContext';
import axiosClient from '../../../api/axios-client';
import { FaSquarePlus } from 'react-icons/fa6';


export const Fiche18ProfessionnelsEnContact = ({ fiche, setRefreshData, experienceId, options, professions, parametreProfession, RQ2 }) => {
    const { language, getTraduction } = useContext(LanguageContext);
    const [profession, setProfession] = useState("")

    async function handleProfession() {
        if (!fiche || !fiche.id || !fiche.cin) {
            console.error("Fiche ID ou CIN manquant !");
            return;
        }

        const data = {
            poste_intitule_id: experienceId,
            profession
        };

        try {
            console.log("Envoi des données : ", JSON.stringify(data, null, 3));
            const response = await axiosClient.post(`/fiche18/profession/${fiche.id}?cin=${fiche.cin}`, data);

            console.log("Réponse du serveur :", response.data.message);
            setRefreshData(prev => !prev);
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error.response?.data?.message || error.message);
        }
    }

    async function deleteProfession(profession_id) {
        try {
            const response = await axiosClient.delete(`/fiche18/profession/${profession_id}/delete`);

            setRefreshData(prev => !prev);
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error.response?.data?.message || error.message);
        }
    }


    return (
        <div>
            <div className="flex items-center justify-between gap-2 mb-4">

                <Select
                    id="metierValide"
                    name="metierValide"
                    className={`w-full sm:w-full rounded-md border border-gray-dark focus:border-black`}
                    value={options.find(option => option.value === profession)}
                    onChange={(selectedOption) => setProfession(selectedOption.value)}
                    options={options}
                    placeholder="Recherchez un métier"
                />
                <div className="relative group flex w-auto">
                    <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                        Ajouter
                    </div>
                    <FreeIconButton color={'bg-magenta text-white px-2 py-2'} onClick={handleProfession}><FaSquarePlus size={20} /></FreeIconButton>
                </div>
            </div>
            <ul className="list-disc mt-4 text-black">
                {professions && professions.map((t, index) => (
                    <li key={t.id} className="flex items-center justify-between py-1 pl-5 pr-1 w-full bg-white bg-opacity-80 mb-2 rounded-md">
                        <span className="flex items-center gap-4 font-normal text-sm">
                            <div className='w-2 h-2 rounded-full bg-magenta'></div>
                            {getTraduction(parametreProfession.find((e) => (e.valeur_id === t.profession)).valeur_id, parametreProfession.find((e) => (e.valeur_id === t.profession)))}
                        </span>
                        <div className="relative group flex w-auto">
                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                Supprimer
                            </div>
                            <FreeIconButton onClick={() => deleteProfession(t.id)} color='text-magenta flex justify-center p-0'>
                                <TiDeleteOutline size={25} />
                            </FreeIconButton>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
