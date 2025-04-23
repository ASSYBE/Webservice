import React, { useContext, useEffect, useState } from 'react'
import { FreeButton } from '../../../component/FreeButton'
import { FreeIconButton } from '../../../component/FreeIconButton'
import { TiDeleteOutline } from 'react-icons/ti'
import axiosClient from '../../../api/axios-client'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { FaSquarePlus } from 'react-icons/fa6'
import ButtonComponent from '../../../component/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../../../contexts/TokenContext'

export const Fiche16Softskills = () => {
    const [softskill, setSoftskill] = useState("")
    const [softskills, setSoftskills] = useState([])
    const [fiche16Result, setFiche16Result] = useState([])

    const [indiquer_soft_skills, setIndiquer_soft_skills] = useState("")
    const [fiche, setFiche] = useState({})
    const navigate = useNavigate()

    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { getTraduction } = useContext(LanguageContext)


    function addSoftskills() {
        if (!softskill || softskill.trim() === "" || softskills.length >= 3) {
            return;
        }

        const alreadyExists = softskills.some(item => item.softskill === softskill);
        if (alreadyExists) {
            return;
        }

        setSoftskills(prevValides => [
            ...prevValides,
            { softskill }
        ]);

        handleSoftSkills();
        setSoftskill("");
    }


    function deleteSoftSkills(index, id) {
        setSoftskills(prevSkills => prevSkills.filter((_, i) => i !== index));
        delete_SoftSkills(id)
    }

    async function delete_SoftSkills(id) {
        try {
            const response = await axiosClient.delete(`/fiche16/${id}?cin=${cin}`)
            console.log("message : ", response.data.message);
        } catch (error) {
            console.log("error :", error)
        }
    }

    async function handleSoftSkills() {
        const data = {
            softskill
        }
        try {
            console.log("softSkills: ", JSON.stringify(data, null, 3))
            const response = await axiosClient.post(`/fiche16/store/${fiche?.id}?cin=${cin}`, data)
            console.log("message : ", response.data.message);
        } catch (error) {
            console.log("error :", error)
        }
    }

    async function fetchData() {

        try {
            const fiche16Result = await axiosClient.get(`/fiche16/select?cin=${cin}`)
            const response = await axiosClient.get(`/fiche16?cin=${cin}`)
            const { fiche, reponseQ44 } = response.data
            setFiche(fiche)
            setIndiquer_soft_skills(fiche.reponseQ44)
            setFiche16Result(fiche16Result.data.filtredQuestions)
            setSoftskills(fiche16Result.data.fiche_softSkills)
        } catch (error) {
            console.log("error : ", error)
        }

    }

    async function handleSubmit() {
        const formData = { reponseQ44: indiquer_soft_skills };
        try {
            const response = await axiosClient.put(`/fiche16/reponseQ44/${fiche?.id}?cin=${cin}`, formData);
            console.log('Form submitted successfully:', JSON.stringify(formData, null, 3));
            navigate("/BDC/fiche17")

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }


    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    useEffect(() => {
        if (cin && token) {
            fetchData()
        } else
            getToken()
    }, [cin, token])


    return (

        <div className='flex flex-col w-1/3 sm:w-1/3'>

            <ButtonComponent type='button' color="bg-magenta" onClick={handleSubmit}>
                {getTraduction('suivant', { FR: 'Suivant', AR: 'التالي', EN: 'Next' })}
            </ButtonComponent>
            <div>
                <div className='w-full flex items-center gap-4'>
                    <select name="secteur_developpement" value={softskill} onChange={(e) => setSoftskill(e.target.value)} className={` w-full rounded-md border-gray-dark border-2 p-2`} id="zone_territoriale">
                        <option value="" disabled>selectionner votre softskills</option>
                        {
                            fiche16Result && fiche16Result.map((z) => (
                                <option key={z.valeur_id?.valeur_id} value={z.valeur_id?.valeur_id}>{getTraduction(z?.valeur_id?.valeur_id, z.valeur_id)}</option>
                            ))
                        }
                    </select>
                    <div className="relative group flex w-auto">
                        <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                            Ajouter
                        </div>
                        <FreeIconButton color={'bg-magenta text-white px-2 py-2'} onClick={addSoftskills}><FaSquarePlus size={25} /></FreeIconButton>
                    </div>
                </div>
                <ul className="list-disc mt-4 text-black">
                    {softskills && softskills.map((t, index) => (
                        <li key={t.id} className="grid grid-cols-[95%_5%] py-1 pl-5 pr-1 w-full bg-gray-light bg-opacity-40 mb-2 rounded-md">
                            <span className="flex items-center gap-4 font-normal text-sm">
                                <div className='w-2 h-2 rounded-full bg-magenta'></div>
                                {fiche16Result.length > 0 && getTraduction(fiche16Result?.find((e) => (e?.valeur_id?.valeur_id === t?.softskill))?.valeur_id?.valeur_id, fiche16Result.find((e) => (e.valeur_id?.valeur_id === t?.softskill))?.valeur_id)}
                            </span>
                            <div className="relative group flex w-auto">
                                <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                    Supprimer
                                </div>
                                <FreeIconButton onClick={() => deleteSoftSkills(index, t.id)} color='text-magenta flex justify-center p-0'>
                                    <TiDeleteOutline size={25} />
                                </FreeIconButton>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='mt-4 flex flex-col'>
                <label className='text-sm' htmlFor="indiquer_soft_skills">Indiquez les soft skills que vous avez le plus utilisées dans votre vie, décrivez le contexte dans lequel vous étiez, avec qui et quelles activités vous avez menées.</label>
                <textarea name="indiquer_soft_skills" id="indiquer_soft_skills" className='w-full h-24 border border-gray-dark rounded-md p-2 focus:border-black' value={indiquer_soft_skills} onChange={(e) => setIndiquer_soft_skills(e.target.value)}></textarea>
            </div>
        </div>
    )
}
