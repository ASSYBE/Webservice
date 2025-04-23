import React from 'react'

export const TableHeader13Component = () => {
    return (
        <thead className='bg-magenta '>
            <tr className='border-2 border-magenta'>
                <th className="border-r border-white p-2">
                    <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none"> Description des compétences
                    </p>
                </th>
                <th className="border-r border-white p-2">
                    <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Avec quels outils vous les avez pratiqués
                    </p>
                </th>
                <th className="border-r border-white p-2">
                    <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Dans quelles situations l’avez-vous expérimenté
                    </p>
                </th>
                <th className=" p-2">
                    <p className="font-sans text-base text-white flex items-center justify-center gap-2 font-semibold leading-none">Niveau de développement
                    </p>

                </th>

            </tr>
        </thead>
    )
}
