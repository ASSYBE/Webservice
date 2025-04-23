import React, { useState } from 'react'
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa6'

const SubHeaderComponent = ({ title, color, labeldate, labelname, firstName, lastName, date, alignmentClass, content }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div>
            <div className={`flex items-center justify-between mb-10 ${color}`}>
                <div className='flex items-center '>
                    <h2 className={`text-lg font-bold ${alignmentClass}`}>{title}</h2>
                    {content && (<div
                        className="ml-10 "
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {isHovered ? (
                            <div className='flex items-center relative'>
                                <div className='text-orange'>
                                    <FaLightbulb size={25} />
                                </div>
                                <div className="w-96 h-auto bg-magentaLight absolute top-2 left-3 shadow-md shadow-magenta z-10 rounded-lg text-white ml-3">
                                    <div className=" p-4">
                                        <span className="text-xs font-medium" dangerouslySetInnerHTML={{ __html: content }}></span>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <div className='text-magenta'>
                                <FaRegLightbulb size={25} />
                            </div>

                        )}
                    </div>)}
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-bold "> {labeldate} : <span className='font-semibold'>{date.toISOString().split('T')[0]}</span></label>
                    <input type="hidden" name="dateCreation" id="dateCreation" className="mt-1 block w-60 h-12 border-2 rounded-md px-4 focus:ring focus:ring-blue-300" required />
                </div>

                {/* <div className="flex items-center">
                    <label className="text-sm font-bold mr-3">{labelname} :</label>
                    <p className="font-semibold text-gray-700">{lastName} {firstName}</p>
                </div> */}
            </div>
        </div>
    )
}

export default SubHeaderComponent