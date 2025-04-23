import { useState, useEffect, useContext } from 'react';
import { storeBeneficiaireData, getBeneficiaireData, removeBeneficiaireData } from '../utils/beneficiaireStorage';
import axiosClient from '../api/axios-client';

const useBeneficiaire = () => {
    const [beneficiaire, setBeneficiaire] = useState(null);
    const [id, setId] = useState("UUID_BE_1");

    const fetchBeneficiaireData = async () => {
        try {
            const response = await axiosClient.get(`/beneficier/${id}`);
            if (response.status === 200) {
                console.log("Beneficiaire data: ", response.data);
                return response.data;
            } else {
                throw new Error('Failed to fetch beneficiary data');
            }
        } catch (error) {
            console.error('Error fetching beneficiary data:', error);
            return null;
        }
    };

    useEffect(() => {
        const storedBeneficiaire = getBeneficiaireData();

        if (storedBeneficiaire) {
            setBeneficiaire(storedBeneficiaire);
        } /*else {
            const getData = async () => {
                const data = await fetchBeneficiaireData();
                if (data) {
                    storeBeneficiaireData(data);
                    setBeneficiaire(data);
                }
            };
            getData();
        }*/
    }, [id, beneficiaire?.beneficier?.cin]);

    return [beneficiaire, setBeneficiaire];
};

export default useBeneficiaire;
