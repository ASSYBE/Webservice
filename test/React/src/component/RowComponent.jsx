import React, { useContext } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'

export const RowComponent = (
    { title,
        competence_Q_outilspratique,
        competence_Q_niveau,
        competence_Q_situation,
        setCompetence_Q_situation,
        setCompetence_Q_niveau,
        setCompetence_Q_outilspratique, parametre }) => {

    const { language, getTraduction } = useContext(LanguageContext)


    return (
        <tr>
            <td className="cursor-pointer border-y border-x border-magenta pt-2">
                <div className="flex items-center ml-3 mb-3">
                    <div className="flex flex-col">
                        <p className="block antialiased font-semibold text-sm leading-normal">{title}</p>
                    </div>
                </div>
            </td>

            <td className="cursor-pointer border-y border-x border-magenta pt-2">
                <div className="flex items-center justify-center mx-3 mb-2">
                    <input
                        type="text"
                        className="py-2 px-4 w-full h-9 font-normal text-sm bg-gray-light rounded-lg border border-gray-dark focus:border-black"
                        value={competence_Q_outilspratique}
                        onChange={(e) => setCompetence_Q_outilspratique(e.target.value)}
                    />
                </div>
            </td>

            <td className="cursor-pointer border-y border-x border-magenta pt-2">
                <div className="flex items-center justify-center mx-3 mb-2">
                    <input
                        type="text"
                        className="py-2 px-4 w-full h-9 font-normal text-sm bg-gray-light rounded-lg border border-gray-dark focus:border-black"
                        value={competence_Q_situation}
                        onChange={(e) => setCompetence_Q_situation(e.target.value)}
                    />
                </div>
            </td>
            <td className="cursor-pointer border-y border-x border-blue-gray-100 border-magenta pt-2">
                <div className="w-full">
                    <div className="grid grid-cols-4 gap-4 sm:gap-0">
                        {parametre.map((option, index) => (
                            <div key={option.id} className={`flex items-center justify-center sm:flex-wrap mb-2 ${parametre.length === index + 1 ? "" : 'border-r'} border-magenta`}>
                                <input
                                    type="radio"
                                    id={`niveau-${option.id}`}
                                    checked={competence_Q_niveau === option.valeur_id}
                                    onChange={() => setCompetence_Q_niveau(option.valeur_id)}
                                    className={`h-5 w-5 text-black border-gray-300 rounded-full focus:ring-2 cursor-pointer`}
                                />
                                <label htmlFor={`niveau-${option.value}`} className="ml-2 font-normal text-sm text-blue-gray-900">
                                    {getTraduction(option?.uuid, option)}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </td>

        </tr>
    )
}
