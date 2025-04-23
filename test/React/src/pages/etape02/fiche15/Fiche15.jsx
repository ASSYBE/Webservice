import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useActionData, useLocation } from 'react-router-dom'
import SubHeaderComponent from '../../../component/SubHeaderComponent'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { BdcContext } from '../../../contexts/BdcContext'
import { TokenContext } from '../../../contexts/TokenContext'

export const Fiche15 = () => {
    const { beneficier, getBeneficier, type } = useContext(BeneficierContext)
    const date = new Date()
    const { language, getTraduction } = useContext(LanguageContext)
    const { bilanDC, getBdc } = useContext(BdcContext)
    const [instruction, setInstruction] = useState("")
    const location = useLocation();

    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            getBdc()
        } else
            getToken()
    }, [cin, token])

    useEffect(() => {
        const currentPath = location.pathname;


        if (currentPath === '/BDC/fiche15') {
            setInstruction('Lisez toute la liste et sélectionnez les valeurs importantes dans le travail. Pour chaque valeur, indiquez le degré d\'importance(0 pas important - 4 très important).');

        } else if (currentPath === '/BDC/fiche15/ficheReponse') {
            setInstruction(`Mettez dans la hiérarchie les valeurs les plus importantes identifiées par la fiche « Liste des valeurs professionnelles » et faites une brève description de la signification personnelle que vous attribuez à chaque valeur.`)
        }
    }, [location]);
    return (
        <div className="w-full max-h-[100%] overflow-x-auto px-6 py-6 bg-white">
            <SubHeaderComponent
                color="text-black"
                date={date}
                labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title="Liste des valeurs professionnelles"
                content={instruction}
            />
            <Outlet />
        </div>
    )
}
