const pythonCourses = [
    {
        id: "python-niveau-d-butant",
        title: "Python - Niveau Débutant",
        description: "Apprenez le langage le plus populaire au monde. Une syntaxe claire pour un code propre.",
        category: "Programmation",
        level: "Débutant",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=800&q=80",
        rating: 4.8,
        language: "python",
        isFree: true,
        tags: ["python", "bash", "débutant"],
        chapters: [
            {
                title: "1. Vision Globale : Le Zen de Python",
                description: "La lisibilité avant tout.",
                order: 1,
                content: "Python est conçu pour être lu comme de l'anglais. Pas d'accolades, tout repose sur l'indentation. C'est le langage idéal pour l'IA et le scripting.",
                objectives: ["Découvrir la philosophie Python"]
            },
            {
                title: "2. Concept : Indentation & Typage",
                description: "Les règles du jeu.",
                order: 2,
                content: "En Python, l'espace en début de ligne définit le bloc de code. Les variables sont dynamiques : `x = 5` suffit pour créer un entier.",
                objectives: ["Maîtriser l'indentation", "Déclarer des variables"]
            },
            {
                title: "3. Exemple Concret : Manipulation de listes",
                description: "Les tableaux ultra-flexibles.",
                order: 3,
                content: "Créez une liste `fruits = ['pomme', 'banane']`. Utilisez `append()` pour ajouter et le 'slicing' `[0:1]` pour découper.",
                objectives: ["Gérer des collections basiques"]
            },
            {
                title: "4. Cas Pratique : Analyseur de texte",
                description: "Travailler avec les chaînes.",
                order: 4,
                content: "Comptez le nombre de mots dans une phrase en utilisant `.split()` et la fonction `len()`. Affichez le résultat avec une f-string.",
                objectives: ["Manipuler les Strings"]
            },
            {
                title: "5. Exercice : Le Juste Prix",
                description: "Conditions et Boucles.",
                order: 5,
                content: "Créez un script qui demande un nombre jusqu'à ce que l'utilisateur trouve le bon. Utilisez `while` et `if`.",
                objectives: ["Combiner entrée utilisateur et logique"]
            }
        ]
    },
    {
        id: "python-niveau-moyen",
        title: "Python - Niveau Moyen",
        description: "Devenez Ingénieur Logiciel. Modélisez votre code via l'Orienté Objet.",
        category: "Programmation",
        level: "Moyen",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        language: "python",
        isFree: true,
        tags: ["python", "oop", "moyen"],
        chapters: [
            {
                title: "1. Vision Globale : Le monde des Objets",
                description: "Tout est objet en Python.",
                order: 1,
                content: "En Python, même un nombre est un objet. L'Orienté Objet (POO) permet d'organiser le code comme des briques réutilisables.",
                objectives: ["Comprendre le paradigme POO"]
            },
            {
                title: "2. Concept : Classes & Self",
                description: "Le plan et la construction.",
                order: 2,
                content: "Une `class` est un plan. L'instance est l'objet créé. Le `self` représente l'objet lui-même au sein de ses méthodes.",
                objectives: ["Définir des classes", "Utiliser __init__"]
            },
            {
                title: "3. Exemple Concret : Gestionnaire de Stock",
                description: "Une classe Produit.",
                order: 3,
                content: "Créez une classe avec des attributs `nom` et `prix`. Ajoutez une méthode `afficher_details()` pour imprimer les infos.",
                objectives: ["Instancier des objets"]
            },
            {
                title: "4. Cas Pratique : Système Bancaire",
                description: "Encapsulation et méthodes.",
                order: 4,
                content: "Créez une classe CompteBancaire avec des méthodes `deposer()` et `retirer()`. Gérez les erreurs de solde insuffisant.",
                objectives: ["Gérer l'état interne d'un objet"]
            },
            {
                title: "5. Exercice : Bibliothèque Digitale",
                description: "Collections d'objets.",
                order: 5,
                content: "Créez une classe Livre et une classe Bibliotheque qui contient une liste de livres. Implémentez une recherche par auteur.",
                objectives: ["Faire interagir plusieurs classes"]
            }
        ]
    },
    {
        id: "python-niveau-interm-diaire",
        title: "Python - Niveau Intermédiaire",
        description: "Subjuguez le langage. Apprenez les décorateurs et la gestion asynchrone.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        language: "python",
        isFree: true,
        tags: ["python", "async", "intermédiaire"],
        chapters: [
            {
                title: "1. Vision Globale : Métaprogrammation",
                description: "Le code qui modifie le code.",
                order: 1,
                content: "Les décorateurs permettent d'ajouter des fonctionnalités à des fonctions existantes sans modifier leur code source.",
                objectives: ["Comprendre les Wrappers"]
            },
            {
                title: "2. Concept : Décorateurs & @",
                description: "Syntaxe et puissance.",
                order: 2,
                content: "Utilisez le symbole `@nom_decorateur`. Apprenez à créer des fonctions qui prennent des fonctions en argument.",
                objectives: ["Écrire ses propres décorateurs"]
            },
            {
                title: "3. Exemple Concret : Timer de fonction",
                description: "Mesurer la performance.",
                order: 3,
                content: "Créez un décorateur qui calcule le temps d'exécution d'une fonction et l'affiche à la fin du traitement.",
                objectives: ["Appliquer les décorateurs à l'opti"]
            },
            {
                title: "4. Cas Pratique : Gestionnaire de contexte",
                description: "Le mot-clé 'with'.",
                order: 4,
                content: "Apprenez à utiliser `with open()`. Créez votre propre gestionnaire via `__enter__` et `__exit__` pour gérer les ressources.",
                objectives: ["Assurer la libération des ressources"]
            },
            {
                title: "5. Exercice : Client API Asynchrone",
                description: "AsyncIO pour la rapidité.",
                order: 5,
                content: "Utilisez `async` et `await` pour lancer plusieurs requêtes réseau en parallèle sans bloquer votre programme principal.",
                objectives: ["Maîtriser la concurrence I/O"]
            }
        ]
    },
    {
        id: "python-niveau-expert",
        title: "Python - Niveau Expert",
        description: "Ingénierie de pointe. Optimisation, GIL et Multiprocessing massif.",
        category: "Programmation",
        level: "Expert",
        duration: "60 heures",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        rating: 5.0,
        language: "python",
        isFree: true,
        tags: ["python", "expert", "GIL"],
        chapters: [
            {
                title: "1. Vision Globale : Les entrailles de CPython",
                description: "Comment Python tourne sous le capot.",
                order: 1,
                content: "Comprendre le Global Interpreter Lock (GIL) et pourquoi c'est un goulot d'étranglement pour le calcul pur.",
                objectives: ["Analyser les limites du runtime"]
            },
            {
                title: "2. Concept : Multiprocessing vs Threading",
                description: "Parallélisme réel.",
                order: 2,
                content: "Utilisez le module `multiprocessing` pour contourner le GIL en créant des processus OS séparés sur chaque cœur de votre CPU.",
                objectives: ["Exploiter toute la puissance du CPU"]
            },
            {
                title: "3. Exemple Concret : Calcul distribué",
                description: "Optimisation de boucles lourdes.",
                order: 3,
                content: "Prenez un calcul mathématique complexe et divisez-le en 8 tâches tournant simultanément sur vos 8 cœurs logiques.",
                objectives: ["Mesurer le gain de performance"]
            },
            {
                title: "4. Cas Pratique : Gestion de mémoire (Slots)",
                description: "Réduction massive de l'empreinte RAM.",
                order: 4,
                content: "Utilisez `__slots__` dans vos classes pour supprimer le dictionnaire dynamique et économiser des centaines de Mo sur des millions d'objets.",
                objectives: ["Optimiser l'usage mémoire"]
            },
            {
                title: "5. Exercice : Création d'un mini-Framework",
                description: "Synthèse de l'expertise.",
                order: 5,
                content: "Concevez un système de routage ou un mini-moteur de templates utilisant des métaclasses ou des décorateurs complexes.",
                objectives: ["Architecturer des systèmes complexes"]
            }
        ]
    }
];

module.exports = pythonCourses;
