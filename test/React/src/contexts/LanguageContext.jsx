import { createContext, useEffect, useState } from "react";



const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {

    const [language, setLanguage] = useState("FR");
    const loadLanguage = (lang) => {
        setLanguage(lang);
    };
    useEffect(() => {
        loadLanguage("FR");
    }, []);

    const getTraduction = (uuid, question) => {
        if (question && question[language]) {
            return question[language];
        }
        return question ? question.FR : uuid;
    };

    const languageContextValue = {
        loadLanguage,
        language,
        getTraduction
    };

    return (
        <LanguageContext.Provider value={languageContextValue}>
            {children}
        </LanguageContext.Provider>
    );
}

export { LanguageContext, LanguageProvider }