const phpCourses = [
    {
        id: "php-niveau-d-butant",
        title: "PHP - Niveau Débutant",
        description: "Le moteur historique du Web. Apprenez à transformer des pages HTML statiques en sites dynamiques capables de traiter des formulaires et des variables.",
        category: "Programmation",
        level: "Débutant",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=800&q=80",
        rating: 4.7,
        language: "french",
        isFree: true,
        tags: ["PHP", "Backend", "Web Dynamique", "Débutant"],
        chapters: [
            {
                title: "1. Introduction au PHP & Syntaxe",
                description: "Votre premier script côté serveur.",
                order: 1,
                duration: "10 heures",
                content: "PHP (Hypertext Preprocessor) s'exécute sur le serveur avant d'envoyer du HTML au navigateur. Apprenez à utiliser les balises `<?php ?>`, à déclarer des variables avec `$` et à maîtriser l'affichage via `echo`.",
                objectives: ["Installer un serveur local (XAMPP/WAMP)", "Maîtriser les types de données", "Utiliser la concaténation"],
                resources: []
            },
            {
                title: "2. Structures de Contrôle & Boucles",
                description: "Logique PHP fondamentale.",
                order: 2,
                duration: "10 heures",
                content: "Maîtrisez les structures classiques `if`, `else`, `switch` et les boucles `for` / `while` en PHP. Apprenez le mélange élégant entre PHP et HTML.",
                objectives: ["Créer des pages dynamiques", "Parcourir des tableaux simples", "Maîtriser les opérateurs logiques"],
                resources: []
            }
        ]
    },
    {
        id: "php-niveau-interm-diaire",
        title: "PHP - Niveau Intermédiaire",
        description: "Interaction utilisateur et persistance. Maîtrisez les superglobales $_GET/$_POST et la connexion aux bases de données via PDO.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=800&q=80",
        rating: 4.8,
        language: "french",
        isFree: true,
        tags: ["PDO", "MySQL", "Formulaires", "Intermédiaire"],
        chapters: [
            {
                title: "1. Formulaires & Sessions",
                description: "Gérez les données utilisateur et la mémoire du site.",
                order: 1,
                duration: "15 heures",
                content: "Apprenez à récupérer des données via `$_POST` et `$_GET`. Maîtrisez les `$_SESSION` et les `$_COOKIE` pour créer des systèmes de connexion persistants.",
                objectives: ["Sécuriser les entrées utilisateur", "Gérer l'état de connexion", "Comprendre le protocole HTTP"],
                resources: []
            },
            {
                title: "2. PHP & MySQL avec PDO",
                description: "Faites dialoguer PHP avec votre base de données.",
                order: 2,
                duration: "15 heures",
                content: "Utilisez l'extension PDO (PHP Data Objects) pour vous connecter à MySQL. Apprenez à préparer vos requêtes pour contrer les injections SQL.",
                objectives: ["Connexion sécurisée à la BDD", "Requêtes préparées (Prepared Statements)", "Afficher des résultats dynamiques"],
                resources: []
            }
        ]
    },
    {
        id: "php-niveau-avanc",
        title: "PHP - Niveau Avancé",
        description: "L'ingénierie PHP moderne. Programmation Orientée Objet (POO), Namespaces et gestion des dépendances avec Composer.",
        category: "Programmation",
        level: "Avancé",
        duration: "35 heures",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=800&q=80",
        rating: 4.9,
        language: "french",
        isFree: true,
        tags: ["POO", "Classes", "Composer", "Avancé"],
        chapters: [
            {
                title: "1. Programmation Orientée Objet (POO)",
                description: "Passez au niveau supérieur architectural.",
                order: 1,
                duration: "20 heures",
                content: "Apprenez à créer des Classes, à instancier des Objets et à utiliser l'encapsulation (public/private). Maîtrisez l'héritage et les interfaces.",
                objectives: ["Modéliser des objets métier", "Maîtriser $this", "Comprendre les méthodes magiques"],
                resources: []
            },
            {
                title: "2. Ecosysteme & Composer",
                description: "Gérez vos projets comme un professionnel.",
                order: 2,
                duration: "15 heures",
                content: "Utilisez Composer pour installer des librairies tierces. Maîtrisez l'autoloader PSR-4 et les Namespaces pour organiser votre code.",
                objectives: ["Installer des packages", "Gérer les namespaces", "Structurer un projet moderne"],
                resources: []
            }
        ]
    },
    {
        id: "php-niveau-expert",
        title: "PHP - Niveau Expert",
        description: "Développement industriel et Patterns. Maîtrisez le MVC, les Tests Unitaires et le déploiement sur serveurs Linux.",
        category: "Programmation",
        level: "Expert",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=800&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["MVC", "PHPUnit", "Security", "Expert"],
        chapters: [
            {
                title: "1. Architecture MVC",
                description: "Séparez votre logique de votre affichage.",
                order: 1,
                duration: "20 heures",
                content: "Implémentez le pattern Model-View-Controller de zéro. Apprenez à router vos requêtes et à créer des architectures évolutives.",
                objectives: ["Créer un routeur personnalisé", "Séparez les responsabilités", "Architecture logicielle propre"],
                resources: []
            },
            {
                title: "2. Sécurité & Tests Unitaires",
                description: "Rendez votre code invulnérable et fiable.",
                order: 2,
                duration: "20 heures",
                content: "Maîtrisez les failles CSRF, XSS et apprenez à tester votre code avec PHPUnit. Découvrez l'optimisation de performance PHP-FPM.",
                objectives: ["Auditer la sécurité PHP", "Écrire des tests unitaires", "Optimiser le serveur"],
                resources: []
            }
        ]
    }
];

module.exports = phpCourses;
