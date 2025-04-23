import axiosClient from "../api/axios-client";

export const fetchBeneficiaireData = async () => {
    try {
        const response = await axiosClient.get(`/beneficier/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch beneficiary data');
        }
        const data = await response.json();
        console.log("data beneficier : ", data)
        return data;
    } catch (error) {
        console.error('Error fetching beneficiary data:', error);
        return null;
    }
};