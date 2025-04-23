import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../../../api/axios-client'
import { TokenContext } from '../../../contexts/TokenContext';

export const Fiche19Transversale = ({ getTraduction }) => {

    const [transversales, setTransversales] = useState([])


    async function fetchData() {
        const response = await axiosClient.get(`fiche13Acquerir?cin=${cin}`);
        const { parametreMScore } = response.data
        setTransversales(Object.entries(parametreMScore));
    }

    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
        } else
            getToken()
    }, [cin, token])

    return (
        <div className='w-1/3 mb-4'>
            <h1 className='text-lg font-semibold'>Compétences Transversales</h1>
            <ul className="list-disc mt-2 text-black bg-gray-light bg-opacity-40 rounded-md">
                {transversales && transversales
                    .sort((a, b) => b[1]?.valeur_id - a[1]?.valeur_id)
                    .map(([key, value], index) => (
                        <div key={key} className="flex py-1 px-5">
                            <span className="flex items-center gap-4 font-normal text-sm">
                                <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                {`${getTraduction(value?.valeur_id, value)}`}
                            </span>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}
