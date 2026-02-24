const algoCourses = [
    {
        id: "algo-niveau-d-butant",
        title: "Algorithmique - Niveau Débutant",
        description: "Les bases du raisonnement. Comprenez le modèle IPO (Entrée-Traitement-Sortie) et la manipulation des variables.",
        category: "Fondamentaux",
        level: "Débutant",
        duration: "10 heures",
        image: "https://images.unsplash.com/photo-1516116216624-98e6e351d85e?w=800&q=80",
        rating: 4.9,
        language: "french",
        isFree: true,
        tags: ["logique", "variables", "fondations"],
        chapters: [
            {
                title: "1. Qu'est-ce qu'un Algorithme ?",
                description: "Démystifier la programmation par la logique pure.",
                order: 1,
                duration: "5 heures",
                content: "Un algorithme est une suite d'instructions. Apprenez le modèle IPO : Input (Données), Process (Calculs), Output (Résultat). Comprenez que l'ordinateur est un exécutant aveugle qui nécessite une précision absolue.",
                objectives: ["Définir un algorithme", "Comprendre le cycle IPO"],
                resources: []
            },
            {
                title: "2. Les Variables & l'Affectation",
                description: "Le stockage de l'information.",
                order: 2,
                duration: "5 heures",
                content: "Apprenez à stocker des données dans des 'boîtes' (variables). Maîtrisez les types (Entier, Chaîne, Booléen) et l'opération d'affectation (=).",
                objectives: ["Manipuler les variables", "Différencier les types de données"],
                resources: []
            }
        ]
    },
    {
        id: "algo-niveau-moyen",
        title: "Algorithmique - Niveau Moyen",
        description: "Donnez du cerveau à vos algorithmes via les structures de contrôle (Si, Sinon, Boucles).",
        category: "Fondamentaux",
        level: "Moyen",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1516116216624-98e6e351d85e?w=800&q=80",
        rating: 4.8,
        language: "french",
        isFree: true,
        tags: ["conditions", "boucles", "logique"],
        chapters: [
            {
                title: "1. Les Structures de Décision",
                description: "Faire des choix logiques.",
                order: 1,
                duration: "7 heures",
                content: "Apprenez à utiliser SI, SINON et SINON SI pour créer des embranchements dans votre raisonnement.",
                objectives: ["Maîtriser les conditions", "Utiliser les opérateurs logiques (ET, OU)"],
                resources: []
            },
            {
                title: "2. Les Boucles (Itérations)",
                description: "Répéter sans se fatiguer.",
                order: 2,
                duration: "8 heures",
                content: "Maîtrisez les boucles POUR (nombre de tours connu) et TANT QUE (condition de sortie). Évitez le piège de la boucle infinie.",
                objectives: ["Automatiser des tâches répétitives", "Choisir la bonne boucle"],
                resources: []
            }
        ]
    },
    {
        id: "algo-niveau-interm-diaire",
        title: "Algorithmique - Niveau Intermédiaire",
        description: "Modularité et Tableaux. Apprenez à organiser votre pensée en fonctions et à gérer des listes de données.",
        category: "Fondamentaux",
        level: "Intermédiaire",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        language: "french",
        isFree: true,
        tags: ["fonctions", "tableaux", "modularité"],
        chapters: [
            {
                title: "1. Les Fonctions & Paramètres",
                description: "La modularité du code.",
                order: 1,
                duration: "10 heures",
                content: "Apprenez à découper un problème complexe en petites fonctions réutilisables. Comprenez la portée des variables (Scope) et le passage de paramètres.",
                objectives: ["Créer des fonctions", "Gérer les retours de valeurs"],
                resources: []
            },
            {
                title: "2. Les Tableaux (Listes)",
                description: "Gérer des masses de données.",
                order: 2,
                duration: "10 heures",
                content: "Maîtrisez le stockage de plusieurs valeurs sous un même nom. Apprenez l'indexation (start at 0) et le parcours de tableaux via des boucles.",
                objectives: ["Parcourir un tableau", "Effectuer des recherches simples"],
                resources: []
            }
        ]
    },
    {
        id: "algo-niveau-expert",
        title: "Algorithmique - Niveau Expert",
        description: "Optimisation et Structures Complexes. Introduction à la complexité Big O et à la pensée récursive.",
        category: "Fondamentaux",
        level: "Expert",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["complexité", "récursivité", "optimisation"],
        chapters: [
            {
                title: "1. Complexité & Performance (Big O)",
                description: "Mesurer l'efficacité d'un raisonnement.",
                order: 1,
                duration: "12 heures",
                content: "Apprenez à mesurer si votre algorithme est rapide (O(N)) ou lent (O(N²)). Comprenez pourquoi le choix de l'algorithme est plus important que la puissance du PC.",
                objectives: ["Évaluer la complexité temporelle", "Optimiser des boucles imbriquées"],
                resources: []
            },
            {
                title: "2. Introduction à la Récursivité",
                description: "Le miroir de la logique.",
                order: 2,
                duration: "13 heures",
                content: "Comprenez comment une fonction peut s'appeler elle-même pour résoudre des problèmes complexes (Fractales, Factorielles). Maîtrisez le cas de base pour éviter le Stack Overflow.",
                objectives: ["Penser de manière récursive", "Identifier le cas de base"],
                resources: []
            }
        ]
    }
];

module.exports = algoCourses;
