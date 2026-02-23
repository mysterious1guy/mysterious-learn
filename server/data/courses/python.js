const pythonCourses = [
    {
        title: "Python - Niveau Débutant : La Syntaxe Épurée",
        description: "Apprenez le langage le plus populaire au monde. Découvrez pourquoi sa syntaxe basée sur l'indentation force l'écriture d'un code propre, et maîtrisez les structures de données intégrées.",
        category: "Programmation",
        level: "Débutant",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=800&q=80",
        rating: 4.8,
        students: 15400,
        language: "python",
        isFree: true,
        tags: ["python", "scripting", "débutant", "syntaxe"],
        chapters: [
            {
                title: "Chapitre 1 : Philosophie du Zen of Python et Typage Dynamique Fort",
                description: "Comprendre pourquoi Python est différent. L'indentation n'est pas qu'esthétique, elle est sémantique.",
                order: 1,
                duration: "6 heures",
                content: "Créé par Guido van Rossum en 1991, Python est conçu pour maximiser la lisibilité du code. Contrairement à C ou Java, il n'y a pas d'accolades `{}`. L'indentation stricte (4 espaces) délimite les blocs. Le langage est **dynamiquement typé** (le type est résolu à l'exécution) mais **fortement typé** (il ne mixera pas implicitement `\"A\" + 5`). Nous aborderons les variables, l'absence de point-virgule, le Garbage Collector silencieux, et l'import de modules via `import math` ou `from math import sqrt`. Enfin, vous découvrirez le mantra sacré : *The Zen of Python* (`import this`).",
                objectives: ["Appliquer le standard PEP 8 d'écriture de style", "Comprendre un langage Interprété", "Manipuler des chaînes formatées (f-strings)"],
                exercises: [
                    {
                        title: "Le Culte du F-String",
                        description: "En Python 3.6+, comment insérer la variable `age = 25` et l'expression mathématique `age * 2` dans une seule chaîne imprimée, de la manière la plus moderne ?",
                        difficulty: "Facile",
                        solution: "`print(f\"J'ai {age} ans et le double est {age * 2}.\")`\nLes f-strings combinent lisibilité absolue et évaluation en temps réel.",
                        hints: ["Mettez la lettre 'f' avant les guillemets et utilisez des accolades {}."]
                    },
                    {
                        title: "Erreur de Typage Fort",
                        description: "Que se passe-t-il si vous tentez `x = \"3\" + 4` en Python par rapport au JavaScript ?",
                        difficulty: "Moyen",
                        solution: "JavaScript fera une conversion faible impliquant le résultat `\"34\"`. Python plantera via une fatale `TypeError: can only concatenate str to str`. C'est le typage fort qui protège des erreurs d'inattention fatales en production financière.",
                        hints: ["Est-ce que Python tente de sauver la mise en concaténant aveuglément ?"]
                    }
                ],
                resources: [{ title: "Conférence sur le PEP 8 Python", type: "article", url: "https://peps.python.org/pep-0008/" }]
            },
            {
                title: "Chapitre 2 : Les Collections Primitives (Listes, Tuples, Sets)",
                description: "Le cœur de la modélisation des données. Les tableaux ultra-évolutifs natifs de Python.",
                order: 2,
                duration: "8 heures",
                content: "Les tableaux C rigides sont remplacés en Python par la **Liste (`[]`)**, qui est hétérogène, redimensionnable et implémentée en C (CPython) comme un tableau dynamique de pointeurs. Nous traiterons le **Tuple (`()`)**, une liste immuable qui est hashable et beaucoup plus légère en mémoire vive, ainsi que le **Set (`{}`)**, modélisant la théorie des ensembles mathématiques (sans doublons, recherche O(1)). Vous apprendrez le *Slicing* magistral (`Liste[start:stop:step]`) pour découper les données en vol, et le unpacking (`a, b = [10, 20]`).",
                objectives: ["Inverser une liste via Slicing `[::-1]`", "Différencier Mutabilité (Liste) et Immutabilité (Tuple)", "Dédoublonner 100 000 entrées en invoquant O(1) via un Set"],
                exercises: [
                    {
                        title: "Le Slicing Mortel",
                        description: "Soit `T = [0, 1, 2, 3, 4, 5]`. Que renvoie la syntaxe `T[1:5:2]` ?",
                        difficulty: "Moyen",
                        solution: "`[1, 3]`. Le départ est à l'index 1 (soit le chiffre 1), la fin est avant l'index 5 (soit le chiffre 4), mais avec un Pas (Step) de 2. Il prend donc 1, ignore 2, prend 3, ignore 4.",
                        hints: ["[DEBUT_INCLUS : FIN_EXCLUE : INTERVALLE_DE_SAUT]"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Contrôle de Flux Avancé et Compréhensions",
                description: "Boucles for natives versus Compréhension de listes (List Comprehension).",
                order: 3,
                duration: "8 heures",
                content: "En Python, la boucle for classique `for(i=0;...;i++)` n'existe pas. Le langage utilise exclusivement une boucle for-each sur itérables : `for item in collection:`. Pour avoir un index, l'ingénieur fait appel au générateur `range()` ou `enumerate()`. La véritable révolution réside dans la **Compréhension de Listes**, une syntaxe d'une ligne, importée des langages fonctionnels purs (Haskell), qui alloue et filtre les données en code C interne pour une vitesse d'exécution stupéfiante : `[x*2 for x in base if x % 2 == 0]`.",
                objectives: ["Abandonner l'itération à base de compteurs incrémentés", "Filtrer des structures de données en 1 seule ligne ultra-optimisée", "Maîtriser les blocs Try / Except / Finally"],
                exercises: [
                    {
                        title: "Codez la Compréhension",
                        description: "Transformez ces lignes en UNE SEULE expression de LIST COMPREHENSION : \n`res = []`\n`for i in range(10):`\n  `if i > 5:`\n    `res.append(i**2)`",
                        difficulty: "Facile",
                        solution: "`res = [i**2 for i in range(10) if i > 5]`\nLa version moderne en compréhension fait moins d'appels de méthode append() et compile donc plus vite.",
                        hints: ["Formule visuelle : [RÉSULTAT pour VARIABLE dans PLAGE condition FILTRE]."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : La Puissance des Dictionnaires (Hash Maps O(1))",
                description: "JSON natif. Clés, Valeurs et Hachage.",
                order: 4,
                duration: "8 heures",
                content: "Le composant le plus important de tout langage backend moderne. Le **Dictionnaire (`dict`, `{key: value}`)**. Structure implémentant une Table de Hachage, permettant d'ajouter, lire, ou supprimer n'importe quelle donnée en complexité constante O(1), quel que soit le milliard d'entrées contenues. Apprenez à itérer avec `.items()`, à définir des valeurs par défaut élégamment avec `.get(key, default)`, et à fusionner deux immenses dictionnaires en une ligne avec l'opérateur de déballage `**`.",
                objectives: ["Comprendre le Mapping des JSON API en Dictionnaires", "Bannir les KeyError via les requêtes `get()` sécurisées", "Naviguer sur les `.keys()` et `.values()` indépendament"],
                exercises: [
                    {
                        title: "Extraction Robuste",
                        description: "Comment extraire l'âge (`user['age']`) si l'on n'est pas certain qu'elle existe, en affectant par défaut 'Inconnu' si la clé est absente, pour éviter de crasher le serveur ?",
                        difficulty: "Moyen",
                        solution: "`user.get('age', 'Inconnu')`. C'est le design pattern standard des API REST Backend, qui empêche la fameuse exception fatale de plantage applicatif (KeyError).",
                        hints: ["Une fonction Get qui propose un plan B de sécurité."]
                    }
                ],
                resources: [{ title: "HashMap Data Visualization", type: "article", url: "https://fr.wikipedia.org/wiki/Table_de_hachage" }]
            }
        ]
    },
    {
        title: "Python - Niveau Intermédiaire : OOP & Fonctions Avancées",
        description: "Devenez Ingénieur Logiciel. Modélisez votre code via l'Orienté Objet, les magies des décorateurs et les fonctions de traitement de première classe.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        students: 7600,
        language: "python",
        isFree: true,
        tags: ["python", "oop", "fonctions", "intermédiaire"],
        chapters: [
            {
                title: "Chapitre 1 : Fonctions de 1ère classe, Lambda et Packing (*args)",
                description: "Une fonction est un objet. Elle peut créer des fonctions, renvoyer des fonctions ou accepter n'importe quoi.",
                order: 1,
                duration: "10 heures",
                content: "Les fonctions (`def`) sont des Objets (First-Class Citizens). Vous pourrez les stocker dans des listes ou les passer en argument de rappels (Callbacks). Nous étudierons l'anonymat brut via les expression `lambda x: x*2` souvent utilisées dans le tri (`sort(key=...)`) et la cartographie (`map()`). Surtout, la puissance modulaire des signatures à longueurs variables : le Packing et Unpacking avec `*args` (Tuple de paramètres infinis) et `**kwargs` (Dictionnaire d'arguments nommés infinis). La structure absolue de tout framework (Django, Flask).",
                objectives: ["Passer manuellement `N` arguments dynamiquement via def f(*args)", "Comprendre les Closures (Fonction capturant l'environnement externe)", "Trier des dictionnaires complexes via clé avec un oneliner lambda"],
                exercises: [
                    {
                        title: "Tri sur Composant Imbrique",
                        description: "Soit `users = [{'nom':'A', 'age':30}, {'nom':'B', 'age':20}]`. Triez cette liste par l'attribut `age` en Ordre décroissant sans importer de librairie en une seule ligne.",
                        difficulty: "Difficile",
                        solution: "`users.sort(key=lambda u: u['age'], reverse=True)`\nLa fonction lambda indique au moteur de tri interne (TimSort) de comparer spécifiquement les clés 'age' pour prendre sa décision, plutôt que le dictionnaire lui-même (qui générerait une erreur stricte en Python 3).",
                        hints: ["Utiliser le mot clef nommé `key` et injecter une mini-fonction factive dedans."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 2 : Programmation Orientée Objet (Classes & Instances)",
                description: "Organisez les mondes complexes en usines d'objets interchangeables et sécurisés.",
                order: 2,
                duration: "10 heures",
                content: "La transition vers l'architecture en composants. Le paradigme OOP (Object-Oriented Programming). Nous définirons les termes canoniques : Classe (Le Plan de construction), Instance (La Maison concrète bâtie), Attributs d'instance vs Attributs de classe. Vous apprendrez pourquoi toute méthode en Python exige le mot divin `self` en premier argument explicite (l'instance pointeur vers elle-même). Nous implémenterons le Constructeur sacré `__init__`, et le concept d'Encapsulation avec les attributs \"privés\" masqués par le Name-Mangling du préfixe `__`. L'Héritage et l'utilisation rigoureuse de `super()` finaliseront la pyramide OOP.",
                objectives: ["Contruire des schémas de données orientés métiers (ex: `class BankAccount:`)", "Appeler un parent direct ou distant avec le mécanisme de résolution MRO", "Empêcher la collision fatale de variables via _Protected et __Private"],
                exercises: [
                    {
                        title: "Le Cœur de l'Instance (Self)",
                        description: "Pourquoi faire `class Chien: def aboyer(): print(nom)` génèrera une erreur fatale à l'appel `rex.aboyer()`, et comment la réparer ?",
                        difficulty: "Moyen",
                        solution: "Lorsque l'on fait `rex.aboyer()`, le runtime traduit cela mathématiquement par `Chien.aboyer(rex)`. Il passe automatiquement l'instance 'rex' dans la méthode. Or, la définition `def aboyer():` ne demande aucun paramètre ! Solution : `def aboyer(self): print(self.nom)` pour capter l'instance entrante.",
                        hints: ["S'il y a des milliers de chiens, comment la fonction aboyer sait-elle QUEL nom aboyer ?"]
                    }
                ],
                resources: [{ title: "Explication de OOP self et Héritage", type: "video", url: "https://www.youtube.com/embed/ZDa-Z5JzLYM" }]
            },
            {
                title: "Chapitre 3 : Les Méthodes Dunder (Magic Methods)",
                description: "Subjuguez le langage C sous-jacent. Apprenez à vos propres Objets à s'additionner mathématiquement.",
                order: 3,
                duration: "10 heures",
                content: "Les Dunder Methods (Double Under-score) sont le secret professionnel de Python. Quand vous faites `3 + 2`, Python exécute secrètement `int(3).__add__(2)`. En redéfinissant ces méthodes dans *vos* classes personnalisées, vous leur donnez les pouvoirs primitifs des types natifs. Nous apprendrons à redéfinir : `__str__` (pour s'afficher sous forme lisible dans les logs), `__eq__` (pour dire comment comparer `Obj1 == Obj2`), `__add__` (pour additionner vos objets entre eux), et `__len__` (pour dire si votre objet est un contenant mesurable).",
                objectives: ["Surcharger les opérateurs mathématiques classiques (+, -, *)", "Rendre vos propres classes itérables (`__iter__`, `__next__`)", "Faire réagir un Objet comme un tuple via des index (`__getitem__`)"],
                exercises: [
                    {
                        title: "L'Égalité Profonde vs Identité",
                        description: "Si `A = MonObjet(10)` et `B = MonObjet(10)`. En Python, formellement, `A == B` renvoie Faux, malgré la valeur intérieure identique. Pourquoi ? Et quelle méthode surcharger pour que cela devienne Vrai ?",
                        difficulty: "Difficile",
                        solution: "Sans aide manuelle, `A == B` compare leur Identité dans la RAM (leurs Pointeur-Id), qui sont obligatoirement distinctes (deux objets séparés en mémoire tas). Il faut implémenter `def __eq__(self, other): return self.val == other.val` dans la classe pour apprendre à Python à comparer leurs \"Cœurs\" plutôt que leurs \"Boîtes\".",
                        hints: ["Ce sont deux jumeaux distincts. Si on dit qu'ils sont pareils, on parle de leur intérieur ou de leur place physique dans l'univers ?"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : La Magie Métatrancendante des Décorateurs (@)",
                description: "Créer des enveloppes fonctionnelles sans toucher au code original. Le Graal de Flask et FastAPI.",
                order: 4,
                duration: "10 heures",
                content: "Le Décorateur ou `@nom_du_decorateur`. C'est l'évolution logique des fonctions vues au chapitre 1 (Closures & Callbacks). C'est un pattern de conception permettant de 'wrapper' ou 'd'emballer' une fonction pour modifier son comportement avant et après son exécution, *sans* modifier son code sourcre de base. Nous créerons from scratch nos propres décorateurs (ex: un `@login_required` pour bloquer une route, un `@timer` pour chronométrer le temps d'exécution Big O), comprenant la fusion fine de la fonction Englobante, la fonction Interne, avec syntaxe universelle `*args, **kwargs`.",
                objectives: ["Écrire un Wrapper de log performance universel de Zero", "Comprendre que `@decorator` équivaut à `func = decorator(func)`", "Préserver les méta-données d'origine avec `@wraps` from functools"],
                exercises: [
                    {
                        title: "Le Loggueur Universel Décoratif",
                        description: "Expliquez ligne par ligne le flot d'exécution formel si une fonction `hello()` est décorée avec le `@log_db`.",
                        difficulty: "Difficile",
                        solution: "Au lancement du serveur, l'interprète Python lit `@log_db`. Il prend littéralement l'objet mémoire de la fonction `hello`, et le jette (passé en argument) dans la fonction mère `log_db`. La mère fabrique alors une sous-fonction `wrapper()` qui va 1) se connecter à la DB, 2) invoquer `hello()` réelle, 3) clore la DB, et finalement la mère RENVOIE the reference of `wrapper`. Depuis lors, pour le reste de sa vie, quand on appelle `hello()`, c'est actually `wrapper()` qui tourne secrètement. Décoration accomplie !",
                        hints: ["Il y a un remplacement par substitution de la véritable entité pointée !"]
                    }
                ],
                resources: [{ title: "Comprendre les Modèles Wrappeurs Decorators", type: "article", url: "https://realpython.com/primer-on-python-decorators/" }]
            }
        ]
    },
    {
        title: "Python - Niveau Expert Mondiale : Concurrence, GIL et Génération",
        description: "Contournez les limitations historiques du langage. Conquérez la Data-Science avec une efficacité mémoire totale et déchirez le GIL en Processus Indépendants.",
        category: "Programmation",
        level: "Avancé",
        duration: "60 heures",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        rating: 5.0,
        students: 2350,
        language: "python",
        isFree: true,
        tags: ["python", "asyncio", "multiprocessing", "expert", "GIL", "architectures"],
        chapters: [
            {
                title: "Chapitre 1 : Yield, Générateurs et Évaluation Paresseuse (Lazy Eval)",
                description: "Comment charger 100 Téraoctets de données Wikipedia dans un ordinateur ayant seulement 8 Go de RAM.",
                order: 1,
                duration: "15 heures",
                content: "Les listes classiques utilisent l'évaluation stricte : elles calculent et stockent le 1 Milliard d'entités entières en RAM, déclenchant un Memory Exhaust fatal. L'ultime solution réside dans l'utilisation exclusive du mot-clé divin `yield`. Le Générateur. Il ne fabrique qu'une unique donnée qu'il expulse à l'instant `t`, stockant uniquement son 'État Actuel' en mettant sa fonction en hibernation suspendue. Il dépense 92 Octets en mémoire, quelle que soit la quantité de données calculée. C'est l'essence du concept des Streams Node.js ou des Observables Java rependues en Data pipeline Python.",
                objectives: ["Contruire une fonction de suspension contenant Yields multiples", "Comprendre le comportement manuel via l'opérateur intégré `next()`", "Gérer et capter gracieusement l'exception fatale globale `StopIteration`"],
                exercises: [
                    {
                        title: "Hibernation Infinie",
                        description: "Écrivez le code d'un générateur d'ID (suite entière infinie pure : 0, 1, 2... jusqu'à l'effondrement de l'univers) en C, la boucle Malloc écraserait la RAM. Comment le faire en 4 lignes Python ?",
                        difficulty: "Moyen",
                        solution: "`def generateur_infini():`\n  `i = 0`\n  `while True:`\n    `yield i`\n    `i += 1`\nLe `while True` ne plantera JAMAIS le PC car il s'arrête (se met en pause) instantanément après la ligne yield et attendra d'être dérangé par `next(id_gen)` pour tourner un seul cran supplémentaire de plus de l'horloge système.",
                        hints: ["La boucle while est bloquée par l'expulsion de la variable. Elle s'endort."]
                    }
                ],
                resources: [{ title: "Yield Concept via CallStack Paused Frames", type: "video", url: "https://www.youtube.com/embed/bD05uBecCGQ" }]
            },
            {
                title: "Chapitre 2 : Contexte Sécure (With) et Gestionnaires d'État natifs (ContextManagers)",
                description: "Libérer une base MongoDB sur une exception inattendue. Plus rien ne fuira dans un backend de production.",
                order: 2,
                duration: "10 heures",
                content: "Lorsqu'un script d'entreprise backend s'effondre en plein milieu d'une écriture sur SSD ou base de données avec une erreur 500, le fichier / le port réseau n'est jamais refermé, créant une hémorragie du serveur. Implémenter le bloc d'enveloppement strict `with open(...) as f:` est obligatoire. Nous construirons de zéro des classes personnalisées qui implémentent les Dunders finaux et intimes `__enter__` (qui s'active, configure, lock) et le grandiose `__exit__` (qui dépollue l'erreur, rollback la Query SQL ou lâche la mémoire peu importe le carnage intérieur qui s'est produit dans le scope).",
                objectives: ["Construire une Classe Connector possédant `__enter__` et `__exit__`", "Déchiffrer les arguments `exc_type, exc_value, traceback` de l'Exit pour silencer/gérer les crash", "Créer des Transaction SQL sécurisées via le manager"],
                exercises: [
                    {
                        title: "Le Verrou de Destruction Dunder",
                        description: "Dans le bloc `__exit__`, que signifie un retour de valeur booléenne formelle `return True` en réaction à une erreur fatale attrapée ?",
                        difficulty: "Difficile",
                        solution: "Si `__exit__` renvoie `True`, cela dit formellement au compilateur/interpreteur Python : \"L'exception (l'horreur fatale) qui s'est passée dans le bloc With a bien été gobée, traitée et digérée par moi. Ne crashe PAS le programme applicatif\". L'exception est suppresée silencieusement par le bloc With (Design Exception Swallowing).",
                        hints: ["Souhaitez-vous tuer l'alerte rouge, ou laisser alerter le monde entier du désastre ?"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : L'Ennemie Public Numéro Un — Le GIL (Global Interpreter Lock)",
                description: "Comprendre pourquoi Python est, au fond de son cœur implémenté par C, fondamentalement mono-tâche. Et comment les Ingénieurs contournent ce mur pour survivre au Multicœur.",
                order: 3,
                duration: "20 heures",
                content: "Le CPU de votre PC a 16 Cœurs. Si vous lancez 4 Threads en Java ou C++, la machine décuple sa vitesse globale. En Python, si vous lancez 4 Threads (`threading`), ils tourneront plus lentement qu'un seul Thread Unique linéaire ! 💣 Bienvenue dans le Global Interpreter Lock (GIL). Une hérésie pour protéger le ramassage de poubelles Garbage Collector. Tant qu'un Thread agit et interprète le bytecode CPython, le GIL verrouille TOUT l'interpréteur entier empéchant un Thread rival d'arriver (Exception : Opération d'Attente ou Temps I/O). Nous décortiquerons ce verrou infernal historique mathématiquement d'un pur point de vue ingénierie informatique C.",
                objectives: ["Mesurer le Temps d'horloge de CPU-Bound Tasks avec et sans Threading pour assister à l'effondrement dû au GIL Context-Switching", "Identifier la différence vitale architecturale entre I/O Bound (Reséau/Disque) et CPU Bound (Calcul Crypto)"],
                exercises: [
                    {
                        title: "L'Arnaque du Threading CPython",
                        description: "Pourquoi l'utilisation du module `threading` Python est pourtant PARFAITE pour crawler 500 pages Webs Google en même temps, mais TERRIBLE pour trouver des Nombres Premiers Cryptographiques géants ?",
                        difficulty: "Difficile",
                        solution: "Le crawl de Google est un cas dit 'I/O Bound' ou 'limité aux Entrées-Sorties'. Quand le Thread interroge Google, il passe 99% de sa vie de milliseconde à \"Attendre le réseau\". À cet instant physique, le Lock CPython du GIL se déverouille gracieusement, laissant tous les autres cœurs et threads faire la même chose. En revanche, le calcul de la cryptographie Mathématique (CPU Bound) demande de l'effort processeur pur sans s'arrêter. Les Threads vont alors se battre férocement pour conquérir le Mutex Lock CPython unique, gaspillant un milliard de cycles d'horloge Kernel en changements de contextes (L'enfer).",
                        hints: ["Qui a besoin d'utiliser activement la matière grise du processeur brut ?"]
                    }
                ],
                resources: [{ title: "Conférence PyCon : Understanding the GIL (par David Beazley)", type: "video", url: "https://www.youtube.com/embed/ObtSNY3A3sY" }]
            },
            {
                title: "Chapitre 4 : Asynchronisme Absolu — AsyncIO et Multiprocessing",
                description: "Détruire la limitation en scindant la machine en Processus isolés via C-OS level, ou utiliser le modèle événementiel du Web Node JS : asyncio.",
                order: 4,
                duration: "15 heures",
                content: "Le vrai asynchrone est l'avenir suprême de l'architecture. Vous plongerez dans le code natif de la révolution Python >= 3.5 : Le module de Event Loop et des Coroutines (`async def`, `await`). L'illusion d'une concurrence immense sur 1 seul Thread, parfaite pour la construction de micro-services backend FastAPI ou websockets colossales de type Discord avec une utilisation mémoire minimale. Pour vaincre le GIL au niveau de la Data Analysis massive NumPy / Pandas, on enseignera le sacre du module `multiprocessing` : contourner le verrou de CPython en invoquant des vrais fork UNIX OS System complets (clonage absolu de la mémoire VM), permettant de violer le système en chargeant véritablement à 100% l'intégralité des N-Cœurs du processeur Intel de la machine sur des Threads indépendants.",
                objectives: ["Construire la Boucle d'Événements Async (`asyncio.gather`) et libérer la charge asynchrone des requêtes SQL lourdes", "Comprendre et forker au minimum 16 Work Processers Isolés du CPython GIL via Multiprocessing.Pool Map", "Concevoir une architecture Data Massive Industrielle"],
                exercises: [
                    {
                        title: "Multiprocessing Overhead",
                        description: "Pourquoi lancer un `Pool.map` de l'API `multiprocessing` ne doit JAMAIS être testé sur un array de petite taille contenant quelques centaines d'entiers mathématiques ?",
                        difficulty: "Difficile",
                        solution: "Créer un Process Kernel UNIX (Forking, Clonage Heap/Stack mémoire virtuels, Duplication File Descriptors Python, communication IPC et Pipes d'échanges (Pickling/Unpickling serializers) coûte des millions d'opérations systèmes et plusieurs dizaines de mégaoctets réels de RAM à instancier. La charge monstrueuse de la simple Création de processus étouffera et crashera toute optimisation algorithmique pour des données faibles. C'est l'Overhead Archétectural de l'Ingénierie OS système lourde de Pickling vs Computation.",
                        hints: ["Ouvririez-vous 10 usines Cimentières gigantesques pour briser seulement 5 cailloux ramassés au sol ?"]
                    }
                ],
                resources: [{ title: "Python AsyncIO par la Pratique", type: "article", url: "https://realpython.com/async-io-python/" }]
            }
        ]
    }
];

module.exports = pythonCourses;
