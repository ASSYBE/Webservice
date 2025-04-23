import React, { useContext, useEffect, useState } from 'react'
import { FreeButton } from '../component/FreeButton'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BeneficierContext } from '../contexts/BeneficierContext'
import { TokenContext } from '../contexts/TokenContext'

export const StartPage = () => {
    const { token, cin, nomAgent, role, generateToken, getToken } = useContext(TokenContext)
    const { beneficier, fetchBeneficiaireData } = useContext(BeneficierContext)

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate()

    const queryCin = queryParams.get('cin')
    const queryNom = queryParams.get('nom')

    function saveData() {
        if (!queryCin) {
            console.error("Token ou CIN manquant !");
            return;
        }

        navigate(`/BDC?cin=${queryCin}&token=${token}`);
    }

    useEffect(() => {
        console.log('cin : ', queryCin)
        generateToken(queryCin, queryNom);
        getToken()
    }, [queryCin, queryNom]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-light">
            <FreeButton onClick={saveData} color="bg-magenta">
                Bilan de compétence
            </FreeButton>
        </div>
    );
}
