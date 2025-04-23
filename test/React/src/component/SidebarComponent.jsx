import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axiosClient from '../api/axios-client';
import { LanguageContext } from '../contexts/LanguageContext';
import { BeneficierContext } from '../contexts/BeneficierContext';
import { BdcContext } from '../contexts/BdcContext';
import { anapecRole, type_jeune } from '../constants/Variables';
import { TokenContext } from '../contexts/TokenContext';

function SidebarComponent() {
  const [activeStep, setActiveStep] = useState(null);
  const [ficheName, setFicheName] = useState([]);
  const [phase, setPhase] = useState([]);


  const { language, getTraduction } = useContext(LanguageContext);
  const { beneficier, getBeneficier } = useContext(BeneficierContext)
  const { bilanDC, getBdc, type, types } = useContext(BdcContext)
  const { token, cin, role, nomAgent, getToken } = useContext(TokenContext)



  const location = useLocation();

  const toggleStepList = (step) => {
    setActiveStep((prevStep) => {
      const newStep = prevStep === step ? null : step;
      localStorage.setItem('activeStep', newStep);
      return newStep;
    });
  };

  const fetchBdc = async () => {
    try {
      const response = await axiosClient.get(`/BDC?cin=${beneficier?.cin}`);
      setFicheName(response.data.ficheName || []);
      setPhase(response.data.phase || [])
    } catch (error) {
      console.error("Error fetching element:", error);
    }
  };


  useEffect(() => {
    if (cin && token) {
      fetchBdc();
      getBdc()
    } else {
      getToken();
    }
    const storedActiveStep = localStorage.getItem('activeStep');
    if (storedActiveStep !== null) {
      setActiveStep(Number(storedActiveStep));
    }

    const fichePaths = [
      '/BDC/fiche09', '/BDC/fiche10', '/BDC/fiche09A', '/BDC/fiche09B',
      '/BDC/fiche11A', '/BDC/fiche12', '/BDC/fiche13', '/BDC/fiche14', '/BDC/fiche15', '/BDC/fiche16',
      '/BDC/fiche17'
    ];

    const fichePaths2 = [
      '/BDC/fiche18', '/BDC/fiche19',
      '/BDC/fiche20', '/BDC/fiche21', '/BDC/fiche22'
    ];

    if (fichePaths.some(path => location.pathname.includes(path))) {
      setActiveStep(2);
    } else if (fichePaths2.some(path => location.pathname.includes(path))) {
      setActiveStep(3);
    } else {
      setActiveStep(1);
    }
  }, [cin, token, location.pathname]);

  const isStepActive = useCallback((step) => activeStep === step, [activeStep]);

  const getStatusEtapeColor = useCallback((status) => {
    switch (status) {
      case 'Initier':
        return 'bg-orange';
      case 'En cours':
        return 'bg-red-normal';
      case 'Terminé':
        return 'bg-green';
      default:
        return 'bg-gray';
    }
  }, []);

  const isLinkMActive = (path) => {
    return location.pathname.startsWith(path);
  };
  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  const getFicheStatusColor = useCallback((ficheStatus) => {
    switch (ficheStatus) {
      case 'Terminé':
        return 'bg-green';
      case 'Initier':
        return 'bg-orange';
      default:
        return 'bg-gray-light';
    }
  }, []);

  return (
    <div className="h-full w-80 overflow-y-auto bg-white shadow-lg flex flex-col absolute top-0 left-0 z-0 pt-20">
      <h1 className="text-2xl font-bold text-left ml-2 mb-4">
        Bilan de compétences
      </h1>

      <div >
        {phase.map((phaseItem, index) => (
          <div key={phaseItem.uuid}>
            <button
              onClick={() => toggleStepList(index + 1)}
              className="hover:bg-gray-light p-4 w-full text-left focus:outline-none flex justify-between items-center"
            >
              <h2 className="text-base font-semibold pb-2">{getTraduction(phaseItem.uuid, phaseItem)}</h2>
              <div>
                <div className={`w-3 h-3 rounded-full ${getStatusEtapeColor(bilanDC?.[`statusEtape0${index + 1}`])}`}></div>
                <svg
                  className={`inline w-4 h-4 transition-transform duration-200 ${isStepActive(index + 1) ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
            </button>
            <ul className={`pl-7 pr-5 space-y-2 mb-2 ${isStepActive(index + 1) ? '' : 'hidden'}`}>
              {index === 0 && ficheName.length > 0 && (
                <>
                  {ficheName[0] && (
                    <li>
                      <Link to="/BDC/fiche03" title={getTraduction(ficheName[0].uuid, ficheName[0])} className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${(isLinkActive('/BDC/fiche03') || isLinkActive('/BDC')) ? 'bg-gray-light text-black' : ''}`}>
                        <h2>{getTraduction(ficheName[0].uuid, ficheName[0])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche03)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[1] && (
                    <li>
                      <Link to="/BDC/fiche04" title={getTraduction(ficheName[1].uuid, ficheName[1])} className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche04') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48'>{getTraduction(ficheName[1].uuid, ficheName[1])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche04)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[2] && (
                    <li >
                      <Link title={getTraduction(ficheName[2].uuid, ficheName[2])} to="/BDC/fiche05" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche05') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 >{getTraduction(ficheName[2].uuid, ficheName[2])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche05)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[3] && (
                    <li>
                      <Link title={getTraduction(ficheName[3].uuid, ficheName[3])} to="/BDC/fiche06" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche06') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[3].uuid, ficheName[3])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche06)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[4] && (
                    <li>
                      <Link title={getTraduction(ficheName[4].uuid, ficheName[4])} to="/BDC/fiche07" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche07') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48'>{getTraduction(ficheName[4].uuid, ficheName[4])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche07)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[5] && (
                    <li>
                      <Link title={getTraduction(ficheName[5].uuid, ficheName[5])} to="/BDC/fiche08" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkMActive('/BDC/fiche08') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48'>{getTraduction(ficheName[5].uuid, ficheName[5])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche08)}`}></div>
                      </Link>
                    </li>
                  )}

                </>
              )}
              {index === 1 && (
                <>
                  {ficheName[6] && (
                    <li>
                      <Link title={getTraduction(ficheName[6].uuid, ficheName[6])} to="/BDC/fiche09" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche09') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[6].uuid, ficheName[6])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche09)}`}></div>
                      </Link>
                    </li>
                  )}
                  {bilanDC?.type_beneficier !== type_jeune && (ficheName[7] && (
                    <li>
                      <Link title={getTraduction(ficheName[7].uuid, ficheName[7])} to="/BDC/fiche10" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkMActive('/BDC/fiche10') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[7].uuid, ficheName[7])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche10)}`}></div>
                      </Link>
                    </li>
                  ))}
                  {bilanDC?.type_beneficier !== type_jeune && (ficheName[8] && (
                    <li>
                      <Link title={getTraduction(ficheName[8].uuid, ficheName[8])} to="/BDC/fiche09A" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche09A') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[8].uuid, ficheName[8])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche9A)}`}></div>
                      </Link>
                    </li>
                  ))}
                  {role == anapecRole || bilanDC?.type_beneficier !== type_jeune && (ficheName[9] && (
                    <li>
                      <Link title={getTraduction(ficheName[9].uuid, ficheName[9])} to="/BDC/fiche09B" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche09B') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[9].uuid, ficheName[9])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche9B)}`}></div>
                      </Link>
                    </li>
                  ))}
                  {bilanDC?.type_beneficier !== type_jeune && (ficheName[10] && (
                    <li>
                      <Link title={getTraduction(ficheName[10].uuid, ficheName[10])} to="/BDC/fiche11A" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche11A') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[10].uuid, ficheName[10])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche11A)}`}></div>
                      </Link>
                    </li>
                  ))}
                  {ficheName[11] && (
                    <li>
                      <Link title={getTraduction(ficheName[11].uuid, ficheName[11])} to="/BDC/fiche12" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche12') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[11].uuid, ficheName[11])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche12)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[12] && (
                    <li>
                      <Link title={getTraduction(ficheName[12].uuid, ficheName[12])} to="/BDC/fiche13" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkMActive('/BDC/fiche13') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[12].uuid, ficheName[12])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche13)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[13] && (
                    <li>
                      <Link title={getTraduction(ficheName[13].uuid, ficheName[13])} to="/BDC/fiche14" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkMActive('/BDC/fiche14') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[13].uuid, ficheName[13])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche14)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[14] && (
                    <li>
                      <Link title={getTraduction(ficheName[14].uuid, ficheName[14])} to="/BDC/fiche15" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkMActive('/BDC/fiche15') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[14].uuid, ficheName[14])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche15)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[15] && (
                    <li>
                      <Link title={getTraduction(ficheName[15].uuid, ficheName[15])} to="/BDC/fiche16" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkMActive('/BDC/fiche16') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[15].uuid, ficheName[15])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche16)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[16] && (
                    <li>
                      <Link title={getTraduction(ficheName[16].uuid, ficheName[16])} to="/BDC/fiche17" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkMActive('/BDC/fiche17') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[16].uuid, ficheName[16])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche17B)}`}></div>
                      </Link>
                    </li>
                  )}
                </>
              )}
              {index === 2 && (
                <>
                  {ficheName[17] && (
                    <li>
                      <Link title={getTraduction(ficheName[17].uuid, ficheName[17])} to="/BDC/fiche18" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche18') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[17].uuid, ficheName[17])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche18)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[18] && (
                    <li>
                      <Link title={getTraduction(ficheName[18].uuid, ficheName[18])} to="/BDC/fiche19" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche19') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[18].uuid, ficheName[18])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche19)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[19] && (
                    <li>
                      <Link title={getTraduction(ficheName[19].uuid, ficheName[19])} to="/BDC/fiche20" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche20') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[19].uuid, ficheName[19])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche20)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[20] && (
                    <li>
                      <Link title={getTraduction(ficheName[20].uuid, ficheName[20])} to="/BDC/fiche21" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche21') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[20].uuid, ficheName[20])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche21)}`}></div>
                      </Link>
                    </li>
                  )}
                  {ficheName[21] && (
                    <li>
                      <Link title={getTraduction(ficheName[21].uuid, ficheName[21])} to="/BDC/fiche22" className={`hover:bg-gray-light rounded-md p-2 transition duration-200 font-sans text-sm cursor-pointer flex justify-between items-center ${isLinkActive('/BDC/fiche22') ? 'bg-gray-light text-black' : ''}`}>
                        <h2 className='truncate w-48' >{getTraduction(ficheName[21].uuid, ficheName[21])}</h2>
                        <div className={`w-2 h-2 rounded-full ${getFicheStatusColor(bilanDC?.statusFiche22)}`}></div>
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarComponent;
