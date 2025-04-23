import React, { useContext, useEffect, useState } from 'react'
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import axiosClient from '../../../api/axios-client';
import { BarChart } from '@mui/x-charts';

import { FreeButton } from '../../../component/FreeButton';
import { useNavigate } from 'react-router-dom';
import { colors } from '@mui/material';
import { anapecRole } from '../../../constants/Variables';
import ButtonComponent from '../../../component/ButtonComponent';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { TokenContext } from '../../../contexts/TokenContext';


export const ProfilGraphique = () => {
    const { beneficier, getBeneficier, type } = useContext(BeneficierContext)
    const { language, getTraduction } = useContext(LanguageContext)

    const [notes, setNotes] = useState({});
    const navigate = useNavigate()


    const calculateRowTotal = (indices) => {
        return indices.reduce((total, n) => {
            const noteKey = `noteQ${n}`;
            return total + (notes[noteKey] || 0);
        }, 0);
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
        { label: 'Judiciaire Économique\nAdministratif ', indices: [2, 9, 16, 23, 30, 37, 44, 51, 58, 65] },
        { label: "Linguistique\nTouristique", indices: [3, 10, 17, 24, 31, 38, 45, 52, 59, 66] },
        { label: "Scientifique", indices: [4, 11, 18, 25, 32, 39, 46, 53, 60, 67] },
        { label: "Social", indices: [5, 12, 19, 26, 33, 40, 47, 54, 61, 68] },
        { label: "Technique", indices: [6, 13, 20, 27, 34, 41, 48, 55, 62, 69] },
        { label: "Humaniste\nLittéraire", indices: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70] }
    ];

    const [chartData, setChartData] = useState({ xAxis: [], series: [] });

    useEffect(() => {
        if (Object.keys(notes).length > 0) {
            const labels = [];
            const data = [];

            rows.forEach((row) => {
                const total = calculateRowTotal(row.indices);
                labels.push(row.label);
                data.push(total);
            });

            setChartData({
                xAxis: [{ id: 'barCategories', data: labels, scaleType: 'band', categoryGapRatio: 0.5 }],
                series: [{ data, color: '#C652C1' }]
            });
        }
    }, [notes]);

    return (
        <div className='w-full flex items-center justify-center'>
            {/* <FreeButton color={"bg-magenta my-4 text-lg"} onClick={() => { beneficier.role !== anapecRole? navigate("../ficheReponse") : navigate('/BDC/fiche14') }}>Retourner</FreeButton> */}
            <ButtonComponent type="button" onClick={() => { beneficier.role == anapecRole ? navigate("../ficheReponse") : navigate('/BDC/fiche14') }} color="bg-gray-dark">
                {getTraduction('Revenir', { FR: 'Revenir', AR: 'التالي', EN: 'Next' })}
            </ButtonComponent>
            <div className='w-2/3 h-auto border rounded-md border-gray-dark p-4 flex items-center'>
                <BarChart
                    xAxis={chartData.xAxis}
                    series={chartData.series}
                    width={1100}
                    height={600}
                    borderRadius={10}
                    barLabel="value"
                />
            </div>
        </div>
    );

}
