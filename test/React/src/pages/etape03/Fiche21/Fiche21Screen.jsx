import React, { useContext, useEffect, useState } from 'react'
import ButtonComponent from '../../../component/ButtonComponent'
import SubHeaderComponent from '../../../component/SubHeaderComponent'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { LanguageContext } from '../../../contexts/LanguageContext'
import axiosClient from '../../../api/axios-client'
import { FreeIconButton } from '../../../component/FreeIconButton'
import { FaSquarePlus } from 'react-icons/fa6'
import { TiDeleteOutline } from 'react-icons/ti'
import { BdcContext } from '../../../contexts/BdcContext'
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { FaFileDownload } from 'react-icons/fa'
import { TokenContext } from '../../../contexts/TokenContext'

export const Fiche21Screen = () => {

    const date = new Date()

    const { beneficier, getBeneficier } = useContext(BeneficierContext);
    const { getBdc } = useContext(BdcContext)
    const { language, getTraduction } = useContext(LanguageContext);

    const [fiche, setFiche] = useState([])
    const [fiche_project, setFiche_project] = useState({})
    const [zoneParametre, setZoneParametre] = useState([])
    const [secteurParametre, setSecteurParametre] = useState([])
    const [secteurFiche5, setSecteurFiche5] = useState([])
    const [contrainte_opportunite, setContrainte_opportunite] = useState("")
    const [secteur_developpement, setSecteur_developpement] = useState("")
    const [zone_territoriale, setZone_territoriale] = useState("")
    const [professions_identifee, setProfessions_identifee] = useState("")

    const [fichier, setFichier] = useState([])

    const [profil_choisi, setProfil_choisi] = useState("")
    const [domaine_ou_secteur, setDomaine_ou_secteur] = useState("")
    const [profil_identifie_tache, setProfil_identifie_tache] = useState("")
    const [profil_identifie_competence, setProfil_identifie_competence] = useState("")
    const [analyse_ressources_partie1, setAnalyse_ressources_partie1] = useState("")
    const [analyse_ressources_ai_deja, setAnalyse_ressources_ai_deja] = useState("")
    const [analyse_ressources_a_devlopper, setAnalyse_ressources_a_devlopper] = useState("")
    const [analyse_ressources_a_aquerir, setAnalyse_ressources_a_aquerir] = useState("")
    const [parcours_entreprendre_actions, setParcours_entreprendre_actions] = useState("")
    const [parcours_entreprendre_contact, setParcours_entreprendre_contact] = useState("")
    const [parcours_entreprendre_tems, setParcours_entreprendre_tems] = useState("")

    const MAX_CHARACTERS = 255;

    const [RQ1, setRQ1] = useState(false)
    const [RQ2, setRQ2] = useState(false)
    const [RQ3, setRQ3] = useState(false)
    const [RQ4, setRQ4] = useState(false)
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    function validateFields() {
        const isRQ1Valid = professions_identifee.trim() !== '';
        const isRQ2Valid = zone_territoriale.trim() !== '';
        const isRQ3Valid = secteur_developpement.trim() !== '';
        const isRQ4Valid = contrainte_opportunite.trim() !== '';

        setRQ1(!isRQ1Valid);
        setRQ2(!isRQ2Valid);
        setRQ3(!isRQ3Valid);
        setRQ4(!isRQ4Valid);

        return isRQ1Valid && isRQ2Valid && isRQ3Valid && isRQ4Valid
    }

    const validateData = () => {
        if (
            professions_identifee.length > MAX_CHARACTERS ||
            zone_territoriale.length > MAX_CHARACTERS ||
            secteur_developpement.length > MAX_CHARACTERS ||
            contrainte_opportunite.length > MAX_CHARACTERS
        ) {
            alert("Le nombre de caractères dépasse la limite de 255 caractéres.");
            return false;
        }

        return true;
    };
    async function fetchProjet() {
        try {
            const response_projet = await axiosClient.get(`/fiche21/create?cin=${cin}`);


            setFiche_project(response_projet.data.fiche_project)

            setProfil_choisi(response_projet.data.fiche_project.profil_choisi)
            setDomaine_ou_secteur(response_projet.data.fiche_project.domaine_ou_secteur)
            setProfil_identifie_tache(response_projet.data.fiche_project.profil_identifie_tache)
            setProfil_identifie_competence(response_projet.data.fiche_project.profil_identifie_competence)
            setAnalyse_ressources_partie1(response_projet.data.fiche_project.analyse_ressources_partie1)
            setAnalyse_ressources_ai_deja(response_projet.data.fiche_project.analyse_ressources_ai_deja)
            setAnalyse_ressources_a_aquerir(response_projet.data.fiche_project.analyse_ressources_a_aquerir)
            setAnalyse_ressources_a_devlopper(response_projet.data.fiche_project.analyse_ressources_a_devlopper)
            setParcours_entreprendre_actions(response_projet.data.fiche_project.parcours_entreprendre_actions)
            setParcours_entreprendre_contact(response_projet.data.fiche_project.parcours_entreprendre_contact)
            setParcours_entreprendre_tems(response_projet.data.fiche_project.parcours_entreprendre_tems)

            console.log(response_projet.data.message)
        } catch (error) {
            console.log("message error :", error)
        }
    }
    async function fetchData() {
        try {
            const response = await axiosClient.get(`/fiche21?cin=${cin}`);
            const fileResponse = await axiosClient.get(`/files?cin=${cin}`)

            setFichier(fileResponse.data.files)
            setFiche(response.data.fiche)
            setZoneParametre(response.data.zoneParametre)
            setSecteurParametre(response.data.parametreSecteur)
            setSecteurFiche5(response.data.fiche_secteur)

            console.log(response.data.message)
        } catch (error) {
            console.log("message error :", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleProject() {
        if (!validateData())
            return

        if (!validateFields())
            return
        const data = {
            contrainte_opportunite,
            secteur_developpement,
            zone_territoriale,
            professions_identifee
        }

        try {
            console.log("data : ", JSON.stringify(data, null, 3))
            const response = await axiosClient.post(`/fiche21?cin=${cin}`, data);
            console.log(response.data.message);
            fetchData()
        } catch (error) {
            console.log(error);
        } finally {
            setContrainte_opportunite("")
            setSecteur_developpement("")
            setZone_territoriale("")
            setProfessions_identifee("")
        }
    }

    async function handleSubmit() {
        // if (!validateData())
        //     return

        // if (!validateFields())
        //     return
        const data = {
            profil_choisi,
            domaine_ou_secteur,
            profil_identifie_tache,
            profil_identifie_competence,
            analyse_ressources_partie1,
            analyse_ressources_ai_deja,
            analyse_ressources_a_devlopper,
            analyse_ressources_a_aquerir,
            parcours_entreprendre_actions,
            parcours_entreprendre_contact,
            parcours_entreprendre_tems
        }

        try {
            console.log("data : ", JSON.stringify(data, null, 3))
            const response = await axiosClient.put(`/fiche21/${fiche_project?.id}/update?cin=${cin}`, data);
            console.log(response.data.message);
            navigate('/BDC/fiche22')
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteProject(id) {
        try {
            const response = await axiosClient.delete(`/fiche21/${id}?cin=${cin}`)
            console.log(response.data.message)
            fetchData()
        } catch (error) {
            console.log("message d'erreur:", error)
        }
    }

    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
            fetchProjet();
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
                    title={`Le projet professionnel`}
                />
                <div className='flex flex-wrap items-center gap-4'>
                    {fichier && fichier.length > 0 && (
                        fichier.map((f) => (
                            <div key={f.id} className=" flex items-center gap-3">
                                {f.REM && (
                                    <button
                                        onClick={() => telechargerFile(f.REM, f.typeREM)}
                                        className="bg-gray-dark text-black py-1 px-3 rounded-md hover:bg-magenta hover:text-white transition duration-300 flex items-center gap-3"
                                    >
                                        {f.REM} <FaFileDownload />
                                    </button>
                                )}

                                {f.REC && (
                                    <button
                                        onClick={() => telechargerFile(f.REC, f.typeREC)}
                                        className="bg-gray-dark text-black py-1 px-3 rounded-md hover:bg-magenta hover:text-white transition duration-300 flex items-center gap-3"
                                    >
                                        {f.REC}<FaFileDownload />
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
                <h2 className='text-lg font-semibold mb-3'>Le projet identifié</h2>
                <div className='mt-3 flex flex-col w-1/2 mb-5 text-sm'>
                    <label htmlFor="profil_choisi" className='font-medium' >Le profil choisi : j'aimerais travailler comme</label>
                    <input name="profil_choisi" id="profil_choisi" className={`rounded-md border-gray-dark border-2 p-2`} value={profil_choisi} onChange={(e) => setProfil_choisi(e.target.value)} />
                </div>
                <div className='flex flex-col w-1/2 mb-5 text-sm'>
                    <label htmlFor="domaine_ou_secteur" className='font-medium'>Domaine ou secteur dans lequel il est possible d'exercer la profession :</label>
                    <textarea name="domaine_ou_secteur" id="domaine_ou_secteur" className={`rounded-md h-24 border-gray-dark border-2 p-2`} value={domaine_ou_secteur} onChange={(e) => setDomaine_ou_secteur(e.target.value)}>
                    </textarea>
                </div>

                <label htmlFor="domaine_ou_secteur" className='font-medium text-sm'>Le profil identifié peut être décrit comme suit</label>
                <div className='grid grid-cols-2 gap-2 mb-3 mt-3 '>
                    <div className='w-full md:w-full flex flex-col mb-2 text-sm'>
                        <label htmlFor="profil_identifie_tache" className='text-sm'> Tâches principales (fonctions, activités)</label>
                        <textarea name="profil_identifie_tache" id="profil_identifie_tache" className={`rounded-md h-24 border-gray-dark border-2 p-2`} value={profil_identifie_tache} onChange={(e) => setProfil_identifie_tache(e.target.value)}>
                        </textarea>
                    </div>
                    <div className='w-full md:w-full flex flex-col mb-2 text-sm'>
                        <label htmlFor="profil_identifie_competence" className='text-sm'>Les compétences requises</label>
                        <textarea name="profil_identifie_competence" id="profil_identifie_competence" className={`rounded-md h-24 border-gray-dark border-2 p-2`} value={profil_identifie_competence} onChange={(e) => setProfil_identifie_competence(e.target.value)}>
                        </textarea>
                    </div>
                </div>

                <label htmlFor="domaine_ou_secteur" className='font-medium text-sm'>Analyse des ressources</label>
                <div className='grid grid-cols-2 gap-2 mb-5 items-end mt-3'>
                    <div className='flex flex-col w-full text-sm'>
                        <label htmlFor="analyse_ressources_partie1" className='text-sm'>Particularités, risques, horaires, environnement de travail, conditions d'accès, type de contrat, salaire, zones géographiques</label>
                        <textarea name="analyse_ressources_partie1" id="analyse_ressources_partie1" className={`rounded-md h-24 border-gray-dark border-2 p-2`} value={analyse_ressources_partie1} onChange={(e) => setAnalyse_ressources_partie1(e.target.value)}>
                        </textarea>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="analyse_ressources_ai_deja" className='text-sm'>Qu'est-ce que j'ai déjà</label>
                        <textarea name="analyse_ressources_ai_deja" id="analyse_ressources_ai_deja" className={`rounded-md h-24 text-sm border-gray-dark border-2 p-2`} value={analyse_ressources_ai_deja} onChange={(e) => setAnalyse_ressources_ai_deja(e.target.value)}>
                        </textarea>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="analyse_ressources_a_devlopper" className='text-sm'>Que dois-je développer</label>
                        <textarea name="analyse_ressources_a_devlopper" id="analyse_ressources_a_devlopper" className={`rounded-md h-24 text-sm border-gray-dark border-2 p-2`} value={analyse_ressources_a_devlopper} onChange={(e) => setAnalyse_ressources_a_devlopper(e.target.value)}>
                        </textarea>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="analyse_ressources_a_aquerir" className='text-sm'>Que dois-je acquérir</label>
                        <textarea name="analyse_ressources_a_aquerir" id="analyse_ressources_a_aquerir" className={`rounded-md h-24 text-sm border-gray-dark border-2 p-2`} value={analyse_ressources_a_aquerir} onChange={(e) => setAnalyse_ressources_a_aquerir(e.target.value)}>
                        </textarea>
                    </div>
                </div>
                <label htmlFor="domaine_ou_secteur" className='font-medium text-sm'>Les parcours à entreprendre pour acquérir / développer les ressources identifiées</label>
                <div className='grid grid-cols-2 gap-2 mb-3 items-end mt-3'>
                    <div className='flex flex-col w-full '>
                        <label htmlFor="parcours_entreprendre_actions" className='text-sm'>Toutes les actions à entreprendre</label>
                        <textarea name="parcours_entreprendre_actions" id="parcours_entreprendre_actions" className={`rounded-md h-24 text-sm border-gray-dark border-2 p-2`} value={parcours_entreprendre_actions} onChange={(e) => setParcours_entreprendre_actions(e.target.value)}>
                        </textarea>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="parcours_entreprendre_contact" className='text-sm'>Où (qui contacter)</label>
                        <textarea name="parcours_entreprendre_contact" id="parcours_entreprendre_contact" className={`rounded-md h-24 text-sm border-gray-dark border-2 p-2`} value={parcours_entreprendre_contact} onChange={(e) => setParcours_entreprendre_contact(e.target.value)}>
                        </textarea>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="parcours_entreprendre_tems" className='text-sm'>Le temps (éventuels délais, plans d'action)</label>
                        <textarea name="parcours_entreprendre_tems" id="parcours_entreprendre_tems" className={`rounded-md h-24 text-sm border-gray-dark border-2 p-2`} value={parcours_entreprendre_tems} onChange={(e) => setParcours_entreprendre_tems(e.target.value)}>
                        </textarea>
                    </div>

                </div>
                <h2 className='text-lg font-semibold mb-2 mt-5'>Premières réflexions</h2>
                <div className='w-2/3 flex justify-between items-end space-x-2 mb-3'>
                    <div className='w-full flex flex-col text-sm'>
                        <label htmlFor="professions_identifiee">Ce que je veux</label>
                        <input type="text" id='professions_identifiee' className={`rounded-md ${!RQ1 ? '' : 'border-red-normal bg-red-salmon bg-opacity-20'} border-gray-dark border-2 p-2`} value={professions_identifee} onChange={(e) => setProfessions_identifee(e.target.value)} />
                    </div>
                    <div className='w-full flex flex-col text-sm'>
                        <label htmlFor="zone_territoriale">Où</label>
                        <select name="zone_territoriale" value={zone_territoriale} onChange={(e) => setZone_territoriale(e.target.value)} className={`rounded-md ${!RQ2 ? '' : 'border-red-normal bg-red-salmon bg-opacity-20'} border-gray-dark border-2 p-2`} id="zone_territoriale">
                            <option value="" disabled>selectionner votre zone territoriale</option>
                            {
                                zoneParametre && zoneParametre.map((z) => (
                                    <option value={z.valeur_id}>{getTraduction(z.valeur_id, z)}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='w-full flex flex-col text-sm'>
                        <label htmlFor="ou">Type d'entreprise ou d'organisation</label>
                        <select name="secteur_developpement" value={secteur_developpement} onChange={(e) => setSecteur_developpement(e.target.value)} className={`rounded-md ${!RQ3 ? '' : 'border-red-normal bg-red-salmon bg-opacity-20'} border-gray-dark border-2 p-2`} id="zone_territoriale">
                            <option value="" disabled>selectionner votre secteur de développement</option>
                            {
                                secteurFiche5 && secteurFiche5.map((z) => (
                                    <option value={z.valeur_id_secteur}>{getTraduction(secteurParametre.find((e) => (e.valeur_id === z.valeur_id_secteur)).valeur_id, secteurParametre.find((e) => (e.valeur_id === z.valeur_id_secteur)))}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='w-full flex flex-col text-sm'>
                        <label htmlFor="financement">Sous quelles conditions</label>
                        <div className='flex items-center gap-2'>
                            <input type="text" id='financement' className={`rounded-md ${!RQ4 ? '' : 'border-red-normal bg-red-salmon bg-opacity-20'} border-gray-dark border-2 p-2`} value={contrainte_opportunite} onChange={(e) => setContrainte_opportunite(e.target.value)} />
                            <div className="relative group flex w-auto">
                                <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                    Ajouter
                                </div>
                                <FreeIconButton color={'bg-magenta text-white px-2 py-2'} onClick={handleProject}><FaSquarePlus size={20} /></FreeIconButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    {fiche.length > 0 && <table>
                        <thead className='bg-magenta'>
                            <tr className='border-2 border-magenta'>
                                <th className="border-r border-white p-2">
                                    <p className="font-sans text-sm w-full text-white flex items-center justify-center gap-2 font-semibold leading-normal">Les professions Identifiées <br />Ce que je veux faire
                                    </p>
                                </th>
                                <th className="border-r border-white p-2">
                                    <p className="font-sans text-sm w-full text-white flex items-center justify-center gap-2 font-semibold leading-normal">Zone territoriale <br />Où
                                    </p>
                                </th>
                                <th className="border-r border-white p-2">
                                    <p className="font-sans text-sm w-full text-white flex items-center justify-center gap-2 font-semibold leading-normal">secteurs de développement <br />Type d'entreprise ou d'organisation
                                    </p>
                                </th>
                                <th className=" border-r border-white p-2">
                                    <p className="font-sans text-sm w-full text-white flex items-center justify-center gap-2 font-semibold leading-normal">Contraintes et opportunités <br />Sous quelles conditions (travail salarié / indépendant : temps plein / temps partiel...)
                                    </p>

                                </th>
                                <th className="w-24 p-2">
                                    <p className="font-sans text-sm text-white flex items-center justify-center gap-2 font-semibold leading-none">Actions
                                    </p>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {fiche.map((plan) => (
                                <tr key={plan.id}>
                                    <td className="cursor-pointer border-y border-x border-magenta pt-2">
                                        <div className="flex items-center mx-1 mb-2">
                                            <p className="block antialiased font-semibold text-sm leading-normal">{plan.professions_identifee}</p>
                                        </div>
                                    </td>

                                    <td className="cursor-pointer border-y border-x border-magenta pt-2">
                                        <div className="flex items-center mx-1 mb-2">
                                            <p className="block antialiased font-semibold text-sm leading-normal">{getTraduction(zoneParametre.find((e) => (e.valeur_id === plan.zone_territoriale)).valeur_id, zoneParametre.find((e) => (e.valeur_id === plan.zone_territoriale)))}</p>
                                        </div>
                                    </td>

                                    <td className="cursor-pointer border-y border-x border-magenta pt-2">
                                        <div className="flex items-center mx-1 mb-2">
                                            <p className="block antialiased font-semibold text-sm leading-normal">{getTraduction(secteurParametre.find((e) => (e.valeur_id === plan.secteur_developpement)).valeur_id, secteurParametre.find((e) => (e.valeur_id === plan.secteur_developpement)))}</p>
                                        </div>
                                    </td>
                                    <td className="cursor-pointer border-y border-x border-blue-gray-100 border-magenta pt-2">
                                        <div className="flex items-center mx-1 mb-2">
                                            <p className="block antialiased font-semibold text-sm leading-normal">{plan.contrainte_opportunite}</p>
                                        </div>
                                    </td>
                                    <td className="cursor-pointer border-y border-x border-blue-gray-100  border-magenta">
                                        <div className='flex justify-center'>
                                            <div className="relative group flex w-auto">
                                                <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                    Supprimer
                                                </div>
                                                <FreeIconButton color={'text-magenta'} onClick={() => deleteProject(plan.id)}><TiDeleteOutline size={25} /></FreeIconButton>
                                            </div>
                                        </div>
                                    </td>

                                </tr>))}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}
