const pythonCourses = [
    {
        title: "Python - Niveau Débutant",
        description: "Découvrez Python, le langage le plus populaire et polyvalent. Apprenez la syntaxe, les types de données et construisez vos premiers scripts.",
        category: "Programmation",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
        rating: 4.9,
        students: 23150,
        language: "french",
        isFree: true,
        tags: ["python", "script", "débutant", "syntaxe"],
        chapters: [
            {
                title: "Introduction et Premier Script",
                description: "L'écosystème Python et l'outil interactif REPL.",
                order: 1,
                duration: "2 heures",
                content: "Python est un langage interprété (pas de phase de compilation explicite). Vous pouvez écrire le code dans un fichier `.py` et le lancer via `python fichier.py`, ou utiliser le REPL interactif. C'est un langage extrêmement lisible grâce à son utilisation de l'indentation (les espaces) pour définir les blocs de code (au lieu des accolades comme en C).",
                objectives: ["Comprendre l'interpréteur", "Utiliser print() et input()", "Comprendre l'indentation"],
                exercises: [
                    {
                        title: "Salutation",
                        description: "Demandez le nom de l'utilisateur avec input() et affichez 'Bonjour [Nom] !'",
                        difficulty: "Facile",
                        solution: "nom = input('Votre nom ? ')\\nprint(f'Bonjour {nom} !')",
                        hints: ["Les f-strings (format) simplifient beaucoup l'affichage des variables."]
                    }
                ],
                resources: [
                    {
                        title: "Installation et premier script",
                        type: "video",
                        url: "https://www.youtube.com/embed/8ext9G7xspg"
                    },
                    {
                        title: "Terminal Python",
                        type: "code",
                        url: "sandbox://python/hello"
                    }
                ]
            },
            {
                title: "Types et Opérations de base",
                description: "Manipuler les nombres et les chaînes de caractères.",
                order: 2,
                duration: "4 heures",
                content: "Python typifie dynamiquement les variables. Un entier (int), un nombre à virgule (float), une chaîne (str) ou un booléen (bool). Python apporte aussi des opérateurs puissants comme la division entière `//` et l'élévation à la puissance `**`.",
                objectives: ["Utiliser les opérateurs mathématiques", "Convertir des types (cast)", "Manipuler des chaînes (slices)"],
                exercises: [
                    {
                        title: "Calculateur d'IMC",
                        description: "Calculez l'IMC = poids / (taille ** 2).",
                        difficulty: "Moyen",
                        solution: "poids = 70.0\\ntaille = 1.75\\nimc = poids / (taille ** 2)\\nprint('Votre IMC est', imc)",
                        hints: ["N'oubliez pas que taille doit être en mètres (ici 1.75)."]
                    }
                ],
                resources: [
                    {
                        title: "Variables et Types Python",
                        type: "video",
                        url: "https://www.youtube.com/embed/vEQ8CXFWLZU"
                    }
                ]
            },
            {
                title: "Contrôle de Flux (if, for, while)",
                description: "Contrôlez l'exécution de votre script.",
                order: 3,
                duration: "5 heures",
                content: "Le contrôle de flux en Python utilise `if`, `elif`, et `else`. Pour itérer sur une plage de valeurs, on utilise `for i in range(n)`. L'indentation est stricte pour délimiter les blocs, sous peine de déclencher un `IndentationError`. Les opérateurs logiques sont écrits en toutes lettres : `and`, `or`, `not`.",
                objectives: ["Gérer les conditions avec if/elif/else", "Itérer avec une boucle for", "Créer une boucle while"],
                exercises: [
                    {
                        title: "FizzBuzz",
                        description: "Pour les nombres de 1 à 15 inclusivement, affichez Fizz si divisible par 3, Buzz si divisible par 5, et FizzBuzz si divisible par 15.",
                        difficulty: "Difficile",
                        solution: "for i in range(1, 16):\\n    if i % 15 == 0:\\n        print('FizzBuzz')\\n    elif i % 3 == 0:\\n        print('Fizz')\\n    elif i % 5 == 0:\\n        print('Buzz')\\n    else:\\n        print(i)",
                        hints: ["L'ordre des conditions est important ! Commencez par le test mod 15."]
                    }
                ],
                resources: [
                    {
                        title: "Contrôle de flux",
                        type: "video",
                        url: "https://www.youtube.com/embed/z69RPUzFp0k"
                    }
                ]
            }
        ]
    },
    {
        title: "Python - Niveau Intermédiaire",
        description: "Structures de données, fonctions et manipulations de fichiers. Écrivez un code pythonique.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
        rating: 4.8,
        students: 15400,
        language: "french",
        isFree: true,
        tags: ["python", "listes", "dictionnaires", "fonctions", "intermédiaire"],
        chapters: [
            {
                title: "Structures de Données",
                description: "Listes, tuples, ensembles et dictionnaires.",
                order: 1,
                duration: "6 heures",
                content: "La puissance de Python réside dans ses collections prêtes à l'emploi. Les `list` (modifiables), les `tuple` (non modifiables), les `set` (collections non-ordonnées et sans doublons), et les `dict` (tableaux associatifs clé-valeur). Vous apprendrez également la puissance des compréhensions de listes (`[x*2 for x in list]`).",
                objectives: ["Maitriser les méthodes des listes (append, pop, etc.)", "Gérer la mémoire avec dictionnaires (clés-valeurs)", "Maîtriser les list comprehensions"],
                exercises: [
                    {
                        title: "Extraction de carrés",
                        description: "Créez une liste contenant les carrés des nombres pairs entre 0 et 10, en une seule ligne (list comprehension).",
                        difficulty: "Moyen",
                        solution: "carres_pairs = [x**2 for x in range(11) if x % 2 == 0]",
                        hints: ["Utilisez range(11) pour inclure 10."]
                    }
                ],
                resources: [
                    {
                        title: "Listes et Dictionnaires en profondeur",
                        type: "video",
                        url: "https://www.youtube.com/embed/tw7ror9x32s"
                    }
                ]
            },
            {
                title: "Fonctions et Modules",
                description: "Réutilisez le code de la communauté et le vôtre.",
                order: 2,
                duration: "6 heures",
                content: "On définit une fonction avec `def nom_fonction(arguments):`. Python permet de retourner plusieurs valeurs d'un coup. Nous verrons aussi l'importation de modules de la librairie standard (comme `math` ou `random`) ou de librairies externes (via `pip`). On parlera aussi des fonctions anonymes (lambdas).",
                objectives: ["Créer des fonctions complexes avec des arguments nommés", "Retourner des tuples", "Importer des modules avec from/import"],
                exercises: [
                    {
                        title: "Fonction de stats",
                        description: "Créez une fonction get_stats(liste) qui retourne le minimum, le maximum et la somme.",
                        difficulty: "Facile",
                        solution: "def get_stats(L):\\n    return min(L), max(L), sum(L)\\n\\nmini, maxi, total = get_stats([10, 5, 20])",
                        hints: ["Retourner min(L), max(L), sum(L) se fait de manière implicite via un tuple."]
                    }
                ],
                resources: [
                    {
                        title: "Ecrire de meilleures fonctions Python",
                        type: "video",
                        url: "https://www.youtube.com/embed/9Os0O3WzOig"
                    }
                ]
            },
            {
                title: "Gestion de Fichiers et Exceptions",
                description: "Rendre son code robuste.",
                order: 3,
                duration: "8 heures",
                content: "Un bon script ne plante pas violemment : il gère les erreurs. Nous introduirons le bloc `try / except / finally` pour attraper les exceptions de type `ValueError`, `FileNotFoundError`, etc. Nous manipulerons des fichiers (TXT, CSV, JSON) en toute sécurité avec le context manager `with open(fichier) as f:` qui ferme automatiquement les ressources.",
                objectives: ["Attraper des erreurs avec try/except", "Ouvrir et lire de la data structurée (JSON)", "Sécuriser les flux avec WITH"],
                exercises: [
                    {
                        title: "Diviser sans planter",
                        description: "Demandez deux nombres à l'utilisateur, divisez-les. Si le second est 0, affichez 'Division par zéro !' au lieu de faire crasher le script.",
                        difficulty: "Moyen",
                        solution: "try:\\n    a = int(input())\\n    b = int(input())\\n    print(a/b)\\nexcept ZeroDivisionError:\\n    print('Division par zéro !')",
                        hints: ["L'erreur générée par python est ZeroDivisionError."]
                    }
                ],
                resources: [
                    {
                        title: "Exceptions et Context Managers",
                        type: "video",
                        url: "https://www.youtube.com/embed/NIWwJbo-9_8"
                    }
                ]
            }
        ]
    },
    {
        title: "Python - Niveau Expert (Avancé)",
        description: "Programmation Orientée Objet, décorateurs, et algorithmes performants en Python.",
        category: "Programmation",
        level: "Avancé",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
        rating: 5.0,
        students: 9200,
        language: "french",
        isFree: true,
        tags: ["python", "OOP", "décorateurs", "avancé", "classes"],
        chapters: [
            {
                title: "Programmation Orientée Objet (POO)",
                description: "Modélisez le monde réel avec des classes et des objets.",
                order: 1,
                duration: "10 heures",
                content: "En Python, tout est objet. Il est temps de créer les vôtres. Vous apprendrez à utiliser le mot-clé `class`, le constructeur `__init__(self)`, et l'encapsulation basique. Nous explorerons l'héritage (super() class) et le polymorphisme, ainsi que les méthodes magiques ou dunder (`__str__`, `__len__`, `__add__`) qui rendent vos objets compatibles avec les comportements standard de Python.",
                objectives: ["Définir une classe complète", "Surcharger des méthodes", "Gérer l'héritage parent-enfant"],
                exercises: [
                    {
                        title: "Classe Chien",
                        description: "Créez une classe Chien avec un attribut nom, et une méthode aboyer qui retourne 'Ouaf je suis [nom]'.",
                        difficulty: "Moyen",
                        solution: "class Chien:\\n    def __init__(self, nom):\\n        self.nom = nom\\n    def aboyer(self):\\n        return f'Ouaf je suis {self.nom}'",
                        hints: ["N'esquebez pas le premier paramètre 'self' dans les méthodes !"]
                    }
                ],
                resources: [
                    {
                        title: "La POO en Python Mode Avancé",
                        type: "video",
                        url: "https://www.youtube.com/embed/ZDa-Z5JzLYM"
                    }
                ]
            },
            {
                title: "Décorateurs et Fonctions Avancées",
                description: "Modifiez le comportement de vos fonctions à la volée.",
                order: 2,
                duration: "8 heures",
                content: "Les fonctions en Python sont des objets de 'Première classe', elles peuvent être passées en paramètres d'autres fonctions. Un décorateur (la syntaxe avec `@decorateur`) est un *wrapper* (enveloppe) autour d'une fonction pour ajouter un comportement avant et après l'exécution de la fonction sans en modifier le contenu (ex: mesurer le temps d'exécution, forcer une authentification).",
                objectives: ["Passer des fonctions en paramètres", "Créer un décorateur simple", "Comprendre *args et **kwargs"],
                exercises: [
                    {
                        title: "Décorateur logueur",
                        description: "Créez un décorateur @log_exec qui affiche 'Fonction exécutée' avant d'appeler la fonction passée en argument.",
                        difficulty: "Difficile",
                        solution: "def log_exec(func):\\n    def wrapper(*args, **kwargs):\\n        print('Fonction exécutée')\\n        return func(*args, **kwargs)\\n    return wrapper",
                        hints: ["Vous devez définir une fonction wrapper au sein du décorateur."]
                    }
                ],
                resources: [
                    {
                        title: "Mystificateurs ? Non, des décorateurs !",
                        type: "video",
                        url: "https://www.youtube.com/embed/FsAPt_9Bf3U"
                    }
                ]
            }
        ]
    }
];

module.exports = pythonCourses;
