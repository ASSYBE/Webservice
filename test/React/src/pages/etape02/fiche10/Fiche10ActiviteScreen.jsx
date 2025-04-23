import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axios-client';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import ButtonComponent from '../../../component/ButtonComponent';
import { ResponseOutput } from '../../../component/ResponseOutput';
import { FaFileDownload } from 'react-icons/fa';
import { TokenContext } from '../../../contexts/TokenContext';


export default function Fiche10ActiviteScreen() {
    const [entreprise, setEntreprise] = useState('');
    const [service, setService] = useState('');
    const [activite_principale, setActivite_principale] = useState('');
    const [activite_autre, setActivite_autre] = useState('');
    const [probleme, setProbleme] = useState('');
    const [fiche, setFiche] = useState({});
    const [fichier, setFichier] = useState([]);

    const [RQ1, setRQ1] = useState(false)
    const [RQ2, setRQ2] = useState(false)
    const [RQ3, setRQ3] = useState(false)
    const [RQ4, setRQ4] = useState(false)
    const [RQ5, setRQ5] = useState(false)

    const { language, getTraduction } = useContext(LanguageContext);
    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate();

    const MAX_CHARACTERS = 255;

    const validateData = () => {
        if (
            entreprise.length > MAX_CHARACTERS ||
            service.length > MAX_CHARACTERS ||
            activite_principale.length > MAX_CHARACTERS ||
            activite_autre.length > MAX_CHARACTERS ||
            probleme.length > MAX_CHARACTERS
        ) {
            alert("Le nombre de caractères dépasse la limite de 255 caractères.");
            return false;
        }

        return true;
    };

    function validateFields() {
        const isRQ1Valid = entreprise.trim() !== '';
        const isRQ2Valid = service.trim() !== '';
        const isRQ3Valid = activite_principale.trim() !== '';
        const isRQ4Valid = activite_autre.trim() !== '';
        const isRQ5Valid = probleme.trim() !== '';

        setRQ1(!isRQ1Valid);
        setRQ2(!isRQ2Valid);
        setRQ3(!isRQ3Valid);
        setRQ4(!isRQ4Valid);
        setRQ5(!isRQ5Valid);


        console.log("RQ1:", isRQ1Valid)
        console.log("RQ2:", isRQ2Valid)
        console.log("RQ3:", isRQ3Valid)
        return isRQ1Valid && isRQ2Valid && isRQ3Valid && isRQ4Valid && isRQ5Valid;
    }


    async function fetchData() {
        try {
            const response = await axiosClient.get(`/fiche10?cin=${cin}`);

            if (response.data) {
                const { fiche, fiche8analysePoste } = response.data;

                setFiche(fiche);
                setEntreprise(fiche?.entreprise || beneficier?.entreprise);
                setService(fiche?.service);
                setActivite_autre(fiche.activite_autre || fiche8analysePoste?.activitesSecondaires);
                setProbleme(fiche.probleme || fiche8analysePoste?.problemesRencontres);
                setFichier(response.data.file);
                setActivite_principale(fiche?.activite_principale || fiche8analysePoste?.activitesPrincipales);
            }
        } catch (error) {
            console.error("Erreur de récupération des données : ", error);
        }
    }


    async function handleSubmit() {

        if (!validateData())
            return;

        if (
            !entreprise ||
            !service ||
            !activite_autre ||
            !probleme
        ) {
            console.error("Tous les champs doivent être remplis.");
            alert("Veuillez remplir tous les champs avant de soumettre.");
            return;
        }

        const formData = {
            entreprise,
            service,
            activite_principale,
            activite_autre,
            probleme
        };

        console.log("Données soumises : ", formData);

        try {
            const response = await axiosClient.put(`/fiche10/${fiche.id}/update?cin=${cin}`, formData);
            navigate('/BDC/fiche10/decisions');
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
        }
    }

    function openPopup() {
        if (!validateFields())
            return;

        setIsOpen(true)
    }

    const telechargerFile = (fileName, type) => {

        const fileUrl = `/files/${fileName}.${type}`;

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `${fileName}.${type}`;
        link.click();
    };

    useEffect(() => {
        if (cin)
            fetchData()
        else
            getToken()
    }, [cin]);

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="text-lg font-semibold my-4">Les activités que je fais</h1>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div >
                    <label className="block font-medium text-sm" htmlFor="entreprise">
                        L'entreprise dans laquelle je travaille (Nom, taille, siège social, secteur d'activité) :
                    </label>

                    <input
                        type="text"
                        id="service"
                        value={entreprise}
                        onChange={(e) => setEntreprise(e.target.value)}
                        placeholder="Exemple: Marketing, Développeur Front-end"
                        className={` w-full md:w-full px-3 py-3 border font-normal text-sm rounded-lg ${!RQ1 ? '' : 'border-red-normal bg-red-normal bg-opacity-20'} border-gray-dark focus:border-black`}
                    />
                </div>

                <div>
                    <label className="block font-medium text-sm" htmlFor="service">
                        Le service / département dans lequel je travaille et le rôle que je joue
                    </label>
                    <input
                        type="text"
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        placeholder="Exemple: Marketing, Développeur Front-end"
                        className={` w-full md:w-full px-3 py-3 border font-normal text-sm rounded-lg ${!RQ2 ? '' : 'border-red-normal bg-red-normal bg-opacity-20'} border-gray-dark focus:border-black`}
                    />
                </div>
            </div>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-medium text-sm" htmlFor="activites">
                        Activités principales
                    </label>
                    <input
                        type="text"
                        id="activitePrincipale"
                        value={activite_principale}
                        onChange={(e) => setActivite_principale(e.target.value)}
                        placeholder="Exemple: Marketing, Développeur Front-end"
                        className={` w-full md:w-full px-3 py-3 border font-normal text-sm rounded-lg ${!RQ3 ? '' : 'border-red-normal bg-red-normal bg-opacity-20'} border-gray-dark focus:border-black`}
                    />
                </div>
                <div></div>

            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-center'>
                <div className="w-full">
                    <label className="block font-medium text-sm" htmlFor="autresActivites">
                        Autres activités
                    </label>
                    <textarea
                        id="autresActivites"
                        value={activite_autre}
                        onChange={(e) => setActivite_autre(e.target.value)}
                        placeholder="Décrivez vos autres activités ici..."
                        rows={4}
                        className={` w-full md:w-full px-3 py-3 border font-normal text-sm rounded-lg ${!RQ4 ? '' : 'border-red-normal bg-red-normal bg-opacity-20'} border-gray-dark focus:border-black`}
                    ></textarea>
                </div>

                <div className="w-full">
                    <label className="block font-medium text-sm" htmlFor="problemes">
                        Les problèmes que je dois affronter et résoudre
                    </label>
                    <textarea
                        id="problemes"
                        value={probleme}
                        onChange={(e) => setProbleme(e.target.value)}
                        placeholder="Décrivez les problèmes que vous devez résoudre..."
                        rows={4}
                        className={` w-full md:w-full px-3 py-3 border font-normal text-sm rounded-lg ${!RQ5 ? '' : 'border-red-normal bg-red-normal bg-opacity-20'} border-gray-dark focus:border-black`}
                    ></textarea>
                </div>
            </div>

            <div className="text-end mt-8">
                <div className="text-center">
                    <ButtonComponent type='button' color={`bg-magenta`} onClick={openPopup}>
                        {getTraduction(`Enregistrer`, { FR: `Enregistrer`, AR: `التالي`, EN: `Next` })}
                    </ButtonComponent>
                </div>
            </div>
            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={"Les activités que je fais"}
                message="Voulez-vous enregistrer ?"
                buttonVName="Oui"
                buttonCName="Non"
            />
        </form>
    )
}
