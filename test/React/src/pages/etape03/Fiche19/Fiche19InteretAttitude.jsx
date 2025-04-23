import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../../../api/axios-client'
import { FreeButton } from '../../../component/FreeButton'
import { FreeIconButton } from '../../../component/FreeIconButton'
import { TiDeleteOutline } from 'react-icons/ti'
import { TokenContext } from '../../../contexts/TokenContext'

export const Fiche19InteretAttitude = ({ beneficier, getBeneficier, getTraduction, ficheID, softskills, DBSoftskills }) => {

    const [ficheResultat, setFicheResultat] = useState({})
    const [fiche, setFiche] = useState([])
    const [notes, setNotes] = useState({});
    const [fiche16Result, setFiche16Result] = useState([])
    const [softskill, setSoftskill] = useState("")


    async function fetchData() {
        const response = await axiosClient.get(`/fiche15Resultat?cin=${cin}`)
        const fiche16Result = await axiosClient.get(`/fiche16/select?cin=${cin}`)
        const { fiche, ficheResultat } = response.data
        setFicheResultat(ficheResultat)
        setFiche(fiche)
        setFiche16Result(fiche16Result.data.filtredQuestions)

    }

    const calculateRowTotal = (indices) => {
        return indices.reduce((total, n) => {
            const noteKey = `noteQ${n}`;
            return total + (notes[noteKey] || 0);
        }, 0);
    };

    async function fetchDataFiche14() {
        try {
            const response = await axiosClient.get(`/fiche14/index?cin=${cin}`);
            const { fiche } = response.data;

            const newNotes = {};
            for (let i = 1; i <= 70; i++) {
                const noteKey = `noteQ${i}`;
                if (fiche[noteKey] !== undefined) {
                    newNotes[noteKey] = fiche[noteKey];
                }
            }
            setNotes(newNotes);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const rows = [
        { label: "Artistique", indices: [1, 8, 15, 22, 29, 36, 43, 50, 57, 64] },
        { label: 'Judiciaire Économique Administratif ', indices: [2, 9, 16, 23, 30, 37, 44, 51, 58, 65] },
        { label: "Linguistique Touristique", indices: [3, 10, 17, 24, 31, 38, 45, 52, 59, 66] },
        { label: "Scientifique", indices: [4, 11, 18, 25, 32, 39, 46, 53, 60, 67] },
        { label: "Social", indices: [5, 12, 19, 26, 33, 40, 47, 54, 61, 68] },
        { label: "Technique", indices: [6, 13, 20, 27, 34, 41, 48, 55, 62, 69] },
        { label: "Humaniste Littéraire", indices: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70] }
    ];


    const rowsWithTotals = rows.map(row => ({
        ...row,
        total: calculateRowTotal(row.indices)
    }));

    const topThreeRows = rowsWithTotals
        .sort((a, b) => b.total - a.total)
        .slice(0, 3);


    async function handleSoftSkills() {
        const data = {
            softskill
        }
        try {
            console.log("metier desire : ", JSON.stringify(data, null, 3))
            const response = await axiosClient.post(`/fiche19/storeSoftSkills/${ficheID}?cin=${cin}`, data)
            console.log("message : ", response.data.message);
        } catch (error) {
            console.log("error :", error)
        }
    }


    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
            fetchDataFiche14()
        } else
            getToken()
    }, [cin, token])


    return (
        <div className='mb-4'>

            <div className="flex flex-nowrap gap-4 mt-2 justify-start">

                <div className="bg-white w-1/3 sm:w-1/3">
                    <h1 className='text-lg font-semibold'>Attitudes</h1>
                    <ul className="list-disc mt-2 text-black bg-gray-light bg-opacity-40 rounded-md">
                        <div className="flex py-1 px-5 w-full">
                            <span className="flex items-center w-full gap-4 font-normal text-sm">
                                <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                {getTraduction(fiche.find((e) => (e.valeur_id?.valeur_id === ficheResultat.valeurPro_P1))?.valeur_id?.valeur_id, fiche.find((e) => (e.valeur_id?.valeur_id === ficheResultat.valeurPro_P1))?.valeur_id)}
                            </span>
                        </div>
                        <div className="flex py-1 px-5 w-full">
                            <span className="flex items-center w-full gap-4 font-normal text-sm">
                                <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                {getTraduction(fiche.find((e) => (e.valeur_id?.valeur_id === ficheResultat.valeurPro_P2))?.valeur_id?.valeur_id, fiche.find((e) => (e.valeur_id?.valeur_id === ficheResultat.valeurPro_P2))?.valeur_id)}
                            </span>
                        </div>
                        <div className="flex py-1 px-5 w-full">
                            <span className="flex items-center w-full gap-4 font-normal text-sm">
                                <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                {getTraduction(fiche.find((e) => (e.valeur_id?.valeur_id === ficheResultat.valeurPro_P3))?.valeur_id?.valeur_id, fiche.find((e) => (e.valeur_id?.valeur_id === ficheResultat.valeurPro_P3))?.valeur_id)}
                            </span>
                        </div>

                    </ul>
                </div>
                <div className="bg-white w-1/3 sm:w-1/3">
                    <h1 className='text-lg font-semibold'>Intérets</h1>

                    <ul className="list-disc mt-2 text-black bg-gray-light bg-opacity-40 rounded-md">
                        {topThreeRows.map((row, index) => (
                            <div key={index} className="flex py-1 px-5 w-full">
                                <span className="flex items-center w-full gap-4 font-normal text-sm">
                                    <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                    {`${row.label} - ${row.total}`}
                                </span>
                            </div>
                        ))}
                    </ul>
                </div>

                <div className="bg-white w-1/3 sm:w-1/3">
                    <h1 className='text-lg font-semibold'>Softskills</h1>

                    <ul className="list-disc mt-2 text-black bg-gray-light bg-opacity-40 rounded-md">
                        {softskills.map((ss) => (
                            <div key={ss?.id} className="flex py-1 px-5 w-full">
                                <span className="flex items-center w-full gap-4 font-normal text-sm">
                                    <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                    {getTraduction(DBSoftskills?.find((e) => (e?.valeur_id?.valeur_id === ss?.softskill))?.valeur_id?.valeur_id, DBSoftskills.find((e) => (e.valeur_id?.valeur_id === ss?.softskill))?.valeur_id)}
                                </span>
                            </div>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}

