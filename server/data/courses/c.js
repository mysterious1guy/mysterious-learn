const cCourses = [
    {
        title: "Langage C - Niveau Débutant",
        description: "Apprenez le langage C, la fondation de nombreux langages modernes (C++, Java, Python). Maitrisez la syntaxe de base, la compilation et l'affichage.",
        category: "Programmation",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        students: 11020,
        language: "french",
        isFree: true,
        tags: ["C", "compilation", "débutant", "syntaxe"],
        chapters: [
            {
                title: "Introduction et Hello World",
                description: "Votre premier programme en C et le processus de compilation.",
                order: 1,
                duration: "3 heures",
                content: "Le C est un langage compilé, inventé dans les années 70. Avant d'exécuter du C, il faut utiliser un 'compilateur' (comme GCC) qui traduit votre code (lisible par vous) en langage machine (lisible par l'ordinateur). Un programme C basique contient toujours la fonction `main()`, qui est le point de départ de l'exécution, et la directive `#include <stdio.h>` pour inclure la bibliothèque standard permettant de faire des affichages.",
                objectives: ["Comprendre le rôle du compilateur", "Écrire une structure de base", "Utiliser la fonction printf()"],
                exercises: [
                    {
                        title: "Mon premier programme",
                        description: "Écrivez le code complet pour afficher 'Bonjour le monde' suivi d'un retour à la ligne.",
                        difficulty: "Facile",
                        solution: "#include <stdio.h>\\n\\nint main() {\\n    printf(\"Bonjour le monde\\\\n\");\\n    return 0;\\n}",
                        hints: ["N'oubliez pas d'inclure stdio.h et de retourner 0 à la fin de la fonction main."]
                    }
                ],
                resources: [
                    {
                        title: "Introduction au C",
                        type: "video",
                        url: "https://www.youtube.com/embed/KJgsSFOSQv0"
                    },
                    {
                        title: "TerminalInteractif_C",
                        type: "code",
                        url: "sandbox://c/hello_world"
                    }
                ]
            },
            {
                title: "Variables et Types de Base",
                description: "Manipuler les nombres et les lettres en C.",
                order: 2,
                duration: "4 heures",
                content: "En C, vous devez toujours spécifier le type de la variable lors de sa déclaration (on dit que le typage est statique). Les types fondamentaux sont : `int` (entier), `float` et `double` (nombres à virgule), et `char` (un seul caractère). L'affichage des variables avec `printf` nécessite des 'spécificateurs de format' : `%d` pour un int, `%f` pour un float, `%c` pour un char.",
                objectives: ["Déclarer des variables", "Utiliser int, float, char", "Afficher et lire des variables (printf / scanf)"],
                exercises: [
                    {
                        title: "Calcul d'âge",
                        description: "Déclarez une variable constante pour l'année actuelle, demandez (supposez qu'on utilise scanf) l'année de naissance et calculez l'âge.",
                        difficulty: "Moyen",
                        solution: "#include <stdio.h>\\n\\nint main() {\\n    int annee_naissance = 1995;\\n    int age = 2024 - annee_naissance;\\n    printf(\"Vous avez %d ans\\\\n\", age);\\n    return 0;\\n}",
                        hints: ["Utilisez %d dans votre printf pour afficher un entier."]
                    }
                ],
                resources: [
                    {
                        title: "Variables en C",
                        type: "video",
                        url: "https://www.youtube.com/embed/8vRZEZ20l0Q"
                    }
                ]
            },
            {
                title: "Opérateurs et Conditions",
                description: "Contrôlez le flux de votre programme.",
                order: 3,
                duration: "4 heures",
                content: "Les conditions en C s'écrivent avec les mots clés `if`, `else if` et `else`. Les opérateurs de comparaison sont `==` (égal), `!=` (différent), `>`, `<`, `>=`, `<=`. L'opérateur logique 'ET' est `&&` et l'opérateur 'OU' est `||`. Il faut bien faire attention à utiliser double égal `==` pour la comparaison, le simple `=` est réservé à l'affectation !",
                objectives: ["Utiliser les opérateurs logiques", "Écrire des blocs if-else complets", "Comprendre le switch case"],
                exercises: [
                    {
                        title: "Pair ou Impair",
                        description: "Affichez 'Pair' si une variable nombre est paire, sinon 'Impair' (utilisez le modulo %).",
                        difficulty: "Facile",
                        solution: "int n = 4;\\nif (n % 2 == 0) {\\n    printf(\"Pair\");\\n} else {\\n    printf(\"Impair\");\\n}",
                        hints: ["L'opérateur modulo % renvoie le reste de la division."]
                    }
                ],
                resources: [
                    {
                        title: "Conditions en C",
                        type: "video",
                        url: "https://www.youtube.com/embed/-hK_QWJmU_k"
                    }
                ]
            },
            {
                title: "Les Boucles en C",
                description: "for, while et do-while.",
                order: 4,
                duration: "4 heures",
                content: "Les boucles for en C ont une syntaxe très compacte : `for (initialisation; condition; incrémentation) { ... }`. Elles sont parfaites quand on connait le nombre exact de tours. La boucle `while (condition) { ... }` tourne tant que la condition est (et reste) vraie. Enfin `do { ... } while (condition);` tourne au moins une fois quoiqu'il arrive.",
                objectives: ["Maîtriser la boucle for", "Maîtriser la boucle while", "Savoir éviter les boucles infinies"],
                exercises: [
                    {
                        title: "Boucle de 1 à 10",
                        description: "Affichez les nombres de 1 à 10 en utilisant une boucle for.",
                        difficulty: "Facile",
                        solution: "for (int i = 1; i <= 10; i++) {\\n    printf(\"%d \", i);\\n}",
                        hints: ["L'incrémentation typique est i++"]
                    }
                ],
                resources: [
                    {
                        title: "Les boucles en C",
                        type: "video",
                        url: "https://www.youtube.com/embed/uAlW20z5J6I"
                    },
                    {
                        title: "Boucle Terminal",
                        type: "code",
                        url: "sandbox://c/loops"
                    }
                ]
            }
        ]
    },
    {
        title: "Langage C - Niveau Intermédiaire",
        description: "Apprenez les spécificités du bas niveau. Maitrisez la gestion de la mémoire, les pointeurs et les tableaux.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        rating: 4.7,
        students: 7600,
        language: "french",
        isFree: true,
        tags: ["C", "pointeurs", "mémoire", "intermédiaire"],
        chapters: [
            {
                title: "Fonctions et Modularité",
                description: "Découpez votre code en multiples fichiers",
                order: 1,
                duration: "5 heures",
                content: "En C, on sépare généralement les déclarations des fonctions de leurs définitions. On place les prototypes (les déclarations) dans des fichiers d'en-tête (fichiers `.h`) et on place le code de la fonction dans des fichiers source (fichiers `.c`). Cela permet de compiler le programme de manière séparée et modulaire.",
                objectives: ["Écrire des fonctions en C", "Comprendre les prototypes", "Savoir quoi mettre dans un fichier .h"],
                exercises: [
                    {
                        title: "Prototype de fonction",
                        description: "Écrivez le prototype d'une fonction nommée 'calculerSurface' prenant deux nombres à virgule 'largeur' et 'longueur' et retournant un nombre à virgule.",
                        difficulty: "Facile",
                        solution: "double calculerSurface(double largeur, double longueur);",
                        hints: ["N'oubliez pas le point-virgule final pour un prototype."]
                    }
                ],
                resources: [
                    {
                        title: "Les fonctions en C",
                        type: "video",
                        url: "https://www.youtube.com/embed/3lqxgqaA_H8"
                    }
                ]
            },
            {
                title: "Les Pointeurs : Le Cœur du C",
                description: "L'apprentissage indispensable pour tout développeur C.",
                order: 2,
                duration: "10 heures",
                content: "Un pointeur est une variable qui stocke non pas une valeur (comme 42), mais **l'adresse mémoire** d'une autre variable. L'opérateur `&` permet de récupérer l'adresse d'une variable. L'opérateur étoile `*` (déréférencement) permet d'accéder à la valeur située à cette adresse. Comprendre les pointeurs est vital pour manipuler les tableaux, passer des variables complexes par référence aux fonctions et gérer l'allocation dynamique.",
                objectives: ["Comprendre le concept d'adresse mémoire", "Déclarer et utiliser des pointeurs", "Passer des arguments par référence (par adresse) aux fonctions"],
                exercises: [
                    {
                        title: "Pointeur simple",
                        description: "Déclarez une variable a = 10, puis un pointeur 'ptr' qui contient l'adresse de a. Affichez la valeur de a en utilisant uniquement le pointeur.",
                        difficulty: "Moyen",
                        solution: "int a = 10;\\nint *ptr = &a;\\nprintf(\"%d\", *ptr);",
                        hints: ["Utilisez &a pour l'adresse de a, et *ptr pour accéder à sa valeur."]
                    }
                ],
                resources: [
                    {
                        title: "Comprendre enfin les pointeurs",
                        type: "video",
                        url: "https://www.youtube.com/embed/zuegQmMdy8M"
                    },
                    {
                        title: "Pointeurs: Sandbox",
                        type: "code",
                        url: "sandbox://c/pointers"
                    }
                ]
            },
            {
                title: "Les Tableaux et Chaines de caractères",
                description: "Gérer des suites de données et du texte.",
                order: 3,
                duration: "10 heures",
                content: "Un tableau statique en C est une suite contiguë d'éléments de même type. Le nom du tableau correspond en réalité à l'adresse de son premier élément (un pointeur constant). Les chaînes de caractères n'existent pas nativement en tant que 'type string' : ce sont simplement des tableaux de caractères (`char[]`) qui doivent obligatoirement se terminer par le caractère spécial (caractère nul ou fin de chaine) `\\0`.",
                objectives: ["Manipuler des tableaux avec des index", "Comprendre le lien tableau/pointeur", "Utiliser strcpy et strlen de string.h"],
                exercises: [
                    {
                        title: "Tableau de zéros",
                        description: "Initialisez un tableau d'entiers de taille 10 avec que des zéros, en une seule ligne.",
                        difficulty: "Facile",
                        solution: "int tab[10] = {0};",
                        hints: ["Les accolades permettent d'initialiser rapidement un petit tableau."]
                    }
                ],
                resources: [
                    {
                        title: "Chaines de caractères en C",
                        type: "video",
                        url: "https://www.youtube.com/embed/jZ_2X5YhB98"
                    }
                ]
            }
        ]
    },
    {
        title: "Langage C - Niveau Expert (Avancé)",
        description: "Programmez sans limites : allocation dynamique, structures avancées, fichiers et manipulation directe du système.",
        category: "Programmation",
        level: "Avancé",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        rating: 4.9,
        students: 3100,
        language: "french",
        isFree: true,
        tags: ["C", "malloc", "mémoire dynamique", "système", "fichiers"],
        chapters: [
            {
                title: "Allocation Dynamique de Mémoire",
                description: "Demandez de la mémoire au système quand vous en avez besoin.",
                order: 1,
                duration: "10 heures",
                content: "Les tableaux statiques ont une taille fixe déterminée à la compilation. Avec les fonctions `malloc()`, `calloc()`, `realloc()` (incluses dans `stdlib.h`), vous pouvez demander au système d'exploitation une taille de mémoire précise pendant l'exécution du programme. Attention : toute mémoire allouée dynamiquement DOIT être libérée manuellement avec la fonction `free()`, sinon vous créez des fuites de mémoire (Memory Leaks).",
                objectives: ["Utiliser malloc proprement", "Éviter les fuites de mémoire (free)", "Redimensionner un tableau avec realloc"],
                exercises: [
                    {
                        title: "Allocation d'un entier",
                        description: "Allouez dynamiquement l'espace pour un entier, donnez lui la valeur 50, puis libérez la mémoire.",
                        difficulty: "Moyen",
                        solution: "int *n = malloc(sizeof(int));\\n*n = 50;\\nfree(n);",
                        hints: ["Utilisez toujours sizeof() pour allouer le bon nombre d'octets."]
                    }
                ],
                resources: [
                    {
                        title: "Allocation dynamique expliquée",
                        type: "video",
                        url: "https://www.youtube.com/embed/xdGQevQ1sH"
                    },
                    {
                        title: "Terminal malloc/free",
                        type: "code",
                        url: "sandbox://c/malloc"
                    }
                ]
            },
            {
                title: "Structures et Types Personnalisés",
                description: "Créez vos propres types de données complexes.",
                order: 2,
                duration: "10 heures",
                content: "Les tableaux regroupent des éléments du même type. Les 'structures' (mot-clé `struct`) permettent de grouper des éléments de types différents sous un seul nom. Par exemple, une structure Joueur contenant un int (points) et un char[] (pseudo). Nous verrons l'utilisation de `typedef` pour aliéner les types et alléger l'écriture, ainsi que la manipulation de variables structure via pointeurs avec l'opérateur flèche `->`.",
                objectives: ["Définir une struct", "Utiliser struct avec typedef", "Accéder aux attributs avec . et ->"],
                exercises: [
                    {
                        title: "Structure Point",
                        description: "Créez une structure Point comportant deux champs entiers x et y.",
                        difficulty: "Facile",
                        solution: "struct Point {\\n    int x;\\n    int y;\\n};",
                        hints: ["La struct doit finir par un point-virgule."]
                    }
                ],
                resources: [
                    {
                        title: "Les structures en C",
                        type: "video",
                        url: "https://www.youtube.com/embed/uAlW20z5J6I"
                    }
                ]
            },
            {
                title: "Lecture et Écriture de Fichiers",
                description: "Persistez vos donnees sur le disque dur.",
                order: 3,
                duration: "10 heures",
                content: "Apprenez à utiliser l'API standard `FILE* fopen(nom, mode)`. Les modes sont 'r' (read), 'w' (write), 'a' (append). Les fonctions `fprintf`, `fscanf`, `fgets` et `fputs` vous permettent de manipuler le contenu textuel et binaire d'un fichier. Tout fichier ouvert doit impérativement être fermé avec `fclose(fichier)`. Vous aborderez les erreurs systèmes via `perror`.",
                objectives: ["Ouvrir un fichier", "Lire ligne par ligne", "Gérer les problèmes d'ouverture"],
                exercises: [
                    {
                        title: "Toujours fermer ses fichiers",
                        description: "Ouvrez le fichier 'test.txt' en mode écriture (w), sans rien y écrire, puis fermez-le.",
                        difficulty: "Facile",
                        solution: "FILE *f = fopen(\"test.txt\", \"w\");\\nif (f != NULL) {\\n    fclose(f);\\n}",
                        hints: ["Vérifiez toujours que le pointeur FILE n'est pas NULL avant de le fermer/manipuler."]
                    }
                ],
                resources: [
                    {
                        title: "Manipulation des fichiers C",
                        type: "video",
                        url: "https://www.youtube.com/embed/KJgsSFOSQv0"
                    }
                ]
            }
        ]
    }
];

module.exports = cCourses;
