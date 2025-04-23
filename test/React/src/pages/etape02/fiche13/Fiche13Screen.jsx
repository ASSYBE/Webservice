import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { LanguageContext } from '../../../contexts/LanguageContext'
import { BeneficierContext } from '../../../contexts/BeneficierContext'
import SubHeaderComponent from '../../../component/SubHeaderComponent'
import { FreeButton } from '../../../component/FreeButton'
import { BdcContext } from '../../../contexts/BdcContext'
import { TokenContext } from '../../../contexts/TokenContext'
import { NotFound } from '../../../screens/NotFound'

export default function Fiche13Screen() {
    const date = new Date()
    const [date_creation, setDate_creation] = useState(date.toISOString().split('T')[0])
    const { language, getTraduction } = useContext(LanguageContext)
    const { beneficier, getBeneficier, type } = useContext(BeneficierContext)
    const { bilanDC, getBdc } = useContext(BdcContext)
    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)


    const location = useLocation()

    const styleActive = 'w-10 h-10 rounded-full bg-magenta flex items-center justify-center text-white font-semibold text-base scale-110 hover:scale-110 transition-all'
    const styleNoActive = 'w-10 h-10 rounded-full bg-gray-light flex items-center justify-center text-black font-semibold text-base hover:scale-110 transition-all'


    useEffect(() => {
        getToken()
        const fetchData2 = async () => {
            await getBdc()
        }
        fetchData2()
    }, [cin, token]);

    if (!cin || !token) {
        return (
            <NotFound />
        )
    }

    return (

        <div className="w-full max-h-[100%] overflow-x-auto px-6 py-6 bg-white">
            <SubHeaderComponent
                // alignmentClass={alignmentClass}
                color='text-black'
                date={date}
                labelname={getTraduction('Nom et prénom', { FR: 'Nom et prénom', AR: 'الاسم واللقب', EN: 'Full Name' })}
                labeldate={getTraduction('DATE', { FR: 'Date', AR: 'تاريخ', EN: 'Date' })}
                title={`Les Compétences`}
                content={`Indiquez les compétences qui vous caractérisent en les choisissant dans le tableau ou en en ajoutant d'autres. Inscrivez dans le tableau les qualités les plus développées et celles que, au contraire, vous ne possédez pas mais que vous aimeriez acquérir.`} />
            <div >
                {/* <FreeButton type="button" color={`bg-magenta mb-4`} >
                    <NavLink to="/BDC/fiche13/acquerir" >
                        les Competences à acquérir
                    </NavLink>
                </FreeButton> */}
                <div className='w-full flex justify-center items-center px-4 space-x-6'>

                    <NavLink
                        to="/BDC/fiche13/competence1"
                        className={(location.pathname === "/BDC/fiche13/competence1" || location.pathname === "/BDC/fiche13") ? styleActive : styleNoActive}
                    >
                        1
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence2"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        2
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence3"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        3
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence4"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        4
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence5"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        5
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence6"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        6
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence7"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        7
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence8"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        8
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence9"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        9
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence10"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        10
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence11"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        11
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence12"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        12
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence13"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        13
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence14"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        14
                    </NavLink>
                    <NavLink
                        to="/BDC/fiche13/competence15"
                        className={({ isActive }) => isActive ? styleActive : styleNoActive}
                    >
                        15
                    </NavLink>
                </div>
            </div>

            <Outlet />
        </div>
    )
}
