import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axiosClient from '../../../api/axios-client';
import { FreeButton } from '../../../component/FreeButton';

const CreateAgenda = ({ isOpen, cin, onClose, agenda = null, typeRDV, nomAgent }) => {
    if (!isOpen) return null;

    const [objet, setObjet] = useState('');
    const [date_RDV, setDateRDV] = useState('');
    const [heure_RDV_debut, setHeureRDVDebut] = useState('');
    const [heure_RDV_fin, setHeureRDVFin] = useState('');
    const [type_RDV, setTypeRDV] = useState(typeRDV && typeRDV.length > 0 ? typeRDV[0]?.value_id : '');
    // const [statut, setStatut] = useState('');
    const [commentaire, setCommentaire] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [present, setPresent] = useState(false)

    useEffect(() => {
        if (agenda) {
            setObjet(agenda.objet);
            setDateRDV(agenda.date_RDV);
            setHeureRDVDebut(agenda.heure_RDV_debut);
            setHeureRDVFin(agenda.heure_RDV_fin);
            setTypeRDV(agenda.type_RDV);
            setCommentaire(agenda.commentaire || '');
            setPresent(agenda?.present == '0' ? false : true);
        }
    }, [agenda]);

    const MAX_CHARACTERS = 100;

    const validateFields = () => {
        if (
            objet.length > MAX_CHARACTERS ||
            commentaire.length > MAX_CHARACTERS
        ) {
            alert("Le nombre de caractères dépasse la limite de 100 caractéres.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateFields())
            return;

        const formData = {
            objet,
            date_RDV,
            heure_RDV_debut,
            heure_RDV_fin,
            type_RDV,
            commentaire,
            present
        };

        console.log("agenda : ", JSON.stringify(formData, null, 3))

        try {
            const endpoint = agenda ? `/agenda/${agenda.id}/update?cin=${cin}` : `/agenda?cin=${cin}&nom=${nomAgent}`;
            const method = agenda ? 'put' : 'post';
            await axiosClient[method](endpoint, formData);
            onClose();
        } catch (err) {
            setError('Une erreur est survenue : ' + (err.response?.data?.message || err.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-lg w-full">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    {agenda ? 'Modifier un Rendez-vous' : 'Ajouter un Rendez-vous'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Activité</label>
                        <input
                            type="text"
                            name="objet"
                            value={objet}
                            onChange={(e) => setObjet(e.target.value)}
                            className="border text-sm rounded-md w-full px-4 py-2 border-gray-dark focus:border-black"
                            placeholder="Entrez l'objet du rendez-vous"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            name="date_RDV"
                            value={date_RDV}
                            onChange={(e) => setDateRDV(e.target.value)}
                            className="border text-sm rounded-md w-full px-4 py-2 border-gray-dark focus:border-black"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Heure Début</label>
                        <input
                            type="time"
                            name="heure_RDV_debut"
                            value={heure_RDV_debut}
                            onChange={(e) => setHeureRDVDebut(e.target.value)}
                            className="border text-sm rounded-md w-full px-4 py-2 border-gray-dark focus:border-black"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Heure Fin</label>
                        <input
                            type="time"
                            name="heure_RDV_fin"
                            value={heure_RDV_fin}
                            onChange={(e) => setHeureRDVFin(e.target.value)}
                            className="border text-sm rounded-md w-full px-4 py-2 border-gray-dark focus:border-black"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Type de RDV</label>
                        <select
                            name="typeRDV"
                            value={type_RDV}
                            onChange={(e) => setTypeRDV(e.target.value)}
                            className="border text-sm rounded-md w-full px-4 py-2 border-gray-dark focus:border-black"
                        >
                            {typeRDV && typeRDV.length > 0 && typeRDV.map((e) => (
                                <option key={e.uuid} value={e.value_id}>
                                    {e.FR}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Commentaire</label>
                        <textarea
                            name="commentaire"
                            value={commentaire}
                            onChange={(e) => setCommentaire(e.target.value)}
                            className="border text-sm rounded-md w-full px-4 py-2 border-gray-dark focus:border-black"
                            placeholder="Ajouter un commentaire"
                        />
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center justify-end">
                            <input
                                className="w-5 h-5 mr-3"
                                type="checkbox"
                                checked={present}
                                onChange={(e) => setPresent(e.target.checked)}
                            />
                            <label className="text-sm font-medium text-black">Present</label>
                        </div>

                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex justify-between space-x-4 mt-4">
                        <FreeButton onClick={onClose} color='bg-gray-dark text-black'>Annuler</FreeButton>
                        <FreeButton type='submit' color='bg-magenta'>{agenda ? 'Modifier' : 'Ajouter'}</FreeButton>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default CreateAgenda;
