import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../api/axios-client';
import Fiche04ModifScreen from './Fiche04ModifScreen';
import { ThreeDots } from 'react-loader-spinner';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import { BdcContext } from '../../../contexts/BdcContext';
import { TokenContext } from '../../../contexts/TokenContext';
import { NotFound } from '../../../screens/NotFound';

export default function Fiche04Screen() {
    const date = new Date();
    const [fiche04, setFiche04] = useState(null);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [questionFiche04, setQuestionFiche04] = useState({});
    const [loading, setLoading] = useState(true);
    const { beneficier, fetchBeneficiaireData } = useContext(BeneficierContext);
    const { getBdc } = useContext(BdcContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    const fetchData = async () => {
        try {
            const response = await axiosClient.get(`/fiche04?cin=${cin}`);
            setFiche04(response.data.fiche04);
            setNom(beneficier?.nom);
            setPrenom(beneficier?.prenom);
            setQuestionFiche04(response.data.questionFiche04);
        } catch (error) {
            console.error("Error fetching element:", error);
            setFiche04(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getToken()
        const fetchData2 = async () => {
            await fetchData();
            await getBdc()
            await fetchBeneficiaireData()
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
                    />
                    <span className="text-lg text-gray-middle">Chargement des données...</span>
                </div>
            </div>
        );
    }

    return (
        fiche04 ? (
            <div className='w-full max-h-[100%] overflow-x-auto'>
                <Fiche04ModifScreen
                    fiche={fiche04}
                    nom={nom}
                    prenom={prenom}
                    questionFiche04={questionFiche04}
                    role={role}
                    setLoading={setLoading}
                    cin={cin}
                    beneficier={beneficier?.nom}
                    nomAgent={nomAgent}
                />
            </div>
        ) : (
            <div className="flex items-center justify-center w-full h-screen bg-gray-light">
                <span className="text-lg text-gray-middle">Aucune fiche trouvée.</span>
            </div>
        )
    );
}
