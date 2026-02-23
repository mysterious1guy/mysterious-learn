import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
    fr: {
        welcome: "Bienvenue sur Mysterious Classroom",
        dashboard: "Tableau de bord",
        account: "Mon Compte",
        courses: "Mes Cours",
        admin: "Admin",
        monitor: "Moniteur",
        logout: "Déconnexion",
        projects: "Projets",
        leaderboard: "Classement",
        onboarding: {
            title: "Personnalise ton espace",
            theme: "Thème",
            dark: "Sombre",
            light: "Clair",
            language: "Langue du contenu",
            sound: "Effets Sonores (CyberPet)",
            active: "Activé",
            mute: "Muet",
            next: "Suivant",
            back: "Retour",
            start: "Commencer"
        }
    },
    en: {
        welcome: "Welcome to Mysterious Classroom",
        dashboard: "Dashboard",
        account: "Account",
        courses: "My Courses",
        admin: "Admin",
        monitor: "Monitor",
        logout: "Logout",
        projects: "Projects",
        leaderboard: "Leaderboard",
        onboarding: {
            title: "Personalize your space",
            theme: "Theme",
            dark: "Dark",
            light: "Light",
            language: "Content Language",
            sound: "Sound Effects (CyberPet)",
            active: "Enabled",
            mute: "Muted",
            next: "Next",
            back: "Back",
            start: "Get Started"
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'fr';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key) => {
        const keys = key.split('.');
        let result = translations[language];
        for (const k of keys) {
            if (result && result[k]) {
                result = result[k];
            } else {
                return key;
            }
        }
        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
