const mysqlCourses = [
    {
        title: "MySQL - Niveau Débutant",
        description: "Apprenez le langage universel des bases de données relationnelles. Créez des tables, insérez des données et interrogez-les efficacement.",
        category: "Data",
        level: "Débutant",
        duration: "12 heures",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        rating: 4.8,
        students: 15400,
        language: "french",
        isFree: true,
        tags: ["MySQL", "SQL", "Data", "relationnel", "débutant"],
        chapters: [
            {
                title: "Introduction et Modèle Relationnel",
                description: "Comprendre les Tables, Lignes et Colonnes.",
                order: 1,
                duration: "3 heures",
                content: "MySQL est un SGBDR (Système de Gestion de Bases de Données Relationnelles). Les données sont stockées dans des Tables, organisées en Lignes (Enregistrements) et Colonnes (Attributs). Chaque ligne est identifiée par une Clé Primaire unique (Primary Key), souvent un ID auto-incrémenté. C'est l'ordre absolu par rapport au NoSQL.",
                objectives: ["Comprendre le type de Data relationnel", "Vocabulaire Table, Ligne, Clé Primaire", "Types de colonnes : VARCHAR, INT, DATE"],
                exercises: [
                    {
                        title: "Type de Colonne",
                        description: "Quel type de donnée utiliseriez-vous pour stocker un Prénom qui fait maximum 50 caractères ?",
                        difficulty: "Facile",
                        solution: "VARCHAR(50)",
                        hints: ["Le texte variable court est toujours de Varchar en SQL."]
                    }
                ],
                resources: [
                    {
                        title: "C'est quoi MySQL",
                        type: "video",
                        url: "https://www.youtube.com/embed/zbMHLJ0"
                    }
                ]
            },
            {
                title: "Le CRUD SQL (Créer, Lire, Mettre à jour, Supprimer)",
                description: "Les requêtes SELECT, INSERT, UPDATE, DELETE.",
                order: 2,
                duration: "5 heures",
                content: "Tout tourne autour de 4 verbes. `INSERT INTO table (col1) VALUES ('Hello')` pour créer. `SELECT * FROM table WHERE condition` pour lire l'entiereté. `UPDATE table SET col='New' WHERE id=1` pour modifier, indispensable de toujours mettre un WHERE sous peine de modifier toute la table ! Pareil pour `DELETE FROM table WHERE id=1`.",
                objectives: ["Ecrire un SELECT avec condition WHERE", "Mettre a jour data grace à UPDATE SET"],
                exercises: [
                    {
                        title: "Modifier une ressource existante",
                        description: "Ecrivez la query pour changer l'email en 'new@mail.com' de l'utilisateur dont l'id vaut 56. La table est 'users'.",
                        difficulty: "Moyen",
                        solution: "UPDATE users SET email = 'new@mail.com' WHERE id = 56;",
                        hints: ["Toujours un WHERE sur un update pour cibler sa row."]
                    }
                ]
            },
            {
                title: "Tri, Limite et Fonctions Aggrégatives",
                description: "Classer les résultats : ORDER BY, LIMIT, COUNT et AVG.",
                order: 3,
                duration: "4 heures",
                content: "Pour éviter de retourner un million de lignes, on limite avec `LIMIT 10`. On trie avec `ORDER BY nom DESC` (descendant). On peut aussi compter le nombre total avec `SELECT COUNT(*) FROM table` ou trouver la moyenne d'une colonne avec `AVG(prix)`. Ces requêtes retournent alors une seule valeur mathématique consolidée.",
                objectives: ["Trier via un paramètre avec ORDER BY", "Recuperer une moyenne via le SQL Aggrégator AVG", "Compter de lignes COUNT"],
                exercises: [
                    {
                        title: "Le top 5",
                        description: "Selectionnez toutes les colonnes des joueurs, triés par leur 'score' du plus grand au plus petit, gardez que le top 5.",
                        difficulty: "Moyen",
                        solution: "SELECT * FROM joueurs ORDER BY score DESC LIMIT 5;",
                        hints: ["Order Descendant puis on limite après."]
                    }
                ]
            }
        ]
    },
    {
        title: "MySQL - Niveau Intermédiaire",
        description: "La puissance du relationnel : Les Jointures et Schématisation complexe.",
        category: "Data",
        level: "Intermédiaire",
        duration: "18 heures",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        rating: 4.8,
        students: 11000,
        language: "french",
        isFree: true,
        tags: ["MySQL", "Jointures", "FOREIGN KEY", "intermédiaire"],
        chapters: [
            {
                title: "Les Clés Étrangères (Foreign Keys)",
                description: "Lier les tables entre elles solidement.",
                order: 1,
                duration: "6 heures",
                content: "Si un Utilisateur écrit plusieurs Articles, la table `articles` a une colonne `user_id` qui référence la Primary Key de `users`. C'est une Clé Étrangère! Elle garantit l'intégrité référentielle : impossible de supprimer un user si ses articles le référencent (sauf avec un `ON DELETE CASCADE` qui détruit tout en cascade).",
                objectives: ["Creer une relation 1-N One To Many", "Appliquer contrainte Foreign Key MySQL", "Comprendre le delete On Cascade mode"],
                exercises: [
                    {
                        title: "Syntaxe de fk constraint",
                        description: "Mettre foreign key de `user_id` referencant `id` de `users`",
                        difficulty: "Difficile",
                        solution: "FOREIGN KEY (user_id) REFERENCES users(id)",
                        hints: ["Mot clef References."]
                    }
                ],
                resources: [
                    {
                        title: "C'est quoi ces Foreign Keys ?",
                        type: "video",
                        url: "https://www.youtube.com/embed/zH"
                    }
                ]
            },
            {
                title: "Les Jointures SQL (INNER, LEFT, RIGHT JOIN)",
                description: "Reconstruisez les données éclatées à la volée.",
                order: 2,
                duration: "12 heures",
                content: "La jointure recolle la donnée à la lecture : `SELECT articles.titre, users.nom FROM articles INNER JOIN users ON articles.user_id = users.id`. Un INNER JOIN ne ramène que les lignes ayant une correspondance des 2 côtés. Un LEFT JOIN ramène toutes les lignes de la table de gauche, même sans correspondance à droite (retournant NULL pour ces champs).",
                objectives: ["Unir deux tables relationnele avec une jointure INNER", "Maitriser diff de Left join sur inclusion nulle", "L'aliasing AS de table pour reduire syntaxe ( a et u )"],
                exercises: [
                    {
                        title: "Jointure Utilisateur/Commande",
                        description: "Affichez 'client.nom' et 'commande.total' via Jointure Interne INNER JOIN de la table Client et Commande liés via `client_id`",
                        difficulty: "Difficile",
                        solution: "SELECT client.nom, commande.total FROM client INNER JOIN commande ON client.id = commande.client_id;",
                        hints: ["La condition ON permet de declarer la zone commune entre les deux tables"]
                    }
                ],
                resources: [
                    {
                        title: "Les JoinTures MySQL expliquées facile",
                        type: "video",
                        url: "https://www.youtube.com/embed/H2N4wz"
                    }
                ]
            }
        ]
    },
    {
        title: "MySQL - Niveau Expert (Avancé)",
        description: "Indexation, Transactions ACID, Déclencheurs (Triggers) et Optimisations Poussées.",
        category: "Data",
        level: "Avancé",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        rating: 4.9,
        students: 6500,
        language: "french",
        isFree: true,
        tags: ["MySQL", "Transactions", "Triggers", "avancé", "ACID", "Index"],
        chapters: [
            {
                title: "Transactions ACID",
                description: "Tout passe, ou tout casse. Interdiction de la data partielle.",
                order: 1,
                duration: "10 heures",
                content: "Imaginez un virement bancaire: on debite A, on credite B. Si le serveur crashe au milieu de ce proccess, l'argent s'évapore et l'opération de compta echoue. MySQL innnoDB propose le control mode Transactionnel : `START TRANSACTION`, on execute les 2 Updates... si tout va bien, `COMMIT` (sauve). Si le script PHP détecte exception : `ROLLBACK` (on annule outrages). L'Etat de la banque Database est donc toujours correct.",
                objectives: ["Initier bloc Start tansaction", "Deployer try catch avec le throw sur execution error Rollback", "Comprendre et Maitriser les Lock For Update du C de ACID"],
                exercises: [
                    {
                        title: "Annulation manuelle",
                        description: "Lancer le bloc transactionnel, Faites le Update et manuellement annuler la manipulation (rollback).",
                        difficulty: "Moyen",
                        solution: "START TRANSACTION;\\nUPDATE comptes SET balance = 0;\\nROLLBACK;",
                        hints: ["Rien ne sera sauvegardé en base apres un Rollback des modiffs."]
                    }
                ]
            },
            {
                title: "Les Triggers (Déclencheurs)",
                description: "Execution DB fantome automatisée",
                order: 2,
                duration: "8 heures",
                content: "Un tag `CREATE TRIGGER` ordonne au moteur DB de reagir automatiquement BEFORE ou AFTER toute methode INSERT / UPDATE sur table dédiée. Idéal pour garder un historique 'logs' de chaque suppression sans le gerer côté back-end NodeJS PHP, assurant fiabilité 100%.",
                objectives: ["Mettre en place et comprendre Before Insert Trigger"]
            },
            {
                title: "Plan d'exécutions et Optimisation",
                description: "L'arme `EXPLAIN` et l'Indexation.",
                order: 3,
                duration: "7 heures",
                content: "Pourquoi cette requête SQL met 7 secondes ? Préfixez votre SELECT par `EXPLAIN`. MySQL vous dévoilera tout son plan moteur en interne. Il parcourt peut-être 5 millions de lignes inutilement ? Rajoutez des Index (B-Tree) sur la colonne via `CREATE INDEX nom ON table(col)`. Le temps d'exécution chutera souvent à 0.01s. Attention, chaque index ralentit grandement l'ecriture (Insert) par contrecoup.",
                objectives: ["Comprendre un Explain table analyze", "Chisir entre temps d'ecriture vs lecture SQL de masse Index"]
            }
        ]
    }
];

module.exports = mysqlCourses;
