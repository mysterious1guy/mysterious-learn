import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
    fr: {
        welcome: "Bienvenue sur Mysterious Classroom",
        dashboard_title: "Tableau de bord",
        account_title: "Mon Compte",
        courses: "Mes Cours",
        admin: "Admin",
        monitor: "Moniteur",
        logout: "Déconnexion",
        projects: "Projets",
        leaderboard: "Classement",
        nav: {
            login: "SE CONNECTER",
            register: "S'INSCRIRE"
        },
        onboarding: {
            title: "Personnalise ton espace",
            theme: "Thème",
            dark: "Sombre",
            light: "Clair",
            language: "Langue du contenu",
            active: "Activé",
            mute: "Muet",
            next: "Suivant",
            back: "Retour",
            start: "Commencer"
        },
        dashboard: {
            subtitle: "Votre aventure commence ici",
            modules: "Modules",
            badges: "Badges",
            points: "Points",
            completed_projects: "Projets Terminés",
            latest_badges: "Derniers Badges",
            no_badges: "Vous n'avez pas encore de badges.",
            recommended: "Recommandé pour vous",
            continue: "Continuer",
            start: "Commencer",
            completed: "Terminé",
            module_label: "Module :",
            view_all: "Voir tout",
            unlocked: "Débloqué !",
            unlocked_badge: "Félicitations, vous venez de débloquer le badge :"
        },
        account: {
            save: "Sauvegarder",
            member_since: "Membre depuis",
            personal_info: "Informations personnelles",
            first_name: "Prénom",
            last_name: "Nom",
            email: "Email",
            verified: "Vérifié",
            phone: "Téléphone",
            location: "Localisation",
            privacy: "Confidentialité du profil",
            privacy_public: "Public (visible au classement)",
            privacy_private: "Privé",
            privacy_anonymous: "Anonyme",
            level: "Niveau de programmation",
            level_beginner: "Débutant",
            level_intermediate: "Intermédiaire",
            level_advanced: "Avancé",
            password: "Mot de passe",
            change_password: "Changer le mot de passe",
            current_password: "Mot de passe actuel",
            new_password: "Nouveau mot de passe",
            confirm_password: "Confirmer le nouveau",
            updating: "Mise à jour en cours...",
            update_password: "Mettre à jour le mot de passe",
            two_factor: "Authentification à deux facteurs",
            two_factor_enabled: "Activée",
            two_factor_ready: "Service 2FA prêt",
            active_sessions: "Sessions actives",
            session_active: "session(s) active(s) (Cet appareil)",
            preferences: "Préférences du Compte",
            notifications: "Notifications par email",
            notifications_desc: "Recevoir des emails de notification importants.",
            language: "Langue de l'interface",
            language_desc: "Choisir la langue d'affichage globale du site (Français / English).",
            theme: "Thème Dynamique",
            theme_desc: "Gérer l'apparence visuelle pour plus de confort.",
            theme_light: "Clair",
            theme_dark: "Sombre",
            delete_account: "Supprimer mon compte",
            delete_warning1: "Action irréversible",
            delete_warning1_desc: "Êtes-vous absolument sûr de vouloir supprimer votre compte ?",
            delete_warning2: "Dernière chance",
            delete_warning2_desc: "Toutes vos progressions, favoris et données personnelles seront supprimés pour toujours.",
            yes_understand: "Oui, je comprends",
            confirm_delete: "Confirmer la suppression",
            cancel: "Annuler",
            profile_tab: "Profil",
            security_tab: "Sécurité",
            preferences_tab: "Préférences"
        }
    },
    en: {
        welcome: "Welcome to Mysterious Classroom",
        dashboard_title: "Dashboard",
        account_title: "Account",
        courses: "My Courses",
        admin: "Admin",
        monitor: "Monitor",
        logout: "Logout",
        projects: "Projects",
        leaderboard: "Leaderboard",
        nav: {
            login: "LOG IN",
            register: "SIGN UP"
        },
        onboarding: {
            title: "Personalize your space",
            theme: "Theme",
            dark: "Dark",
            light: "Light",
            language: "Content Language",
            active: "Enabled",
            mute: "Muted",
            next: "Next",
            back: "Back",
            start: "Get Started"
        },
        dashboard: {
            subtitle: "Your adventure begins here",
            modules: "Modules",
            badges: "Badges",
            points: "Points",
            completed_projects: "Completed Projects",
            latest_badges: "Latest Badges",
            no_badges: "You don't have any badges yet.",
            recommended: "Recommended for you",
            continue: "Continue",
            start: "Start",
            completed: "Completed",
            module_label: "Module:",
            view_all: "View all",
            unlocked: "Unlocked!",
            unlocked_badge: "Congratulations, you just unlocked the badge:"
        },
        account: {
            save: "Save",
            member_since: "Member since",
            personal_info: "Personal Information",
            first_name: "First Name",
            last_name: "Last Name",
            email: "Email",
            verified: "Verified",
            phone: "Phone",
            location: "Location",
            privacy: "Profile Privacy",
            privacy_public: "Public (visible on leaderboard)",
            privacy_private: "Private",
            privacy_anonymous: "Anonymous",
            level: "Programming Level",
            level_beginner: "Beginner",
            level_intermediate: "Intermediate",
            level_advanced: "Advanced",
            password: "Password",
            change_password: "Change password",
            current_password: "Current password",
            new_password: "New password",
            confirm_password: "Confirm new password",
            updating: "Updating...",
            update_password: "Update password",
            two_factor: "Two-factor authentication",
            two_factor_enabled: "Enabled",
            two_factor_ready: "2FA Service ready",
            active_sessions: "Active sessions",
            session_active: "active session(s) (This device)",
            preferences: "Account Preferences",
            notifications: "Email notifications",
            notifications_desc: "Receive important notification emails.",
            language: "Interface language",
            language_desc: "Choose the global display language for the site (French / English).",
            theme: "Dynamic Theme",
            theme_desc: "Manage the visual appearance for more comfort.",
            theme_light: "Light",
            theme_dark: "Dark",
            delete_account: "Delete my account",
            delete_warning1: "Irreversible action",
            delete_warning1_desc: "Are you absolutely sure you want to delete your account?",
            delete_warning2: "Last chance",
            delete_warning2_desc: "All your progress, favorites, and personal data will be deleted forever.",
            yes_understand: "Yes, I understand",
            confirm_delete: "Confirm deletion",
            cancel: "Cancel",
            profile_tab: "Profile",
            security_tab: "Security",
            preferences_tab: "Preferences"
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
