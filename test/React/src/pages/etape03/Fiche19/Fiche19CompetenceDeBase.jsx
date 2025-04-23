import React, { useContext, useEffect, useState } from 'react'
import { FreeButton } from '../../../component/FreeButton'
import { FreeIconButton } from '../../../component/FreeIconButton'
import { TiDeleteOutline } from 'react-icons/ti'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import axiosClient from '../../../api/axios-client'
import { TokenContext } from '../../../contexts/TokenContext'

export const Fiche19CompetenceDeBase = () => {

    const [competences_savoir, setCompetences_savoir] = useState([])
    const [competences_savoirfaire, setCompetences_savoirfaire] = useState([])
    const [competences_savoiretre, setCompetences_savoiretre] = useState([])
    async function fetchData() {
        const responseSavoir = await axiosClient.get(`/ficheCompetenceConnaissance?cin=${cin}`)
        const responseSavoirFaire = await axiosClient.get(`/ficheCompetenceQualite?cin=${cin}`)
        const responseSavoirEtre = await axiosClient.get(`/ficheCompetenceTechnique?cin=${cin}`)

        setCompetences_savoir(responseSavoir.data.ficheCompetenceConnaissance)
        setCompetences_savoirfaire(responseSavoirFaire.data.ficheCompetenceQualite)
        setCompetences_savoiretre(responseSavoirEtre.data.ficheCompetenceTechnique)
    }


    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
        } else
            getToken()
    }, [cin, token, nomAgent])


    return (
        <div className='mb-4 w-2/3'>
            <h1 className='text-lg font-semibold'>Compétences de base</h1>

            <div className="flex flex-nowrap gap-8 mt-2 justify-start">
                <div className="bg-white w-1/3 sm:w-1/3">
                    <h2 className="text-sm font-medium">Savoir</h2>
                    <ul className="list-disc text-black bg-gray-light bg-opacity-40 rounded-md">
                        {competences_savoir && competences_savoir.map((c) => (
                            <div key={c.id} className=" py-1 px-5 w-full">
                                <span className="flex items-center gap-4 font-normal text-sm">
                                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {c.connaissance}
                                </span>
                            </div>
                        ))}
                    </ul>
                </div>


                <div className="bg-white w-1/3 sm:w-1/3">
                    <h2 className="text-sm font-medium">Savoir Faire</h2>
                    <ul className="list-disc  text-black bg-gray-light bg-opacity-40 rounded-md">
                        {competences_savoirfaire && competences_savoirfaire.map((t) => (
                            <div key={t.id} className="py-1 px-5 w-ful">
                                <span className="flex items-center gap-4 font-normal text-sm">
                                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {t.qualite}
                                </span>
                            </div>
                        ))}
                    </ul>
                </div>

                <div className="bg-white w-1/3 sm:w-1/3">
                    <h2 className="text-sm font-medium">Savoir Ètre</h2>

                    <ul className="list-disc text-black bg-gray-light bg-opacity-40 rounded-md">
                        {competences_savoiretre && competences_savoiretre.map((q) => (
                            <div key={q.id} className="py-1 px-5 w-ful">
                                <span className="flex items-center gap-4 font-normal text-sm">
                                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {q.technique}
                                </span>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
