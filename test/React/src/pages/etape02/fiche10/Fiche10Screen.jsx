import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import { ThreeDots } from 'react-loader-spinner';
import axiosClient from '../../../api/axios-client';
import { BdcContext } from '../../../contexts/BdcContext';
import { TokenContext } from '../../../contexts/TokenContext';
import { NotFound } from '../../../screens/NotFound';

export default function Fiche10Screen() {
    const date = new Date();
    const [date_creation, setDate_creation] = useState(date.toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true)
    const [bdc, setBdc] = useState(true)

    const { language, getTraduction } = useContext(LanguageContext);
    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { getBdc } = useContext(BdcContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    const location = useLocation()


    async function fetchData() {
        try {
            const bdcResponse = await axiosClient.get(`/BDC?cin=${cin}`)
            setBdc(bdcResponse.data.bdc)
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

    return (
        <div className="w-full h-full overflow-x-auto px-6 py-6 bg-white">
            <SubHeaderComponent
                // alignmentClass={alignmentClass}
                color='text-black'
                date={date}
                labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title={`Mon Travail Actuel`}
                content={`L'analyse des informations fournies par la personne sur son travail peut se faire à trois niveaux.
                            <br />- Le premier niveau analyse le contenu des activités, afin de détecter les connaissances et les compétences technico-professionnelles spécifiques à la profession.
                            <br />- Le deuxième niveau permet de déduire les compétences transversales utilisées par la personne, sur la base de certains indices tels que :

                            <br />●	la fréquence de certains événements de travail, qui nécessitent l'activation de compétences relationnelles, de diagnostic et d'adaptation ;
                            <br />●	la complexité des événements et des activités professionnelles auxquelles la personne doit faire face ;
                            <br />●	la complexité du réseau de relations et le type de relations à gérer.
                            Enfin, au troisième niveau, il est possible de reconstituer les intérêts au travail et les conditions de travail recherchées/non recherchées par la personne, qui ressortent de sa description de l'activité. 
                            `}
            />

            {/* <div className='w-96 bg-gray-light rounded-xl flex justify-between items-center'>
                <NavLink
                    to="/BDC/fiche10/activites"
                    className={(location.pathname === "/BDC/fiche10/activites" || location.pathname === "/BDC/fiche10") ? 'w-full font-bold text-center text-sm text-white rounded-md bg-gray-middle m-2' : 'w-full font-bold text-center text-sm p-2'}
                >
                    <div className='w-auto hover:bg-gray-middle p-2 hover:rounded-md flex justify-center items-center text-lg'>
                        Activités
                    </div>
                </NavLink>
                <NavLink
                    to="/BDC/fiche10/decisions"
                    className={location.pathname === "/BDC/fiche10/decisions" ? 'w-full font-bold text-center text-sm text-white rounded-md bg-gray-middle m-2' : 'w-full font-bold text-center text-sm p-2'}
                >
                    <div className='w-auto hover:bg-gray-middle p-2 hover:rounded-md flex justify-center items-center text-lg'>

                        Décisions

                    </div>
                </NavLink>
            </div> */}
            <div >
                <Outlet />
            </div>
        </div>
    );
}
