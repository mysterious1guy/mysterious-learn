const reactCourses = [
    {
        id: "react-niveau-d-butant",
        title: "React - Niveau Débutant",
        description: "Pensez en composants. Apprenez la librairie UI la plus populaire au monde. Maîtrisez le JSX, les Props et le State pour créer des interfaces réactives.",
        category: "Web",
        level: "Débutant",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        rating: 4.8,
        language: "french",
        isFree: true,
        tags: ["React", "JSX", "Components", "Débutant"],
        chapters: [
            {
                title: "1. Introduction & JSX",
                description: "Comprendre pourquoi React a changé le Web.",
                order: 1,
                duration: "10 heures",
                content: "React est une librairie de composants. Apprenez le JSX, un mélange puissant de JavaScript et HTML. Comprenez le concept du Virtual DOM et pourquoi il rend React si rapide.",
                objectives: ["Initialiser un projet Vite", "Comprendre le JSX", "Créer son premier composant fonctionnel"],
                resources: []
            },
            {
                title: "2. Props & Liste",
                description: "Rendez vos composants dynamiques et réutilisables.",
                order: 2,
                duration: "10 heures",
                content: "Les `Props` sont les arguments de vos composants. Apprenez à passer des données et à afficher des listes dynamiques via la méthode `map()`.",
                objectives: ["Passer des données entre composants", "Afficher des listes complexes", "Utiliser les Key prop correctement"],
                resources: []
            }
        ]
    },
    {
        id: "react-niveau-interm-diaire",
        title: "React - Niveau Moyen",
        description: "L'intelligence des composants. Maîtrisez les Hooks fondamentaux (useState, useEffect) et la gestion des formulaires.",
        category: "Web",
        level: "Moyen",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        rating: 4.9,
        language: "french",
        isFree: true,
        tags: ["Hooks", "State", "useEffect", "Intermédiaire"],
        chapters: [
            {
                title: "1. useState & Gestion d'État",
                description: "Faites vivre vos composants avec une mémoire locale.",
                order: 1,
                duration: "15 heures",
                content: "Le Hook `useState` permet à vos composants de 'se souvenir' des données. Apprenez à gérer les événements et à mettre à jour l'interface en temps réel.",
                objectives: ["Maîtriser le changement d'état", "Gérer les inputs de formulaires", "Comprendre le cycle de rendu"],
                resources: []
            },
            {
                title: "2. useEffect & Cycle de Vie",
                description: "Synchronisez vos composants avec le monde extérieur.",
                order: 2,
                duration: "15 heures",
                content: "Apprenez à utiliser `useEffect` pour charger des données depuis une API. Maîtrisez le tableau de dépendances pour éviter les boucles infinies.",
                objectives: ["Appels API (Fetch) au montage", "Nettoyer les effets (Cleanup)", "Maîtriser les synchronisations"],
                resources: []
            }
        ]
    },
    {
        id: "react-niveau-avanc",
        title: "React - Niveau Intermédiaire",
        description: "Architecture et États Globaux. Maîtrisez React Router, Context API et les Hooks personnalisés pour des applications massives.",
        category: "Web",
        level: "Intermédiaire",
        duration: "35 heures",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        rating: 4.9,
        language: "french",
        isFree: true,
        tags: ["Router", "Context", "Custom Hooks", "Avancé"],
        chapters: [
            {
                title: "1. Navigation & Routing",
                description: "Créez des Single Page Applications multi-pages.",
                order: 1,
                duration: "15 heures",
                content: "Utilisez React Router pour créer des URL dynamiques. Apprenez à gérer les paramètres d'URL, les liens actifs et les redirections programmatiques.",
                objectives: ["Configurer des routes", "Utiliser useParams et Link", "Gérer les erreurs 404"],
                resources: []
            },
            {
                title: "2. Context API & État Global",
                description: "Dites adieu au Props Drilling.",
                order: 2,
                duration: "20 heures",
                content: "Apprenez à partager des données (thème, utilisateur connecté) dans toute votre application sans passer par toutes les couches. Maîtrisez le Context API et les Hooks personnalisés.",
                objectives: ["Créer un Provider global", "Consommer des données via useContext", "Extraire la logique dans des Custom Hooks"],
                resources: []
            }
        ]
    },
    {
        id: "react-niveau-expert",
        title: "React - Niveau Expert",
        description: "Performance et Écosystème Industriel. Optimisation avec useMemo/useCallback, gestion d'état complexe et déploiement.",
        category: "Web",
        level: "Expert",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["Performance", "Optimization", "Expert", "Architecture"],
        chapters: [
            {
                title: "1. Performance & Mémorisation",
                description: "Rendez vos applications React instantanées.",
                order: 1,
                duration: "20 heures",
                content: "Évitez les rendus inutiles. Maîtrisez `React.memo`, `useMemo` et `useCallback`. Apprenez à analyser vos composants avec le Profiler React.",
                objectives: ["Identifier les goulots d'étranglement", "Maîtriser la mémorisation", "Optimiser le bundle size"],
                resources: []
            },
            {
                title: "2. Tests & Écosystème Moderne",
                description: "Fiabilité et futur de React.",
                order: 2,
                duration: "20 heures",
                content: "Apprenez à tester vos composants avec React Testing Library. Introduction aux Server Components et aux frameworks comme Next.js.",
                objectives: ["Écrire des tests de composants", "Comprendre les patterns industriels", "Introduction au SSR"],
                resources: []
            }
        ]
    }
];

module.exports = reactCourses;
