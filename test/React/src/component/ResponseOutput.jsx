import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FreeButton } from './FreeButton';


export const ResponseOutput = ({ isOpen, closePopup, title, message = "Voulez-vous enregistrer ?", buttonVName, buttonCName, handleSubmit }) => {
    if (!isOpen) return null;

    function onValid() {
        handleSubmit()
        closePopup()
    }

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex bg-black bg-opacity-50 items-start justify-center z-50">
            <div
                className="w-full h-48 rounded-md bg-white border-magenta border-2 py-6 px-6 shadow-xl max-w-xl mt-12 transition-transform transform duration-500"
            >
                <h1 className="font-semibold text-black text-xl mb-4">{title}</h1>
                <h2 className="font-normal text-black text-base ml-8">{message}</h2>
                <div className={buttonCName ? 'flex items-center justify-between gap-5 absolute bottom-5 right-5' : 'absolute bottom-5 text-right'}>

                    {buttonCName ? (
                        <FreeButton
                            onClick={closePopup}
                            color='bg-gray-dark'
                        >
                            {buttonCName}
                        </FreeButton>
                    ) : <div></div>}
                    <FreeButton
                        onClick={onValid}
                        color='bg-magenta'
                    >
                        {buttonVName}
                    </FreeButton>
                </div>
            </div>
        </div >,
        document.body
    );
};


