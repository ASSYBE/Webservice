import React, { useContext, useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { MdDeleteForever } from 'react-icons/md'
import axiosClient from '../../../api/axios-client'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { useNavigate } from 'react-router-dom'
import SubHeaderComponent from '../../../component/SubHeaderComponent'
import { LanguageContext } from '../../../contexts/LanguageContext'
import ButtonComponent from '../../../component/ButtonComponent'
import { ResponseOutput } from '../../../component/ResponseOutput'
import { BdcContext } from '../../../contexts/BdcContext'
import { FreeButton } from '../../../component/FreeButton'
import { FreeIconButton } from '../../../component/FreeIconButton'
import { TiDeleteOutline } from 'react-icons/ti'
import { FaFileDownload } from 'react-icons/fa'
import { FaSquarePlus } from 'react-icons/fa6'
import { anapecRole } from '../../../constants/Variables'
import { TokenContext } from '../../../contexts/TokenContext'
import { NotFound } from '../../../screens/NotFound'

const Fiche09AScreen = () => {
  const [connaissances, setConnaissances] = useState([])
  const [habilites, setHabilites] = useState([])
  const [ressources, setRessources] = useState([])
  const [competenceConnaissance, setCompetenceConnaissance] = useState([])
  const [fiche9a, setFiche9a] = useState({})
  const date = new Date()
  const { getTraduction } = useContext(LanguageContext)

  const [connaissance, setConnaissance] = useState('')
  const [ressource, setRessource] = useState('')
  const [habilite, setHabilite] = useState('')

  const [activites_effecacites, setActivites_effecacites] = useState('')
  const [activites_effecacites_pourquoi, setActivites_effecacites_pourquoi] = useState('')

  const [activites_difficultes, setActivites_difficultes] = useState('')
  const [activites_difficultes_pourquoi, setActivites_difficultes_pourquoi] = useState('')

  const [errorMessage, setErrorMessage] = useState("")
  const [errorMessageActivite, setErrorMessageActivite] = useState("")

  const navigate = useNavigate()

  const { beneficier, getBeneficier } = useContext(BeneficierContext)
  const { getBdc } = useContext(BdcContext)
  const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)




  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [fichier, setFichier] = useState([]);


  const MAX_CHARACTERS = 255;



  const [RQ1, setRQ1] = useState(false)
  const [RQ2, setRQ2] = useState(false)
  const [RQ3, setRQ3] = useState(false)
  const [RQ5, setRQ5] = useState(false)
  const [RQ6, setRQ6] = useState(false)
  const [RQ7, setRQ7] = useState(false)
  const [RQ8, setRQ8] = useState(false)


  function validateFields() {
    const isRQ1Valid = activites_effecacites.trim() !== '';
    const isRQ2Valid = activites_effecacites_pourquoi.trim() !== '';
    const isRQ3Valid = activites_difficultes.trim() !== '';
    const isRQ4Valid = activites_difficultes_pourquoi.trim() !== '';

    setRQ5(!isRQ1Valid);
    setRQ6(!isRQ2Valid);
    setRQ7(!isRQ3Valid);
    setRQ8(!isRQ4Valid);

    return isRQ1Valid && isRQ2Valid && isRQ3Valid && isRQ4Valid;
  }

  function validateField1() {
    const isRQ1Valid = connaissance.trim() !== '';

    setRQ1(!isRQ1Valid);

    return isRQ1Valid;
  }
  function validateField2() {
    const isRQ2Valid = ressource.trim() !== '';

    setRQ2(!isRQ2Valid);

    return isRQ2Valid;
  }
  function validateField3() {

    const isRQ3Valid = habilite.trim() !== '';


    setRQ3(!isRQ3Valid);

    return isRQ3Valid;
  }

  const validateData = () => {

    if (activites_effecacites.length > MAX_CHARACTERS ||
      activites_effecacites_pourquoi.length > MAX_CHARACTERS ||
      activites_difficultes.length > MAX_CHARACTERS ||
      activites_difficultes_pourquoi.length > MAX_CHARACTERS) {
      alert("Le nombre de caractères dépasse la limite de 255 caractéres.");
      return false;
    }

    return true;
  };

  async function handleSubmitConnaissance(e) {
    e.preventDefault()

    if (!validateField1())
      return;

    const formData = {
      connaissances_utilise: connaissance
    }
    try {
      await axiosClient.post(`/fiche9aConnaissance?cin=${cin}&nom=${nomAgent}`, formData)
      fetchData()
      setConnaissance("")
      setErrorMessage("")

    } catch (error) {
      console.error("Error adding knowledge:", error)
    }
  }

  async function handleSubmitRessource(e) {
    e.preventDefault()

    if (!validateField2())
      return;

    const formData = {
      ressouces_personnelles_joue: ressource
    }
    try {
      await axiosClient.post(`/fiche9aRessource?cin=${cin}&nom=${nomAgent}`, formData)
      fetchData()
      setRessource("")
      setErrorMessage("")

    } catch (error) {
      console.error("Error adding resource:", error)
    }
  }

  async function handleSubmitHabilite(e) {
    e.preventDefault()

    if (!validateField3())
      return;

    const formData = {
      habilites_utilise: habilite
    }
    try {
      await axiosClient.post(`/fiche9aHabilite?cin=${cin}&nom=${nomAgent}`, formData)
      fetchData()
      setHabilite("")
      setErrorMessage("")
    } catch (error) {
      console.error("Error adding skill:", error)
    }
  }

  async function deleteConnaissance(id) {
    try {
      await axiosClient.delete(`/fiche9aConnaissance/${id}`)
      fetchData()
    } catch (error) {
      console.error("Error deleting knowledge:", error)
    }
  }

  async function deleteRessource(id) {
    try {
      await axiosClient.delete(`/fiche9aRessource/${id}`)
      fetchData()
    } catch (error) {
      console.error("Error deleting resource:", error)
    }
  }

  async function deleteHabilite(id) {
    try {
      await axiosClient.delete(`/fiche9aHabilite/${id}`)
      fetchData()
    } catch (error) {
      console.error("Error deleting skill:", error)
    }
  }

  async function fetchData() {
    setLoading(true)
    try {
      const response = await axiosClient.get(`/fiche9a?cin=${cin}`)
      const { competenceConnaissance, connaissances, habilites, ressources, fiche9a } = response.data
      setConnaissances(connaissances)
      setHabilites(habilites)
      setRessources(ressources)
      setCompetenceConnaissance(competenceConnaissance)
      setFiche9a(fiche9a)
      setFichier(response.data.files);

      setActivites_effecacites(fiche9a.activites_effecacites)
      setActivites_effecacites_pourquoi(fiche9a.activites_effecacites_pourquoi)
      setActivites_difficultes(fiche9a.activites_difficultes)
      setActivites_difficultes_pourquoi(fiche9a.activites_difficultes_pourquoi)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {

    if (!validateData())
      return;
    if (!activites_difficultes | !activites_difficultes_pourquoi | !activites_effecacites | !activites_effecacites_pourquoi) {
      setErrorMessageActivite("Veuillez remplir les champs")
      return;
    }
    const formData = {
      activites_effecacites,
      activites_effecacites_pourquoi,
      activites_difficultes,
      activites_difficultes_pourquoi,
    };

    console.log('Submitting form with data: ', JSON.stringify(formData, null, 3));

    try {
      const response = await axiosClient.put(`/fiche9a/${fiche9a.id}?cin=${cin}`, formData);

      console.log('Fiche9a updated successfully:', response.data);
      navigate(beneficier?.role === anapecRole ? '/BDC/fiche09B' : '/BDC/fiche11A')
    } catch (error) {
      console.error('Error updating fiche9a:', error);
    }
  };

  function openPopup() {
    if (!validateFields())
      return;
    setIsOpen(true)
  }

  const telechargerFile = (fileName, type) => {

    const fileUrl = `/files/${fileName}.${type}`;

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${fileName}.${type}`;
    link.click();
  };


  useEffect(() => {
    getToken()
    const fetchData2 = async () => {
      await fetchData();
      await getBdc()
    }
    fetchData2()
  }, [cin, token]);

  if (!cin || !token) {
    return (
      <NotFound />
    )
  }


  if (isLoading) {
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
    <div className='w-full max-h-[100%] overflow-x-auto px-6 pt-6'>
      <SubHeaderComponent
        // alignmentClass={alignmentClass}
        color='text-black'
        date={date}
        labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
        labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
        content={'instruction'}
        title={`Les Compétences Requises Par Mon Travail`} />

      <div className="flex flex-wrap items-center gap-4 mb-4">
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
      <div className="h-auto relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-light bg-opacity-75 z-10">
            <div className="flex flex-col items-center justify-center space-y-4 opacity-100">
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
              <span className="text-sm font-medium text-black opacity-100">Chargement des données...</span>
            </div>
          </div>
        )}

        <div className="flex flex-nowrap gap-8 justify-start">
          <div className="bg-white w-1/3 sm:w-1/3">
            <h2 className="text-sm font-medium"> Les connaissances que j'utilise</h2>
            <form onSubmit={handleSubmitConnaissance} className="flex items-center justify-between gap-4 mb-4">
              <input
                type="text"
                value={connaissance}
                onChange={(e) => setConnaissance(e.target.value)}
                className={`w-full sm:w-full font-normal text-sm h-12 rounded-md ${!RQ1 ? 'border border-gray-dark' : 'border border-red-normal bg-red-normal  bg-opacity-20'}  p-4 focus:border-black text-black`}
                placeholder="La connaissance"
              />
              <div className="relative group flex w-auto">
                <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                  Ajouter
                </div>
                <FreeIconButton type={'submit'} color={`${loading ? 'bg-gray-light hover:text-white' : 'bg-magenta'}  text-white px-2 py-2`} disabled={loading}><FaSquarePlus size={20} /></FreeIconButton>
              </div>

            </form>
            <ul className="list-disc mt-4 text-black">
              {connaissances && connaissances.map((c) => (
                <li key={c.id} className="grid grid-cols-[95%_5%] py-1 pl-5 pr-1 w-full bg-gray-light bg-opacity-40 mb-2 rounded-md">
                  <span className="flex items-center gap-4 font-normal text-sm">
                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {c.connaissances_utilise}
                  </span>
                  <div className="relative group flex w-auto">
                    <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                      Supprimer
                    </div>
                    <FreeIconButton onClick={() => deleteConnaissance(c.id)} color='text-magenta flex justify-center p-0'>
                      <TiDeleteOutline size={25} />
                    </FreeIconButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>


          <div className="bg-white w-1/3 sm:w-1/3">
            <h2 className="text-sm font-medium">Les habilités que j'utilise</h2>
            <form onSubmit={handleSubmitHabilite} className="flex items-center justify-between gap-4 mb-4">
              <input
                type="text"
                value={habilite}
                onChange={(e) => setHabilite(e.target.value)}
                className={`w-full sm:w-full font-normal text-sm h-12 rounded-md ${!RQ3 ? 'border border-gray-dark' : 'border border-red-normal bg-red-normal  bg-opacity-20'}  p-4 focus:border-black text-black`}
                placeholder="L'habilité que j'utilise"
              />
              <div className="relative group flex w-auto">
                <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                  Ajouter
                </div>
                <FreeIconButton type={'submit'} color={`${loading ? 'bg-gray-light hover:text-white' : 'bg-magenta'}  text-white px-2 py-2`} disabled={loading}><FaSquarePlus size={20} /></FreeIconButton>
              </div>
            </form>
            <ul className="list-disc mt-4 text-black">
              {habilites && habilites.map((t) => (
                <li key={t.id} className="grid grid-cols-[95%_5%] py-1 pl-5 pr-1 w-full bg-gray-light bg-opacity-40 mb-2 rounded-md">
                  <span className="flex items-center gap-4 font-normal text-sm">
                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {t.habilites_utilise}
                  </span>
                  <div className="relative group flex w-auto">
                    <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                      Supprimer
                    </div>
                    <FreeIconButton onClick={() => deleteHabilite(t.id)} color='text-magenta flex justify-center'>
                      <TiDeleteOutline size={25} />
                    </FreeIconButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white w-1/3 sm:w-1/3">
            <h2 className="text-sm font-medium"> Les ressources personnelles que je joue</h2>
            <form onSubmit={handleSubmitRessource} className="flex items-center justify-between gap-4 mb-4">
              <input
                type="text"
                value={ressource}
                onChange={(e) => setRessource(e.target.value)}
                className={`w-full sm:w-full font-normal text-sm h-12 rounded-md ${!RQ2 ? 'border border-gray-dark' : 'border border-red-normal bg-red-normal  bg-opacity-20'}  p-4 focus:border-black text-black`}
                placeholder="la ressource personnelle que je joue"
              />
              <div className="relative group flex w-auto">
                <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                  Ajouter
                </div>
                <FreeIconButton type={'submit'} color={`${loading ? 'bg-gray-light hover:text-white' : 'bg-magenta'}  text-white px-2 py-2`} disabled={loading}><FaSquarePlus size={20} /></FreeIconButton>
              </div>
            </form>
            <ul className="list-disc mt-4 text-black">
              {ressources && ressources.map((q) => (
                <li key={q.id} className="grid grid-cols-[95%_5%] py-1 pl-5 pr-1 w-full bg-gray-light bg-opacity-40 mb-2 rounded-md">
                  <span className="flex items-center gap-4 font-normal text-sm">
                    <div className='w-2 h-2 rounded-full bg-magenta'></div> {q.ressouces_personnelles_joue}
                  </span>
                  <div className="relative group flex w-auto">
                    <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                      Supprimer
                    </div>
                    <FreeIconButton onClick={() => deleteRessource(q.id)} color='text-magenta flex justify-center p-0'>
                      <TiDeleteOutline size={25} />
                    </FreeIconButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='text-left'>
          <label htmlFor="" className='text-red-normal '>{errorMessage}</label>
        </div>
        <div className="space-y-8">

          <div className="bg-white">
            {/* 
            <div className='text-left'>
              <label htmlFor="" className='text-red-normal '>{errorMessageActivite}</label>
            </div> */}
            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-3 gap-8 justify-start">
              <div className='bg-white w-full sm:w-full  mt-4'>
                <h2 className="text-sm font-medium">Les activités que je méne avec plus d'efficacité</h2>
                <input
                  type="text"
                  value={activites_effecacites}
                  onChange={(e) => setActivites_effecacites(e.target.value)}
                  className={`w-full sm:w-full font-normal text-sm h-12 rounded-md ${!RQ5 ? 'border border-gray-dark' : 'border border-red-normal bg-red-normal  bg-opacity-20'}  p-4 focus:border-black text-black`}

                />
                <h2 className="text-sm font-medium mt-4">Pourquoi ?</h2>

                <textarea
                  value={activites_effecacites_pourquoi}
                  onChange={(e) => setActivites_effecacites_pourquoi(e.target.value)}
                  className={`w-full sm:w-full font-normal text-sm h-24 rounded-md ${!RQ6 ? 'border border-gray-dark' : 'border border-red-normal bg-red-normal  bg-opacity-20'}  p-4 focus:border-black text-black`}
                  placeholder="Pourquoi cette activité est plus efficace ?"
                ></textarea>
              </div>


              <div className='bg-white w-full sm:w-full mt-4'>
                <h2 className="text-sm font-medium">Les activités dans lesquelles je rencontre des difficultés</h2>
                <input
                  type="text"
                  value={activites_difficultes}
                  onChange={(e) => setActivites_difficultes(e.target.value)}
                  className={`w-full sm:w-full font-normal text-sm h-12 rounded-md ${!RQ7 ? 'border border-gray-dark' : 'border border-red-normal bg-red-normal  bg-opacity-20'}  p-4 focus:border-black text-black`}
                />
                <h2 className="text-sm font-medium mt-4">Pourquoi ?</h2>

                <textarea
                  value={activites_difficultes_pourquoi}
                  onChange={(e) => setActivites_difficultes_pourquoi(e.target.value)}
                  className={`w-full sm:w-full font-normal text-sm h-24 rounded-md ${!RQ8 ? 'border border-gray-dark' : 'border border-red-normal bg-red-normal  bg-opacity-20'}  p-4 focus:border-black text-black`}
                  placeholder="Pourquoi cette activité est ?"
                ></textarea>
              </div>
              <div className="text-center">
                <ButtonComponent type='button' color={`bg-magenta`} onClick={openPopup} >
                  {getTraduction(`modifier`, { FR: `Enregistrer`, AR: `حفظ`, EN: `Save` })}
                </ButtonComponent>
              </div>
            </form>
            <ResponseOutput
              isOpen={isOpen}
              handleSubmit={handleSubmit}
              closePopup={() => setIsOpen(false)}
              title={"Les Compétences Requises Par Mon Travail"}
              message="Voulez-vous enregistrer ?"
              buttonVName="Oui"
              buttonCName="Non"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fiche09AScreen
