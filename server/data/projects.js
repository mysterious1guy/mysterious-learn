const projects = [
    {
        _id: "proj_algo_1",
        title: "Le Labyrinthe du Destin",
        description: "Créez un algorithme capable de sortir d'un labyrinthe généré aléatoirement. Utilisez la récursion ou une pile (Stack) pour mémoriser le chemin parcouru.",
        language: "Algorithmique",
        level: "Avancé",
        difficulty: "Moyen",
        xpReward: 800,
        requirements: [
            "Implémenter une matrice de labyrinthe",
            "Algorithme de backtracking fonctionnel",
            "Détection automatique de l'entrée et de la sortie",
            "Affichage du chemin solution"
        ],
        objectives: [
            "Maîtriser la récursion",
            "Manipuler les structures de données complexes",
            "Optimiser la recherche spatiale"
        ]
    },
    {
        _id: "proj_python_1",
        title: "CyberPet Evolution",
        description: "Développez un assistant virtuel capable d'évoluer selon les interactions de l'utilisateur. Intégrez une gestion d'état persistante et une interface en ligne de commande stylisée.",
        language: "Python",
        level: "Avancé",
        difficulty: "Difficile",
        xpReward: 1200,
        requirements: [
            "Système de classes et héritage",
            "Gestion des fichiers (sauvegarde/chargement)",
            "Logique de besoins (faim, sommeil, XP)",
            "Menu interactif asynchrone"
        ],
        objectives: [
            "Programmation Orientée Objet",
            "Gestion de la persistence",
            "Interface utilisateur CLI"
        ]
    },
    {
        _id: "proj_c_1",
        title: "Mini-Noyau Système",
        description: "Simulez les fonctions de base d'un système d'exploitation : gestionnaire de mémoire simple et ordonnanceur de tâches rudimentaire.",
        language: "C",
        level: "Avancé",
        difficulty: "Extrême",
        xpReward: 2000,
        requirements: [
            "Allocation dynamique de mémoire personnalisée",
            "Simulation de threads avec des signaux",
            "Gestion des priorités",
            "Pas de fuite mémoire (valgrind-clean)"
        ],
        objectives: [
            "Gestion bas-niveau de la mémoire",
            "Architecture système",
            "Optimisation de performance"
        ]
    }
];

module.exports = projects;
