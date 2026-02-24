const cppCourses = [
    {
        id: "cpp-niveau-d-butant",
        title: "C++ - Niveau Débutant",
        description: "Maîtrisez le langage des systèmes hautes performances. Comprenez la mémoire, la compilation native et la syntaxe C++ moderne.",
        category: "Programmation",
        level: "Débutant",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=800&q=80",
        rating: 4.8,
        students: 18500,
        language: "cpp",
        isFree: true,
        tags: ["cpp", "C++", "débutant", "syntaxe"],
        chapters: [
            {
                title: "1. Compilation & Flux I/O",
                description: "Le passage du code source au binaire.",
                order: 1,
                duration: "15 heures",
                content: "C++ est compilé. Apprenez à utiliser `<iostream>` pour les entrées/sorties via `std::cout` et `std::cin`. Comprenez le rôle du compilateur et l'importance des namespaces.",
                objectives: ["Écrire un programme C++ valide", "Utiliser std::cout et std::endl", "Distinguer Compilation et Linking"],
                resources: []
            },
            {
                title: "2. Types, Références & auto",
                description: "Gestion moderne des données en C++.",
                order: 2,
                duration: "15 heures",
                content: "C++ introduit les références (`&`), alias sécurisés pour les variables. Apprenez à utiliser `auto` pour la déduction de type et le type `std::string` natif.",
                objectives: ["Utiliser les références", "Maîtriser le typage auto", "Manipuler std::string"],
                resources: []
            }
        ]
    },
    {
        id: "cpp-niveau-interm-diaire",
        title: "C++ - Niveau Intermédiaire",
        description: "L'Architecture Orientée Objet. Maîtrisez les classes, l'encapsulation et les bases du polymorphisme.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "45 heures",
        image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80",
        rating: 4.8,
        students: 12000,
        language: "cpp",
        isFree: true,
        tags: ["cpp", "OOP", "classes", "intermédiaire"],
        chapters: [
            {
                title: "1. Classes & Encapsulation",
                description: "Modélisez le monde avec des objets.",
                order: 1,
                duration: "20 heures",
                content: "Les classes C++ permettent de regrouper données privées et méthodes publiques. Maîtrisez les constructeurs (liste d'initialisation) et les destructeurs.",
                objectives: ["Concevoir des classes", "Utiliser l'encapsulation private/public", "Maîtriser le cycle de vie des objets"],
                resources: []
            },
            {
                title: "2. Héritage & Fonctions Virtuelles",
                description: "Le polymorphisme dynamique au runtime.",
                order: 2,
                duration: "25 heures",
                content: "Apprenez à créer des hiérarchies de classes. Utilisez `virtual` et `override` pour permettre au programme de choisir la bonne méthode pendant l'exécution.",
                objectives: ["Implémenter l'héritage", "Maîtriser le polymorphisme", "Utiliser les classes abstraites"],
                resources: []
            }
        ]
    },
    {
        id: "cpp-niveau-avanc",
        title: "C++ - Niveau Avancé",
        description: "La Maîtrise de la Mémoire et de la STL. Apprenez à gérer les ressources sans fuites et à utiliser les algorithmes standards.",
        category: "Programmation",
        level: "Avancé",
        duration: "50 heures",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        rating: 4.9,
        language: "cpp",
        isFree: true,
        tags: ["cpp", "STL", "Memory", "Smart Pointers"],
        chapters: [
            {
                title: "1. Gestion Mémoire (Smart Pointers)",
                description: "Bannissez new/delete pour un code sûr.",
                order: 1,
                duration: "25 heures",
                content: "Le C++ moderne utilise RAII. Maîtrisez `std::unique_ptr` et `std::shared_ptr` pour que la mémoire soit libérée automatiquement.",
                objectives: ["Bannir les fuites mémoire", "Utiliser make_unique", "Comprendre la propriété de la ressource"],
                resources: []
            },
            {
                title: "2. La STL (Standard Template Library)",
                description: "Algorithmes et conteneurs universels.",
                order: 2,
                duration: "25 heures",
                content: "Maîtrisez `std::vector`, `std::map` et les itérateurs. Apprenez à trier et rechercher via les algorithmes standards.",
                objectives: ["Utiliser les conteneurs STL", "Maîtriser les itérateurs", "Appliquer des algorithmes génériques"],
                resources: []
            }
        ]
    },
    {
        id: "cpp-niveau-expert",
        title: "C++ - Niveau Expert",
        description: "Ingénierie de Haute Performance. Metaprogrammation, Move Semantics et Concurrence multithread.",
        category: "Programmation",
        level: "Expert",
        duration: "65 heures",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        rating: 5.0,
        language: "cpp",
        isFree: true,
        tags: ["Templates", "Move Semantics", "Multithreading", "Expert"],
        chapters: [
            {
                title: "1. Move Semantics & Templates",
                description: "Optimisations extrêmes et code générique.",
                order: 1,
                duration: "30 heures",
                content: "Apprenez à 'voler' la mémoire via `std::move` pour éviter les copies. Maîtrisez les Templates pour créer du code capable de s'adapter à n'importe quel type.",
                objectives: ["Maîtriser rvalue references &&", "Écrire des fonctions templates", "Comprendre le métaprogrammation"],
                resources: []
            },
            {
                title: "2. Multithreading & Concurrence",
                description: "Exploitez toute la puissance du CPU.",
                order: 2,
                duration: "35 heures",
                content: "Utilisez `std::thread` et `std::mutex` pour exécuter des tâches en parallèle sans corruptions de données.",
                objectives: ["Lancer des threads", "Protéger les données partagées", "Maîtriser les atomiques"],
                resources: []
            }
        ]
    }
];

module.exports = cppCourses;
