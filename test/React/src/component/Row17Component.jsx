import React, { useContext, useEffect } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'

export const Row17Component = ({ question, interets, note, setNote, color = 'bg-gray-light' }) => {
    const { language, getTraduction } = useContext(LanguageContext)
    const defaultNote = interets && interets.length > 0 ? interets[0].valeur_id : '';

    useEffect(() => {
        if (!note && defaultNote) {
            setNote(defaultNote);
        }
    }, [note, defaultNote, setNote]);

    return (
        <tr>
            <th className="border-y w-full border-x border-magenta text-left border-blue-gray-100 p-2 transition-colors hover:bg-blue-gray-50">
                <p className="font-medium text-sm text-black  flex items-center justify-start gap-2 leading-relaxed">
                    {getTraduction(question?.valeur_id, question)}
                </p>
            </th>

            <th className="border-y w-full  border-x border-magenta border-blue-gray-100  transition-colors hover:bg-blue-gray-50">
                <div className="flex justify-center items-center mx-3 my-2">
                    <select
                        className={`py-1 px-2 w-96 h-9 text-center font-normal text-sm ${color} rounded-lg border border-gray-dark focus:border-black`}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    >
                        {interets && interets.length > 0 && (
                            interets.map((interet) => (
                                <option key={interet.uuid} value={interet.valeur_id}>
                                    {getTraduction(interet?.uuid, interet)}
                                </option>
                            ))
                        )}
                    </select>
                </div>
            </th>
        </tr >
    )
}


