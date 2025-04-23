import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../../../api/axios-client'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import ButtonComponent from '../../../component/ButtonComponent';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { ButtonsComponent } from '../../../component/ButtonsComponent';
import { ProfilGraphique } from './ProfilGraphique';
import { FreeButton } from '../../../component/FreeButton';
import { TokenContext } from '../../../contexts/TokenContext';

export const FicheReponse = () => {
    const { beneficier, getBeneficier, type } = useContext(BeneficierContext)
    const { getTraduction } = useContext(LanguageContext)

    const [notes, setNotes] = useState({});
    const navigate = useNavigate()

    const calculateRowTotal = (indices) => {
        return indices.reduce((total, n) => {
            const noteKey = `noteQ${n}`;
            return total + (notes[noteKey] || 0);
        }, 0);
    };

    const pickProfil = (total) => {
        if (total > 0 && total <= 6)
            return "Intérêt non significatif"
        else if (total >= 7 && total <= 13)
            return "Intérêt discret"
        else if (total >= 14 && total <= 21)
            return "Intérêt significatif"
        else if (total >= 22 && total <= 30)
            return "Intérêt élevé"
    };

    async function fetchData() {
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

    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
        } else
            getToken()
    }, [cin, token])

    const rows = [
        { label: "Artistique", indices: [1, 8, 15, 22, 29, 36, 43, 50, 57, 64] },
        { label: 'Judiciaire\nÉconomique\nAdministratif ', indices: [2, 9, 16, 23, 30, 37, 44, 51, 58, 65] },
        { label: "Linguistique\nTouristique", indices: [3, 10, 17, 24, 31, 38, 45, 52, 59, 66] },
        { label: "Scientifique", indices: [4, 11, 18, 25, 32, 39, 46, 53, 60, 67] },
        { label: "Social", indices: [5, 12, 19, 26, 33, 40, 47, 54, 61, 68] },
        { label: "Technique", indices: [6, 13, 20, 27, 34, 41, 48, 55, 62, 69] },
        { label: "Humaniste\nLittéraire", indices: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70] }
    ];

    return (
        <div>
            <h1 className='font-bold text-left text-xl text-magenta '>Synthése de la réponse</h1>
            <table className="w-full table-auto text-left">

                <thead className="bg-white">
                    <tr className='border-2 bg-magenta border-magenta'>
                        <th className="border-r border-white p-2">
                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                Thémes
                            </p>
                        </th>

                        <th className="border-r border-white p-2">
                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                Points
                            </p>
                        </th>
                        {beneficier.role !== "AGENTANAPEC" && <th className="border-r border-white p-2">
                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                Interêts
                            </p>
                        </th>}
                        <th className="p-2">
                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">
                                Questions
                            </p>
                        </th>
                    </tr>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <th className="border-y border-x border-magenta p-2">
                                <p className="font-sans text-base text-black flex items-center justify-start gap-2 font-semibold leading-relaxed">
                                    {row.label.split('\n').map((part, index) => (
                                        <React.Fragment key={index}>
                                            {index > 0 && <br />}
                                            {part}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </th>
                            <th className="border-y border-x border-magenta p-2 w-24 bg-white text-black">
                                <p className="font-sans text-base flex items-center justify-center gap-2 font-semibold leading-none">
                                    {calculateRowTotal(row.indices)}
                                </p>
                            </th>
                            {beneficier.role !== "AGENTANAPEC" && <th className="border-y border-x border-magenta p-2 w-auto bg-white text-black">
                                <p className="font-sans text-base flex items-center justify-center gap-2 font-semibold leading-relaxed">
                                    {pickProfil(calculateRowTotal(row.indices))}
                                </p>
                            </th>}
                            <th className='border-x border-y border-magenta' >
                                <div className='w-full flex items-center justify-center'>
                                    {row.indices.map((n) => (
                                        <div key={n} className="w-full p-2">
                                            <p className="h-full font-sans text-base text-center text-black pb-2 font-semibold">
                                                Quest {n}
                                            </p>
                                            <p className=" h-full font-sans text-base text-black text-center gap-2 font-semibold">
                                                {notes[`noteQ${n}`] || 0}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </th>

                        </tr>
                    ))}
                </thead>

            </table>
            <FreeButton color={"bg-magenta my-4 text-lg"} onClick={() => navigate("../graph")}> Profil grafique</FreeButton>
            <ButtonsComponent
                type="button"
                color1="bg-gray-dark"
                onClick1={() => navigate('/BDC/fiche14')}
                titleButton1={getTraduction('revenir', { FR: 'Revenir', AR: 'التالي', EN: 'Next' })}
                color2="bg-magenta"
                onClick2={() => navigate('/BDC/fiche15')}
                titleButton2={getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
            >
            </ButtonsComponent>

            {/* <ProfilGraphique /> */}
        </div>
    );
};
