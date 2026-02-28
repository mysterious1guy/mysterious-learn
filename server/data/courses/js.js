const jsCourses = [
    {
        id: "javascript-niveau-d-butant",
        title: "JavaScript - Niveau Débutant",
        description: "Le Mouvement et la Logique. Apprenez le seul langage exécutable nativement par tous les navigateurs web.",
        category: "Web",
        level: "Débutant",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "french",
        isFree: true,
        tags: ["JavaScript", "Variables", "Débutant"],
        chapters: [
            {
                title: "1. Introduction & Vision Globale",
                description: "Le rôle de JavaScript dans le Web.",
                order: 1,
                content: "JavaScript est le cerveau du Web. Si HTML est le squelette et CSS l'apparence, JS est ce qui rend le site vivant et interactif.",
                objectives: ["Comprendre le rôle de JS"]
            },
            {
                title: "2. Concept : Variables & Types",
                description: "Stocker et manipuler des données.",
                order: 2,
                content: "Utilisez `let` et `const` pour créer des variables. Découvrez les types : Number, String, Boolean, Null et Undefined.",
                objectives: ["Déclarer des variables modernes"]
            },
            {
                title: "3. Exemple Concret : Premier Script",
                description: "Interagir avec la console.",
                order: 3,
                content: "Écrivez : `const name = 'Coder'; console.log('Bonjour ' + name);`. C'est votre premier pas dans le monde du JS.",
                objectives: ["Exécuter du code JS"]
            },
            {
                title: "4. Cas Pratique : Calculatrice simple",
                description: "Manipulation de nombres.",
                order: 4,
                content: "Additionnez deux variables et affichez le résultat. Apprenez à transformer une chaîne en nombre via `Number()`.",
                objectives: ["Pratiquer les opérateurs mathématiques"]
            },
            {
                title: "5. Exercice : Le message de bienvenue",
                description: "Utilisation des String Templates.",
                order: 5,
                content: "Créez une variable `pseudo` et affichez un message de bienvenue dynamique en utilisant les backticks (``).",
                objectives: ["Utiliser les template literals"]
            }
        ]
    },
    {
        id: "javascript-niveau-moyen",
        title: "JavaScript - Niveau Moyen",
        description: "Interaction DOM et Événements. Apprenez à manipuler la page web en temps réel.",
        category: "Web",
        level: "Intermédiaire",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        language: "french",
        isFree: true,
        tags: ["DOM", "Events", "Moyen"],
        chapters: [
            {
                title: "1. Vision Globale : Le DOM",
                description: "L'arborescence de votre page.",
                order: 1,
                content: "Le DOM (Document Object Model) est la représentation de votre HTML en tant qu'objet manipulable par JavaScript.",
                objectives: ["Comprendre la structure du DOM"]
            },
            {
                title: "2. Concept : Sélections & Événements",
                description: "Cibler et écouter.",
                order: 2,
                content: "Utilisez `document.querySelector` pour trouver un élément et `addEventListener` pour réagir au clic ou à la frappe clavier.",
                objectives: ["Manipuler les composants HTML"]
            },
            {
                title: "3. Exemple Concret : Bouton Interactif",
                description: "Changer de couleur au clic.",
                order: 3,
                content: "Ciblez un bouton, écoutez le clic, et modifiez sa propriété `style.backgroundColor`. La page change sous vos yeux.",
                objectives: ["Modifier le CSS via JS"]
            },
            {
                title: "4. Cas Pratique : Compteur de clics",
                description: "Gérer un état simple.",
                order: 4,
                content: "Créez un bouton qui incrémente un nombre affiché à l'écran à chaque fois qu'on appuie dessus.",
                objectives: ["Lier données et affichage"]
            },
            {
                title: "5. Exercice : Liste de tâches (v1)",
                description: "Ajout dynamique d'éléments.",
                order: 5,
                content: "Récupérez le texte d'un input et ajoutez-le dans une `<ul>` lors du clic sur un bouton 'Ajouter'.",
                objectives: ["Créer des éléments HTML dynamiques"]
            }
        ]
    },
    {
        id: "javascript-niveau-interm-diaire",
        title: "JavaScript - Niveau Intermédiaire",
        description: "Asynchronisme et APIs. Maîtrisez les Promesses et la communication avec les serveurs.",
        category: "Web",
        level: "Intermédiaire",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["Async", "Fetch", "APIs"],
        chapters: [
            {
                title: "1. Vision Globale : Le temps en JS",
                description: "Gérer l'attente sans bloquer le site.",
                order: 1,
                content: "JS est asynchrone par nature. Il ne bloque pas l'utilisateur pendant qu'il télécharge des données. C'est l'Event Loop.",
                objectives: ["Comprendre le mode asynchrone"]
            },
            {
                title: "2. Concept : Promises & Async/Await",
                description: "Le Javascript moderne.",
                order: 2,
                content: "Une Promise représente une valeur future. `Async` et `Await` permettent d'écrire du code asynchrone qui ressemble à du code synchrone.",
                objectives: ["Maîtriser async/await"]
            },
            {
                title: "3. Exemple Concret : Fetch API",
                description: "Récupérer des données JSON.",
                order: 3,
                content: "Utilisez `fetch()` pour appeler une API (ex: météo ou utilisateurs) et affichez les données reçues dans votre console.",
                objectives: ["Communiquer avec un serveur externe"]
            },
            {
                title: "4. Cas Pratique : Galerie d'images",
                description: "Utiliser des données distantes.",
                order: 4,
                content: "Appelez une API d'images (ex: Unsplash) et générez dynamiquement des balises `<img>` pour créer une galerie sur votre site.",
                objectives: ["Transformer JSON en UI"]
            },
            {
                title: "5. Exercice : Barre de recherche météo",
                description: "Projet complet d'API.",
                order: 5,
                content: "Tapez une ville dans un champ, cliquez, et affichez la température actuelle récupérée via une API de météo gratuite.",
                objectives: ["Gérer un workflow réseau complet"]
            }
        ]
    },
    {
        id: "javascript-niveau-expert",
        title: "JavaScript - Niveau Expert",
        description: "Architecture et Patterns. Closures, POO et optimisation de performance.",
        category: "Web",
        level: "Avancé",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["Closures", "POO", "Patterns"],
        chapters: [
            {
                title: "1. Vision Globale : Architecture logicielle",
                description: "Coder pour la maintenabilité.",
                order: 1,
                content: "Un expert ne code pas juste pour que ça marche, il code pour que ce soit facile à lire et à faire évoluer sur 10 ans.",
                objectives: ["Adopter une posture d'architecte"]
            },
            {
                title: "2. Concept : Closures & Contextes",
                description: "Le fonctionnement interne du moteur.",
                order: 2,
                content: "Comprenez la portée lexicale, le mot-clé `this` et comment les Closures permettent de créer des variables privées en JS.",
                objectives: ["Maîtriser la mémoire JS"]
            },
            {
                title: "3. Exemple Concret : POO & Prototypes",
                description: "Classes et héritage.",
                order: 3,
                content: "Utilisez les classes ES6 pour structurer votre code. Apprenez comment le prototype permet l'économie de mémoire système.",
                objectives: ["Structurer via les classes"]
            },
            {
                title: "4. Cas Pratique : Création d'un plugin",
                description: "Modularité absolue.",
                order: 4,
                content: "Concevez un petit module (ex: un carrousel) qui s'installe en une ligne de code et qui ne pollue pas l'espace global.",
                objectives: ["Appliquer les Design Patterns"]
            },
            {
                title: "5. Exercice : Optimisation de rendu",
                description: "Debouncing & Throttling.",
                order: 5,
                content: "Implémentez une fonction de 'Debounce' pour limiter le nombre d'appels à une fonction lors d'un défilement (scroll) ou d'une frappe rapide.",
                objectives: ["Gérer les performances critiques"]
            }
        ]
    }
];

module.exports = jsCourses;
