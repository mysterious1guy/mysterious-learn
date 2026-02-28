const mongodbCourses = [
    {
        id: "mongodb-niveau-d-butant",
        title: "MongoDB - Niveau Débutant",
        description: "Flexibilité du NoSQL.",
        category: "Data",
        level: "Débutant",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "javascript",
        isFree: true,
        tags: ["mongodb", "nosql"],
        chapters: [
            { title: "1. Vision Globale : NoSQL vs SQL", description: "Le choix de la vitesse.", order: 1, content: "MongoDB stocke du JSON (BSON).", objectives: ["Comprendre le NoSQL"] },
            { title: "2. Concept : Documents", description: "Objets flexibles.", order: 2, content: "Utilisez {}, pas de colonnes fixes.", objectives: ["Maîtriser le format document"] },
            { title: "3. Exemple Concret : Premier insert", description: "insertOne().", order: 3, content: "Créez votre première fiche produit.", objectives: ["Manipuler les documents"] },
            { title: "4. Cas Pratique : Filtre simple", description: "Trouver par clé.", order: 4, content: "Utilisez .find({ price: 20 }).", objectives: ["Filtrer les data"] },
            { title: "5. Exercice : Liste d'utilisateurs", description: "CRUD express.", order: 5, content: "Gérez une collection simple.", objectives: ["Récurrences CRUD NoSQL"] }
        ]
    },
    {
        id: "mongodb-niveau-moyen",
        title: "MongoDB - Niveau Moyen",
        description: "Requêtes avancées et Aggregations.",
        category: "Data",
        level: "Moyen",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "javascript",
        isFree: true,
        tags: ["mongodb", "aggregation"],
        chapters: [
            { title: "1. Vision Globale : Le Pipeline", description: "Transformer la donnée.", order: 1, content: "L'aggregation est le moteur de stats de Mongo.", objectives: ["Comprendre les pipelines"] },
            { title: "2. Concept : $match & $group", description: "Filtrer et agréger.", order: 2, content: "Calculez des moyennes en un éclair.", objectives: ["Maîtriser les opérateurs"] },
            { title: "3. Exemple Concret : Stats de vente", description: "Analyse en direct.", order: 3, content: "Calculez le CA total par catégorie.", objectives: ["Transformer les data complexes"] },
            { title: "4. Cas Pratique : Indexation Géo", description: "Trouver autour de soi.", order: 4, content: "Utilisez les index 2dsphere pour la géolocalisation.", objectives: ["Utiliser les index spéciaux"] },
            { title: "5. Exercice : Dashboard analytique", description: "Synthèse data.", order: 5, content: "Produisez un set de données prêt pour un graphique.", objectives: ["Mapper les aggregations"] }
        ]
    },
    {
        id: "mongodb-niveau-interm-diaire",
        title: "MongoDB - Niveau Intermédiaire",
        description: "Performances et Modélisation.",
        category: "Data",
        level: "Intermédiaire",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        language: "javascript",
        isFree: true,
        tags: ["mongodb", "performance"],
        chapters: [
            { title: "1. Vision Globale : Modélisation", description: "Embedded vs Reference.", order: 1, content: "Comment lier les documents proprement ?", objectives: ["Choisir sa structure"] },
            { title: "2. Concept : Index de performance", description: "Accélérer les lectures.", order: 2, content: "Maîtrisez les index composés.", objectives: ["Éviter les COLLSCAN"] },
            { title: "3. Exemple Concret : Optimisation de recherche", description: "Explain() magique.", order: 3, content: "Analysez pourquoi une requête est lente.", objectives: ["Profiler ses requêtes"] },
            { title: "4. Cas Pratique : Transactions Multi-doc", description: "Solidité ACID.", order: 4, content: "Gérez plusieurs collections de manière atomique.", objectives: ["Garantir l'intégrité"] },
            { title: "5. Exercice : Refacto de structure", description: "Amélioration continue.", order: 5, content: "Passez d'une structure rigide à une structure scalable.", objectives: ["Faire évoluer son schéma"] }
        ]
    },
    {
        id: "mongodb-niveau-expert",
        title: "MongoDB - Niveau Expert",
        description: "Administration, Sharding et Réplication.",
        category: "Data",
        level: "Expert",
        duration: "50 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "javascript",
        isFree: true,
        tags: ["mongodb", "sharding", "expert"],
        chapters: [
            { title: "1. Vision Globale : High Availability", description: "Ne jamais s'arrêter.", order: 1, content: "Apprenez les Replica Sets.", objectives: ["Assurer la continuité"] },
            { title: "2. Concept : Sharding (Horiz. Scaling)", description: "Infini de données.", order: 2, content: "Découpez les data sur plusieurs serveurs.", objectives: ["Passer à l'échelle massive"] },
            { title: "3. Exemple Concret : Cluster Atlas pro", description: "Cloud management.", order: 3, content: "Gérez un cluster distribué mondialement.", objectives: ["Maîtriser MongoDB Atlas"] },
            { title: "4. Cas Pratique : Backup & Restore pro", description: "Sécurité maximale.", order: 4, content: "Gérez les snapshots et le point-in-time recovery.", objectives: ["Plan de reprise d'activité"] },
            { title: "5. Exercice : Simulation de panne massive", description: "Résilience.", order: 5, content: "Provoquez une bascule de serveur Master vers Slave.", objectives: ["Valider la résilience système"] }
        ]
    }
];

module.exports = mongodbCourses;
