const pythonCourses = [
    {
        id: "python-niveau-d-butant",
        title: "Python - Niveau Débutant",
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
            }
        ]
    },
    {
        id: "python-niveau-interm-diaire",
        title: "Python - Niveau Moyen",
        description: "Devenez Ingénieur Logiciel. Modélisez votre code via l'Orienté Objet et les fonctions de traitement de première classe.",
        category: "Programmation",
        level: "Moyen",
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
                content: "Les fonctions (`def`) sont des Objets (First-Class Citizens). Vous pourrez les stocker dans des listes ou les passer en argument de rappels (Callbacks). Nous étudierons l'anonymat brut via les expression `lambda x: x*2` souvent utilisées dans le tri (`sort(key=...)`) et la cartographie (`map()`). Surtout, la puissance modulaire des signatures à longueurs variables : le Packing et Unpacking avec `*args` (Tuple de paramètres infinis) et `**kwargs` (Dictionnaire d'arguments nommés infinis).",
                objectives: ["Passer manuellement `N` arguments dynamiquement via def f(*args)", "Comprendre les Closures", "Trier des dictionnaires complexes via clé avec un oneliner lambda"],
                exercises: [
                    {
                        title: "Tri sur Composant Imbrique",
                        description: "Soit `users = [{'nom':'A', 'age':30}, {'nom':'B', 'age':20}]`. Triez cette liste par l'attribut `age` en Ordre décroissant sans importer de librairie en une seule ligne.",
                        difficulty: "Difficile",
                        solution: "`users.sort(key=lambda u: u['age'], reverse=True)`\nLa fonction lambda indique au moteur de tri interne (TimSort) de comparer spécifiquement les clés 'age' pour prendre sa décision.",
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
                content: "La transition vers l'architecture en composants. Le paradigme OOP (Object-Oriented Programming). Nous définirons les termes canoniques : Classe (Le Plan de construction), Instance (La Maison concrète bâtie), Attributs d'instance vs Attributs de classe. Vous apprendrez pourquoi toute méthode en Python exige le mot divin `self` en premier argument explicite. Nous implémenterons le Constructeur sacré `__init__`, et le concept d'Encapsulation avec les attributs \"privés\" masqués par le Name-Mangling du préfixe `__`.",
                objectives: ["Contruire des schémas de données orientés métiers", "Appeler un parent direct ou distant avec le mécanisme de résolution MRO", "Empêcher la collision fatale de variables via _Protected et __Private"],
                exercises: [
                    {
                        title: "Le Cœur de l'Instance (Self)",
                        description: "Pourquoi faire `class Chien: def aboyer(): print(nom)` génèrera une erreur fatale à l'appel `rex.aboyer()`, et comment la réparer ?",
                        difficulty: "Moyen",
                        solution: "Lorsque l'on fait `rex.aboyer()`, le runtime traduit cela mathématiquement par `Chien.aboyer(rex)`. Il faut capter l'instance entrante: `def aboyer(self): print(self.nom)`.",
                        hints: ["S'il y a des milliers de chiens, comment la fonction aboyer sait-elle QUEL nom aboyer ?"]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        id: "python-niveau-avanc",
        title: "Python - Niveau Intermédiaire",
        description: "Subjuguez le langage. Apprenez les décorateurs, les gestionnaires de contexte et les méthodes magiques.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        students: 7600,
        language: "python",
        isFree: true,
        tags: ["python", "avancé", "décorateurs", "dithers"],
        chapters: [
            {
                title: "Chapitre 1 : Les Méthodes Dunder (Magic Methods)",
                description: "Subjuguez le langage C sous-jacent. Apprenez à vos propres Objets à s'additionner mathématiquement.",
                order: 1,
                duration: "10 heures",
                content: "Les Dunder Methods (Double Under-score) sont le secret professionnel de Python. Quand vous faites `3 + 2`, Python exécute secrètement `int(3).__add__(2)`. En redéfinissant ces méthodes dans *vos* classes personnalisées, vous leur donnez les pouvoirs primitifs des types natifs. Nous apprendrons à redéfinir : `__str__`, `__eq__`, `__add__`, et `__len__`.",
                objectives: ["Surcharger les opérateurs mathématiques classiques (+, -, *)", "Rendre vos propres classes itérables (`__iter__`, `__next__`)", "Faire réagir un Objet comme un tuple via des index (`__getitem__`)"],
                exercises: [
                    {
                        title: "L'Égalité Profonde",
                        description: "Quelle méthode surcharger pour que `A == B` compare leurs valeurs intérieures plutôt que leur adresse RAM ?",
                        difficulty: "Difficile",
                        solution: "Il faut implémenter `def __eq__(self, other): return self.val == other.val`.",
                        hints: ["Dunder Equal."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 2 : Décorateurs & Context Managers",
                description: "Maîtrisez les patterns de conception avancés pour un code élégant et robuste.",
                order: 2,
                duration: "10 heures",
                content: "Le Décorateur (`@`) permet de modifier le comportement d'une fonction sans toucher à son code source. Idéal pour le logging ou la sécurité. Les Context Managers (`with`) garantissent que les ressources (fichiers, bases de données) sont toujours libérées, même en cas d'erreur fatale, grâce à `__enter__` et `__exit__`.",
                objectives: ["Écrire ses propres décorateurs", "Implémenter des Context Managers pour la gestion de ressources", "Utiliser @wraps pour préserver les métadonnées"],
                exercises: [
                    {
                        title: "Le Loggueur Décoratif",
                        description: "Écrivez un décorateur simple qui affiche 'Appel' avant d'exécuter la fonction décorée.",
                        difficulty: "Difficile",
                        solution: "def log(f):\\n  def wrapper(*args, **kwargs):\\n    print('Appel')\\n    return f(*args, **kwargs)\\n  return wrapper",
                        hints: ["Une fonction qui renvoie une fonction wrapper."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        id: "python-niveau-expert",
        title: "Python - Niveau Expert",
        description: "Contournez les limitations historiques du langage. Conquérez la concurrence et l'optimisation mémoire totale.",
        category: "Programmation",
        level: "Expert",
        duration: "60 heures",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        rating: 5.0,
        students: 2350,
        language: "python",
        isFree: true,
        tags: ["python", "asyncio", "multiprocessing", "expert", "GIL"],
        chapters: [
            {
                title: "Chapitre 1 : Itérateurs & Générateurs (Yield)",
                description: "Comment charger des téraoctets de données avec quelques mégaoctets de RAM.",
                order: 1,
                duration: "15 heures",
                content: "Le mot-clé `yield` crée un Générateur. Au lieu de stocker une liste entière en RAM, le générateur produit les valeurs une par une, sur demande (`next()`). C'est l'évaluation paresseuse (Lazy Evaluation), indispensable pour traiter d'immenses volumes de données.",
                objectives: ["Contruire des générateurs pour l'économie mémoire", "Comprendre le protocole d'itération", "Gérer StopIteration"],
                exercises: [
                    {
                        title: "Hibernation Infinie",
                        description: "Écrivez un générateur d'ID infini.",
                        difficulty: "Moyen",
                        solution: "def gen():\\n  i = 0\\n  while True:\\n    yield i\\n    i += 1",
                        hints: ["Une boucle infinie bloquée par yield."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 2 : Concurrence, Parallélisme & GIL",
                description: "Déchirez le Global Interpreter Lock en utilisant AsyncIO et le Multiprocessing.",
                order: 2,
                duration: "15 heures",
                content: "Comprenez le GIL (Global Interpreter Lock) et pourquoi le threading est limité en Python pour les calculs lourds. Apprenez `asyncio` pour les tâches I/O (Web, API) et `multiprocessing` pour utiliser réellement tous les cœurs de votre processeur sur des tâches CPU-bound.",
                objectives: ["Maîtriser le modèle event-loop de asyncio", "Utiliser multiprocessing.Pool pour le calcul massivement parallèle", "Distinguer I/O Bound et CPU Bound"],
                exercises: [
                    {
                        title: "Détruire le GIL",
                        description: "Quel module utiliser pour paralléliser des calculs mathématiques lourds sur 8 cœurs ?",
                        difficulty: "Difficile",
                        solution: "Multiprocessing. Car il crée des processus OS séparés avec chacun son propre GIL.",
                        hints: ["Processus vs Threads."]
                    }
                ],
                resources: []
            }
        ]
    }
];

module.exports = pythonCourses;
