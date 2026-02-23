const mongodbCourses = [
    {
        title: "MongoDB - Niveau Débutant : La Révolution NoSQL",
        description: "Découvrez le monde NoSQL. Apprenez à manipuler une base de données orientée documents avec une souplesse totale face aux contraintes du SQL classique.",
        category: "Data",
        level: "Débutant",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        rating: 4.8,
        students: 12500,
        language: "mongodb",
        isFree: true,
        tags: ["MongoDB", "NoSQL", "Data", "JSON", "BSON", "débutant"],
        chapters: [
            {
                title: "Chapitre 1 : Introduction au NoSQL et format BSON",
                description: "Oubliez les tables et jointures. Pensez en Documents et Collections.",
                order: 1,
                duration: "6 heures",
                content: "MongoDB est une base de données orientée Documents. Contrairement au SQL qui utilise des lignes et des colonnes rigides, MongoDB utilise du **BSON** (Binary JSON). Cela permet de stocker des données imbriquées (tableaux, objets) directement dans un seul enregistrement. Nous aborderons la hiérarchie : Instance > Database > Collection > Document. Vous apprendrez pourquoi le NoSQL est le choix privilégié pour le Big Data et les applications à évolution rapide.",
                objectives: ["Installer et configurer MongoDB (Community Server / Atlas)", "Comprendre la différence entre SQL et NoSQL", "Manipuler des documents JSON simples"],
                exercises: [
                    {
                        title: "Comparaison de Vocabulaire",
                        description: "Quels sont les équivalents MongoDB d'une 'Table' et d'une 'Ligne' SQL ?",
                        difficulty: "Facile",
                        solution: "Table = Collection\nLigne = Document",
                        hints: ["Les documents sont regroupés dans des collections."]
                    }
                ],
                resources: [{ title: "What is MongoDB?", type: "video", url: "https://www.youtube.com/embed/E-1xI85Z" }]
            },
            {
                title: "Chapitre 2 : Opérations CRUD de base (Insert & Find)",
                description: "Maîtrisez l'insertion et la récupération de données via le Shell MongoDB (mongosh).",
                order: 2,
                duration: "8 heures",
                content: "Nous apprendrons à converser avec la base. `db.collection.insertOne()` pour créer, et l'incontournable `db.collection.find()` pour lire. Vous découvrirez l'**ObjectId** (`_id`), l'identifiant unique généré automatiquement par MongoDB qui inclut un timestamp. Nous aborderons le filtrage simple par égalité et l'utilisation de `pretty()` pour rendre les résultats lisibles.",
                objectives: ["Insérer des documents avec des champs dynamiques", "Filtrer des résultats par un attribut simple", "Limiter et projeter les champs (ne récupérer que les noms)"],
                exercises: [
                    {
                        title: "Premier Insert",
                        description: "Écrivez la commande pour insérer un utilisateur nommé 'Boss Fall' avec l'âge 35 dans la collection 'users'.",
                        difficulty: "Facile",
                        solution: "db.users.insertOne({ name: 'Boss Fall', age: 35 });",
                        hints: ["Utilisez les accolades {} pour définir l'objet JSON."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Mise à jour Dynamique et Opérateurs ($set, $inc)",
                description: "Modifiez vos documents sans les écraser. Maîtrisez la mise à jour atomique de champs spécifiques.",
                order: 3,
                duration: "8 heures",
                content: "Mettre à jour un document en NoSQL est puissant grâce aux opérateurs atomiques. `$set` change une valeur, `$inc` incrémente un nombre (parfait pour les scores ou les stocks), `$push` ajoute un élément à un tableau. Vous apprendrez à utiliser `updateOne()` et `updateMany()` avec précision. **Attention :** Oublier un opérateur comme `$set` peut écraser l'intégralité du document par un nouvel objet !",
                objectives: ["Incrémenter une valeur numérique sans la lire au préalable", "Ajouter un tag à une liste d'intérêts via $push", "Utiliser l'option upsert pour créer si inexistant"],
                exercises: [
                    {
                        title: "Incrémentation de Score",
                        description: "Écrivez la commande pour ajouter 10 points au score de l'utilisateur ayant l'id 101.",
                        difficulty: "Moyen",
                        solution: "db.users.updateOne({ _id: 101 }, { $inc: { score: 10 } });",
                        hints: ["$inc est l'opérateur de calcul atomique."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Filtrage Avancé et Opérateurs de Comparaison",
                description: "Allez au-delà de l'égalité. Filtrez par plage de valeurs, présence dans un tableau ou expressions régulières.",
                order: 4,
                duration: "8 heures",
                content: "MongoDB utilise des opérateurs de comparaison préfixés par `$`. `$gt` (Greater Than), `$lt` (Less Than), `$in` (parmi une liste), `$exists` (présence d'un champ). Nous étudierons également la logique booléenne avec `$or` et `$and`. Vous apprendrez à requêter à l'intérieur de tableaux imbriqués, une fonctionnalité où le NoSQL écrase le SQL en termes de simplicité syntaxique.",
                objectives: ["Rechercher des utilisateurs ayant entre 18 et 30 ans", "Trouver des documents possédant un tag spécifique dans une liste", "Rechercher par texte partiel via $regex"],
                exercises: [
                    {
                        title: "Filtre de Majorité",
                        description: "Trouvez tous les utilisateurs dont l'âge est supérieur ou égal à 18.",
                        difficulty: "Moyen",
                        solution: "db.users.find({ age: { $gte: 18 } });",
                        hints: ["$gte signifie 'Greater Than or Equal'."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        title: "MongoDB - Niveau Intermédiaire : Mongoose & Modélisation",
        description: "Mettez de l'ordre dans le NoSQL. Apprenez à utiliser Mongoose pour structurer vos applications Node.js et à optimiser vos recherches via les index.",
        category: "Data",
        level: "Intermédiaire",
        duration: "45 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        rating: 4.8,
        students: 8500,
        language: "mongodb",
        isFree: true,
        tags: ["MongoDB", "Mongoose", "Node.js", "Indexation", "intermédiaire"],
        chapters: [
            {
                title: "Chapitre 1 : Mongoose ODM : Schémas et Modèles",
                description: "Donnez une structure à vos données. Apprenez à valider et typer vos documents côté application.",
                order: 1,
                duration: "12 heures",
                content: "Le NoSQL est 'Schemaless', ce qui peut mener au chaos. **Mongoose** est un ODM (Object Data Modeling) qui permet de définir des schémas stricts en JavaScript. Nous apprendrons à définir des types, des valeurs par défaut, et des validateurs personnalisés (ex: email valide). Vous découvrirez les **Middlewares Mongoose** (pre/post save) pour automatiser des tâches comme le hachage de mot de passe avant insertion.",
                objectives: ["Connecter Node.js à MongoDB via Mongoose", "Définir un schéma avec des contraintes required et unique", "Utiliser les modèles pour effectuer des opérations CRUD asynchrones"],
                exercises: [
                    {
                        title: "Le Schéma Produit",
                        description: "Définissez un schéma Mongoose pour un produit avec un 'nom' (string, obligatoire) et un 'prix' (number, min 0).",
                        difficulty: "Moyen",
                        solution: "const productSchema = new mongoose.Schema({\n  nom: { type: String, required: true },\n  prix: { type: Number, min: 0 }\n});",
                        hints: ["Utilisez l'objet de configuration pour ajouter des validateurs comme min."]
                    }
                ],
                resources: [{ title: "Mongoose Official Documentation", type: "article", url: "https://mongoosejs.com/docs/guide.html" }]
            },
            {
                title: "Chapitre 2 : Indexation et Performance",
                description: "Accélérez vos requêtes. Comprenez comment les index transforment un parcours de collection lent en une recherche instantanée.",
                order: 2,
                duration: "11 heures",
                content: "Par défaut, MongoDB parcourt chaque document pour trouver un match (Collection Scan). Un **Index** est une structure de données (B-Tree) ordonnée qui pointe vers les documents. Nous apprendrons à créer des index simples, uniques et composites. Vous utiliserez la méthode `.explain('executionStats')` pour comparer les performances avec et sans index et comprendre la différence entre un COLLSCAN et un IXSCAN.",
                objectives: ["Identifier les champs à indexer en priorité", "Créer des index pour accélérer le tri (Sort)", "Comprendre le coût des index sur les opérations d'écriture"],
                exercises: [
                    {
                        title: "L'Index Unique",
                        description: "Quelle commande Mongoose permet de s'assurer qu'un index unique est créé sur le champ 'email' ?",
                        difficulty: "Facile",
                        solution: "email: { type: String, unique: true }",
                        hints: ["Mongoose gère la création de l'index MongoDB basé sur cette propriété."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Relations entre Documents (Populate vs Embedding)",
                description: "Jointures NoSQL ? Apprenez quand imbriquer les données et quand utiliser les références (Population).",
                order: 3,
                duration: "12 heures",
                content: "Il n'y a pas de JOIN automatique en MongoDB. Deux stratégies existent : 1) **Embedding** : Stocker l'adresse *dans* le document utilisateur (Performance de lecture maximale). 2) **Referencing** : Stocker l'ID de l'adresse et utiliser `.populate()` dans Mongoose pour 'recoller' les morceaux. Vous apprendrez à choisir la meilleure stratégie selon la cardinalité (1-1, 1-N, N-N).",
                objectives: ["Implémenter la population de documents liés", "Maîtriser les tableaux de sous-documents", "Éviter le piège des documents trop lourds (>16 Mo)"],
                exercises: [
                    {
                        title: "Récupérer avec Auteur",
                        description: "Soit un modèle Post avec un champ author (ObjectId). Utilisez .populate pour récupérer le post ET l'objet auteur complet.",
                        difficulty: "Difficile",
                        solution: "await Post.find().populate('author');",
                        hints: ["Le champ doit être défini avec 'ref' dans le schéma."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Méthodes de Instance et Virtuels",
                description: "Ajoutez de l'intelligence à vos modèles. Créez des propriétés calculées qui n'encombrent pas la base de données.",
                order: 4,
                duration: "10 heures",
                content: "Mongoose permet d'ajouter des méthodes à vos instances d'objets (ex: `user.comparePassword()`). Plus puissant encore : les **Virtuels**. Ce sont des propriétés qui n'existent pas dans MongoDB mais qu'on peut lire (ex: `user.fullName` combinant prénom et nom). Vous apprendrez à transformer vos documents en objets intelligents, simplifiant grandement le code de votre contrôleur.",
                objectives: ["Créer des champs virtuels (getters/setters)", "Ajouter des méthodes statiques au modèle", "Personnaliser le format JSON de sortie (toJSON)"],
                exercises: [
                    {
                        title: "Le Virtuel Nom Complet",
                        description: "Créez un virtuel 'fullname' qui retourne la concaténation de 'firstname' et 'lastname'.",
                        difficulty: "Moyen",
                        solution: "schema.virtual('fullname').get(function() {\n  return `${this.firstname} ${this.lastname}`;\n});",
                        hints: ["Les virtuels ne sont pas stockés en base, ils sont calculés à la volée."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        title: "MongoDB - Niveau Expert Mondiale : Aggregation & Architectures",
        description: "Maîtrisez le pipeline d'agrégation, le traitement massif de données et la haute disponibilité. Devenez un expert du Big Data et des clusters distribués.",
        category: "Data",
        level: "Avancé",
        duration: "65 heures",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        rating: 4.9,
        students: 4000,
        language: "mongodb",
        isFree: true,
        tags: ["MongoDB", "Aggregation", "Pipelines", "Sharding", "ReplicaSet", "avancé"],
        chapters: [
            {
                title: "Chapitre 1 : Le Framework d'Agrégation (Aggregation Pipeline)",
                description: "Le processeur de données de MongoDB. Apprenez à transformer, grouper et filtrer des millions de documents en étapes successives.",
                order: 1,
                duration: "20 heures",
                content: "L'agrégation est l'outil le plus puissant de MongoDB. Au lieu d'un simple `find`, on utilise un tableau d'étapes (`stages`). `$match` pour filtrer, `$group` pour calculer des stats, `$sort`, `$limit`, et surtout `$lookup` pour effectuer des jointures complexes. Vous apprendrez à construire des pipelines d'analyse de données capables de générer des rapports financiers ou des statistiques d'utilisation en temps réel directement sur le serveur de base de données.",
                objectives: ["Maîtriser le passage de données entre les étapes du pipeline", "Effectuer des jointures multi-collections avec $lookup", "Utiliser $unwind pour traiter les éléments d'un tableau individuellement"],
                exercises: [
                    {
                        title: "Chiffre d'Affaire par Client",
                        description: "Créez un pipeline qui filtre les ventes 'complétées', les groupe par 'client_id' et fait la somme du champ 'montant'.",
                        difficulty: "Difficile",
                        solution: "db.sales.aggregate([\n  { $match: { status: 'completed' } },\n  { $group: { _id: '$client_id', total: { $sum: '$montant' } } }\n]);",
                        hints: ["Utilisez le préfixe $ pour référencer un nom de champ dans une étape d'agrégation."]
                    }
                ],
                resources: [{ title: "MongoDB Aggregation by Example", type: "video", url: "https://www.youtube.com/embed/Kk6Er0c" }]
            },
            {
                title: "Chapitre 2 : Indexation Avancée (Multikey, Text, TTL)",
                description: "Gérez les cas spéciaux. Accélérez les recherches dans les tableaux, le texte plein et gérez l'expiration automatique des données.",
                order: 2,
                duration: "15 heures",
                content: "Les index standards ne suffisent pas toujours. Nous explorerons : 1) **Text Indexes** pour la recherche par mots-clés (moteur de recherche basique). 2) **TTL Indexes** (Time To Live) pour supprimer automatiquement les documents (ex: sessions, logs) après un délai. 3) **Partial Indexes** pour n'indexer qu'une partie de la collection (gain de place). Vous apprendrez également à gérer l'indexation des tableaux via les **Multikey Indexes**.",
                objectives: ["Implémenter une recherche textuelle floue", "Configurer une mise en cache auto-expirante via TTL", "Optimiser l'espace disque avec les index partiels"],
                exercises: [
                    {
                        title: "Suppression Automatique",
                        description: "Créez un index TTL qui supprime les documents de la collection 'logs' 3600 secondes après leur création.",
                        difficulty: "Moyen",
                        solution: "db.logs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });",
                        hints: ["Le champ doit être de type Date ou ISODate."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Replica Sets (Haute Disponibilité)",
                description: "Zéro temps d'arrêt. Apprenez à répliquer vos données sur plusieurs serveurs pour survivre aux pannes matérielles.",
                order: 3,
                duration: "15 heures",
                content: "En production, un serveur seul est un risque. Un **Replica Set** est un groupe d'instances MongoDB qui maintiennent le même jeu de données. Nous étudierons le mécanisme d'élection : si le Master (Primary) meurt, les Secondaries élisent un nouveau chef en quelques secondes de manière transparente pour l'application. Vous apprendrez à configurer la **Read Preference** pour orienter les lectures vers les secondaires et soulager le master.",
                objectives: ["Configurer un Replica Set local de 3 nœuds", "Comprendre le Write Concern pour garantir l'écriture sur plusieurs serveurs", "Gérer les problèmes de cohérence éventuelle (Eventual Consistency)"],
                exercises: [
                    {
                        title: "Le Rôle du Primaire",
                        description: "Dans un Replica Set, quelle est la seule instance autorisée à recevoir les opérations d'Écriture (Write) ?",
                        difficulty: "Facile",
                        solution: "L'instance Primary.",
                        hints: ["Les instances Secondary sont en lecture seule par défaut."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Sharding (Passage à l'Échelle Horizontale)",
                description: "Gérez des péta-octets de données. Apprenez à distribuer une collection unique sur des dizaines de serveurs physiques.",
                order: 4,
                duration: "15 heures",
                content: "Quand une seule machine ne suffit plus pour stocker ou traiter vos données, on utilise le **Sharding**. C'est le découpage horizontal des données. Nous étudierons le rôle des **Shard Keys**, du **Config Server** et du routeur **Mongos**. Vous apprendrez comment MongoDB répartit dynamiquement les morceaux de données (chunks) entre les serveurs pour équilibrer la charge. C'est le sommet de l'ingénierie database distribuée.",
                objectives: ["Identifier une bonne Shard Key pour éviter les points chauds (Hotspots)", "Comprendre l'architecture d'un cluster sharded", "Suivre les performances d'un cluster distribué"],
                exercises: [
                    {
                        title: "Choix de Shard Key",
                        description: "Pourquoi l'ID auto-incrémenté ou un Timestamp est généralement une MAUVAISE Shard Key ?",
                        difficulty: "Difficile",
                        solution: "Parce que toutes les nouvelles écritures iront vers le même Shard (le plus récent), créant un goulot d'étranglement alors que les autres serveurs restent inactifs.",
                        hints: ["On cherche une clé qui distribue les données de manière aléatoire ou uniforme sur tout le cluster."]
                    }
                ],
                resources: []
            }
        ]
    }
];

module.exports = mongodbCourses;
