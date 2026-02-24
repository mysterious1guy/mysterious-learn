const jsCourses = [
    {
        id: "javascript-niveau-d-butant",
        title: "JavaScript - Niveau Débutant",
        description: "Le Mouvement et la Logique. Apprenez le seul langage exécutable nativement par tous les navigateurs web. Maîtrisez la syntaxe moderne ES6+.",
        category: "Web",
        level: "Débutant",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1579468458835-cd73b7b7dfd5?w=800&q=80",
        rating: 4.8,
        students: 52000,
        language: "french",
        isFree: true,
        tags: ["JavaScript", "ES6+", "Logique", "Variables", "Débutant"],
        chapters: [
            {
                title: "1. Variables & Types Primitifs",
                description: "Maîtrisez let/const et la typologie dynamique de JavaScript.",
                order: 1,
                duration: "10 heures",
                content: "JavaScript a évolué. Oubliez `var` et utilisez `let` et `const` pour gérer la portée de bloc. Comprenez la différence entre l'égalité souple (`==`) et l'égalité stricte (`===`).",
                objectives: ["Saisir la portée des variables", "Utiliser console.log()", "Bannir les pièges de type"],
                resources: []
            },
            {
                title: "2. Fonctions & Conditionnels",
                description: "Algorithmique appliquée : If, Loops et Arrow Functions.",
                order: 2,
                duration: "10 heures",
                content: "Apprenez à structurer votre logique. Découvrez la puissance des fonctions fléchées (`=>`) et maîtrisez les structures itératives.",
                objectives: ["Écrire des fonctions modernes", "Utiliser map/filter de base", "Maîtriser les boucles for/of"],
                resources: []
            }
        ]
    },
    {
        id: "javascript-niveau-interm-diaire",
        title: "JavaScript - Niveau Intermédiaire",
        description: "L'ingénieur du Document. Parcourez l'arbre DOM, capturez des événements et manipulez des Objets complexes.",
        category: "Web",
        level: "Intermédiaire",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1579468458835-cd73b7b7dfd5?w=800&q=80",
        rating: 4.9,
        students: 39000,
        language: "french",
        isFree: true,
        tags: ["DOM", "Events", "Objets", "Intermédiaire"],
        chapters: [
            {
                title: "1. Manipulation du DOM",
                description: "Prenez le contrôle du squelette HTML sans recharger.",
                order: 1,
                duration: "12 heures",
                content: "Utilisez `document.querySelector` pour cibler vos éléments et modifiez-les dynamiquement. Comprenez la sémantique de l'arbre DOM.",
                objectives: ["Modifier styles et classes", "Injecter du contenu dynamique", "Naviguer dans les noeuds parents/enfants"],
                resources: []
            },
            {
                title: "2. Gestion d'Événements",
                description: "Réagissez aux actions de l'utilisateur.",
                order: 2,
                duration: "13 heures",
                content: "Maîtrisez `addEventListener`. Apprenez à stopper les comportements par défaut via `preventDefault()` et comprenez le bubbling électronique.",
                objectives: ["Câbler des clics et formulaires", "Gérer les inputs clavier", "Optimiser via délégation d'événements"],
                resources: []
            }
        ]
    },
    {
        id: "javascript-niveau-avanc",
        title: "JavaScript - Niveau Avancé",
        description: "L'ingénierie Systémique asynchrone absolue. Maîtrisez l'Event Loop et les requêtes HTTP (Fetch, JWT).",
        category: "Web",
        level: "Avancé",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["Asynchrone", "Promises", "Fetch API", "Avancé"],
        chapters: [
            {
                title: "1. Promesses & Async/Await",
                description: "Sortez du Callback Hell et gérez le temps asynchrone.",
                order: 1,
                duration: "15 heures",
                content: "Comprenez pourquoi JavaScript est mono-thread mais capable de gérer des milliers de tâches de fond via l'Event Loop. Maîtrisez les blocs try/catch sur de l'asynchrone.",
                objectives: ["Comprendre les états d'une promesse", "Maîtriser async/await", "Éviter les erreurs bloquantes"],
                resources: []
            },
            {
                title: "2. API Fetch & Communication",
                description: "Le dialogue client-serveur via REST.",
                order: 2,
                duration: "15 heures",
                content: "Apprenez à récupérer et envoyer des données JSON. Maîtrisez les headers de sécurité et le décodage asynchrone.",
                objectives: ["Effectuer des requêtes GET/POST", "Gérer les erreurs réseau", "Authentification via tokens"],
                resources: []
            }
        ]
    },
    {
        id: "javascript-niveau-expert",
        title: "JavaScript - Niveau Expert",
        description: "Pénétration absolue de l'architecture bas niveau. Closures, POO et Patterns Ingénieurs.",
        category: "Web",
        level: "Expert",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["Closures", "POO", "Patterns", "Expert"],
        chapters: [
            {
                title: "1. Closures & Environnement Lexical",
                description: "Comprenez la mémoire intime de JavaScript.",
                order: 1,
                duration: "15 heures",
                content: "Les Closures sont le secret derrière les Hooks et les patterns modulaires. Apprenez comment une fonction se souvient de son passé.",
                objectives: ["Identifier les zones de mémoire isolées", "Implémenter des modules privés", "Performance mémoire"],
                resources: []
            },
            {
                title: "2. Programmation Orientée Objet & Prototypes",
                description: "Structurez vos applications massives avec élégance.",
                order: 2,
                duration: "15 heures",
                content: "Allez au-delà des fonctions avec les Classes ES6 et l'héritage prototypal. Encapsulez votre logique métier dans des composants robustes.",
                objectives: ["Maîtriser la syntaxe class", "Comprendre 'this' définitivement", "Héritage et polymorphisme"],
                resources: []
            }
        ]
    }
];

module.exports = jsCourses;
