import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../../../api/axios-client'
import { TokenContext } from '../../../contexts/TokenContext'

export const Fiche19Technico = () => {

    const [technico, setTechnico] = useState([])

    async function fetchData() {
        const responseSavoir = await axiosClient.get(`/fiche08FormationInitialeContinue?cin=${cin}`)
        setTechnico(responseSavoir.data.connaissanceFormation)
    }


    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
        } else
            getToken()
    }, [cin, token])


    return (
        <div className='w-1/3 mb-4' >
            <h1 className='text-lg font-semibold'>Compétences Technico-Professionnelles</h1>
            <ul className="list-disc mt-2 text-black bg-gray-light bg-opacity-40 rounded-md">
                {technico && technico.map((c) => (
                    <li key={c.id} className="flex py-1 px-5">
                        <span className="flex items-center gap-4 font-normal text-sm">
                            <div className='w-2 h-2 rounded-full bg-magenta'></div> {c.connaissance}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
