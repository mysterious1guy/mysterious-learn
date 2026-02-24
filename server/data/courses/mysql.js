const mysqlCourses = [
    {
        id: "mysql-niveau-d-butant",
        title: "MySQL - Niveau Débutant",
        description: "Maîtrisez le langage universel des données. Apprenez le SQL standard, la création de tables et les requêtes de sélection fondamentales pour parler aux serveurs.",
        category: "Bases de données",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        rating: 4.8,
        language: "french",
        isFree: true,
        tags: ["SQL", "MySQL", "RDBMS", "Bases de données"],
        chapters: [
            {
                title: "1. Introduction au SGBDR & SQL",
                description: "Le concept de base de données relationnelle et les tables.",
                order: 1,
                duration: "7 heures",
                content: "MySQL est un système de gestion de bases de données relationnelles (SGBDR). Apprenez à structurer vos données dans des tables rigides composées de colonnes (types) et de lignes. Découvrez le langage SQL.",
                objectives: ["Comprendre le modèle relationnel", "Installer MySQL Server", "Utiliser la ligne de commande MySQL"],
                resources: []
            },
            {
                title: "2. Requêtes de Sélection Simple (SELECT)",
                description: "Apprenez à extraire des données avec précision.",
                order: 2,
                duration: "8 heures",
                content: "Maîtrisez le `SELECT`. Apprenez à filtrer avec `WHERE`, à trier avec `ORDER BY` et à limiter vos résultats avec `LIMIT`. C'est le pain quotidien de tout développeur.",
                objectives: ["Extraire des colonnes spécifiques", "Filtrer avec des opérateurs logiques", "Trier les résultats"],
                resources: []
            }
        ]
    },
    {
        id: "mysql-niveau-interm-diaire",
        title: "MySQL - Niveau Moyen",
        description: "L'art de la relation. Maîtrisez les jointures, les contraintes d'intégrité et la modification de données en production.",
        category: "Bases de données",
        level: "Moyen",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        rating: 4.9,
        language: "french",
        isFree: true,
        tags: ["Jointures", "Inner Join", "Update", "Delete"],
        chapters: [
            {
                title: "1. Jointures (JOIN) & Relations",
                description: "Connectez vos tables entre elles via les clés étrangères.",
                order: 1,
                duration: "12 heures",
                content: "Une base SQL prend tout son sens quand on lie les données. Maîtrisez `INNER JOIN`, `LEFT JOIN` et comprenez les relations 1:n et n:m via les clés primaires et étrangères.",
                objectives: ["Combiner plusieurs tables", "Maîtriser les alias", "Comprendre l'intégrité référentielle"],
                resources: []
            },
            {
                title: "2. Manipulation & Mise à jour (DML)",
                description: "Modifiez vos enregistrements sans tout casser.",
                order: 2,
                duration: "8 heures",
                content: "Apprenez à utiliser `INSERT INTO`, `UPDATE` avec des clauses WHERE strictes, et la suppression propre via `DELETE`. Découvrez l'importance des transactions de base.",
                objectives: ["Insérer et modifier des données", "Éviter les UPDATE sans WHERE", "Utiliser les fonctions scalaires"],
                resources: []
            }
        ]
    },
    {
        id: "mysql-niveau-avanc",
        title: "MySQL - Niveau Intermédiaire",
        description: "L'ingénierie des rapports massifs. Maîtrisez les fonctions d'agrégation, les sous-requêtes et l'optimisation par index.",
        category: "Bases de données",
        level: "Intermédiaire",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        rating: 4.9,
        language: "french",
        isFree: true,
        tags: ["Agrégation", "Index", "Performance"],
        chapters: [
            {
                title: "1. Agrégation & Statistiques",
                description: "Tirez des conclusions chiffrées de vos millions de lignes.",
                order: 1,
                duration: "13 heures",
                content: "Maîtrisez `GROUP BY`, `HAVING` et les fonctions d'agrégation comme `COUNT()`, `SUM()`, `AVG()`. Apprenez à créer des rapports complexes directement en SQL.",
                objectives: ["Calculer des moyennes et totaux", "Filtrer des groupes de données", "Utiliser les sous-requêtes"],
                resources: []
            },
            {
                title: "2. Index & Optimisation",
                description: "Rendez votre base de données capable de répondre en millisecondes.",
                order: 2,
                duration: "12 heures",
                content: "Comprenez le fonctionnement d'un index B-Tree. Apprenez à utiliser `EXPLAIN` pour voir comment MySQL exécute votre requête et comment créer des index performants.",
                objectives: ["Vaincre la lenteur des requêtes", "Maîtriser les index composés", "Déchiffrer le plan d'exécution"],
                resources: []
            }
        ]
    },
    {
        id: "mysql-niveau-expert",
        title: "MySQL - Niveau Expert",
        description: "Architecture de production et administration. Triggers, procédures stockées et réplication industrielle.",
        category: "Bases de données",
        level: "Expert",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["Triggers", "Stored Procedures", "Administration"],
        chapters: [
            {
                title: "1. Automatisation (Triggers & Procedures)",
                description: "Codez la logique métier directement dans la base de données.",
                order: 1,
                duration: "15 heures",
                content: "Apprenez à créer des `Triggers` pour automatiser des actions sur les données et des `Stored Procedures` pour encapsuler des opérations complexes.",
                objectives: ["Sécuriser les données via Triggers", "Écrire des procédures stockées", "Gérer les variables en SQL"],
                resources: []
            },
            {
                title: "2. Administration & Scaling",
                description: "Gérez les utilisateurs, les backups et la réplication.",
                order: 2,
                duration: "15 heures",
                content: "Apprenez à gérer les privilèges utilisateurs (`GRANT`), à effectuer des backups à chaud et découvrez le concept de réplication Master-Slave pour la haute disponibilité.",
                objectives: ["Sécuriser l'accès à la base", "Maîtriser mysqldump", "Notions de réplication"],
                resources: []
            }
        ]
    }
];

module.exports = mysqlCourses;
