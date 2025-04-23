import React from 'react'

export const FreeIconButton = ({ children, type, color, onClick, hover }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={` h-auto px-0 py-0 rounded-md font-semibold hover:${hover ? hover : 'bg-gray-dark'} hover:text-black transition-colors duration-300 z-30 ${color} `}
        >
            {children}
        </button>
    );

}
