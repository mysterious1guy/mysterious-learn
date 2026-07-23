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
            preferences_tab: "Préférences",
            export_data: "Exporter mes données",
            exporting: "Export en cours...",
            logout_all: "Déconnexion de tous les appareils"
        },
        footer: {
            innovative_platform: "Plateforme d'apprentissage innovante créée avec passion pour l'éducation technologique et le partage des connaissances.",
            creator: "Créateur",
            technologies: "Technologies",
            made_with_passion: "Fait avec passion et l'aide de l'IA",
            platform_created_by: "Plateforme créée par"
        },
        home: {
            established_connection: "Connexion Sécurisée Établie",
            title_part1: "MYSTERIOUS",
            title_part2: "CLASSROOM",
            subtitle: "Initialisation de la première plateforme d'apprentissage par l'investigation et le CTF. Pas de théorie ennuyeuse, juste des serveurs virtuels à analyser, du code à auditer et des flags à capturer.",
            btn_create_agent: "Créer un Dossier d'Agent",
            btn_read_briefing: "Lire le Briefing",
            stats_registered: "Agents Enregistrés",
            stats_active: "Agents Opérationnels",
            stats_status: "Statut Serveurs",
            stats_online: "En Ligne",
            mechanics_tag: "PROTOCOLE D'ENTRAÎNEMENT",
            mechanics_title: "Apprendre par l'Investigation (CTF)",
            mechanics_desc: "Oubliez les QCM. Ici, vous êtes face à des systèmes réels simulés. Cherchez les indices, trouvez la faille et prouvez votre expertise.",
            step1_title: "Analyser le Scénario",
            step1_desc: "Une entreprise virtuelle a été piratée. Lisez le briefing de mission, étudiez l'architecture et analysez les logs fournis.",
            step2_title: "Trouver la Vulnérabilité",
            step2_desc: "Utilisez vos compétences en logique, programmation ou réseau pour exploiter la faille (XSS, Injection, mauvaise configuration).",
            step3_title: "Capturer le FLAG",
            step3_desc: "Une fois le système compromis, récupérez une chaîne de caractère spéciale (ex: FLAG{h4ck3d}). Validez-la pour gagner de l'XP.",
            clearance_title: "Parcours d'Habilitation",
            clearance_desc: "Les missions sont classifiées par niveau d'habilitation (Clearance Level). Acquérez de l'expérience pour débloquer l'accès aux opérations les plus critiques.",
            architect_tag: "L'ARCHITECTE SYSTÈME",
            architect_quote: "Je crois en un monde où la technologie doit être comprise pour être sécurisée. Mysterious Classroom est l'arène que j'ai bâtie pour forger la prochaine génération d'experts cyber.",
            intercept_tag: "TRANSMISSION INTERCEPTÉE",
            intercept_title: "Le Système est en cours de déploiement",
            intercept_desc: "[INFO] Nos ingénieurs injectent actuellement les nouveaux scénarios d'entraînement (CTF) dans la matrice. La plateforme évolue. Préparez-vous pour de nouvelles missions imminentes.",
            intercept_status: "Compilation des missions en cours..."
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
            change_password: "Change Password",
            current_password: "Current password",
            new_password: "New password",
            confirm_password: "Confirm new password",
            updating: "Updating...",
            update_password: "Update password",
            two_factor: "Two-Factor Authentication",
            two_factor_enabled: "Enabled",
            two_factor_ready: "2FA Service ready",
            active_sessions: "Active Sessions",
            session_active: "active session(s) (This device)",
            preferences: "Account Preferences",
            notifications: "Email Notifications",
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
            preferences_tab: "Preferences",
            export_data: "Export my data",
            exporting: "Exporting...",
            logout_all: "Logout from all devices"
        },
        footer: {
            innovative_platform: "Innovative learning platform created with passion for tech education and knowledge sharing.",
            creator: "Creator",
            technologies: "Technologies",
            made_with_passion: "Made with passion and AI assistance",
            platform_created_by: "Platform created by"
        },
        home: {
            established_connection: "Secure Connection Established",
            title_part1: "MYSTERIOUS",
            title_part2: "CLASSROOM",
            subtitle: "Initializing the first investigation and CTF-based learning platform. No boring theory, just virtual servers to analyze, code to audit, and flags to capture.",
            btn_create_agent: "Create Agent Profile",
            btn_read_briefing: "Read Briefing",
            stats_registered: "Registered Agents",
            stats_active: "Operational Agents",
            stats_status: "Server Status",
            stats_online: "Online",
            mechanics_tag: "TRAINING PROTOCOL",
            mechanics_title: "Learn by Investigation (CTF)",
            mechanics_desc: "Forget multiple choice questions. Here, you face simulated real systems. Find clues, discover vulnerabilities, and prove your expertise.",
            step1_title: "Analyze Scenario",
            step1_desc: "A virtual company was hacked. Read the mission briefing, study the architecture, and analyze the provided logs.",
            step2_title: "Find Vulnerability",
            step2_desc: "Use your logic, programming, or networking skills to exploit the flaw (XSS, Injection, misconfiguration).",
            step3_title: "Capture the FLAG",
            step3_desc: "Once the system is compromised, retrieve a special string (e.g., FLAG{h4ck3d}). Validate it to earn XP.",
            clearance_title: "Clearance Levels",
            clearance_desc: "Missions are classified by Clearance Level. Gain experience to unlock access to the most critical operations.",
            architect_tag: "SYSTEM ARCHITECT",
            architect_quote: "I believe in a world where technology must be understood to be secured. Mysterious Classroom is the arena I built to forge the next generation of cyber experts.",
            intercept_tag: "TRANSMISSION INTERCEPTED",
            intercept_title: "System is deploying",
            intercept_desc: "[INFO] Our engineers are currently injecting new training scenarios (CTF) into the matrix. The platform is evolving. Prepare for upcoming missions.",
            intercept_status: "Compiling missions..."
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
            if (result && result[k] !== undefined) {
                result = result[k];
            } else {
                return undefined;
            }
        }
        if (typeof result === 'object' && result !== null) {
            const titleKey = `${key}_title`;
            if (translations[language] && typeof translations[language][titleKey] === 'string') {
                return translations[language][titleKey];
            }
            return undefined;
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
