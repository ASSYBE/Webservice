import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import { IoMdCloseCircle } from 'react-icons/io';
import { FreeButton } from '../../../component/FreeButton';

export const CapaciteOperationnelList = ({ isOpen, onClose, parametreCapacite, setCapacite, capacite }) => {
    if (!isOpen) return null;

    const handleCheckboxChange = (e, capa) => {
        if (e.target.checked) {
            setCapacite(prev => {
                if (!prev.find(item => item.liste_id === capa.id)) {
                    return [...prev, { liste_id: capa.id, capacite_operationnelles: capa.capacite, cod: capa.cod }];
                }
                return prev;
            });
        } else {
            setCapacite(prev => prev.filter(item => item.liste_id !== capa.id));
        }
    };

    useEffect(() => {
        console.log("capacite :", JSON.stringify(parametreCapacite, null, 3))
        console.log("capacite :", JSON.stringify(capacite, null, 3))
    }, [capacite])

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white shadow-xl w-1/2 h-2/3 pt-6 pb-20 rounded-lg px-6">
                <div className='h-full bg-white overflow-x-auto'>
                    {/* <button
                    onClick={onClose}
                    className="text-magenta px-4 py-2 absolute right-0 top-0 hover:text-gray-dark transition duration-300"
                >
                    <IoMdCloseCircle size={25} />
                </button> */}

                    <h2 className="text-lg font-semibold mb-4">Sélectionner les capacites opérationnelles</h2>

                    <div className="space-y-2 grid grid-cols-3">
                        {parametreCapacite && parametreCapacite.length > 0 ? (
                            parametreCapacite.map((capa, index) => (
                                <div key={capa.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`capacite-${capa.id}`}
                                        checked={capacite.some(item => item.liste_id === capa.id)}
                                        onChange={(e) => handleCheckboxChange(e, capa)}
                                        className="mr-2"
                                    />
                                    <div className='w-full grid grid-cols-2'>
                                        <label htmlFor={`capacite-${index}`} className="text-base">{capa.capacite}</label>
                                        <label htmlFor={`capacite-${index}`} className="text-base">{capa.cod}</label>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Aucun capacite disponible</p>
                        )}
                    </div>
                </div>
                <FreeButton
                    onClick={onClose}
                    color="bg-magenta absolute bottom-5 right-1/2"
                >
                    Fermer
                </FreeButton>
            </div>


        </div>, document.body
    )
}
