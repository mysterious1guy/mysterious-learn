const algoCourses = [
    {
        title: "Algorithmique - Niveau Débutant",
        description: "Plongez dans les bases de l'algorithmique. Apprenez à penser comme un ordinateur, à structurer votre logique et à résoudre des problèmes simples étape par étape.",
        category: "Théorie",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1516116216624-98e6e351d85e?w=800&q=80",
        rating: 4.9,
        students: 12050,
        language: "french",
        isFree: true,
        tags: ["algorithme", "logique", "débutant", "bases"],
        chapters: [
            {
                title: "Introduction et Pensée Logique",
                description: "Découvrez ce qu'est un algorithme au travers d'exemples de la vie courante.",
                order: 1,
                duration: "2 heures",
                content: "Un algorithme n'est rien d'autre qu'une suite d'instructions précises pour accomplir une tâche. Pensez à une recette de cuisine : vous avez des ingrédients (les données en entrée), une série d'étapes (le traitement) et un plat final (le résultat en sortie). Dans ce chapitre, nous allons déconstruire des actions quotidiennes pour comprendre comment un ordinateur 'pense'. L'objectif est de vous familiariser avec la séquentialité et la précision requises en programmation.",
                objectives: ["Comprendre la définition d'un algorithme", "Décomposer une tâche en étapes logiques", "Identifier les entrées et sorties"],
                exercises: [
                    {
                        title: "La recette de cuisine algorithmique",
                        description: "Écrivez les étapes séquentielles pour faire cuire des pâtes, en incluant des conditions (ex: si l'eau bout).",
                        difficulty: "Facile",
                        solution: "1. Prendre une casserole\n2. Mettre de l'eau\n3. Chauffer\n4. SI l'eau bout ALORS mettre les pâtes\n5. Attendre 10 min\n6. Égoutter",
                        hints: ["Pensez à chaque petite action", "N'oubliez pas les conditions (SI... ALORS...)"]
                    }
                ],
                resources: [
                    {
                        title: "C'est quoi un algorithme ?",
                        type: "video",
                        url: "https://www.youtube.com/embed/6iZiqQZBQNY"
                    }
                ]
            },
            {
                title: "Variables et Types de Données",
                description: "Comment stocker l'information en mémoire pour la réutiliser.",
                order: 2,
                duration: "3 heures",
                content: "Pour manipuler des données, un algorithme doit les stocker. Nous utilisons pour cela des 'variables'. Une variable est comme une boîte portant une étiquette (son nom) et contenant un objet (sa valeur). Cette valeur peut être de différents types : un nombre entier, un nombre à virgule, du texte (chaîne de caractères) ou un booléen (Vrai ou Faux). Bien nommer ses variables est la première étape vers un code propre et compréhensible.",
                objectives: ["Déclarer une variable", "Différencier les types de données fondamentaux", "Affecter et modifier des valeurs"],
                exercises: [
                    {
                        title: "Échange de valeurs",
                        description: "Soit A = 5 et B = 10. Écrivez un algorithme pour échanger leurs valeurs en utilisant une variable temporaire C.",
                        difficulty: "Moyen",
                        solution: "C = A\nA = B\nB = C",
                        hints: ["Utilisez une troisième 'boîte' (variable) pour ne pas perdre la valeur de A."]
                    }
                ],
                resources: [
                    {
                        title: "Comprendre les variables",
                        type: "video",
                        url: "https://www.youtube.com/embed/ZiaJ0tBwEw0"
                    },
                    {
                        title: "Testez vos variables (Terminal)",
                        type: "code",
                        url: "sandbox://algo/variables"
                    }
                ]
            },
            {
                title: "Les Conditions (Si, Sinon)",
                description: "Apprenez à votre algorithme à prendre des décisions.",
                order: 3,
                duration: "4 heures",
                content: "Un programme linéaire fait toujours la même chose. Pour le rendre intelligent, il faut qu'il s'adapte aux données. C'est le rôle des structures conditionnelles (SI condition ALORS action SINON autre action). Nous allons explorer les opérateurs de comparaison (égal, différent, plus grand que) et les opérateurs logiques (ET, OU, NON) pour construire des conditions complexes.",
                objectives: ["Utiliser IF/ELSE", "Maîtriser les opérateurs logiques", "Imbriquer des conditions"],
                exercises: [
                    {
                        title: "Vérification de majorité",
                        description: "Créez un algorithme qui demande l'âge de l'utilisateur et affiche s'il est majeur ou mineur.",
                        difficulty: "Facile",
                        solution: "LIRE age\nSI age >= 18 ALORS\n  AFFICHER 'Majeur'\nSINON\n  AFFICHER 'Mineur'\nFIN SI",
                        hints: ["L'âge de la majorité est 18 ans."]
                    }
                ],
                resources: [
                    {
                        title: "Les structures conditionnelles",
                        type: "video",
                        url: "https://www.youtube.com/embed/0B2k5E4bZJ4"
                    }
                ]
            },
            {
                title: "Les Boucles (Tant Que, Pour)",
                description: "Répéter des actions de manière efficace.",
                order: 4,
                duration: "6 heures",
                content: "Les ordinateurs sont excellents pour répéter des tâches sans se fatiguer. Les boucles (POUR, TANT QUE) permettent d'exécuter un bloc d'instructions plusieurs fois. La boucle POUR est utilisée quand on connaît le nombre de répétitions à l'avance. La boucle TANT QUE est utilisée quand on répète jusqu'à ce qu'une condition soit remplie (attention aux boucles infinies !).",
                objectives: ["Mettre en place une boucle FOR", "Mettre en place une boucle WHILE", "Éviter les boucles infinies"],
                exercises: [
                    {
                        title: "Compte à rebours",
                        description: "Faites un algorithme qui affiche les nombres de 10 à 1 en utilisant une boucle TANT QUE.",
                        difficulty: "Moyen",
                        solution: "N = 10\nTANT QUE N > 0 FAIRE\n  AFFICHER N\n  N = N - 1\nFIN TANT QUE\nAFFICHER 'Décollage'",
                        hints: ["N'oubliez pas de décrémenter (réduire) N à chaque tour."]
                    }
                ],
                resources: [
                    {
                        title: "Comprendre les boucles",
                        type: "video",
                        url: "https://www.youtube.com/embed/9Bv_A0M2M1Y"
                    }
                ]
            }
        ]
    },
    {
        title: "Algorithmique - Niveau Intermédiaire",
        description: "Passez à la vitesse supérieure. Découvrez les structures de données complexes et les algorithmes de tri classiques.",
        category: "Théorie",
        level: "Intermédiaire",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        students: 8540,
        language: "french",
        isFree: true,
        tags: ["algorithme", "tableaux", "tris", "intermédiaire"],
        chapters: [
            {
                title: "Les Tableaux (Arrays)",
                description: "Stocker et parcourir des listes de données.",
                order: 1,
                duration: "5 heures",
                content: "Jusqu'à présent, une variable stockait une seule valeur. Un tableau permet de stocker une collection ordonnée de valeurs sous un seul nom de variable. Chaque élément est accessible via son 'index' (sa position). Nous verrons comment parcourir un tableau avec une boucle POUR, comment trouver le maximum, le minimum, ou calculer la moyenne des éléments.",
                objectives: ["Déclarer et initialiser un tableau", "Accéder aux éléments par leur index", "Parcourir un tableau avec une boucle"],
                exercises: [
                    {
                        title: "Recherche du maximum",
                        description: "Écrire un algorithme qui trouve la plus grande valeur dans un tableau d'entiers naturels non vides T de taille N.",
                        difficulty: "Moyen",
                        solution: "Max = T[0]\nPOUR i ALLANT DE 1 A N-1 FAIRE\n  SI T[i] > Max ALORS\n    Max = T[i]\n  FIN SI\nFIN POUR\nAFFICHER Max",
                        hints: ["Initialisez votre variable Max avec le premier élément du tableau."]
                    }
                ],
                resources: [
                    {
                        title: "Les Tableaux expliqués",
                        type: "video",
                        url: "https://www.youtube.com/embed/5mFpPbcXgB0"
                    }
                ]
            },
            {
                title: "Les Fonctions et Procédures",
                description: "Modularisez votre code pour le rendre réutilisable.",
                order: 2,
                duration: "5 heures",
                content: "Dès qu'un algorithme devient long, il faut le diviser en sous-programmes appelés fonctions ou procédures. Une procédure effectue une action (ex: afficher un menu) sans renvoyer de résultat. Une fonction prend des entrées (paramètres), effectue un calcul, et retourne une sortie (valeur de retour globale). Cela permet de ne pas se répéter (principe DRY : Don't Repeat Yourself), de rendre le code beaucoup plus lisible, et de faciliter le débogage en isolant la logique.",
                objectives: ["Créer une fonction avec paramètres", "Comprendre la portée (scope) des variables", "Retourner une valeur"],
                exercises: [
                    {
                        title: "Fonction addition",
                        description: "Créez une fonction 'Somme' qui prend deux paramètres A et B et retourne leur somme.",
                        difficulty: "Facile",
                        solution: "FONCTION Somme(A, B)\n  RETOURNER A + B\nFIN FONCTION",
                        hints: ["N'oubliez pas le mot-clé RETOURNER."]
                    }
                ],
                resources: [
                    {
                        title: "Fonctions en programmation",
                        type: "video",
                        url: "https://www.youtube.com/embed/8vOaO9I8WJU"
                    }
                ]
            },
            {
                title: "Algorithmes de Tri Fondamentaux",
                description: "Comment ordonner efficacement des données.",
                order: 3,
                duration: "10 heures",
                content: "Trier des données est l'un des problèmes les plus classiques en informatique. Nous allons étudier plusieurs algorithmes de tri simples : le tri à bulles (Bubble Sort), le tri par sélection (Selection Sort) et le tri par insertion (Insertion Sort). Pour chacun, nous analyserons son fonctionnement étape par étape et sa logique.",
                objectives: ["Comprendre le Tri à bulles", "Comprendre le Tri par sélection", "Appliquer ces tris sur un tableau"],
                exercises: [
                    {
                        title: "Tri à bulles",
                        description: "Écrivez le pseudo-code du tri à bulles pour trier un tableau T de taille N dans l'ordre croissant.",
                        difficulty: "Difficile",
                        solution: "POUR i ALLANT DE 0 A N-1 FAIRE\n  POUR j ALLANT DE 0 A N-i-2 FAIRE\n    SI T[j] > T[j+1] ALORS\n      Echanger(T[j], T[j+1])\n    FIN SI\n  FIN POUR\nFIN POUR",
                        hints: ["Comparez les éléments adjacents et échangez-les s'ils sont dans le mauvais ordre."]
                    }
                ],
                resources: [
                    {
                        title: "Comprendre les algorithmes de tri",
                        type: "video",
                        url: "https://www.youtube.com/embed/kgBjXUE_Nwc"
                    }
                ]
            }
        ]
    },
    {
        title: "Algorithmique - Niveau Expert (Avancé)",
        description: "Maîtrisez la complexité algorithmique, la récursivité et les arbres. Devenez un pur ingénieur logiciel.",
        category: "Théorie",
        level: "Avancé",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
        rating: 5.0,
        students: 4200,
        language: "french",
        isFree: true,
        tags: ["algorithme", "avancé", "récursivité", "arbres", "complexité"],
        chapters: [
            {
                title: "Complexité Algorithmique (Big O)",
                description: "Évaluez les performances de vos algorithmes.",
                order: 1,
                duration: "5 heures",
                content: "Un programme qui fonctionne n'est pas toujours un *bon* programme. S'il met 10 ans à trier un milliard de données, il est inutile. La notation Big O permet d'évaluer la complexité temporelle (en temps) et spatiale (en mémoire) d'un algorithme asymptotiquement. Nous étudierons O(1), O(n), O(n^2), O(log n) et O(n log n).",
                objectives: ["Comprendre la notation Big O", "Calculer la complexité d'un algorithme simple", "Optimiser le temps d'exécution"],
                exercises: [
                    {
                        title: "Calcul de complexité",
                        description: "Quelle est la complexité du Tri à Bulles vu au niveau intermédiaire ?",
                        difficulty: "Moyen",
                        solution: "O(n^2) car il y a deux boucles POUR imbriquées qui dépendent de la taille N du tableau.",
                        hints: ["Regardez le nombre de boucles imbriquées."]
                    }
                ],
                resources: [
                    {
                        title: "La notation Grand O",
                        type: "video",
                        url: "https://www.youtube.com/embed/v4cd1O4zkGw"
                    }
                ]
            },
            {
                title: "Les Matrices et Tableaux Multidimensionnels",
                description: "Apprenez à manipuler des grilles de données (Lignes et Colonnes).",
                order: 2,
                duration: "7 heures",
                content: "Une matrice est un tableau à deux dimensions (ou plus). Pensez-y comme à une grille de morpion ou un tableur Excel avec des lignes et des colonnes. Pour accéder à un élément, vous avez besoin de deux indices : Ligne i, et Colonne j (noté M[i][j]). Les matrices sont fondamentales pour les jeux vidéos, le traitement d'images, et l'intelligence artificielle. Nous apprendrons à parcourir une matrice avec deux boucles imbriquées et à effectuer des opérations matricielles (addition, transposition).",
                objectives: ["Déclarer une matrice", "Parcourir une matrice avec deux boucles POUR", "Comprendre les indices i et j"],
                exercises: [
                    {
                        title: "Somme d'une matrice",
                        description: "Écrivez un algorithme qui calcule la somme de tous les éléments d'une matrice M de taille L lignes et C colonnes.",
                        difficulty: "Moyen",
                        solution: "Somme = 0\nPOUR i ALLANT DE 0 A L-1 FAIRE\n  POUR j ALLANT DE 0 A C-1 FAIRE\n    Somme = Somme + M[i][j]\n  FIN POUR\nFIN POUR\nAFFICHER Somme",
                        hints: ["Il vous faut une boucle POUR pour les lignes, et à l'intérieur, une autre boucle POUR pour les colonnes."]
                    }
                ],
                resources: [
                    {
                        title: "Les Tableaux à 2 Dimensions",
                        type: "video",
                        url: "https://www.youtube.com/embed/5mFpPbcXgB0" // Placeholder
                    }
                ]
            },
            {
                title: "La Récursivité",
                description: "Quand une fonction s'appelle elle-même.",
                order: 3,
                duration: "8 heures",
                content: "La récursivité est une méthode de programmation où une fonction fait appel à elle-même pour résoudre une plus petite instance du même problème. Il est crucial d'avoir une 'condition d'arrêt' (cas de base) pour éviter une boucle de pile infinie (Stack Overflow). Nous verrons des classiques comme le calcul de factorielle ou la suite de Fibonacci.",
                objectives: ["Définir un cas de base", "Écrire une fonction récursive", "Comprendre la pile d'exécution (Call Stack)"],
                exercises: [
                    {
                        title: "Factorielle récursive",
                        description: "Écrivez une fonction récursive qui calcule la factorielle d'un entier n positif (n!).",
                        difficulty: "Difficile",
                        solution: "FONCTION Fact(n)\n  SI n == 0 OU n == 1 ALORS\n    RETOURNER 1\n  SINON\n    RETOURNER n * Fact(n - 1)\n  FIN SI\nFIN FONCTION",
                        hints: ["Quel est le résultat de Fact(1) ou Fact(0) ? C'est votre cas de base !"]
                    }
                ],
                resources: [
                    {
                        title: "Récursivité expliquée",
                        type: "video",
                        url: "https://www.youtube.com/embed/Mv9NEXX1VHc"
                    }
                ]
            },
            {
                title: "Tris Avancés et Recherche Dichotomique",
                description: "Les algorithmes les plus rapides du monde.",
                order: 4,
                duration: "12 heures",
                content: "Nous abordons ici les algorithmes en O(n log n) comme le Tri Rapide (Quick Sort) et le Tri Fusion (Merge Sort). Ils utilisent l'approche 'Diviser pour Régner' (Divide and Conquer). Nous verrons également comment chercher efficacement un élément dans un tableau trié grâce à la recherche dichotomique (Binary Search), qui élimine la moitié des possibilités à chaque étape (O(log n)).",
                objectives: ["Implémenter la recherche dichotomique", "Comprendre le concept Divide and Conquer", "Différencier Merge Sort et Quick Sort"],
                exercises: [
                    {
                        title: "Recherche Dichotomique",
                        description: "Faites l'algorithme de recherche dichotomique pour trouver la valeur X dans un tableau T trié.",
                        difficulty: "Difficile",
                        solution: "debut = 0, fin = N-1\nTANT QUE debut <= fin FAIRE\n  milieu = (debut + fin) / 2\n  SI T[milieu] == X ALORS RETOURNER milieu\n  SI T[milieu] < X ALORS debut = milieu + 1\n  SINON fin = milieu - 1\nFIN TANT QUE\nRETOURNER -1",
                        hints: ["Coupez l'intervalle en deux à chaque étape."]
                    }
                ],
                resources: [
                    {
                        title: "La Recherche Dichotomique",
                        type: "video",
                        url: "https://www.youtube.com/embed/P3YcAW7jM"
                    }
                ]
            }
        ]
    }
];

module.exports = algoCourses;
