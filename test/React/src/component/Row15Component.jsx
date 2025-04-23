import React, { useContext } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'

export const Row15Component = ({ question, typeQuestion, importance, note, setNote, color }) => {
    const { language, getTraduction } = useContext(LanguageContext)


    return (
        <tr>
            <th className="border-y w-1/4 border-x border-magenta text-left p-2">
                <p className="font-medium text-sm text-black  flex items-center justify-start gap-2 leading-relaxed">
                    {getTraduction(typeQuestion?.valeur_id, typeQuestion)}
                </p>
            </th>
            <th className="border-y w-1/2 border-x border-magenta text-left p-2">
                <p className="font-medium text-sm text-black  flex items-center justify-start leading-relaxed">
                    {getTraduction(question?.valeur_id, question)}
                </p>
            </th>

            <th className="border-y w-1/2 pr-2 border-x border-magenta pt-2 transition-colors">
                <div className="flex justify-center items-center ml-3 mb-2">
                    <select
                        className={`py-1 px-4 w-96 h-9 font-normal text-sm text-center ${color} rounded-lg border border-gray-dark focus:border-black`}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    >
                        {importance && importance.length > 0 && (
                            importance.map((importance) => (
                                <option key={importance.uuid} value={importance.valeur_id}>
                                    {getTraduction(importance?.uuid, importance)}
                                </option>
                            ))
                        )}
                    </select>
                </div>
            </th>
        </tr >
    )
}
