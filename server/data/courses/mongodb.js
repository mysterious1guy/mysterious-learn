const mongodbCourses = [
    {
        id: "mongodb-niveau-d-butant",
        title: "MongoDB - Niveau Débutant",
        description: "Libérez-vous du schéma rigide. Apprenez à stocker des données comme des objets JavaScript dans la base NoSQL la plus populaire au monde.",
        category: "Bases de données",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        language: "french",
        isFree: true,
        tags: ["NoSQL", "MongoDB", "JSON", "BSON"],
        chapters: [
            {
                title: "1. Philosophie NoSQL & Document JSON",
                description: "Comprenez pourquoi MongoDB est différent de SQL.",
                order: 1,
                duration: "7 heures",
                content: "MongoDB stocke des documents BSON (Binary JSON). Contrairement aux tables, les documents peuvent avoir des structures différentes. Apprenez à modéliser sans contraintes de colonnes.",
                objectives: ["Comprendre le concept de Document", "Différencier SQL et NoSQL", "Installer et lancer Mongosh"],
                resources: []
            },
            {
                title: "2. CRUD de base (Insert/Find)",
                description: "Vos premières opérations de lecture et d'écriture.",
                order: 2,
                duration: "8 heures",
                content: "Apprenez `insertOne`, `insertMany` et maîtrisez le moteur de recherche `find()`. Utilisez des filtres simples pour extraire vos premières données.",
                objectives: ["Insérer des documents", "Rechercher avec filtres", "Utiliser l'ID unique _id"],
                resources: []
            }
        ]
    },
    {
        id: "mongodb-niveau-interm-diaire",
        title: "MongoDB - Niveau Moyen",
        description: "Manipulez les données en volume. Maîtrisez les opérateurs de mise à jour et la structuration complexe des documents.",
        category: "Bases de données",
        level: "Moyen",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        language: "french",
        isFree: true,
        tags: ["NoSQL", "Querying", "CRUD"],
        chapters: [
            {
                title: "1. Update & Delete Avancé",
                description: "Modifiez vos documents avec précision chirurgicale.",
                order: 1,
                duration: "10 heures",
                content: "Utilisez les opérateurs `$set`, `$inc`, `$push` et `$pull`. Apprenez à modifier des tableaux imbriqués et à supprimer proprement des lots de données.",
                objectives: ["Mettre à jour des champs spécifiques", "Manipuler des tableaux avec $push", "Utiliser upsert"],
                resources: []
            },
            {
                title: "2. Modélisation : Embed vs Reference",
                description: "Lien ou Inclusion ? L'art de la structure NoSQL.",
                order: 2,
                duration: "10 heures",
                content: "Apprenez quand imbriquer des documents (Embedding) et quand utiliser des références (Linking). C'est la base de la performance MongoDB.",
                objectives: ["Choisir la bonne stratégie de données", "Éviter les jointures excessives", "Comprendre les limites de taille (16Mo)"],
                resources: []
            }
        ]
    },
    {
        id: "mongodb-niveau-avanc",
        title: "MongoDB - Niveau Intermédiaire",
        description: "L'art du traitement massif. Maîtrisez l'Aggregation Framework pour transformer vos données en informations stratégiques.",
        category: "Bases de données",
        level: "Intermédiaire",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        language: "french",
        isFree: true,
        tags: ["Aggregation", "Pipelines", "ETL"],
        chapters: [
            {
                title: "1. Aggregation Framework",
                description: "Le pipeline de traitement de données ultra-puissant.",
                order: 1,
                duration: "15 heures",
                content: "Le pipeline d'agrégation est l'outil n°1 de MongoDB. Utilisez `$match`, `$group`, `$sort` et `$project` pour créer des rapports complexes en une seule requête.",
                objectives: ["Construire des pipelines multiphases", "Grouper des résultats par catégories", "Transformer les données à la volée"],
                resources: []
            },
            {
                title: "2. Indexation & Performance",
                description: "Rendez vos requêtes instantanées sur des millions de documents.",
                order: 2,
                duration: "10 heures",
                content: "Comprenez comment MongoDB cherche les données. Créez des index simples et composés. Apprenez à lire un `explain()` pour diagnostiquer les lenteurs.",
                objectives: ["Créer des index performants", "Utiliser explain()", "Éviter les scans de collection complets"],
                resources: []
            }
        ]
    },
    {
        id: "mongodb-niveau-expert",
        title: "MongoDB - Niveau Expert",
        description: "Infrastructure et Architecture Cloud. Maîtrisez le Sharding, le Replica Set et la sécurité industrielle.",
        category: "Bases de données",
        level: "Expert",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["Scaling", "Sharding", "ReplicaSet", "Security"],
        chapters: [
            {
                title: "1. Haute Disponibilité (Replica Sets)",
                description: "Assurez la survie de vos données en cas de panne serveur.",
                order: 1,
                duration: "15 heures",
                content: "Apprenez à configurer un Replica Set. Comprenez l'élection du Primary et comment les Secondaries assurent la redondance et la lecture.",
                objectives: ["Configurer un cluster répliqué", "Gérer le failover", "Optimiser les préférences de lecture"],
                resources: []
            },
            {
                title: "2. Scalabilité Horizontale (Sharding)",
                description: "Distribuez vos données sur des dizaines de serveurs.",
                order: 2,
                duration: "15 heures",
                content: "Maîtrisez le Sharding pour dépasser les limites d'un seul serveur. Apprenez à choisir une Shard Key efficace pour éviter les 'hotspots'.",
                objectives: ["Comprendre l'architecture Shard", "Choisir une Shard Key", "Gérer l'équilibrage des données"],
                resources: []
            }
        ]
    }
];

module.exports = mongodbCourses;
