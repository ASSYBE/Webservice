import React, { useCallback, useContext, useEffect, useState } from 'react';
import axiosClient from '../../../../api/axios-client';
import { ImMenu3, ImMenu4 } from "react-icons/im";
import { BeneficierContext } from '../../../../contexts/BeneficierContext';
import { FreeButton } from '../../../../component/FreeButton';
import { FreeIconButton } from '../../../../component/FreeIconButton';
import { ResponseOutput } from '../../../../component/ResponseOutput';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../../../component/ButtonComponent';
import { TokenContext } from '../../../../contexts/TokenContext';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

export default function Fiche08AnalysePosteScreen() {
    const [openExperienceId, setOpenExperienceId] = useState(null);
    const [experiences, setExperiences] = useState([]);
    const [formData, setFormData] = useState({});
    const [sigecExperience, setSigecExperience] = useState([]);
    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    const [isOpen, setIsOpen] = useState(false)

    const debouncedSigecExperience = useDebounce(sigecExperience, 1000);


    const toggleExperience = (experienceId) => {
        setOpenExperienceId(prevState => prevState === experienceId ? null : experienceId);
    };

    const handleChange = (experienceId, field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [experienceId]: {
                ...prevState[experienceId],
                [field]: value || ""
            }
        }));
    };

    async function validerExperience(experienceID) {
        const updatedData = formData[experienceID];
        await axiosClient.put(`fiche08ExperienceProfessionnelle/${experienceID}?cin=${cin}`, updatedData);
        console.log("Updated data for experience:", updatedData);
        fetchData();
    }

    const fetchData = useCallback(async () => {
        try {
            const response = await axiosClient.get(`/fiche08ExperienceProfessionnelle?cin=${cin}`);
            const responsesigec = await axiosClient.get(`/fiche08ExperienceProfessionnelle/sigec`);

            const fetchedExperiences = response.data.fiche08ExperienceProfessionnelle;
            setSigecExperience(responsesigec.data.sigecExperienceProfessionnelle);

            setExperiences(fetchedExperiences);

            const initialFormData = {};
            fetchedExperiences.forEach(experience => {
                initialFormData[experience.id] = {
                    activitesPrincipales: experience.activitesPrincipales || '',
                    activitesSecondaires: experience.activitesSecondaires || '',
                    aspectsPositifs: experience.aspectsPositifs || '',
                    aspectsNegatifs: experience.aspectsNegatifs || '',
                    connaissancesNecessaires: experience.connaissancesNecessaires || '',
                    responsabilites: experience.responsabilites || '',
                    problemesRencontres: experience.problemesRencontres || '',
                    niveauAutonomie: experience.niveauAutonomie || '',
                    savoirFaire: experience.savoirFaire || ''
                };
            });
            setFormData(initialFormData);
        } catch (e) {
            console.error("Error fetching experiences:", e);
        }
    }, []);

    function openPopup() {
        setIsOpen(true)
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const navigate = useNavigate()

    function handleSubmit() {
        navigate('/BDC/fiche08/activiteExtraProfessionnelle')
    }

    return (
        <div className='pt-6'>
            <ButtonComponent type="button" onClick={handleSubmit} color='bg-magenta'>Suivant</ButtonComponent>
            <h1 className='text-lg font-bold mb-6 text-black'>
                Analyse du poste de travail
            </h1>

            {experiences
                .filter((experience, index, self) =>
                    index === self.findIndex((e) => e.id === experience.id)
                )
                .map((experience, index) => {
                    const value = sigecExperience.find((e) => e.id === experience.id);
                    return (
                        <div key={experience.id} className="experience-section mb-8 w-full bg-gray-light bg-opacity-40 px-6 py-4 rounded-md shadow-md">

                            <button
                                className='flex items-center gap-5'
                                onClick={() => toggleExperience(experience.id)}
                            >
                                <FreeIconButton color="text-black font-normal text-sm flex justify-center">{openExperienceId === experience.id ? <ImMenu4 size={25} /> : <ImMenu3 size={25} />} </FreeIconButton>
                                <div className='font-semibold text-base'>
                                    {experience?.IntitulePoste}
                                </div>
                            </button>

                            {openExperienceId === experience.id && formData[experience.id] && (
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className='mt-4'>
                                        <div className='flex flex-wrap gap-6'>
                                            {['activitesPrincipales', 'activitesSecondaires', 'aspectsPositifs', 'aspectsNegatifs', 'connaissancesNecessaires', 'responsabilites', 'problemesRencontres', 'niveauAutonomie', 'savoirFaire'].map((field, idx) => (
                                                <div key={idx} className='w-full md:w-1/4 flex flex-col mb-2'>
                                                    <label htmlFor={`${field}-${experience.id}`} className='font-semibold text-sm'>
                                                        {field === 'activitesPrincipales' ? 'Activités principales ' : field === 'activitesSecondaires' ? 'Activités secondaires ' : field === 'aspectsPositifs' ? 'Aspects positifs ' : field === 'aspectsNegatifs' ? 'Aspects négatifs ' : field === 'connaissancesNecessaires' ? 'Connaissances nécessaires ' : field === 'responsabilites' ? 'Responsabilités ' : field === 'problemesRencontres' ? 'Problèmes rencontrés ' : field === 'niveauAutonomie' ? 'Niveau d’autonomie ' : 'Savoir-faire '}
                                                    </label>
                                                    <textarea
                                                        id={`${field}-${experience.id}`}
                                                        className='w-full h-24 border border-gray-dark focus:border-black rounded-md p-2 text-black font-normal text-sm'
                                                        placeholder={`Décrivez les ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                                                        value={formData[experience.id]?.[field]}
                                                        onChange={(e) => handleChange(experience.id, field, e.target.value)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <FreeButton type='button' color="bg-magenta" onClick={() => { validerExperience(experience.id); toggleExperience(experience.id) }}>
                                        Valider
                                    </FreeButton>

                                    {value ? (
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

                                    )}

                                </form>


                            )}
                        </div>
                    );
                })}

        </div>
    );
}
