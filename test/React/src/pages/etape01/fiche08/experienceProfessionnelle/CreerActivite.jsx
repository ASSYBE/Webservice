import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import axiosClient from '../../../../api/axios-client';
import { FreeButton } from '../../../../component/FreeButton';


export default function CreerActivite({ cin, isOpen, onClose, setIsLoading, fetchData, isLoading }) {

    const [IntitulePoste, setIntitulePoste] = useState("")
    const [activiteExercee, setActiviteExercee] = useState("")
    const [periode_debut, setPeriode_debut] = useState("")
    const [periode_fin, setPeriode_fin] = useState("")
    const [circonstanceInterruption, setCirconstanceInterruption] = useState("")

    const MAX_CHARACTERS = 255;
    const MAX_IntitulePoste = 50;

    const validateFields = () => {
        if (IntitulePoste.length > MAX_IntitulePoste) {
            alert("Le nombre de caractères pour 'Intitulé Poste' dépasse la limite de 10 caractères.");
            return false;
        }
        if (activiteExercee.length > MAX_CHARACTERS) {
            alert("Le nombre de caractères pour 'Activité Exerçée' dépasse la limite de 255 caractères.");
            return false;
        }
        if (circonstanceInterruption.length > MAX_CHARACTERS) {
            alert("Le nombre de caractères pour 'Circonstance Interruption' dépasse la limite de 255 caractères.");
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateFields()) {
            return;
        }

        setIsLoading(true)
        const formData = {
            IntitulePoste,
            activiteExercee,
            periode_debut,
            periode_fin,
            circonstanceInterruption
        }
        onClose()
        await axiosClient.post(`/fiche08ExperienceProfessionnelle?cin=${cin}`, formData);

        console.log("data : ", formData)
        setIntitulePoste("")
        setActiviteExercee("")
        setCirconstanceInterruption("")
        setPeriode_debut("")
        setPeriode_fin("")
        fetchData()
        setIsLoading(false)

    }




    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h1 className="text-2xl font-bold mb-6 text-black">Formulaire d'experience professionnelle</h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="rubrique" className="text-lg font-semibold text-black mb-2">
                            Intitulé du poste
                        </label>
                        <input
                            type="text"
                            id="nPoste"
                            required
                            value={IntitulePoste}
                            onChange={(e) => setIntitulePoste(e.target.value)}
                            className="w-full h-12 border rounded-md px-4 py-2 text-black border-gray-dark focus:border-black text-sm"
                            placeholder="Entrez la rubrique"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="source" className="text-lg font-semibold text-black mb-2">
                            Activité exercée (Qualification, type d’entreprise, secteur d’activité, type de contrat)
                        </label>
                        <input
                            type="text"
                            id="activite"
                            required
                            value={activiteExercee}
                            onChange={(e) => setActiviteExercee(e.target.value)}
                            className="w-full h-12 border rounded-md px-4 py-2 text-black border-gray-dark focus:border-black text-sm"
                            placeholder="Entrez la source"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="type" className="text-lg font-semibold text-black mb-2">
                            Date début
                        </label>
                        <input
                            type='date'
                            id="periode_debut"
                            required
                            value={periode_debut}
                            onChange={(e) => setPeriode_debut(e.target.value)}
                            className="w-full h-12 border rounded-md px-4 py-2 text-black border-gray-dark focus:border-black text-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="type" className="text-lg font-semibold text-black mb-2">
                            Date fin
                        </label>
                        <input
                            type='date'
                            id="periode_fin"
                            value={periode_fin}
                            onChange={(e) => setPeriode_fin(e.target.value)}
                            className="w-full h-12 border rounded-md px-4 py-2 text-black border-gray-dark focus:border-black text-sm"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="circonstance" className="text-lg font-semibold text-black mb-2">
                            CIRCONSTANCE DE L’INTERRUPTION DU RAPPORT
                        </label>
                        <textarea
                            id="circonstance"
                            value={circonstanceInterruption}
                            required
                            onChange={(e) => setCirconstanceInterruption(e.target.value)}
                            className="w-full h-32 border rounded-md px-4 py-2 text-black border-gray-dark focus:border-black text-sm"
                            placeholder="Entrez une remarque"
                        />
                    </div>

                    <div className="flex justify-between">
                        <FreeButton onClick={onClose} color='bg-gray-dark text-black'>Annuler</FreeButton>
                        <FreeButton type='submit' color='bg-magenta' disabled={isLoading}>Ajouter</FreeButton>
                    </div>
                </form>
            </div>
        </div>
        , document.body
    )
}
