import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BeneficierContext } from "./BeneficierContext";

const TokenContext = createContext()

const TokenProvider = ({ children }) => {
    const { beneficier, fetchBeneficiaireData } = useContext(BeneficierContext)

    const [token, setToken] = useState('')
    const [cin, setCin] = useState('')
    const [nomAgent, setNomAgent] = useState('')
    const [role, setRole] = useState('')

    async function generateToken(cintest, nomtest) {
        try {
            if (!cintest) {
                console.error("Erreur : CIN est requis pour générer un token.");
                return;
            }

            const response = await axios.get(`http://localhost:8001/token`, {
                params: {
                    cin: cintest,
                    nomAgent: nomtest
                }
            });

            setToken(response.data.token);
            setCin(response.data.cin);
            setNomAgent(response.data.nomAgent);
            setRole(response.data.role);

            localStorage.setItem("cin", response.data.cin);
            localStorage.setItem("nomAgent", response.data.nomAgent || '');
            localStorage.setItem("role", response.data.role);

        } catch (error) {
            console.error("Erreur lors de la génération du token :", error.response?.data || error.message);
        }
    }

    function removeToken() {
        sessionStorage.removeItem('token');
        localStorage.removeItem('cin');
        localStorage.removeItem('nomAgent');
        localStorage.removeItem('role');

        setToken('');
        setCin('');
        setNomAgent('');
        setRole('');
    }

    function getToken() {
        const storedToken = sessionStorage.getItem('token');
        const storedCin = localStorage.getItem('cin');
        const storedNomAgent = localStorage.getItem('nomAgent');
        const storedRole = localStorage.getItem('role');

        if (storedToken) setToken(storedToken);
        if (storedCin) setCin(storedCin);
        if (storedNomAgent) setNomAgent(storedNomAgent);
        if (storedRole) setRole(storedRole);
    }

    useEffect(() => {
        getToken();
        fetchBeneficiaireData();
    }, []);

    useEffect(() => {
        fetchBeneficiaireData();
    }, [beneficier?.cin])


    const tokenValue = {
        token,
        cin,
        nomAgent,
        role,
        generateToken,
        removeToken,
        getToken
    }
    return (
        <TokenContext.Provider value={tokenValue}>
            {children}
        </TokenContext.Provider>
    )
}

export { TokenContext, TokenProvider }
