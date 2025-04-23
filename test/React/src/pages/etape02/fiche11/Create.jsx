import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { FaSquarePlus } from 'react-icons/fa6';
import { IoMdCloseCircle } from "react-icons/io";
import axiosClient from '../../../api/axios-client';
import { TiDeleteOutline } from 'react-icons/ti';
import { FreeButton } from '../../../component/FreeButton';
import { StylePersonnelList } from './StylePersonnelList';
import { CapaciteOperationnelList } from './CapaciteOperationnelList';

function Create({ isOpen, onClose, cin, parametreCapacite, parametreStyle, experiences, fetchData, selectedFiche, setSelectFiche, type, setType, isEdit, setIsEdit }) {
    const [fiche11a, setFiche11a] = useState([]);
    const [date_debut, setDate_debut] = useState('');
    const [date_fin, setDate_fin] = useState('');
    const [tacheEffectue, setTacheEffectue] = useState('');
    const [experience, setExperience] = useState('');
    const [connaissances, setConnaissances] = useState([]);
    const [capacite_operationnelles, setCapaciteOperationnelles] = useState('');
    const [codCapa, setCodCapa] = useState('');
    const [style_personnel, setStylePersonnel] = useState('');
    const [codStyle, setCodStyle] = useState('');
    const [connaissance, setConnaissance] = useState('')
    const [experiencesfiche8, setExperiencesfiche8] = useState([])
    const [reponse_fiche8_id, setReponse_fiche8_id] = useState("")

    const [capacite, setCapacite] = useState([]);
    const [style, setStyle] = useState([]);

    const [isOpenStyle, setIsOpenStyle] = useState(false);
    const [isOpenCapacity, setIsOpenCapacity] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [RQ1, setRQ1] = useState(false)
    const [RQ2, setRQ2] = useState(false)
    const [RQ3, setRQ3] = useState(false)
    const [RQ4, setRQ4] = useState(false)
    const [RQ5, setRQ5] = useState(false)
    const [RQ6, setRQ6] = useState(false)

    const MAX_CHARACTERS = 255;

    useEffect(() => {
        if (selectedFiche) {
            setExperience(selectedFiche?.fiche11A?.experience || '');
            setDate_debut(selectedFiche?.fiche11A?.date_debut || '');
            setDate_fin(selectedFiche?.fiche11A?.date_fin || '');
            setTacheEffectue(selectedFiche?.fiche11A?.tacheEffectue || '');
            setConnaissances(selectedFiche?.fiche11aN1 || []);
            setCapacite(selectedFiche?.fiche11aN1Capa || []);
            setStyle(selectedFiche?.fiche11aN1Sty || []);
            console.log("fiche8 id :", selectedFiche?.fiche11A?.id)
            setReponse_fiche8_id(selectedFiche?.fiche11A?.id || "")
        }

    }, [selectedFiche]);

    function validateFields() {
        const isRQ1Valid = experience.trim() !== '';
        const isRQ2Valid = date_debut.trim() !== '';
        const isRQ3Valid = tacheEffectue.trim() !== '';
        const isRQ4Valid = connaissances.length !== 0;
        const isRQ5Valid = capacite.length !== 0;
        const isRQ6Valid = style.length !== 0;

        setRQ1(!isRQ1Valid);
        setRQ2(!isRQ2Valid);
        setRQ3(!isRQ3Valid);
        setRQ4(!isRQ4Valid);
        setRQ5(!isRQ5Valid);
        setRQ6(!isRQ6Valid);

        return isRQ1Valid && isRQ2Valid && isRQ3Valid && isRQ4Valid && isRQ5Valid && isRQ6Valid;
    }

    const validateData = () => {
        if (tacheEffectue.length > MAX_CHARACTERS) {
            alert("Le nombre de caractères dépasse la limite de 255 caractères.");
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;
        if (!validateData()) return;

        if (!cin) {
            alert("CIN is missing. Please ensure the beneficiary information is correct.");
            return;
        }

        if (!experience || !tacheEffectue || !capacite || !style) {
            alert("Please fill in all required fields.");
            return;
        }

        const formData = {
            experience,
            date_debut,
            date_fin,
            reponse_fiche8_id,
            tacheEffectue,
            connaissances,
            capacite_operationnelles: capacite,
            style_personnel: style
        };

        console.log("Submitting formData:", JSON.stringify(formData, null, 3));

        try {

            const response = await axiosClient.post(`/fiche11A/post?cin=${cin}`, formData);
            console.log("Response from POST request:", response);
            alert("Vous avez ajouté l'analyse de l'activité et des compétences avec succès.");

            onClose();
            fetchData();

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false);

        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;
        if (!validateData()) return;

        if (!cin) {
            alert("CIN is missing. Please ensure the beneficiary information is correct.");
            return;
        }

        if (!experience || !tacheEffectue || !capacite || !style) {
            alert("Please fill in all required fields.");
            return;
        }

        const formData = {
            experience,
            date_debut,
            date_fin,
            reponse_fiche8_id,
            tacheEffectue,
            connaissances,
            capacite_operationnelles: capacite,
            style_personnel: style
        };
        try {
            if (selectedFiche) {
                await axiosClient.put(`/fiche11A/${selectedFiche.fiche11A.id}?cin=${cin}`, formData);
                alert("L'analyse de l'activité et des compétences a été mise à jour avec succès.");
            }

            setSelectFiche({});
            setIsEdit(false)
            setType("")
            fetchData();

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false);

            onClose();
        }
    };

    const handleConnaissances = (e) => {
        e.preventDefault();
        if (connaissance) {
            setConnaissances(prev => [...prev, { connaissance }]);
            setConnaissance('');
        }
    };

    const removeConnaissance = (connaissance) => {
        setConnaissances(prev => prev.filter(c => c.connaissance !== connaissance));
    };

    const openStylePopup = () => {
        setIsOpenStyle(true);
    };
    const closeStylePopup = () => {
        setIsOpenStyle(false);
    };

    const openCapacitePopup = () => {
        setIsOpenCapacity(true);
    };
    const closeCapacitePopup = () => {
        setIsOpenCapacity(false);
    };


    useEffect(() => {
        const selectedStyle = parametreStyle?.find(e => e.style === style_personnel);
        setCodStyle(selectedStyle ? selectedStyle.cod : '');
    }, [style_personnel, parametreStyle]);

    useEffect(() => {
        const selectedCapacite = parametreCapacite?.find(e => e.capacite === capacite_operationnelles);
        setCodCapa(selectedCapacite ? selectedCapacite.cod : '');
    }, [capacite_operationnelles, parametreCapacite]);


    const fetchElement = async () => {
        setIsLoading(true);
        try {
            const responsecreate = await axiosClient.get(`/fiche11A/create?cin=${cin}`);

            setExperiencesfiche8(responsecreate.data.fiche8Experience)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchElement()
    }, []);

    if (!isOpen) return null;

    function onClosePopup() {
        onClose()
        setType("")
        setSelectFiche({})
        setIsEdit(false)
    }

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative overflow-x-auto bg-white shadow-xl rounded-lg p-6">
                <button onClick={onClosePopup} className="text-magenta px-4 py-2 absolute right-0 top-0 hover:text-gray-dark transition duration-300">
                    <IoMdCloseCircle size={25} />
                </button>
                <StylePersonnelList isOpen={isOpenStyle} onClose={closeStylePopup} parametreStyle={parametreStyle} setStyle={setStyle} style={style} />
                <CapaciteOperationnelList isOpen={isOpenCapacity} onClose={closeCapacitePopup} parametreCapacite={parametreCapacite} setCapacite={setCapacite} capacite={capacite} />

                <form onSubmit={isEdit ? handleUpdate : handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <div>
                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>

                                <select
                                    id="experience"
                                    value={experience}
                                    onChange={(e) => {
                                        const selectedExperience = experiences.find(exp => exp.IntitulePoste === e.target.value);
                                        setExperience(e.target.value);
                                        if (selectedExperience) {
                                            setReponse_fiche8_id(selectedExperience?.id)
                                            setDate_debut(selectedExperience?.periode_debut);
                                            setDate_fin(selectedExperience?.periode_fin ?? '');
                                            setTacheEffectue(selectedExperience.activitesPrincipales + " " + selectedExperience.activitesSecondaires);
                                        }
                                    }}
                                    className={`mt-1 block w-full px-3 py-2 ${!RQ1 ? 'border' : 'border border-red-normal bg-red-normal  bg-opacity-20'}  rounded-md border-gray-dark focus:border-black text-sm`}
                                >
                                    <option value="" disabled>selectionner un experience</option>
                                    {selectedFiche && <option value={experience}>{experience}</option>}

                                    {experiencesfiche8 && experiencesfiche8.map((e) => {
                                        return (
                                            <option key={e.id} value={e.IntitulePoste}>
                                                {e.IntitulePoste}
                                            </option>
                                        )
                                    })}
                                </select>

                            </div>
                        </div>

                        <div className='flex items-center gap-4'>
                            <div>
                                <label htmlFor="duree" className="block text-sm font-medium text-black">Date début</label>
                                <input
                                    type="date"
                                    id="date_debut"
                                    disabled={type === "sigec" || selectedFiche}
                                    value={date_debut}
                                    onChange={(e) => setDate_debut(e.target.value)}
                                    className={`mt-1 block w-full px-3 py-2 ${!RQ2 ? 'border' : 'border border-red-normal bg-red-normal  bg-opacity-20'}  rounded-md border-gray-dark focus:border-black text-sm`}
                                />
                            </div>
                            <div>
                                <label htmlFor="duree" className="block text-sm font-medium text-black">Date fin</label>
                                <input
                                    type="date"
                                    id="date_fin"
                                    disabled={type === "sigec" || selectedFiche}
                                    value={date_fin}
                                    onChange={(e) => setDate_fin(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border rounded-md border-gray-dark focus:border-black text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="tacheEffectue" className="block text-sm font-medium text-gray-700">Tâches effectuées</label>
                        <textarea
                            id="tacheEffectue"
                            value={tacheEffectue}
                            disabled={type === "sigec" || selectedFiche}
                            onChange={(e) => setTacheEffectue(e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 ${!RQ3 ? 'border' : 'border border-red-normal bg-red-normal  bg-opacity-20'}  rounded-md border-gray-dark focus:border-black text-sm`}
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="connaissance" className="block text-sm font-medium text-gray-700">Connaissances</label>
                        <div className='flex items-center gap-2'>

                            <input
                                type="text"
                                id="connaissance"
                                value={connaissance}
                                onChange={(e) => setConnaissance(e.target.value)}
                                className={`mt-1 block w-full px-3 py-2 ${!RQ4 ? 'border' : 'border border-red-normal bg-red-normal  bg-opacity-20'}  rounded-md border-gray-dark focus:border-black text-sm`}
                            />

                            <button
                                type="button"
                                onClick={handleConnaissances}
                                className="text-magenta px-4 py-2 hover:text-gray-dark transition duration-300"
                            >
                                <FaSquarePlus size={25} />
                            </button>

                        </div>
                        <div className='h-40 overflow-y-auto border border-gray-dark w-2/3 p-4 rounded-md mt-3'>
                            {connaissances && connaissances.length > 0 && (
                                connaissances.map((c, index) => (
                                    <div key={index} className="flex items-center gap-2 py-2 px-4 mb-2 rounded-md bg-gray-light w-full">
                                        <button
                                            type="button"
                                            onClick={() => removeConnaissance(c.connaissance)}
                                            className="text-magenta p-2 rounded-full hover:text-black transition duration-300"
                                        >
                                            <TiDeleteOutline size={20} />
                                        </button>
                                        <label className="text-black">{c.connaissance}</label>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <form className="flex items-end space-x-4">
                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={openCapacitePopup}
                                    className={` px-4 py-2 ${!RQ5 ? 'text-magenta' : 'text-red-normal'} hover:text-gray-dark transition duration-300`}                                >
                                    <FaSquarePlus size={25} />
                                </button>
                                <label htmlFor="capacite_operationnelles" className="block text-sm font-medium text-gray-700">Capacités opérationnelles</label>

                            </div>
                        </form>

                        <form className="flex items-end space-x-4">
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={openStylePopup}
                                    className={` px-4 py-2 ${!RQ6 ? 'text-magenta' : 'text-red-normal'} hover:text-gray-dark transition duration-300`}

                                >
                                    <FaSquarePlus size={25} />
                                </button>
                                <label htmlFor="style_personnel" className="block text-sm font-medium text-gray-700">Style personnel</label>


                            </div>
                        </form>
                    </div>
                    <div className='grid grid-cols-2 space-x-4'>
                        <div >
                            {capacite && capacite.length > 0 && <div className="flex flex-col h-40 overflow-y-auto rounded-md border-gray-dark focus:border-black w-full p-2 border">
                                {capacite.map((c) => (
                                    <div key={c.id} className="w-full grid grid-cols-2">
                                        <label className="flex items-center gap-4">
                                            <div className="w-2 h-2 bg-magenta rounded-full"></div>
                                            {c.capacite_operationnelles}
                                        </label>
                                        <label>{c.cod}</label>

                                    </div>
                                ))}
                            </div>}
                        </div>
                        <div>
                            {style && style.length > 0 && <div className='flex flex-col h-40 overflow-y-auto border border-gray-dark focus:border-black w-full p-2 rounded-md'>
                                {style.map(s => (
                                    <div key={s.id} className='w-full grid grid-cols-2'>
                                        <div className='flex items-center gap-4'>
                                            <div className='w-2 h-2 bg-magenta rounded-full'></div>{s.style_personnel}</div>
                                        <label className=''>{s.cod}</label>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>
                    <div className="text-center">
                        <FreeButton
                            type="submit"
                            color={'bg-magenta'}
                        >
                            Soumettre
                        </FreeButton>
                    </div>
                </form>

            </div >
        </div >,
        document.body
    )
}

export default Create