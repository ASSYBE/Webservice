import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../../../contexts/LanguageContext';
import axiosClient from '../../../api/axios-client';
import { FaFileDownload } from 'react-icons/fa';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import { FreeButton } from '../../../component/FreeButton';
import ButtonComponent from '../../../component/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { ResponseOutput } from '../../../component/ResponseOutput';
import { BdcContext } from '../../../contexts/BdcContext';
import { FreeIconButton } from '../../../component/FreeIconButton';
import { TiDeleteOutline } from 'react-icons/ti';
import { FaSquarePlus } from 'react-icons/fa6';
import { type_jeune } from '../../../constants/Variables';
import { TokenContext } from '../../../contexts/TokenContext';
import { NotFound } from '../../../screens/NotFound';

function Fiche12Screen() {
    const { language, getTraduction } = useContext(LanguageContext);
    const date = new Date();
    const [fiche12, setFiche12] = useState([])
    const [formation, setFormation] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [connaissance, setConnaissance] = useState("")
    const [connaissances, setConnaissances] = useState([])
    const [histoireProfessionalle_Q3, setHistoireProfessionnalle_Q3] = useState("")
    const [histoireProfessionalle_Q4, setHistoireProfessionnalle_Q4] = useState("")
    const [histoireProfessionalle_Q5, setHistoireProfessionnalle_Q5] = useState("")
    const [histoireProfessionalle_Q6, setHistoireProfessionnalle_Q6] = useState("")
    const [histoireProfessionalle_Q7, setHistoireProfessionnalle_Q7] = useState("")
    const [histoireProfessionalle_Q8, setHistoireProfessionnalle_Q8] = useState("")
    const [fichier, setFichier] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [validateQ1, setValidateQ1] = useState(false)
    const [validateQ2, setValidateQ2] = useState(false)
    const [validateQ3, setValidateQ3] = useState(false)
    const [validateQ4, setValidateQ4] = useState(false)
    const [validateQ5, setValidateQ5] = useState(false)
    const [validateQ6, setValidateQ6] = useState(false)
    const [validateConn, setValidateConn] = useState(false)

    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { bilanDC, getBdc } = useContext(BdcContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    const navigate = useNavigate()

    const MAX_CHARACTERS = 255;

    function validateFields() {
        const TvalidateQ1 = histoireProfessionalle_Q3.trim() !== '';
        const TvalidateQ2 = histoireProfessionalle_Q4.trim() !== '';
        const TvalidateQ3 = histoireProfessionalle_Q5.trim() !== '';
        const TvalidateQ4 = histoireProfessionalle_Q6.trim() !== '';
        const TvalidateQ5 = histoireProfessionalle_Q7.trim() !== '';
        const TvalidateQ6 = histoireProfessionalle_Q8.trim() !== '';

        setValidateQ1(!TvalidateQ1);
        setValidateQ2(!TvalidateQ2);
        setValidateQ3(!TvalidateQ3);
        setValidateQ4(!TvalidateQ4);
        setValidateQ5(!TvalidateQ5);
        setValidateQ6(!TvalidateQ6);

        return TvalidateQ1 && TvalidateQ2 && TvalidateQ3 && TvalidateQ4 && TvalidateQ5 && TvalidateQ6;
    }
    function validateConnField() {
        const TvalidateConn = connaissance.trim() !== '';


        setValidateConn(!TvalidateConn);

        return TvalidateConn;
    }

    const validateData = () => {

        if (connaissance.length > MAX_CHARACTERS ||
            histoireProfessionalle_Q3.length > MAX_CHARACTERS ||
            histoireProfessionalle_Q4.length > MAX_CHARACTERS ||
            histoireProfessionalle_Q5.length > MAX_CHARACTERS ||
            histoireProfessionalle_Q6.length > MAX_CHARACTERS ||
            histoireProfessionalle_Q7.length > MAX_CHARACTERS ||
            histoireProfessionalle_Q8.length > MAX_CHARACTERS) {
            alert("Le nombre de caractères dépasse la limite de 255 caractéres.");
            return false;
        }

        return true;
    };

    async function handleSubmit() {

        if (!validateData())
            return;

        const formationConcatenated = formation.join(' ; ');
        console.log('formation : ', formationConcatenated.toString())

        const formData = {
            formationIC_FormationQ1: formationConcatenated,
            histoireProfessionalle_Q3,
            histoireProfessionalle_Q4,
            histoireProfessionalle_Q5,
            histoireProfessionalle_Q6,
            histoireProfessionalle_Q7,
            histoireProfessionalle_Q8
        };

        if (!fiche12.id) {
            console.error('Fiche ID is missing!');
            return;
        }

        try {
            console.log('Success:', JSON.stringify(formData, null, 3));
            const response = await axiosClient.post(`/fiche12/${fiche12.id}/update?cin=${cin}`, formData);
            navigate("/BDC/fiche13")
            console.log('Success:', response);
        } catch (error) {
            console.error('Error during submission:', error.response ? error.response.data : error.message);
        }
    }

    async function addConnaissance() {
        if (!validateConnField())
            return;
        const formData = {
            formationIC_connaissance: connaissance
        }
        await axiosClient.post(`/fiche12Connaissance?cin=${cin}`, formData)
        setConnaissance('')
        fetchData()
    }
    async function deleteConnaissance(id) {

        await axiosClient.delete(`/fiche12Connaissance/${id}?cin=${cin}`)
        fetchData()
    }


    async function fetchData() {
        const response = await axiosClient.get(`/fiche12?cin=${cin}&nom=${beneficier?.nom}`);
        const responseConn = await axiosClient.get(`/fiche12Connaissance?cin=${cin}`);

        setFormation(response.data.formation ? response.data.formation.map((e) => e.FR) : []);
        setFiche12(response.data.fiche12);
        setFichier(response.data.files)
        setConnaissances([...response.data.connaissancefiche8, ...responseConn.data.connaissance]);
        // if (!response.data.fiche12.formationIC_connaissanceQ2) {
        //     const connaissancesConcatene = [
        //         ...response.data.connaissance.map((e) => e.connaissance)
        //     ].join(' ; ');
        //     setConnaissance(connaissancesConcatene);

        // } else {
        //     setConnaissance(response.data.fiche12.formationIC_connaissanceQ2);
        // }
        const fiche12 = response?.data?.fiche12;
        if (fiche12) {
            const { histoireProfessionalle_Q3, histoireProfessionalle_Q4, histoireProfessionalle_Q5, histoireProfessionalle_Q6, histoireProfessionalle_Q7, histoireProfessionalle_Q8 } = fiche12;
            setHistoireProfessionnalle_Q3(histoireProfessionalle_Q3)
            setHistoireProfessionnalle_Q4(histoireProfessionalle_Q4)
            setHistoireProfessionnalle_Q5(histoireProfessionalle_Q5)
            setHistoireProfessionnalle_Q6(histoireProfessionalle_Q6)
            setHistoireProfessionnalle_Q7(histoireProfessionalle_Q7)
            setHistoireProfessionnalle_Q8(histoireProfessionalle_Q8)
            setIsLoading(false)
        } else {
            console.error("Fiche12 data is missing");
            setIsLoading(false)
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

    const telechargerFile = (fileName, type) => {

        const fileUrl = `/files/${fileName}.${type}`;

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `${fileName}.${type}`;
        link.click();
    };

    function openPopup() {
        if (!validateFields())
            return;

        setIsOpen(true)
    }

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
                // alignmentClass={alignmentClass}
                color='text-black'
                date={date}
                labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title={`Mon Histoire De Formation Et Professionnelle`} />

            <div className="flex flex-wrap items-center gap-4">
                {fichier && fichier.length > 0 && (
                    fichier.map((f) => (
                        <div key={f.id} className=" flex items-center gap-3">
                            {f.REM && (
                                <button
                                    onClick={() => telechargerFile(f.REM, f.typeREM)}
                                    className="bg-gray-dark text-black py-2 px-4 rounded-md hover:bg-magenta hover:text-white transition duration-300 flex items-center gap-3"
                                >
                                    {f.REM} <FaFileDownload />
                                </button>
                            )}

                            {f.REC && (
                                <button
                                    onClick={() => telechargerFile(f.REC, f.typeREC)}
                                    className="bg-gray-dark text-black py-2 px-4 rounded-md hover:bg-magenta hover:text-white transition duration-300 flex items-center gap-3"
                                >
                                    {f.REC}<FaFileDownload />
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

            <ButtonComponent type='button' color={`bg-magenta`} onClick={openPopup}>
                {getTraduction(`modifier`, { FR: `Enregistrer`, AR: `حفظ`, EN: `Save` })}
            </ButtonComponent>
            <form onSubmit={handleSubmit}>
                <div className="mx-auto pt-5 bg-white">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Formation Initiale et Continue</h3>
                    <div className=' '>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="formation">Formation (Titres, durée, quand):</label>
                            <ul className='ml-6'>
                                {formation.map((formationItem, index) => (
                                    <li key={index} className='flex items-center text-sm'><div className='w-2 h-2 rounded-full bg-orange mr-4'></div>{formationItem}</li>
                                ))}
                            </ul>
                        </div>

                        <div className='flex items-center gap-4 mb-4'>
                            <div className='w-full'>
                                <label className="font-medium text-sm mb-2" htmlFor="connaissances">Connaissances de base (Matières):</label>
                                <div className='flex items-center gap-3 mb-2'>
                                    <input
                                        id="connaissances"
                                        className={`w-full p-2 border font-normal text-sm ${!validateConn ? 'bg-white' : 'bg-red-salmon border-red-normal'} rounded-md border-gray-dark focus:border-black`}
                                        placeholder="Ex: Mathématiques, Physique"
                                        value={connaissance}
                                        onChange={(e) => setConnaissance(e.target.value)}
                                    />
                                    <div className="relative group flex w-auto">
                                        <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                            Ajouter
                                        </div>
                                        <FreeIconButton type={'button'} onClick={addConnaissance} color={'bg-magenta text-white px-2 py-2'}><FaSquarePlus size={20} /></FreeIconButton>
                                    </div>
                                </div>
                                <div className='w-full h-40 border overflow-y-auto border-gray-dark rounded-md p-2'>
                                    {connaissances && connaissances.map((c) => (
                                        <div>
                                            {c.connaissance && <li key={c.id} className="flex justify-between items-center py-1 px-5 w-full bg-gray-light bg-opacity-40 mb-2 rounded-md">
                                                <span className="flex items-center gap-4 font-normal text-sm">
                                                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {c.connaissance}
                                                </span>

                                                {/* <FreeIconButton onClick={() => deleteConnaissance(c.id)} color='text-magenta flex justify-center'>
                                                <TiDeleteOutline size={25} />
                                            </FreeIconButton> */}
                                            </li>}
                                            {c.formationIC_connaissance && <li key={c.id} className="flex justify-between items-center py-1 pl-5 pr-1 w-full bg-gray-light bg-opacity-40 mb-2 rounded-md">
                                                <span className="flex items-center gap-4 font-normal text-sm">
                                                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {c.formationIC_connaissance}
                                                </span>

                                                <div className="relative group flex w-auto">
                                                    <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                        Supprimer
                                                    </div>
                                                    <FreeIconButton onClick={() => deleteConnaissance(c.id)} type={'button'} color='text-magenta flex justify-center'>
                                                        <TiDeleteOutline size={25} />
                                                    </FreeIconButton>
                                                </div>
                                            </li>}
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div className='w-full'></div>
                        </div>
                    </div>
                </div>

                <div className='pt-3 bg-white'>
                    <h3 className="text-lg font-semibold mb-4">Histoire professionnelle</h3>
                    <div className='flex items-center gap-4'>
                        <div className="mb-4 w-full">
                            <label className="block font-normal text-sm mb-2" htmlFor="evenements">Quels événements de ma vie m’ont conduite à la situation actuelle ?</label>
                            <input
                                type="text"
                                id="evenements"
                                placeholder="Ex: J'ai décidé de changer de carrière en 2020"
                                value={histoireProfessionalle_Q3}
                                onChange={(e) => setHistoireProfessionnalle_Q3(e.target.value)}
                                className={`w-full p-3 border font-normal text-sm rounded-md border-gray-dark focus:border-black ${!validateQ1 ? 'bg-white' : 'bg-red-salmon border-red-normal'}`}
                            />
                        </div>

                        <div className="mb-4 w-full">
                            <label className="block font-normal text-sm mb-2" htmlFor="etapes">Quelles ont été les étapes les plus importantes de ma vie professionnelle ?</label>
                            <input
                                type="text"
                                id="etapes"
                                placeholder="Ex: Obtention de mon premier emploi"
                                value={histoireProfessionalle_Q4}
                                onChange={(e) => setHistoireProfessionnalle_Q4(e.target.value)}
                                className={`w-full p-3 border font-normal text-sm rounded-md border-gray-dark focus:border-black ${!validateQ2 ? 'bg-white' : 'bg-red-salmon border-red-normal'}`}
                            />
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className="mb-4 w-full">
                            <label className="block font-normal text-sm mb-2" htmlFor="condition">Comment est-ce que je vis ma condition de travail aujourd’hui (satisfactions,espoirs, etc.) ?</label>
                            <input
                                type="text"
                                id="condition"
                                placeholder="Ex: Je suis satisfait, mais j'aimerais plus de défis."
                                value={histoireProfessionalle_Q5}
                                onChange={(e) => setHistoireProfessionnalle_Q5(e.target.value)}
                                className={`w-full p-3 border font-normal text-sm rounded-md border-gray-dark focus:border-black ${!validateQ3 ? 'bg-white' : 'bg-red-salmon border-red-normal'}`}
                            />
                        </div>

                        <div className="mb-4 w-full">
                            <label className="block font-normal text-sm mb-2" htmlFor="avenir">Qu’est-ce que je vois dans mon avenir ?</label>
                            <input
                                type="text"
                                id="avenir"
                                placeholder="Ex: J'espère évoluer vers un poste de management."
                                value={histoireProfessionalle_Q6}
                                onChange={(e) => setHistoireProfessionnalle_Q6(e.target.value)}
                                className={`w-full p-3 border font-normal text-sm rounded-md border-gray-dark focus:border-black ${!validateQ4 ? 'bg-white' : 'bg-red-salmon border-red-normal'}`}
                            />
                        </div>
                    </div>
                    <div className='flex items-end gap-4'>
                        <div className="mb-4 w-full">
                            <label className="block font-normal text-sm mb-2" htmlFor="perteEmploi">Comment ai-je vécu la perte de mon emploi ?</label>
                            <input
                                type="text"
                                id="perteEmploi"
                                placeholder="Ex: Très difficilement, mais j'ai appris beaucoup."
                                value={histoireProfessionalle_Q7}
                                onChange={(e) => setHistoireProfessionnalle_Q7(e.target.value)}
                                className={`w-full p-3 border font-normal text-sm rounded-md border-gray-dark focus:border-black ${!validateQ5 ? 'bg-white' : 'bg-red-salmon border-red-normal'}`}
                            />
                        </div>

                        <div className="mb-4 w-full">
                            <label className="block font-normal text-sm mb-2" htmlFor="chomage">Qu’est-ce que j’ai fait depuis que je suis au chômage ? Comment me suis-je organisée ? Comment j’occupe ma journée ?</label>
                            <input
                                type="text"
                                id="chomage"
                                placeholder="Ex: J'ai suivi des formations en ligne, je fais du bénévolat."
                                value={histoireProfessionalle_Q8}
                                onChange={(e) => setHistoireProfessionnalle_Q8(e.target.value)}
                                className={`w-full p-3 border font-normal text-sm rounded-md border-gray-dark focus:border-black ${!validateQ6 ? 'bg-white' : 'bg-red-salmon border-red-normal'}`}
                            />
                        </div>
                    </div>
                </div>

            </form>

            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={`Mon Histoire De Formation Et Professionnelle`}
                message="Voulez-vous enregistrer ?"
                buttonVName="Oui"
                buttonCName="Non"
            />
        </div>
    )
}

export default Fiche12Screen;
