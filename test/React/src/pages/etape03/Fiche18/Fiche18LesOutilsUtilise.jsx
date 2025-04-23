import React, { useState } from 'react'
import { FreeButton } from '../../../component/FreeButton'
import { FreeIconButton } from '../../../component/FreeIconButton'
import { TiDeleteOutline } from 'react-icons/ti'
import axiosClient from '../../../api/axios-client'
import { FaSquarePlus } from 'react-icons/fa6'

export const Fiche18LesOutilsUtilise = ({ setRefreshData, experienceId, categories1, categories2, categories3, categories4, fiche }) => {

    const [categorie1, setCategorie1] = useState("")
    const [categorie2, setCategorie2] = useState("")
    const [categorie3, setCategorie3] = useState("")
    const [categorie4, setCategorie4] = useState("")

    const [RQ1, setRQ1] = useState(false)
    const [RQ2, setRQ2] = useState(false)
    const [RQ3, setRQ3] = useState(false)
    const [RQ4, setRQ4] = useState(false)

    const [loading, setLoading] = useState(true)



    async function handleCategorie1() {
        if (!fiche || !fiche.id || !fiche.cin) {
            console.error("Fiche ID ou CIN manquant !");
            return;
        }

        const data = {
            cin: fiche.cin,
            poste_intitule_id: experienceId,
            categorie1
        };

        try {
            console.log("Envoi des données : ", JSON.stringify(data, null, 3));
            const response = await axiosClient.post(`/fiche18/categorie1/${fiche.id}`, data);

            console.log("Réponse du serveur :", response.data.message);
            setRefreshData(prev => !prev);
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error.response?.data?.message || error.message);
        } finally {

            setCategorie1("")
        }
    }

    async function deleteCategorie1(categorie_id) {
        try {
            const response = await axiosClient.delete(`/fiche18/categorie1/${categorie_id}/delete`);

            setRefreshData(prev => !prev);
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error.response?.data?.message || error.message);
        }
    }
    async function deleteCategorie2(categorie_id) {
        try {
            const response = await axiosClient.delete(`/fiche18/categorie2/${categorie_id}/delete`);

            setRefreshData(prev => !prev);
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error.response?.data?.message || error.message);
        }
    }
    async function deleteCategorie3(categorie_id) {
        try {
            const response = await axiosClient.delete(`/fiche18/categorie3/${categorie_id}/delete`);

            setRefreshData(prev => !prev);
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error.response?.data?.message || error.message);
        }
    }
    async function deleteCategorie4(categorie_id) {
        try {
            const response = await axiosClient.delete(`/fiche18/categorie4/${categorie_id}/delete`);

            setRefreshData(prev => !prev);
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error.response?.data?.message || error.message);
        }
    }

    async function handleCategorie2() {
        if (!fiche || !fiche.id || !fiche.cin) {
            console.error("Fiche ID ou CIN manquant !");
            return;
        }

        const data = {
            cin: fiche.cin,
            poste_intitule_id: experienceId,
            categorie2
        };

        try {
            console.log("Envoi des données : ", JSON.stringify(data, null, 3));
            const response = await axiosClient.post(`/fiche18/categorie2/${fiche.id}`, data);

            console.log("Réponse du serveur :", response.data.message);
            setRefreshData(prev => !prev);
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error.response?.data?.message || error.message);
        } finally {
            setCategorie2("")
        }
    }

    async function handleCategorie3() {
        if (!fiche || !fiche.id || !fiche.cin) {
            console.error("Fiche ID ou CIN manquant !");
            return;
        }

        const data = {
            cin: fiche.cin,
            poste_intitule_id: experienceId,
            categorie3
        };
        console.log("Envoi des données : ", JSON.stringify(data, null, 3));

        try {
            console.log("Envoi des données : ", JSON.stringify(data, null, 3));
            const response = await axiosClient.post(`/fiche18/categorie3/${fiche.id}`, data);

            console.log("Réponse du serveur :", response.data.message);
            setRefreshData(prev => !prev);
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error.response?.data?.message || error.message);
        } finally {
            setCategorie3("")
        }
    }

    async function handleCategorie4() {
        if (!fiche || !fiche.id || !fiche.cin) {
            console.error("Fiche ID ou CIN manquant !");
            return;
        }

        const data = {
            cin: fiche.cin,
            poste_intitule_id: experienceId,
            categorie4
        };

        try {
            console.log("Envoi des données : ", JSON.stringify(data, null, 3));
            const response = await axiosClient.post(`/fiche18/categorie4/${fiche.id}`, data);

            console.log("Réponse du serveur :", response.data.message);
            setRefreshData(prev => !prev);
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error.response?.data?.message || error.message);
        } finally {
            setCategorie4("")
        }
    }

    return (
        <div >
            <div className="flex flex-nowrap gap-8 justify-start">
                <div className=" w-1/3 sm:w-1/3">
                    <h2 className="font-medium text-sm text-black">Categorie 1</h2>
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <input
                            type="text"
                            value={categorie1}
                            onChange={(e) => setCategorie1(e.target.value)}
                            className={`w-full sm:w-full h-12 rounded-md border-gray-dark ${!RQ1 ? 'border-2' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} p-2 font-normal text-sm border border-gray-dark focus:border-black`}
                            placeholder="Ajouter une connaissance"
                        />
                        <div className="relative group flex w-auto">
                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                Ajouter
                            </div>
                            <FreeIconButton color={'bg-magenta text-white px-2 py-2'} onClick={handleCategorie1}><FaSquarePlus size={20} /></FreeIconButton>
                        </div>
                    </div>
                    <ul className="list-disc mt-4 text-black">
                        {categories1 && categories1.map((c) => (
                            <li key={c.id} className="flex items-center justify-between py-1 pl-5 pr-1 w-full bg-white bg-opacity-80 mb-2 rounded-md">
                                <span className="flex items-center gap-4 font-normal text-sm">
                                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {c.categorie1}
                                </span>

                                <div className="relative group flex w-auto">
                                    <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                        Supprimer
                                    </div>
                                    <FreeIconButton onClick={() => deleteCategorie1(c.id)} color='text-magenta flex justify-center p-0'>
                                        <TiDeleteOutline size={25} />
                                    </FreeIconButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className=" w-1/3 sm:w-1/3">
                    <h2 className="font-medium text-sm">Categorie 2</h2>
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <input
                            type="text"
                            value={categorie2}
                            onChange={(e) => setCategorie2(e.target.value)}
                            className={`w-full sm:w-full h-12 rounded-md border-gray-dark ${!RQ2 ? 'border-2' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} p-2 font-normal text-sm border border-gray-dark focus:border-black`}
                            placeholder="Ajouter une compétence technique"
                        />
                        <div className="relative group flex w-auto">
                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                Ajouter
                            </div>
                            <FreeIconButton color={'bg-magenta text-white px-2 py-2'} onClick={handleCategorie2}><FaSquarePlus size={20} /></FreeIconButton>
                        </div>
                    </div>
                    <ul className="list-disc mt-4 text-black">
                        {categories2 && categories2.map((c) => (
                            <li key={c.id} className="flex items-center justify-between py-1 pl-5 pr-1 w-full bg-white bg-opacity-80 mb-2 rounded-md">
                                <span className="flex items-center gap-4 font-normal text-sm">
                                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {c.categorie2}
                                </span>

                                <div className="relative group flex w-auto">
                                    <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                        Supprimer
                                    </div>
                                    <FreeIconButton onClick={() => deleteCategorie2(c.id)} color='text-magenta flex justify-center p-0'>
                                        <TiDeleteOutline size={25} />
                                    </FreeIconButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className=" w-1/3 sm:w-1/3">
                    <h2 className="font-medium text-sm">Categorie 3</h2>
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <input
                            type="text"
                            value={categorie3}
                            onChange={(e) => setCategorie3(e.target.value)}
                            className={`w-full sm:w-full h-12 rounded-md border-gray-dark ${!RQ3 ? 'border-2' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} p-2 font-normal text-sm border border-gray-dark focus:border-black`}
                            placeholder="Ajouter une qualité"
                        />
                        <div className="relative group flex w-auto">
                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                Ajouter
                            </div>
                            <FreeIconButton color={'bg-magenta text-white px-2 py-2'} onClick={handleCategorie3}><FaSquarePlus size={20} /></FreeIconButton>
                        </div>
                    </div>
                    <ul className="list-disc mt-4 text-black">
                        {categories3 && categories3.map((c) => (
                            <li key={c.id} className="flex items-center justify-between py-1 pl-5 pr-1 w-full bg-white bg-opacity-80 mb-2 rounded-md">
                                <span className="flex items-center gap-4 font-normal text-sm">
                                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {c.categorie3}
                                </span>

                                <div className="relative group flex w-auto">
                                    <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                        Supprimer
                                    </div>
                                    <FreeIconButton onClick={() => deleteCategorie3(c.id)} color='text-magenta flex justify-center p-0'>
                                        <TiDeleteOutline size={25} />
                                    </FreeIconButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className=" w-1/3 sm:w-1/3">
                    <h2 className="font-medium text-sm">Categorie 4</h2>
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <input
                            type="text"
                            value={categorie4}
                            onChange={(e) => setCategorie4(e.target.value)}
                            className={`w-full sm:w-full h-12 rounded-md border-gray-dark ${!RQ4 ? 'border-2' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'} p-2 font-normal text-sm border border-gray-dark focus:border-black`}
                            placeholder="Ajouter une qualité"
                        />
                        <div className="relative group flex w-auto">
                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                Ajouter
                            </div>
                            <FreeIconButton color={'bg-magenta text-white px-2 py-2'} onClick={handleCategorie4}><FaSquarePlus size={20} /></FreeIconButton>
                        </div>
                    </div>
                    <ul className="list-disc mt-4 text-black">
                        {categories4 && categories4.map((c) => (
                            <li key={c.id} className="flex items-center justify-between py-1 pl-5 pr-1 w-full bg-white bg-opacity-80 mb-2 rounded-md">
                                <span className="flex items-center gap-4 font-normal text-sm">
                                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {c.categorie4}
                                </span>

                                <div className="relative group flex w-auto">
                                    <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                        Supprimer
                                    </div>
                                    <FreeIconButton onClick={() => deleteCategorie4(c.id)} color='text-magenta flex justify-center p-0'>
                                        <TiDeleteOutline size={25} />
                                    </FreeIconButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
