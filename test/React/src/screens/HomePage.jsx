import React, { useCallback, useContext, useEffect, useState } from 'react';
import HeaderComponent from '../component/HeaderComponent';
import axiosClient from '../api/axios-client';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import useBeneficiaire from '../hooks/useBeneficiaire';
import { BeneficierContext } from '../contexts/BeneficierContext';
import FooterComponent from '../component/FooterComponent';
import { FreeButton } from '../component/FreeButton';
import { BdcContext } from '../contexts/BdcContext';
import { storeBeneficiaireData } from '../utils/beneficiaireStorage';
import { TokenContext } from '../contexts/TokenContext';
import axios from 'axios';
import { anapecRole } from '../constants/Variables';
import { PageMessage } from './PageMessage';
import { NotFound } from './NotFound';


function statusName(status) {
  if (status === null)
    return 'Initialiser'
  if (status === "Initier" || status === "En cours")
    return 'Continue'
  if (status === "Terminé")
    return 'Visualiser'
}

function statusColor(color) {
  if (color === null)
    return 'bg-magenta'
  if (color === "Initier" || color === "En cours")
    return 'bg-orange'
  if (color === "Terminé")
    return 'bg-green'
}

function HomePage() {
  const date = new Date();
  const [dateCreation, setDateCreation] = useState(date.toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [ficheActuel, setFicheActuel] = useState('');
  const [bdc, setBdc] = useState(null);
  const [typeBeneficier, setTypeBeneficier] = useState("")
  const { cin, token, nomAgent, role, getToken } = useContext(TokenContext)

  const navigate = useNavigate();

  const { beneficier, fetchBeneficiaireData, getBeneficier } = useContext(BeneficierContext)
  const { bilanDC, getBdc, type, types } = useContext(BdcContext)
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search);


  const queryToken = queryParams.get("token");
  const queryCin = queryParams.get("cin");

  const fetchBdc = async () => {
    if (!queryCin) return;

    try {
      const response = await axios.get(`/BDC?cin=${queryCin}`);
      const data = response.data;
      setBdc(data?.bdc)
      setTypeBeneficier(data?.type_beneficier);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  async function saveData(tokenh, cinh) {

    try {
      const response = await axios.get(
        `http://localhost:8001/checkToken?cin=${cinh}&token=${tokenh}`
      );

      console.log("MessageT :", response.data);
      sessionStorage.setItem("token", response.data?.token);
      localStorage.setItem("cin", response.data?.cin);
      localStorage.setItem("role", response.data?.role);
      localStorage.setItem("nomAgent", response.data?.nomAgent || '');

    } catch (error) {
      console.error("Erreurrrrrrr0 :", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await getBdc()
      setTypeBeneficier(type)
      await saveData(queryToken, queryCin);
      await fetchBdc()
      fetchBeneficiaireData();

      await fetchBdc();

    }
    fetchData();

  }, [queryToken, queryCin, type]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = {
      date_creation: dateCreation,
      type_beneficier: typeBeneficier,
      cin: queryCin,
      statusBDC: 'Initier',
    };

    try {

      setLoading(true);
      const response = await axiosClient.post(`/BDC/post`, formData);
      if (response.status === 201) {
        navigate('/BDC/fiche03');
      } else {
        console.error('Error during submission');
      }

    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTypeBeneficier = async (e) => {
    e.preventDefault();
    const formData = { type_beneficier: typeBeneficier };

    try {
      setLoading(true);
      const response = await axiosClient.put(`/BDC/update?cin=${queryCin}`, formData);
      if (response.status === 200) {
        setBdc({ ...bilanDC, type_beneficier: typeBeneficier });
      }
    } catch (error) {
      console.error('Error updating beneficiary type:', error);
    } finally {
      setLoading(false);
    }
  };


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

  if (cin != queryCin || token != queryToken) {
    return (
      <NotFound />
    );
  }

  console.log("role : ", role)
  const isAuthorized = role === anapecRole ||
    (role !== anapecRole && (bilanDC?.statusBDC === 'Initier' || bilanDC?.statusBDC === 'En cours'));

  console.log("role agent : ", role)

  console.log("status bilanDC : ", bilanDC?.statusBDC)
  return (
    isAuthorized ?
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <HeaderComponent />
        <div className="container flex flex-col items-center justify-center px-8 py-12">
          <h1 className="text-4xl font-extrabold mb-6 text-center">Bilan de compétences</h1>
          <h1 className="text-4xl font-extrabold mb-6 text-center">تقييم المهارات</h1>


          <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-xl mb-6">
            <h3 className="text-lg font-bold mb-4">Informations Personnelles</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <p className='text-sm font-semibold'><strong className='text-sm font-normal'>CIN :</strong> {beneficier?.cin}</p>
                <p className='text-sm font-semibold'><strong className='text-sm font-normal'>NOM :</strong> {beneficier?.nom}</p>
                <p className='text-sm font-semibold'><strong className='text-sm font-normal'>PRÉNOM :</strong> {beneficier?.prenom}</p>
                <p className='text-sm font-semibold'><strong className='text-sm font-normal'>Date de naissance :</strong> {beneficier?.date_naissance}</p>
                <p className='text-sm font-semibold'><strong className='text-sm font-normal'>Nationalité :</strong> {beneficier?.nationnalite}</p>
                <p className='text-sm font-semibold'><strong className='text-sm font-normal'>Pays de naissance :</strong> {beneficier?.paysNaissance}</p>
                {beneficier?.motifDeSejour && <p className='text-sm font-semibold'><strong className='text-sm font-normal'>Motif de séjour :</strong> {beneficier?.motifDeSejour}</p>}
              </div>

            </div>
            <h3 className="text-lg font-bold mb-4 mt-6">Informations de Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <p className='text-sm font-semibold'><strong className='text-sm font-normal'>Adresse :</strong> {beneficier?.adresse}</p>
              <p className='text-sm font-semibold'><strong className='text-sm font-normal'>Téléphone :</strong> {beneficier?.telephone}</p>
              <p className='text-sm font-semibold'><strong className='text-sm font-normal'>Email :</strong> {beneficier?.email}</p>
            </div>
          </div>

          <div className="w-full max-w-4xl mb-6 px-4 flex justify-between items-center">

            <p className='text-sm font-semibold'><strong className='text-sm font-normal'>Statut professionnel :</strong> {beneficier?.statusProfessionnel}</p>
            {bilanDC && (
              <form onSubmit={updateTypeBeneficier}>
                <div className="w-full rounded-2xl mb-6 space-y-4">
                  <div className='flex items-center gap-3'>
                    <select
                      id="typeBeneficier"
                      value={typeBeneficier}
                      onChange={(e) => setTypeBeneficier(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-dark text-sm font-base rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="" disabled>Sélectionner...</option>
                      {types && types.map((t) => (
                        <option key={t.valeur_id} value={t.valeur_id} >{t.FR}</option>
                      ))}
                    </select>
                    <FreeButton
                      type="submit"
                      color='bg-magenta'
                      disabled={!types || loading}
                    >
                      {loading ? 'Chargement...' : 'Changer'}
                    </FreeButton>
                  </div>
                </div>
              </form>
            )}
          </div>
          {bilanDC ? (
            <div className="w-full max-w-4xl flex justify-between items-center">
              <div className="w-full bg-gray-light border-2 border-gray-dark p-6 rounded-md shadow-xl mr-2 relative">
                <h3 className="text-base font-semibold mb-4">Phase préliminaire</h3>
                <StatusLine status={bilanDC?.statusEtape01} />
                <Link to='/BDC/fiche03'>
                  <FreeButton color={statusColor(bilanDC?.statusEtape01)}>{statusName(bilanDC?.statusEtape01)}</FreeButton>
                </Link>
              </div>
              <div className="w-full bg-gray-light border-2 border-gray-dark p-6 rounded-md shadow-xl mr-2 relative">
                <h3 className="text-base font-semibold mb-4">Phase d'investigation</h3>
                <StatusLine status={bilanDC?.statusEtape02} />
                <Link to="/BDC/fiche09">
                  <FreeButton color={statusColor(bilanDC?.statusEtape02)}>{statusName(bilanDC?.statusEtape02)}</FreeButton>
                </Link>
              </div>
              <div className="w-full bg-gray-light border-2 border-gray-dark p-6 rounded-md shadow-xl  relative">
                <h3 className="text-base font-semibold mb-4">Phase finale</h3>
                <StatusLine status={bilanDC?.statusEtape03} />
                <Link to='/BDC/fiche18'>
                  <FreeButton color={statusColor(bilanDC?.statusEtape03)}>{statusName(bilanDC?.statusEtape03)}</FreeButton>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-xl mb-6">
                <h3 className="text-2xl font-semibold mb-4">Sélectionner le Type de Bénéficiaire</h3>
                <div className="space-y-4">
                  <label htmlFor="typeBeneficier" className="block text-sm font-medium">Choisissez le type de bénéficiaire :</label>
                  <select
                    id="typeBeneficier"
                    value={typeBeneficier}
                    onChange={(e) => setTypeBeneficier(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Sélectionner...</option>
                    {types && types.map((t) => (
                      <option key={t.valeur_id} value={t.valeur_id} >{t.FR}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full text-center">
                <button
                  type="submit"
                  className="px-8 py-4 bg-gray-dark hover:bg-magenta font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                  disabled={!types || loading}
                >
                  {loading ? 'Chargement...' : 'Commencer le Bilan de Compétence'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div> :
      <PageMessage />
  );
}


const StatusLine = ({ status = '' }) => {
  return (
    <div>{
      status === 'Initier' &&
      <div className={`w-full h-2 bg-orange rounded-t-md absolute top-0 left-0`}></div>
    }
      {
        status === 'En cours' &&
        <div className={`w-full h-2 bg-orange rounded-t-md absolute top-0 left-0`}></div>
      }
      {
        status === 'Terminé' &&
        <div className={`w-full h-2 bg-green rounded-t-md absolute top-0 left-0`}></div>
      }
      {
        status === null &&
        <div className={`w-full h-2 bg-gray-dark rounded-t-md absolute top-0 left-0`}></div>
      }

    </div>
  )
}
export default HomePage;
