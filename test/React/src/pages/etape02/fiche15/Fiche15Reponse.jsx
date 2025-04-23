import React, { useContext, useEffect, useState } from 'react'
import ButtonComponent from '../../../component/ButtonComponent'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { BdcContext } from '../../../contexts/BdcContext'
import axiosClient from '../../../api/axios-client'
import { useNavigate } from 'react-router-dom'
import { ResponseOutput } from '../../../component/ResponseOutput'
import { ButtonsComponent } from '../../../component/ButtonsComponent'
import { TokenContext } from '../../../contexts/TokenContext'

export const Fiche15Reponse = () => {

    const { getTraduction } = useContext(LanguageContext)
    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { getBdc } = useContext(BdcContext)
    const [fiche, setFiche] = useState([])
    const [ficheResultat, setFicheResultat] = useState({})
    const [valeurPro_P1, setValeurPro_P1] = useState("")
    const [contextPro_1, setContextPro_1] = useState("")

    const [valeurPro_P2, setValeurPro_P2] = useState("")
    const [contextPro_2, setContextPro_2] = useState("")

    const [valeurPro_P3, setValeurPro_P3] = useState("")
    const [contextPro_3, setContextPro_3] = useState("")

    const [valeurPro_P4, setValeurPro_P4] = useState("")
    const [contextPro_4, setContextPro_4] = useState("")

    const [valeurPro_P5, setValeurPro_P5] = useState("")
    const [contextPro_5, setContextPro_5] = useState("")

    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()

    async function fetchData() {
        const response = await axiosClient.get(`/fiche15Resultat?cin=${cin}`)
        const { fiche, ficheResultat } = response.data
        setFiche(fiche)
        setFicheResultat(ficheResultat)

        console.log("fichier resultat : ", JSON.stringify(fiche, null, 3))
        setValeurPro_P1(ficheResultat.valeurPro_P1)
        setContextPro_1(ficheResultat.contextPro_1)

        setValeurPro_P2(ficheResultat.valeurPro_P2)
        setContextPro_2(ficheResultat.contextPro_2)

        setValeurPro_P3(ficheResultat.valeurPro_P3)
        setContextPro_3(ficheResultat.contextPro_3)

        setValeurPro_P4(ficheResultat.valeurPro_P4)
        setContextPro_4(ficheResultat.contextPro_4)

        setValeurPro_P5(ficheResultat.valeurPro_P5)
        setContextPro_5(ficheResultat.contextPro_5)

    }
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
            getBdc()
        } else
            getToken()
    }, [cin, token])

    async function handleSubmit() {

        const formData = {
            valeurPro_P1,
            contextPro_1,
            valeurPro_P2,
            contextPro_2,
            valeurPro_P3,
            contextPro_3,
            valeurPro_P4,
            contextPro_4,
            valeurPro_P5,
            contextPro_5
        };

        console.log('formData : ', JSON.stringify(formData, null, 3));

        try {
            if (ficheResultat?.id) {
                const response = await axiosClient.put(`/fiche15Resultat/${ficheResultat.id}?cin=${cin}`, formData);
                console.log('Réponse API de modification : ', response.data);
                navigate('/BDC/fiche16')
            } else {
                const response = await axiosClient.post(`/fiche15Resultat?cin=${cin}`, formData);
                console.log('Réponse API de création : ', response.data);
                navigate('/BDC/fiche16')
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données : ', error);
        }
    }


    return (
        <form className='mt-6'>
            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={`Liste des valeurs professionnelles`}
                buttonVName="Oui"
                buttonCName="Non"
            />
            <h1 className='font-bold text-left text-xl text-magenta '>Synthése de la réponse</h1>
            <table className="w-full min-w-max table-auto text-left">
                <thead className='bg-magenta'>
                    <tr className='border-magenta border-x border-y'>
                        <th className="border-r border-white p-2">
                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                Priorité
                            </p>
                        </th>
                        <th className="border-r border-white p-2">
                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                Valeur professionnelle
                            </p>
                        </th>
                        <th className=" p-2">
                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                Dans quel contexte professionnel avez-vous mis en œuvre cette valeur ?
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white '>

                    <tr>
                        <th className="border-y border-x border-magenta p-2">
                            <p className="font-sans text-base text-dark flex items-center justify-center gap-2 font-semibold leading-none">
                                1
                            </p>
                        </th>
                        <th class="cursor-pointer border-y border-x border-magenta p-4">
                            <select value={valeurPro_P1} onChange={(e) => setValeurPro_P1(e.target.value)} class="antialiased font-sans w-full text-base text-center text-black bg-gray-light border border-gray-dark focus:border-black py-2 rounded-md flex items-center justify-center gap-2 font-normal leading-none ">
                                {fiche.map((e) => (
                                    <option value={e?.valeur_id?.valeur_id}>{getTraduction(e.valeur_id?.uuid, e.valeur_id)}</option>
                                ))}
                            </select>
                        </th>
                        <th className="border-y border-x border-magenta p-2">
                            <div className="flex items-center justify-center ml-3">
                                <input
                                    type="text"
                                    className="py-2 px-4 w-full h-12 bg-gray-light text-base font-normal rounded-lg border border-gray-dark focus:border-black"
                                    value={contextPro_1}
                                    onChange={(e) => setContextPro_1(e.target.value)}
                                />
                            </div>
                        </th>

                    </tr>
                    <tr>
                        <th className="border-y border-x border-magenta p-2">
                            <p className="font-sans text-base text-dark flex items-center justify-center gap-2 font-semibold leading-none">
                                2
                            </p>
                        </th>
                        <th class="cursor-pointer border-y border-x border-magenta p-4">
                            <select value={valeurPro_P2} onChange={(e) => setValeurPro_P2(e.target.value)} class="antialiased font-sans w-full text-base text-center text-black bg-gray-light border border-gray-dark focus:border-black py-2 rounded-md flex items-center justify-center gap-2 font-normal leading-none ">
                                {fiche.map((e) => (
                                    <option value={e?.valeur_id?.valeur_id}>{getTraduction(e.valeur_id?.uuid, e.valeur_id)}</option>
                                ))}
                            </select>
                        </th>
                        <th className="border-y border-x border-magenta p-2">
                            <div className="flex items-center justify-center ml-3">
                                <input
                                    type="text"
                                    className="py-2 px-4 w-full h-12 bg-gray-light text-base font-normal rounded-lg border border-gray-dark focus:border-black"
                                    value={contextPro_2}
                                    onChange={(e) => setContextPro_2(e.target.value)}
                                />
                            </div>
                        </th>

                    </tr>
                    <tr>
                        <th className="border-y border-x border-magenta p-2">
                            <p className="font-sans text-base text-dark flex items-center justify-center gap-2 font-semibold leading-none">
                                3
                            </p>
                        </th>
                        <th class="cursor-pointer border-y border-x border-magenta p-4">
                            <select value={valeurPro_P3} onChange={(e) => setValeurPro_P3(e.target.value)} class="antialiased font-sans w-full text-base text-center text-black bg-gray-light border border-gray-dark focus:border-black py-2 rounded-md flex items-center justify-center gap-2 font-normal leading-none ">
                                {fiche.map((e) => (
                                    <option value={e?.valeur_id?.valeur_id}>{getTraduction(e.valeur_id?.uuid, e.valeur_id)}</option>
                                ))}
                            </select>
                        </th>
                        <th className="border-y border-x border-magenta p-2">
                            <div className="flex items-center justify-center ml-3">
                                <input
                                    type="text"
                                    className="py-2 px-4 w-full h-12 bg-gray-light text-base font-normal rounded-lg border border-gray-dark focus:border-black"
                                    value={contextPro_3}
                                    onChange={(e) => setContextPro_3(e.target.value)}
                                />
                            </div>
                        </th>

                    </tr>
                    <tr>
                        <th className="border-y border-x border-magenta p-2">
                            <p className="font-sans text-base text-dark flex items-center justify-center gap-2 font-semibold leading-none">
                                4
                            </p>
                        </th>
                        <th class="cursor-pointer border-y border-x border-magenta p-4">
                            <select value={valeurPro_P4} onChange={(e) => setValeurPro_P4(e.target.value)} class="antialiased font-sans w-full text-base text-center text-black bg-gray-light border border-gray-dark focus:border-black py-2 rounded-md flex items-center justify-center gap-2 font-normal leading-none ">
                                {fiche.map((e) => (
                                    <option value={e?.valeur_id?.valeur_id}>{getTraduction(e.valeur_id?.uuid, e.valeur_id)}</option>
                                ))}
                            </select>
                        </th>
                        <th className="border-y border-x border-magenta p-2">
                            <div className="flex items-center justify-center ml-3">
                                <input
                                    type="text"
                                    className="py-2 px-4 w-full h-12 bg-gray-light text-base font-normal rounded-lg border border-gray-dark focus:border-black"
                                    value={contextPro_4}
                                    onChange={(e) => setContextPro_4(e.target.value)}
                                />
                            </div>
                        </th>

                    </tr>

                    <tr>
                        <th className="border-y border-x border-magenta p-2">
                            <p className="font-sans text-base text-dark flex items-center justify-center gap-2 font-semibold leading-none">
                                5
                            </p>
                        </th>
                        <th class="cursor-pointer border-y border-x border-magenta p-4">
                            <select value={valeurPro_P5} onChange={(e) => setValeurPro_P5(e.target.value)} class="antialiased font-sans w-full text-base text-center text-black bg-gray-light border border-gray-dark focus:border-black py-2 rounded-md flex items-center justify-center gap-2 font-normal leading-none ">
                                {fiche.map((e) => (
                                    <option value={e?.valeur_id?.valeur_id}>{getTraduction(e.valeur_id?.uuid, e.valeur_id)}</option>
                                ))}
                            </select>
                        </th>
                        <th className="border-y border-x border-magenta p-2">
                            <div className="flex items-center justify-center ml-3">
                                <input
                                    type="text"
                                    className="py-2 px-4 w-full h-12 bg-gray-light text-base font-normal rounded-lg border border-gray-dark focus:border-black"
                                    value={contextPro_5}
                                    onChange={(e) => setContextPro_5(e.target.value)}
                                />
                            </div>
                        </th>

                    </tr>

                </tbody>
            </table>
            {/*<ButtonComponent type='button' onClick={() => setIsOpen(true)} color={`bg-magenta`}>
                {getTraduction(`enregistrer`, { FR: `Enregistrer`, AR: `التالي`, EN: `Next` })}
            </ButtonComponent> */}
            <ButtonsComponent
                type="button"
                color1="bg-gray-dark"
                onClick1={() => navigate('/BDC/fiche15')}
                titleButton1={getTraduction('revenir', { FR: 'Revenir', AR: 'التالي', EN: 'Next' })}
                color2="bg-magenta"
                onClick2={() => setIsOpen(true)}
                titleButton2={getTraduction('Enregistrer', { FR: 'Enregistrer', AR: 'التالي', EN: 'Next' })}
            >
            </ButtonsComponent>
        </form>
    )
}
