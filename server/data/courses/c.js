const cCourses = [
    {
        id: "c-niveau-d-butant-les-fondations-syst-me",
        title: "C - Niveau Débutant : Les Fondations Système",
        description: "Plongez dans le langage le plus fondamental de l'informatique moderne. Comprenez la compilation, les types natifs, et la rudesse de la gestion de mémoire sans filet de sécurité.",
        category: "Programmation",
        level: "Débutant",
        duration: "35 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        students: 8500,
        language: "c",
        isFree: true,
        tags: ["c", "backend", "fondations", "débutant", "programmation"],
        motivationVideo: "nKIu9yen5nc",
        chapters: [
            {
                title: "Chapitre 1 : Qu'est-ce que C ? (Le moteur sous le capot)",
                description: "Comprenez pourquoi le C est le langage le plus puissant et respecté au monde.",
                order: 1,
                duration: "2 heures",
                content: "Si la programmation était de la mécanique, le JavaScript serait une voiture automatique moderne, et le **C serait le moteur lui-même**. \n\n* Pourquoi apprendre le C ? \n  1. Pour comprendre comment la mémoire fonctionne réellement. \n  2. Parce que Linux, Windows, macOS et même votre micro-ondes sont écrits en C. \n  3. C'est le langage 'père' : si vous connaissez le C, vous apprendrez n'importe quel autre langage en 2 jours. \n\nEn C, on n'a pas peur de la complexité, on l'apprivoise pour créer des programmes ultra-rapides.",
                objectives: ["Comprendre la place du C dans l'informatique", "Réaliser que le C est plus proche du matériel que les autres langages"],
                exercises: [
                    {
                        title: "L'Ancêtre",
                        description: "Vrai ou Faux : Le C a été créé après le langage Java ?",
                        difficulty: "Facile",
                        solution: "Faux. Le C est bien plus ancien (1972) et a servi de base pour créer Java.",
                        hints: ["C'est un langage pionnier."]
                    }
                ],
                resources: [
                    { title: "Introduction au C (Video)", type: "video", url: "https://www.youtube.com/embed/n4XW4W_jM6k" }
                ]
            },
            {
                title: "Chapitre 2 : La Chaine de Compilation : Du texte au binaire",
                description: "Le voyage magique de votre code vers le processeur.",
                order: 2,
                duration: "3 heures",
                content: "L'ordinateur ne comprend pas le texte que vous écrivez. Il ne comprend que les 0 et les 1 (le binaire). \n\n* Le **Compilateur** est un traducteur qui prend votre fichier `.c` et le transforme en un fichier exécutable (`.exe` ou `.out`). \n* Contrairement au JavaScript qui est interprété en direct, le C doit être 'préparé' entièrement avant de pouvoir être lancé. \n\nC'est ce qui le rend si rapide : au moment où vous lancez l'application, tout le travail de traduction est déjà fini !",
                objectives: ["Comprendre le rôle du compilateur", "Distinguer fichier source et fichier exécutable"],
                exercises: [
                    {
                        title: "Le Traducteur",
                        description: "Comment appelle-t-on le logiciel qui transforme votre code C en langage machine ?",
                        difficulty: "Facile",
                        solution: "Le Compilateur (ex: GCC ou Clang).",
                        hints: ["Comme pour traduire une langue étrangère."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : La Structure Minimale : #include et int main()",
                description: "Apprenez les hiéroglyphes obligatoires pour tout programme C.",
                order: 3,
                duration: "2 heures",
                content: "Tout programme C commence par ces lignes : \n\n`#include <stdio.h>` : C'est une bibliothèque qui permet de parler à l'écran. \n`int main() { ... }` : C'est le **point d'entrée**. L'ordinateur cherche toujours le mot 'main' pour savoir par où commencer. \n\nSi vous oubliez ces lignes, votre programme est comme une voiture sans clé : elle ne démarrera jamais.",
                objectives: ["Mémoriser la structure de base", "Comprendre l'utilité des bibliothèques (.h)"],
                exercises: [
                    {
                        title: "La Porte d'Entrée",
                        description: "Sans quelle fonction spéciale un programme C refuse-t-il de démarrer ?",
                        difficulty: "Facile",
                        solution: "La fonction `main()`.",
                        hints: ["C'est l'entrée principale."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : printf() : Parler au monde",
                description: "Votre premier outil pour afficher des informations à l'écran.",
                order: 4,
                duration: "2 heures",
                content: "Pour afficher du texte, on utilise `printf` (Print Formatted). \n\n* Syntaxe : `printf(\"Bonjour !\\n\");` \n* Le `\\n` à la fin est très important : il demande à l'ordinateur de passer à la ligne suivante. \n\nN'oubliez jamais le **point-virgule** `;` à la fin de chaque instruction ! En C, oublier un `;` est le crime le plus courant qui empêche la compilation.",
                objectives: ["Afficher du texte simple", "Utiliser le saut de ligne \\n"],
                exercises: [
                    {
                        title: "Le Salut Technique",
                        description: "Quel est l'affichage de ce code ?\n```c\n#include <stdio.h>\nint main() {\n  printf(\"Hello\");\n  printf(\"World\");\n  return 0;\n}```",
                        difficulty: "Moyen",
                        solution: "HelloWorld (Collé, car il manque le \\n dans le premier printf).",
                        hints: ["Le retour à la ligne n'est pas automatique !"]
                    }
                ],
                resources: [
                    { title: "Maîtriser le printf (Video)", type: "video", url: "https://www.youtube.com/embed/9Bv_8Ipxe3U" }
                ]
            },
            {
                title: "Chapitre 5 : La Mémoire en C : Les adresses physiques",
                description: "Regardez dans les entrailles de votre ordinateur.",
                order: 5,
                duration: "3 heures",
                content: "En C, on ne parle pas de 'nuage' ou de données abstraites. On parle de **cases mémoire**. \n\n* Chaque donnée que vous stockez occupe une place física dans votre barrette de RAM. \n* Chaque case a un numéro unique : son **Adresse**. \n\nComprendre que vos variables sont des emplacements physiques réels est la clé pour devenir un maître du C.",
                objectives: ["Visualiser la RAM comme une grille d'adresses", "Se préparer au concept de pointeur"],
                exercises: [
                    {
                        title: "La Case",
                        description: "Vrai ou Faux : En C, chaque variable possède une adresse unique en mémoire ?",
                        difficulty: "Facile",
                        solution: "Vrai.",
                        hints: ["Comme chaque maison a une adresse postale."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 6 : Créer une variable en C : int x;",
                description: "Réservez votre place en mémoire avant de l'utiliser.",
                order: 6,
                duration: "2 heures",
                content: "Contrairement à d'autres langages, en C vous devez **Déclarer** vos variables en précisant leur type. \n\n* Exemple : `int age;` \n* `int` veut dire que c'est un nombre entier (Integer). \n* Cette ligne dit à l'ordinateur : 'Réserve-moi 4 octets de RAM et appelle cet emplacement age'. \n\nVous ne pouvez pas changer le type d'une variable après l'avoir créée. C'est la rigueur du C.",
                objectives: ["Déclarer une variable entière", "Comprendre la réservation mémoire"],
                exercises: [
                    {
                        title: "La Réservation",
                        description: "Comment déclare-t-on une variable entière nommée 'score' en C ?",
                        difficulty: "Facile",
                        solution: "`int score;`",
                        hints: ["Type d'abord, nom ensuite."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 7 : Nommer ses variables : Les règles du C",
                description: "Le compilateur est strict sur les noms. Apprenez ce qui est autorisé.",
                order: 7,
                duration: "1 heure",
                content: "En C, les noms de variables doivent : \n1. Commencer par une lettre ou un `_`. \n2. Ne pas contenir d'espaces ni d'accents. \n3. Être différents des mots réservés (comme `int` ou `main`). \n\n* Attention : Le C fait la différence entre les majuscules et les minuscules. `age` et `Age` sont deux variables totalement différentes !",
                objectives: ["Connaître les limites syntaxiques des identificateurs", "Comprendre la sensibilité à la casse (Case Sensitivity)"],
                exercises: [
                    {
                        title: "L'Erreur",
                        description: "Le nom `2emeNombre` est-il valide en C ?",
                        difficulty: "Facile",
                        solution: "Non, car il commence par un chiffre.",
                        hints: ["Relisez la règle n°1."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 8 : L'Affectation (=) : Le mouvement des données",
                description: "Remplissez vos cases mémoire avec des valeurs.",
                order: 8,
                duration: "2 heures",
                content: "Le signe `=` sert à mettre une valeur dans une variable. \n\n* `age = 25;` \n* Cela prend le nombre 25 et le stocke physiquement à l'adresse de la variable `age`. \n* On peut aussi faire les deux en même temps : `int score = 100;`. \n\nSouvenez-vous de l'Algorithmique : c'est un mouvement de la droite vers la gauche.",
                objectives: ["Initialiser des variables", "Maîtriser le sens de l'affectation"],
                exercises: [
                    {
                        title: "Le Remplissage",
                        description: "Écrivez la ligne complète pour créer une variable 'vitesse' et lui donner la valeur 50.",
                        difficulty: "Facile",
                        solution: "`int vitesse = 50;`",
                        hints: ["N'oubliez pas le point-virgule !"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 9 : Lecture vs Écriture : Utiliser vs Changer",
                description: "Manipulez vos données sans les perdre.",
                order: 9,
                duration: "2 heures",
                content: "Une fois qu'une variable a une valeur, vous pouvez l'utiliser dans `printf` ou dans des calculs. \n\n* Pour afficher une variable `int`, on utilise un code spécial : `%d`. \n* `printf(\"J'ai %d ans\", age);` \n* L'ordinateur va lire l'adresse de `age`, récupérer la valeur, et la mettre à la place du `%d`. \n\nSi vous essayez de lire une variable vide, vous obtiendrez n'importe quoi (la 'poubelle' de la mémoire) !",
                objectives: ["Utiliser le format %d", "Distinguer le nom de la variable de sa valeur affichée"],
                exercises: [
                    {
                        title: "La Substitution",
                        description: "Quel symbole utilise-t-on dans printf pour dire 'Mets un entier ici' ?",
                        difficulty: "Facile",
                        solution: "`%d`",
                        hints: ["C'est une lettre après un pourcent."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 10 : Introduction aux types système : Pourquoi trier ?",
                description: "Tous les types n'ont pas la même taille en mémoire.",
                order: 10,
                duration: "2 heures",
                content: "Pourquoi ne pas utiliser `int` pour tout ? \n\n* Parce qu'un `int` prend 4 octets. Si vous n'avez besoin de stocker qu'une seule lettre, c'est du gâchis ! \n* En C, on choisit le type le plus petit possible pour économiser la RAM de l'ordinateur. \n* Nous allons voir dans les prochains chapitres les types `char`, `float` et `double`.",
                objectives: ["Comprendre l'importance de l'économie de mémoire en C", "Se préparer à l'étude des types primitifs"],
                exercises: [
                    {
                        title: "L'Économie",
                        description: "Pourquoi le C nous force-t-il à choisir des types précis ?",
                        difficulty: "Facile",
                        solution: "Pour optimiser l'utilisation de la mémoire RAM et la vitesse du programme.",
                        hints: ["C'est un langage de performance."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 11 : Le type 'int' : Pourquoi 4 octets ?",
                description: "Le monde binaire et les limites des nombres entiers.",
                order: 11,
                duration: "3 heures",
                content: "Un `int` occupe généralement 4 octets (32 bits). \n\n* Pourquoi ? Parce que cela permet de stocker des nombres allant de -2 milliards à +2 milliards. \n* Si vous dépassez cette limite, le nombre 'reboucle' (Overflow). \n* C'est comme un compteur kilométrique de voiture : arrivé à 999 999, il revient à 0. \n\nEn C, on apprend à respecter ces limites physiques pour éviter que notre programme ne raconte n'importe quoi.",
                objectives: ["Comprendre l'encombrement d'un entier", "Réaliser l'existence du dépassement de capacité (Overflow)"],
                exercises: [
                    {
                        title: "La Limite",
                        description: "Combien d'octets prend un 'int' en général ?",
                        difficulty: "Facile",
                        solution: "4 octets.",
                        hints: ["C'est le standard sur la plupart des PC actuels."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 12 : Le type 'float' : Les nombres à virgule",
                description: "Gérez les prix, les moyennes et les mesures scientifiques.",
                order: 12,
                duration: "2 heures",
                content: "Pour stocker des nombres avec une virgule, on utilise `float`. \n\n* Déclaration : `float prix = 19.99;` \n* Affichage : On utilise `%f`. \n* Attention : Un `float` a une précision limitée. Si vous avez besoin de 50 chiffres après la virgule, il faut utiliser un `double` (Double précision). \n\nN'oubliez pas d'utiliser le point `.` et non la virgule `,` pour les chiffres !",
                objectives: ["Déclarer et afficher un flottant", "Distinguer float et double"],
                exercises: [
                    {
                        title: "La Virgule",
                        description: "Quel est le symbole de formatage pour afficher un float dans printf ?",
                        difficulty: "Facile",
                        solution: "`%f`",
                        hints: ["f comme float."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 13 : Le type 'char' : Le lien entre chiffre et lettre",
                description: "Découvrez que pour l'ordinateur, 'A' est juste un nombre.",
                order: 13,
                duration: "4 heures",
                content: "Le type `char` stocke un seul caractère. \n\n* Déclaration : `char lettre = 'A';` (Utilisez des guillemets simples !). \n* Secret : Un `char` ne prend qu'un octet. En réalité, il stocke le code **ASCII** de la lettre. \n* 'A' est stocké comme le nombre 65. \n\nCela permet de faire des calculs sur les lettres (ex: 'A' + 1 = 'B'). C'est fascinant car cela montre comment tout est numérique pour la machine.",
                objectives: ["Comprendre le type char", "Faire le lien avec la table ASCII"],
                exercises: [
                    {
                        title: "Le Code Secret",
                        description: "Si j'affiche un `char` avec `%d` au lieu de `%c`, qu'est-ce qui va s'afficher ?",
                        difficulty: "Moyen",
                        solution: "Son numéro dans la table ASCII.",
                        hints: ["%d affiche le nombre, %c affiche le caractère."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 14 : scanf() : Écouter l'utilisateur",
                description: "Le premier dialogue entre votre programme et l'humain.",
                order: 14,
                duration: "5 heures",
                content: "Pour demander une valeur à l'utilisateur, on utilise `scanf`. \n\n* Syntaxe : `scanf(\"%d\", &age);` \n* **TRÈS IMPORTANT** : Il faut mettre un `&` devant le nom de la variable. \n* Pourquoi ? Le `&` veut dire 'Adresse'. Vous dites à `scanf` : 'Va mettre le chiffre écrit au clavier à CETTE adresse'. \n\nSi vous oubliez le `&`, votre programme va probablement planter ('Crash'). Soyez vigilant !",
                objectives: ["Savoir utiliser scanf avec l'opérateur d'adresse &", "Comprendre le flux d'entrée standard (stdin)"],
                exercises: [
                    {
                        title: "L'Oubli Fatal",
                        description: "Que manque-t-il dans ce code : `scanf(\"%d\", score);` ?",
                        difficulty: "Facile",
                        solution: "Il manque le symbole `&` avant 'score'.",
                        hints: ["On doit donner l'adresse, pas la variable elle-même."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 15 : Les Opérateurs Mathématiques : Calculer comme une machine",
                description: "Faites faire les devoirs de maths à votre ordinateur.",
                order: 15,
                duration: "3 heures",
                content: "Le C utilise les signes classiques : `+`, `-`, `*`, `/`. \n\n* Attention particulière à la division `/` : \n  * Si vous divisez deux entiers (`5 / 2`), le résultat sera `2` (la partie entière). \n  * Pour avoir `2.5`, il faut que l'une des variables soit un `float`. \n\nL'ordinateur est une calculatrice ultra-rapide, mais il suit les règles de priorité que nous avons vues en Algorithmique.",
                objectives: ["Récupérer les résultats de calculs", "Comprendre la particularité de la division entière"],
                exercises: [
                    {
                        title: "Le Calculateur",
                        description: "Quel sera le résultat de `10 / 3` si le résultat est stocké dans un `int` ?",
                        difficulty: "Facile",
                        solution: "3",
                        hints: ["L'entier ignore tout ce qu'il y a après la virgule."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 16 : Priorités et Modulo : Les astuces de calcul",
                description: "Apprenez à prédire le résultat de calculs complexes.",
                order: 16,
                duration: "2 heures",
                content: "Comme en maths, la multiplication et la division passent avant l'addition. \n\n* Un opérateur très utile en C est le **Modulo** (`%`). \n* `10 % 3` donne `1` (c'est le reste de la division). \n* On l'utilise tout le temps pour savoir si un nombre est pair (`n % 2 == 0`) ou pour créer des cycles (ex: les jours de la semaine).",
                objectives: ["Maîtriser l'ordre des opérations", "Utiliser l'opérateur modulo %"],
                exercises: [
                    {
                        title: "Le Reste",
                        description: "Quel est le résultat de `7 % 2` ?",
                        difficulty: "Facile",
                        solution: "1",
                        hints: ["7 divisé par 2 donne 3, et il reste 1."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 17 : Logique Booléenne en C : 0 et 1",
                description: "Le vrai secret du C : Pourquoi il n'y a pas de type 'Vrai/Faux'.",
                order: 17,
                duration: "4 heures",
                content: "Historiquement, le C n'a pas de type `boolean`. \n\n* **Règle d'or** : \n  * `0` veut dire FAUX. \n  * `Tout le reste` (généralement 1) veut dire VRAI. \n\nC'est pour cela qu'on peut écrire `if (1) { ... }` et que ça marchera toujours. C'est simple, brutal et très efficace pour le processeur.",
                objectives: ["Comprendre la représentation numérique de la vérité", "Utiliser les entiers comme booléens"],
                exercises: [
                    {
                        title: "La Vérité Brute",
                        description: "En C, si une condition renvoie `0`, est-elle considérée comme Vraie ou Fausse ?",
                        difficulty: "Facile",
                        solution: "Fausse.",
                        hints: ["Zéro est la seule valeur fausse."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 18 : Les Conditions : if et else",
                description: "Donnez un cerveau à votre programme pour qu'il prenne des décisions.",
                order: 18,
                duration: "3 heures",
                content: "Le bloc `if` permet de n'exécuter du code QUE si une condition est remplie. \n\n* Syntaxe : `if (age >= 18) { printf(\"Majeur\"); }` \n* Le bloc `else` (sinon) permet de donner une alternative si la condition est fausse. \n\nAttention aux parenthèses `()` autour de la condition et aux accolades `{}` pour délimiter le bloc de code !",
                objectives: ["Écrire une structure de décision simple", "Respecter la syntaxe des blocs {}"],
                exercises: [
                    {
                        title: "Le Choix",
                        description: "Comment écrit-on 'Si x est égal à 10' en C ? (Attention au signe !)",
                        difficulty: "Moyen",
                        solution: "`if (x == 10)`",
                        hints: ["Un seul `=` c'est pour donner une valeur, deux `==` c'est pour comparer !"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 19 : if / else if / else : Les choix multiples",
                description: "Gérez des situations complexes avec plusieurs sorties possibles.",
                order: 19,
                duration: "3 heures",
                content: "Parfois, 'Oui' ou 'Non' ne suffit pas. On utilise `else if` pour tester d'autres conditions. \n\n* Exemple : \n  `if (note > 15) { ... }` \n  `else if (note > 10) { ... }` \n  `else { ... }` \n\nL'ordinateur teste les conditions une par une et s'arrête dès qu'il en trouve une vraie. C'est l'ordre qui compte !",
                objectives: ["Structurer des décisions en cascade", "Optimiser le flux logique"],
                exercises: [
                    {
                        title: "L'Exclusion",
                        description: "Vrai ou Faux : Si le premier `if` est vrai, l'ordinateur va quand même tester le `else if` ?",
                        difficulty: "Moyen",
                        solution: "Faux. Il s'arrête à la première condition remplie.",
                        hints: ["C'est une structure exclusive."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 20 : Switch : L'aiguilleur de précision",
                description: "Une alternative élégante quand vous avez beaucoup de choix sur une seule variable.",
                order: 20,
                duration: "3 heures",
                content: "Le `switch` est parfait quand vous comparez une variable à plusieurs valeurs précises. \n\n* Syntaxe : `switch(choix) { case 1: ... break; default: ... }` \n* **ATTENTION** : N'oubliez pas le `break;` à la fin de chaque case, sinon l'ordinateur continue de lire les suivants (c'est le bug du 'fall-through') !",
                objectives: ["Utiliser le switch pour la clarté du code", "Ne pas oublier les instructions break"],
                exercises: [
                    {
                        title: "Le Menu",
                        description: "Quelle instruction permet de sortir immédiatement d'un bloc Switch ?",
                        difficulty: "Facile",
                        solution: "L'instruction `break;`.",
                        hints: ["Cela veut dire 'Casse' ou 'Arrête-toi là'."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 21 : Imbrication de conditions : Les décisions complexes",
                description: "Apprenez à vérifier plusieurs couches de conditions.",
                order: 21,
                duration: "3 heures",
                content: "Parfois, une décision dépend d'une autre. \n\n* Exemple : 'SI tu as faim ET SI le frigo est plein, ALORS cuisine'. \n* En C, on met un `if` à l'intérieur d'un autre `if`. \n* `if (faim) { if (frigoPlein) { ... } }` \n\nC'est très puissant mais attention : si vous avez trop de couches, votre code devient illisible (le fameux 'code spaghetti'). Nous verrons d'autres méthodes plus tard !",
                objectives: ["Maîtriser les blocs de conditions imbriqués", "Anticiper les problèmes de lisibilité"],
                exercises: [
                    {
                        title: "Le Labyrinthe",
                        description: "Dans un `if` imbriqué, quand est-ce que le code le plus profond est exécuté ?",
                        difficulty: "Moyen",
                        solution: "Seulement si TOUTES les conditions parentes sont vraies.",
                        hints: ["C'est comme passer plusieurs portes verrouillées."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 22 : Logique de choix avancé : Préparer l'itération",
                description: "Préparez votre esprit à la répétition.",
                order: 22,
                duration: "2 heures",
                content: "Nous avons appris à faire des choix. Mais que se passe-t-il si vous devez faire 100 choix à la suite ? \n\n* En C, on commence à voir l'intérêt de ne pas copier-coller son code. \n* Imaginez devoir vérifier l'âge de 500 invités un par un. \n* C'est ici que s'arrête la programmation linéaire et que commence la véritable puissance informatique : la répétition automatisée.",
                objectives: ["Identifier les limites du copier-coller", "Comprendre la nécessité des boucles"],
                exercises: [
                    {
                        title: "La Limite Humaine",
                        description: "Si je veux afficher 'Bonjour' 1000 fois, est-il raisonnable d'écrire 1000 fois `printf` ?",
                        difficulty: "Facile",
                        solution: "Non, c'est une perte de temps et source d'erreurs.",
                        hints: ["Il doit y avoir un outil pour ça."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 23 : Introduction à l'itération : Faire répéter la machine",
                description: "Le concept qui donne vie à vos programmes.",
                order: 23,
                duration: "2 heures",
                content: "L'**Itération** (ou Boucle) est la capacité de l'ordinateur à répéter un bloc de code tant qu'une condition est vraie. \n\n* Analogie : 'Tant qu'il y a de l'eau dans la baignoire, continue de vider'. \n* C'est ce qui permet de créer des jeux (une boucle qui affiche les images 60 fois par seconde) ou des serveurs (une boucle qui attend les clients).",
                objectives: ["Comprendre le concept d'itération", "Visualiser le cycle une boucle"],
                exercises: [
                    {
                        title: "Le Cycle",
                        description: "Comment appelle-t-on le fait de recommencer un bloc de code plusieurs fois ?",
                        difficulty: "Facile",
                        solution: "L'itération (ou faire une boucle).",
                        hints: ["Pensez à une roue qui tourne."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 24 : La boucle while en C : Tant que c'est vrai",
                description: "Votre première boucle concrète en C.",
                order: 24,
                duration: "4 heures",
                content: "La boucle `while` est la plus simple. \n\n* Syntaxe : `while (condition) { ... }` \n* Tant que la parenthèse est vraie (différente de 0), l'ordinateur fait le code entre les accolades. \n* **ATTENTION AU PIÈGE** : Si la condition est toujours vraie, votre programme ne s'arrêtera JAMAIS (Boucle Infinie). Votre ventilateur va souffler fort !",
                objectives: ["Écrire une boucle while fonctionnelle", "Éviter les boucles infinies en modifiant la condition"],
                exercises: [
                    {
                        title: "Le Compteur",
                        description: "Si je fais `while(1) { printf(\"A\"); }`, que se passe-t-il ?",
                        difficulty: "Moyen",
                        solution: "Le programme affichera 'A' indéfiniment jusqu'à ce que vous le fermiez de force.",
                        hints: ["Souvenez-vous que 1 veut dire VRAI en C."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 25 : Félicitations ! Cap sur le niveau Intermédiaire",
                description: "Bilan de vos fondations et ouverture vers la suite.",
                order: 25,
                duration: "2 heures",
                content: "Bravo ! Vous avez survécu au niveau Débutant. \n\n* Vous savez : Compiler, parler à l'écran, stocker des nombres, lire le clavier, et prendre des décisions. \n* Vous avez les bases de la syntaxe C, la plus rigoureuse qui soit. \n\nDans le niveau Intermédiaire, nous allons découvrir les **Tableaux**, les **Fonctions**, et surtout le Saint Graal du C : les **Pointeurs** (la gestion directe de la mémoire). Reposez-vous, la suite est intense !",
                objectives: ["Récapituler les acquis du niveau débutant", "Se motiver pour les défis du niveau intermédiaire"],
                exercises: [
                    {
                        title: "Le Bilan",
                        description: "Quelle est la chose la plus importante que vous avez apprise sur la mémoire en C ?",
                        difficulty: "Facile",
                        solution: "Que chaque variable a une adresse physique réelle en RAM.",
                        hints: ["C'est la base de tout le C."]
                    }
                ],
                resources: []
            },
        ]
    },
    {
        id: "c-niveau-interm-diaire-l",
        title: "C - Niveau Intermédiaire : L'Enfer des Pointeurs",
        description: "L'essence même du C. Manipulez la mémoire vive de l'ordinateur à la volée. Apprenez l'allocation dynamique et le cauchemar des fuites de mémoire (Memory Leaks).",
        longDesc: "Vous avez survécu aux bases. Maintenant, il est temps de voir comment le C manipule réellement les adresses physiques de votre ordinateur. \n\n* Programme de Maîtrise :\n1. Pointeurs & Adresses : Manipulez les cases mémoires directement.\n2. Allocation Dynamique : Maloc et Free, devenez le maître souverain de la RAM.\n3. Structures de Données : Créez vos propres types complexes comme des Pros.\n4. Arithmétique Bas Niveau : Comprenez pourquoi un tableau n'est qu'un pointeur déguisé.",
        motivationVideo: "5W709SNAaoU", // Computerphile: Pointers
        category: "Programmation",
        level: "Intermédiaire",
        duration: "50 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        rating: 4.9,
        students: 6100,
        language: "c",
        isFree: true,
        tags: ["c", "pointers", "malloc", "mémoire", "intermédiaire"],
        chapters: [
            {
                title: "Chapitre 26 : Les Tableaux en C : L'étagère contiguë",
                description: "Apprenez à regrouper vos données dans un seul bloc mémoire.",
                order: 26,
                duration: "4 heures",
                content: "Un tableau en C est une suite de cases mémoire du même type, collées les unes aux autres. \n\n* Déclaration : `int scores[5];` \n* Cela réserve exactement 5 * 4 octets = 20 octets de RAM d'un coup. \n* C'est beaucoup plus efficace que de créer 5 variables séparées car l'ordinateur peut y accéder très rapidement grâce à leur position les unes après les autres.",
                objectives: ["Déclarer un tableau statique", "Comprendre l'organisation contiguë en mémoire"],
                exercises: [
                    {
                        title: "La Réservation Groupée",
                        description: "Comment déclare-t-on un tableau de 10 nombres flottants (float) nommé 'mesures' ?",
                        difficulty: "Facile",
                        solution: "`float mesures[10];`",
                        hints: ["Type, nom, puis taille entre crochets."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 27 : Indexation et Taille : Pourquoi le C est impitoyable",
                description: "Apprenez à ne jamais dépasser les limites (Buffer Overflow).",
                order: 27,
                duration: "3 heures",
                content: "Comme en Algorithmique, la première case est `tab[0]`. \n\n* Si votre tableau fait 5 cases, la dernière est `tab[4]`. \n* **DANGER** : Le C ne vérifie pas si vous dépassez ! Si vous écrivez dans `tab[10]`, vous allez écraser d'autres données au hasard dans votre RAM. \n* C'est la cause n°1 des virus et des crashs informatiques. Soyez le gardien de vos index !",
                objectives: ["Maîtriser l'accès par index 0 à N-1", "Comprendre le risque du dépassement de tableau"],
                exercises: [
                    {
                        title: "La Limite Invisible",
                        description: "Si j'ai `int tab[3]`, qu'arrive-t-il si j'écris `tab[3] = 10;` ?",
                        difficulty: "Moyen",
                        solution: "C'est une erreur grave. La case `tab[3]` n'existe pas (il n'y a que 0, 1 et 2). Vous écrivez dans une zone mémoire interdite.",
                        hints: ["Comptez sur vos doigts : 0, 1, 2... combien ça fait de cases ?"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 28 : Parcours de Tableau : La puissance du 'for'",
                description: "Utilisez la boucle For pour traiter des milliers de données en 3 lignes.",
                order: 28,
                duration: "4 heures",
                content: "Le couple 'Boucle + Tableau' est le moteur de l'informatique. \n\n* Syntaxe typique : \n  `for (int i = 0; i < 5; i++) { printf(\"%d\", tab[i]); }` \n* Ici, `i` sert d'index. À chaque tour, il augmente, et on accède à la case suivante. \n* C'est ainsi qu'on calcule des moyennes, qu'on cherche un nom ou qu'on affiche une liste.",
                objectives: ["Combiner boucle for et tableau", "Itérer proprement par index"],
                exercises: [
                    {
                        title: "La Visite",
                        description: "Dans la boucle `for`, quelle variable change de valeur à chaque tour pour désigner une nouvelle case ?",
                        difficulty: "Facile",
                        solution: "La variable `i` (l'itérateur).",
                        hints: ["C'est celle qui est entre les crochets `tab[...]`."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 29 : Modification par Index : Écrire dans la RAM",
                description: "Mettez à jour vos listes de données dynamiquement.",
                order: 29,
                duration: "3 heures",
                content: "On modifie une case de tableau comme une variable normale. \n\n* `scores[2] = 150;` \n* Cela ne touche qu'à la 3ème case. Les autres restent inchangées. \n* C'est utile pour mettre à jour un inventaire de jeu ou corriger une saisie utilisateur erronée.",
                objectives: ["Affecter des valeurs à des cases spécifiques", "Comprendre la persistance des données dans le tableau"],
                exercises: [
                    {
                        title: "La Mise à Jour",
                        description: "Si `tab[0]` valait 10, et que je fais `tab[0] = tab[0] + 5;`. Que vaut `tab[0]` maintenant ?",
                        difficulty: "Facile",
                        solution: "15",
                        hints: ["C'est une addition classique sur un emplacement mémoire."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 30 : Les Tableaux à 2 Dimensions : Grilles et Pixels",
                description: "Créez des structures complexes comme des cartes ou des images.",
                order: 30,
                duration: "5 heures",
                content: "En C, on peut créer un tableau de tableaux. \n\n* Déclaration : `int grille[3][3];` \n* Cela crée une grille de 9 cases (3 lignes x 3 colonnes). \n* On y accède avec deux crochets : `grille[ligne][colonne]`. \n* C'est ainsi que l'ordinateur représente votre écran (une grille de pixels) ou une carte de jeu.",
                objectives: ["Déclarer une matrice", "Manipuler le double indexage [i][j]"],
                exercises: [
                    {
                        title: "Le Tic-Tac-Toe",
                        description: "Quelle case de `grille[3][3]` représente le centre exact de la grille ?",
                        difficulty: "Moyen",
                        solution: "`grille[1][1]`",
                        hints: ["N'oubliez pas que l'on commence à 0. Donc 0, 1, 2."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 31 : Introduction aux Fonctions en C : Modulariser le moteur",
                description: "Apprenez à découper votre programme en petits outils réutilisables.",
                order: 31,
                duration: "4 heures",
                content: "Une fonction en C a une structure stricte : `type_retour nom(parametres) { ... }`. \n\n* Si elle ne renvoie rien, on utilise le type `void`. \n* Si elle renvoie un entier, on utilise `int` et on finit par `return`. \n* Cela permet de cacher la complexité : au lieu d'écrire 50 lignes de calcul, vous appelez juste `calculerScore()`. \n\nC'est la base d'un code propre et professionnel.",
                objectives: ["Déclarer une fonction avec type de retour", "Comprendre l'utilité du type void"],
                exercises: [
                    {
                        title: "Le Type de Retour",
                        description: "Si ma fonction doit renvoyer un nombre avec une virgule, quel type de retour dois-je marquer au début ?",
                        difficulty: "Facile",
                        solution: "`float` (ou `double`)",
                        hints: ["C'est le type de la valeur que vous allez 'return'."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 32 : Déclaration vs Définition : Les prototypes",
                description: "Apprenez à prévenir le compilateur avant d'utiliser une fonction.",
                order: 32,
                duration: "3 heures",
                content: "En C, le compilateur lit de haut en bas. Si vous utilisez une fonction avant de l'avoir écrite, il va râler. \n\n* On utilise un **Prototype** : c'est juste la première ligne de la fonction, placée tout en haut du fichier (finissant par un `;`). \n* Cela dit au compilateur : 'Ne t'inquiète pas, j'ai prévu une fonction qui s'appelle comme ça, je te donne les détails plus bas'. \n\nC'est indispensable quand on commence à avoir des fichiers de 1000 lignes !",
                objectives: ["Savoir écrire un prototype", "Comprendre l'importance de l'ordre de lecture du compilateur"],
                exercises: [
                    {
                        title: "La Signature",
                        description: "Quelle est la différence entre une définition de fonction et un prototype ?",
                        difficulty: "Moyen",
                        solution: "Le prototype est une simple promesse (finit par `;`), la définition contient le code réel (entre `{}`).",
                        hints: ["L'un annonce, l'autre exécute."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 33 : Paramètres et Arguments : Transmettre des outils",
                description: "Donnez des données à vos fonctions pour qu'elles travaillent mieux.",
                order: 33,
                duration: "3 heures",
                content: "Les paramètres sont les variables que la fonction attend. \n\n* Exemple : `void saluer(int fois) { ... }` \n* Quand vous l'appelez : `saluer(3);`, le chiffre 3 est l'**Argument**. \n* On peut passer des tableaux en paramètres, mais attention : en C, un tableau passé en paramètre perd sa taille. Il faut souvent passer la taille en plus !",
                objectives: ["Passer plusieurs paramètres", "Savoir transmettre un tableau à une fonction"],
                exercises: [
                    {
                        title: "Le Passage d'Infos",
                        description: "Dans `void addition(int a, int b)`, que sont `a` et `b` ?",
                        difficulty: "Facile",
                        solution: "Des paramètres.",
                        hints: ["Ce sont des variables locales créées pour la fonction."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 34 : Passage par Valeur : Le comportement par défaut",
                description: "Comprenez pourquoi une fonction ne peut pas (facilement) modifier vos variables d'origine.",
                order: 34,
                duration: "4 heures",
                content: "C'est un concept crucial en C : par défaut, le C **COPIE** la valeur. \n\n* Si vous envoyez `age` à une fonction, elle reçoit une copie de `age`. \n* Si elle change la valeur de la copie, votre `age` d'origine dans le `main` ne bouge pas ! \n* C'est une sécurité, mais cela peut être frustrant. Pour modifier la 'vraie' variable, il faudra utiliser les **Pointers** (nous verrons cela bientôt).",
                objectives: ["Expérimenter la copie de valeur en mémoire", "Comprendre l'isolation des fonctions"],
                exercises: [
                    {
                        title: "L'Illusion",
                        description: "Si je fais `modifier(x)` et que la fonction met `x = 10`. Si au départ `x` valait 5, que vaut `x` après l'appel ?",
                        difficulty: "Moyen",
                        solution: "Il vaut toujours 5. La fonction n'a touché qu'à sa propre copie.",
                        hints: ["N'oubliez pas : C = Copie par défaut."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 35 : Portée des Variables (Scope) et la Pile (Stack)",
                description: "Découvrez où vivent et où meurent vos variables.",
                order: 35,
                duration: "4 heures",
                content: "Les variables créées dans une fonction vivent sur la **Pile** (Stack). \n\n* Dès que la fonction se termine, la Pile est jetée et les variables sont détruites. \n* C'est pour cela que vous ne pouvez pas utiliser une variable du `main` dans une autre fonction. \n* C'est une gestion automatique de la mémoire très rapide, mais éphémère.",
                objectives: ["Visualiser la Stack mémoire", "Maîtriser le cycle de vie des variables locales"],
                exercises: [
                    {
                        title: "Le Cycle de Vie",
                        description: "Comment appelle-t-on la zone mémoire automatique où sont stockées les variables locales ?",
                        difficulty: "Facile",
                        solution: "La Pile (ou Stack).",
                        hints: ["C'est comme une pile d'assiettes : on ajoute et on retire par le haut."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 36 : Les Pointeurs : Le GPS de la Mémoire",
                description: "Apprenez à manipuler les adresses plutôt que les valeurs.",
                order: 36,
                duration: "5 heures",
                content: "Un pointeur est une variable qui stocke le numéro d'une case mémoire (une **Adresse**). \n\n* On utilise l'opérateur `&` pour obtenir l'adresse d'une variable. \n* Exemple : `int *ptr = &age;` \n* Analogie : `age` est la maison, et `ptr` est un papier sur lequel est écrit l'adresse de la maison. \n\nC'est l'outil le plus puissant du C car il permet de 'voir' où les données sont rangées physiquement.",
                objectives: ["Déclarer un pointeur", "Utiliser l'opérateur d'adresse &"],
                exercises: [
                    {
                        title: "L'Adresse",
                        description: "Si j'ai `int score = 100;`, quel code me donne l'adresse de 'score' ?",
                        difficulty: "Facile",
                        solution: "`&score`",
                        hints: ["C'est le symbole 'et commercial'."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 37 : L'Indirection : Accéder à distance",
                description: "Utilisez votre pointeur pour modifier une valeur à l'autre bout du programme.",
                order: 37,
                duration: "4 heures",
                content: "Une fois que vous avez l'adresse dans `ptr`, vous pouvez utiliser l'étoile `*` pour aller voir dedans. \n\n* `*ptr = 20;` veut dire : 'Va à l'adresse stockée dans ptr et mets-y le chiffre 20'. \n* On appelle cela le **Déréférencement**. \n* C'est comme si vous utilisiez une télécommande : vous n'êtes pas devant la télé, mais vous changez la chaîne à distance.",
                objectives: ["Déréférencer un pointeur avec *", "Modifier une variable via son pointeur"],
                exercises: [
                    {
                        title: "La Télécommande",
                        description: "Si `ptr` pointe sur `age`, que fait l'instruction `*ptr = 0;` ?",
                        difficulty: "Moyen",
                        solution: "Elle met la variable `age` à 0.",
                        hints: ["L'étoile permet de rentrer dans la case."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 38 : Passage par Référence : Modifier les variables distantes",
                description: "Résolvez enfin le problème de la 'copie' des fonctions.",
                order: 38,
                duration: "5 heures",
                content: "Pour qu'une fonction modifie une variable du `main`, on ne lui envoie pas la valeur, on lui envoie son **Adresse**. \n\n* Exemple : `void modifier(int *p) { *p = 10; }` \n* Appel : `modifier(&x);` \n* La fonction reçoit l'adresse, elle utilise `*` pour entrer dans la case de `x` et change la valeur. \n\nC'est ainsi qu'on gagne en performance (pas de copie inutile) et en flexibilité.",
                objectives: ["Implémenter un passage par référence", "Comprendre l'intérêt pour la performance"],
                exercises: [
                    {
                        title: "Le Vrai Changement",
                        description: "Vrai ou Faux : Le passage par référence permet de modifier une variable locale d'une autre fonction ?",
                        difficulty: "Facile",
                        solution: "Vrai.",
                        hints: ["C'est tout l'intérêt des pointeurs dans les fonctions."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 39 : Pointeurs et Tableaux : La vérité cachée",
                description: "Découvrez que les tableaux et les pointeurs sont presque la même chose.",
                order: 39,
                duration: "4 heures",
                content: "En C, le nom d'un tableau est secrètement le **Pointeur** de sa première case. \n\n* `tab` est strictement égal à `&tab[0]`. \n* C'est pour cela qu'on ne met pas de `&` quand on envoie un tableau à une fonction : il est DÉJÀ une adresse ! \n\nComprendre ce lien est le moment où tout s'éclaire pour un étudiant en C.",
                objectives: ["Comprendre l'équivalence Nom du tableau = Adresse de base", "Expliquer pourquoi les tableaux ne sont pas copiés"],
                exercises: [
                    {
                        title: "Le Secret",
                        description: "Si `int tab[5];`, à quoi correspond le nom `tab` tout court ?",
                        difficulty: "Moyen",
                        solution: "À l'adresse de la première case (`&tab[0]`).",
                        hints: ["C'est le point de départ en mémoire."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 40 : Arithmétique des Pointeurs : Voyager dans la RAM",
                description: "Déplacez-vous dans votre mémoire avec des additions et soustractions.",
                order: 40,
                duration: "4 heures",
                content: "Si `ptr` est sur la case 0 d'un tableau, faire `ptr + 1` vous emmène à la case 1. \n\n* Le C est intelligent : si c'est un tableau de `int` (4 octets), faire `+1` fait bondir l'adresse de 4 octets. \n* C'est une manière ultra-rapide de parcourir des données sans utiliser d'index `[i]`. \n\nLes experts en C utilisent souvent cette méthode pour créer des programmes extrêmement véloces.",
                objectives: ["Manipuler les adresses par addition", "Comprendre que le bond dépend du type de donnée"],
                exercises: [
                    {
                        title: "Le Bond",
                        description: "Si `ptr` pointe sur un `int` à l'adresse 1000, quelle sera l'adresse de `ptr + 1` ?",
                        difficulty: "Difficile",
                        solution: "1004 (car un int fait 4 octets).",
                        hints: ["Le bond est égal à la taille du type en mémoire."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 41 : Allocation Dynamique : malloc et free",
                description: "Apprenez à demander de la mémoire pendant que le programme tourne.",
                order: 41,
                duration: "6 heures",
                content: "Jusqu'à présent, nous réservions la mémoire à l'avance. Avec `malloc`, vous pouvez en demander quand vous voulez sur le **Tas** (Heap). \n\n* `int *tab = malloc(5 * sizeof(int));` \n* Cela demande 5 cases d'entiers dynamiquement. \n* **REGLE D'OR** : Tout ce qui est loué avec `malloc` doit être rendu avec `free`. Sinon, vous créez une Fuite Mémoire (Memory Leak) qui finit par faire planter l'ordinateur !",
                objectives: ["Utiliser malloc pour l'allocation dynamique", "Libérer la mémoire avec free"],
                exercises: [
                    {
                        title: "Le Nettoyage",
                        description: "Quelle fonction doit-on appeler impérativement après avoir fini d'utiliser un bloc `malloc` ?",
                        difficulty: "Facile",
                        solution: "La fonction `free()`.",
                        hints: ["C'est comme rendre les clés d'un appartement loué."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 42 : Structures en C : Organiser vos données",
                description: "Créez vos propres types de données personnalisés.",
                order: 42,
                duration: "5 heures",
                content: "Une `struct` permet de regrouper plusieurs variables de types différents. \n\n* Exemple : `struct Personne { char nom[50]; int age; };` \n* C'est très pratique pour représenter des objets du monde réel comme un joueur, une voiture ou une transaction bancaire.",
                objectives: ["Définir une structure", "Accéder aux membres avec le point (.)"],
                exercises: [
                    {
                        title: "Le Regroupage",
                        description: "Quel mot-clé utilise-t-on pour créer un groupe de variables en C ?",
                        difficulty: "Facile",
                        solution: "`struct`",
                        hints: ["Abréviation de Structure."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 43 : Pointeurs de Structures : L'opérateur flèche",
                description: "Manipulez des structures complexes via des adresses.",
                order: 43,
                duration: "4 heures",
                content: "Quand vous avez un pointeur sur une structure, le C a inventé un raccourci élégant : la flèche `->`. \n\n* Au lieu de faire `(*ptr).age`, on écrit `ptr->age`. \n* C'est beaucoup plus facile à lire et c'est ce que tous les pros utilisent.",
                objectives: ["Maîtriser l'opérateur flèche ->", "Distinguer accès direct et accès par pointeur"],
                exercises: [
                    {
                        title: "Le Raccourci",
                        description: "Comment accède-t-on au champ 'score' d'un pointeur de structure `joueur` ?",
                        difficulty: "Moyen",
                        solution: "`joueur->score`",
                        hints: ["Utilisez le signe moins suivi du signe supérieur."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 44 : Gestion d'Erreurs et Segfaults : Survivre en territoire hostile",
                description: "Apprenez à comprendre quand et pourquoi votre programme plante.",
                order: 44,
                duration: "4 heures",
                content: "Le 'Segmentation Fault' est le crash le plus célèbre en C. \n\n* Cela arrive quand vous essayez de lire une adresse mémoire interdite (ou un pointeur `NULL`). \n* Le C ne vous pardonne rien, mais il vous donne le contrôle total. Apprendre à débugger ses Segfaults, c'est devenir un véritable ingénieur système.",
                objectives: ["Identifier les causes des Segmentation Faults", "Apprendre à tester si un pointeur est NULL"],
                exercises: [
                    {
                        title: "Le Crash",
                        description: "Qu'arrive-t-il si vous essayez de déréférencer (`*`) un pointeur qui vaut `NULL` ?",
                        difficulty: "Difficile",
                        solution: "Le programme s'arrête immédiatement avec une erreur 'Segmentation Fault'.",
                        hints: ["NULL est l'adresse 0, une zone strictement interdite."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 45 : Vers le niveau Expert : Bilan Final",
                description: "Félicitations, vous maîtrisez maintenant les entrailles de l'ordinateur.",
                order: 45,
                duration: "3 heures",
                content: "Vous avez parcouru un chemin incroyable. \n\n* En Algorithmique, vous avez appris à Penser. \n* En C, vous avez appris à Exécuter au plus près du silicium. \n\nDans le niveau Expert, nous explorerons les API du système Linux (POSIX), les Threads (multitâches) et les Sockets (réseaux). Vous avez maintenant toutes les clés pour construire des systèmes industriels.",
                objectives: ["Bilan des compétences C acquises", "Ouverture vers la programmation système de bas niveau"],
                exercises: [
                    {
                        title: "La Réussite",
                        description: "Quelle est selon vous la force principale du langage C après avoir fini ce cours ?",
                        difficulty: "Facile",
                        solution: "La performance et le contrôle absolu sur la mémoire RAM.",
                        hints: ["Pensez à la vitesse et à la proximité avec le matériel."]
                    }
                ],
                resources: []
            },
        ]
    },
    {
        id: "c-niveau-expert-mondiale-programmation-posix-threads-et-noyau",
        title: "C - Niveau Expert Mondiale : Programmation POSIX, Threads et Noyau",
        description: "Codez un OS, écrivez pour le réseau, forgez votre propre Multithreading de bas niveau. Un niveau réservé aux Ingénieurs de Systèmes Distribués Embaqués (IoT, Aérospatial).",
        longDesc: "Le Nirvana de l'informatique. Ici, on ne parle plus de 'code', on parle de 'système'. Vous allez apprendre à faire dialoguer votre code avec le Noyau (Kernel) Linux directement. \n\n* Expertise Requise :\n1. Appels Systèmes (POSIX) : Oubliez la lib standard, parlez à l'OS en direct.\n2. Fork & Processus : Multipliez les instances de votre programme.\n3. Multithreading (Pthreads) : Faites tourner 1000 tâches en parallèle sans bug.\n4. Sockets Réseau : Codez votre propre serveur web à partir de rien.",
        motivationVideo: "8_9T-3_H2S8", // Linus Torvalds on C vs C++
        category: "Programmation",
        level: "Avancé",
        duration: "70 heures",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        rating: 5.0,
        students: 2200,
        language: "c",
        isFree: true,
        tags: ["c", "posix", "threading", "expert", "linux", "sockets"],
        chapters: [
            {
                title: "Chapitre 1 : Les APIs UNIX/POSIX - Manipuler le File System (Descripteurs)",
                description: "fopen est pour les faibles. Approfondissez l'interface OS directe via un File Descriptor pur (open/read/write).",
                order: 1,
                duration: "15 heures",
                content: "Les fonctions `fopen`/`fprintf` (de `<stdio.h>`) ont un buffer et sont des abstractions 'User Level'. Le vrai développeur noyau doit utiliser les appels systèmes (System Calls - Syscalls) directs sur l'OS : Interface POSIX. Nous manipulerons les fonctions originelles `open()`, `read()`, `write()`, et `close()`. Sur Linux, « Tout est un fichier » (Everything is a file). Même votre clavier (`0`), votre écran (`1`), ou vos messages d'erreur (`2`) sont juste des descripteurs de fichiers fondamentaux. Nous programmerons des outils unix from scratch (un micro format de cat ou cp robuste en binaire natif).",
                objectives: ["Ouvrir des fichiers en flag bitwise (O_RDONLY | O_CREAT)", "Remplir un buffer statique octet par octet par de l'I/O Syscall", "Tracer brutalement les erreurs internes via `errno`", "Comprendre /dev/null et les devices virtuels"],
                exercises: [
                    {
                        title: "Appel de Write avec le Descripteur 1",
                        description: "Écrivez le code strict POSIX pour afficher 'Hello' sur la console sans utiliser aucune fonction de librairie standard (aucun `#include <stdio.h>` autorisé). Utilisez `.unistd.h`.",
                        difficulty: "Difficile",
                        solution: "`#include <unistd.h>`\n`int main() {`\n  `write(1, \"Hello\\n\", 6);`\n  `return 0;`\n`}`\nLe descripteur 1 représente 'Standard Output'. Nous disons à l'OS Système de brancher le flux d'octets sur le moniteur directement.",
                        hints: ["Quelle est la définition brute d'un Syscall d'impression ?"]
                    }
                ],
                resources: [{ title: "Comprendre Everything Is A File (Linux)", type: "article", url: "https://en.wikipedia.org/wiki/Everything_is_a_file" }]
            },
            {
                title: "Chapitre 2 : La Bataille des Processus - Fork(), Pipe et Mémoire Partagée",
                description: "Le CPU au bout des doigts. Créez des clones et lancez des pipelines massifs.",
                order: 2,
                duration: "20 heures",
                content: "Votre programme principal peut engendrer un fils jumeau qui s'exécutera simultanément, à un temps M. L'appel système magistral `fork()` duplique tout le code, la pile, la mémoire heap d'un Process. Nous traiterons des Processus Zombies, de l'Appel Exec (`execve`) pour remplacer l'exécutable à la volée, et de la fonction `waitpid` pour imposer la loi du Processus Parent sur l'Enfant. Comment les deux processus (clones isolés hermétiquement) peuvent-ils communiquer ? Via le clonage des file descriptors avec le système originel de `pipe()` ou System V Shared Memory. Vous recréerez la ligne de commande Unix 'ls -l | grep txt'.",
                objectives: ["Diagnostiquer le retour PID double typique du système Unix", "Détruire les processes zombies", "Envoyer des Data Streams asynchrones via un tube anonyme (Pipe IPC)"],
                exercises: [
                    {
                        title: "L'Arbre du Fork",
                        description: "Combien de processus totaux existeront après l'exécution de cette boucle pure : `for(int i = 0; i < 3; i++) { fork(); }` ?",
                        difficulty: "Difficile",
                        solution: "Il y aura 8 processus au total (1 parent original + 7 descendants de diverses branches = 2^3 processus). Le 1er fork créer un clone. Au cycle 2, les DEUX processes exécutent indépendamment le fork et créent deux enfants. Puis 4 font de même et génèrent 4 nouveaux, soit 8. C'est une fractale exponentielle de l'exécution.",
                        hints: ["Pensez comme l'Hydre de Lerne. Chaque tête (process) coupe des branches qui coupent des branches récursivement."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Multithreading, Concurrence Critique et Mutexes (Pthreads)",
                description: "Abandonnez la mémoire isolée. Exécutez 10 fonctions en parallèle qui corrompent ensemble la mémoire si vous êtes imprudents.",
                order: 3,
                duration: "20 heures",
                content: "Les processus lourds coûtent de la RAM (Forking). Le système préféré dans l'Industrie de Haute Fréquence (Bourse) repose sur la norme 'POSIX Threads' ou le `<pthread.h>`. Les Threads tournent physiquement sur les cœurs séparés du CPU en même temps, ET se PARTAGENT la même mémoire Heap. L'horreur mathématique absolue du Data Race Condition intervient. Si deux Cœurs tentent d'écraser la RAM `compteur = compteur + 1` en une nano-seconde, il y a Perte Radicale d'Argent. Nous devrons modéliser de lourds coffres-forts d'exclusivité appelés Mutex (Mutual Exclusions) ou les Deadlocks (Étreinte Fatale / L'interblocage).",
                objectives: ["Créer un bataillon asynchrone avec pthread_create", "Reconstruire séquentiellement l'exécution avec pthread_join", "Assassiner une Data Race de RAM par Posix Locks Mutex", "Résoudre la mortelle situation d'un Deadlock de deux Cœurs bloqués"],
                exercises: [
                    {
                        title: "Deadlock Architecturé",
                        description: "Décrire verbalement le scénario du Dîner des Philosophes de Edsger Dijkstra et l'effet dévastateur du Locking sur des cœurs inter-dépendants.",
                        difficulty: "Difficile",
                        solution: "5 Threads (les philosophes). Et 5 ressources critiques partagés (fourchettes simples - Mutex). Thread 1 utilise son Mutex_1 et attend un temps infini le Mutex_2. Or Thread 2 utilise le Mutex_2 et attend sa voisine. Chaque Cœur CPU attend pour l'éternité une ressource bloquée pour être libérée (La situation d'étreinte mortelle ou interblocage, tuant inévitablement l'Operating System car la condition de brisure est impossible sans Terminate/KILL -9 ).",
                        hints: ["Le modèle de l'économie circulaire fermée et dépendante."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Implémentation Avancée Sockets C (Réseau Bas Niveau)",
                description: "Envoyer des trames TCP/IP à la force brute C sur un serveur UDP.",
                order: 4,
                duration: "15 heures",
                content: "La grande apothéose de C : Le socket réseau. Un Socket est également représenté par l'Operating System en File Descriptor. C'est l'essence du backend : Le port bind. Vous écrirez un mini serveur WEB Linux très bas niveau : 1) `socket()` (Créer le point de connexion de type Internet ou Unix), 2) `bind()` (attacher le Socket à un port précis sur votre Hardware tel le port 80/TCP), 3) `listen()` (création fil d'attente système d'appels entrants du monde extérieur), 4) `accept()` (extraction d'une requête et création d'un clone file descriptor), et enfin 5) Multithreading (envoi du client HTTP à un Thread indépendant qui retourne le String binaire d'une page HTML ou d'un JSON). Fin du cursus.",
                objectives: ["Binder un port d'O.S avec C via l'API Socket", "Générer les Header HTTP bruts sans FrameWork et sans librairie tiers", "Gérer et optimiser un multiplexage d'entrée-sorties Select() / Epoll() sans Fork"],
                exercises: [
                    {
                        title: "Big Endian vs Little Endian du Réseau",
                        description: "Pourquoi les développeurs Socket doivent-ils utiliser `htons(port_number)` ou `htonl` (Host TO Network Short) avant de lier le port avec the `sockaddr_in` struct ?",
                        difficulty: "Difficile",
                        solution: "Les protocoles Réseau IP exigent officiellement un alignement \"Big-Endian\" (l'octet le plus significatif en premier). Or, les puces d'ordinateur (surtout INTEL/x86) travaillent nativement en architecture locale inversée \"Little-Endian\". Cette fonction est un algorithme hyper rapide de C qui va transposer les octets dans le sens mathématique exigé par la World Wide Web Federation (IETF).",
                        hints: ["C'est l'histoire de la direction qu'on lit si on se lit de gauche à droite ou de droite à gauche."]
                    }
                ],
                resources: [{ title: "Programmation Serveurs Bas Niveau Socket API", type: "article", url: "https://beej.us/guide/bgnet/html/" }]
            }
        ]
    }
];

module.exports = cCourses;
