const algoCourses = [
    {
        id: "algorithmique-niveau-d-butant",
        title: "Algorithmique - Niveau Débutant",
        description: "Plongez dans les bases absolues de l'algorithmique. Maîtrisez la séquentialité, la mémoire, les décisions et les itérations. Ce cours fondateur est conçu avec la plus grande rigueur académique pour forger votre esprit analytique.",
        category: "Théorie",
        level: "Débutant",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1516116216624-98e6e351d85e?w=800&q=80",
        rating: 4.9,
        students: 12050,
        language: "french",
        isFree: true,
        tags: ["algorithme", "logique", "débutant", "bases", "fondations"],
        chapters: [
            {
                title: "Chapitre 1 : L'Algorithme : C'est quoi au juste ?",
                description: "Désacralisons le mot 'algorithme'. Indice : vous en utilisez déjà tous les jours sans le savoir.",
                order: 1,
                duration: "1 heure",
                content: "Un algorithme n'est pas une formule mathématique complexe réservée aux génies de la NASA. C'est simplement une **liste d'étapes précises** pour accomplir une tâche. \n\n* Pourquoi l'apprend-on ? \nPour résoudre des problèmes de manière logique. \n* Prenons une recette de cuisine : \n1. Chauffer l'eau. \n2. Mettre les pâtes. \n3. Attendre 8 min. \nC'est un algorithme ! Si vous changez l'ordre (mettre les pâtes avant de chauffer l'eau), le résultat est raté. En informatique, c'est pareil : l'ordinateur suit vos instructions à la lettre, dans l'ordre où vous les donnez.",
                objectives: ["Comprendre qu'un algorithme est une suite d'étapes", "Réaliser que l'ordinateur est un exécutant aveugle", "Identifier des algorithmes dans la vie réelle"],
                exercises: [
                    {
                        title: "Analogie : Le Matin",
                        description: "Mettez ces étapes dans le bon ordre logique pour un algorithme 'Se préparer le matin' : [S'habiller, Se lever, Prendre son petit-déjeuner]",
                        difficulty: "Trés Facile",
                        solution: "1. Se lever\n2. Prendre son petit-déjeuner\n3. S'habiller",
                        hints: ["On ne s'habille généralement pas avant de sortir du lit !"]
                    }
                ],
                resources: [
                    { title: "Introduction aux algorithmes (Video)", type: "video", url: "https://www.youtube.com/embed/kM9VKRowit0" }
                ]
            },
            {
                title: "Chapitre 2 : L'Ordinateur : Une machine bête mais rapide",
                description: "Pourquoi devons-nous être si précis ? Apprenez comment l'ordinateur 'pense'.",
                order: 2,
                duration: "1 heure",
                content: "L'ordinateur est l'élève le plus bête du monde, mais il court à la vitesse de la lumière. Il ne comprend pas le 'à peu près'. \n\n* Le cycle de vie d'un programme : \n1. Entrée (Input) : Vous lui donnez une info (un clic, un texte). \n2. Traitement : Il suit votre algorithme. \n3. Sortie (Output) : Il affiche le résultat. \n\nSi vous lui dites 'Fais un café', il ne saura pas quoi faire. Vous devez lui dire : 'Prends la tasse, pose-la ici, appuie sur ce bouton'. C'est cette **précision chirurgicale** que nous allons apprendre.",
                objectives: ["Distinguer Entrée, Traitement et Sortie", "Comprendre que l'ordinateur n'a pas d'intuition"],
                exercises: [
                    {
                        title: "Le Robot Idiot",
                        description: "Si vous dites à un robot 'Marche jusqu'au mur' sans lui dire de s'arrêter, que se passera-t-il ?",
                        difficulty: "Facile",
                        solution: "Il va continuer de marcher contre le mur indéfiniment car il n'a pas reçu l'instruction de s'arrêter. Il n'a pas d'instinct de conservation.",
                        hints: ["L'ordinateur ne devine jamais vos intentions."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : La Pensée Séquentielle : L'ordre fait tout",
                description: "Pourquoi l'étape 1 doit toujours venir avant l'étape 2.",
                order: 3,
                duration: "2 heures",
                content: "En algorithmique, on lit de **haut en bas**. \n\nImaginez que vous vouliez verser de l'eau dans un verre. \n* Algorithme A : 1. Ouvrir la bouteille. 2. Verser. (Réussite) \n* Algorithme B : 1. Verser. 2. Ouvrir la bouteille. (Catastrophe) \n\nL'ordinateur ne reviendra jamais en arrière pour 'corriger' votre erreur si vous avez oublié d'ouvrir la bouteille. Chaque ligne de code est une commande impérative.",
                objectives: ["Maîtriser la lecture descendante", "Anticiper les erreurs d'inversion logique"],
                exercises: [
                    {
                        title: "Le Verre d'Eau",
                        description: "Pourquoi l'Algorithme B échoue-t-il ?",
                        difficulty: "Facile",
                        solution: "Parce qu'au moment de l'étape 1 (Verser), la bouteille est encore fermée. L'ordinateur n'anticipe pas que l'étape 2 va l'ouvrir.",
                        hints: ["L'ordinateur ne connaît que le présent de la ligne qu'il exécute."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : L'État : Pourquoi se souvenir de choses ?",
                description: "L'ordinateur n'a pas de mémoire naturelle. Nous devons lui créer des souvenirs.",
                order: 4,
                duration: "2 heures",
                content: "Si je vous demande votre âge, vous le savez. L'ordinateur, lui, oublie tout dès qu'il a fini une ligne, sauf si on lui dit explicitement de **garder une info**. \n\n* C'est ce qu'on appelle l'état du programme. \n* Sans mémoire, un jeu vidéo ne saurait pas quel est votre score ou combien de vies il vous reste. \n\nNous allons apprendre à créer des 'petites boîtes' pour stocker ces informations. Ces boîtes sont les fondations de tout ce qui suit.",
                objectives: ["Comprendre le besoin de stockage d'information", "Visualiser l'état d'un programme"],
                exercises: [
                    {
                        title: "Le Score du Jeu",
                        description: "Si un jeu ne stockait pas le score en mémoire, que se passerait-il à chaque fois que vous tuez un monstre ?",
                        difficulty: "Facile",
                        solution: "Le score afficherait '1' puis reviendrait à '0' immédiatement car il ne 'se souviendrait' pas des points précédents.",
                        hints: ["La mémoire permet d'accumuler des résultats."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 5 : La Mémoire Vive (RAM) : Les Milliers de Boîtes",
                description: "Entrez dans le cerveau physique de la machine.",
                order: 5,
                duration: "3 heures",
                content: "Imaginez la mémoire de l'ordinateur (la RAM) comme un immense entrepôt rempli de **millions de boîtes vides**. \n\n* Chaque boîte a une adresse (un numéro). \n* Pour ne pas s'embrouiller avec des numéros compliqués, nous, les humains, allons donner des **Noms** à ces boîtes. \n\nC'est la naissance du concept de **Variable**. En haut niveau, on ne dit pas 'Cherche dans la boîte n°4587', on dit 'Cherche dans la boîte qui s'appelle Score'.",
                objectives: ["Visualiser la RAM comme un espace de stockage", "Comprendre le lien entre adresse physique et nom symbolique"],
                exercises: [
                    {
                        title: "L'Entrepôt",
                        description: "Pourquoi est-il plus facile pour un humain d'utiliser des noms de boîtes plutôt que des numéros d'adresses ?",
                        difficulty: "Facile",
                        solution: "Parce que retenir 'Prénom' est plus naturel et logique que de retenir 'Adresse 0x7FFF1234'. Les noms donnent du sens au code.",
                        hints: ["L'informatique est faite par des humains pour des humains."]
                    }
                ],
                resources: [
                    { title: "Comment fonctionne la RAM ? (Video)", type: "video", url: "https://www.youtube.com/embed/p3q5zWCw8J4" }
                ]
            },
            {
                title: "Chapitre 6 : La Variable : Donner un nom à une boîte",
                description: "Apprenez à identifier vos données pour ne jamais les perdre.",
                order: 6,
                duration: "2 heures",
                content: "Une variable, c'est l'association d'un **Nom** (l'étiquette) et d'une **Valeur** (ce qu'il y a dedans). \n\n* Analogie : Imaginez que vous rangiez vos vêtements. Vous n'écrivez pas 'Boîte 1' sur le carton, vous écrivez 'Chaussettes'. \n* En informatique, on fait pareil. Si on stocke le nom de l'utilisateur, on appelle la variable `nomUtilisateur`. \n\nC'est ce qu'on appelle un **identificateur**. Il doit être unique pour que l'ordinateur sache exactement de quelle boîte vous parlez.",
                objectives: ["Comprendre le concept d'identificateur", "Distinguer le nom de la variable de sa valeur"],
                exercises: [
                    {
                        title: "L'Étiquette",
                        description: "Si vous créez une variable `vitesse` et que vous y mettez `50`. Quel est le NOM et quelle est la VALEUR ?",
                        difficulty: "Trés Facile",
                        solution: "Le NOM est 'vitesse'. La VALEUR est '50'.",
                        hints: ["Le nom est l'étiquette sur la boîte."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 7 : Le Nommage : L'art de la clarté",
                description: "Pourquoi `a = 10` est une mauvaise idée, mais `nombreDeVies = 10` est génial.",
                order: 7,
                duration: "1 heure",
                content: "Le code est écrit pour être lu par des humains. Si vous appelez toutes vos variables `a`, `b`, `x`, vous allez vous perdre en 5 minutes. \n\n* Les bonnes pratiques : \n1. Soyez descriptif : `prixTotal` au lieu de `p`. \n2. Utilisez une convention : \n   * **camelCase** : `monScoreFinal` (utilisé en JS, Java, C). \n   * **snake_case** : `mon_score_final` (utilisé en Python). \n\nUn bon nom de variable explique ce que contient la boîte sans même avoir besoin de regarder dedans.",
                objectives: ["Apprendre les conventions camelCase et snake_case", "Comprendre l'importance de la sémantique"],
                exercises: [
                    {
                        title: "Le Baptême",
                        description: "Proposez un bon nom en camelCase pour stocker le nombre de jours restant avant Noël.",
                        difficulty: "Facile",
                        solution: "`joursRestantsAvantNoel`",
                        hints: ["Commencez par une minuscule, puis une majuscule à chaque nouveau mot."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 8 : L'Affectation (=) : Mettre une valeur dans la boîte",
                description: "Le symbole `=` ne signifie pas 'égalité' au sens mathématique. C'est un mouvement !",
                order: 8,
                duration: "2 heures",
                content: "Attention, c'est le piège n°1 des débutants ! \n\n* En maths : `x = 5` veut dire que x est égal à 5. \n* En informatique : `x = 5` est une **instruction d'affectation**. \n   * Cela veut dire : 'Prends la valeur 5 et **écrase** ce qu'il y avait dans la boîte x par 5'. \n\nC'est un mouvement de la droite vers la gauche : `Boîte = Valeur`. Si vous écrivez `5 = x`, l'ordinateur explose (virtuellement) car on ne peut pas mettre une variable dans le chiffre 5 !",
                objectives: ["Maîtriser le sens de l'affectation (droite vers gauche)", "Comprendre que l'affectation écrase la valeur précédente"],
                exercises: [
                    {
                        title: "L'Écrasement",
                        description: "Si `score = 10` puis à la ligne suivante `score = 20`. Que vaut `score` à la fin ?",
                        difficulty: "Facile",
                        solution: "20. La valeur 10 a été totalement écrasée et remplacée par 20.",
                        hints: ["L'ordinateur ne garde que le dernier état."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 9 : La Lecture vs L'Écriture : Regarder vs Remplir",
                description: "Sachez quand vous utilisez la valeur et quand vous la changez.",
                order: 9,
                duration: "2 heures",
                content: "Il y a deux façons d'utiliser une variable : \n\n1. **L'écriture** : Quand elle est à gauche du `=`. (`score = 100`) \n2. **La lecture** : Quand on l'utilise ailleurs. (`afficher(score)`) \n\nSi vous essayez de lire une variable qui n'a jamais été remplie (écrite), l'ordinateur va paniquer (« Undefined » ou « Null »). C'est comme essayer de lire une lettre dans une boîte aux lettres vide.",
                objectives: ["Distinguer les phases de lecture et d'écriture", "Comprendre le danger des variables non-initialisées"],
                exercises: [
                    {
                        title: "La Boîte Vide",
                        description: "Que se passe-t-il si je demande à l'ordinateur d'afficher `prix` alors que je n'ai jamais défini `prix = ...` ?",
                        difficulty: "Facile",
                        solution: "Une erreur survient car l'ordinateur ne sait pas ce que contient 'prix'. Elle n'est pas initialisée.",
                        hints: ["On ne peut pas lire ce qui n'existe pas."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 10 : Les Types de données : Pourquoi trier ?",
                description: "Toutes les données ne se ressemblent pas. Apprenez à les classer.",
                order: 10,
                duration: "2 heures",
                content: "Dans vos boîtes, vous pouvez mettre des choses très différentes. \n\n* Si vous essayez de faire une addition entre un Prénom ('Alice') et un Chiffre (5), l'ordinateur est perdu. \n* C'est pourquoi on définit des **Types**. \n\nLe type définit ce qu'on a le droit de faire avec la donnée. On peut multiplier deux chiffres, mais on ne peut pas diviser une phrase par deux (en tout cas, pas naturellement !). Nous allons voir les 4 types de base dans les prochains chapitres.",
                objectives: ["Comprendre l'utilité des types", "Réaliser que les opérations dépendent du type"],
                exercises: [
                    {
                        title: "L'Intrus",
                        description: "Laquelle de ces opérations semble illogique pour un ordinateur ? A: 5 + 5 / B: 'Bonjour' * 5 / C: 10 - 2",
                        difficulty: "Facile",
                        solution: "B: 'Bonjour' * 5 (Sauf dans certains langages comme Python, mais logiquement, on ne multiplie pas du texte par un nombre mathématiquement).",
                        hints: ["Réfléchissez au sens mathématique des symboles."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 11 : Les Entiers (Integer) : L'art de compter",
                description: "Le type le plus utilisé : pour tout ce qui ne se coupe pas en morceaux.",
                order: 11,
                duration: "2 heures",
                content: "L'**Entier** (ou `int`) sert à stocker des nombres sans virgule. \n\n* Exemples : Un nombre de vies (3), un âge (20), un nombre de clics (150). \n* Un ordinateur traite les entiers très rapidement car ils sont stockés simplement en binaire. \n* La seule règle : vous ne pouvez pas mettre `1.5` dans un entier. Si vous le faites, l'ordinateur va simplement 'couper' la virgule et garder `1` (on appelle ça la troncature).",
                objectives: ["Identifier quand utiliser un entier", "Comprendre la notion de troncature"],
                exercises: [
                    {
                        title: "Le Compteur",
                        description: "Si j'ai une variable `nombreEnfants = 2.5`. Que vaudra-t-elle réellement en mémoire si c'est un Entier ?",
                        difficulty: "Trés Facile",
                        solution: "2. La partie décimale est supprimée.",
                        hints: ["On ne peut pas avoir une moitié d'enfant !"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 12 : Les Réels (Float/Double) : La précision du monde",
                description: "Pour les poids, les prix, et tout ce qui demande de la finesse.",
                order: 12,
                duration: "2 heures",
                content: "Quand vous avez besoin de virgules, vous utilisez un **Réel** (souvent appelé `float` ou `double`). \n\n* Pourquoi deux noms ? `float` est précis, `double` est **doublement** précis. \n* Attention : En informatique, on n'utilise pas la virgule `,` mais le **point** `.` (ex: `10.5`). \n* Les réels prennent un peu plus de place en mémoire que les entiers, donc on ne les utilise que si c'est nécessaire.",
                objectives: ["Apprendre à utiliser le point décimal", "Choisir entre entier et réel selon le besoin"],
                exercises: [
                    {
                        title: "Le Juste Prix",
                        description: "Quelle variable doit être un Réel ? A: Nombre d'articles / B: Prix total du panier",
                        difficulty: "Facile",
                        solution: "B: Prix total du panier (car il peut y avoir des centimes, ex: 15.99).",
                        hints: ["Est-ce que ça peut avoir une virgule ?"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 13 : Les Chaînes de caractères (String) : Parler à l'humain",
                description: "Stockez du texte, des noms, des adresses ou même des émojis.",
                order: 13,
                duration: "2 heures",
                content: "Une **Chaîne** (ou `string`) est une suite de lettres, de chiffres ou de symboles. \n\n* Règles d'or : On entoure toujours le texte de **guillemets** (`\"Bonjour\"`). \n* Sans guillemets, l'ordinateur croit que `bonjour` est le nom d'une variable. \n* Avec guillemets, il comprend que c'est du texte brut à afficher. \n\nUne chaîne de caractères peut être vide (`\"\"`) ou très longue.",
                objectives: ["Apprendre l'usage des guillemets", "Distinguer une variable d'une chaîne de texte"],
                exercises: [
                    {
                        title: "Le Message",
                        description: "Quelle est la différence entre `score` et `\"score\"` ?",
                        difficulty: "Facile",
                        solution: "`score` est une variable (une boîte qui contient une valeur), alors que `\"score\"` est juste le mot 'score' écrit en texte.",
                        hints: ["Les guillemets changent tout !"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 14 : Les Booléens (True/False) : La base du choix",
                description: "Le type le plus simple : Oui ou Non. Vrai ou Faux.",
                order: 14,
                duration: "2 heures",
                content: "Le **Booléen** (ou `boolean`) ne peut avoir que deux valeurs : `Vrai` (True) ou `Faux` (False). \n\n* C'est le cerveau de la logique. \n* On s'en sert pour vérifier des conditions : \n   * `estConnecte = Vrai` \n   * `partieTerminee = Faux` \n\nToute la logique de l'ordinateur repose sur ces deux états (le fameux 0 et 1).",
                objectives: ["Comprendre l'aspect binaire de la logique", "Utiliser les booléens pour des drapeaux (flags)"],
                exercises: [
                    {
                        title: "L'Interrupteur",
                        description: "Si je veux savoir si un utilisateur a accepté les conditions d'utilisation, quel type de variable dois-je utiliser ?",
                        difficulty: "Trés Facile",
                        solution: "Un Booléen (Vrai s'il a accepté, Faux sinon).",
                        hints: ["C'est une réponse par oui ou non."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 15 : Les Opérateurs mathématiques : La trousse à outils",
                description: "Addition, Soustraction, Multiplication, Division : transformez vos données.",
                order: 15,
                duration: "2 heures",
                content: "Maintenant que nous avons des boîtes avec des chiffres, il faut savoir les manipuler. \n\n* `+` : Addition \n* `-` : Soustraction \n* `*` : Multiplication \n* `/` : Division \n\nVous pouvez combiner des variables et des nombres : `total = prix + 5`. L'ordinateur va lire la valeur de `prix`, lui ajouter 5, et mettre le résultat dans la boîte `total`. L'ordre des opérations (PEMDAS) s'applique ici aussi !",
                objectives: ["Réaliser des calculs simples", "Combiner variables et opérateurs"],
                exercises: [
                    {
                        title: "Le Calculateur",
                        description: "Si `a = 5` et `b = 10`. Que vaut `c` si `c = a + b` ?",
                        difficulty: "Trés Facile",
                        solution: "15",
                        hints: ["Remplacez les noms par leurs valeurs."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 16 : La Priorité des opérations : L'ordre caché",
                description: "Apprenez pourquoi l'ordinateur fait les multiplications avant les additions.",
                order: 16,
                duration: "1 heure",
                content: "Tout comme à l'école, l'ordinateur suit des règles de priorité. \n\n* Si vous écrivez `res = 1 + 2 * 3`, l'ordinateur va calculer `2 * 3` (= 6) puis ajouter `1` (= 7). \n* Si vous vouliez faire l'addition en premier, vous devez utiliser des **parenthèses** : `res = (1 + 2) * 3` (= 9). \n\nLes parenthèses sont vos meilleures amies pour être sûr que l'ordinateur fait exactement ce que vous avez en tête.",
                objectives: ["Comprendre la hiérarchie des opérateurs", "Utiliser les parenthèses pour forcer un ordre"],
                exercises: [
                    {
                        title: "Le Piège",
                        description: "Que vaut `x` si `x = 10 / 2 + 3` ?",
                        difficulty: "Facile",
                        solution: "8 (10/2 = 5, puis 5 + 3 = 8)",
                        hints: ["La division est prioritaire sur l'addition."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 17 : Le Modulo (%) : L'outil secret du reste",
                description: "Le signe % ne calcule pas un pourcentage, mais le reste d'une division.",
                order: 17,
                duration: "2 heures",
                content: "Le **Modulo** est l'un des opérateurs les plus utiles en programmation. \n\n* `10 % 3` donne `1`. Pourquoi ? Parce que dans 10, il y a 3 fois 3 (9) et il reste **1**. \n* À quoi ça sert ? \n   1. Savoir si un nombre est pair : `nombre % 2 == 0`. \n   2. Gérer des cycles (jours de la semaine, heures). \n\nC'est la division de l'école primaire où on s'arrête avant la virgule !",
                objectives: ["Comprendre le calcul du reste", "Identifier l'utilité du modulo pour la parité"],
                exercises: [
                    {
                        title: "Pair ou Impair ?",
                        description: "Si `n % 2` donne `1`, le nombre `n` est-il pair ou impair ?",
                        difficulty: "Facile",
                        solution: "Impair. Car s'il reste 1 après division par 2, c'est qu'il n'est pas divisible par 2.",
                        hints: ["Un nombre pair a toujours un reste de 0 quand on le divise par 2."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 18 : L'Algèbre de Boole : ET, OU, NON",
                description: "Apprenez à combiner vos vérités pour créer des conditions complexes.",
                order: 18,
                duration: "2 heures",
                content: "Parfois, une seule condition ne suffit pas. \n\n* **Le ET (&&)** : La condition est vraie si TOUT est vrai. (Ex: 'J'ai faim' ET 'Le frigo est plein'). \n* **Le OU (||)** : La condition est vraie si AU MOINS UN truc est vrai. (Ex: 'J'ai une carte' OU 'J'ai du liquide'). \n* **Le NON (!)** : Inverse le résultat. (Le NON de Vrai est Faux). \n\nC'est comme ça qu'on construit des raisonnements complexes comme : 'SI l'utilisateur est admin OU s'il possède le fichier...'.",
                objectives: ["Distinguer le fonctionnement du ET et du OU", "Utiliser l'opérateur de négation"],
                exercises: [
                    {
                        title: "La Sortie",
                        description: "Pour sortir dehors, il faut (Il fait beau) ET (J'ai fini mes devoirs). Si 'Il fait beau' est VRAI mais 'J'ai fini mes devoirs' est FAUX, puis-je sortir ?",
                        difficulty: "Facile",
                        solution: "Non. Avec un ET, toutes les conditions doivent être vraies.",
                        hints: ["Le ET est très strict."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 19 : La Condition Simple (SI) : Faire un choix",
                description: "L'ordinateur commence à devenir intelligent : il peut choisir quel code exécuter.",
                order: 19,
                duration: "2 heures",
                content: "C'est la structure la plus importante : le **SI** (ou `if`). \n\n* Structure : `SI (condition) ALORS (instructions)`. \n* Si la condition est vraie, l'ordinateur exécute le code à l'intérieur. \n* Si elle est fausse, il **saute** tout simplement le bloc et continue son chemin de haut en bas. \n\nC'est grâce au SI qu'un jeu peut dire : 'SI vies == 0 ALORS Game Over'.",
                objectives: ["Comprendre le déroutement du code", "Savoir écrire une structure SI simple"],
                exercises: [
                    {
                        title: "Le Videur",
                        description: "Écrivez en français la condition pour laisser entrer quelqu'un dans une boîte de nuit si l'âge minimum est 18.",
                        difficulty: "Facile",
                        solution: "SI (age >= 18) ALORS Entrée autorisée",
                        hints: ["Utilisez le signe 'supérieur ou égal'."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 20 : La Condition Alternative (SINON) : Le Plan B",
                description: "Gérez ce qui se passe quand la condition n'est pas remplie.",
                order: 20,
                duration: "2 heures",
                content: "Le **SINON** (ou `else`) complète le SI. \n\n* Structure : `SI (condition) ALORS (A) SINON (B)`. \n* C'est une porte à deux sorties. L'ordinateur prendra FORCÉMENT soit le chemin A, soit le chemin B. \n* Jamais les deux, et jamais aucun des deux. \n\nExemple : SI (score > 50) ALORS 'Gagné' SINON 'Perdu'.",
                objectives: ["Maîtriser l'alternative binaire", "Comprendre l'aspect exclusif du SI/SINON"],
                exercises: [
                    {
                        title: "Le Pile ou Face",
                        description: "Dans une structure SI/SINON, est-il possible que les deux blocs d'instructions soient exécutés en même temps ?",
                        difficulty: "Facile",
                        solution: "Non, c'est impossible. C'est soit l'un, soit l'autre.",
                        hints: ["C'est comme un carrefour : on ne peut pas aller à gauche et à droite en même temps."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 21 : Les Conditions Imbriquées : Choix dans le choix",
                description: "Apprenez à gérer des situations à plusieurs tiroirs.",
                order: 21,
                duration: "2 heures",
                content: "Parfois, une seule alternative (Vrai/Faux) ne suffit pas. On peut mettre un SI à l'intérieur d'un autre SI. \n\n* Exemple : \n  * SI (Il pleut) ALORS \n    * SI (J'ai un parapluie) ALORS 'Sortir' \n    * SINON 'Rester au sec' \n  * SINON 'Sortir bronzer' \n\nC'est ce qu'on appelle l'**imbrication**. C'est très puissant mais attention : si vous en mettez trop, votre code devient un vrai labyrinthe que personne ne comprend !",
                objectives: ["Comprendre la hiérarchie des conditions", "Apprendre à indenter son code pour la clarté"],
                exercises: [
                    {
                        title: "Le Labyrinthe",
                        description: "Si 'Il pleut' est VRAI mais 'J'ai un parapluie' est FAUX. Selon l'exemple ci-dessus, que fait-on ?",
                        difficulty: "Facile",
                        solution: "On reste au sec.",
                        hints: ["Suivez les étapes une par une, de l'extérieur vers l'intérieur."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 22 : Le Switch (Le 'Selon') : Gérer plusieurs cas",
                description: "Une alternative élégante quand vous avez beaucoup de choix prédéfinis.",
                order: 22,
                duration: "2 heures",
                content: "Quand vous avez 10 choix possibles (ex: un menu avec 10 plats), faire 10 'SI... SINON SI...' est fatiguant. \n\n* On utilise alors le **Selon** (ou `switch`). \n* On dit à l'ordinateur : 'SELON la valeur de la variable Choix, fais tel ou tel truc'. \n* Chaque possibilité est un `cas` (case). \n\nC'est beaucoup plus propre et lisible pour gérer des menus, des directions ou des modes de jeu.",
                objectives: ["Découvrir la structure switch/case", "Savoir quand préférer le switch au if/else"],
                exercises: [
                    {
                        title: "Le Menu du Restaurant",
                        description: "Si j'ai un menu avec 3 options : (1: Pizza, 2: Burger, 3: Salade). Pourquoi un Switch est-il plus adapté qu'un IF ?",
                        difficulty: "Facile",
                        solution: "Parce que c'est plus lisible et évite de répéter 'SI... SINON SI...' trois fois.",
                        hints: ["Pensez à la clarté de lecture pour un autre humain."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 23 : Introduction à l'Itération : Pourquoi ne pas copier-coller ?",
                description: "Dites adieu aux tâches répétitives et ennuyeuses.",
                order: 23,
                duration: "2 heures",
                content: "Imaginez que vous deviez afficher 'Bonjour' 100 fois. \n* Mauvaise méthode : Écrire 100 lignes de code. (Si vous voulez changer 'Bonjour' en 'Salut', vous devez le faire 100 fois !). \n* Bonne méthode : L'**Itération** (la boucle). \n\nOn dit à l'ordinateur : 'Répète cette ligne tant que je ne te dis pas d'arrêter'. C'est la base de tout traitement de masse (gérer 10 000 clients, 1 000 000 de pixels, etc.).",
                objectives: ["Comprendre le concept de répétition automatique", "Identifier le besoin de boucles"],
                exercises: [
                    {
                        title: "La Punition",
                        description: "Un élève doit copier 100 fois 'Je ne dois pas parler en classe'. Combien d'instructions un algorithme bien fait doit-il comporter pour faire ça ?",
                        difficulty: "Facile",
                        solution: "Une seule instruction à l'intérieur d'une consigne de répétition.",
                        hints: ["Ne comptez pas l'affichage, mais la logique de répétition."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 24 : La Boucle 'Tant que' (While) : Répéter tant que...",
                description: "La boucle la plus simple : l'ordinateur vérifie avant chaque tour si c'est fini.",
                order: 24,
                duration: "3 heures",
                content: "La boucle **TANT QUE** (ou `while`) est comme un garde-barrière. \n\n* Tant que la condition est VRAIE, il vous laisse refaire un tour. \n* Dès qu'elle devient FAUSSE, il ferme la barrière et vous sortez de la boucle. \n\n**Attention au piège !** Si la condition est toujours vraie et ne change jamais, l'ordinateur boucle à l'infini et plante (le fameux 'Infinite Loop'). Vous devez toujours avoir un truc qui change à l'intérieur pour un jour sortir.",
                objectives: ["Maîtriser la boucle while", "Apprendre à éviter les boucles infinies"],
                exercises: [
                    {
                        title: "Le Réservoir",
                        description: "Si on vide un réservoir de 10L à coup de 1L. Quelle est la condition pour continuer à vider ?",
                        difficulty: "Facile",
                        solution: "Tant que (reservoir > 0)",
                        hints: ["On s'arrête quand il n'y a plus rien."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 25 : Premier pas vers l'optimisation : Vers le niveau Intermédiaire",
                description: "Félicitations ! Vous avez les bases. Voyons la suite du voyage.",
                order: 25,
                duration: "2 heures",
                content: "Vous savez maintenant : \n1. Comment l'ordinateur stocke des infos (Variables/Types). \n2. Comment il calcule (Opérateurs). \n3. Comment il choisit (Conditions). \n4. Comment il répète (Boucles). \n\nVous avez les 'briques' de Lego. Dans le niveau Intermédiaire, nous allons apprendre à construire des châteaux : des **Tableaux** pour grouper les données et des **Fonctions** pour ne jamais se répéter. \n\n*Prochaine étape : Maîtriser les collections de données !*",
                objectives: ["Récapituler les acquis du niveau débutant", "Se préparer psychologiquement au niveau intermédiaire"],
                exercises: [
                    {
                        title: "Le Quiz Final",
                        description: "Quel concept permet de ne pas écrire 1000 fois la même ligne ?",
                        difficulty: "Trés Facile",
                        solution: "La Boucle (ou l'Itération).",
                        hints: ["C'est l'outil de répétition."]
                    }
                ],
                resources: []
            },
        ]
    },
    {
        id: "algorithmique-niveau-interm-diaire",
        title: "Algorithmique - Niveau Intermédiaire",
        description: "Élevez votre niveau. L'heure n'est plus à la syntaxe, mais à la structuration avancée des données et à la modularisation via les Fonctions. Ce module est le rempart pour devenir un vrai développeur complet.",
        category: "Théorie",
        level: "Intermédiaire",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        students: 8540,
        language: "french",
        isFree: true,
        tags: ["algorithme", "tableaux", "tris", "fonctions", "intermédiaire"],
        chapters: [
            {
                title: "Chapitre 26 : Le Tableau (Array) : L'étagère de données",
                description: "Apprenez à regrouper vos boîtes sous un seul nom.",
                order: 26,
                duration: "3 heures",
                content: "Jusqu'à présent, nous avions des variables séparées (`vie1`, `vie2`, `vie3`). C'est lourd ! \n\n* Un **Tableau** (Array) est une étagère géante qui porte un seul nom. \n* Dans cette étagère, on peut mettre autant de boîtes que l'on veut. \n* Analogie : Une boîte de 12 œufs est un tableau. Vous portez la boîte (le tableau), mais elle contient 12 éléments individuels. \n\nC'est l'outil indispensable pour gérer des listes de clients, des inventaires d'objets ou des scores de joueurs.",
                objectives: ["Comprendre le concept de collection de données", "Visualiser la structure contiguë d'un tableau"],
                exercises: [
                    {
                        title: "L'Inventaire",
                        description: "Si je veux stocker les noms de 500 épées dans un jeu vidéo, est-il préférable d'utiliser 500 variables ou 1 tableau ?",
                        difficulty: "Trés Facile",
                        solution: "1 tableau. C'est beaucoup plus simple à manipuler et à transporter dans le code.",
                        hints: ["Imaginez devoir écrire `epee1`, `epee2`... jusqu'à 500."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 27 : Indices et Longueur : Compter à partir de Zéro",
                description: "Le concept le plus étrange mais vital : on commence par zéro !",
                order: 27,
                duration: "2 heures",
                content: "Pour désigner une boîte précise dans l'étagère, on utilise un **Index** (ou indice). \n\n* **Règle absolue** : En informatique, la première case est la n°0. \n* Si mon tableau `fruits` contient [\"Pomme\", \"Banane\"], alors : \n   * `fruits[0]` est la Pomme. \n   * `fruits[1]` est la Banane. \n\nLa **Longueur** (length) du tableau est le nombre total d'éléments. Ici, la longueur est 2, mais l'index maximum est 1. Ne pas oublier ça évite bien des bugs !",
                objectives: ["Maîtriser l'indexation à partir de zéro", "Distinguer la longueur de l'index"],
                exercises: [
                    {
                        title: "Le Premier Élément",
                        description: "Dans le tableau `nombres = [10, 20, 30]`. Quel est l'index de la valeur `10` ?",
                        difficulty: "Trés Facile",
                        solution: "0",
                        hints: ["On commence toujours par zéro."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 28 : Parcours de Tableau : La visite guidée",
                description: "Apprenez à passer en revue chaque élément un par un.",
                order: 28,
                duration: "3 heures",
                content: "Si vous avez 1000 clients dans votre tableau, vous n'allez pas écrire 1000 lignes pour les afficher. \n\n* On utilise une **Boucle** pour 'parcourir' le tableau. \n* On dit à l'ordinateur : \n  * 'Variable `i` commence à 0'. \n  * 'Tant que `i` est inférieur à la longueur du tableau'. \n  * 'Affiche l'élément à l'index `i`'. \n  * 'Ajoute 1 à `i`'. \n\nC'est ainsi qu'on peut traiter des millions de données en une fraction de seconde.",
                objectives: ["Combiner boucles et tableaux", "Comprendre le mécanisme d'itération par index"],
                exercises: [
                    {
                        title: "La Boucle de Parcours",
                        description: "Quel est l'élément qui change à chaque tour de boucle pour passer à l'élément suivant ?",
                        difficulty: "Facile",
                        solution: "L'index (souvent noté `i`).",
                        hints: ["C'est l'étage de l'étagère que l'on regarde."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 29 : Modification de Tableau : Remplacer un étage",
                description: "Changez le contenu d'une case précise sans toucher aux autres.",
                order: 29,
                duration: "2 heures",
                content: "Un tableau est dynamique. On peut changer la valeur d'une case à tout moment. \n\n* Syntaxe : `tableau[index] = nouvelleValeur`. \n* Exemple : `monPanier[0] = \"Pizza\"`. \n* Ça fonctionne exactement comme une variable normale, sauf qu'on précise quel 'tiroir' on ouvre. \n\nC'est utile pour mettre à jour un score, changer un nom d'utilisateur ou remplacer un objet cassé dans un inventaire.",
                objectives: ["Apprendre l'affectation par index", "Modifier des données existantes dans une collection"],
                exercises: [
                    {
                        title: "Le Remplacement",
                        description: "Si `tab = [1, 2, 3]`. Je fais `tab[1] = 10`. Que contient `tab` maintenant ?",
                        difficulty: "Facile",
                        solution: "[1, 10, 3]",
                        hints: ["N'oubliez pas que l'index 1 est la DEUXIÈME case."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 30 : Recherche Linéaire : Trouver l'intrus",
                description: "Votre premier algorithme de recherche concret.",
                order: 30,
                duration: "4 heures",
                content: "Comment savoir si le mot \"Alice\" est dans votre liste de 500 invités ? \n\n* On utilise la **Recherche Linéaire** : \n  1. On parcourt le tableau du début à la fin. \n  2. Pour chaque case, on SI (valeur == \"Alice\") ALORS 'Trouvé !'. \n  3. Si on arrive à la fin sans rien trouver, on affiche 'Absent'. \n\nC'est la méthode la plus simple, mais elle peut être lente si le tableau est gigantesque. Nous verrons des méthodes plus rapides plus tard !",
                objectives: ["Implémenter une logique de recherche simple", "Comprendre le concept d'échec de recherche (fin de tableau)"],
                exercises: [
                    {
                        title: "Où est Charlie ?",
                        description: "Dans le pire des cas, combien de cases doit-on regarder pour trouver un élément dans un tableau de taille 100 ?",
                        difficulty: "Facile",
                        solution: "100 cases (si l'élément est à la toute fin ou s'il n'existe pas).",
                        hints: ["On doit tout vérifier pour être sûr."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 31 : Les Tableaux à 2 Dimensions : Grilles et Matrices",
                description: "Apprenez à gérer des plans, des cartes et des tableaux Excel.",
                order: 31,
                duration: "4 heures",
                content: "Un tableau à 2 dimensions est un tableau qui contient d'autres tableaux. \n\n* Analogie : Une grille de Sudoku ou un échiquier. \n* Pour trouver une case, il faut deux indices : `grille[ligne][colonne]`. \n* `grille[0][0]` est le coin en haut à gauche. \n\nC'est la base de tout ce qui est graphique ou spatial en informatique : la position d'un joueur sur une carte, ou les pixels d'une image.",
                objectives: ["Visualiser une matrice", "Manipuler le double indexage [i][j]"],
                exercises: [
                    {
                        title: "La Bataille Navale",
                        description: "Si je veux viser la case à la 3ème ligne et 5ème colonne, quel code dois-je écrire ?",
                        difficulty: "Facile",
                        solution: "`grille[2][4]`",
                        hints: ["N'oubliez pas que l'on commence à 0 !"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 32 : Introduction aux Fonctions : Votre premier employé",
                description: "Le secret pour ne plus jamais copier-coller de code.",
                order: 32,
                duration: "3 heures",
                content: "Une **Fonction** est un petit programme autonome à l'intérieur de votre programme. \n\n* Pourquoi l'utiliser ? Pour donner un nom à une suite d'actions. \n* Analogie : Au lieu d'écrire à chaque fois 'Prendre un œuf, casser l'œuf, mélanger...', vous créez une fonction `faireOmelette()`. \n* Désormais, quand vous avez faim, vous n'écrivez qu'une seule ligne : `faireOmelette()`. \n\nC'est ce qu'on appelle l'**Encapsulation**.",
                objectives: ["Comprendre l'utilité des fonctions", "Adopter la philosophie DRY (Don't Repeat Yourself)"],
                exercises: [
                    {
                        title: "L'Efficacité",
                        description: "Si je dois calculer la TVA sur 50 produits différents, est-il mieux de copier le calcul 50 fois ou de créer une fonction `calculerTVA()` ?",
                        difficulty: "Trés Facile",
                        solution: "Créer une fonction `calculerTVA()`. Si le taux de TVA change, on ne le modifie qu'à un seul endroit.",
                        hints: ["Pensez à la maintenance du code."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 33 : Définition vs Appel : La recette vs le plat",
                description: "Ne confondez pas donner une instruction et l'exécuter.",
                order: 33,
                duration: "2 heures",
                content: "Il y a deux étapes cruciales avec une fonction : \n\n1. **La Définition** : Vous expliquez à l'ordinateur COMMENT faire. (`DÉFINIR saluer() { afficher(\"Bonjour\") }`). À ce stade, rien ne s'affiche. \n2. **L'Appel** : Vous donnez l'ordre de le faire. (`saluer()`). C'est là que le code s'exécute. \n\nDéfinir une fonction sans l'appeler, c'est comme avoir une recette de cuisine mais ne jamais cuisiner : vous aurez toujours faim !",
                objectives: ["Distinguer le bloc de code de son exécution", "Comprendre le flux d'exécution"],
                exercises: [
                    {
                        title: "L'Oubli",
                        description: "J'ai écrit 50 fonctions magnifiques mais mon programme n'affiche rien. Quel est le problème probable ?",
                        difficulty: "Facile",
                        solution: "Vous avez défini les fonctions mais vous ne les avez jamais appelées.",
                        hints: ["L'ordinateur n'exécute pas les fonctions tout seul."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 34 : Paramètres : Personnaliser le travail",
                description: "Donnez des outils et des infos à vos fonctions pour qu'elles soient polyvalentes.",
                order: 34,
                duration: "4 heures",
                content: "Une fonction est encore plus puissante si elle peut s'adapter. Pour cela, on utilise des **Paramètres**. \n\n* Exemple : `saluer(nom)`. \n* Si j'appelle `saluer(\"Alice\")`, elle affiche \"Bonjour Alice\". \n* Si j'appelle `saluer(\"Bob\")`, elle affiche \"Bonjour Bob\". \n\nLe paramètre est comme un tiroir vide que l'on remplit au moment de l'appel. On peut en mettre plusieurs : `additionner(a, b)`.",
                objectives: ["Savoir déclarer des paramètres", "Comprendre le passage d'arguments"],
                exercises: [
                    {
                        title: "La Personnalisation",
                        description: "Dans `fonction multiplier(x, y)`, comment appelle-t-on `x` et `y` ?",
                        difficulty: "Facile",
                        solution: "Des paramètres (ou arguments lors de l'appel).",
                        hints: ["Ce sont les données d'entrée de la fonction."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 35 : Valeurs de Retour : Récupérer le fruit du travail",
                description: "Comment une fonction nous redonne une information calculée.",
                order: 35,
                duration: "4 heures",
                content: "Parfois, on ne veut pas que la fonction affiche quelque chose, on veut qu'elle nous RENVOIE le résultat pour l'utiliser plus tard. \n\n* On utilise le mot-clé **RETOURNER** (return). \n* Analogie : Vous demandez à un employé de compter les stocks. Il ne doit pas juste crier le chiffre, il doit vous rapporter le papier avec le chiffre écrit dessus. \n* `resultat = calculerSomme(10, 20)`. Ici, `resultat` contiendra 30.",
                objectives: ["Maîtriser le mot-clé return", "Utiliser le résultat d'une fonction dans une variable"],
                exercises: [
                    {
                        title: "Le Messager",
                        description: "Quelle est la différence entre `afficher(x)` et `retourner(x)` ?",
                        difficulty: "Moyen",
                        solution: "`afficher` montre la valeur à l'écran (pour l'humain), `retourner` donne la valeur au reste du programme (pour l'ordinateur).",
                        hints: ["Pensez à qui reçoit l'information."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 36 : Portée des Variables (Scope) : Le concept de Bulle",
                description: "Comprenez pourquoi une variable n'existe pas partout.",
                order: 36,
                duration: "3 heures",
                content: "Une variable créée à l'intérieur d'une fonction est dans une **Bulle**. \n\n* Elle n'existe que là-bas. On l'appelle une **Variable Locale**. \n* C'est génial car vous pouvez appeler une variable `score` dans 10 fonctions différentes sans qu'elles ne s'emmêlent les pinceaux. \n* Les variables créées tout en haut du programme sont des **Variables Globales** : elles sont visibles partout, mais attention à ne pas trop en abuser !",
                objectives: ["Distinguer variable locale et globale", "Comprendre la protection mémoire par bloc"],
                exercises: [
                    {
                        title: "La Bulle Noire",
                        description: "Si je crée `x = 5` dans une fonction `A()`, puis-je lire `x` dans une fonction `B()` ?",
                        difficulty: "Facile",
                        solution: "Non, `x` est local à la fonction `A()`. `B()` ne peut pas la voir.",
                        hints: ["Chaque fonction a son propre jardin secret."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 37 : La Boucle 'Pour' (For) : L'outil de précision",
                description: "La boucle préférée des développeurs quand on connaît le nombre de tours à l'avance.",
                order: 37,
                duration: "4 heures",
                content: "La boucle **POUR** (ou `for`) regroupe 3 infos sur une seule ligne : \n1. **Départ** : `i = 0` \n2. **Condition** : `i < 10` \n3. **Pas** : `i = i + 1` \n\nC'est beaucoup plus compact et cela évite d'oublier d'augmenter l'index (le bug n°1 du `while`). On l'utilise quasi systématiquement pour parcourir des tableaux.",
                objectives: ["Savoir transformer un While en For", "Maîtriser la syntaxe du For"],
                exercises: [
                    {
                        title: "Le Compte à rebours",
                        description: "Comment écrire le 'Pas' d'une boucle For pour qu'elle descende de 1 à chaque tour (ex: 10, 9, 8...) ?",
                        difficulty: "Facile",
                        solution: "`i = i - 1` (ou `i--`)",
                        hints: ["On fait une soustraction au lieu d'une addition."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 38 : For vs While : Choisir son camp",
                description: "Apprenez quel outil sortir de votre boîte pour chaque situation.",
                order: 38,
                duration: "2 heures",
                content: "C'est une question de philosophie : \n\n* Utilisez **POUR** quand vous savez EXACTEMENT combien de fois vous allez boucler (ex: parcourir un tableau de 10 cases). \n* Utilisez **TANT QUE** quand vous ne savez pas quand ça va s'arrêter (ex: attendre qu'un utilisateur clique sur un bouton, vider un réservoir dont on ignore le niveau). \n\nUn bon développeur choisit le plus lisible pour la situation.",
                objectives: ["Identifier la nature déterministe ou non d'un problème", "Améliorer la clarté du code par le choix de boucle"],
                exercises: [
                    {
                        title: "Le Choix du Roi",
                        description: "Pour lire tous les noms d'un carnet d'adresses, quel type de boucle utiliseriez-vous ?",
                        difficulty: "Facile",
                        solution: "Une boucle Pour (car on connaît le nombre de noms dans le carnet).",
                        hints: ["Est-ce que le nombre de tours est connu ?"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 39 : Accumulateurs : Faire les comptes dans une boucle",
                description: "Le motif algorithmique le plus courant pour calculer des totaux.",
                order: 39,
                duration: "4 heures",
                content: "Un **Accumulateur** est une variable qu'on initialise à 0 AVANT la boucle et qu'on fait grandir À L'INTÉRIEUR. \n\n* `somme = 0` \n* `POUR chaque prix DANS tableau_prix FAIRE` \n  * `somme = somme + prix` \n\nÀ la fin de la boucle, `somme` contient le total de tous les prix. C'est magique et hyper utile pour les moyennes, les scores totaux ou les inventaires.",
                objectives: ["Maîtriser le pattern d'accumulation", "Comprendre l'initialisation hors boucle"],
                exercises: [
                    {
                        title: "La Cagnotte",
                        description: "Que se passe-t-il si j'initialise `somme = 0` À L'INTÉRIEUR de la boucle au lieu de l'extérieur ?",
                        difficulty: "Moyen",
                        solution: "La variable sera remise à 0 à chaque tour de boucle, on perdra le total précédent. Le résultat sera faux.",
                        hints: ["Réfléchissez au cycle de vie de la variable."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 40 : Drapeaux (Flags) : Détecter un événement",
                description: "Apprenez à capturer une information discrète au milieu d'une masse de données.",
                order: 40,
                duration: "3 heures",
                content: "Un **Drapeau** (Flag) est un Booléen qu'on lève si on trouve ce qu'on cherche. \n\n* `trouve = Faux` \n* `POUR chaque case DANS tableau FAIRE` \n  * `SI (case == \"Intrus\") ALORS trouve = Vrai` \n\nÀ la fin, vous n'avez qu'à regarder `trouve`. Si c'est Vrai, c'est que l'intrus était là. C'est ainsi qu'on gère les détections de collisions dans les jeux ou les alertes de sécurité.",
                objectives: ["Utiliser un booléen comme état de détection", "Optimiser la sortie de boucle (Break)"],
                exercises: [
                    {
                        title: "L'Alerte Intrus",
                        description: "Une fois qu'on a trouvé l'intrus et mis `trouve = Vrai`, doit-on continuer à regarder les autres cases ?",
                        difficulty: "Moyen",
                        solution: "Non, c'est une perte de temps (optimisation). On peut utiliser une instruction pour sortir de la boucle immédiatement (le `break`).",
                        hints: ["Si vous cherchez vos clés et que vous les trouvez, continuez-vous à chercher ?"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 41 : Introduction à la Complexité : Pourquoi certains codes rament ?",
                description: "Le secret qui sépare les bons codeurs des grands ingénieurs.",
                order: 41,
                duration: "3 heures",
                content: "Face à 1000 données, tous les programmes sont rapides. Face à 1 milliard, certains mettent une seconde et d'autres mettent 100 ans. \n\n* La **Complexité** mesure le nombre d'opérations selon le nombre de données (N). \n* Si vous avez une boucle simple, c'est du **Linéaire** (O(N)). \n* Si vous avez une boucle dans une boucle, c'est du **Quadratique** (O(N²)). \n* O(N²) est votre pire ennemi quand N devient grand. Apprenez à le fuir !",
                objectives: ["Comprendre l'impact de l'échelle", "Identifier les boucles imbriquées comme source de lenteur"],
                exercises: [
                    {
                        title: "L'Escalade",
                        description: "Si traiter 1000 éléments prend 1 seconde en O(N²), combien de temps faudra-t-il environ pour 2000 éléments ?",
                        difficulty: "Difficile",
                        solution: "4 secondes (Car 2 au carré = 4). La croissance est exponentielle.",
                        hints: ["Multipliez le temps par le carré de l'augmentation."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 42 : Le Tri à bulles : Votre premier algorithme célèbre",
                description: "Apprenez à mettre de l'ordre dans le chaos via des échanges successifs.",
                order: 42,
                duration: "5 heures",
                content: "Le **Tri à Bulles** est l'algorithme de tri le plus simple conceptuellement. \n\n* On parcourt le tableau et on compare chaque élément avec son voisin. \n* Si l'ordre est mauvais, on les échange. \n* On répète l'opération jusqu'à ce que les plus grandes valeurs 'remontent' comme des bulles d'air vers la fin du tableau. \n* C'est un algorithme en O(N²), donc parfait pour débuter mais limité pour les grosses données.",
                objectives: ["Implémenter la logique d'échange (Swap)", "Comprendre l'imbrication de boucles pour le tri"],
                exercises: [
                    {
                        title: "Le Swap",
                        description: "Pour échanger `A` et `B`, peut-on simplement faire `A = B` puis `B = A` ?",
                        difficulty: "Moyen",
                        solution: "Non, parce que `A = B` efface la valeur d'origine de `A`. On doit utiliser une variable temporaire `C` pour sauvegarder `A` avant.",
                        hints: ["Imaginez échanger le contenu de deux verres d'eau. Vous avez besoin d'un troisième verre vide !"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 43 : Manipulation de texte avancée : Découper une phrase",
                description: "Transformez une chaîne de caractères en une collection de mots.",
                order: 43,
                duration: "4 heures",
                content: "Un ordinateur voit une phrase comme un long tableau de lettres. \n\n* L'opération de **Découpage** (Split) consiste à parcourir la chaîne et à isoler les mots chaque fois qu'on croise un espace. \n* Cela crée un nouveau tableau de mots. \n* C'est la base de tout ce qui est recherche de texte, analyse de messages ou création de correcteurs orthographiques.",
                objectives: ["Manipuler les types String comme des Array", "Utiliser des délimiteurs pour structurer du texte"],
                exercises: [
                    {
                        title: "Le Compteur de Mots",
                        description: "Si j'ai une phrase de 50 lettres. Quel est l'algorithme simple pour compter les mots ?",
                        difficulty: "Facile",
                        solution: "On parcourt les 50 lettres et on compte combien de fois on croise le caractère espace ' '.",
                        hints: ["Chaque espace sépare deux mots."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 44 : Les Références : Le concept de l'adresse",
                description: "Comprenez que l'ordinateur ne déplace pas toujours les données, il les pointe.",
                order: 44,
                duration: "4 heures",
                content: "Pour les gros tableaux, l'ordinateur ne s'amuse pas à les copier sans arrêt. \n\n* Au lieu de passer tout le tableau à une fonction, il lui donne son **Adresse** (sa Référence). \n* Analogie : Si je vous invite chez moi, je ne transporte pas ma maison dans votre salon. Je vous donne mon **Adresse** sur un papier. \n* Attention : Si vous modifiez le tableau via sa référence, il est modifié PARTOUT dans le programme.",
                objectives: ["Comprendre le passage par référence vs valeur", "Visualiser l'adresse mémoire"],
                exercises: [
                    {
                        title: "Le GPS",
                        description: "Si je donne l'adresse de mon tableau à deux fonctions différentes, et que la première modifie la case 0. Que verra la deuxième fonction dans la case 0 ?",
                        difficulty: "Moyen",
                        solution: "Elle verra la modification. Car elles pointent toutes les deux vers la même maison physique en mémoire.",
                        hints: ["Elles ont le même papier avec la même adresse écrit dessus."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 45 : Vers le niveau Expert : Introduction aux Arbres et Graphes",
                description: "Préparez-vous à entrer dans la cour des grands ingénieurs.",
                order: 45,
                duration: "3 heures",
                content: "Félicitations ! Vous avez maîtrisé la structure linéaire. \n* Mais le monde n'est pas qu'une ligne. C'est une toile. \n* Les **Arbres** permettent de classer par hiérarchie (ex: dossiers sur votre PC). \n* Les **Graphes** permettent de représenter des réseaux (ex: amis Facebook, trajets Google Maps). \n\nDans le dernier niveau (Expert), nous apprendrons à naviguer dans ces structures complexes et à utiliser la **Dichotomie** pour chercher 1 milliard de fois plus vite !",
                objectives: ["Découvrir les structures de données non-linéaires", "S'ouvrir aux algorithmes de réseau"],
                exercises: [
                    {
                        title: "Le Prochain Défi",
                        description: "Quel type de structure de données utiliseriez-vous pour représenter les routes entre les villes de France ?",
                        difficulty: "Facile",
                        solution: "Un Graphe (car les villes sont reliées entre elles de façon non-linéaire).",
                        hints: ["Pensez à une toile d'araignée."]
                    }
                ],
                resources: []
            },
        ]
    },
    {
        id: "algorithmique-niveau-expert-mondiale-avanc",
        title: "Algorithmique - Niveau Expert Mondiale (Avancé)",
        description: "Bienvenue dans l'antichambre des géants de la Tech (FAANG). Ce module terminal enseigne les fondations qui distinguent les codeurs ordinaires des ingénieurs Senior. O, Arbres, Graphes, Backtracking et Programmation Dynamique.",
        category: "Théorie",
        level: "Avancé",
        duration: "60 heures",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
        rating: 5.0,
        students: 4200,
        language: "french",
        isFree: true,
        tags: ["algorithme", "avancé", "récursivité", "arbres", "complexité", "graphes", "dynamic_programming"],
        chapters: [
            {
                title: "Chapitre 1 : L'Analyse Asymptotique et Notation Big O",
                description: "Apprenez à prouver mathématiquement qu'un code est optimisé.",
                order: 1,
                duration: "8 heures",
                content: "Lorsqu'Amazon traite 1 milliard d'articles, un algorithme en O(N²) crashe l'entreprise. L'outil suprême de l'ingénieur est la notation asympotique de Landau (Big O). Elle mesure non pas le 'temps' en secondes, mais le Taux de Croissance des opérations selon la taille N de la donnée. Nous distinguerons O(1) (Magie constante), O(log N) (Dichotomie redoutable), O(N) (Linéaire saine), O(N log N) (Tri optimal), O(N²) (Dangereux), et les catastrophiques O(2^N) / O(N!). Vous ne pourrez plus jamais coder sans calculer mentalement votre Big O.",
                objectives: ["Calculer la complexité Temporelle de tout algorithme", "Comprendre la Complexité Spatiale (Mémoire)", "Identifier le pire cas, le cas moyen et le meilleur cas"],
                exercises: [
                    {
                        title: "Alerte de Complexité Spatiale",
                        description: "Quelle est la particularité mortelle du Merge Sort concernant sa complexité spatiale par rapport au Quick Sort ?",
                        difficulty: "Difficile",
                        solution: "Le Merge Sort nécessite O(N) mémoire supplémentaire (création de sous-tableaux temporaires lors de la fusion). Le Quick Sort, si implémenté In-Place, opère en O(log N) mémoire (strictement limité à la profondeur de la Call Stack récursive). En environnement embarqué très limité, le Merge Sort peut générer un Memory Exhaustion, justifiant le tri In-Place.",
                        hints: ["Pensez à l'impact des créations de nouveaux tableaux à chaque division du divide and conquer."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 2 : Divide and Conquer & La Recherche Dichotomique",
                description: "Diviser pour régner, ou comment pulvériser les données colossales en un temps O(log N).",
                order: 2,
                duration: "10 heures",
                content: "Face à une botte de foin gigantesque, chercher l'aiguille brin par brin (O(N)) est inacceptable. Le paradigme Divide and Conquer exige la division du spectre par des fractions massives à chaque réflexion. La Recherche Dichotomique (Binary Search) incarne ce miracle : dans un annuaire trié de 1 milliard de personnes, la recherche séquentielle mettrait 1 milliard de tentatives. La recherche dichotomique trouve la cible ou conclut l'échec en seulement 30 opérations (car 2^30 > 1 Milliard). L'élève devra coder aveuglément cette méthode et repérer ses failles (le dépassement d'Entier 'overflow' pendant le calcul du (debut+fin)/2).",
                objectives: ["Coder la Recherche Dichotomique sans Overflow", "Comprendre la récursivité du Divide", "Maîtriser les conditions aux limites (Off-by-one errors)"],
                exercises: [
                    {
                        title: "Vraie Implémentation de la Dichotomie (Sans Overflow)",
                        description: "Écrivez le code d'une recherche dichotomique qui évite complètement le bug historique du Stack Overflow qui existait même dans l'API Java originelle.",
                        difficulty: "Difficile",
                        solution: "debut = 0, fin = N - 1\nTANT QUE debut <= fin FAIRE\n  // Au lieu de (debut + fin) / 2 qui peut dépasser la limite INTEGER_MAX si tableau gigantesque\n  milieu = debut + (fin - debut) / 2\n  SI T[milieu] == CIBLE ALORS RETOURNER milieu\n  SI T[milieu] < CIBLE ALORS debut = milieu + 1\n  SINON fin = milieu - 1\nFIN TANT QUE\nRETOURNER -1",
                        hints: ["Rappelez-vous que 'debut + fin' peut produire un nombre plus grand que les 32 bits de la machine si le tableau est massif. Pensez autrement..."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Récursion, Call Stack et Tris Avancés (Quick Sort & Merge Sort)",
                description: "Les algorithmes complexes et l'architecture mémoire interne : La beauté vertigineuse des fonctions auto-appellantes.",
                order: 3,
                duration: "15 heures",
                content: "La récursion survient lorsqu'une fonction s'appelle elle-même avec un sous-problème plus petit. L'ingénieur doit visualiser mentalement la Call Stack du processeur. Nous utiliserons la récursion pour bâtir les deux tris professionnels mondiaux en O(n log n). Le Merge Sort (Tri Fusion), algorithme de type Out-of-place très puissant pour les listes géantes ; et surtout le Quick Sort (Tri Rapide), de sir Tony Hoare, très rapide en In-Place, dont la performance totale dépend d'un Pivot savamment choisi, sinon quoi il chute fatalement en O(N²).",
                objectives: ["Implémenter formellement le partitionnement QuickSort", "Fusionner deux tableaux (Merge)", "Eviter les Stack Overflows Recursifs"],
                exercises: [
                    {
                        title: "Concept du Tri Fusion (Merge)",
                        description: "Comment fusionner deux tableaux A et B DÉJÀ triés en un seul tableau C trié, en temps linéaire O(N) ?",
                        difficulty: "Difficile",
                        solution: "i = 0, j = 0, k = 0\nTANT QUE i < Taille(A) ET j < Taille(B) FAIRE\n  SI A[i] <= B[j] ALORS\n    C[k] = A[i]; i++\n  SINON\n    C[k] = B[j]; j++\n  k++\nFIN TANT QUE\nAjouter le reste de A (si i < Taille(A)) dans C\nAjouter le reste de B (si j < Taille(B)) dans C",
                        hints: ["Imaginez devoir zipper deux piles de cartes ordonnées. Regardez la première de chaque, prenez la plus petite."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Data Structures Ultimates — Pointeurs, Listes, Arbres et Graphes",
                description: "Créer des structures dynamiques complexes non-contiguës.",
                order: 4,
                duration: "15 heures",
                content: "Nous quittons le confort chaleureux des tableaux. La réalité informatique demande des structures dynamiques. Vous plongerez dans la création de structures via des **Pointeurs** (adresses mémoire) : Listes simplement et doublement chaînées (O(1) en insertion/suppression), Piles (LIFO) et Files (FIFO). Le cœur de la modélisation informatique : Les Arbres Binaires de Recherche (BST), qui lient la flexibilité des listes avec la vitesse du niveau log N. Enfin, introduction théâtrale à la Théorie des Graphes (Sommets, Arêtes) pour la modélisation des réseaux routiers et sociaux : le BFS (Parcours en largeur), le DFS (Parcours en profondeur), et l'algorithme mythique du plus court chemin de Dijkstra.",
                objectives: ["Maîtriser les pointeurs logiques Node/Next/Root", "Implémenter une Pile (Stack)", "Parcourir un Arbre Binaire complet (InOrder, PreOrder)"],
                exercises: [
                    {
                        title: "Récupération dans une Pile (Stack)",
                        description: "Une pile contient {A, B, C} où C a été ajouté en dernier. Quel élément sera retiré au premier Dépiler (Pop) ?",
                        difficulty: "Facile",
                        solution: "L'élément C. C'est le principe du Last-In-First-Out (LIFO).",
                        hints: ["LIFO. Le dernier posé, le premier sorti."]
                    },
                    {
                        title: "Algorithme de l'Arbre Binaire de Recherche",
                        description: "Décrivez la règle d'insertion mathématique pour un nœud dans un BST (Binary Search Tree).",
                        difficulty: "Difficile",
                        solution: "Pour tout nœud Parent :\n- Toutes les valeurs du sous-arbre gauche doivent être strictement INFÉRIEURES à celle du Parent.\n- Toutes les valeurs du sous-arbre droit doivent être strictement SUPÉRIEURES à celle du Parent.",
                        hints: ["Tout doit être triable et recherchable naturellement de chaque côté de la balance."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 5 : Programmation Dynamique (Dynamic Programming) et Backtracking",
                description: "Les armes absolues. Résoudre l'insoluble via la mémoïsation et la théorie des essais/erreurs.",
                order: 5,
                duration: "12 heures",
                content: "Une fois expert en Graphes et en Récursivité, vous êtes prêt pour la consécration de l'intelligence artificielle : la Programmation Dynamique et le Backtracking. La Programmation Dynamique (de Richard Bellman) enseigne l'optimisation par la conservation des calculs : 'Ceux qui ne se souviennent pas du passé sont condamnés à le répéter'. Éviter des arbres de calculs titanesques de O(2^N) grâce à la Mémoïsation (Top-Down) et la Tabulation (Bottom-Up). Le Backtracking, ou algorithme d'exploration systématique (Ex: Résoudre un Sudoku, problème des N-Reines), pour annuler élégamment des tentatives vouées à l'échec et explorer un arbre d'état monstrueux. Vous êtes arrivés à la fin du voyage. Vous êtes devenus de véritables Ingénieurs Logiciels d'Élite ! 🥂",
                objectives: ["Comprendre la 'Memoization'", "Résoudre le problème du Rendu de Monnaie Optimisé", "Implémenter une matrice de programmation dynamique"],
                exercises: [
                    {
                        title: "L'Explosion de Fibonacci",
                        description: "Pourquoi faire un calcul récursif pur F(50) = F(49) + F(48) bloque-t-il l'ordinateur, et comment la mémoïsation sauve-t-elle le désastre ?",
                        difficulty: "Difficile",
                        solution: "Le calcul pur est en O(2^N). F(48) ou F(30) est recalculé des millions et des millions de fois inutilement comme des racines redondantes. La Mémoïsation (Dynamic Programming) force la fonction à sauvegarder F(X) dans un tableau T la première fois qu'il le calcule. La fois suivante, au lieu d'ouvrir un arbre entier, il le lit dans le tableau en O(1), abaissant la complexité totale à O(N).",
                        hints: ["Réfléchissez au nombre de fois où Fib(5) sera appelé lors du calcul récursif de Fib(8). C'est vertigineux."]
                    }
                ],
                resources: []
            }
        ]
    }
];

module.exports = algoCourses;
