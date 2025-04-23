import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { BdcContext } from '../../../contexts/BdcContext'
import axiosClient from '../../../api/axios-client'
import { FreeButton } from '../../../component/FreeButton'
import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../../../component/ButtonComponent'
import { BarChart } from '@mui/x-charts'
import { ButtonsComponent } from '../../../component/ButtonsComponent'
import { TokenContext } from '../../../contexts/TokenContext'




const getChartData = (competenceResultat, competenceTitle) => {
    const { getTraduction } = useContext(LanguageContext);

    const labels = competenceResultat.slice(0, 3).map((e) => {
        let competence = competenceTitle.find(c => c.valeur_id === e.competence_id);
        return getTraduction(competence?.valeur_id, competence);
    });

    const data = competenceResultat.slice(0, 3).map(e => e.total_notes);

    return {
        xAxis: [{ id: 'barCategories', data: labels, scaleType: 'band', categoryGapRatio: 0.7 }],
        series: [{ data, color: '#C652C1' }],
    };
};

export const Fiche17Reponse = () => {
    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { getBdc } = useContext(BdcContext)
    const { getTraduction } = useContext(LanguageContext)

    const [competenceResultat, setCompetenceResultat] = useState([])
    const [titleResultat, setTitleResultat] = useState({})
    const [competenceTitle, setCompetenceTitle] = useState([])
    const navigate = useNavigate()

    async function fetchData() {
        try {
            const response = await axiosClient.get(`/fiche17Competence?cin=${cin}`)
            const { competenceTitle, competence_results, formattedQuestions } = response.data
            setCompetenceResultat(competence_results)
            setCompetenceTitle(competenceTitle)
            setTitleResultat(formattedQuestions)

        } catch (e) {
            console.log('error on console : ', e.message)
        }
    }
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
            getBdc()
        } else
            getToken()
    }, [cin, token])



    const graphData = getChartData(competenceResultat, competenceTitle);
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='font-medium text-sm'>{getTraduction(titleResultat.question1?.valeur_id, titleResultat.question1)}</h2>

            </div>
            <ButtonsComponent
                type="button"
                color1="bg-gray-dark"
                onClick1={() => navigate("/BDC/fiche17")}
                titleButton1={getTraduction('revenir', { FR: 'Revenir', AR: 'التالي', EN: 'Next' })}
                color2="bg-magenta"
                onClick2={() => navigate("/BDC/fiche18")}
                titleButton2={getTraduction('Suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
            >
            </ButtonsComponent>

            <div className='flex justify-center w-full my-6'>
                <div className='w-2/3 h-auto border rounded-md border-gray-dark p-4 flex items-center'>
                    <BarChart
                        xAxis={graphData.xAxis}
                        series={graphData.series}
                        width={1100}
                        height={600}
                        borderRadius={10}
                        barLabel='value'
                    />
                </div>
            </div>
            <h2 className='font-medium text-sm'>Détails du Classement</h2>

            <table className="mt-4 w-full table-auto text-left">
                <thead className="bg-magenta w-full">
                    <tr className='border-2 w-full border-magenta'>
                        {competenceResultat && competenceResultat.map((e) => {
                            let competence = competenceTitle.find(c => c.valeur_id === e.competence_id)
                            return (
                                <th key={e.rank} className="border-y border-x border-white text-left border-blue-gray-100 p-2 transition-colors hover:bg-blue-gray-50">
                                    <p className="font-medium text-sm text-white flex items-center justify-center gap-2 leading-relaxed">
                                        {getTraduction(competence?.valeur_id, competence)}
                                    </p>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {competenceResultat && competenceResultat.map((e) => (
                            <th key={e.rank} className="border-y border-x border-magenta text-left border-blue-gray-100 p-2 transition-colors hover:bg-blue-gray-50">
                                <p className="font-medium text-sm text-black flex items-center justify-center gap-2 leading-relaxed">
                                    {e.total_notes}
                                </p>
                            </th>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
