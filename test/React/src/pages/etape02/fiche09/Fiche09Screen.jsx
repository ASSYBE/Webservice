import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../../../contexts/LanguageContext';
import axiosClient from '../../../api/axios-client';
import { ThreeDots } from 'react-loader-spinner';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import ButtonComponent from '../../../component/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import { ResponseOutput } from '../../../component/ResponseOutput';
import { BdcContext } from '../../../contexts/BdcContext';
import { type_jeune } from '../../../constants/Variables';
import { TokenContext } from '../../../contexts/TokenContext';
import { NotFound } from '../../../screens/NotFound';

export default function Fiche09Screen() {

    const [sensResponsablite, setSensResponsablite] = useState("");
    const [capacitesComminicationRelation, setCapacitesComminicationRelation] = useState("");
    const [ponctualite, setPonctualite] = useState("");
    const [fiabilite, setFiabilite] = useState("");
    const [autonomieTravail, setAutonomieTravail] = useState("");
    const [loading, setLoading] = useState(true)
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const date = new Date()
    const [date_creation, setDate_creation] = useState(date.toISOString().split('T')[0])

    const { language, getTraduction } = useContext(LanguageContext)
    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { bilanDC, getBdc } = useContext(BdcContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    const [fiche09, setFiche09] = useState(null);
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()

    async function fetchData() {
        try {
            const response = await axiosClient.get(`/fiche09?cin=${cin}`);
            setFiche09(response.data.fiche);
            setSensResponsablite(response.data.fiche?.sensResponsablite);
            setPonctualite(response.data.fiche?.ponctualite);
            setFiabilite(response.data.fiche?.fiabilite);
            setAutonomieTravail(response.data.fiche?.autonomieTravail);
            setCapacitesComminicationRelation(response.data.fiche?.capacitesComminicationRelation);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    useEffect(() => {
        getToken()
        const fetchData2 = async () => {
            await fetchData();
            await getBdc()
        }
        fetchData2()
    }, [cin, token]);

    if (!cin || !token) {
        return (
            <NotFound />
        )
    }

    const handleSubmit = async () => {

        const formData = {
            sensResponsablite,
            capacitesComminicationRelation,
            ponctualite,
            fiabilite,
            autonomieTravail
        };
        try {
            setLoading(true);
            const response = await axiosClient.put(`/fiche09/${fiche09?.id}/update?cin=${cin}`, formData);
            navigate(bilanDC?.type_beneficier !== type_jeune ? '/BDC/fiche10' : '/BDC/fiche12')
            console.log('Response:', response);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    function openPopup() {
        setIsOpen(true)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen bg-gray-light">
                <div className="flex flex-col items-center justify-center space-y-4">
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
                    <span className="text-lg text-gray-middle">Chargement des données...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full max-h-[100%] overflow-x-auto px-6 pt-6'>
            <SubHeaderComponent
                // alignmentClass={alignmentClass}
                color='text-black'
                content={`Sur la base du travail réalisé avec la personne bénéficiaire, l'avis de la Conseillère ou du Conseiller sur les soft skills / compétences transversales mises en œuvre par la personne bénéficiaire sont présentés ci-dessous :`}
                date={date}
                labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title={`Évaluation Des Compétences De La Personne Bénéficiaire`} />


            <form onSubmit={(e) => e.preventDefault()} >
                <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
                    <thead className="bg-magenta border-x-2 border-y-2 border-magenta text-white rounded-t-lg">
                        <tr>
                            <th className=" border-r-2 p-1">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Domaine d'Attention</p></th>
                            <th className="p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Évaluation</p></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-magenta">
                            <th className="border-y w-full border-x  border-magenta text-center p-2">
                                <p className="text-black  text-left justify-center gap-2 font-normal text-sm leading-relaxed">
                                    Sens de responsabilité</p>
                            </th>
                            <th className="border-y w-full border-x border-magenta text-center p-2">
                                <select
                                    value={sensResponsablite}
                                    onChange={(e) => setSensResponsablite(e.target.value)}
                                    className={`py-1 px-4 w-96 h-9 font-normal text-sm text-center bg-gray-light rounded-lg border border-gray-dark focus:border-black`}
                                >
                                    <option value="" disabled>Sélectionnez</option>
                                    <option value="Satisfaction">Satisfaction</option>
                                    <option value="Insatisfaction">Insatisfaction</option>
                                </select>
                            </th>
                        </tr>
                        <tr className="border-b border-magenta">

                            <th className="border-y w-full border-x  border-magenta text-center p-2">
                                <p className="text-black  text-left justify-center gap-2 font-normal text-sm leading-relaxed">
                                    Capacités communicatives et relationnelles</p>
                            </th>
                            <th className="border-y w-full border-x border-magenta text-center p-2">
                                <select
                                    value={capacitesComminicationRelation}
                                    onChange={(e) => setCapacitesComminicationRelation(e.target.value)}
                                    className={`py-1 px-4 w-96 h-9 font-normal text-sm text-center bg-gray-light rounded-lg border border-gray-dark focus:border-black`}
                                >
                                    <option value="" disabled>Sélectionnez</option>
                                    <option value="Satisfaction">Satisfaction</option>
                                    <option value="Insatisfaction">Insatisfaction</option>
                                </select>
                            </th>
                        </tr>
                        <tr className="border-b border-magenta">

                            <th className="border-y w-full border-x  border-magenta text-center p-2">
                                <p className="text-black  text-left justify-center gap-2 font-normal text-sm leading-relaxed">
                                    Ponctualité
                                </p>
                            </th>
                            <th className="border-y w-full border-x  border-magenta text-center p-2">
                                <select
                                    value={ponctualite}
                                    onChange={(e) => setPonctualite(e.target.value)}
                                    className={`py-1 px-4 w-96 h-9 font-normal text-sm text-center bg-gray-light rounded-lg border border-gray-dark focus:border-black`}
                                >
                                    <option value="" disabled>Sélectionnez</option>
                                    <option value="Satisfaction">Satisfaction</option>
                                    <option value="Insatisfaction">Insatisfaction</option>
                                </select>
                            </th>
                        </tr>
                        <tr className="border-b border-magenta">
                            <th className="border-y w-full border-x  border-magenta text-center p-2">
                                <p className="text-black  text-left justify-center gap-2 font-normal text-sm leading-relaxed">
                                    Fiabilité
                                </p>
                            </th>
                            <th className="border-y w-full border-x  border-magenta text-center p-2">
                                <select
                                    value={fiabilite}
                                    onChange={(e) => setFiabilite(e.target.value)}
                                    className={`py-1 px-4 w-96 h-9 font-normal text-sm text-center bg-gray-light rounded-lg border border-gray-dark focus:border-black`}
                                >
                                    <option value="" disabled>Sélectionnez</option>
                                    <option value="Satisfaction">Satisfaction</option>
                                    <option value="Insatisfaction">Insatisfaction</option>
                                </select>
                            </th>
                        </tr>
                        <tr className="border-b border-magenta">
                            <th className="border-y w-full border-x  border-magenta text-center p-2">
                                <p className="text-black  text-left justify-center gap-2 font-normal text-sm leading-relaxed">
                                    Autonomie dans le travail
                                </p>
                            </th>
                            <th className="border-y w-full border-x  border-magenta text-center p-2">
                                <select
                                    value={autonomieTravail}
                                    onChange={(e) => setAutonomieTravail(e.target.value)}
                                    className={`py-1 px-4 w-96 h-9 font-normal text-sm text-center bg-gray-light rounded-lg border border-gray-dark focus:border-black`}
                                >
                                    <option value="" disabled>Sélectionnez</option>
                                    <option value="Satisfaction">Satisfaction</option>
                                    <option value="Insatisfaction">Insatisfaction</option>
                                </select>
                            </th>
                        </tr>
                    </tbody>
                </table>

                <div className="text-center">
                    <ButtonComponent type='button' color={`bg-magenta`} onClick={openPopup} >
                        {getTraduction(`modifier`, { FR: `Enregistrer`, AR: `حفظ`, EN: `Save` })}
                    </ButtonComponent>
                </div>
            </form>

            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={"Évaluation Des Compétences De La Personne Bénéficiaire"}
                message="Voulez-vous enregistrer ?"
                buttonVName="Oui"
                buttonCName="Non"
            />
        </div>
    )
}
