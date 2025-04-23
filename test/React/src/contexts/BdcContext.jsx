import React, { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axios-client";
import { BeneficierContext } from "./BeneficierContext";
import { TokenContext } from "./TokenContext";

const BdcContext = createContext()

const BdcProvider = ({ children }) => {
    const [bilanDC, setBdc] = useState({})
    const { beneficier } = useContext(BeneficierContext)
    const [type, setType] = useState()
    const [types, setTypes] = useState()
    const { cin, getToken } = useContext(TokenContext)

    async function getBdc() {
        try {
            const response = await axiosClient.get(`/BDC?cin=${cin}`);
            console.log("BDC:", response.data?.bdc);
            setBdc(response.data?.bdc);
            setType(response.data?.type_beneficier);
            setTypes(response.data?.type)
        } catch (error) {
            console.error("Error fetching element:", error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            await getToken();

            await getBdc()
        }

        fetchData();

    }, [beneficier?.cin])

    const bdcValue = {
        bilanDC,
        getBdc,
        type,
        types
    }
    return (
        <BdcContext.Provider value={bdcValue}>{children}</BdcContext.Provider>
    )
}

export { BdcContext, BdcProvider } 
