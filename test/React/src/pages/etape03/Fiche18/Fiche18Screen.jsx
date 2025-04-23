import React, { useContext, useEffect, useState } from 'react'
import ButtonComponent from '../../../component/ButtonComponent';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import { LanguageContext } from '../../../contexts/LanguageContext';
import axiosClient from '../../../api/axios-client';
import { BdcContext } from '../../../contexts/BdcContext';
import { FreeIconButton } from '../../../component/FreeIconButton';
import { ImMenu3, ImMenu4 } from 'react-icons/im';
import { FreeButton } from '../../../component/FreeButton';
import { ResponseOutput } from '../../../component/ResponseOutput';
import { Fiche18LesOutilsUtilise } from './Fiche18LesOutilsUtilise';
import { TiDeleteOutline } from 'react-icons/ti';
import { Fiche18CapaciteStyle } from './Fiche18CapaciteStyle';
import { Fiche18ProfessionnelsEnContact } from './Fiche18ProfessionnelsEnContact';
import { parseString, parseStringPromise } from "xml2js";
import { XMLParser } from "fast-xml-parser";
import { Fiche18EnvironnementDeTravail } from './Fiche18EnvironnementDeTravail';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DOMParser } from "xmldom";
import { FaFileDownload } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import { TokenContext } from '../../../contexts/TokenContext';


export const Fiche18Screen = () => {
    const date = new Date()

    const { beneficier, getBeneficier } = useContext(BeneficierContext);
    const { getBdc } = useContext(BdcContext)
    const { language, getTraduction } = useContext(LanguageContext);

    const [fiche, setFiche] = useState({})
    const [formation, setFormation] = useState([])

    const [openExperienceId, setOpenExperienceId] = useState(null);

    const [categories1, setCategories1] = useState([])
    const [categories2, setCategories2] = useState([])
    const [categories3, setCategories3] = useState([])
    const [categories4, setCategories4] = useState([])
    const [refreshData, setRefreshData] = useState(false);

    const [fiche11a, setFiche11a] = useState([])
    const [capacites, setCapacites] = useState([])
    const [styles, setStyles] = useState([])

    const [professions, setProfessions] = useState([])
    const [parametreProfession, setParametreProfession] = useState([])

    const [fiche8AnalysePoste, setFiche8AnalysePoste] = useState([])
    const [fiche18_contenu, setFiche18_contenu] = useState({})
    const [combien_gagne, setCombien_gagne] = useState("")
    const [horaire_rythme, setHoraire_rythme] = useState("")

    const [environnementCategorie1, setEnvironnementCategorie1] = useState([])
    const [environnementCategorie2, setEnvironnementCategorie2] = useState([])
    const [environnementCategorie3, setEnvironnementCategorie3] = useState([])

    const [fichier, setFichier] = useState([])



    const navigate = useNavigate()
    const [RQ2, setRQ2] = useState(false)
    const [loading, setLoading] = useState(true)

    const [responseData, setResponseData] = useState(null);


    async function fetchData() {
        try {
            const fileResponse = await axiosClient.get(`/files?cin=${cin}`)
            const response = await axiosClient.get(`/fiche18?cin=${cin}`)
            const responsefiche11A = await axiosClient.get(`/fiche11A?cin=${cin}`);
            const responseExperienceProfessionnelle = await axiosClient.get(`/fiche08ExperienceProfessionnelle?cin=${cin}`);

            setFichier(fileResponse.data.files)
            setFiche(response.data.fiche)
            setFormation(response.data.parametreFormation)
            setParametreProfession(response.data.parametreProfession)

            setFiche11a(responsefiche11A.data.fiche11A)
            setCapacites(responsefiche11A.data.fiche11aN1Capa)
            setStyles(responsefiche11A.data.fiche11aN1Sty)

            console.log("fiche 11 a: ", JSON.stringify(responsefiche11A.data.fiche11A, null, 3))

            console.log("fiche analyse de poste : ", JSON.stringify(responseExperienceProfessionnelle.data.fiche08ExperienceProfessionnelle, null, 3))
            setFiche8AnalysePoste(responseExperienceProfessionnelle.data.fiche08ExperienceProfessionnelle)


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const toggleExperience = async (experienceId) => {
        setOpenExperienceId(prevState => (prevState === experienceId ? null : experienceId));
    };

    async function fetchExperience() {
        try {

            const response = await axiosClient.get(`/fiche18/categories?poste_intitule_id=${openExperienceId}`);

            setCategories1(response.data.categorie1Values)
            setCategories2(response.data.categorie2Values)
            setCategories3(response.data.categorie3Values)
            setCategories4(response.data.categorie4Values)

            setEnvironnementCategorie1(response.data.environnementCategorie1Values)
            setEnvironnementCategorie2(response.data.environnementCategorie2Values)
            setEnvironnementCategorie3(response.data.environnementCategorie3Values)

            const { fiche18_contenu } = response.data
            console.log("fiche 18 :", fiche18_contenu)
            setFiche18_contenu(fiche18_contenu || {})
            setCombien_gagne(fiche18_contenu?.combien_gagne || "")
            setHoraire_rythme(fiche18_contenu?.horaire_rythme || "")

            console.log("Données récupérées :", response.data);

        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        }
    }

    async function fetchProfession() {
        try {

            const response = await axiosClient.get(`/fiche18/profession?poste_intitule_id=${openExperienceId}`);

            setProfessions(response.data.professions)

            console.log("Données récupérées :", response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        }
    }

    useEffect(() => {
        fetchExperience()
        fetchProfession()
    }, [openExperienceId, refreshData])


    async function validerExperience() {
        const data = {
            cin: beneficier.cin,
            poste_intitule_id: openExperienceId,
            combien_gagne,
            horaire_rythme
        }
        console.log("data :", JSON.stringify(data, null, 3))
        try {
            if (!fiche18_contenu.id) {
                const response = await axiosClient.post(`/fiche18/${fiche.id}`, data)
                console.log("data added with success !")
            } else {
                const response = await axiosClient.put(`/fiche18/edit/${fiche18_contenu.id}`, data)
                console.log("data updated with success !")
            }


        } catch (error) {
            console.error("error :", error)
        }
    }

    async function fetchSOAPData() {

        const soapurl = 'http://178.18.250.209:8057/bo/service/call/Bilan';

        const requestBody = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://schema.example.com">
            <soapenv:Header/>
            <soapenv:Body>
                <sch:GetChercheur>
                <login>bilan</login>
                <password>#@1321032025%@</password> 
                <cin>TN33333</cin>
                <password_ch>TN33333</password_ch>
                </sch:GetChercheur>
            </soapenv:Body>
            </soapenv:Envelope>
            `;

        const headers = {
            'Content-Type': 'text/xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };

        axios.get(soapurl, requestBody, { headers })
            .then(response => {
                parseString(response.data, (err, result) => {
                    if (err) {
                        console.error('Error parsing XML:', err);
                        return;
                    }
                    const nomCandidat = result['soapenv:Envelope']['soapenv:Body'][0]['ns1:GetChercheurResponse'][0]['GetChercheurReturn'][0].item[0].value[0];


                });
            })
            .catch(error => {
                console.error('Error making SOAP request:', error);
            });
    }
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
            fetchSOAPData()
        } else
            getToken()
    }, [cin, token])


    const options = parametreProfession.map((e) => ({
        value: e.valeur_id,
        label: getTraduction(e.valeur_id, e),
    }));

    async function handlesubmit() {
        try {
            const response = await axiosClient.get(`/fiche18/edit?cin=${cin}`)
            console.log("fiche 18 update :", response.data.message)
            navigate('/BDC/fiche19')
        } catch (error) {
            console.error("Erreur lors de l'appel API :", error);
        }
    }


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
            <ButtonComponent type='button' color="bg-magenta" onClick={handlesubmit}>
                {getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
            </ButtonComponent>
            <div className='w-full max-h-[100%] overflow-x-auto px-6 py-6'>

                <SubHeaderComponent
                    alignmentClass={alignmentClass}
                    color='text-black'
                    date={date}
                    labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                    labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                    title={`La carte des métiers`}
                    content={`Pour dresser la carte de chaque métier/ profession ou poste occupé, veuillez indiquées vos réponses aux questions suivantes :
                    <br />- Quelles sont les tâches effectuées ?
                    <br />- Quel est le parcours de formation?
                    <br />- Quels outils sont-ils utilisés ?
                    <br />- Quelles sont les caractéristiques personnelles nécéssaires ?
                    <br />- Quels sont les horaires et les rythmes de travail ?
                    <br />- Combien gagnez-vous ?
                    <br />- Quelles difficultés peut-on rencontrer ?
                    <br />- Quel est l'environnement de travail ?
                    <br />- Avec quels professionnels êtes-vous en contact ?`}
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
                <div className='flex items-start w-1/3 gap-4 mt-4'>
                    <div className='mb-4 w-full'>
                        <h1 className='text-lg font-medium'>Les formations</h1>
                        <ul className="list-disc mt-2 text-black">
                            {formation && formation.map((c) => (
                                <li key={c.id} className="flex py-2 px-5 w-full bg-gray-light bg-opacity-80 mb-2 rounded-md">
                                    <span className="flex items-center gap-4 font-normal text-sm">
                                        <div className='w-2 h-2 rounded-full bg-orange'></div> {getTraduction(c.valeur_id, c)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {fiche11a && fiche11a
                    .filter((experience, index, self) =>
                        index === self.findIndex((e) => e.id === experience.id)
                    )
                    .map((experience, index) => {
                        return (
                            <div key={experience.id} className="experience-section mb-8 w-full bg-gray-light bg-opacity-80 px-6 py-4 rounded-md shadow-md">

                                <button
                                    className='flex items-center gap-5'
                                    onClick={() => toggleExperience(experience.id)}
                                >
                                    <FreeIconButton color="text-black font-normal text-sm flex justify-center">{openExperienceId === experience.id ? <ImMenu4 size={25} /> : <ImMenu3 size={25} />} </FreeIconButton>
                                    <div className='font-semibold text-base'>
                                        {experience?.experience}
                                    </div>
                                </button>

                                {openExperienceId === experience.id && (
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className='mt-4'>

                                            <div className='flex flex-wrap gap-3'>
                                                <div className='w-full'>
                                                    <h1 className='text-lg font-medium mb-2'>Quels outils sont-ils utilisés?</h1>
                                                    <Fiche18LesOutilsUtilise setRefreshData={setRefreshData} fiche={fiche} experienceId={openExperienceId} categories1={categories1} categories2={categories2} categories3={categories3} categories4={categories4} />
                                                </div>

                                                <div className='w-full my-4'>
                                                    <h1 className='text-lg font-medium'>Quelles sont les caractéristiques personnelles nécessaires?</h1>
                                                    <Fiche18CapaciteStyle capacites={capacites.filter((c) => c.uuid_reponse_fiche11a_n1 === experience.id)} styles={styles.filter((c) => c.uuid_reponse_fiche11a_n1 === experience.id)} />
                                                </div>

                                                <div className='w-full flex flex-wrap gap-5'>
                                                    <div className='w-full md:w-1/3 flex flex-col mb-2'>
                                                        <h1 className='text-lg font-medium'>Combien gagné-vous ?</h1>
                                                        <select
                                                            name="combien"
                                                            id="combien"
                                                            value={combien_gagne}
                                                            onChange={(e) => setCombien_gagne(e.target.value)}
                                                            className='w-full border-2 border-gray-dark rounded-md p-2 mt-2 text-black font-normal text-sm'>
                                                            <option value="" disabled >Sélectionnez un montant</option>
                                                            <option value="[3000-5000]">3 000 - 5 000 DH</option>
                                                            <option value="[5000-8000]">5 000 - 8 000 DH</option>
                                                            <option value="[8000-11000]">8 000 - 11 000 DH</option>
                                                            <option value="[11000-15000]">11 000 - 15 000 DH</option>
                                                            <option value="[15000-20000]">15 000 - 20 000 DH</option>
                                                            <option value="[20000-25000]">20 000 - 25 000 DH</option>
                                                            <option value="[25000-30000]">25 000 - 30 000 DH</option>
                                                        </select>
                                                    </div>

                                                    <div className='w-full md:w-1/3 flex flex-col mb-2'>
                                                        <h1 className='text-lg font-medium'>Quels sont les horaires et les rythmes de travail ?</h1>
                                                        <select
                                                            name="horaire"
                                                            id="horaire"
                                                            value={horaire_rythme}
                                                            onChange={(e) => setHoraire_rythme(e.target.value)}
                                                            className="w-full border-2 border-gray-dark rounded-md p-2 mt-2 text-black font-normal text-sm"
                                                        >
                                                            <option value="" disabled >Sélectionnez un horaire</option>
                                                            <option value="[06:00-12:00]">06:00 - 12:00</option>
                                                            <option value="[08:00-16:00]">08:00 - 16:00</option>
                                                            <option value="[09:00-17:00]">09:00 - 17:00</option>
                                                            <option value="[10:00-18:00]">10:00 - 18:00</option>
                                                            <option value="[12:00-20:00]">12:00 - 20:00</option>
                                                            <option value="[14:00-22:00]">14:00 - 22:00</option>
                                                            <option value="[22:00-06:00]">22:00 - 06:00 (Travail de nuit)</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className='w-full flex flex-wrap gap-5 mb-4'>
                                                    <div className=' w-1/3'>
                                                        <h1 className='text-lg font-medium'>Quelles tâches effectue-t-il ?</h1>
                                                        <ul className="list-disc mt-2 text-black bg-white bg-opacity-80 rounded-md">
                                                            <li className="flex py-1 px-5 w-full">
                                                                <span className="flex items-center gap-4 font-normal text-sm">
                                                                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {fiche8AnalysePoste.find(e => e.id === experience?.reponse_fiche8_id).activitesPrincipales}
                                                                </span>
                                                            </li>
                                                            <li className="flex py-1 px-5 w-full ">
                                                                <span className="flex items-center gap-4 font-normal text-sm">
                                                                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {fiche8AnalysePoste.find(e => e.id === experience?.reponse_fiche8_id).activitesSecondaires}
                                                                </span>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                    <div className='w-1/3'>
                                                        <h1 className='text-lg font-medium'>Quelles difficultés peut-on rencontrer ?</h1>
                                                        <ul className="list-disc mt-2 text-black bg-white bg-opacity-80 rounded-md">
                                                            <li className="flex py-2 px-5 w-full mb-2">
                                                                <span className="flex items-center gap-4 font-normal text-sm">
                                                                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {fiche8AnalysePoste.find(e => e.id === experience?.reponse_fiche8_id).problemesRencontres}
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className='w-full'>
                                                    <h1 className='text-lg font-medium mb-2'>Quel est l'environnement de travail ?</h1>
                                                    <Fiche18EnvironnementDeTravail fiche={fiche} experienceId={openExperienceId} setRefreshData={setRefreshData} environnementCategorie1={environnementCategorie1} environnementCategorie2={environnementCategorie2} environnementCategorie3={environnementCategorie3}></Fiche18EnvironnementDeTravail>
                                                </div>
                                                <div className='w-full'>
                                                    <div className="w-1/3 sm:w-1/3">
                                                        <h1 className='text-lg font-medium'>Avec quels professionnels êtes-vous en contact ?</h1>

                                                        <Fiche18ProfessionnelsEnContact
                                                            fiche={fiche}
                                                            experienceId={openExperienceId}
                                                            setRefreshData={setRefreshData}
                                                            options={options}
                                                            professions={professions}
                                                            parametreProfession={parametreProfession}
                                                            RQ2={RQ2} />


                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <FreeButton type='button' color="bg-magenta" onClick={() => { validerExperience(fiche.id); toggleExperience(experience.id) }} >
                                            Valider
                                        </FreeButton>

                                        {/* {true ? (
                                            <ResponseOutput
                                                isOpen={isOpen}
                                                handleSubmit={() => handleSubmit(experience.id)}
                                                closePopup={() => setIsOpen(false)}
                                                title={value?.IntitulePoste}
                                                message="Voulez-vous enregistrer ?"
                                                buttonVName="Oui"
                                                buttonCName="Non"
                                            />

                                        ) : (
                                            <ResponseOutput
                                                isOpen={isOpen}
                                                handleSubmit={() => handleSubmit(experience.id)}
                                                closePopup={() => setIsOpen(false)}
                                                title={experience?.IntitulePoste}
                                                message="Voulez-vous enregistrer ?"
                                                buttonVName="Oui"
                                                buttonCName="Non"
                                            />

                                        )} */}

                                    </form>


                                )}
                            </div>
                        );
                    })}

            </div>

        </>
    )
}
