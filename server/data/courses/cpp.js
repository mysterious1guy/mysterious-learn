const cppCourses = [
    {
        id: "cpp-niveau-d-butant",
        title: "C++ - Niveau Débutant",
        description: "Maîtrisez le langage des systèmes hautes performances. Comprenez la mémoire et la compilation native.",
        category: "Programmation",
        level: "Débutant",
        duration: "30 heures",
        image: ""https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "cpp",
        isFree: true,
        tags: ["cpp", "débutant"],
        chapters: [
            {
                title: "1. Vision Globale : Le PHP de la performance",
                description: "Un langage de puissance brute.",
                order: 1,
                content: "C++ est une extension du C avec des classes. C'est le langage des jeux AAA et des moteurs de rendu.",
                objectives: ["Comprendre l'écosystème C++"]
            },
            {
                title: "2. Concept : Entrées/Sorties Modernes",
                description: "Iostream vs Stdio.",
                order: 2,
                content: "Découvrez `std::cout` et `std::cin`. Apprenez à utiliser les namespaces pour éviter les collisions de noms.",
                objectives: ["Maîtriser les flux standard"]
            },
            {
                title: "3. Exemple Concret : Gestion de Strings",
                description: "En finir avec les tableaux de char.",
                order: 3,
                content: "Utilisez `std::string` pour manipuler du texte sans vous soucier des dépassements de buffer. C'est plus sûr et plus rapide à coder.",
                objectives: ["Manipuler du texte en C++"]
            },
            {
                title: "4. Cas Pratique : Référence vs Pointeur",
                description: "Le passage par référence sécurisé.",
                order: 4,
                content: "Apprenez à utiliser le symbole `&` pour passer des objets lourds à une fonction sans les copier et sans utiliser de pointeurs complexes.",
                objectives: ["Comprendre les références C++"]
            },
            {
                title: "5. Exercice : Simulateur de dés",
                description: "Logique et Aléatoire.",
                order: 5,
                content: "Créez un programme qui simule un jet de dés en utilisant les librairies standard `<random>` et affiche le résultat.",
                objectives: ["Appliquer les bases du C++"]
            }
        ]
    },
    {
        id: "cpp-niveau-moyen",
        title: "C++ - Niveau Moyen",
        description: "L'Architecture Orientée Objet. Maîtrisez les classes et le polymorphisme.",
        category: "Programmation",
        level: "Moyen",
        duration: "45 heures",
        image: ""https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "cpp",
        isFree: true,
        tags: ["cpp", "OOP", "moyen"],
        chapters: [
            {
                title: "1. Vision Globale : Modélisation Métier",
                description: "Penser en objets.",
                order: 1,
                content: "Le C++ excelle dans la création de systèmes complexes via des hiérarchies d'objets bien pensées.",
                objectives: ["Appréhender le design OOP"]
            },
            {
                title: "2. Concept : Constructeurs & Destructeurs",
                description: "Le cycle de vie d'un objet.",
                order: 2,
                content: "Apprenez à initialiser vos membres proprement via la liste d'initialisation et à libérer les ressources dans le destructeur.",
                objectives: ["Gérer la création/destruction d'objets"]
            },
            {
                title: "3. Exemple Concret : Système de Combat",
                description: "Héritage simple.",
                order: 3,
                content: "Créez une classe Personnage et une classe Guerrier qui en hérite. Redéfinissez une méthode `attaquer()`.",
                objectives: ["Utiliser l'héritage C++"]
            },
            {
                title: "4. Cas Pratique : Polymorphisme Virtuel",
                description: "Le mot-clé 'virtual'.",
                order: 4,
                content: "Utilisez `virtual` pour permettre au C++ de choisir la version d'une fonction à l'exécution selon le type réel de l'objet.",
                objectives: ["Implémenter la liaison dynamique"]
            },
            {
                title: "5. Exercice : Gestion d'Inventory",
                description: "Classes et Vecteurs.",
                order: 5,
                content: "Créez un système d'inventaire où l'on peut ajouter et retirer des objets de différents types (Arme, Potion) héritant d'une base commune.",
                objectives: ["Combiner héritage et conteneurs"]
            }
        ]
    },
    {
        id: "cpp-niveau-interm-diaire",
        title: "C++ - Niveau Intermédiaire",
        description: "La Maîtrise de la Mémoire et de la STL. Zéro fuite mémoire.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "50 heures",
        image: ""https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        language: "cpp",
        isFree: true,
        tags: ["cpp", "STL", "intermédiaire"],
        chapters: [
            {
                title: "1. Vision Globale : RAII & Sécurité",
                description: "Gérer les ressources automatiquement.",
                order: 1,
                content: "Resource Acquisition Is Initialization (RAII). C'est le pilier qui rend le C++ moderne plus sûr que le C.",
                objectives: ["Comprendre le concept RAII"]
            },
            {
                title: "2. Concept : Smart Pointers",
                description: "L'oubli de free() n'est plus une fatalité.",
                order: 2,
                content: "Utilisez `std::unique_ptr` et `std::shared_ptr`. L'objet se détruit dès qu'il n'est plus utilisé. Fini les Memory Leaks.",
                objectives: ["Bannir les pointeurs bruts"]
            },
            {
                title: "3. Exemple Concret : Conteneurs STL",
                description: "Vector, Map, Set.",
                order: 3,
                content: "Oubliez les tableaux C. Utilisez `std::vector` pour une gestion dynamique et performante de vos listes de données.",
                objectives: ["Utiliser la librairie standard"]
            },
            {
                title: "4. Cas Pratique : Itérateurs & Algorithmes",
                description: "Trier et Rechercher.",
                order: 4,
                content: "Utilisez `std::sort` et `std::find` sur vos conteneurs. C'est plus rapide et optimisé que n'importe quel code fait main.",
                objectives: ["Appliquer des algorithmes génériques"]
            },
            {
                title: "5. Exercice : Analyse de Logs massif",
                description: "Performance et STL.",
                order: 5,
                content: "Chargez un fichier de log, extrayez les adresses IP uniques et triez-les par nombre d'occurrences en utilisant `std::map`.",
                objectives: ["Synthétiser mémoire et conteneurs"]
            }
        ]
    },
    {
        id: "cpp-niveau-expert",
        title: "C++ - Niveau Expert",
        description: "Métaprogrammation et Multithreading. Poussez le processeur au bout.",
        category: "Programmation",
        level: "Expert",
        duration: "65 heures",
        image: ""https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "cpp",
        isFree: true,
        tags: ["cpp", "expert", "multithreading"],
        chapters: [
            {
                title: "1. Vision Globale : Templates & Généricité",
                description: "Écrire du code pour n'importe quel type.",
                order: 1,
                content: "Les templates permettent de générer du code à la compilation. C'est le secret de la performance de la STL.",
                objectives: ["Maîtriser les templates"]
            },
            {
                title: "2. Concept : Move Semantics",
                description: "Voler au lieu de copier.",
                order: 2,
                content: "Apprenez à utiliser `std::move` et les rvalue references (`&&`). C'est ce qui rend le C++11+ incroyablement rapide.",
                objectives: ["Optimiser les transferts de données"]
            },
            {
                title: "3. Exemple Concret : Pool de Threads",
                description: "Parallélisme massif.",
                order: 3,
                content: "Créez une file de tâches et plusieurs threads qui les consomment simultanément via `std::thread` and `std::mutex`.",
                objectives: ["Gérer la concurrence"]
            },
            {
                title: "4. Cas Pratique : Métaprogrammation de constante",
                description: "Calculer à la compilation.",
                order: 4,
                content: "Utilisez `constexpr` pour effectuer des calculs lourds pendant que le compilateur tourne, pour un runtime instantané.",
                objectives: ["Réduire le temps d'exécution"]
            },
            {
                title: "5. Exercice : Moteur de Rendu Mini",
                description: "Synthèse de l'expertise.",
                order: 5,
                content: "Implémentez une structure de données générique thread-safe pour stocker et transformer des milliers de points 3D.",
                objectives: ["Bâtir un système haute performance"]
            }
        ]
    }
];

module.exports = cppCourses;
