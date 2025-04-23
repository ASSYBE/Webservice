import React, { useContext, useEffect } from 'react'
import ButtonComponent from '../../../component/ButtonComponent';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { BeneficierContext } from '../../../contexts/BeneficierContext';

export const Fiche22Screen = () => {
    const date = new Date()

    const { beneficier, getBeneficier } = useContext(BeneficierContext);

    const { language, getTraduction } = useContext(LanguageContext);

    useEffect(() => {
        if (beneficier?.cin) {
            // fetchData();
            // fetchPlanAction()
        } else {
            getBeneficier();
        }
    }, [beneficier?.cin])

    const isRtl = language === 'AR';
    const directionClass = isRtl ? 'rtl' : 'ltr';
    const alignmentClass = isRtl ? 'text-right' : 'text-left';
    return (
        <>
            <ButtonComponent type='button' color="bg-magenta" onClick={{}}>
                {getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
            </ButtonComponent>
            <div className='w-full h-full overflow-x-auto px-6 py-6'>

                <SubHeaderComponent
                    alignmentClass={alignmentClass}
                    color='text-black'
                    date={date}
                    firstName={beneficier?.prenom}
                    lastName={beneficier?.nom}
                    labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                    labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                    title={`Le portfeuille des compétences`}
                    content={`Qu’est-ce ?
                    <br />Il s’agit d’un document qui t’appartient et qui recueille les expériences et connaissances acquises en formation, au cours de la vie professionnelle, voir dans les expériences quotidiennes, pour les rendre lisibles et si possible vérifiables.

                    <br />Il contient :

                    <br />- Diplômes
                    <br />- Attestations de formation
                    <br />- Certificats de travail
                    <br />- Attestations d’activité extra-professionnelle
                    <br />● Etc………………
<br />
                    <br />À quoi sert-il ?
                    <br />Le Portefeuille des Compétences peut t’aider dans ton parcours en ce qui concerne :

                    <br />●	La vie professionnelle (plan de carrière, formation, recherche d’emploi, …)
                    <br />●	La reconnaissance de tes compétences
<br />
                    <br />Comment le construire ?

                    <br />1.	Demandez systématiquement une certification des compétences acquises lors des formations et stages que vous réalisez :

                    <br />-Cette attestation doit être nominative : nom, prénom, date de naissance doivent figurer sur le document ;
                    <br />-Cette attestation doit porter le nom du responsable de l'établissement ou de l'entreprise qui l'a délivrée ainsi que la date de délivrance ;

                    <br />-Cette attestation doit détailler ce que vous avez appris en formation ou au travail ;

                    <br />-Photocopiez ces certificats au format A4 ;

                    <br />-Conservez les originaux (peuvent être nécessaires).
                    <br />2.Mettez les photocopies des attestations dans le portefeuille ;
                    <br />3.Maintenez-le à jour ;
                    <br />4.Conservez-le ;
                    <br />5.Utilisez-le. `}
                />



            </div>

        </>
    )
}
