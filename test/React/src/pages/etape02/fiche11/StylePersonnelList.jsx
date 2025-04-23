import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { IoMdCloseCircle } from 'react-icons/io';
import { FreeButton } from '../../../component/FreeButton';


export const StylePersonnelList = ({ isOpen, onClose, parametreStyle, setStyle, style }) => {

    // const [selectedStyles, setSelectedStyles] = useState([]);

    if (!isOpen) return null;

    const handleCheckboxChange = (e, sty) => {
        if (e.target.checked) {
            setStyle(prev => {
                if (!prev.find(item => item.liste_id === sty.id)) {
                    return [...prev, { liste_id: sty.id, style_personnel: sty.style, cod: sty.cod }];
                }
                return prev;
            });
        } else {
            setStyle(prev => prev.filter(item => item.liste_id !== sty.id));
        }
    };

    useEffect(() => {
        console.log("style :", JSON.stringify(style, null, 3))
    }, [style])

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

                    <h2 className="text-lg font-semibold mb-4">Sélectionner les styles personnels</h2>

                    <div className="space-y-2 grid grid-cols-3">
                        {parametreStyle && parametreStyle.length > 0 ? (
                            parametreStyle.map((sty, index) => (
                                <div key={sty.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`style-${index}`}
                                        checked={style.some(item => item.liste_id === sty.id)}
                                        onChange={(e) => handleCheckboxChange(e, sty)}
                                        className="mr-2"
                                    />
                                    <div className='w-full grid grid-cols-2'>
                                        <label htmlFor={`style-${index}`} className="text-base">{sty.style}</label>
                                        <label htmlFor={`style-${index}`} className="text-base">{sty.cod}</label>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Aucun style disponible</p>
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
