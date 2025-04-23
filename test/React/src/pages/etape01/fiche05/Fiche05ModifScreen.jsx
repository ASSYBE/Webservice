import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../api/axios-client';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { TiDeleteOutline } from "react-icons/ti";
import { ThreeDots } from 'react-loader-spinner';
import ButtonComponent from '../../../component/ButtonComponent';
import SubHeaderComponent from '../../../component/SubHeaderComponent';
import { ResponseOutput } from '../../../component/ResponseOutput';


export default function Fiche05ModifScreen({ fiche, cin, parametreCategorie, parametreFormation, parametreObjectif, parametreSecteur, parametreSource, reponseSecteur, reponseCategorie, reponseObjectif, reponseSource, setReponseSecteur, setReponseCategorie, setReponseObjectif, setReponseSource }) {
    const date = new Date()
    const { language, getTraduction } = useContext(LanguageContext)
    const [date_creation, setDate_creation] = useState(date.toISOString().split('T')[0])
    const [message, setMessage] = useState("")

    const [selectedSecteur, setSelectedSecteur] = useState("");
    const [selectedObjectif, setSelectedObjectif] = useState("");
    const [selectedCategorie, setSelectedCategorie] = useState("");
    const [selectedSource, setSelectedSource] = useState("");
    const [isOpen, setIsOpen] = useState(false)


    const [loading, setLoading] = useState(false)


    const handleSelectSecteur = (e) => {
        const selectedValue = e.target.value;
        if (Array.isArray(reponseSecteur)) {
            if (selectedValue && !reponseSecteur.some(secteur => secteur.valeur_id === selectedValue)) {
                const selectedSecteurData = parametreSecteur.find(secteur => secteur.valeur_id === selectedValue);
                if (selectedSecteurData) {
                    setReponseSecteur(prevReponse => {
                        const updatedReponse = Array.isArray(prevReponse) ? [...prevReponse, { uuid: Date.now(), ...selectedSecteurData }] : [{ uuid: Date.now(), ...selectedSecteurData }];
                        return updatedReponse;
                    });
                }
            }
        } else {
            const selectedSecteurData = parametreSecteur.find(secteur => secteur.valeur_id === selectedValue);
            if (selectedSecteurData) {
                setReponseSecteur([{ uuid: Date.now(), ...selectedSecteurData }]);
            }
        }

        setSelectedSecteur("");
    };
    const handleSelectObjectif = (e) => {
        const selectedValue = e.target.value;
        if (Array.isArray(reponseObjectif)) {
            if (selectedValue && !reponseObjectif.some(objectif => objectif.valeur_id === selectedValue)) {
                const selectedObjectifData = parametreObjectif.find(objectif => objectif.valeur_id === selectedValue);
                if (selectedObjectifData) {
                    setReponseObjectif(prevReponse => {
                        const updatedReponse = Array.isArray(prevReponse) ? [...prevReponse, { uuid: Date.now(), ...selectedObjectifData }] : [{ uuid: Date.now(), ...selectedObjectifData }];
                        return updatedReponse;
                    });
                }
            }
        } else {
            const selectedObjectifData = parametreObjectif.find(objectif => objectif.valeur_id === selectedValue);
            if (selectedObjectifData) {
                setReponseObjectif([{ uuid: Date.now(), ...selectedObjectifData }]);
            }
        }

        setSelectedObjectif("");
    };

    const handleSelectCategorie = (e) => {
        const selectedValue = e.target.value;
        if (Array.isArray(reponseCategorie)) {
            if (selectedValue && !reponseCategorie.some(categorie => categorie.valeur_id === selectedValue)) {
                const selectedCategorieData = parametreCategorie.find(categorie => categorie.valeur_id === selectedValue);
                if (selectedCategorieData) {
                    setReponseCategorie(prevReponse => {
                        const updatedReponse = Array.isArray(prevReponse) ? [...prevReponse, { uuid: Date.now(), ...selectedCategorieData }] : [{ uuid: Date.now(), ...selectedCategorieData }];
                        return updatedReponse;
                    });
                }
            }
        } else {
            const selectedCategorieData = parametreCategorie.find(categorie => categorie.valeur_id === selectedValue);
            if (selectedCategorieData) {
                setReponseCategorie([{ uuid: Date.now(), ...selectedCategorieData }]);
            }
        }

        setSelectedCategorie("");
    };

    const handleSelectSource = (e) => {
        const selectedValue = e.target.value;
        if (Array.isArray(reponseSource)) {
            if (selectedValue && !reponseSource.some(source => source.valeur_id === selectedValue)) {
                const selectedSourceData = parametreSource.find(source => source.valeur_id === selectedValue);
                if (selectedSourceData) {
                    setReponseSource(prevReponse => {
                        const updatedReponse = Array.isArray(prevReponse) ? [...prevReponse, { uuid: Date.now(), ...selectedSourceData }] : [{ uuid: Date.now(), ...selectedSourceData }];
                        return updatedReponse;
                    });
                }
            }
        } else {
            const selectedSourceData = parametreSource.find(source => source.valeur_id === selectedValue);
            if (selectedSourceData) {
                setReponseSource([{ uuid: Date.now(), ...selectedSourceData }]);
            }
        }

        setSelectedSource("");
    };

    const navigate = useNavigate();

    const handleDelete = async (e, valeur_id, type) => {
        e.preventDefault();

        try {
            let response;

            switch (type) {
                case 'secteur':
                    response = await axiosClient.delete(`/fiche05/secteur/${valeur_id}`)
                    break;
                case 'objectif':
                    response = await axiosClient.delete(`/fiche05/objectif/${valeur_id}`);
                    break;
                case 'categorie':
                    response = await axiosClient.delete(`/fiche05/categorie/${valeur_id}`);
                    break;
                case 'source':
                    response = await axiosClient.delete(`/fiche05/source/${valeur_id}`);
                    break;
                default:
                    throw new Error("Invalid delete type");
            }

            if (response.status >= 200 && response.status < 300) {
                switch (type) {
                    case 'secteur':
                        setReponseSecteur(prev => prev.filter(secteur => secteur.valeur_id !== valeur_id));
                        break;
                    case 'objectif':
                        setReponseObjectif(prev => prev.filter(objectif => objectif.valeur_id !== valeur_id));
                        break;
                    case 'categorie':
                        setReponseCategorie(prev => prev.filter(categorie => categorie.valeur_id !== valeur_id));
                        break;
                    case 'source':
                        setReponseSource(prev => prev.filter(source => source.valeur_id !== valeur_id));
                        break;
                    default:
                        break;
                }
            }

        } catch (error) {
            console.error("Error during deletion:", error);
        }
    };


    const handleSubmit = async () => {

        const formData = {
            date_creation,
            secteurs: reponseSecteur.map((secteur) => secteur.valeur_id),
            objectifs: reponseObjectif.map((objectif) => objectif.valeur_id),
            categories: reponseCategorie.map((categorie) => categorie.valeur_id),
            sources: reponseSource.map((source) => source.valeur_id),
        };

        try {
            setLoading(true)
            console.log('data 2:', JSON.stringify(formData, null, 4))
            const response = await axiosClient.put(`/fiche05/${fiche.id}/update?cin=${cin}`, formData);

            if (response.data && response.data.message) {
                setMessage(response.data.message);
                console.log(response.data.fiche);
                navigate('/BDC/fiche06');
            } else {
                setMessage("Une erreur est survenue. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Erreur lors de la requête : ", error);
            setMessage("Une erreur est survenue lors de l'envoi des données. Veuillez réessayer.");
        }
    };
    function openPopup() {
        setIsOpen(true)
    }
    function closePopup() {
        setIsOpen(false)
    }


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

    const isRtl = language === 'AR';
    const directionClass = isRtl ? 'rtl' : 'ltr';
    const alignmentClass = isRtl ? 'text-right' : 'text-left';

    return (
        <div className=" px-6 py-6">

            <SubHeaderComponent
                alignmentClass={alignmentClass}
                color='text-black'
                date={date}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title={getTraduction('Fiche d’information', {
                    FR: 'Fiche d\'information',
                    AR: 'استمارة المعلومات',
                    EN: 'Information Sheet'
                })} />


            <form onSubmit={(e) => e.preventDefault()} className='relative'>

                <input type="hidden" name="dateCreation" id="dateCreation" className="mt-1 block w-60 h-12 border-2 rounded-md px-4 focus:ring focus:ring-blue-300" required />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Formation Section */}
                    <div className="w-full bg-gray-light bg-opacity-40  p-6 rounded-2xl">
                        <label className="block font-semibold text-base mb-4">
                            {getTraduction('Formation', { FR: 'Formation', AR: 'تدريب', EN: 'Training' })} :
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                            {parametreFormation.map((formation) => (
                                <div key={formation.id} className=" p-4 rounded-lg shadow-md flex items-center gap-3">
                                    <div className='w-2 h-2 bg-orange rounded-full'></div>
                                    <p className="text-sm font-semibold text-black">{getTraduction(formation.uuid, formation)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Secteur Section */}
                    <div className="w-full bg-gray-light bg-opacity-40  p-6 rounded-2xl">
                        <label className="font-semibold text-base mb-4">
                            {getTraduction('Les principaux secteurs d\'activité', {
                                FR: 'Les principaux secteurs d\'activité',
                                AR: 'القطاعات الرئيسية',
                                EN: 'The main sectors of activity'
                            })}
                        </label>
                        <div className="mt-4">
                            <select
                                value={selectedSecteur || ""}
                                onChange={handleSelectSecteur}
                                className="w-full h-auto p-2 border font-normal text-sm rounded block my-2 border-gray-dark focus:border"
                            >
                                <option value="">Sélectionner un secteur</option>
                                {parametreSecteur.map((secteur) => (
                                    <option key={secteur.valeur_id} value={secteur.valeur_id}>
                                        {getTraduction(secteur.uuid, secteur)}
                                    </option>
                                ))}
                            </select>
                            <div className="flex flex-wrap mt-4">
                                {reponseSecteur.map((secteur) => (
                                    <div key={secteur.id} className="px-1 py-1 rounded-lg shadow-md flex justify-between items-center mr-2 mb-2">
                                        <div className='flex items-center gap-3 px-4 '>
                                            <div className='w-2 h-2 bg-magenta rounded-full'></div>
                                            <p className="w-full text-sm font-semibold text-black">{getTraduction(secteur.uuid, secteur)}</p>
                                        </div>

                                        <div className="relative group flex w-auto">
                                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                Supprimer
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => handleDelete(e, secteur?.valeur_id, 'secteur')}
                                                className="font-semibold text-magenta bg-transparent p-2 hover:text-gray-dark transition duration-300"
                                            >
                                                <TiDeleteOutline size={25} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Catégorie Section */}
                    <div className="w-full bg-gray-light bg-opacity-40  p-6 rounded-2xl">
                        <label className="block font-semibold text-base mb-4">
                            {getTraduction('Catégorie professionnelle', { FR: 'Catégorie professionnelle', AR: 'الفئة المهنية', EN: 'Professional category' })}
                        </label>
                        <div className="mt-4">
                            <select
                                value={selectedCategorie}
                                onChange={handleSelectCategorie}
                                className="w-full h-auto p-2 border font-normal text-sm rounded my-2 border-gray-dark focus:border"
                            >
                                <option value="">Sélectionner une catégorie</option>
                                {parametreCategorie.map((categorie) => (
                                    <option key={categorie.valeur_id} value={categorie.valeur_id}>
                                        {getTraduction(categorie.uuid, categorie)}
                                    </option>
                                ))}
                            </select>
                            <div className="flex flex-wrap mt-4">
                                {reponseCategorie.map((categorie) => (
                                    <div key={categorie.id} className=" px-4 py-1 rounded-lg shadow-md flex justify-between items-center mr-2 mb-2">
                                        <div className='flex items-center gap-3 px-4 '>
                                            <div className='w-2 h-2 bg-magenta rounded-full'></div>
                                            <p className="text-sm font-semibold text-black">{getTraduction(categorie.uuid, categorie)}</p>
                                        </div>
                                        <div className="relative group flex w-auto">
                                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                Supprimer
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => handleDelete(e, categorie?.valeur_id, 'categorie')}
                                                className="font-semibold text-magenta bg-transparent p-2 hover:text-gray-dark transition duration-300"
                                            >
                                                <TiDeleteOutline size={25} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Objectif Section */}
                    <div className="w-full bg-gray-light bg-opacity-40  p-6 rounded-2xl">
                        <label className="block font-semibold text-base mb-4">
                            {getTraduction('Objectif', { FR: 'Objectif', AR: 'هدف', EN: 'Objective' })}
                        </label>
                        <div className="mt-4">
                            <select
                                value={selectedObjectif}
                                onChange={handleSelectObjectif}
                                className="w-full h-auto p-2 border font-normal text-sm rounded my-2 border-gray-dark focus:border"
                            >
                                <option value="">Sélectionner un objectif</option>
                                {parametreObjectif.map((objective) => (
                                    <option key={objective.valeur_id} value={objective.valeur_id}>
                                        {getTraduction(objective.uuid, objective)}
                                    </option>
                                ))}
                            </select>
                            <div className="flex flex-wrap mt-4">
                                {reponseObjectif.map((objectif) => (
                                    <div key={objectif.id} className=" px-4 py-1 rounded-lg shadow-md flex justify-between items-center mr-2 mb-2">
                                        <div className='flex items-center gap-3 px-4 '>
                                            <div className='w-2 h-2 bg-magenta rounded-full'></div>
                                            <p className="text-sm font-semibold text-black">{getTraduction(objectif.uuid, objectif)}</p>
                                        </div>
                                        <div className="relative group flex w-auto">
                                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                Supprimer
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => handleDelete(e, objectif?.valeur_id, 'objectif')}
                                                className="font-semibold text-magenta bg-transparent p-2 hover:text-gray-dark transition duration-300"
                                            >
                                                <TiDeleteOutline size={25} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Source Section */}
                    <div className="w-full bg-gray-light bg-opacity-40  p-6 rounded-2xl">
                        <label className="block font-semibold text-base mb-4">
                            {getTraduction('Source d\'information', { FR: 'Source d\'information', AR: 'مصدر المعلومات', EN: 'Source of information' })}
                        </label>
                        <div className="mt-4">
                            <select
                                value={selectedSource}
                                onChange={handleSelectSource}
                                className="w-full h-auto p-2  border border-gray-dark focus:border font-normal text-sm rounded my-2"
                            >
                                <option value="">Sélectionner une source</option>
                                {parametreSource.map((source) => (
                                    <option key={source.valeur_id} value={source.valeur_id}>
                                        {getTraduction(source.uuid, source)}
                                    </option>
                                ))}
                            </select>
                            <div className="flex flex-wrap mt-4">
                                {reponseSource.map((source) => (
                                    <div key={source.id} className="px-4 py-1 rounded-lg shadow-md flex justify-between items-center mr-2 mb-2">
                                        <div className='flex items-center gap-3 px-4 '>
                                            <div className='w-2 h-2 bg-magenta rounded-full'></div>
                                            <p className="text-sm font-semibold text-black">{getTraduction(source.uuid, source)}</p>
                                        </div>
                                        <div className="relative group flex w-auto">
                                            <div className="absolute -left-2 transform -translate-x-full top-1/2 -translate-y-1/2 hidden group-hover:block bg-black text-white text-sm py-1 px-3 rounded-md shadow-lg">
                                                Supprimer
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => handleDelete(e, source?.valeur_id, 'source')}
                                                className="font-semibold text-magenta bg-transparent p-2 hover:text-gray-dark transition duration-300"
                                            >
                                                <TiDeleteOutline size={25} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {message && <div className="mt-4 text-center text-sm text-red-600">{message}</div>}

                <ButtonComponent type="button" color={`bg-magenta`} onClick={openPopup}>
                    {getTraduction(`modifier`, { FR: `Enregistrer`, AR: `حفظ`, EN: `Save` })}
                </ButtonComponent>
            </form >
            <ResponseOutput
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                closePopup={() => setIsOpen(false)}
                title={getTraduction('Fiche d’information', {
                    FR: 'Fiche d\'information',
                    AR: 'استمارة المعلومات',
                    EN: 'Information Sheet'
                })}
                // message="Voulez-vous sauvegarder les modifications effectuées ?"
                buttonVName="Oui"
                buttonCName="Non"
            />
        </div >
    );
}






