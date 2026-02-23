const mysqlCourses = [
    {
        title: "MySQL - Niveau Débutant : Maîtriser le SQL Fondamental",
        description: "Apprenez le langage universel des données. De la création de tables aux requêtes de sélection complexes, forgez les bases de votre carrière de développeur backend.",
        category: "Data",
        level: "Débutant",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        rating: 4.8,
        students: 15400,
        language: "mysql",
        isFree: true,
        tags: ["MySQL", "SQL", "Data", "relationnel", "débutant", "backend"],
        chapters: [
            {
                title: "Chapitre 1 : Le Modèle Relationnel et Conception de Schéma",
                description: "Comprenez pourquoi le SQL domine le monde. Apprenez à structurer des Tables, Lignes et Colonnes avec précision.",
                order: 1,
                duration: "6 heures",
                content: "MySQL est un SGBDR (Système de Gestion de Bases de Données Relationnelles). Contrairement au vrac du NoSQL, ici tout est structuré. Nous explorerons les types de données fondamentaux : `INT` pour les calculs, `VARCHAR` pour le texte variable, `DATETIME` pour le temps. Vous apprendrez le concept vital de **Clé Primaire (Primary Key)** : l'identifiant unique et immuable de chaque ligne. Nous aborderons également l'auto-incrémentation pour automatiser la gestion des IDs.",
                objectives: ["Installer et se connecter à un serveur MySQL (Workbench/CLI)", "Créer une base de données et sa première table", "Choisir les types de colonnes optimaux pour la mémoire"],
                exercises: [
                    {
                        title: "La Table Utilisateurs",
                        description: "Écrivez la requête `CREATE TABLE` pour une table 'users' avec un id auto-incrémenté, un email unique de 100 caractères, et une date de création par défaut.",
                        difficulty: "Facile",
                        solution: "CREATE TABLE users (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(100) UNIQUE NOT NULL,\n  created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n);",
                        hints: ["N'oubliez pas les contraintes NOT NULL pour les champs obligatoires."]
                    }
                ],
                resources: [{ title: "SQL Basics: The Relational Model", type: "article", url: "https://sqlbolt.com/" }]
            },
            {
                title: "Chapitre 2 : Manipulation de Données (CRUD) et Filtrage WHERE",
                description: "Le cœur de l'interaction : Insérer, Lire, Mettre à jour et Supprimer des données avec des conditions strictes.",
                order: 2,
                duration: "8 heures",
                content: "Tout développeur doit maîtriser les 4 verbes SQL. `INSERT INTO` pour alimenter, `SELECT` pour interroger. Nous étudierons en profondeur la clause `WHERE` et ses opérateurs (`=`, `<>`, `>`, `LIKE`, `IN`). **Attention :** Un `UPDATE` ou un `DELETE` sans `WHERE` est une catastrophe professionnelle qui efface ou modifie l'intégralité de la base. Vous apprendrez à utiliser l'opérateur `AND` et `OR` pour des filtrages multi-critères chirurgicaux.",
                objectives: ["Insérer plusieurs lignes en une seule requête", "Utiliser le wildcard % avec LIKE pour les recherches textuelles", "Effectuer des mises à jour sécurisées sur des IDs spécifiques"],
                exercises: [
                    {
                        title: "Le Filtre de Mail",
                        description: "Écrivez un SELECT pour trouver tous les utilisateurs dont l'email finit par '@gmail.com'.",
                        difficulty: "Facile",
                        solution: "SELECT * FROM users WHERE email LIKE '%@gmail.com';",
                        hints: ["Le signe % représente n'importe quelle suite de caractères."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Tri, Limitation et Pagination de Résultats",
                description: "Contrôlez l'affichage de vos données. Apprenez à trier par date, par prix et à paginer pour le web.",
                order: 3,
                duration: "8 heures",
                content: "Sur un site web, on n'affiche jamais 1 million de lignes d'un coup. Nous utiliserons `ORDER BY` pour classer (ASC/DESC) et `LIMIT` pour restreindre. Vous apprendrez la technique de l'**Offset** pour créer une pagination (ex: afficher les résultats 20 à 40). Nous aborderons également l'utilisation de `DISTINCT` pour supprimer les doublons visuels dans vos sélections.",
                objectives: ["Classer des produits par prix décroissant", "Implémenter une logique de pagination SQL via LIMIT/OFFSET", "Éviter les doublons dans les rapports avec DISTINCT"],
                exercises: [
                    {
                        title: "Les 5 Derniers Inscrits",
                        description: "Sélectionnez l'email des 5 derniers utilisateurs inscrits dans la table (basé sur l'id ou la date).",
                        difficulty: "Moyen",
                        solution: "SELECT email FROM users ORDER BY created_at DESC LIMIT 5;",
                        hints: ["Trier par date descendante met les plus récents en premier."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Fonctions d'Agrégation et Groupement (GROUP BY)",
                description: "Devenez un analyste de données. Apprenez à compter, additionner et moyenner des millions de lignes instantanément.",
                order: 4,
                duration: "8 heures",
                content: "Le SQL n'est pas qu'un stockage, c'est un moteur de calcul. Nous étudierons les fonctions d'agrégation : `COUNT()` pour dénombrer, `SUM()` pour totaliser, `AVG()` pour la moyenne, `MIN/MAX` pour les bornes. La puissance décuple avec `GROUP BY`, qui permet de sortir des statistiques par catégorie (ex: 'Chiffre d'affaires par pays'). Vous apprendrez la différence cruciale entre `WHERE` (filtre avant calcul) et `HAVING` (filtre après agrégation).",
                objectives: ["Compter le nombre d'utilisateurs par domaine de mail", "Calculer le panier moyen d'une table de commandes", "Utiliser HAVING pour filtrer les groupes ayant plus de X éléments"],
                exercises: [
                    {
                        title: "Stats par Catégorie",
                        description: "Soit une table 'produits' avec une colonne 'categorie'. Comptez combien de produits il y a dans chaque catégorie.",
                        difficulty: "Moyen",
                        solution: "SELECT categorie, COUNT(*) FROM produits GROUP BY categorie;",
                        hints: ["Chaque colonne sélectionnée qui n'est pas agrégée doit figurer dans le GROUP BY."]
                    }
                ],
                resources: [{ title: "SQL Aggregate Functions", type: "video", url: "https://www.youtube.com/embed/zbMHLJ0" }]
            }
        ]
    },
    {
        title: "MySQL - Niveau Intermédiaire : Jointures & Relations",
        description: "Exploitez la puissance du relationnel. Apprenez à lier les tables entre elles, à garantir l'intégrité des données et à construire des schémas de données complexes.",
        category: "Data",
        level: "Intermédiaire",
        duration: "45 heures",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        rating: 4.8,
        students: 11000,
        language: "mysql",
        isFree: true,
        tags: ["MySQL", "Jointures", "FOREIGN KEY", "intermédiaire", "DB Design"],
        chapters: [
            {
                title: "Chapitre 1 : Clés Étrangères et Intégrité Référentielle",
                description: "Le ciment de vos données. Apprenez à lier un article à son auteur et à empêcher les orphelins dans votre DB.",
                order: 1,
                duration: "10 heures",
                content: "Une **Clé Étrangère (Foreign Key)** est une colonne qui pointe vers la Clé Primaire d'une autre table. C'est ce qui crée la 'Relation'. Nous étudierons les contraintes d'intégrité : que se passe-t-il si on supprime un parent ? Vous apprendrez à configurer le `ON DELETE CASCADE` (suppression automatique des enfants) ou `ON DELETE SET NULL` pour maintenir une base de données cohérente et sans erreurs de pointeurs logiques.",
                objectives: ["Concevoir une relation One-to-Many (Un vers Plusieurs)", "Mettre en place des contraintes de clés étrangères robustes", "Comprendre les moteurs de stockage (InnoDB vs MyISAM)"],
                exercises: [
                    {
                        title: "Liaison Article/Auteur",
                        description: "Créez une table 'articles' possédant une clé étrangère 'user_id' pointant vers 'users.id'.",
                        difficulty: "Moyen",
                        solution: "CREATE TABLE articles (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  titre VARCHAR(200),\n  user_id INT,\n  FOREIGN KEY (user_id) REFERENCES users(id)\n);",
                        hints: ["Le type de la clé étrangère doit être strictement identique à celui de la clé primaire référencée."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 2 : Les Jointures (INNER, LEFT, RIGHT JOIN)",
                description: "Reconstruisez l'information éclatée. Fusionnez plusieurs tables en une seule vue logique pour vos applications.",
                order: 2,
                duration: "14 heures",
                content: "Le SQL prend tout son sens avec les jointures. `INNER JOIN` pour ne garder que les correspondances parfaites. `LEFT JOIN` pour garder tout le côté gauche, même sans correspondance (très utile pour lister tous les inscrits, même ceux sans message). Vous apprendrez à utiliser les **Alias** (`AS`) pour simplifier vos requêtes et à lever l'ambiguïté des colonnes ayant le même nom dans deux tables différentes.",
                objectives: ["Maîtriser la condition ON pour fusionner les lignes", "Identifier les cas d'usage du LEFT JOIN (détection de données manquantes)", "Réaliser des jointures sur 3 tables ou plus"],
                exercises: [
                    {
                        title: "Liste des Commandes Client",
                        description: "Affichez le 'nom' du client et la 'date_commande' via une jointure INNER JOIN entre 'clients' et 'commandes'.",
                        difficulty: "Moyen",
                        solution: "SELECT c.nom, o.date_commande \nFROM clients AS c \nINNER JOIN commandes AS o ON c.id = o.client_id;",
                        hints: ["Utilisez des alias courts (c, o) pour une requête plus lisible."]
                    }
                ],
                resources: [{ title: "Visualizing SQL Joins", type: "article", url: "https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/" }]
            },
            {
                title: "Chapitre 3 : Sous-requêtes et Opérateurs d'Ensemble",
                description: "Des requêtes dans des requêtes. Apprenez à utiliser le résultat d'un SELECT comme filtre pour un autre.",
                order: 3,
                duration: "11 heures",
                content: "Parfois, une simple jointure ne suffit pas. Nous étudierons les **Sous-requêtes** scalaires et de liste (`WHERE id IN (SELECT ...)`). Vous apprendrez à utiliser les opérateurs d'ensemble comme `UNION` pour fusionner les résultats de deux tables différentes (ex: fusionner une table 'clients' et 'prospects' pour un envoi de mail groupé).",
                objectives: ["Filtrer des données en fonction d'un calcul dynamique externe", "Utiliser UNION et UNION ALL correctement", "Comprendre les sous-requêtes corrélées (performance warning)"],
                exercises: [
                    {
                        title: "Moyenne Supérieure",
                        description: "Sélectionnez les produits dont le prix est strictement supérieur à la moyenne de tous les prix.",
                        difficulty: "Difficile",
                        solution: "SELECT * FROM produits WHERE prix > (SELECT AVG(prix) FROM produits);",
                        hints: ["La sous-requête entre parenthèses est calculée en premier."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Vues (VIEWS) et Procédures Stockées de base",
                description: "Simplifiez la complexité. Enregistrez vos requêtes les plus lourdes sous forme de tables virtuelles.",
                order: 4,
                duration: "10 heures",
                content: "Si vous tapez une jointure complexe de 20 lignes tous les jours, il est temps de créer une **Vue (`VIEW`)**. Une vue agit comme une table virtuelle sécurisée, masquant la complexité du schéma réel aux développeurs frontend. Nous introduirons également les **Procédures Stockées**, permettant d'exécuter des blocs de logique directement dans le moteur de la base de données pour une performance optimale.",
                objectives: ["Créer et maintenir des Vues SQL", "Sécuriser les données sensibles via des vues restreintes", "Comprendre l'intérêt des procédures pour l'automatisation"],
                exercises: [
                    {
                        title: "Création de Vue Rapport",
                        description: "Créez une vue 'v_rapport_ventes' qui contient le nom du produit et le total des ventes associées.",
                        difficulty: "Moyen",
                        solution: "CREATE VIEW v_rapport_ventes AS \nSELECT p.nom, SUM(v.total) \nFROM produits p JOIN ventes v ON p.id = v.produit_id GROUP BY p.nom;",
                        hints: ["Une vue se consulte ensuite comme une simple table : SELECT * FROM v_rapport_ventes;"]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        title: "MySQL - Niveau Expert Mondiale : Performance & Administration",
        description: "Devenez un Database Engineer (DBA). Maîtrisez les Transactions ACID, les Triggers, l'indexation B-Tree et l'optimisation de requêtes à haut trafic.",
        category: "Data",
        level: "Avancé",
        duration: "65 heures",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        rating: 4.9,
        students: 6500,
        language: "mysql",
        isFree: true,
        tags: ["MySQL", "Transactions", "Triggers", "avancé", "ACID", "Index", "High Performance"],
        chapters: [
            {
                title: "Chapitre 1 : Transactions et Propriétés ACID",
                description: "Le rempart contre la corruption de données. Apprenez ce qui rend une base de données 'industrielle'.",
                order: 1,
                duration: "15 heures",
                content: "Imaginez un virement bancaire : si le débit réussit mais que le crédit échoue à cause d'une panne, l'argent s'évapore. C'est là qu'interviennent les **Transactions**. Nous étudierons les 4 piliers **ACID** (Atomicité, Cohérence, Isolation, Durabilité). Vous maîtriserez `START TRANSACTION`, `COMMIT` pour valider, et `ROLLBACK` pour annuler toute opération en cas d'erreur. C'est la base absolue de toute application financière ou critique.",
                objectives: ["Implémenter des transactions multi-tables sécurisées", "Comprendre les niveaux d'isolation (Dirty Read, Phantom Read)", "Gérer les verrous (Locks) pour éviter les deadlocks"],
                exercises: [
                    {
                        title: "Virement Bancaire Sécure",
                        description: "Écrivez le bloc SQL pour transférer 50€ d'un compte A vers un compte B en garantissant que si l'un échoue, rien n'est modifié.",
                        difficulty: "Difficile",
                        solution: "START TRANSACTION;\nUPDATE comptes SET solde = solde - 50 WHERE id = 1;\nUPDATE comptes SET solde = solde + 50 WHERE id = 2;\nCOMMIT;",
                        hints: ["Le COMMIT ne doit être appelé que si aucune erreur n'est survenue."]
                    }
                ],
                resources: [{ title: "Understanding ACID Properties", type: "article", url: "https://en.wikipedia.org/wiki/ACID" }]
            },
            {
                title: "Chapitre 2 : Indexation Profonde et Plans d'Exécution",
                description: "Passez de 10 secondes à 0.001s par requête. Maîtrisez les index B-Tree et l'outil EXPLAIN.",
                order: 2,
                duration: "18 heures",
                content: "Sans index, MySQL fait un 'Full Table Scan' (parcours ligne par ligne), ce qui tue les performances sur de gros volumes. Nous étudierons le fonctionnement interne des **Index B-Tree**. Vous apprendrez à utiliser la commande magique `EXPLAIN` pour voir comment MySQL prévoit d'exécuter votre requête. Vous découvrirez comment choisir les colonnes à indexer et pourquoi trop d'index peut ralentir vos écritures (`INSERT/UPDATE`).",
                objectives: ["Diagnostiquer des requêtes lentes via EXPLAIN ANALYZE", "Créer des index composites optimaux", "Comprendre les index de couverture (Covering Indexes)"],
                exercises: [
                    {
                        title: "La Commande de Diagnostic",
                        description: "Quelle commande préfixer à votre SELECT pour voir si MySQL utilise bien un index pour filtrer ?",
                        difficulty: "Facile",
                        solution: "EXPLAIN",
                        hints: ["Cherchez la colonne 'key' dans le résultat de l'EXPLAIN."]
                    }
                ],
                resources: [{ title: "MySQL Indexing: The Definitive Guide", type: "video", url: "https://www.youtube.com/embed/H2N4wz" }]
            },
            {
                title: "Chapitre 3 : Triggers (Déclencheurs) et Automatisation",
                description: "Faites réagir votre base de données automatiquement. Créez des logs d'audit et des calculs automatiques sans code backend.",
                order: 3,
                duration: "15 heures",
                content: "Un **Trigger** est un bloc de code qui s'exécute automatiquement `BEFORE` ou `AFTER` un événement (Insert, Update, Delete). C'est l'outil parfait pour maintenir un historique de modifications ou mettre à jour des compteurs en temps réel. Nous apprendrons à manipuler les variables `OLD` (ancienne valeur) et `NEW` (nouvelle valeur) pour une logique de précision chirurgicale directement dans le moteur de données.",
                objectives: ["Créer un log d'audit automatique des modifications de comptes", "Implémenter des contraintes de validation métier complexes via Triggers", "Gérer la récursion et les performances des déclencheurs"],
                exercises: [
                    {
                        title: "Trigger d'Historique",
                        description: "Créez un trigger qui, après chaque update sur 'produits', insère l'ancien prix et le nouveau prix dans une table 'logs_prix'.",
                        difficulty: "Difficile",
                        solution: "CREATE TRIGGER after_prix_update AFTER UPDATE ON produits FOR EACH ROW\nBEGIN\n  INSERT INTO logs_prix (ancien, nouveau) VALUES (OLD.prix, NEW.prix);\nEND;",
                        hints: ["Utilisez OLD pour accéder à la donnée avant la modification."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Securité, Sauvegarde et Réplication",
                description: "Protégez le trésor de l'entreprise. Gérez les privilèges GRANT, les dumps et la haute disponibilité.",
                order: 4,
                duration: "17 heures",
                content: "Une base de données n'est rien sans sécurité. Nous étudierons la gestion des utilisateurs et des privilèges (`GRANT/REVOKE`). Vous apprendrez à effectuer des sauvegardes à chaud via `mysqldump` et à restaurer un système après un crash. Enfin, nous introduirons la **Réplication Master-Slave**, la technique utilisée par les géants du web pour répartir la charge de lecture et garantir que si un serveur meurt, les données survivent sur un autre.",
                objectives: ["Appliquer le principe du moindre privilège aux utilisateurs applicatifs", "Mettre en place une stratégie de Backup/Restore professionnelle", "Comprendre les bases du Sharding et de la réplication"],
                exercises: [
                    {
                        title: "Privilège Restreint",
                        description: "Donnez uniquement le droit de SELECT sur la table 'public_data' à l'utilisateur 'visiteur'.",
                        difficulty: "Moyen",
                        solution: "GRANT SELECT ON db_name.public_data TO 'visiteur'@'localhost';",
                        hints: ["Ne donnez jamais de droits ALL PRIVILEGES à un utilisateur Web."]
                    }
                ],
                resources: []
            }
        ]
    }
];

module.exports = mysqlCourses;
