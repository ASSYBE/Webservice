import React, { useContext, useEffect, useMemo, useState } from 'react';
import axiosClient from '../../../api/axios-client';
import Fiche05ModifScreen from './Fiche05ModifScreen';
import { ThreeDots } from 'react-loader-spinner';
import { BeneficierContext } from '../../../contexts/BeneficierContext';
import useBeneficiaire from '../../../hooks/useBeneficiaire';
import { BdcContext } from '../../../contexts/BdcContext';
import { TokenContext } from '../../../contexts/TokenContext';
import { NotFound } from '../../../screens/NotFound';

export default function Fiche05Screen() {

    const [parametreCategorie, setParametreCategorie] = useState([]);
    const [parametreFormation, setParametreFormation] = useState([])
    const [parametreObjectif, setParametreObjectif] = useState([]);
    const [parametreSecteur, setParametreSecteur] = useState([]);
    const [parametreSource, setParametreSource] = useState([]);
    const [reponseSecteur, setReponseSecteur] = useState([]);
    const [reponseCategorie, setReponseCategorie] = useState([]);
    const [reponseObjectif, setReponseObjectif] = useState([])
    const [reponseSource, setReponseSource] = useState([])
    const [loading, setLoading] = useState(true)
    const { beneficier, getBeneficier } = useContext(BeneficierContext)
    const { getBdc } = useContext(BdcContext)

    const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)

    const [fiche05, setFiche05] = useState(null)


    async function fetchData() {
        try {

            const response = await axiosClient.get(`/fiche05?cin=${cin}`);
            setFiche05(response.data.fiche)
            setParametreCategorie(response.data.parametreCategorie)
            setParametreObjectif(response.data.parametreObjectif)
            setParametreSecteur(response.data.parametreSecteur)
            setParametreSource(response.data.parametreSource)
            setReponseSecteur(response.data.reponseSecteur);
            setReponseCategorie(response.data.reponseCategorie);
            setReponseObjectif(response.data.reponseObjectif)
            setReponseSource(response.data.reponseSource)

            const formationResponse = await axiosClient.get(`/formation`);
            setParametreFormation(formationResponse.data.formation);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching element:", error);
        }
    }


    useEffect(() => {
        getToken()
        const fetchData2 = async () => {
            await fetchData();
            await getBdc()
        }
        fetchData2()
    }, [cin, token]);

    if (!cin || !token) {
        return (
            <NotFound />
        )
    }

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
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <span className="text-lg text-gray-middle">Chargement des données...</span>
                </div>
            </div>
        );
    }


    return (
        <div className='w-full max-h-[100%] overflow-x-auto' >
            {fiche05 && <Fiche05ModifScreen
                fiche={fiche05}
                cin={cin}
                parametreCategorie={parametreCategorie}
                parametreFormation={parametreFormation}
                parametreObjectif={parametreObjectif}
                parametreSecteur={parametreSecteur}
                parametreSource={parametreSource}
                reponseSecteur={reponseSecteur || []}
                reponseCategorie={reponseCategorie || []}
                reponseObjectif={reponseObjectif || []}
                reponseSource={reponseSource || []}
                setReponseSecteur={setReponseSecteur}
                setReponseCategorie={setReponseCategorie}
                setReponseObjectif={setReponseObjectif}
                setReponseSource={setReponseSource}
            />}
        </div>
    );
}
