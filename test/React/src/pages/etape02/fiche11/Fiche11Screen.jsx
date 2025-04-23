import React, { useContext, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import axiosClient from '../../../api/axios-client';
import { FiEdit } from "react-icons/fi";
import Create from './Create';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import { useNavigate } from 'react-router-dom';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import { LanguageContext } from '../../../contexts/LanguageContext';
import ButtonComponent from '../../../component/ButtonComponent';
import { FreeButton } from '../../../component/FreeButton';
import { BdcContext } from '../../../contexts/BdcContext';
import { FreeIconButton } from '../../../component/FreeIconButton';
import { TiDeleteOutline } from 'react-icons/ti';
import { TokenContext } from '../../../contexts/TokenContext';
import { NotFound } from '../../../screens/NotFound';


const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};
export default function Fiche11Screen() {
    const [isLoading, setIsLoading] = useState(false);
    const [fiche11a, setFiche11a] = useState([])
    const [fiche11aN1, setFiche11aN1] = useState([])
    const [fiche11aN2Capa, setFiche11aN2Capa] = useState([])
    const [fiche11aN2Sty, setFiche11aN2Sty] = useState([])
    const [parametreCapacite, setParametreCapacite] = useState([]);
    const [parametreStyle, setParametreStyle] = useState([]);
    const [experiencesfiche8, setExperiencefiche8] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false)

    const [type, setType] = useState("")

    const [selectFiche, setSelectFiche] = useState({});

    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const date = new Date()
    const { getTraduction } = useContext(LanguageContext)
    const { getBdc } = useContext(BdcContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    const navigate = useNavigate()

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get(`/fiche11A?cin=${cin}`);
            // const responsefiche8 = await axiosClient.get(`/fiche08ExperienceProfessionnelle?cin=${cin}`);
            const responsecreate = await axiosClient.get(`/fiche11A/create?cin=${cin}`);

            setExperiencefiche8(responsecreate.data.fiche8Experience)
            // console.log('fiche8 : ', responsecreate.data.fiche8Experience)
            setFiche11a(response.data.fiche11A);
            setFiche11aN1(response.data.fiche11aN1)
            setFiche11aN2Capa(response.data.fiche11aN1Capa);
            setFiche11aN2Sty(response.data.fiche11aN1Sty)
            // console.log('select all elements :', JSON.stringify(responsecreate.data.parametreCapacite, null, 3))

            setParametreCapacite(responsecreate.data.parametreCapacite);
            setParametreStyle(responsecreate.data.parametreStyle);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // const fetchElement = async () => {
    //     try {
    //         const responsecreate = await axiosClient.get(`/fiche11A/create?cin=${cin}`);

    //         setExperiencefiche8(responsecreate.data.fiche8Experience)
    //         console.log('fiche8 : ', responsecreate.data.fiche8Experience)

    //         console.log('select all elements :', JSON.stringify(responsecreate.data.parametreCapacite, null, 3))

    //         setParametreCapacite(responsecreate.data.parametreCapacite);
    //         setParametreStyle(responsecreate.data.parametreStyle);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };



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


    const selectdata = async (id) => {
        try {
            const response = await axiosClient.get(`/fiche11A/${id}/edit?cin=${cin}`);

            setSelectFiche(response.data)
            console.log('element for edit : ', response.data.fiche11A)


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const openPopup = () => {
        setIsOpen(true);
    };
    const closePopup = () => {
        setIsOpen(false);
    };

    const openEditPopup = () => {
        setIsOpen(true);
    };
    const closeEditPopup = () => {
        setIsOpen(false);
    };


    const handleDelete = async (id) => {
        setIsLoading(true);

        try {
            await axiosClient.delete(`/fiche11A/${id}`);

            await fetchData();

            alert('Élément supprimé avec succès.');
        } catch (error) {
            console.error('Error deleting item:', error);
            alert(`Échec de la suppression de l'élément. Détails: ${error.response ? error.response.data : error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
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
        <div className="w-full max-h-[100%] overflow-x-auto px-6 py-6 bg-white">
            <SubHeaderComponent
                color='text-black'
                date={date}
                firstName={beneficier?.prenom}
                lastName={beneficier?.nom}
                labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title={`Le Billan Des Expériences`}
                content={`Identifiez toutes les expériences significatives que vous avez vécu au cours de votre vie et pour chaque expérience indiquez la durée, les tâches effectuées et les compétences acquises en termes de connaissances, de capacités opérationnelles (savoir-faire) et de style personnel. Saisissez enfin les codes à l'aide des tableaux 1 et 2.`} />
            <FreeButton onClick={openPopup} type="button" color={`bg-magenta`} >
                Ajouter un bilan d"expérience
            </FreeButton>
            <ButtonComponent onClick={() => navigate('/BDC/fiche12')} color={`bg-magenta`} >
                {getTraduction(`modifier`, { FR: `Suivant`, AR: `حفظ`, EN: `Save` })}
            </ButtonComponent>

            <Create
                isOpen={isOpen}
                onClose={closePopup}
                cin={cin}
                parametreCapacite={parametreCapacite}
                parametreStyle={parametreStyle}
                experiences={experiencesfiche8}
                fetchData={fetchData}
                selectedFiche={selectFiche || {}}
                setSelectFiche={setSelectFiche}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                setType={setType}
                type={type} />


            {fiche11a.length > 0 && <table className="mt-4 w-full text-left">
                <thead className="bg-magenta">
                    <tr className='border border-magenta'>
                        <th className="border-r border-white w-1/6 p-2">
                            <div className='w-auto'>
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Expérience
                                </p>
                            </div>
                        </th>

                        <th className="p-2 border-r border-white w-1/6">
                            <div className='w-full'>
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Durée
                                </p>
                            </div>
                        </th>
                        <th className="p-2 border-r border-white w-1/6">
                            <div className='w-full'>
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Tàches effectuées
                                </p>
                            </div>
                        </th>
                        <th className="p-2 border-r border-white w-auto">
                            <div className='w-full'>
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Connaissances
                                </p>
                            </div>
                        </th>
                        <th className="p-2 border-r border-white w-auto">
                            <div className='w-full'>
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Capacités - Cod.
                                </p>
                            </div>
                        </th>
                        <th className="p-2 border-r border-white w-auto">
                            <div className='w-full'>
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Styles - Cod.
                                </p>
                            </div>
                        </th>
                        <th className="p-2 w-auto">
                            <div className='w-full'>
                                <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                    Actions
                                </p>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {fiche11a.map((ele) => (
                        <tr className='border border-magenta'>
                            <th className="border-r border-magenta w-1/6 p-2">
                                <div className='w-auto'>
                                    <p className="font-sans text-sm text-black gap-2 font-normal leading-none p-2">
                                        {ele?.experience}
                                    </p>
                                </div>
                            </th>

                            <th className="border-r border-magenta w-1/6">
                                <div className='w-full'>
                                    <p className="font-sans text-sm text-black gap-2 font-normal leading-none p-2">
                                        {formatDate(ele?.date_debut)} - {ele.date_fin ? formatDate(ele.date_fin) : 'A ce jour'}
                                    </p>
                                </div>
                            </th>
                            <th className="border-r border-magenta w-1/3">
                                <div className='w-full'>
                                    <p className="font-sans text-sm text-black gap-2 font-normal leading-none p-2">
                                        {ele?.tacheEffectue}
                                    </p>
                                </div>
                            </th>
                            <th className="border-r border-magenta w-auto">
                                <div className='w-full'> {fiche11aN1 &&
                                    fiche11aN1.filter((el) => el.uuid_reponse_fiche11a === ele.id).map((e) => (
                                        <p key={e.id} className="font-sans text-sm text-black gap-2 font-normal flex items-center leading-none p-2">
                                            <div className='w-2 h-2 bg-magenta rounded-full'></div><label>{e.connaissance}</label>
                                        </p>))
                                }
                                </div>
                            </th>
                            <th className="border-r border-magenta w-auto">
                                <div className='w-full'>
                                    {fiche11aN2Capa && fiche11aN2Capa.filter((c) => c.uuid_reponse_fiche11a_n1 === ele.id).map((c) => (
                                        <div key={c.id} className='flex items-center p-2 gap-2'>
                                            <div className='w-2 h-2 bg-magenta rounded-full'></div>
                                            <p className="font-sans text-sm text-black gap-2 font-normal leading-none">
                                                {c.capacite_operationnelles}
                                            </p>

                                        </div>
                                    ))}
                                </div>
                            </th>
                            <th className='border-r border-magenta w-auto'>
                                <div className='w-full'>
                                    {fiche11aN2Sty && fiche11aN2Sty.filter((s) => s.uuid_reponse_fiche11a_n1 === ele.id).map((s) => (
                                        <div key={s.id} className='flex items-center p-2 gap-2 '>
                                            <div className='w-2 h-2 bg-magenta rounded-full'></div>
                                            <p className="font-sans text-sm text-black gap-2 font-normal leading-none">
                                                {s.style_personnel}
                                            </p>

                                        </div>
                                    ))}
                                </div>
                            </th>
                            <th className='w-auto'>
                                <div className='flex items-center justify-center w-full'>
                                    <div className="relative group flex w-auto">
                                        <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                            Modifier
                                        </div>
                                        <FreeIconButton onClick={() => { selectdata(ele.id); openEditPopup(); setIsEdit(true), setType(ele?.type) }} type={'button'} color='text-magenta mr-2'>
                                            <FiEdit size={25} />
                                        </FreeIconButton>
                                    </div>

                                    <div className="relative group flex w-auto">
                                        <div className="absolute  transform -translate-x-full bottom-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                            Supprimer
                                        </div>
                                        <FreeIconButton onClick={() => handleDelete(ele.id)} type={'button'} color='text-magenta'>
                                            <TiDeleteOutline size={25} />
                                        </FreeIconButton>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>}


        </div>)

}
