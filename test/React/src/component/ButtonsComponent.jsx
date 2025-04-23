import React from 'react'

export const ButtonsComponent = ({ type, onClick1, onClick2, titleButton1, titleButton2, color1, color2 }) => {
    return (
        <div className="fixed bottom-2 right-5 space-x-5">
            <button
                type={type}
                onClick={onClick1}
                className={`w-auto h-auto px-7 py-2 rounded-md ${color1} font-semibold hover:bg-gray-dark text-white hover:text-black transition-colors duration-300 z-30`}
            >
                {titleButton1}
            </button>
            <button
                type={type}
                onClick={onClick2}
                className={`w-auto h-auto px-7 py-2 rounded-md ${color2} font-semibold hover:bg-gray-dark text-white hover:text-black transition-colors duration-300 z-30`}
            >
                {titleButton2}
            </button>
        </div>
    )
}
