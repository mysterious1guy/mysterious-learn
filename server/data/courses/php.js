const phpCourses = [
    {
        id: "php-niveau-d-butant",
        title: "PHP - Niveau Débutant",
        description: "Le moteur du Web dynamique.",
        category: "Programmation",
        level: "Débutant",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.7,
        language: "php",
        isFree: true,
        tags: ["php", "web"],
        chapters: [
            { title: "1. Vision Globale : Le PHP", description: "Serveur vs Client.", order: 1, content: "PHP génère du HTML.", objectives: ["Comprendre le workflow"] },
            { title: "2. Concept : Variables & Echo", description: "Afficher des infos.", order: 2, content: "Utilisez echo $var;.", objectives: ["Manipuler les variables"] },
            { title: "3. Exemple Concret : Date", description: "Heure réelle.", order: 3, content: "Utilisez date('H:i');.", objectives: ["Utiliser les fonctions"] },
            { title: "4. Cas Pratique : Inclusions", description: "Réutiliser son code.", order: 4, content: "Utilisez include ou require.", objectives: ["Modulariser son site"] },
            { title: "5. Exercice : Hello User", description: "Interaction simple.", order: 5, content: "Demandez un nom et saluez l'utilisateur.", objectives: ["Lier HTML et PHP"] }
        ]
    },
    {
        id: "php-niveau-moyen",
        title: "PHP - Niveau Moyen",
        description: "Logique, Tableaux et Fonctions.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "35 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "php",
        isFree: true,
        tags: ["php", "loops", "arrays"],
        chapters: [
            { title: "1. Vision Globale : Structures Algo", description: "Le cerveau du serveur.", order: 1, content: "Maîtrisez if/else et while.", objectives: ["Implémenter la logique"] },
            { title: "2. Concept : Tableaux Associatifs", description: "Clé => Valeur.", order: 2, content: "Gérez des dictionnaires de données.", objectives: ["Manipuler des tableaux complexes"] },
            { title: "3. Exemple Concret : Liste dynamique", description: "Foreach magique.", order: 3, content: "Utilisez foreach pour afficher une liste d'articles.", objectives: ["Parcourir les données"] },
            { title: "4. Cas Pratique : Fonctions perso", description: "Propreté du code.", order: 4, content: "Créez vos propres fonctions avec paramètres.", objectives: ["Factoriser le code"] },
            { title: "5. Exercice : Système de notes", description: "Synthèse logique.", order: 5, content: "Calculez la moyenne d'un élève via un tableau.", objectives: ["Appliquer l'algo en PHP"] }
        ]
    },
    {
        id: "php-niveau-interm-diaire",
        title: "PHP - Niveau Intermédiaire",
        description: "Base de données et PDO. Créez des sites persistants.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        language: "php",
        isFree: true,
        tags: ["php", "mysql", "pdo"],
        chapters: [
            { title: "1. Vision Globale : Persistance des data", description: "Stocker pour de bon.", order: 1, content: "Reliez PHP à une base de données MySQL.", objectives: ["Comprendre le stack LAMP"] },
            { title: "2. Concept : PDO (PHP Data Objects)", description: "Sécurité et abstraction.", order: 2, content: "Utilisez PDO pour éviter les injections SQL.", objectives: ["Sécuriser ses requêtes"] },
            { title: "3. Exemple Concret : Login System", description: "Sessions et Cookies.", order: 3, content: "Gérez l'authentification avec $_SESSION.", objectives: ["Gérer l'état utilisateur"] },
            { title: "4. Cas Pratique : Upload d'images", description: "Gestion de fichiers.", order: 4, content: "Apprenez à uploader et stocker des fichiers images.", objectives: ["Manipuler le système de fichiers"] },
            { title: "5. Exercice : Mini-Blog", description: "Synthèse projet.", order: 5, content: "Affichez des articles stockés dans la BDD.", objectives: ["Récurrences CRUD Web"] }
        ]
    },
    {
        id: "php-niveau-expert",
        title: "PHP - Niveau Expert",
        description: "Programmation Orientée Objet et Architecture.",
        category: "Programmation",
        level: "Avancé",
        duration: "50 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "php",
        isFree: true,
        tags: ["php", "oop", "expert"],
        chapters: [
            { title: "1. Vision Globale : POO Moderne", description: "L'ère des frameworks.", order: 1, content: "Apprenez les classes, objets et namespaces.", objectives: ["Maîtriser le paradigme objet"] },
            { title: "2. Concept : Héritage & Interfaces", description: "Solidité du code.", order: 2, content: "Utilisez extends et implements pour structurer le code.", objectives: ["Concevoir des architectures robustes"] },
            { title: "3. Exemple Concret : Gestionnaire de Mail", description: "Design Patterns.", order: 3, content: "Utilisez le pattern Singleton ou Factory.", objectives: ["Appliquer des patterns pro"] },
            { title: "4. Cas Pratique : Composer & APIs", description: "L'écosystème pro.", order: 4, content: "Apprenez à gérer les dépendances externes.", objectives: ["Intégrer des librairies modernes"] },
            { title: "5. Exercice : Création d'un mini-moteur MVC", description: "Synthèse de l'expertise.", order: 5, content: "Séparez Logique, Modèle et Vue.", objectives: ["Bâtir un système pro"] }
        ]
    }
];

module.exports = phpCourses;
