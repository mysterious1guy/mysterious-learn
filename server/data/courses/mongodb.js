const mongodbCourses = [
    {
        title: "MongoDB - Niveau Débutant",
        description: "Découvrez le monde NoSQL. Apprenez à manipuler une base de données orientée documents avec une souplesse totale face aux contraintes du SQL classique.",
        category: "Data",
        level: "Débutant",
        duration: "10 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        rating: 4.8,
        students: 12500,
        language: "french",
        isFree: true,
        tags: ["MongoDB", "NoSQL", "Data", "JSON", "débutant"],
        chapters: [
            {
                title: "Introduction BDD Relationnel vs NoSQL",
                description: "Oubliez les tables et jointures compliquées.",
                order: 1,
                duration: "2 heures",
                content: "En SQL pur, on conçoit des tables rigides (Lignes / Colonnes). En MongoDB (NoSQL), la Data est stockée sous forme de **Documents** BSON (format binaire dérivé du JSON Javascript). Il n'y a pas de schéma strict. Un document peut avoir l'attribut 'age', et le document juste après peut ne pas l'avoir sans faire disjoncter tout le serveur.",
                objectives: ["Différencier Document, Collection et Base de Donnée", "Comprendre structure JSON de la data"],
                exercises: [
                    {
                        title: "Traduire Vocabulaire",
                        description: "Sur MongoDB, comment s'appelle l'équivalent d'une Ligne MySQL, et d'une Table MySQL ?",
                        difficulty: "Facile",
                        solution: "Une Ligne = un Document.\\nUne Table = une Collection.",
                        hints: ["On range les Docs dans des Collections."]
                    }
                ],
                resources: [
                    {
                        title: "Qu'est ce que Mongo DB NoSQL",
                        type: "video",
                        url: "https://www.youtube.com/embed/E-1xI85Z"
                    }
                ]
            },
            {
                title: "CRUD de base dans le Shell Mongo",
                description: "Create, Read, Update, Delete au format Query Document.",
                order: 2,
                duration: "5 heures",
                content: "Via le Mongo Shell (ou mongosh), vous interagissez avec le moteur DB. On sélectionne sa base avec `use mabdd`. On insert un élément : `db.users.insertOne({ nom: 'Marc' })`. On le cherche avec condition : `db.users.find({ nom: 'Marc' })`. La modification se fait avec les tags `$set` d'update : `db.users.updateOne({nom:'Marc'}, {$set : { age : 30 }})`.",
                objectives: ["Faire un insertOne ()", "Rechercher la db .find()", "Comprendre $set sur Update"],
                exercises: [
                    {
                        title: "Requete Query Delete",
                        description: "Supriminez tout document utilisateur où l'attribut 'role' est 'banni'. (collection : users)",
                        difficulty: "Moyen",
                        solution: "db.users.deleteMany({ role: 'banni' })",
                        hints: ["Utilise deleteMany plutôt que deleteOne si tu vises de multiple rows matches."]
                    }
                ]
            }
        ]
    },
    {
        title: "MongoDB - Niveau Intermédiaire",
        description: "Maitrisez les opérateurs avancés (Greater than, In), l'indexation basique, et branchez Mongoose via NodeJS.",
        category: "Data",
        level: "Intermédiaire",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        rating: 4.8,
        students: 8500,
        language: "french",
        isFree: true,
        tags: ["MongoDB", "Opérateurs", "NoSQL", "Mongoose", "intermédiaire"],
        chapters: [
            {
                title: "Opérateurs Fonctionnels Avancés",
                description: "Filtres complexe (Plus grand que, Tableaux inclus, Condition ET / OU)",
                order: 1,
                duration: "5 heures",
                content: "Au lieu d'un `>` ou `<=`, Mongo utilise des opérateurs préfixés d'un paramètre $: `$gt` (greater than), `$lt` (less than), `$in` (chercher parmis tableau de choix). Exemple: `.find({ age: { $gt: 18 } })` cherche les majeurs. Vous découvrirez les opérateurs logique pour la fusion de critères `$or` et `$and`.",
                objectives: ["Mettre en valeur le $gt / $lt", "Manipuler une recherche In list de config string list"],
                exercises: [
                    {
                        title: "Query Mineurs Francophones",
                        description: "Faites Query sur collection 'users' qui ont un 'age' strict inférieur $lt à 18, et la string 'langue' egale à 'fr'.",
                        difficulty: "Moyen",
                        solution: "db.users.find({ age: { $lt: 18 }, langue: 'fr' })",
                        hints: ["Passer deux arg dans le root objet effectue implicitement un AND."]
                    }
                ]
            },
            {
                title: "Mongoose + JS NodeJS (Bases de Schématisation)",
                description: "On encadre Mongo pour éviter que le chaos Data ne prenne place.",
                order: 2,
                duration: "10 heures",
                content: "NoSQL n'a pas de Schema: vous pouvez inserer en user 'couleur', 'age'.. c'est dangeureux côté backend NodeJS. L'ORM ODM `Mongoose` sert à remettre du cadre en creant coté code JS un `new Schema()`. Ainsi Mongoose bloquera l'insertion vers Mongo des structures non conformes ou erronées en types.",
                objectives: ["Mettre en place et connecter nodeJS mongoose", "Créer un Schema user propre (type Object Mongoose)", "Savoir lancer sa première config."],
                exercises: [
                    {
                        title: "Mongoose Model Create ()",
                        description: "A partir d'un model User chargé, crée instance ayant pour nom 'Alex' (Methode de Mongoose).",
                        difficulty: "Moyen",
                        solution: "const u = new User({ nom: 'Alex' });\\nawait u.save();",
                        hints: ["save() async doit toujours valider la query"]
                    }
                ]
            }
        ]
    },
    {
        title: "MongoDB - Niveau Expert (Avancé)",
        description: "Aggregation FrameWork pipeline, géospatial index et Réplication Clusters Hautes Dispo.",
        category: "Data",
        level: "Avancé",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        rating: 4.9,
        students: 4000,
        language: "french",
        isFree: true,
        tags: ["MongoDB", "Aggregation", "Indexes", "avancé", "Data"],
        chapters: [
            {
                title: "Le Framework d'Aggrégation Pipeline",
                description: "Des super Analytics sur de la grosse mass Data. Le JOIN revisité.",
                order: 1,
                duration: "10 heures",
                content: "Le `aggregate([ ... ])` est l'arme ultime de MongoDB permettant des GROUP BY incroyables et des cascades de traitement ($match -> $group -> $sort). On met des étapes de pipelines où la sortie de l'une rentre dans la suivante. Par ailleurs, Mongo n'a pas de jointure classique SQL, mais possède le `$lookup` qui simule à 100% une jointure LEFT OUTER SQL.",
                objectives: ["Maitriser le Root concept Pipeline Array", "Utiliser $match filtre pre process puis la mise en grappe en group by", "Joindre avec lookUp l'author object_id sur la table Posts."],
                exercises: [
                    {
                        title: "Pipeline Somme Age",
                        description: "Sur une aggregate sur table users, faire un $match pour 'actif': true. Puis $group l'ensemble (en id NULL) pour somme(sum) globale avec operateur $sum",
                        difficulty: "Difficile",
                        solution: "db.users.aggregate([ { $match: { actif: true } }, { $group: { _id: null, total: { $sum: \\\"$age\\\" } } } ])",
                        hints: ["Le champ age doit etre referencé avec prefix symbol $ dans la string de calc aggregation"]
                    }
                ],
                resources: [
                    {
                        title: "Maitriser Mongo Aggregation Data",
                        type: "video",
                        url: "https://www.youtube.com/embed/Kk6Er0c"
                    }
                ]
            },
            {
                title: "Indexation, GeoSpatial et Performance Sharding",
                description: "Atteindre de la performance Data sur des dizaines de millions Queries/Sec.",
                order: 2,
                duration: "10 heures",
                content: "Sans Index, mongo Database fait un COLLSCAN lourd de la database line par ligne. On implémente du `createIndex({nom : 1})` Index Arbre BTree. On peut gérer grace à de l'Index spatial (2dsphere) pour le radar de coordonnés GPS de maps de location de client. En Prod Cluster : le Sharding découpe une collection sur divers partitions serveurs de dispo globale DB pour assurer vitesse scale horiz.",
                objectives: ["Monitorer ExecutionStats via cmd .explain() ", "Creer INDEX sur attribut clé unique", "Gérer une Map Query 2dSphere $near"]
            }
        ]
    }
];

module.exports = mongodbCourses;
