import React from 'react';

const ButtonComponent = ({ children, type, color, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`fixed w-auto h-auto px-7 py-2 right-5 bottom-2 rounded-md ${color} font-semibold hover:bg-gray-dark text-white hover:text-black transition-colors duration-300 z-30`}
        >
            {children}
        </button>
    );
};

export default ButtonComponent;
