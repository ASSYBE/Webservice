import React, { useContext, useEffect, useState } from 'react'
import { FaSquarePlus } from 'react-icons/fa6'
import { ThreeDots } from 'react-loader-spinner';
import { LanguageContext } from '../../../contexts/LanguageContext';
import axiosClient from '../../../api/axios-client';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../../component/ButtonComponent';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import { ResponseOutput } from '../../../component/ResponseOutput';
import { BdcContext } from '../../../contexts/BdcContext';
import { TokenContext } from '../../../contexts/TokenContext';
import { NotFound } from '../../../screens/NotFound';

export default function Fiche09BScreen() {

    const [isLoading, setIsLoading] = useState(true);
    const [R_N1_l1, setR_N1_l1] = useState('');
    const [R_N2_l1, setR_N2_l1] = useState('');
    const [R1_N3_l1, setR1_N3_l1] = useState('');
    const [R2_N3_l1, setR2_N3_l1] = useState('');
    const [R_N1_l2, setR_N1_l2] = useState('');
    const [R_N2_l2, setR_N2_l2] = useState('');
    const [R_N3_l2, setR_N3_l2] = useState('');
    const [R_N1_l3, setR_N1_l3] = useState('');
    const [R_N1_l4, setR_N1_l4] = useState('');
    const [R1_N2_l4, setR1_N2_l4] = useState('');
    const [R2_N2_l4, setR2_N2_l4] = useState('');
    const [R3_N2_l4, setR3_N2_l4] = useState('');
    const [R1_N3_l4, setR1_N3_l4] = useState('');
    const [R2_N3_l4, setR2_N3_l4] = useState('');
    const [R1_N1_l5, setR1_N1_l5] = useState('');
    const [R2_N1_l5, setR2_N1_l5] = useState('');
    const [R1_N2_l5, setR1_N2_l5] = useState('');
    const [R2_N2_l5, setR2_N2_l5] = useState('');
    const [R3_N2_l5, setR3_N2_l5] = useState('');
    const [R4_N2_l5, setR4_N2_l5] = useState('');
    const [R1_N3_l5, setR1_N3_l5] = useState('');
    const [R2_N3_l5, setR2_N3_l5] = useState('');
    const [R3_N3_l5, setR3_N3_l5] = useState('');
    const [R_N2_l6, setR_N2_l6] = useState('');
    const [R_N3_l6, setR_N3_l6] = useState('');
    const [R_N1_l7, setR_N1_l7] = useState('');
    const [R1_N2_l7, setR1_N2_l7] = useState('');
    const [R2_N2_l7, setR2_N2_l7] = useState('');
    const [R_N1_l8, setR_N1_l8] = useState('');
    const [R_N2_l8, setR_N2_l8] = useState('');
    const [R_N3_l8, setR_N3_l8] = useState('');
    const [R_N1_l9, setR_N1_l9] = useState('');
    const [R_N2_l9, setR_N2_l9] = useState('');
    const [R_N3_l9, setR_N3_l9] = useState('');
    const [R_N1_l10, setR_N1_l10] = useState('');
    const [R1_N2_l10, setR1_N2_l10] = useState('');
    const [R2_N2_l10, setR2_N2_l10] = useState('');
    const [R_N3_l10, setR_N3_l10] = useState('');
    const [R_N1_l11, setR_N1_l11] = useState('');
    const [R_N2_l11, setR_N2_l11] = useState('');
    const [R1_N3_l11, setR1_N3_l11] = useState('');
    const [R2_N3_l11, setR2_N3_l11] = useState('');
    const [R3_N3_l11, setR3_N3_l11] = useState('');

    const [isOpen, setIsOpen] = useState(false)


    const { language, getTraduction } = useContext(LanguageContext)
    const date = new Date()

    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    const { getBdc } = useContext(BdcContext)


    const [fiche9B, setFiche9b] = useState({})

    const navigate = useNavigate()



    const handleSubmit = async () => {
        const formData = {
            R_N1_l1,
            R_N2_l1,
            R1_N3_l1,
            R2_N3_l1,
            R_N1_l2,
            R_N2_l2,
            R_N3_l2,
            R_N1_l3, R_N1_l4, R1_N2_l4, R2_N2_l4, R3_N2_l4, R1_N3_l4, R2_N3_l4, R1_N1_l5,
            R2_N1_l5, R1_N2_l5, R2_N2_l5, R3_N2_l5, R4_N2_l5, R1_N3_l5, R2_N3_l5, R3_N3_l5,
            R_N2_l6, R_N3_l6, R_N1_l7, R1_N2_l7, R2_N2_l7, R_N1_l8, R_N2_l8, R_N3_l8, R_N1_l9,
            R_N2_l9, R_N3_l9, R_N1_l10, R1_N2_l10, R2_N2_l10, R_N3_l10, R_N1_l11, R_N2_l11,
            R1_N3_l11, R2_N3_l11, R3_N3_l11
        }
        console.log("formData : ", JSON.stringify(formData, null, 2))

        try {
            setIsLoading(true)
            const response = await axiosClient.put(`/fiche9b/${fiche9B.id}?cin=${cin}`, formData)
            console.log("success : ", response)
            navigate('/BDC/fiche11A')
        } catch (error) {
            console.error("Error fetching element:", error);
        }
    }

    async function fetchData() {
        try {
            const response = await axiosClient.get(`/fiche9b?cin=${cin}&nom=${nomAgent}`);
            const fetchedFiche = response.data.fiche;

            if (fetchedFiche) {
                setFiche9b(fetchedFiche);

                setR_N1_l1(fetchedFiche.R_N1_l1 || '');
                setR_N2_l1(fetchedFiche.R_N2_l1 || '');
                setR1_N3_l1(fetchedFiche.R1_N3_l1 || '');
                setR2_N3_l1(fetchedFiche.R2_N3_l1 || '');
                setR_N1_l2(fetchedFiche.R_N1_l2 || '');
                setR_N2_l2(fetchedFiche.R_N2_l2 || '');
                setR_N3_l2(fetchedFiche.R_N3_l2 || '');
                setR_N1_l3(fetchedFiche.R_N1_l3 || '');
                setR_N1_l4(fetchedFiche.R_N1_l4 || '');
                setR1_N2_l4(fetchedFiche.R1_N2_l4 || '');
                setR2_N2_l4(fetchedFiche.R2_N2_l4 || '');
                setR3_N2_l4(fetchedFiche.R3_N2_l4 || '');
                setR1_N3_l4(fetchedFiche.R1_N3_l4 || '');
                setR2_N3_l4(fetchedFiche.R2_N3_l4 || '');
                setR1_N1_l5(fetchedFiche.R1_N1_l5 || '');
                setR2_N1_l5(fetchedFiche.R2_N1_l5 || '');
                setR1_N2_l5(fetchedFiche.R1_N2_l5 || '');
                setR2_N2_l5(fetchedFiche.R2_N2_l5 || '');
                setR3_N2_l5(fetchedFiche.R3_N2_l5 || '');
                setR4_N2_l5(fetchedFiche.R4_N2_l5 || '');
                setR1_N3_l5(fetchedFiche.R1_N3_l5 || '');
                setR2_N3_l5(fetchedFiche.R2_N3_l5 || '');
                setR3_N3_l5(fetchedFiche.R3_N3_l5 || '');
                setR_N2_l6(fetchedFiche.R_N2_l6 || '');
                setR_N3_l6(fetchedFiche.R_N3_l6 || '');
                setR_N1_l7(fetchedFiche.R_N1_l7 || '');
                setR1_N2_l7(fetchedFiche.R1_N2_l7 || '');
                setR2_N2_l7(fetchedFiche.R2_N2_l7 || '');
                setR_N1_l8(fetchedFiche.R_N1_l8 || '');
                setR_N2_l8(fetchedFiche.R_N2_l8 || '');
                setR_N3_l8(fetchedFiche.R_N3_l8 || '');
                setR_N1_l9(fetchedFiche.R_N1_l9 || '');
                setR_N2_l9(fetchedFiche.R_N2_l9 || '');
                setR_N3_l9(fetchedFiche.R_N3_l9 || '');
                setR_N1_l10(fetchedFiche.R_N1_l10 || '');
                setR1_N2_l10(fetchedFiche.R1_N2_l10 || '');
                setR2_N2_l10(fetchedFiche.R2_N2_l10 || '');
                setR_N3_l10(fetchedFiche.R_N3_l10 || '');
                setR_N1_l11(fetchedFiche.R_N1_l11 || '');
                setR_N2_l11(fetchedFiche.R_N2_l11 || '');
                setR1_N3_l11(fetchedFiche.R1_N3_l11 || '');
                setR2_N3_l11(fetchedFiche.R2_N3_l11 || '');
                setR3_N3_l11(fetchedFiche.R3_N3_l11 || '');
                setIsLoading(false)
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données : ", error);
        }
    }

    function openPopup() {
        setIsOpen(true)
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
        <div className="w-full max-h-[100%] overflow-x-auto px-6 pt-6">
            <SubHeaderComponent
                // alignmentClass={alignmentClass}
                color='text-black'
                date={date}
                labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title={`Grille D’Analyse De L’Activité De Travail Et Des Compétences`} />

            <div className="relative overflow-x-auto bg-white shadow-xl rounded-lg">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-10">
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
                            <span className="text-lg font-normal text-black opacity-100">Chargement des données...</span>
                        </div>
                    </div>
                )}
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <table className="min-w-full table-auto bg-white rounded-lg">
                    <thead className=" text-white">
                        <tr>
                            <th className="py-3 px-3 text-left border-r"></th>
                            <th className="py-3 px-3 bg-magenta w-72 text-left border-r">Niveau I</th>
                            <th className="py-3 px-3 bg-magenta w-72 text-left border-r">Niveau II</th>
                            <th className="py-3 px-3 bg-magenta w-72 text-left">Niveau III</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-magentahover:bg-gray-50">
                            <td className="py-4 px-3 border-x border-magenta text-sm">
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm">
                                        Description des activités réalisées dans une journée ou une semaine type (types d’activités réalisées en relation à : <br /> planifier,<br /> gérer,<br /> surveiller, <br />intervenir sur les écarts)
                                    </span>
                                </div>
                            </td>
                            <td className="py-4 px-3 font-bold border-r border-magenta">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau1-1" checked={R_N1_l1} onChange={(e) => setR_N1_l1(e.target.checked)} className="h-5 w-5" />
                                    <span className=" font-normal text-sm w-full">Connaissances et compétences technico professionnelles</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 border-r border-magenta font-bold ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-1" checked={R_N2_l1} onChange={(e) => setR_N2_l1(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Capacité à lire et diagnostiquer le contexte de travail</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 font-bold border-r border-magenta space-y-2">
                                <div className="flex items-start space-x-2 ">
                                    <input type="checkbox" id="niveau3-1" checked={R1_N3_l1} onChange={(e) => setR1_N3_l1(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Degré d’implication dans le travail</span>
                                </div>
                                <div className="flex items-start space-x-2 font-bold">
                                    <input type="checkbox" id="niveau3-2" checked={R2_N3_l1} onChange={(e) => setR2_N3_l1(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Intérêt pour les activités menées</span>
                                </div>
                            </td>
                        </tr>

                        <tr className="border-t border-magenta">
                            <td className="py-4 px-3 border-x border-magenta text-sm ">
                                <div className='flex items-center space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full'></div>
                                    <span className="font-normal text-sm ">Activités les plus fréquemment pratiquées</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 border-r border-magenta ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau1-2" checked={R_N1_l2} onChange={(e) => setR_N1_l2(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Connaissances et compétences technico professionnelles</span>
                                </div>
                            </td>
                            <td className="py-4 border-r border-magenta px-3 ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N2_l2} onChange={(e) => setR_N2_l2(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Compétences transversales : diagnostic, rapport, faire face</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 font-bold border-r border-magenta">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau3-3" checked={R_N3_l2} onChange={(e) => setR_N3_l2(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Intérêt pour les activités menées</span>
                                </div>
                            </td>
                        </tr>

                        <tr className="border-t border-magenta">
                            <td className="py-4 px-3 border-x border-magenta text-sm">
                                <div className='flex items-center space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full'></div>
                                    <span className="font-normal text-sm">Les outils et les équipements utilisés</span>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full'></div>
                                    <span className="font-normal text-sm">La maîtrise de leur utilisation</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 border-r border-magenta font-bold">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau1-5" checked={R_N1_l3} onChange={(e) => setR_N1_l3(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Connaissances et compétences technico professionnelles (manuelles et autres)</span>
                                </div>
                            </td>
                            <td className="border-r ">
                            </td>
                            <td className=" font-bold border-r border-magenta">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="min-w-full table-auto bg-white  rounded-lg">
                    <thead className="bg-magenta border-x border-magenta text-white">
                        <tr>
                            <th className="py-3 px-3 text-left ">Autonomie et degré d’intervention personnelle dans le travail</th>
                            <th className="py-3 px-3 w-72 text-left "></th>
                            <th className="py-3 px-3 w-72 text-left "></th>
                            <th className="py-3 px-3 w-72 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr className="border-t border-magenta">
                            <td className="py-4 px-3 border-x border-magenta text-sm ">
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm">Les décisions qui peuvent être prises de manièreindépendante : <br /> - type de décisions- complexité des décisions (routine / non-routine) ; <br /> - la fréquence à laquelle les décisions sont prises ; <br /> - degré de réussite des décisions prises ;</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm">  Décisions et responsabilités également prises en dehors de la description de poste (lesquelles, à quelle fréquence)</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 border-r border-magenta space-y-2">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau1-2" checked={R_N1_l4} onChange={(e) => setR_N1_l4(e.target.checked)} className=" h-5 w-5" />
                                    <div className='w-full'>
                                        <span className="font-normal text-sm w-full">Compétences technico professionnelles (contenus sur lesquels la personne peut intervenir indépendamment)</span>
                                    </div>
                                </div>
                            </td>
                            <td className="border-r py-4 px-3 space-y-2 ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R1_N2_l4} onChange={(e) => setR1_N2_l4(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Capacité à gérer des activités de manière autonome</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R2_N2_l4} onChange={(e) => setR2_N2_l4(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">  Compétences de prise de décision</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R3_N2_l4} onChange={(e) => setR3_N2_l4(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Capacité à planifier son travail (en situation d’autonomie)</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 space-y-2  font-bold border-r border-magenta">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau3-3" checked={R1_N3_l4} onChange={(e) => setR1_N3_l4(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Préférence pour des situations de travail plus ou moins autonomes.</span>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <input type="checkbox" id="niveau3-3" checked={R2_N3_l4} onChange={(e) => setR2_N3_l4(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Degré d’implication dans le travail</span>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-t border-magenta">
                            <td className="py-4 px-3 border-x border-magenta text-sm ">
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm">Situations dans lesquelles la personne fait face à à des
                                        événements inattendus : <br /> - lesquelles sont-elles ? <br /> - à quelle fréquence elle se produisent ; <br /> - il existe déjà des solutions ou des solutions doivent être
                                        recherchées ; <br /> - comment la personne intègre les imprévus dans son activité
                                        «de routine».</span>
                                </div>

                            </td>
                            <td className="py-4 px-3 border-r border-magenta space-y-2">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau1-2" checked={R1_N1_l5} onChange={(e) => setR1_N1_l5(e.target.checked)} className=" h-5 w-5" />
                                    <div className='w-full'>
                                        <span className="font-normal text-sm w-full"> Compétences technico-professionnelles</span>
                                    </div>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R2_N1_l5} onChange={(e) => setR2_N1_l5(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Connaissance du contexte (par rapport à la capacité de décrire le processus)</span>
                                </div>
                            </td>
                            <td className="border-r py-4 px-3 space-y-2 ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R1_N2_l5} onChange={(e) => setR1_N2_l5(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">  Capacité à faire face à des situations inattendues</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R2_N2_l5} onChange={(e) => setR2_N2_l5(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Capacité à résoudre des problèmes non courants</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R3_N2_l5} onChange={(e) => setR3_N2_l5(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Capacité à modifier son organisation du travail</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R4_N2_l5} onChange={(e) => setR4_N2_l5(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Capacité à prévoir et à anticiper les événements</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 space-y-2  font-bold border-r border-magenta">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau3-3" checked={R1_N3_l5} onChange={(e) => setR1_N3_l5(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">  Préférence pour des situations de travail plus ou moins stables et routinières</span>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <input type="checkbox" id="niveau3-3" checked={R2_N3_l5} onChange={(e) => setR2_N3_l5(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Degré d›implication dans le travail</span>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <input type="checkbox" id="niveau3-3" checked={R3_N3_l5} onChange={(e) => setR3_N3_l5(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Capacité à « tolérer » l’imprévu</span>
                                </div>
                            </td>
                        </tr>

                        <tr className="border-t border-magenta">
                            <td className="py-4 px-3 border-x border-magenta text-sm ">
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm "> Le comportement face à des situations ou des tâches importunes ou peu appréciées</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 border-r border-magenta ">
                                <div className='flex items-start space-x-2'>
                                    <span className="font-normal text-sm w-full"></span>
                                </div>
                            </td>
                            <td className="py-4 border-r border-magenta px-3 ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N2_l6} onChange={(e) => setR_N2_l6(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Capacité à mettre en œuvre des stratégies d›évitement / d’adaptation pour les situations indésirables</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 font-bold border-r border-magenta">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau3-3" checked={R_N3_l6} onChange={(e) => setR_N3_l6(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Situations et activités de travail indésirables ou rejetées</span>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-t border-magenta">
                            <td className="py-4 px-3 border-x border-magenta text-sm ">
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm "> Modifications / améliorations apportées au travail par
                                        rapport aux procédures standard: <br /> - quels types de changements ; <br /> - nature des changements (dans le périmètre d›action défini
                                        par l’entreprise ou en dehors).</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 border-r border-magenta ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N1_l7} onChange={(e) => setR_N1_l7(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Compétences professionnelles extra-profil</span>
                                </div>
                            </td>
                            <td className="py-4 border-r border-magenta px-3 ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R1_N2_l7} onChange={(e) => setR1_N2_l7(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">  Capacité à modifier sa propre organisation du travail</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R2_N2_l7} onChange={(e) => setR2_N2_l7(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">  Capacité à modifier sa propre organisation du travail</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 font-bold border-r border-magenta">
                                <div className='flex items-start space-x-2'>

                                </div>
                            </td>
                        </tr>

                        <tr className="border-t border-magenta">
                            <td className="py-4 px-3 border-x border-magenta text-sm ">
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm ">Autonomie de la personne dans la gestion du temps</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 border-r border-magenta ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N1_l8} onChange={(e) => setR_N1_l8(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Connaissances et compétences technico-professionnelles à développer</span>
                                </div>
                            </td>
                            <td className="py-4 border-r border-magenta px-3 ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N2_l8} onChange={(e) => setR_N2_l8(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Compétences d’auto-évaluation</span>
                                </div>

                            </td>
                            <td className="py-4 px-3 font-bold border-r border-magenta">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N3_l8} onChange={(e) => setR_N3_l8(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Situations et conditions de travail moins «faciles» pour la personne</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>


                <table className="min-w-full table-auto bg-white rounded-lg">
                    <thead className="bg-magenta border-x border-magenta text-white">
                        <tr>

                            <th className="py-3 px-3 text-left ">Évaluations</th>
                            <th className="py-3 px-3 w-72 text-left "></th>
                            <th className="py-3 px-3 w-72 text-left "></th>
                            <th className="py-3 px-3 w-72 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-magenta">
                            <td className="py-4 px-3 border-x border-magenta text-sm ">
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm "> Demandes de l’entreprise auxquelles la personne ne répond pas de manière adéquate et pourquoi</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 border-r border-magenta ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N1_l9} onChange={(e) => setR_N1_l9(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Connaissances et compétences technico-professionnelles à développer</span>
                                </div>
                            </td>
                            <td className="py-4 border-r border-magenta px-3 ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N2_l9} onChange={(e) => setR_N2_l9(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Compétences d’auto-évaluation</span>
                                </div>

                            </td>
                            <td className="py-4 px-3 font-bold border-r border-magenta">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N3_l9} onChange={(e) => setR_N3_l9(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Situations et conditions de travail moins «faciles» pour la personne</span>
                                </div>
                            </td>
                        </tr>

                        <tr className="border-t border-magenta">
                            <td className="py-4 px-3 border-x border-magenta text-sm ">
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm ">  Demandes auxquelles la personne répond de manière satisfaisante et pourquoi</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 border-r border-magenta ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N1_l10} onChange={(e) => setR_N1_l10(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Connaissances et compétences technico-professionnelles «fortes»</span>
                                </div>
                            </td>
                            <td className="py-4 border-r border-magenta px-3 space-y-2 ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R1_N2_l10} onChange={(e) => setR1_N2_l10(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Compétences d’auto-évaluation</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R2_N2_l10} onChange={(e) => setR2_N2_l10(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Capacité à recueillir des feed-back</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 font-bold border-r border-magenta">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N3_l10} onChange={(e) => setR_N3_l10(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Situations et conditions de travail moins «faciles» pour la personne</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="min-w-full table-auto bg-white rounded-lg">
                    <thead className="bg-magenta border-x border-magenta text-white">
                        <tr>
                            <th className="py-3 px-3 text-left ">Réseau de relations</th>
                            <th className="py-3 px-3 w-72 text-left "></th>
                            <th className="py-3 px-3 w-72 text-left "></th>
                            <th className="py-3 px-3 w-72 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-magenta">
                            <td className="py-4 px-3 border-x border-b border-magenta text-sm ">
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm "> Avec qui la personne a des relations ;</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm">Le but de ces relations (conseiller,
                                        instruire, persuader, échanger des
                                        informations routinières et non
                                        routinières, écouter, coordonner les
                                        autres, se coordonner avec les autres,
                                        coopérer…) ;</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm "> Les relations les plus fréquentes ;</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm ">Quelles relations la personne gère
                                        avec succès, lesquelles avec difficulté
                                        et pourquoi ;</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <div className='w-2 h-2 bg-magenta rounded-full mt-1'></div>
                                    <span className="font-normal text-sm "> Combien et quelles relations a-t-elle construit indépendamment ;</span>
                                </div>
                            </td>

                            <td className="py-4 border-r border-b border-magenta  px-3 space-y-2 ">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N1_l11} onChange={(e) => setR_N1_l11(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">  Compétences technico professionnelles</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 font-bold border-r border-magenta border-b">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R_N2_l11} onChange={(e) => setR_N2_l11(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full"> Gamme et « profondeur » des compétences interpersonnelles</span>
                                </div>
                            </td>
                            <td className="py-4 px-3 font-bold border-r  border-b border-magenta space-y-2">
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R1_N3_l11} onChange={(e) => setR1_N3_l11(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Conditions de relation facilitantes pour la personne</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R2_N3_l11} onChange={(e) => setR2_N3_l11(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Importance accordée aux relations au travail</span>
                                </div>
                                <div className='flex items-start space-x-2'>
                                    <input type="checkbox" id="niveau2-2" checked={R3_N3_l11} onChange={(e) => setR3_N3_l11(e.target.checked)} className="h-5 w-5" />
                                    <span className="font-normal text-sm w-full">Intérêt à travailler avec les gens</span>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className="text-center">
                    <ButtonComponent type='button' color={`bg-magenta`} onClick={openPopup} >
                        {getTraduction(`modifier`, { FR: `Enregistrer`, AR: `حفظ`, EN: `Save` })}
                    </ButtonComponent>
                </div>
            </form >

            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={"Grille D’Analyse De L’Activité De Travail Et Des Compétences"}
                message="Voulez-vous enregistrer ?"
                buttonVName="Oui"
                buttonCName="Non"
            />
        </div >

    )
}
