import React, { useContext, useEffect } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'

export const Row16Component = ({ note, setNote, interets, question, color, typeQuestion }) => {
    const { language, getTraduction } = useContext(LanguageContext)
    const defaultNote = interets && interets.length > 0 ? interets[0].valeur_id : '';

    useEffect(() => {
        if (!note && defaultNote) {
            setNote(defaultNote);
        }
    }, [note, defaultNote, setNote]);

    return (
        <tr>
            <th className="border-y border-x border-magenta text-left p-2">
                <div className='w-full'>
                    <p className="font-medium text-sm text-black  flex items-center justify-start gap-2 leading-relaxed">
                        {getTraduction(question?.valeur_id, question)}
                    </p>
                </div>
            </th>

            <th className="border-y border-x border-magenta pt-4">
                <div className='w-full'>
                    <div className="grid grid-cols-5 gap-4">
                        {interets && interets.length > 0 && (
                            interets.map((interet, index) => (
                                <div key={interet.uuid} className={`flex items-center justify-center mb-2 ${interets.length === index + 1 ? "" : 'border-r'} border-magenta`}>
                                    <input
                                        type="radio"
                                        name={`noteQ${question?.valeur_id}`}
                                        value={interet.valeur_id}
                                        checked={note === interet.valeur_id}
                                        onChange={(e) => setNote(e.target.value)}
                                        className={`h-5 w-5 ${color}`}
                                    />
                                    <label className="ml-2 font-normal text-sm">
                                        {getTraduction(interet?.valeur_id, interet)}
                                    </label>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </th>
        </tr >

        // <div class="w-full">
        //             <div class="grid grid-cols-4 gap-4">
        //                 <div class="flex items-center justify-center ml-3 mb-2 border-r border-magenta ">
        //                     <input
        //                         type="radio"
        //                         id="niveau-3"
        //                         checked={competence_Q_niveau === 3}
        //                         onChange={() => setCompetence_Q_niveau(3)}
        //                         class="h-5 w-5 text-blue-500 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 cursor-pointer"
        //                     />
        //                     <label for="niveau-3" class="ml-2 font-normal text-sm text-blue-gray-900 mr-3">Beaucoup</label>
        //                 </div>
        //                 <div class="flex items-center justify-center mb-2 border-r border-magenta">
        //                     <input
        //                         type="radio"
        //                         id="niveau-2"
        //                         checked={competence_Q_niveau === 2}
        //                         onChange={() => setCompetence_Q_niveau(2)}
        //                         class="h-5 w-5 text-yellow-500 border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500 cursor-pointer"
        //                     />
        //                     <label for="niveau-2" class="ml-2 font-normal text-sm text-blue-gray-900">Assez</label>
        //                 </div>
        //                 <div class="flex items-center justify-center mb-2 border-r border-magenta">
        //                     <input
        //                         type="radio"
        //                         id="niveau-1"
        //                         checked={competence_Q_niveau === 1}
        //                         onChange={() => setCompetence_Q_niveau(1)}
        //                         class="h-5 w-5 text-orange-500 border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 cursor-pointer"
        //                     />
        //                     <label for="niveau-1" class="ml-2 font-normal text-sm text-blue-gray-900">Peu</label>
        //                 </div>
        //                 <div class="flex items-center justify-center mb-2">
        //                     <input
        //                         type="radio"
        //                         id="niveau-0"
        //                         checked={competence_Q_niveau === 0}
        //                         onChange={() => setCompetence_Q_niveau(0)}
        //                         class="h-5 w-5 text-red-500 border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 cursor-pointer"
        //                     />
        //                     <label for="niveau-0" class="ml-2 font-normal text-sm text-blue-gray-900">Rien</label>
        //                 </div>
        //             </div>
        //         </div>
    )
}