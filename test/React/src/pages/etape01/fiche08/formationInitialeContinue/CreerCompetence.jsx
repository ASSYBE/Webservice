import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axiosClient from '../../../../api/axios-client';
import { BeneficierContext } from '../../../../contexts/BeneficierContext';
import { FreeButton } from '../../../../component/FreeButton';

export default function CreerCompetence({ isOpen, cin, onClose, uuid_parameter_formation, competenceId, setIsLoading, fetchData, nomAgent, isLoading }) {
    if (!isOpen) return null;

    const [connaissance, setConnaissance] = useState("");
    const [autoEvaluationMaitrise, setAutoEvaluationMaitrise] = useState("");
    const [autoEvaluationInteret, setAutoEvaluationInteret] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    useEffect(() => {
        if (competenceId) {
            axiosClient
                .get(`/fiche08Connaissance/${competenceId}?cin=${cin}`)
                .then((response) => {
                    const { connaissance, autoEvaluationMaitrise, autoEvaluationInteret } = response.data;
                    setConnaissance(connaissance);
                    setAutoEvaluationMaitrise(autoEvaluationMaitrise);
                    setAutoEvaluationInteret(autoEvaluationInteret);
                })
                .catch((error) => {
                    setErrorMessage("Erreur lors du chargement des données");
                });
        }
    }, [competenceId]);

    const MAX_CHARACTERS = 255;

    const validateFields = () => {
        if (
            connaissance.length > MAX_CHARACTERS
        ) {
            alert("Le nombre de caractères dépasse la limite de 255 caractéres.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields())
            return;

        if (!connaissance || !autoEvaluationMaitrise || !autoEvaluationInteret) {
            setErrorMessage("Tous les champs doivent être remplis");
            setSuccessMessage("");
            return;
        }

        const formData = {
            uuid_parameter_formation,
            connaissance,
            autoEvaluationMaitrise,
            autoEvaluationInteret,
        };

        try {
            setIsLoading(true)
            if (competenceId) {
                await axiosClient.put(`/fiche08Connaissance/${competenceId}`, formData);
                setSuccessMessage("Compétence mise à jour avec succès!");
            } else {
                await axiosClient.post(`/fiche08Connaissance?cin=${cin}&nom=${nomAgent}`, formData);
                setSuccessMessage("Compétence créée avec succès!");
            }
            fetchData()
            setErrorMessage("");
            setIsLoading(false)
            onClose();
        } catch (error) {
            setErrorMessage("Une erreur est survenue, veuillez réessayer");
            setSuccessMessage("");
        }
    }

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-6 text-black">Formulaire de Competence</h1>

                {errorMessage && <div className="text-red-normal text-sm mb-4">{errorMessage}</div>}
                {successMessage && <div className="text-greentext-sm mb-4">{successMessage}</div>}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="connaissance" className="text-lg font-semibold text-black mb-2">
                            Connaissance
                        </label>
                        <input
                            type="text"
                            id="connaissance"
                            value={connaissance}
                            onChange={(e) => setConnaissance(e.target.value)}
                            className="w-full h-12 border border-gray-dark focus:border-black text-sm rounded-md px-4 py-2 "
                            placeholder="Entrez la rubrique"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="maitrise" className="text-lg font-semibold text-black mb-2">
                            Maitrise
                        </label>
                        <select
                            id="maitrise"
                            className="w-full h-12 border border-gray-dark focus:border-black text-sm rounded-md px-4 py-2 "
                            value={autoEvaluationMaitrise}
                            onChange={(e) => setAutoEvaluationMaitrise(e.target.value)}
                        >
                            <option value="" disabled>Maitrise</option>

                            <option value="+">+</option>
                            <option value="++">+ +</option>
                            <option value="-">-</option>
                            <option value="--">- -</option>

                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="interet" className="text-lg font-semibold text-black mb-2">
                            Intérêt
                        </label>
                        <select
                            id="interet"
                            className="w-full h-12 border border-gray-dark focus:border-black text-sm rounded-md px-4 py-2 "
                            value={autoEvaluationInteret}
                            onChange={(e) => setAutoEvaluationInteret(e.target.value)}
                        >
                            <option value="" disabled>Intérêt</option>

                            <option value="+">+</option>
                            <option value="++">+ +</option>
                            <option value="-">-</option>
                            <option value="--">- -</option>

                        </select>
                    </div>

                    <div className="flex justify-between">

                        <FreeButton onClick={onClose} color='bg-gray-dark text-black'>Annuler</FreeButton>
                        <FreeButton type='submit' color='bg-magenta' disabled={isLoading}>Ajouter</FreeButton>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
