import React from 'react'
import ReactDOM from 'react-dom';
import { FreeButton } from './FreeButton';


export const ErrorMessage = ({ isOpen, closePopup, message, buttonVName }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex bg-black bg-opacity-50 items-start justify-center z-50">
            <div
                className="w-1/2 h-48 rounded-md bg-white border-magenta border-2 py-6 px-6 shadow-xl max-w-lg mt-12 transition-transform transform duration-500"
                style={{
                    transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
                    transition: 'transform 0.5s ease-out'
                }}
            >
                <h2 className="font-normal text-black text-base my-8 ml-8">- {message}</h2>
                <div className={buttonCName ? 'flex items-center justify-between gap-5 absolute bottom-5 right-5' : 'absolute bottom-5 text-right'}>

                    <FreeButton
                        onClick={closePopup}
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


