import React, { useContext, useEffect, useState } from 'react';
import CreerCompetence from './CreerCompetence';
import axiosClient from '../../../../api/axios-client';
import { LanguageContext } from '../../../../contexts/LanguageContext';
import { ThreeDots } from 'react-loader-spinner';
import { FaSquarePlus } from "react-icons/fa6";
import { MdDataSaverOn, MdDeleteForever } from "react-icons/md";
import { BeneficierContext } from '../../../../contexts/BeneficierContext';
import { TiDeleteOutline } from 'react-icons/ti';
import ButtonComponent from '../../../../component/ButtonComponent';
import { ResponseOutput } from '../../../../component/ResponseOutput';
import { useNavigate } from 'react-router-dom';
import { BdcContext } from '../../../../contexts/BdcContext';
import { type_jeune } from '../../../../constants/Variables';
import { TokenContext } from '../../../../contexts/TokenContext';



export default function Fiche08FormationInitialeContinueScreen() {
    const [isCreerCompetenceOpen, setCreerCompetenceOpen] = useState(false);
    const { getTraduction } = useContext(LanguageContext);
    const [uuid_parameter_formation, setUuid_parameter_formation] = useState("");
    const [formation, setFormation] = useState([]);
    const [connaissance, setConnaissance] = useState([]);
    const [existingCompetenceId, setExistingCompetenceId] = useState();
    const [sigecConnaissance, setSigecConnaissance] = useState([]);
    const [autoEvaluationMaitrise, setAutoEvaluationMaitrise] = useState({});
    const [autoEvaluationInteret, setAutoEvaluationInteret] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { bilanDC } = useContext(BdcContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    async function fetchData() {
        try {
            setIsLoading(true)
            const response = await axiosClient.get(`/fiche08FormationInitialeContinue?cin=${cin}`);
            const sigecResponse = await axiosClient.get(`/sigecConnaissance?cin=${cin}`);
            setConnaissance(response.data.connaissanceFormation);
            setSigecConnaissance(sigecResponse.data.sigecConnaissance);
            console.log("sigec :", sigecResponse.data.sigecConnaissance);
            console.log("reference :", response.data.connaissanceFormation);

            const formationResponse = await axiosClient.get(`/formation`);
            setFormation(formationResponse.data.formation);
            setIsLoading(false)

        } catch (e) {
            console.error("Error fetching element:", e);
        }
    }

    async function deleteConnaissance(id) {
        setIsLoading(true);
        try {

            await axiosClient.delete(`/fiche08Connaissance/${id}`);
            console.log("La connaissance est supprimée");
            fetchData();
        } catch (error) {
            console.error("Erreur lors de la suppression : ", error);
        }
    }

    const addMaitriseInteret = async (formation_id, connaissance) => {
        try {

            if (!autoEvaluationInteret[formation_id] || !autoEvaluationMaitrise[formation_id])
                return;
            setIsLoading(true)
            const formData = {
                uuid_parameter_formation: formation_id,
                connaissance: connaissance,
                autoEvaluationMaitrise: autoEvaluationMaitrise[formation_id],
                autoEvaluationInteret: autoEvaluationInteret[formation_id],
            };
            console.log("maitrise et interet : ", JSON.stringify(formData, null, 3));
            await axiosClient.post(`/fiche08Connaissance?cin=${cin}&nom=${nomAgent}`, formData);
            fetchData();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleMaitriseChange = (id, value) => {
        setAutoEvaluationMaitrise(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleInteretChange = (id, value) => {
        setAutoEvaluationInteret(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    useEffect(() => {
        if (cin && token) {
            fetchData();
            getBeneficier()
        } else
            getToken()
    }, []);

    const openCreerCompetence = (id) => {
        setCreerCompetenceOpen(true);
        setUuid_parameter_formation(id);
    };

    const openModifCompetence = (id) => {
        setCreerCompetenceOpen(true);
        setExistingCompetenceId(id);
    };

    const closeCreerCompetence = () => {
        setCreerCompetenceOpen(false);
    };

    const navigate = useNavigate()

    function handleSubmit() {
        navigate(bilanDC.type_beneficier !== type_jeune ? '/BDC/fiche08/experienceProfessionnelle' : '/BDC/fiche08/activiteExtraProfessionnelle')
    }

    return (
        <div className='pt-6'>
            <ButtonComponent type="button" onClick={handleSubmit} color='bg-magenta'>Suivant</ButtonComponent>
            <h1 className="text-lg font-bold mb-6">Formation Initiale / Continue</h1>


            <div className="relative overflow-x-auto bg-white border-b  border-b-magenta rounded-lg">
                {isLoading && (
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

                <table className={`${isLoading ? "table-auto min-w-full h-[500px]" : "table-auto min-w-full h-full"}`}>
                    <thead className="bg-magenta text-white border-x-2 border-y-2 border-magenta">
                        <tr cla>
                            <th className="border-y border-x p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Formation</p></th>
                            <th className="border-y border-x-2 p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Connaissances</p></th>
                            <th className="border-y border-x-2 p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Maitrise</p></th>
                            <th className="border-y border-x-2 p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Intérêt</p></th>
                            <th className="border-y border-x w-10 p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Actions</p></th>
                        </tr>
                    </thead>
                    <tbody>
                        {formation.map((formationItem) => (
                            <tr key={formationItem.id} className="border-t border-l border-magenta">
                                <td className="px-3 h-full flex items-center border-r border-magenta">
                                    <span className="text-black font-normal text-sm"> {getTraduction(formationItem.id, formationItem)}</span>
                                </td>
                                <td className="border-r  border-magenta">
                                    {sigecConnaissance.filter(c => c.uuid_parameter_formation === formationItem.valeur_id).map((c) => {
                                        const connaissanceCoresponding = connaissance.some(e => e.connaissance === c.connaissance);

                                        if (!connaissanceCoresponding) {
                                            return (
                                                <div key={c.id} className='mx-3'>
                                                    <div className="flex justify-between items-center gap-2">

                                                        <span className="text-black font-normal text-sm">

                                                            {c.connaissance}
                                                        </span>
                                                        <button
                                                            onClick={() => deleteConnaissance(c.id)}
                                                            className="text-magenta hover:text-black transition duration-300"
                                                        >
                                                            {connaissanceCoresponding && <TiDeleteOutline size={25} />}
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}

                                    {connaissance
                                        .filter(c => c.uuid_parameter_formation === formationItem.valeur_id)
                                        .map((c, index, filteredConnaissance) => {
                                            const isLastItem = filteredConnaissance.length === index + 1;

                                            return (
                                                <div key={c.id} className={isLastItem ? '' : 'border-b'}>
                                                    <div className="flex items-center mx-3 justify-between gap-2">
                                                        <span className="text-black font-normal text-sm py-2">
                                                            {c.connaissance}
                                                        </span>
                                                        <div className="relative group flex w-auto">
                                                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                                Supprimer
                                                            </div>
                                                            <button
                                                                onClick={() => deleteConnaissance(c.id)}
                                                                className="text-magenta hover:text-black transition duration-300 text-left py-2"
                                                            >
                                                                <TiDeleteOutline size={25} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }

                                </td>

                                <td className='border-r border-l border-magenta text-center'>
                                    {
                                        sigecConnaissance.filter(c => c.uuid_parameter_formation === formationItem.valeur_id).map((c) => {
                                            const connaissanceCoresponding = connaissance.some(e => e.connaissance === c.connaissance);

                                            if (!connaissanceCoresponding) {
                                                return (
                                                    <div key={c.id} className='flex justify-center items-center'>
                                                        <select
                                                            id="maitrise"
                                                            className="w-28 h-9 border-2  rounded-md px-2  text-center text-black font-normal text-sm"
                                                            value={autoEvaluationMaitrise[c.uuid_parameter_formation] || ""}
                                                            onChange={(e) => handleMaitriseChange(c.uuid_parameter_formation, e.target.value)}
                                                        >
                                                            <option value="" disabled>Maitrise</option>

                                                            <option value="+">+</option>
                                                            <option value="++">+ +</option>
                                                            <option value="-">-</option>
                                                            <option value="--">- -</option>

                                                        </select>
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })
                                    }

                                    {connaissance.filter(c => c.uuid_parameter_formation === formationItem.valeur_id).map((c, index, filteredConnaissance) => {
                                        const isLastItem = filteredConnaissance.length === index + 1;
                                        return (
                                            <div key={c.id} className={isLastItem ? '' : 'border-b'}>
                                                <div className={`font-bold text-xl flex justify-center items-center`}>
                                                    <span className='py-1.5'>{c.autoEvaluationMaitrise}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </td>

                                <td className="text-center font-bold border-r border-l border-magenta ">
                                    {sigecConnaissance.filter(c => c.uuid_parameter_formation === formationItem.valeur_id).map((c) => {
                                        const connaissanceCoresponding = connaissance.some(e => e.connaissance === c.connaissance);


                                        if (!connaissanceCoresponding) {
                                            return (
                                                <div key={c.id} className='flex justify-center items-center gap-2'>
                                                    <div className='flex justify-center items-center gap-2 '>
                                                        <select
                                                            id="interet"
                                                            className="h-9 border-2 w-28 rounded-md px-2 text-center text-black font-normal text-sm"
                                                            value={autoEvaluationInteret[c.uuid_parameter_formation] || ""}
                                                            onChange={(e) => handleInteretChange(c.uuid_parameter_formation, e.target.value)}
                                                        >
                                                            <option value="" disabled>Interet</option>
                                                            <option value="+">+</option>
                                                            <option value="++">+ +</option>
                                                            <option value="--">- -</option>
                                                            <option value="-">-</option>
                                                        </select>
                                                        <div className='flex justify-center'>
                                                            <div className="relative group flex w-auto">
                                                                <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                                    Ajouter
                                                                </div>
                                                                <button onClick={() => addMaitriseInteret(c.uuid_parameter_formation, c.connaissance)} className='w-auto px-1 py-1 bg-magenta rounded-md flex justify-center items-center text-white hover:scale-110 transition-all'>
                                                                    <MdDataSaverOn size={20} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                    {connaissance.filter(c => c.uuid_parameter_formation === formationItem.valeur_id).map((c, index, filteredConnaissance) => {
                                        const isLastItem = filteredConnaissance.length === index + 1;
                                        return (
                                            <div key={c.id} className={isLastItem ? '' : 'border-b '}>
                                                <div className='px-6 flex justify-center items-center font-bold text-xl'>
                                                    <span className='py-1.5'>{c.autoEvaluationInteret}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </td>

                                <td className="py-4 px-6 border-r border-l border-magenta">
                                    <div className="relative group flex w-auto">
                                        <div className="absolute left-0 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                            Ajouter une nouvelle compétence
                                        </div>

                                        <a
                                            aria-label="Ajouter une connaissance"
                                            onClick={() => openCreerCompetence(formationItem.valeur_id)}
                                            className="text-magenta text-center px-4 py-2 hover:text-gray-dark transition duration-300"
                                        >
                                            <FaSquarePlus size={25} />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CreerCompetence
                cin={cin}
                nomAgent={beneficier?.nom}
                fetchData={fetchData}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                isOpen={isCreerCompetenceOpen}
                uuid_parameter_formation={uuid_parameter_formation}
                onClose={closeCreerCompetence}
                competenceId={existingCompetenceId}
                beneficier={beneficier}
            />
        </div>
    );
}
