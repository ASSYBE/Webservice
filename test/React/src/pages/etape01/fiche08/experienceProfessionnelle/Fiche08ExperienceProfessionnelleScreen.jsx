import React, { useCallback, useContext, useEffect, useState } from 'react';
import CreerActivite from './CreerActivite';
import axiosClient from '../../../../api/axios-client';
import { ThreeDots } from 'react-loader-spinner';
import { FaSquarePlus } from 'react-icons/fa6';
import { TiDeleteOutline } from 'react-icons/ti';
import { BeneficierContext } from '../../../../contexts/BeneficierContext';
import { FreeButton } from '../../../../component/FreeButton';
import { FreeIconButton } from '../../../../component/FreeIconButton';
import { ResponseOutput } from '../../../../component/ResponseOutput';
import ButtonComponent from '../../../../component/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../../../contexts/TokenContext';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

export default function Fiche08ExperienceProfessionnelleScreen() {
    const [isCreerActiviteOpen, setCreerActiviteOpen] = useState(false);
    const [experienceProfessionnelle, setExperienceProfessionnelle] = useState([]);
    const [sigecExperienceProfessionnelle, setSigecExperienceProfessionnelle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false)
    const [deletedId, setDeletedId] = useState("")
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    const { beneficier, getBeneficier } = useContext(BeneficierContext);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axiosClient.get(`/fiche08ExperienceProfessionnelle?cin=${cin}`);

            setExperienceProfessionnelle(response.data.fiche08ExperienceProfessionnelle || []);
        } catch (e) {
            console.error("Error fetching data:", e);
        } finally {
            setIsLoading(false);
        }
    };

    // const fetchSigecData = useCallback(async () => {
    //     const responsesigec = await axiosClient.get(`/fiche08ExperienceProfessionnelle/sigec`);

    //     if (responsesigec.data.sigecExperienceProfessionnelle) {
    //         await axiosClient.post(`/fiche08ExperienceSigec?cin=${cin}`, responsesigec.data.sigecExperienceProfessionnelle);
    //     }

    // }, [cin])

    const fetchSigecData = useCallback(async () => {
        try {
            const responseSigec = await axiosClient.get(`/fiche08ExperienceProfessionnelle/sigec`);

            if (responseSigec.data && responseSigec.data.sigecExperienceProfessionnelle) {
                const dataToSend = responseSigec.data.sigecExperienceProfessionnelle;

                await axiosClient.post(`/fiche08ExperienceSigec?cin=${cin}`, dataToSend);

                console.log("SIGEC experience data successfully posted!");
            }
        } catch (error) {
            console.error("Error fetching or posting SIGEC experience data:", error);
        }
    }, [cin]);

    const deleteExperiencePro = async () => {
        try {
            setIsLoading(true);
            const response = await axiosClient.delete(`/fiche08ExperienceProfessionnelle/${deletedId}`);
            console.log("status:", response);
            setDeletedId("")
            fetchData();
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred while deleting the experience.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    const debouncedSigecExperienceProfessionnelle = useDebounce(sigecExperienceProfessionnelle, 500);

    useEffect(() => {

        if (cin && token) {
            fetchData();
            fetchSigecData()
        } else
            getToken()
    }, [fetchSigecData, debouncedSigecExperienceProfessionnelle]);


    const openCreerActivite = useCallback(() => {
        setCreerActiviteOpen(true);
    }, []);

    const closeCreerActivite = useCallback(() => {
        setCreerActiviteOpen(false);
    }, []);

    const navigate = useNavigate()

    function handleSubmit() {
        navigate('/BDC/fiche08/evaluationExperience')
    }

    return (
        <div className='pt-6 h-auto'>

            <ButtonComponent type="button" onClick={handleSubmit} color='bg-magenta'>Suivant</ButtonComponent>
            <div className="flex justify-between items-start mb-6">
                <h1 className="text-lg font-bold">Expérience Professionnelle</h1>
                <div className="flex justify-end">
                    <FreeButton type="button" onClick={openCreerActivite} color="bg-magenta flex items-center gap-4">
                        <FaSquarePlus size={20} /> Une expérience professionnelle
                    </FreeButton>
                </div>
            </div>

            <div className="relative overflow-x-auto bg-white rounded-lg shadow-md">
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
                                wrapperClass=""
                            />
                            <span className="text-lg font-semibold text-black opacity-100">Chargement des données...</span>
                        </div>
                    </div>
                )}

                <table className="table-auto min-w-full h-full">
                    <thead className="bg-magenta text-white border-x-2 border-y-2 border-magenta">
                        <tr className="bg-magenta text-white">
                            <th className="border-y w-64 border-x p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Intitulé du poste</p></th>
                            <th className="border-y border-x-2 p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Activité Exercée <br /> (Qualification, type d’entreprise, secteur d’activité, type de contrat)</p></th>
                            <th className="border-y w-64 border-x-2 p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Période</p></th>
                            <th className="border-y border-x-2 p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Circonstance de l'Interruption <br /> ( Qualification, type d’entreprise, secteur d’activité, type de contrat)</p></th>
                            <th className="border-y border-x w-10 p-2">
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Action</p></th>
                        </tr>
                    </thead>
                    <tbody>
                        {experienceProfessionnelle.length > 0 &&
                            experienceProfessionnelle.map((EP) =>
                                EP.IntitulePoste && EP.IntitulePoste.trim() !== "" && (
                                    <tr key={EP.id} className="">
                                        <td className="py-1 text-center bg-white bg-opacity-30 border-x border-y border-magenta">
                                            <h2 className="text-black font-normal text-sm flex items-center pl-4">{EP.IntitulePoste}</h2>
                                        </td>
                                        <td className="py-1 px-6 text-left bg-white bg-opacity-30 border-x border-y border-magenta">
                                            <h2 className="text-black font-normal text-sm">{EP.activiteExercee}</h2>
                                        </td>
                                        <td className="py-1 px-6 text-center bg-white bg-opacity-30 border-x border-y border-magenta">
                                            <h2 className="text-black font-normal text-sm">
                                                {formatDate(EP.periode_debut)} - {EP.periode_fin ? formatDate(EP.periode_fin) : 'A ce jour'}
                                            </h2>
                                        </td>
                                        <td className="py-1 px-6 text-left bg-white bg-opacity-30 border-x border-y border-magenta">
                                            <h2 className="text-black font-normal text-sm">{EP.circonstanceInterruption}</h2>
                                        </td>
                                        <td className="py-1 bg-white border-x border-y border-magenta">
                                            <div className='flex justify-center items-center'>
                                                {EP.type !== 'sigec' ?
                                                    <div className="relative group flex w-auto">
                                                        <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                            Supprimer
                                                        </div>
                                                        <FreeIconButton
                                                            onClick={() => { setIsOpen(true); setDeletedId(EP?.id) }}
                                                            color="text-magenta "
                                                            hover="transparent"
                                                        >
                                                            <TiDeleteOutline size={20} />
                                                        </FreeIconButton> </div> : <div></div>}
                                            </div>

                                        </td>
                                    </tr>
                                )
                            )}
                        <ResponseOutput
                            isOpen={isOpen}
                            handleSubmit={deleteExperiencePro}
                            closePopup={() => setIsOpen(false)}
                            message="Voulez-vous vraiment supprimer cette expérience professionnelle ?"
                            buttonVName="Oui"
                            buttonCName="Non"
                        />
                    </tbody>
                </table>
            </div>

            <CreerActivite
                cin={cin}
                isOpen={isCreerActiviteOpen}
                onClose={closeCreerActivite}
                setIsLoading={setIsLoading}
                fetchData={fetchData}
                beneficier={beneficier}
                isLoading={isLoading}
            />
        </div>
    );
}
