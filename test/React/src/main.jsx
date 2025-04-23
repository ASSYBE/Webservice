import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import './output.css'
import { createContext, useEffect, useState } from "react";

import { RouterProvider } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import { BeneficierProvider } from './contexts/BeneficierContext.jsx'
import { BdcProvider } from './contexts/BdcContext.jsx'
import App from './App.jsx'
import { TokenProvider } from './contexts/TokenContext.jsx'
import LoginPage from './Login/LoginPage.jsx'
import './Login/css/style.css'

function MainApp(){
  const [isAuth, setIsAuth] = useState(false)

  return (
    <BeneficierProvider>
    <TokenProvider>
      <LanguageProvider>
        <BdcProvider>
          <App />
        </BdcProvider>
      </LanguageProvider>
    </TokenProvider>
  </BeneficierProvider>
  // <LoginPage />
  ) 

  // return isAuth ? (
  //   <BeneficierProvider>
  //   <TokenProvider>
  //     <LanguageProvider>
  //       <BdcProvider>
  //         <App />
  //       </BdcProvider>
  //     </LanguageProvider>
  //   </TokenProvider>
  // </BeneficierProvider>
  // ) : (
  //   <LoginPage onLogin={() => setIsAuth(true)} />
  // )
}

createRoot(document.getElementById('root')).render(<MainApp />)