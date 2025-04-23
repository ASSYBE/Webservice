import React from 'react'

export const PageMessage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-light px-4 text-center">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-black mb-2">Vous avez pas le droit d'initier le Bilan de compétence</h1>
                <p className="text-black mb-6">Veuillez contacter votre agent ANAPEC</p>
            </div>
        </div>
    )
}
