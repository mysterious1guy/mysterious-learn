const reactCourses = [
    {
        id: "react-niveau-d-butant",
        title: "React - Niveau Débutant",
        description: "Apprenez la librairie UI n°1.",
        category: "Programmation",
        level: "Débutant",
        duration: "35 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        language: "javascript",
        isFree: true,
        tags: ["react", "frontend"],
        chapters: [
            { title: "1. Vision Globale : Composants", description: "Le Web modulaire.", order: 1, content: "React divise la page en briques.", objectives: ["Comprendre React"] },
            { title: "2. Concept : JSX & Props", description: "Paramètres et Rendu.", order: 2, content: "Passez des données aux composants.", objectives: ["Manipuler le JSX"] },
            { title: "3. Exemple Concret : Bouton", description: "Interaction simple.", order: 3, content: "Gérez un clic de base.", objectives: ["Gérer les events"] },
            { title: "4. Cas Pratique : Counter via State", description: "Les Hooks.", order: 4, content: "Utilisez useState pour compter.", objectives: ["Maîtriser l'état"] },
            { title: "5. Exercice : Profil User", description: "Affichage dynamique.", order: 5, content: "Affichez les infos d'un utilisateur passé en props.", objectives: ["Synthétiser les bases"] }
        ]
    },
    {
        id: "react-niveau-moyen",
        title: "React - Niveau Moyen",
        description: "Effets de bord et Listes.",
        category: "Programmation",
        level: "Moyen",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        language: "javascript",
        isFree: true,
        tags: ["react", "hooks"],
        chapters: [
            { title: "1. Vision Globale : Cycle de vie", description: "Quand le code s'exécute.", order: 1, content: "Comprenez le montage d'un composant.", objectives: ["Maîtriser le rendu"] },
            { title: "2. Concept : useEffect", description: "Gérer l'extérieur.", order: 2, content: "Appelez une API au chargement.", objectives: ["Maîtriser les effets"] },
            { title: "3. Exemple Concret : Chargement API", description: "Données distantes.", order: 3, content: "Récupérez du JSON et affichez-le.", objectives: ["Lier React au Web"] },
            { title: "4. Cas Pratique : Map & Key", description: "Afficher des listes.", order: 4, content: "Affichez 100 articles proprement.", objectives: ["Gérer les collections"] },
            { title: "5. Exercice : Météo App", description: "Projet concret.", order: 5, content: "Affichez la météo d'une ville via une API.", objectives: ["Utiliser les hooks avancés"] }
        ]
    },
    {
        id: "react-niveau-interm-diaire",
        title: "React - Niveau Intermédiaire",
        description: "Routing et État global.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "45 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        language: "javascript",
        isFree: true,
        tags: ["react", "redux", "context"],
        chapters: [
            { title: "1. Vision Globale : Navigation", description: "Single Page App.", order: 1, content: "Changez de page sans recharger.", objectives: ["Maîtriser React Router"] },
            { title: "2. Concept : Context API", description: "Éviter le Prop Drilling.", order: 2, content: "Partagez l'utilisateur partout dans l'app.", objectives: ["Gérer l'état global"] },
            { title: "3. Exemple Concret : Panier d'achat", description: "Gestion complexe.", order: 3, content: "Ajoutez des items au panier global.", objectives: ["Partager les data"] },
            { title: "4. Cas Pratique : Custom Hooks", description: "Réutiliser la logique.", order: 4, content: "Extrayez la logique dans vos propres hooks.", objectives: ["Nettoyer ses composants"] },
            { title: "5. Exercice : Dashboard complet", description: "Synthèse SPA.", order: 5, content: "Créez une app avec plusieurs routes et un état partagé.", objectives: ["Bâtir une application pro"] }
        ]
    },
    {
        id: "react-niveau-expert",
        title: "React - Niveau Expert",
        description: "Optimisation et Architecture avancée.",
        category: "Programmation",
        level: "Expert",
        duration: "60 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "javascript",
        isFree: true,
        tags: ["react", "performance", "expert"],
        chapters: [
            { title: "1. Vision Globale : Performance UI", description: "Fluidité maximale.", order: 1, content: "Évitez les rerendus inutiles.", objectives: ["Maîtriser la réconciliation"] },
            { title: "2. Concept : Memo, useMemo, useCallback", description: "Mise en cache.", order: 2, content: "Stabilisez vos composants lourds.", objectives: ["Optimiser le temps de calcul"] },
            { title: "3. Exemple Concret : Liste de 10k items", description: "Virtualisation.", order: 3, content: "Affichez seulement ce qui est visible.", objectives: ["Gérer le Big Data UI"] },
            { title: "4. Cas Pratique : Architecture modulaire", description: "Scale massivement.", order: 4, content: "Organisez les dossiers par domaines métier.", objectives: ["Architecturer des projets géants"] },
            { title: "5. Exercice : Refactoriser une app lente", description: "Synthèse expertise.", order: 5, content: "Prenez une app qui rame et rendez-la instantanée.", objectives: ["Diagnostiquer et réparer"] }
        ]
    }
];

module.exports = reactCourses;
