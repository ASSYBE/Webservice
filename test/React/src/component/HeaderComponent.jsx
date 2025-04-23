import React, { useContext, useEffect, useState } from 'react'
import SidebarComponent from './SidebarComponent'
import { Link, useNavigate } from 'react-router-dom'
import { LanguageContext } from '../contexts/LanguageContext';
import axiosClient from '../api/axios-client';
import { BsPersonFillAdd, BsPersonFillCheck, BsPersonFillExclamation } from "react-icons/bs";
import { BeneficierContext } from '../contexts/BeneficierContext';
import { removeBeneficiaireData } from '../utils/beneficiaireStorage';
import { BdcContext } from '../contexts/BdcContext';
import { TokenContext } from '../contexts/TokenContext';
import axios from 'axios';


function HeaderComponent() {

    const { language, loadLanguage } = useContext(LanguageContext);
    const { beneficier, getBeneficier, fetchBeneficiaireData, removeBeneficier } = useContext(BeneficierContext)
    const { bilanDC, getBdc, type, types } = useContext(BdcContext)
    const { token, cin, nomAgent, role, removeToken } = useContext(TokenContext)
    const navigate = useNavigate()

    const handleChangeLanguage = (lang) => {
        loadLanguage(lang);
    };
    const getTraduction = (uuid, question) => {
        if (question && question[language]) {
            return question[language];
        }
        return question ? question.FR : uuid;
    };

    useEffect(() => {
        getBdc();
        fetchBeneficiaireData()
    }, [cin]);

    async function logout() {
        const response = await axiosClient.post('/logout');
        removeToken()
        removeBeneficiaireData()
        removeBeneficier()
        console.log('message :', response.data.message)
        navigate(`/?cin=${cin}`);
        window.location.href = `/?cin=${cin}`;

    }

    function Login() {
        fetchBeneficiaireData()
        navigate('/BDC')
    }

    return (
        <div>
            <div className="w-full relative top-0 left-0 h-14 px-10 py-2 bg-magenta shadow-lg">

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">ANAPEC</h2>
                    <ul className="flex items-center space-x-4">
                        <li className="px-4 py-2 rounded-md text-center text-white hover:bg-gray-light hover:text-black transition duration-300 cursor-pointer">
                            <Link to={`/BDC?cin=${cin}&token=${token}`} >{getTraduction("accueil", { FR: "Accueil", AR: "الصفحة الرئيسية", EN: "Home" })}
                            </Link></li>
                        <li className="px-4 py-2 rounded-md text-center text-white hover:bg-gray-light hover:text-black transition duration-300 cursor-pointer">
                            <Link to="/BDC/fiche06" >{getTraduction("agenda", { FR: "Agenda", AR: "الأجندة", EN: "Agenda" })}</Link>
                        </li>
                        {/* <li className="px-4 py-2 rounded-md text-center text-white hover:bg-gray-light hover:text-black transition duration-300 cursor-pointer">
                            <Link to="/notification">{getTraduction("notification", { FR: "Notification", AR: "الإشعارات", EN: "Notifications" })}</Link></li> */}
                        {!(cin) ? <li className="px-4 py-2 rounded-md text-center text-white hover:bg-gray-light hover:text-black transition duration-300 cursor-pointer">
                            <button type='button' onClick={Login}>{getTraduction("seConnecter", { FR: "Se connecter", AR: "تسجيل الخروج", EN: "Login" })}</button>
                        </li> :
                            <li className="px-4 py-2 rounded-md text-center text-white hover:bg-gray-light hover:text-black transition duration-300 cursor-pointer">
                                <button type='button' onClick={logout}>{getTraduction("deconnexion", { FR: "Se deconnecter", AR: "تسجيل الخروج", EN: "Logout" })}</button>
                            </li>}
                        <li className="relative group">
                            <Link to="/" className="flex items-center space-x-2">
                                {types && types.find((t) => t?.valeur_id === type)?.FR === "adultes qualifiés" && (
                                    <BsPersonFillCheck size={30} color="white" />
                                )}
                                {types && types.find((t) => t?.valeur_id === type)?.FR === "Jeunes" && (
                                    <BsPersonFillExclamation size={30} color="white" />
                                )}
                                {types && types.find((t) => t?.valeur_id === type)?.FR === "Adultes peu qualifiés" && (
                                    <BsPersonFillAdd size={30} color="white" />
                                )}
                            </Link>
                            {(cin) && <h2 className="absolute right-0 w-60 px-3 py-2 border-2 border-gray-middle shadow-md font-semibold bg-gray-light text-black rounded-md top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                                {beneficier?.prenom}  {beneficier?.nom} <br />
                                {types && types.find((t) => t?.valeur_id === type)?.FR}
                            </h2>}
                        </li>
                        <li className="px-4">
                            <select
                                name='language'
                                id="language"
                                className="w-full px-4 py-1 bg-white rounded-md"
                                value={language}
                                onChange={(e) => handleChangeLanguage(e.target.value)}
                                aria-label="Select Language"
                            >
                                <option selected value="FR" data-image="images/fr.png">FR</option>
                                <option value="EN" data-image="images/en.png">EN</option>
                                <option value="AR" data-image="images/ar.png">AR</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default HeaderComponent