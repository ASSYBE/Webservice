import React, { useContext, useEffect, useState } from 'react'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { LanguageContext } from '../../../contexts/LanguageContext'
import axiosClient from '../../../api/axios-client'
import ButtonComponent from '../../../component/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import { BdcContext } from '../../../contexts/BdcContext'
import { ResponseOutput } from '../../../component/ResponseOutput';
import { ButtonsComponent } from '../../../component/ButtonsComponent'
import { TokenContext } from '../../../contexts/TokenContext'


export const Fiche13_acquerir = () => {
    const [parametreMScore, setParametreMScore] = useState({})
    const [parametreBScore, setParametreBScore] = useState([])

    const [score_1, setScore_1] = useState("")
    const [score_2, setScore_2] = useState("")
    const [score_3, setScore_3] = useState("")
    const [score_4, setScore_4] = useState("")
    const [score_5, setScore_5] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const [ficheAcquerir, setFicheAcquerir] = useState({})
    const navigate = useNavigate()


    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { getTraduction } = useContext(LanguageContext)
    const { getBdc } = useContext(BdcContext)

    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
            getBdc()
        } else
            getToken()
    }, [cin, token])

    async function fetchData() {
        const response = await axiosClient.get(`fiche13Acquerir?cin=${cin}`);
        const { parametreBScore, parametreMScore, fiche_acquerir } = response.data
        setFicheAcquerir(fiche_acquerir)
        setScore_1(fiche_acquerir?.result1?.id_competence_acquerir)
        setScore_2(fiche_acquerir?.result2?.id_competence_acquerir)
        setScore_3(fiche_acquerir?.result3?.id_competence_acquerir)
        setScore_4(fiche_acquerir?.result4?.id_competence_acquerir)
        setScore_5(fiche_acquerir?.result5?.id_competence_acquerir)
        setParametreBScore(parametreBScore || [])
        setParametreMScore(parametreMScore || [])
        console.log("fiche A:", parametreMScore)
    }


    async function handleSubmit() {

        const formData = {
            competence_acquerir: [
                { id_competence_acquerir: score_3 },
                { id_competence_acquerir: score_2 },
                { id_competence_acquerir: score_3 },
                { id_competence_acquerir: score_4 },
                { id_competence_acquerir: score_5 }
            ]
        };


        console.log('FormData to be sent:', formData);

        try {
            if (ficheAcquerir) {
                const formupdate = {
                    competence_acquerir: [
                        {
                            id: ficheAcquerir?.result1?.id,
                            id_competence_acquerir: score_3
                        },
                        {
                            id: ficheAcquerir?.result2?.id,
                            id_competence_acquerir: score_2
                        },
                        {
                            id: ficheAcquerir?.result3?.id,
                            id_competence_acquerir: score_3
                        },
                        {
                            id: ficheAcquerir?.result4?.id,
                            id_competence_acquerir: score_4
                        },
                        {
                            id: ficheAcquerir?.result5?.id,
                            id_competence_acquerir: score_5
                        }
                    ]
                };
                const response = await axiosClient.put(`/fiche13Acquerir/update?cin=${cin}`, formupdate);
                console.log('Response:', response.data);
            } else {
                const response = await axiosClient.post(`/fiche13Acquerir?cin=${cin}`, formData);
                console.log('Response:', response.data);
            }
            navigate('/BDC/fiche14')
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }


    return (
        <form className='mt-6'>

            <ButtonsComponent
                type="button"
                color1="bg-gray-dark"
                onClick1={() => navigate('/BDC/fiche13/competence1')}
                titleButton1={getTraduction('revenir', { FR: 'Revenir', AR: 'التالي', EN: 'Next' })}
                color2="bg-magenta"
                onClick2={() => setIsOpen(true)}
                titleButton2={getTraduction(`enregistrer`, { FR: `Enregistrer`, AR: `التالي`, EN: `Next` })}
            ></ButtonsComponent>
            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={`Les Compétences à acquérir`}
                buttonVName="Oui"
                buttonCName="Non"
            />
            <h1 className='text-left text-xl font-semibold text-magenta'>Synthése de la réponse</h1>
            <table className=" w-full table-auto text-left">
                <thead className='bg-magenta '>
                    <tr className='border-x-2 border-y border-magenta' >
                        <th className="border-r border-white p-2">
                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                Faire un classement des compétences les plus développées
                            </p>
                        </th>
                        <th className=" p-2">
                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                Choisissez les compétences que vous n'avez pas et que vous aimeriez acquérir
                            </p>
                        </th>

                    </tr>
                </thead>
                <tbody className='bg-white '>
                    <tr>
                        <th className="border-y border-x border-magenta p-2">
                            <p className="font-sans text-base text-black gap-2 font-normal text-start leading-none">
                                {getTraduction(parametreMScore?.parametre5?.valeur_id, parametreMScore?.parametre5)}
                            </p>
                        </th>
                        <th class="cursor-pointer border-y border-x border-magenta p-2">
                            <select value={score_1} onChange={(e) => setScore_1(e.target.value)} class="font-sans text-sm w-full text-center text-black bg-gray-light py-2 rounded-md flex items-center justify-center gap-2 font-normal leading-none ">
                                {parametreBScore.map((e) => (
                                    <option
                                        value={e.valeur_id}
                                    >{getTraduction(e?.uuid, e)}</option>
                                ))}
                            </select>
                        </th>

                    </tr>
                    <tr>
                        <th className="border-y border-x border-magenta p-2">
                            <p className="font-sans text-base text-black text-start gap-2 font-normal leading-none">
                                {getTraduction(parametreMScore?.parametre4?.valeur_id, parametreMScore?.parametre4)}
                            </p>
                        </th>
                        <th class="cursor-pointer border-y border-x border-magenta p-2">
                            <select value={score_2} onChange={(e) => setScore_2(e.target.value)} class="font-sans text-sm w-full text-center text-black bg-gray-light py-2 rounded-md flex items-center justify-center gap-2 font-normal leading-none ">
                                {parametreBScore.map((e) => (
                                    <option value={e?.valeur_id}
                                    >{getTraduction(e?.uuid, e)}</option>
                                ))}
                            </select>
                        </th>

                    </tr>
                    <tr>
                        <th className="border-y border-x border-magenta p-2">
                            <p className="font-sans text-base text-black text-start gap-2 font-normal leading-none">
                                {getTraduction(parametreMScore?.parametre3?.valeur_id, parametreMScore?.parametre3)}
                            </p>
                        </th>
                        <th class="cursor-pointer border-y border-x border-magenta p-2">
                            <select value={score_3} onChange={(e) => setScore_3(e.target.value)} class="font-sans text-sm w-full text-center text-black bg-gray-light py-2 rounded-md flex items-center justify-center gap-2 font-normal leading-none ">
                                {parametreBScore.map((e) => (
                                    <option value={e?.valeur_id}>{getTraduction(e?.uuid, e)}</option>
                                ))}
                            </select>
                        </th>

                    </tr>
                    <tr>
                        <th className="border-y border-x border-magenta p-2">
                            <p className="font-sans text-base text-black text-start gap-2 font-normal leading-none">
                                {getTraduction(parametreMScore?.parametre2?.valeur_id, parametreMScore?.parametre2)}
                            </p>
                        </th>
                        <th class="cursor-pointer border-y border-x border-magenta p-2">
                            <select value={score_4} onChange={(e) => setScore_4(e.target.value)} class="font-sans text-sm w-full text-center text-black bg-gray-light py-2 rounded-md flex items-center justify-center gap-2 font-normal leading-none ">
                                {parametreBScore.map((e) => (
                                    <option value={e?.valeur_id}>{getTraduction(e?.uuid, e)}</option>
                                ))}
                            </select>
                        </th>

                    </tr>
                    <tr>
                        <th className="border-y border-x border-magenta p-2">
                            <p className="font-sans text-base text-black text-start gap-2 font-normal leading-none">
                                {getTraduction(parametreMScore?.parametre1?.valeur_id, parametreMScore?.parametre1)}
                            </p>
                        </th>
                        <th class="cursor-pointer border-y border-x border-magenta p-2">
                            <select value={score_5} onChange={(e) => setScore_5(e.target.value)} class="font-sans text-sm w-full text-center text-black bg-gray-light py-2 rounded-md flex items-center justify-center gap-2 font-normal leading-none ">
                                {parametreBScore.map((e) => (
                                    <option value={e?.valeur_id}>{getTraduction(e?.uuid, e)}</option>
                                ))}
                            </select>
                        </th>

                    </tr>

                </tbody>
            </table>

        </form>

    )
}
