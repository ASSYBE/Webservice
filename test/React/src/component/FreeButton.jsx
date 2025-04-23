import React from 'react'

export const FreeButton = ({ children, type, color, onClick, disabled }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={` w-auto h-auto px-2 py-2 rounded-md ${color} hover:bg-gray-dark text-sm font-medium text-white hover:text-black transition-colors duration-300 z-30`}
        >
            {children}
        </button>
    );

}
