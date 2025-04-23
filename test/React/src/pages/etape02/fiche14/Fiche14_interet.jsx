import React, { useContext, useEffect } from 'react'
import { Row14Component } from '../../../component/Row14Component'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { LanguageContext } from '../../../contexts/LanguageContext'
import SubHeaderComponent from '../../../component/SubHeaderComponent'
import { BdcContext } from '../../../contexts/BdcContext'
import { TokenContext } from '../../../contexts/TokenContext'

export const Fiche14_interet = () => {
    const date = new Date()
    const { beneficier, getBeneficier, type } = useContext(BeneficierContext)
    const { language, getTraduction } = useContext(LanguageContext)
    const { bilanDC, getBdc } = useContext(BdcContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    useEffect(() => {
        if (cin && token) {
            getBdc()
        }
    }, [cin, token])
    return (
        <div className="w-full max-h-[100%] overflow-x-auto px-6 py-6 bg-white">
            <SubHeaderComponent
                color="text-black"
                date={date}
                labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title="Les Intérêts"
                content={`Le questionnaire ci-dessous comprend 70 phrases relatives à des secteurs de travail précis et par rapport auxquelles vous devez exprimer votre niveau de préférence, quelles que soient les compétences que vous possédez.
                Pour ce faire, utilisez la feuille de réponses : indiquez votre préférence dans la case correspondant à la question en objet (Quest. N.) en utilisant la classification suivante : 
                <br />
                <br />0 : Je n'aime pas
                <br />1 : J'aime juste un peu
                <br />2 : J'aime assez
                <br />3 : J'aime beaucoup
                <br />
                <br />Sur la feuille de réponses, vous trouverez les instructions pour calculer indépendamment vos résultats. Ces résultats doivent être reportés dans le dernier onglet (appelé « Profil graphique ») qui vous permettra de visualiser graphiquement vos centres d'intérêt et d'obtenir des informations sur leur signification.
                <br />
                <br />Il faut environ 20 à 30 minutes pour remplir le questionnaire, tandis qu'environ 10 minutes suffisent pour le calcul des scores et le traitement du graphique.
                <br /> 
                <br />Sur les pages qui composent l'outil, vous trouverez toute autre information utile à son utilisation. Si le sens d'une phrase n'est pas clair, n'hésitez pas à demander des éclaircissements à votre Conseillère / Conseiller en emploi.
                `}
            />

            <Outlet />
        </div>
    )
}
