const mysqlCourses = [
    {
        id: "mysql-niveau-d-butant",
        title: "MySQL - Niveau Débutant",
        description: "Bases du stockage relationnel.",
        category: "Data",
        level: "Débutant",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "sql",
        isFree: true,
        tags: ["sql", "mysql"],
        chapters: [
            { title: "1. Vision Globale : Les tables", description: "Organiser la donnée.", order: 1, content: "Tout est stocké dans des tables.", objectives: ["Comprendre le relationnel"] },
            { title: "2. Concept : SELECT & WHERE", description: "Lire la donnée.", order: 2, content: "SELECT * FROM users.", objectives: ["Rechercher des infos"] },
            { title: "3. Exemple Concret : Filtres", description: "Affiner la recherche.", order: 3, content: "Utilisez AND, OR, NOT.", objectives: ["Cibler les résultats"] },
            { title: "4. Cas Pratique : Insertion", description: "Nouveaux enregistrements.", order: 4, content: "Utilisez INSERT INTO.", objectives: ["Ajouter des données"] },
            { title: "5. Exercice : Carnet d'adresses", description: "CRUD basique.", order: 5, content: "Gérez une table de contacts.", objectives: ["Manipuler les données"] }
        ]
    },
    {
        id: "mysql-niveau-moyen",
        title: "MySQL - Niveau Moyen",
        description: "Jointures et Relations. Reliez vos données.",
        category: "Data",
        level: "Intermédiaire",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "sql",
        isFree: true,
        tags: ["sql", "join"],
        chapters: [
            { title: "1. Vision Globale : Le Relationnel", description: "Pourquoi plusieurs tables ?", order: 1, content: "Évitez la redondance via les clés étrangères.", objectives: ["Comprendre la normalisation"] },
            { title: "2. Concept : INNER JOIN", description: "Fusionner pour lire.", order: 2, content: "Récupérez les articles et leurs auteurs.", objectives: ["Maîtriser les jointures simples"] },
            { title: "3. Exemple Concret : LEFT & RIGHT JOIN", description: "Gérer les manques.", order: 3, content: "Affichez tous les clients, même sans commande.", objectives: ["Gérer les données facultatives"] },
            { title: "4. Cas Pratique : Fonctions d'agrégation", description: "Compter et Grouper.", order: 4, content: "Utilisez COUNT, SUM, AVG avec GROUP BY.", objectives: ["Produire des statistiques"] },
            { title: "5. Exercice : Rapport de ventes", description: "Synthèse commerciale.", order: 5, content: "Calculez le chiffre d'affaires par produit.", objectives: ["Analyser les données métier"] }
        ]
    },
    {
        id: "mysql-niveau-interm-diaire",
        title: "MySQL - Niveau Intermédiaire",
        description: "Optimisation et Sous-requêtes.",
        category: "Data",
        level: "Intermédiaire",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        language: "sql",
        isFree: true,
        tags: ["sql", "index", "expert"],
        chapters: [
            { title: "1. Vision Globale : La Performance", description: "Vitesse de recherche.", order: 1, content: "Le temps de réponse dépend de l'optimisation.", objectives: ["Identifier les lenteurs"] },
            { title: "2. Concept : Les Index", description: "Le sommaire de la table.", order: 2, content: "Utilisez CREATE INDEX pour booster les SELECT.", objectives: ["Maîtriser l'indexation"] },
            { title: "3. Exemple Concret : Sous-requête complexe", description: "Requêtes dans les requêtes.", order: 3, content: "Validez des données par rapport à un autre set.", objectives: ["Utiliser les sous-requêtes"] },
            { title: "4. Cas Pratique : Transactions (ACID)", description: "Sécurité atomique.", order: 4, content: "Assurez que l'argent est soit viré, soit rien du tout.", objectives: ["Vouloir l'intégrité totale"] },
            { title: "5. Exercice : Audit de sécurité", description: "Vérification des droits.", order: 5, content: "Gérez les permissions GRANT et REVOKE.", objectives: ["Sécuriser l'accès BDD"] }
        ]
    },
    {
        id: "mysql-niveau-expert",
        title: "MySQL - Niveau Expert",
        description: "Procédures Stockées et Administration avancée.",
        category: "Data",
        level: "Avancé",
        duration: "50 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "sql",
        isFree: true,
        tags: ["sql", "admin", "expert"],
        chapters: [
            { title: "1. Vision Globale : DB Administration", description: "Gérer le serveur SQL.", order: 1, content: "Apprenez le tuning de configuration My.cnf.", objectives: ["Administrer un serveur SQL"] },
            { title: "2. Concept : Triggers & Procedures", description: "Automatisation interne.", order: 2, content: "Faites du code DANS la base de données.", objectives: ["Maîtriser la logique interne"] },
            { title: "3. Exemple Concret : Backup automatique", description: "Plan de secours.", order: 3, content: "Planifiez des exports MySQLDump propres.", objectives: ["Assurer la pérennité des data"] },
            { title: "4. Cas Pratique : Réplication & Clusters", description: "Haute disponibilité.", order: 4, content: "Mettez en place un mirroir (Slave/Master).", objectives: ["Éviter les pannes de service"] },
            { title: "5. Exercice : Migration d'un million de lignes", description: "Synthèse de l'expertise.", order: 5, content: "Alternez structure sans perdre une seconde de service.", objectives: ["Gérer le Big Data SQL"] }
        ]
    }
];

module.exports = mysqlCourses;
