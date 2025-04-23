import React, { useContext, useEffect, useState } from 'react'
import ButtonComponent from '../../../component/ButtonComponent'
import SubHeaderComponent from '../../../component/SubHeaderComponent'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { FreeIconButton } from '../../../component/FreeIconButton'
import { TiDeleteOutline } from 'react-icons/ti'
import { FreeButton } from '../../../component/FreeButton'
import { Fiche19CompetenceDeBase } from './Fiche19CompetenceDeBase'
import axiosClient from '../../../api/axios-client'
import { Fiche19Technico } from './Fiche19Technico'
import { Fiche19Transversale } from './Fiche19Transversale'
import { Fiche19InteretAttitude } from './Fiche19InteretAttitude'
import { BdcContext } from '../../../contexts/BdcContext'
import Select from 'react-select';
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { FaSquarePlus } from 'react-icons/fa6'
import { TokenContext } from '../../../contexts/TokenContext'

export const Fiche19Screen = () => {

    const date = new Date()

    const { beneficier, getBeneficier } = useContext(BeneficierContext);
    const { language, getTraduction } = useContext(LanguageContext);
    const { getBdc } = useContext(BdcContext)

    const [fiche, setFiche] = useState({})

    const [metierValide, setMetierValide] = useState("")
    const [metierDesire, setMetierDesire] = useState("")

    const [metierValides, setMetierValides] = useState([])
    const [metierDesires, setMetierDesires] = useState([])

    const [softskills, setSoftSkills] = useState([])
    const [DBSoftskills, setDBSoftskills] = useState([])


    const [parametreProfession, setParametreProfession] = useState([])

    const [RQ1, setRQ1] = useState(false)
    const [RQ2, setRQ2] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    function validateField1() {
        const isRQ1Valid = metierDesire.trim() !== '';

        setRQ1(!isRQ1Valid);

        return isRQ1Valid;
    }
    function validateField2() {
        const isRQ2Valid = metierValide.trim() !== '';

        setRQ2(!isRQ2Valid);

        return isRQ2Valid;
    }

    function addMetierDesire() {
        if (!validateField1)
            return;
        if (metierDesire.trim() !== '' && metierDesires.length < 3) {
            setMetierDesires(prevDesires => [
                ...prevDesires,
                { hypothese_parcours_desire: metierDesire }
            ]);
            handleMetierDesire()
            setMetierDesire("");
        }
    }

    function addMetierValide() {
        if (!validateField2)
            return;
        if (metierValide.trim() !== '' && metierValides.length < 2) {
            setMetierValides(prevValides => [
                ...prevValides,
                { hypothese_parcours_valide: metierValide }
            ]);
            handleMetierValide()
            setMetierValide("");
        }
    }


    function deleteMetierDesire(index, id) {
        setMetierDesires(prevDesires => prevDesires.filter((_, i) => i !== index));
        delete_MetierDesire(id)
    }

    function deleteMetierValide(index, id) {
        setMetierValides(prevValides => prevValides.filter((_, i) => i !== index));
        delete_MetierValide(id)
    }


    async function fetchData() {
        try {
            const response = await axiosClient.get(`/fiche19?cin=${cin}`)
            const responseProfession = await axiosClient.get(`/fiche19/profession`)
            const responseSoftskills = await axiosClient.get(`/fiche16/select?cin=${cin}`)


            setFiche(response.data.fiche)
            setMetierValides(response.data.fiche_hypothese_valide)
            setMetierDesires(response.data.fiche_hypothese_desire)
            setParametreProfession(responseProfession.data.parametreProfession)
            setSoftSkills(responseSoftskills.data.fiche_softSkills)
            setDBSoftskills(responseSoftskills.data.filtredQuestions)

            console.log('fiche : ', JSON.stringify(response.data, null, 3))
            console.log('profession : ', JSON.stringify(responseProfession.data, null, 3))


            console.log("message :", response.data.message)
        } catch (error) {
            console.log('error : ', error)

        } finally {
            setLoading(false)
        }
    }

    async function handleMetierValide() {
        const data = {
            hypothese_parcours_valide: metierValide
        }
        try {
            console.log("metier valide : ", JSON.stringify(data, null, 3))
            const response = await axiosClient.post(`/fiche19/storeHypotheseValide/${fiche.id}?cin=${cin}`, data)
            console.log("message : ", response.data.message);
        } catch (error) {
            console.log("error :", error)
        }
    }

    async function delete_MetierValide(id) {
        try {
            const response = await axiosClient.delete(`/fiche19/deleteHypotheseValide/${id}?cin=${cin}`)
            console.log("message : ", response.data.message);
        } catch (error) {
            console.log("error :", error)
        }
    }

    async function handleMetierDesire() {
        const data = {
            hypothese_parcours_desire: metierDesire
        }
        try {
            console.log("metier desire : ", JSON.stringify(data, null, 3))
            const response = await axiosClient.post(`/fiche19/storeHypotheseDesire/${fiche.id}?cin=${cin}`, data)
            console.log("message : ", response.data.message);
        } catch (error) {
            console.log("error :", error)
        }
    }

    async function delete_MetierDesire(id) {
        try {
            const response = await axiosClient.delete(`/fiche19/deleteHypotheseDesire/${id}?cin=${cin}`)
            console.log("message : ", response.data.message);
        } catch (error) {
            console.log("error :", error)
        }
    }


    const options = parametreProfession?.map((e) => ({
        value: e?.valeur_id,
        label: getTraduction(e?.valeur_id, e),
    }));

    const optionsValide = parametreProfession
        ?.filter(p => metierDesires.some(e => p.valeur_id === e.hypothese_parcours_desire))
        .map(e => ({
            value: e?.valeur_id,
            label: getTraduction(e?.valeur_id, e),
        }));


    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
            getBdc()
        } else
            getToken()
    }, [cin, token])


    const isRtl = language === 'AR';
    const directionClass = isRtl ? 'rtl' : 'ltr';
    const alignmentClass = isRtl ? 'text-right' : 'text-left';

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen bg-gray-light">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#92348E"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <span className="text-lg text-gray-middle">Chargement des données...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <ButtonComponent type='button' color="bg-magenta" onClick={() => { navigate('/BDC/fiche20') }}>
                {getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
            </ButtonComponent>
            <div className='w-full max-h-[100%] overflow-x-auto px-6 py-6'>

                <SubHeaderComponent
                    alignmentClass={alignmentClass}
                    color='text-black'
                    date={date}
                    firstName={beneficier?.prenom}
                    lastName={beneficier?.nom}
                    labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                    labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                    title={`Synthèse du bilan`}
                    content={`Il s'agit de la compilation  des élements du Bilan de compétences traités dans les différentes fiches  que vous allez présenter en terme de : 
                    <br />- Compétences de base ( compétences nécessaires pour exercer le métier /profession
                    <br />- Compétences technico-professionnelles
                    <br />- Compétences transversales
                    <br />- Intérêts/ attitudes
                    <br />-  Hypothèse de parcours ( Il s'agit d'hypothèses de métiers ou professions potentiels que vous pouvez exercer  à partir de ce bilan de compétences que vous avez dressé)`}
                />
                {/* composant de compétence de base */}
                <Fiche19CompetenceDeBase beneficier={beneficier} getBeneficier={getBeneficier} />

                <div className='flex flex-wrap w-full gap-4'>
                    {/* composant de Technico-professionnelles */}
                    <Fiche19Technico beneficier={beneficier} getBeneficier={getBeneficier} />

                    {/* composant Transversales */}
                    <Fiche19Transversale beneficier={beneficier} getBeneficier={getBeneficier} getTraduction={getTraduction} />
                </div>
                {/* composant interets/attitudes */}
                <Fiche19InteretAttitude beneficier={beneficier} getBeneficier={getBeneficier} getTraduction={getTraduction} ficheID={fiche.id} softskills={softskills} DBSoftskills={DBSoftskills} />

                <div className="flex flex-nowrap gap-8 justify-start">
                    <div className="bg-white w-1/3 sm:w-1/3">
                        <h2 className="font-semibold text-lg text-black">Les cinq métiers désirés</h2>
                        <div className="flex items-center justify-between gap-2 mb-4">

                            <Select
                                id="metierDesire"
                                name="metierDesire"
                                className={`w-full sm:w-full rounded-md border-gray-dark ${!RQ1 ? 'border-2' : 'border-2 border-red-normal bg-red-normal  bg-opacity-20'}`}
                                value={options.find(option => option?.value === metierDesire)}
                                onChange={(selectedOption) => setMetierDesire(selectedOption.value)}
                                options={options}
                                placeholder="Recherchez un métier"
                            />
                            <div className="relative group flex w-auto">
                                <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                    Ajouter
                                </div>
                                <FreeIconButton color={'bg-magenta text-white px-2 py-2'} onClick={addMetierDesire}><FaSquarePlus size={20} /></FreeIconButton>
                            </div>

                        </div>
                        <ul className="list-disc mt-4 text-black">
                            {metierDesires && metierDesires.map((c, index) => (
                                <li key={c.id} className="flex items-center justify-between py-1 pl-5 pr-1 w-full bg-gray-light bg-opacity-40 mb-2 rounded-md">
                                    <span className="flex items-center gap-4 font-normal text-sm">
                                        <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                        {getTraduction(parametreProfession.find((e) => (e.valeur_id === c.hypochese_parcours_desire))?.valeur_id, parametreProfession.find((e) => (e.valeur_id === c.hypothese_parcours_desire)))}
                                    </span>
                                    <div className="relative group flex w-auto">
                                        <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                            Supprimer
                                        </div>
                                        <FreeIconButton onClick={() => deleteMetierDesire(index, c.id)} color='text-magenta flex justify-center'>
                                            <TiDeleteOutline size={25} />
                                        </FreeIconButton></div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white w-1/3 sm:w-1/3">
                        <h2 className="font-semibold text-lg">Les deux métiers validés</h2>
                        <div className="flex items-center justify-between gap-2 mb-4">

                            <Select
                                id="metierValide"
                                name="metierValide"
                                className={`w-full sm:w-full rounded-md border-gray-dark border-2 ${!RQ2 ? '' : 'border-red-normal bg-red-normal  bg-opacity-20'}`}
                                value={optionsValide.find(option => option?.value === metierValide)}
                                onChange={(selectedOption) => setMetierValide(selectedOption.value)}
                                options={optionsValide}
                                placeholder="Recherchez un métier"
                            />
                            <div className="relative group flex w-auto">
                                <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                    Ajouter
                                </div>
                                <FreeIconButton color={'bg-magenta text-white px-2 py-2'} onClick={addMetierValide}><FaSquarePlus size={20} /></FreeIconButton></div>
                        </div>
                        <ul className="list-disc mt-4 text-black">
                            {metierValides && metierValides.map((t, index) => (
                                <li key={t.id} className="flex items-center justify-between py-1 pl-5 pr-1 w-full bg-gray-light bg-opacity-40 mb-2 rounded-md">
                                    <span className="flex items-center gap-4 font-normal text-sm">
                                        <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                        {getTraduction(parametreProfession?.find((e) => (e?.valeur_id === t.hypothese_parcours_valide)).valeur_id, parametreProfession.find((e) => (e?.valeur_id === t.hypothese_parcours_valide)))}
                                    </span>
                                    <div className="relative group flex w-auto">
                                        <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                            Supprimer
                                        </div>
                                        <FreeIconButton onClick={() => deleteMetierValide(index, t.id)} color='text-magenta flex justify-center p-0'>
                                            <TiDeleteOutline size={25} />
                                        </FreeIconButton>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}
