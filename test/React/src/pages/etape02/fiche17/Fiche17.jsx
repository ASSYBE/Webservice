import React, { useContext, useEffect, useState } from 'react'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { BdcContext } from '../../../contexts/BdcContext'
import SubHeaderComponent from '../../../component/SubHeaderComponent'
import { Outlet, useLocation } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { TokenContext } from '../../../contexts/TokenContext'

export const Fiche17 = () => {
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


        if (currentPath === '/BDC/fiche17') {
            setInstruction(`
                Lisez attentivement chaque ligne, et marquez, sur la même ligne, dans les cases en gras, le chiffre correspondant à la réponse.A la fin de la compilation, faites la somme pour chaque colonne de tous les chiffres que le bénéficiaire a marqués dans les espaces en gras, et rapportez chaque somme dans la dernière rangée : vous obtiendrez le score pour chaque catégorie de capacité.Marquez les 3 catégories de compétences qui ont obtenu les scores les plus élevés(même si elles sont à égalité).Enfin, consultez les profils de capacité rapportés.
                Les Profils de Bilan des Capacités : selon le modèle conçu par John L.Holland aux États - Unis, les compétences humaines peuvent être divisées en 6 grandes catégories, qui identifient de véritables « types » professionnels : Pratique, Exécutif, Managerial, Artistique, Social et Investigateur.
                Généralement, une profession dans un certain secteur peut être décrite à l'aide de 2 ou 3 catégories : par exemple, l'enseignant appartient aux catégories d'investigation sociale, un danseur aux catégories de pratique artistique.
`);

        } else if (currentPath === '/BDC/fiche17/ficheReponse') {
            setInstruction(null)
            // setInstruction(`Légende : 
            //     <br />Pratique
            //     <br />Vous êtes une personne pratique, vous avez de bonnes aptitudes manuelles et athlétiques. Vous préférez travailler avec des objets concrets plutôt qu'avec des idées et vous avez tendance à éviter les tâches qui nécessitent une approche intellectuelle ou des compétences sociales. Faites attention aux faits plutôt qu'aux mots, et à cause de cela, vous aimez vous engager dans la production de choses utiles et bien faites. L'environnement de travail préféré est à l'extérieur ou dans des laboratoires, entreprises ou magasins où vous pouvez utiliser vos compétences manuelles, porter des vêtements décontractés et être entouré de personnes familières. Vous aimez travailler en équipe où il est important de faire quelque chose d'utile ou d'effectuer des tâches physiques. Mais vous devez améliorer vos compétences interpersonnelles et de communication et être plus ouvert aux nouvelles idées.
            //     <br />
            //     <br />Investigateur
            //     <br />Vous êtes une personne dotée de bonnes capacités d'analyse que vous avez tendance à utiliser pour résoudre des problèmes et des tâches abstraites. Vous aimez étudier, faire des recherches et travailler dans des laboratoires, des bibliothèques, des universités ou des entreprises où vous pouvez appliquer vos compétences en mathématiques et en sciences.
            //     Vous préférez travailler individuellement, sur des objectifs précis et vous aimez être entouré de personnes qui apprécient l'intelligence et la pensée logique. Il est important pour vous que votre travail vous offre la possibilité de toujours apprendre de nouvelles choses et de vous entourer de personnes qui ont les mêmes centres d'intérêt que vous. Cependant, vous devez améliorer vos compétences interpersonnelles, surtout si vous occupez un poste de direction.
            //     <br />
            //     <br />Artistique
            //     <br />Vous êtes une personne qui a tendance à exprimer son imagination et ses émotions au travail. Vous êtes original, intuitif, introspectif et possédez des compétences artistiques et/ou musicales. Il est important pour vous de travailler dans des domaines où il est possible de communiquer par l'art dans un environnement de travail informel et peu structuré et où vous pouvez exprimer librement vos sentiments et vos pensées. Cependant, vous devez améliorer les compétences de communication qui utilisent la logique et l'organisation, ainsi que les compétences relationnelles nécessaires pour travailler en coopération dans un groupe.
            //     <br />
            //     <br />Social
            //     <br />Vous êtes une personne ayant un fort intérêt pour les autres, sensible à leurs besoins et à leur bien-être. Vous aimez aider et comprendre les autres, et vous avez une bonne capacité à les mettre à l'aise et à répondre de manière appropriée à leurs demandes. Il est important pour vous d'exercer un métier qui vous implique dans des activités sociales telles que l'animation, l'éducation, l'enseignement dans lequel mettre à profit vos compétences communicatives et relationnelles. Vous préférez travailler en équipe et dans un environnement de travail qui valorise la diversité individuelle et la qualité des relations. Cependant, vous devez améliorer vos compétences organisationnelles et managériales et être plus affirmé dans la gestion des conflits qui peuvent survenir au travail.
            //     <br />
            //     <br />Managerial
            //     <br />Vous êtes quelqu'un qui aime le risque et la nouveauté. Vous avez tendance à être persuasif et à dominer les relations avec les autres. Vous avez de bonnes capacités de communication et de leadership, vous êtes déterminé et sociable. Il est important pour vous de travailler dans des secteurs liés à la vente, à l'économie, au conseil, au marketing, au droit, avec des objectifs clairs et bien définis. L'environnement de travail doit être bien organisé, stimulant et compétitif, un environnement dans lequel les personnes visent à obtenir des résultats pertinents. Cependant, vous devez améliorer vos compétences d'empathie et respecter davantage les idées des autres afin de mieux travailler en équipe et d'atteindre des objectifs communs.
            //     <br />
            //     <br />Exécutif
            //     <br />Vous êtes une personne précise, organisée et vous travaillez bien dans des situations structurées. Vous êtes traditionaliste, ordonné et vous avez de bonnes compétences dans la gestion administrative de l'information et des données. Vous aimez travailler dans des environnements de travail structurés, par exemple au bureau ou en entreprise, où les règles sont claires. Vous préférez travailler au sein d'un groupe de travail dans lequel chacun se voit attribuer des tâches et des horaires spécifiques. Cependant, vous devez améliorer votre capacité à gérer le changement et à prendre des décisions dans des conditions incertaines et peu claires.
            //     +C14`)
        }
    }, [location]);

    return (
        <div className="w-full max-h-[100%] overflow-x-auto px-6 py-6 bg-white">
            <SubHeaderComponent
                color="text-black"
                date={date}
                labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title="Le bilan des capacités"
                content={instruction}
            />
            <Outlet />
        </div>
    )
}
