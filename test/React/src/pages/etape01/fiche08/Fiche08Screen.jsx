import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import axiosClient from '../../../api/axios-client';
import { ThreeDots } from 'react-loader-spinner';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import ButtonComponent from '../../../component/ButtonComponent';
import { BdcContext } from '../../../contexts/BdcContext';
import { type_jeune } from '../../../constants/Variables';
import { TokenContext } from '../../../contexts/TokenContext';
import { NotFound } from '../../../screens/NotFound';


export default function Fiche08Screen() {

    const [fiche, setFiche] = useState({});
    const [loading, setLoading] = useState(true)
    const [bdc, setBdc] = useState({})
    const date = new Date()
    const [date_creation, setDate_creation] = useState(date.toISOString().split('T')[0])
    const [types, setTypes] = useState([])
    const { language, getTraduction } = useContext(LanguageContext)
    const { beneficier, fetchBeneficiaireData } = useContext(BeneficierContext)
    const navigate = useNavigate();
    const location = useLocation();
    const { bilanDC, getBdc } = useContext(BdcContext)
    const [instruction, setInstruction] = useState("")
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    const [page, setPage] = useState("/BDC/fiche08/formationInitialeContinue")

    async function fetchData() {
        try {
            const response = await axiosClient.get(`/fiche08?cin=${cin}`);
            const bdcResponse = await axiosClient.get(`/BDC?cin=${cin}`)
            setBdc(bdcResponse.data.bdc)
            setTypes(bdcResponse.data.type)
            console.log('fiche08 :', response.data.fiche)
            setFiche(response.data.fiche)
            setLoading(false)
        } catch (e) {
            console.error("Error fetching element:", e);
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

    useEffect(() => {
        const currentPath = location.pathname;
        if ((currentPath === '/BDC/fiche08/formationInitialeContinue' || currentPath === '/BDC/fiche08') && bilanDC?.type_beneficier === 'type_jeune')
            setPage("/BDC/fiche08/competence");
        else {

            if (currentPath === '/BDC/fiche08/formationInitialeContinue' || currentPath === '/BDC/fiche08') {
                setInstruction('Utilisez la symbologie suivante en pensant à quel point vous êtes intéressé.e et à quel point vous êtes capable de maîtriser le sujet aujourd\'hui et non au moment du cours :');
                setPage("/BDC/fiche08/experienceProfessionnelle");

            } else if (currentPath === '/BDC/fiche08/experienceProfessionnelle') {
                setInstruction(`Dans la colonne "n° de poste de travail", créer une liste numérotée selon un critère personnel d'importance/ signification`)
                setPage("/BDC/fiche08/evaluationExperience");

            } else if (currentPath === '/BDC/fiche08/evaluationExperience') {
                setInstruction(null)
                setPage("/BDC/fiche08/analysePoste");
            } else if (currentPath === '/BDC/fiche08/analysePoste') {
                setInstruction(null)
                setPage("/BDC/fiche08/activiteExtraProfessionnelle");
            } else if (currentPath === '/BDC/fiche08/activiteExtraProfessionnelle') {
                setInstruction(null)
                setPage("/BDC/fiche08/competence");
            } else {
                setInstruction(null)
                setPage("/BDC/fiche09");
            }
        }
    }, [location]);

    const handleNavigation = () => {
        navigate(page);
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

    const isRtl = language === 'AR';
    const directionClass = isRtl ? 'rtl' : 'ltr';
    const alignmentClass = isRtl ? 'text-right' : 'text-left';

    return (
        <div className='w-full max-h-[100%] overflow-x-auto px-6 py-6'>

            <SubHeaderComponent
                alignmentClass={alignmentClass}
                color='text-black'
                date={date}
                firstName={beneficier?.prenom}
                lastName={beneficier?.nom}
                labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title={`La Carte des Compétences`}
                content={instruction} />

            <div className='w-full h-20 bg-gray-light rounded-xl flex justify-between items-center px-4'>
                <NavLink
                    to={'/BDC/fiche08/formationInitialeContinue'}
                    className={(location.pathname === "/BDC/fiche08/formationInitialeContinue" || location.pathname === "/BDC/fiche08") ? 'w-full font-bold text-center text-sm text-magenta border-r-4 border-white' : 'w-full font-bold text-center text-sm border-r-4 border-white'}
                >
                    <div className='w-full h-10 font-semibold text-sm hover:text-magenta flex justify-center items-center p-4'>
                        FORMATION INITIALE / CONTINUE
                    </div>
                </NavLink>
                {bilanDC.type_beneficier !== type_jeune && <>
                    <NavLink
                        to="/BDC/fiche08/experienceProfessionnelle"
                        className={location.pathname === "/BDC/fiche08/experienceProfessionnelle" ? 'w-full font-bold text-center text-sm text-magenta border-r-4 border-white' : 'w-full font-bold text-center text-sm border-r-4 border-white'}
                    >
                        <div className='w-full h-10 font-semibold text-sm hover:text-magenta flex justify-center items-center p-4'>

                            EXPÉRIENCE PROFESSIONNELLE

                        </div>
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche08/evaluationExperience"
                        className={location.pathname === "/BDC/fiche08/evaluationExperience" ? 'w-full font-bold text-center text-sm text-magenta border-r-4 border-white' : 'w-full font-bold text-center text-sm border-r-4 border-white'}
                    >
                        <div className='w-full h-10 font-semibold text-sm hover:text-magenta flex justify-center items-center p-4'>

                            ÉVALUATION DE L’EXPÉRIENCE PROFESSIONNELLE

                        </div>
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche08/analysePoste"
                        className={location.pathname === "/BDC/fiche08/analysePoste" ? 'w-full font-bold text-center text-sm text-magenta border-r-4 border-white' : 'w-full font-bold text-center text-sm border-r-4 border-white'}
                    >
                        <div className='w-full h-10 font-semibold text-sm hover:text-magenta flex justify-center items-center p-4'>

                            ANALYSE DU POSTE

                        </div>
                    </NavLink>

                </>}
                <NavLink
                    to="/BDC/fiche08/activiteExtraProfessionnelle"
                    className={location.pathname === "/BDC/fiche08/activiteExtraProfessionnelle" ? 'w-full font-bold text-center text-sm text-magenta border-r-4 border-white' : 'w-full font-bold text-center text-sm border-r-4 border-white'}
                >
                    <div className='w-full h-10 font-semibold text-sm hover:text-magenta flex justify-center items-center p-4'>

                        ACTIVITÉS EXTRA-PROFESSIONNELLES

                    </div>
                </NavLink>
                <NavLink
                    to="/BDC/fiche08/competence"
                    className={location.pathname === "/BDC/fiche08/competence" ? 'w-full font-bold text-center text-sm text-magenta' : 'w-full font-bold text-center text-sm'}
                >
                    <div className='w-full h-10 font-semibold text-sm hover:text-magenta flex justify-center items-center p-4'>

                        LES COMPÉTENCES

                    </div>
                </NavLink>
            </div>
            <Outlet />
        </div>
    )
}
