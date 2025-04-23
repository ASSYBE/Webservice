import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../../../api/axios-client';
import Fiche03ModifScreen from './Fiche03ModifScreen';
import { ThreeDots } from 'react-loader-spinner'
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import FooterComponent from '../../../component/FooterComponent';
import { BdcContext } from '../../../contexts/BdcContext';
import { TokenContext } from '../../../contexts/TokenContext';
import { useLocation } from 'react-router-dom';
import { NotFound } from '../../../screens/NotFound';


export default function Fiche03Screen() {
    const [fiche03, setFiche03] = useState(null);
    const [appele, setAppele] = useState([]);
    const [demande, setDemande] = useState([]);
    const [degre, setDegre] = useState([]);
    const [questionFiche03, setQuestionFiche03] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { bilanDC, getBdc } = useContext(BdcContext)

    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)
    const { beneficier, getBeneficier, fetchBeneficiaireData } = useContext(BeneficierContext);
    const location = useLocation()

    const fetchElement = async () => {

        try {
            const response = await axiosClient.get(`/fiche03?cin=${cin}`);
            console.log("added successfully :", response.data);
            const {
                fiche03,
                parametreAppel,
                parametreDemande,
                parametreDegre,
                questionFiche03,
            } = response.data;

            setFiche03(fiche03);
            setAppele(parametreAppel);
            setDemande(parametreDemande);
            setDegre(parametreDegre);
            setQuestionFiche03(questionFiche03);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching element:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getToken()
        const fetchData2 = async () => {
            await fetchElement();
            await getBdc()
        }
        fetchData2()
    }, [cin, token]);


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

    if (!cin || !token) {
        return (
            <NotFound />
        )
    }


    return fiche03 && (
        <div className='w-full max-h-[100%] overflow-x-auto'>
            <Fiche03ModifScreen
                fiche={fiche03}
                appele={appele}
                demande={demande}
                degre={degre}
                beneficier={beneficier}
                questionFiche03={questionFiche03}
                setLoading={setLoading}
                cin={cin}
            />

        </div>
    );
}

