import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../api/axios-client';
import CreateOrEditAgenda from './CreateAgenda';
import CreateAgenda from './CreateAgenda';
import { ThreeDots } from 'react-loader-spinner';
import { MdEditCalendar } from "react-icons/md";
import { FaRegCalendarPlus } from "react-icons/fa";
import { LanguageContext } from '../../../contexts/LanguageContext';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import ButtonComponent from '../../../component/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { ResponseOutput } from '../../../component/ResponseOutput';
import { BdcContext } from '../../../contexts/BdcContext';
import { FreeIconButton } from '../../../component/FreeIconButton';
import { anapecRole } from '../../../constants/Variables';
import { TokenContext } from '../../../contexts/TokenContext';
import { NotFound } from '../../../screens/NotFound';



export default function Fiche06Screen() {

    const [agendas, setAgendas] = useState([]);
    const [typeRDV, setTypeRDV] = useState([]);
    const [status, setStatus] = useState([]);
    const [selectedAgenda, setSelectedAgenda] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true)
    const [totalHeure, setTotalHeure] = useState("")
    const date = new Date()
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [date_creation, setDate_creation] = useState(date.toISOString().split('T')[0])
    const { language, getTraduction } = useContext(LanguageContext)
    const { beneficier, fetchBeneficiaireData } = useContext(BeneficierContext)
    const navigate = useNavigate()
    const [isShow, setIsShow] = useState(false)
    const { getBdc } = useContext(BdcContext)
    const [fiche03, setFiche03] = useState({})
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)




    async function fetchData() {

        try {

            const response = await axiosClient.get(`/agenda?cin=${cin}`)
            console.log(response.data)
            const { status, type_rdv, agendas, fiche03 } = response.data;
            setAgendas(agendas);
            setTypeRDV(type_rdv);
            setStatus(status);
            setLoading(false);
            setTotalHeure(response.data.total_hours);
            setNom(beneficier?.nom)
            setPrenom(beneficier?.prenom)
            setFiche03(fiche03)
        } catch (error) {
            console.error('Erreur lors de la récupération des agendas :', error);
        }

    }


    useEffect(() => {
        getToken()
        const fetchData2 = async () => {
            await fetchData();
            await getBdc()
            fetchBeneficiaireData();
        }
        fetchData2()
    }, [cin, token]);

    if (!cin || !token) {
        return (
            <NotFound />
        )
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

    const showPopup = () => {
        setIsShow(true)
    };
    const hidePopup = () => {
        setIsShow(false)
    };
    function navigator() {
        navigate('/BDC/fiche07')
    }


    const openPopup = (agenda = null) => {
        setSelectedAgenda(agenda);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        fetchData()
        setSelectedAgenda(null);
    };

    const isRtl = language === 'AR';
    const directionClass = isRtl ? 'rtl' : 'ltr';
    const alignmentClass = isRtl ? 'text-right' : 'text-left';

    return (
        <div className='w-full max-h-[100%] overflow-x-auto'>
            <div className="px-6 py-6">

                <SubHeaderComponent
                    alignmentClass={alignmentClass}
                    color='text-black'
                    date={date}
                    labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                    title="La planification du parcours du Bilan des compétences" />
                {fiche03 && <div className="flex items-center justify-start  border-b w-2/3 border-gray-dark ">
                    <div className="h-14 w-96 px-4 py-5 font-semibold text-left truncate ">Votre premier rendez-vous :</div>
                    <div className="h-14 w-48 px-4 py-5 font-normal text-sm text-left truncate ">{fiche03.date_RDV}</div>
                    <div className="h-14 w-48 px-4 py-5 font-normal text-sm text-left truncate ">{fiche03.heure_RDV_debut}</div>
                    <div className="h-14 w-48 px-4 py-5 font-normal text-sm text-left truncate ">{fiche03.heure_RDV_fin}</div>
                    <div className="h-14 w-56 px-4 py-5 font-normal text-sm text-left truncate ">{fiche03.type_RDV}</div>
                </div>}

                <div className="flex justify-between items-center my-4">
                    <div className='flex items-end space-x-5 justify-around'>
                        <p className='text-lg font-semibold'>Durée total du rendez-vous : {totalHeure} H </p>
                    </div>
                    {role == anapecRole &&
                        <div className="relative group flex w-auto">
                            <div className="absolute -left-2 -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                Ajouter un Rendez-vous
                            </div>
                            <button
                                className="bg-magenta text-white px-4 py-4 rounded-md hover:bg-gray-dark transition duration-500"
                                onClick={() => openPopup()}
                            >
                                <FaRegCalendarPlus size={25} />
                            </button>
                        </div>}
                </div>


                <div className="w-full bg-gray-light rounded-lg shadow-md px-4 pb-6">
                    <div className="flex items-center justify-start bg-gray-800 rounded-t-lg">
                        <div className="font-semibold h-14 w-full px-4 py-4 text-left">Activité </div>
                        <div className="font-semibold h-14 w-full px-4 py-4 text-left">Date</div>
                        <div className="font-semibold h-14 w-full px-4 py-4 text-left">Heure debut</div>
                        <div className="font-semibold h-14 w-full px-4 py-4 text-left">Heure fin</div>
                        <div className="font-semibold h-14 w-full px-4 py-4 text-left">Status</div>
                        {role == anapecRole && <div className="font-semibold h-14 w-8 py-4 px-7 text-left"></div>}
                    </div>
                    <hr className="mb-4 border-t-2 border-gray-dark" />

                    {agendas && agendas.length > 0 ? (

                        agendas.map((agenda) => (
                            <div key={agenda.id} className="flex items-center justify-start border-b border-gray-dark ">
                                <div className="h-14 w-full px-4 py-4 font-normal text-sm text-left truncate ">{agenda.objet}</div>
                                <div className="h-14 w-full px-4 py-4 font-normal text-sm text-left truncate ">{agenda.date_RDV}</div>
                                <div className="h-14 w-full px-4 py-4 font-normal text-sm text-left truncate ">{agenda.heure_RDV_debut}</div>
                                <div className="h-14 w-full px-4 py-4 font-normal text-sm text-left truncate ">{agenda.heure_RDV_fin}</div>

                                <div className="h-14 w-full px-4 py-4 font-normal text-sm text-left">{agenda.present === '0' ? 'En cours' : 'Present'}</div>

                                {role == anapecRole && <div className='w-6 px-7 py-2 font-normal text-sm text-left'>
                                    <div className="relative group flex w-auto">
                                        <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                            Modifier
                                        </div>
                                        <FreeIconButton
                                            onClick={() => openPopup(agenda)}
                                            hover={'bg-white text-magenta'}
                                        >
                                            <MdEditCalendar size={25} />
                                        </FreeIconButton>
                                    </div>
                                </div>}
                            </div>
                        ))

                    ) : (
                        <div className="flex items-center justify-center h-14 bg-gray-100 text-gray-600 font-semibold">
                            Aucun rendez-vous disponible
                        </div>
                    )}

                </div>
                <div className='font-semibold text-black text-sm mt-10 text-left'>Les activités de la fiche : <br />accueil, Entretien d’accueil, Rédaction de la carte des compétences, Entretiens exploratoires, Entretien de projet, Ateliers de recherche dirigée sur les profils professionnels, le projet professionnel et le plan d’action, entretien de synthèse</div>

                <ButtonComponent color={`bg-magenta`} onClick={navigator} >
                    {getTraduction(`suivant`, { FR: `Suivant`, AR: `التالي`, EN: `Next` })}
                </ButtonComponent>
            </div>
            <CreateAgenda
                isOpen={isOpen}
                onClose={closePopup}
                agenda={selectedAgenda}
                typeRDV={typeRDV}
                nomAgent={beneficier?.nom}
                cin={cin}
            />
        </div>
    );
}
