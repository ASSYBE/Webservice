import { createContext, useEffect, useState } from "react";
import useBeneficiaire from "../hooks/useBeneficiaire";
import { getBeneficiaireData, storeBeneficiaireData } from "../utils/beneficiaireStorage";
import axiosClient from "../api/axios-client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { parseString } from 'xml2js';


const BeneficierContext = createContext();

const BeneficierProvider = ({ children }) => {
    const [beneficier, setBeneficier] = useState({});
    const [type, setType] = useState("");
    const [id, setId] = useState("UUID_BE_1");

    function removeBeneficier() {
        setBeneficier({})
    }

    // const fetch_all_info_xml = async (id) => {
    //     const soapurl = `http://localhost:8001/api/get_data/${id}`;

    //     const requestBody = `
    //     <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://schema.example.com">
    //     <soapenv:Header/>
    //     <soapenv:Body>
    //         <sch:GetData>
    //             <id>${id}</id>
    //         </sch:GetData>
    //     </soapenv:Body>
    //     </soapenv:Envelope>
    //     `;

    //     const headers = {
    //     'Content-Type': 'text/xml; charset=utf-8'
    //     };

    //     try {
    //         const response = await axios.post(soapurl, requestBody, { headers });
    //         console.log("Raw XML Response:", response.data); // Log raw XML for debugging
    //     } catch (error) {
    //         console.error("Error fetching element:", error);
    //     }
    // };

    const fetchBeneficiaireData = async () => {
        try {
            const response = await axiosClient.get(`/beneficier/${id}`);
            if (response.status === 200) {
                console.log("Données du bénéficiaire:", response.data.beneficier);
                // await fetch_all_info_xml(id);
                setBeneficier(response.data.beneficier);
                storeBeneficiaireData({ cin: response.data.beneficier.cin });
            } else {
                throw new Error('Échec de la récupération des données du bénéficiaire');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du bénéficiaire:', error);
        }
    };

    const getBeneficier = () => {
        const data = getBeneficiaireData();
        if (data) {
            setBeneficier(data);
        } else {
            console.warn("No beneficiary data found in sessionStorage.");
        }
    };

    return (
        <BeneficierContext.Provider value={{ beneficier, getBeneficier, removeBeneficier, fetchBeneficiaireData }}>
            {children}
        </BeneficierContext.Provider>
    );
};

export { BeneficierProvider, BeneficierContext };