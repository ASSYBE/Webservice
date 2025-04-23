import React, { useContext } from 'react'
import SubHeaderComponent from '../../../component/SubHeaderComponent'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { Outlet } from 'react-router-dom'

export const Fiche16 = () => {
    const { beneficier } = useContext(BeneficierContext)
    const { getTraduction } = useContext(LanguageContext)

    const date = new Date()


    return (
        <div className="w-full max-h-[100%] overflow-x-auto px-6 py-6 bg-white">
            <SubHeaderComponent
                color="text-black"
                date={date}
                labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title="Les soft skills"
                content={`Pour chacune des soft skills indiquées, exprimer une position de 1 à 5 par rapport à la fréquence et à l'efficacité du comportement réalisé.`}
            />
            <Outlet />
        </div>
    )
}
