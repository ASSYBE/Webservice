import React from 'react'

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-light px-4 text-center">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-black mb-2">Page non trouvée</h1>
                <p className="text-black mb-6">Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>
            </div>
        </div>
    )
}

