import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axios-client';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import ButtonComponent from '../../../component/ButtonComponent';
import { ResponseOutput } from '../../../component/ResponseOutput';
import { ButtonsComponent } from '../../../component/ButtonsComponent';
import { TokenContext } from '../../../contexts/TokenContext';

export default function Fiche10DecisionScreen() {

    const [decision_autonomie, setDecision_autonomie] = useState('');
    const [decision_autre, setDecision_autre] = useState('');
    const [decision_techno_outils, setDecision_techno_outils] = useState('');
    const [decision_personne_entreprise, setDecision_personne_entreprise] = useState('');
    const [decision_personne_hors_entreprise, setDecision_personne_hors_entreprise] = useState('');
    const [isOpen, setIsOpen] = useState(false)

    const [RQ1, setRQ1] = useState(false)
    const [RQ2, setRQ2] = useState(false)
    const [RQ3, setRQ3] = useState(false)
    const [RQ4, setRQ4] = useState(false)
    const [RQ5, setRQ5] = useState(false)


    const [fiche, setFiche] = useState({});

    const { language, getTraduction } = useContext(LanguageContext);
    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    const navigate = useNavigate();

    const MAX_CHARACTERS = 255;

    const validateData = () => {
        if (
            decision_autonomie.length > MAX_CHARACTERS ||
            decision_autre.length > MAX_CHARACTERS ||
            decision_techno_outils.length > MAX_CHARACTERS ||
            decision_personne_entreprise.length > MAX_CHARACTERS ||
            decision_personne_hors_entreprise.length > MAX_CHARACTERS) {
            alert("Le nombre de caractères dépasse la limite de 255 caractéres.");
            return false;
        }

        return true;
    };

    function validateFields() {
        const isRQ1Valid = decision_autonomie.trim() !== "";
        const isRQ2Valid = decision_autre.trim() !== "";
        const isRQ3Valid = decision_techno_outils.trim() !== "";
        const isRQ4Valid = decision_personne_entreprise.trim() !== "";
        const isRQ5Valid = decision_personne_hors_entreprise.trim() !== "";

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
                const {
                    fiche,
                } = response.data;
                setFiche(fiche)
                setDecision_autonomie(fiche.decision_autonomie)
                setDecision_autre(fiche.decision_autre)
                setDecision_techno_outils(fiche.decision_techno_outils)
                setDecision_personne_entreprise(fiche.decision_personne_entreprise)
                setDecision_personne_hors_entreprise(fiche.decision_personne_hors_entreprise)

            }
        } catch (error) {
            console.error("Erreur de récupération des données : ", error);
        }
    }

    async function handleSubmit() {

        if (!validateData())
            return;

        if (
            !decision_autonomie ||
            !decision_autre ||
            !decision_techno_outils ||
            !decision_personne_entreprise ||
            !decision_personne_hors_entreprise
        ) {
            console.error("Tous les champs doivent être remplis.");
            alert("Veuillez remplir tous les champs avant de soumettre.");
            return;
        }

        const formData = {
            decision_autonomie,
            decision_autre,
            decision_techno_outils,
            decision_personne_entreprise,
            decision_personne_hors_entreprise
        };

        console.log("Données soumises : ", formData);

        try {
            const response = await axiosClient.put(`/fiche10/${fiche.id}/update?cin=${cin}`, formData);
            navigate('/BDC/fiche09A');
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
        }
    }
    function openPopup() {
        if (!validateFields())
            return;

        setIsOpen(true)
    }

    useEffect(() => {
        if (cin)
            fetchData()
        else
            getToken()
    }, [cin]);

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="text-lg font-semibold my-4">Les décisions que je prends</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                <div className="w-full">
                    <label className="block font-normal text-sm text-black" htmlFor="autresActivites">
                        En autonomie :
                    </label>
                    <textarea
                        id="autresActivites"
                        value={decision_autonomie}
                        onChange={(e) => setDecision_autonomie(e.target.value)}
                        placeholder="Décrivez vos autres activités ici..."
                        rows={4}
                        className={` w-full h-24 px-3 py-3 border font-normal text-sm rounded-lg ${!RQ1 ? '' : 'border-red-normal bg-red-normal bg-opacity-20'} border-gray-dark focus:border-black text-black`}
                    ></textarea>
                </div>

                <div className="w-full">
                    <label className="block font-normal text-sm text-black" htmlFor="problemes">
                        Ensemble avec d'autres personnes :
                    </label>
                    <textarea
                        id="problemes"
                        value={decision_autre}
                        onChange={(e) => setDecision_autre(e.target.value)}
                        placeholder="Décrivez les problèmes que vous devez résoudre..."
                        rows={4}
                        className={` w-full h-24 px-3 py-3 border font-normal text-sm rounded-lg ${!RQ2 ? '' : 'border-red-normal bg-red-normal bg-opacity-20'} border-gray-dark focus:border-black text-black`}
                    ></textarea>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                <div className="w-full flex flex-col justify-end">
                    <label className="block font-normal text-sm text-black" htmlFor="technologies">
                        Les technologies et les outils que j'utilise :
                    </label>
                    <textarea
                        id="technologies"
                        value={decision_techno_outils}
                        onChange={(e) => setDecision_techno_outils(e.target.value)}
                        placeholder="Décrivez les technologies et outils ici..."
                        rows={4}
                        className={` w-full h-24 px-3 py-3 border font-normal text-sm rounded-lg ${!RQ3 ? '' : 'border-red-normal bg-red-normal bg-opacity-20'} border-gray-dark focus:border-black text-black`}
                    ></textarea>
                </div>

                <div className="w-full flex flex-col justify-end">
                    <label className="block font-normal text-sm text-black" htmlFor="relationsEntreprise">
                        Les personnes avec lesquelles j'ai des relations au sein de l'entreprise (lesquelles, à quelle fréquence, dans quel but) :
                    </label>
                    <textarea
                        id="relationsEntreprise"
                        value={decision_personne_entreprise}
                        onChange={(e) => setDecision_personne_entreprise(e.target.value)}
                        placeholder="Décrivez les relations avec les personnes au sein de l'entreprise..."
                        rows={4}
                        className={` w-full h-24 px-3 py-3 border font-normal text-sm rounded-lg ${!RQ4 ? '' : 'border-red-normal bg-red-normal bg-opacity-20'} border-gray-dark focus:border-black text-black`}
                    ></textarea>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                <div className="w-full">
                    <label className="block font-normal text-sm text-black" htmlFor="relationsExterieures">
                        Les personnes avec lesquelles j'ai des relations en dehors de l'entreprise (lesquelles, à quelle fréquence, dans quel but) :
                    </label>
                    <textarea
                        id="relationsExterieures"
                        value={decision_personne_hors_entreprise}
                        onChange={(e) => setDecision_personne_hors_entreprise(e.target.value)}
                        placeholder="Décrivez les relations avec les personnes en dehors de l'entreprise..."
                        rows={4}
                        className={` w-full h-24 px-3 py-3 border font-normal text-sm rounded-lg ${!RQ5 ? '' : 'border-red-normal bg-red-normal bg-opacity-20'} border-gray-dark focus:border-black text-black`}
                    ></textarea>
                </div>
                <div></div>
            </div>
            <div className="text-center">
                <ButtonsComponent
                    type="button"
                    color1="bg-gray-dark"
                    onClick1={() => navigate('/BDC/fiche10/activites')}
                    titleButton1={getTraduction('revenir', { FR: 'Revenir', AR: 'التالي', EN: 'Next' })}
                    color2="bg-magenta"
                    onClick2={openPopup}
                    titleButton2={getTraduction('Enregistrer', { FR: 'Enregistrer', AR: 'التالي', EN: 'Next' })}
                ></ButtonsComponent>

            </div>
            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={"Les décisions que je prends"}
                message="Voulez-vous enregistrer ?"
                buttonVName="Oui"
                buttonCName="Non"
            />
        </form>

    )
}
