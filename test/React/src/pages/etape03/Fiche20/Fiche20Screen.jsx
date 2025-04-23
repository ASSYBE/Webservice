import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../../../api/axios-client'
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import { LanguageContext } from '../../../contexts/LanguageContext';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import { FreeIconButton } from '../../../component/FreeIconButton';
import ButtonComponent from '../../../component/ButtonComponent';
import { TiDeleteOutline } from 'react-icons/ti';
import { FaSquarePlus } from 'react-icons/fa6';
import { BdcContext } from '../../../contexts/BdcContext';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../../contexts/TokenContext';

export const Fiche20Screen = () => {
    const date = new Date()

    const { beneficier, getBeneficier } = useContext(BeneficierContext);
    const { getBdc } = useContext(BdcContext)
    const { language, getTraduction } = useContext(LanguageContext);

    const [originDemande, setOriginDemande] = useState({})
    const [originDemandeSaisi, setOriginDemandeSaisi] = useState("")
    const [objectifBilan, setObjectifBilan] = useState([])
    const [parcoursBilan, setParcoursBilan] = useState([])
    const [savoir, setSavoir] = useState([])
    const [savoirFaire, setSavoirFaire] = useState([])
    const [savoirEtre, setSavoirEtre] = useState([])

    const [fiche, setFiche] = useState({})
    const [perspectivesEvolutionProfessionnelPrincipal, setPerspectivesEvolutionProfessionnelPrincipal] = useState("")
    const [perspectivesEvolutionProfessionnelAlternatif, setPerspectivesEvolutionProfessionnelAlternatif] = useState("")
    const [aspectsPorterAttention, setAspectsPorterAttention] = useState("")
    const [planAction, setPlanAction] = useState([])

    const [quoiFaire, setQuoiFaire] = useState("")
    const [quand, setQuand] = useState("")
    const [ou, setOu] = useState("")
    const [financement, setFinancement] = useState("")
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    async function fetchPlanAction() {
        const fiche12planAction = await axiosClient.get(`/fiche20PlanAction?cin=${cin}`)
        setPlanAction(fiche12planAction.data.planAction);
    }

    async function fetchData() {
        const fiche03 = await axiosClient.get(`/fiche03?cin=${cin}`);
        const fiche05 = await axiosClient.get(`/fiche05?cin=${cin}`);
        const fiche06 = await axiosClient.get(`/agenda?cin=${cin}`);
        const savoir = await axiosClient.get(`/ficheCompetenceConnaissance?cin=${cin}`);
        const savoirFaire = await axiosClient.get(`/ficheCompetenceTechnique?cin=${cin}`);
        const savoirEtre = await axiosClient.get(`/ficheCompetenceQualite?cin=${cin}`);
        const fiche12 = await axiosClient.get(`/fiche20?cin=${cin}`)

        console.log("fiche06 : ", fiche06.data)
        setOriginDemande(fiche03.data.parametreDemande.find((e) => (e.valeur_id === fiche03.data.fiche03.reponse_Q2)))
        setOriginDemandeSaisi(fiche03.data.fiche03.reponse_Q4)

        setObjectifBilan(fiche05.data.reponseObjectif)

        setParcoursBilan([{
            type_RDV: fiche06.data.fiche03.type_RDV,
            date_RDV: fiche06.data.fiche03.date_RDV,
            heure_RDV_debut: fiche06.data.fiche03.heure_RDV_debut,
            heure_RDV_fin: fiche06.data.fiche03.heure_RDV_fin
        }, ...fiche06.data.agendas])

        setSavoir(savoir.data.ficheCompetenceConnaissance);
        setSavoirFaire(savoirFaire.data.ficheCompetenceTechnique);
        setSavoirEtre(savoirEtre.data.ficheCompetenceQualite);

        const { fiche, fiche_hypothese_valide, parametreProfession } = fiche12.data
        setFiche(fiche)
        setPerspectivesEvolutionProfessionnelPrincipal(fiche.perspectivesEvolutionProfessionnelPrincipal || getTraduction(parametreProfession.find((e) => (e.valeur_id === fiche_hypothese_valide?.valide1?.hypothese_parcours_valide))?.valeur_id, parametreProfession.find((e) => (e.valeur_id === fiche_hypothese_valide?.valide1?.hypothese_parcours_valide))))
        setPerspectivesEvolutionProfessionnelAlternatif(fiche.perspectivesEvolutionProfessionnelAlternatif || getTraduction(parametreProfession.find((e) => (e.valeur_id === fiche_hypothese_valide?.valide2?.hypothese_parcours_valide))?.valeur_id, parametreProfession.find((e) => (e.valeur_id === fiche_hypothese_valide?.valide2?.hypothese_parcours_valide))))
        setAspectsPorterAttention(fiche.aspectsPorterAttention)

        setLoading(false)
    }

    async function handleSubmit() {
        const data = {
            perspectivesEvolutionProfessionnelPrincipal,
            perspectivesEvolutionProfessionnelAlternatif,
            aspectsPorterAttention
        }

        try {
            const response = await axiosClient.put(`/fiche20/${fiche.id}?cin=${cin}`, data)
            console.log('handle submit : ', response.data.message)
            navigate('/BDC/fiche21')
        } catch (error) {
            console.log('error handle : ', error)
        }
        console.log("handle submit : ", data)
    }

    async function handlePlanAction() {
        const data = {
            quoiFaire,
            quand,
            ou,
            financement
        }
        try {
            const response = await axiosClient.post(`/fiche20PlanAction?cin=${cin}`, data);
            console.log("message de success : ", response.data.message)

            fetchPlanAction()
        } catch (error) {
            console.log('error on console :', error)
        }
        setQuoiFaire("")
        setQuand('')
        setOu("")
        setFinancement("")
        console.log('handle plan action :', data)
    }


    async function deletePlanAction(id) {
        try {
            const response = await axiosClient.delete(`/fiche20PlanAction/${id}`);

            console.log("message :", response.data.message)
        } catch (error) {
            console.log("error : ", error)
        } finally {
            fetchPlanAction()
        }

    }


    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        getBdc()
        if (cin && token) {
            fetchData()
            fetchPlanAction();

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
            <ButtonComponent type='button' color="bg-magenta" onClick={handleSubmit}>
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
                    title={`Le bilan de compétences`}
                />
                <div className='space-y-5'>
                    <h1 className='text-lg font-semibold'>Le context et les objectifs du Bilan de Compétences</h1>
                    <div className='flex space-x-3 text-sm font-medium mb-2'>
                        <p className='text-sm font-medium'>1 - Origine de la demande : </p>
                        {originDemande.valeur_id !== "demande_2" ?
                            <p className='text-sm font-normal'>{getTraduction(originDemande.valeur_id, originDemande)}</p> :
                            <p className='text-sm font-normal'>{originDemandeSaisi}</p>
                        }
                    </div>

                    <div className='mb-3'>
                        <p className='text-sm font-medium'>2 - Objectifs du Bilan </p>
                        {
                            objectifBilan && objectifBilan.map((o) => (
                                <div key={o.id} className='flex items-center space-x-3 ml-5'>
                                    <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                    <p className='text-sm font-normal'>{getTraduction(o.valeur_id, o)}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className='mb-3'>
                        <p className='text-sm font-medium'>3 - Le parcours du Bilan </p>
                        {parcoursBilan && parcoursBilan.length > 0 && (
                            <table className="w-2/3 ml-5 border-collapse border border-gray-300">
                                <thead className='bg-magenta text-white'>
                                    <tr className="border-2 border-magenta">
                                        <th className="border-r font-semibold text-base border-white p-1">Type RDV</th>
                                        <th className="border-r font-semibold text-base border-white p-1">Date</th>
                                        <th className="border-r font-semibold text-base border-white p-1">Heure Début</th>
                                        <th className="border-white font-semibold text-base p-1">Heure Fin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parcoursBilan.map((o) => (
                                        <tr key={o.id} className="border border-magenta">
                                            <td className="border border-magenta font-semibold text-base px-4 py-2">{o.type_RDV}</td>
                                            <td className="border border-magenta font-semibold text-base px-4 py-2">{o.date_RDV}</td>
                                            <td className="border border-magenta font-semibold text-base px-4 py-2">{o.heure_RDV_debut}</td>
                                            <td className="border border-magenta font-semibold text-base px-4 py-2">{o.heure_RDV_fin}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                    </div>

                    <div className=' mb-3'>
                        <p className='text-sm font-medium mb-3'>4 - Les perspectives d’évolution du projet professionnel  </p>
                        <div className='w-2/3 flex items-center gap-3 ml-5'>
                            <div className='w-full'>
                                <div className='flex items-center space-x-3'>
                                    <p className='text-sm font-normal'>Le projet professionnel principal </p>
                                </div>
                                <input
                                    className='w-full rounded-md border-gray-dark border-2 p-2'
                                    type="text"
                                    id="perspectivesEvolutionProfessionnelPrincipal"
                                    value={perspectivesEvolutionProfessionnelPrincipal}
                                    onChange={(e) => setPerspectivesEvolutionProfessionnelPrincipal(e.target.value)} />
                            </div>
                            <div className='w-full'>
                                <div className='flex items-center space-x-3'>
                                    <p className='text-sm font-normal'>Le projet professionnel alternatif </p>
                                </div>
                                <input
                                    className='w-full rounded-md border-gray-dark border-2 p-2'
                                    type="text"
                                    id="perspectivesEvolutionProfessionnelAlternatif"
                                    value={perspectivesEvolutionProfessionnelAlternatif}
                                    onChange={(e) => setPerspectivesEvolutionProfessionnelAlternatif(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className='w-full mb-3'>
                        <p className='text-sm font-medium'>5 - Les points forts   </p>
                        <div className='flex items-start justify-between w-2/3 space-x-3 ml-5'>
                            <div className='w-full'>
                                <p className='text-sm font-normal'>Savoir</p>
                                {
                                    savoir && savoir.map((o) => (
                                        <div key={o.id} className='flex items-center space-x-3 py-1 px-5 w-full bg-gray-light bg-opacity-80 mb-2 rounded-md'>
                                            <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                            <p className='text-sm font-normal'>{o.connaissance}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='w-full'>
                                <p className='text-sm font-normal'>Savoir faire</p>
                                {savoirFaire && savoirFaire.map((o) => (
                                    <div key={o.id} className='flex items-center space-x-3 py-1 px-5 w-full bg-gray-light bg-opacity-80 mb-2 rounded-md'>
                                        <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                        <p className='text-sm font-normal'>{o.technique}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='w-full'>
                                <p className='text-sm font-normal'>Savoir Être</p>
                                {
                                    savoirEtre && savoirEtre.map((o) => (
                                        <div key={o.id} className='flex items-center space-x-3 py-1 px-5 w-full bg-gray-light bg-opacity-80 mb-2 rounded-md'>
                                            <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                            <p className='text-sm font-normal'>{o.qualite}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className='w-full mb-3'>
                        <p className='text-sm font-medium'>6 - Les aspects à porter à l'attention</p>
                        <textarea
                            className='w-2/3 h-28 ml-5 rounded-md border-gray-dark border-2 p-2'
                            type="text"
                            id="aspectsPorterAttention"
                            value={aspectsPorterAttention}
                            onChange={(e) => setAspectsPorterAttention(e.target.value)} />
                    </div>
                    <div className='w-full mb-3'>
                        <p className='text-sm font-medium mb-2'>7 - Plan d’action </p>
                        <div className='w-2/3 flex justify-between text-sm items-end space-x-2 mb-3 ml-5'>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="quoiFaire">Quoi Faire</label>
                                <input type="text" id='quoiFaire' className='rounded-md border-gray-dark border-2 p-2' value={quoiFaire} onChange={(e) => setQuoiFaire(e.target.value)} />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="quand">Quand</label>
                                <input type="text" id='quand' className='rounded-md border-gray-dark border-2 p-2' value={quand} onChange={(e) => setQuand(e.target.value)} />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="ou">Ou</label>
                                <input type="text" id='ou' className='rounded-md border-gray-dark border-2 p-2' value={ou} onChange={(e) => setOu(e.target.value)} />
                            </div>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="financement">Financement</label>
                                <div className='flex items-center gap-2'>
                                    <input type="text" id='financement' className='rounded-md border-gray-dark border-2 p-2' value={financement} onChange={(e) => setFinancement(e.target.value)} />
                                    <div className="relative group flex w-auto">
                                        <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                            Ajouter
                                        </div>
                                        <FreeIconButton color={'bg-magenta text-white px-2 py-2'} onClick={handlePlanAction}><FaSquarePlus size={20} /></FreeIconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {planAction.length > 0 &&
                            <table className='w-2/3 ml-5'>
                                <thead className='bg-magenta'>
                                    <tr className='border-2 border-magenta'>
                                        <th className="border-r border-white p-2">
                                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Quoi faire
                                            </p>
                                        </th>
                                        <th className="border-r border-white p-2">
                                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Quand
                                            </p>
                                        </th>
                                        <th className="border-r border-white p-2">
                                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Ou
                                            </p>
                                        </th>
                                        <th className=" border-r border-white p-2">
                                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Financement
                                            </p>

                                        </th>
                                        <th className="w-24 p-2">
                                            <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Actions
                                            </p>

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {planAction.map((plan) => (
                                        <tr key={plan.id}>
                                            <td className="cursor-pointer border-y border-x border-magenta pt-2">
                                                <div className="flex items-center ml-3 mb-3">
                                                    <p className="block antialiased font-semibold text-sm leading-normal">{plan.quoiFaire}</p>
                                                </div>
                                            </td>

                                            <td className="cursor-pointer border-y border-x border-magenta pt-2">
                                                <div className="flex items-center ml-3 mb-3">
                                                    <p className="block antialiased font-semibold text-sm leading-normal">{plan.quand}</p>
                                                </div>
                                            </td>

                                            <td className="cursor-pointer border-y border-x border-magenta pt-2">
                                                <div className="flex items-center ml-3 mb-3">
                                                    <p className="block antialiased font-semibold text-sm leading-normal">{plan.ou}</p>
                                                </div>
                                            </td>
                                            <td className="cursor-pointer border-y border-x border-magenta pt-2">
                                                <div className="flex items-center ml-3 mb-3">
                                                    <p className="block antialiased font-semibold text-sm leading-normal">{plan.financement}</p>
                                                </div>
                                            </td>
                                            <td className="cursor-pointer border-y border-x  border-magenta pt-2">
                                                <div className='flex justify-center'>
                                                    <div className="relative group flex w-auto">
                                                        <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                            Supprimer
                                                        </div>
                                                        <FreeIconButton color={'text-magenta'} onClick={() => deletePlanAction(plan.id)}><TiDeleteOutline size={25} /></FreeIconButton>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>))}
                                </tbody>
                            </table>}
                    </div>
                </div>
            </div>
        </>
    )
}
