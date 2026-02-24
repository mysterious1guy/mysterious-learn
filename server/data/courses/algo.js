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
                title: "1. Introduction & Vision Globale",
                description: "Comprendre pourquoi l'algorithmique est le socle de tout.",
                order: 1,
                content: "L'algorithmique n'est pas de la programmation, c'est de la logique pure. Tout programme suit le cycle IPO : Input (Entrée), Process (Traitement), Output (Sortie).",
                objectives: ["Définir un algorithme", "Comprendre le cycle IPO"]
            },
            {
                title: "2. Concept : Les Variables",
                description: "Le stockage de l'information.",
                order: 2,
                content: "Une variable est une boîte avec un nom, un type (Entier, Chaîne, Booléen) et une valeur. L'affectation (=) permet de modifier cette valeur.",
                objectives: ["Manipuler les variables", "Différencier les types"]
            },
            {
                title: "3. Exemple Concret",
                description: "Calcul d'une moyenne.",
                order: 3,
                content: "Pour calculer une moyenne : Entrée (Notes), Traitement (Somme / Nombre), Sortie (Résultat). C'est l'application directe du modèle IPO.",
                objectives: ["Visualiser un algorithme simple"]
            },
            {
                title: "4. Cas Pratique",
                description: "Algorithme de préparation de café.",
                order: 4,
                content: "Même les actions quotidiennes sont des algorithmes : 1. Prendre tasse, 2. Mettre café, 3. Verser eau. La précision est la clé.",
                objectives: ["Appliquer la logique au réel"]
            },
            {
                title: "5. Exercice",
                description: "Échange de deux valeurs.",
                order: 5,
                content: "Exercice classique : Vous avez deux verres (A et B). Comment échanger leur contenu sans en perdre ? Indice : Il faut un troisième verre (Variable temporaire).",
                objectives: ["Maîtriser l'affectation"]
            }
        ]
    },
    {
        id: "algo-niveau-moyen",
        title: "Algorithmique - Niveau Moyen",
        description: "Donnez du cerveau à vos algorithmes via les structures de contrôle (Conditions et Boucles).",
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
                title: "1. Vision Globale : Le flux de contrôle",
                description: "Sortir de la linéarité.",
                order: 1,
                content: "Un programme n'est pas toujours une ligne droite. Il doit prendre des décisions (Si) et répéter des actions (Boucles).",
                objectives: ["Comprendre la bifurcation logique"]
            },
            {
                title: "2. Concept : SI, SINON & BOUCLES",
                description: "Les piliers de l'intelligence artificielle.",
                order: 2,
                content: "SI (condition) ALORS (action) SINON (autre action). BOUCLE POUR (répétition fixée) vs TANT QUE (répétition conditionnelle).",
                objectives: ["Maîtriser les embranchements", "Automatiser via les boucles"]
            },
            {
                title: "3. Exemple Concret",
                description: "Vérification d'âge.",
                order: 3,
                content: "Algorithme : SI age >= 18 ALORS 'Majeur' SINON 'Mineur'. Simple et efficace pour comprendre la décision.",
                objectives: ["Utiliser les opérateurs de comparaison"]
            },
            {
                title: "4. Cas Pratique",
                description: "Trouver le mot de passe correct.",
                order: 4,
                content: "Utilisation d'une boucle TANT QUE : Tant que le mot de passe est faux, redemander la saisie. Ajout d'un compteur d'essais pour la sécurité.",
                objectives: ["Combiner boucles et conditions"]
            },
            {
                title: "5. Exercice",
                description: "Afficher les nombres pairs de 1 à 100.",
                order: 5,
                content: "Utilisez une boucle POUR et la condition du Modulo (%) pour n'afficher que les nombres divisibles par 2.",
                objectives: ["Pratiquer l'itération filtrée"]
            }
        ]
    },
    {
        id: "algo-niveau-interm-diaire",
        title: "Algorithmique - Niveau Intermédiaire",
        description: "Modularité et Tableaux. Apprenez à organiser votre pensée et à gérer des listes.",
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
                title: "1. Vision Globale : Diviser pour régner",
                description: "La modularité comme solution à la complexité.",
                order: 1,
                content: "Un gros problème se résout en le découpant en petits modules (Fonctions). C'est la base de l'architecture logicielle.",
                objectives: ["Comprendre la modularité"]
            },
            {
                title: "2. Concept : Fonctions & Tableaux",
                description: "Organisation et stockage de masse.",
                order: 2,
                content: "Une fonction reçoit des paramètres et retourne un résultat. Un tableau permet de stocker des milliers de données sous un seul nom.",
                objectives: ["Créer des fonctions", "Parcourir des tableaux"]
            },
            {
                title: "3. Exemple Concret",
                description: "Gestion d'une liste de noms.",
                order: 3,
                content: "Stockez 10 prénoms dans un tableau. Utilisez une boucle pour les afficher tous avec un message de bienvenue personnalisé.",
                objectives: ["Manipuler les données indexées"]
            },
            {
                title: "4. Cas Pratique",
                description: "La fonction 'Additionneur'.",
                order: 4,
                content: "Créez une fonction qui prend deux nombres et renvoie leur somme. Appelez cette fonction plusieurs fois avec des valeurs différentes.",
                objectives: ["Pratiquer la réutilisation de code"]
            },
            {
                title: "5. Exercice",
                description: "Trouver le maximum dans un tableau.",
                order: 5,
                content: "Écrivez un algorithme qui parcourt un tableau de nombres et identifie la valeur la plus élevée. Indice : Utilisez une variable 'max' comparée à chaque élément.",
                objectives: ["Maîtriser le parcours algorithmique"]
            }
        ]
    }
];
];

module.exports = algoCourses;
