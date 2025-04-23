import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../api/axios-client';
import Fiche07ModifScreen from './Fiche07ModifScreen';
import { ThreeDots } from 'react-loader-spinner';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { BdcContext } from '../../../contexts/BdcContext';
import { TokenContext } from '../../../contexts/TokenContext';
import { NotFound } from '../../../screens/NotFound';

export default function Fiche07Screen() {

    const [fiche07, setFiche07] = useState(false);
    const [loading, setLoading] = useState(true)
    const date = new Date()
    const [date_creation, setDate_creation] = useState(date.toISOString().split('T')[0])
    const { beneficier, fetchBeneficiaireData } = useContext(BeneficierContext)
    const { getBdc } = useContext(BdcContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    async function fetchData() {
        try {

            const response = await axiosClient.get(`/fiche07?cin=${cin}`);
            setFiche07(response.data.fiche)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching element:", error);
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


    return (
        <div className='w-full max-h-[100%] overflow-x-auto'>
            {fiche07 &&
                <Fiche07ModifScreen fiche={fiche07} cin={cin} nomAgent={beneficier?.nom} />}
        </div>
    );
}

