import React, { StrictMode, useContext, useEffect, useState } from 'react'
import HeaderComponent from '../component/HeaderComponent'
import SidebarComponent from '../component/SidebarComponent'
import { Outlet, useNavigate } from 'react-router-dom'
import FooterComponent from '../component/FooterComponent'
import { BdcContext } from '../contexts/BdcContext'
import { BeneficierContext } from '../contexts/BeneficierContext'
import { TokenContext } from '../contexts/TokenContext'
import { ThreeDots } from 'react-loader-spinner'
import { NotFound } from './NotFound'

function BDCPage() {
    const { beneficier } = useContext(BeneficierContext)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const { token, cin, getToken } = useContext(TokenContext)


    useEffect(() => {

        if (cin) {
            setLoading(false)
        }

        console.log("cin bdc : ", cin)

        if (!beneficier) {
            alert("Pas de bénéficiaire !");
            navigate("/BDC/fiche03");
        }
    }, [beneficier]);


    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen bg-gray-light">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#92348E"
                        radius="9"
                        ariaLabel="three-dots-loading"
                    />
                    <span className="text-lg text-gray-middle">Chargement des données...</span>
                </div>
            </div>
        );
    }


    return (
        <div>{(token && cin) ?
            <StrictMode>
                <FooterComponent />
                <SidebarComponent />
                <HeaderComponent />
                <div className='ml-80 h-[89vh]'>
                    <Outlet />
                </div>
            </StrictMode> : <NotFound />
        }

        </div>
    )
}

export default BDCPage
