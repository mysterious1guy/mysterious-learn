const cCourses = [
    {
        id: "c-fondations-compilation",
        title: "Langage C - 1. Fondations & Compilation System",
        description: "Plongez au cœur du processeur et de la mémoire RAM. Comprenez la chaîne de compilation GCC, le système de types stricts et les E/S standard.",
        category: "Programmation C",
        level: "Débutant",
        duration: "40 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "c",
        isFree: true,
        tags: ["c", "compilation", "gcc", "ram", "types"],
        chapters: [
            {
                title: "1. Architecture ordinateur & Philosophie du C",
                description: "Le langage proche du matériel par excellence.",
                order: 1,
                content: "Le C a été créé par Dennis Ritchie aux laboratoires Bell pour écrire le système d'exploitation UNIX. Contrairement aux langages interprétés, le C s'exécute directement sur le processeur (CPU) et communique en direct avec la mémoire vive (RAM). Comprendre le C, c'est comprendre comment fonctionne un ordinateur moderne.",
                objectives: ["Comprendre le rôle du langage C dans l'informatique système", "Visualiser l'interaction entre le CPU et la RAM"]
            },
            {
                title: "2. La Chaîne de Compilation GCC (Étape par Étape)",
                description: "Du fichier source `.c` au binaire exécutable.",
                order: 2,
                content: "La transformation d'un fichier `.c` en exécutable comporte 4 étapes fondamentales :\n1. Préprocesseur (`gcc -E`) : Remplace les `#include` et `#define`.\n2. Compilateur (`gcc -S`) : Traduit le C en code Assembleur.\n3. Assembleur (`gcc -c`) : Traduit l'assembleur en fichier objet binaire (`.o`).\n4. Éditeur de Liens / Linker (`gcc`) : Assemble les fichiers objets et bibliothèques en un binaire final.",
                objectives: ["Maîtriser les drapeaux de compilation GCC (`-Wall -Wextra -std=c11`)", "Résoudre les erreurs de compilation et de linkage"]
            },
            {
                title: "3. Types Primitifs, Octets & Modificateurs",
                description: "Allouer la taille mémoire exacte.",
                order: 3,
                content: "En C, chaque variable réserve un nombre fixe d'octets en RAM :\n- `char` : 1 octet (de -128 à 127 ou caractère ASCII)\n- `short` : 2 octets\n- `int` : 4 octets (32 bits)\n- `long` / `long long` : 4 à 8 octets\n- `float` : 4 octets (nombres réels)\n- `double` : 8 octets (haute précision)\nUtilisez les modificateurs `unsigned` pour doubler la portée positive et `const` pour créer des constantes immuables.",
                objectives: ["Calculer la taille mémoire exacte avec `sizeof()`", "Choisir le type optimal pour chaque donnée"]
            },
            {
                title: "4. Entrées / Sorties Standard (Printf & Scanf)",
                description: "Interagir avec le terminal Linux / MS-DOS.",
                order: 4,
                content: "La bibliothèque `<stdio.h>` fournit les fonctions de base :\n- `printf(\"Format %d\", valeur)` : Affiche des données formatées sur `stdout`.\n- `scanf(\"%d\", &variable)` : Lit une saisie sur `stdin`. Remarquez le symbole `&` qui transmet l'adresse mémoire de la variable pour que `scanf` puisse la modifier !",
                objectives: ["Utiliser les spécificateurs de format (`%d`, `%f`, `%c`, `%s`, `%p`)", "Gérer les tampons de saisie clavier"]
            },
            {
                title: "5. Projet Pratique : Calculateur de Métriques & Binaire",
                description: "Construire un convertisseur complet en C.",
                order: 5,
                content: "Écrivez un programme complet qui prend les dimensions d'un système, calcule sa consommation en RAM, affiche les adresses mémoire des variables et effectue des conversions d'unités avec une précision optimale.",
                objectives: ["Écrire un fichier main.c propre et fonctionnel", "Compiler et exécuter sans le moindre avertissement"]
            }
        ]
    },
    {
        id: "c-flux-fonctions-modularite",
        title: "Langage C - 2. Contrôle de Flux, Fonctions & Modularité",
        description: "Structurez votre code avec des boucles performantes, créez des fonctions réutilisables et découpez votre projet en fichiers headers `.h`.",
        category: "Programmation C",
        level: "Intermédiaire",
        duration: "45 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "c",
        isFree: true,
        tags: ["c", "boucles", "fonctions", "modularite", "headers"],
        chapters: [
            {
                title: "1. Contrôle de Flux : Embranchements & Conditions",
                description: "Prendre des décisions éclairées au niveau microprocesseur.",
                order: 1,
                content: "Apprenez la mécanique des conditions en C (`if`, `else if`, `else`). Découvrez l'instruction `switch(variable)` idéale pour créer des menus interactifs rapides grâce aux tables de saut générées par le compilateur.",
                objectives: ["Implémenter des choix logiques complexes", "Utiliser l'opérateur ternaire `condition ? valeur1 : valeur2`"]
            },
            {
                title: "2. Boucles d'Itération & Optimisation",
                description: "Répéter des blocs d'instructions sans perte de vitesse.",
                order: 2,
                content: "Explorez les trois structures de boucles du C :\n- `while(condition)` : Répète tant que la condition est vraie.\n- `do { ... } while(condition)` : Exécute au moins une fois le bloc.\n- `for(init; condition; incrément)` : La boucle par excellence pour parcourir des collections.",
                objectives: ["Contrôler le flux avec `break` et `continue`", "Éviter les boucles infinies et les dépassements"]
            },
            {
                title: "3. Fonctions & Modèle d'Empilement (Call Stack)",
                description: "Découper votre logique en modules autonomes.",
                order: 3,
                content: "Une fonction C possède un prototype `type_retour nom(parametres)`. Lors de l'appel d'une fonction, ses variables locales sont empilées dans la Stack (Pile d'exécution) puis dépilées à la fin de la fonction.",
                objectives: ["Déclarer les prototypes de fonctions", "Comprendre la portée des variables (locales vs statiques)"]
            },
            {
                title: "4. Modularité Professionnelle : Fichiers `.h` et `.c`",
                description: "Organiser un grand projet C comme un ingénieur.",
                order: 4,
                content: "Séparez votre projet en plusieurs fichiers :\n- `.h` (Header) : Contient les prototypes et constantes (#ifndef MACRO_H ... #endif).\n- `.c` (Source) : Contient le code des fonctions.\nCela permet la compilation séparée et accélère les builds de projets géants.",
                objectives: ["Créer des bibliothèques de fonctions C réutilisables", "Gérer les Include Guards pour éviter les inclusions multiples"]
            },
            {
                title: "5. Tableaux Unidimensionnels & Bidimensionnels",
                description: "Stocker des séquences de données contiguës.",
                order: 5,
                content: "Un tableau `int tab[100]` réserve 100 entiers côte à côte en mémoire. Apprenez à initialiser, parcourir et manipuler des matrices 2D `int matrice[4][4]` pour modéliser des jeux ou des données scientifiques.",
                objectives: ["Parcourir des tableaux sans sortir des limites", "Transmettre un tableau en paramètre de fonction"]
            }
        ]
    },
    {
        id: "c-pointeurs-ram-chaines",
        title: "Langage C - 3. Pointeurs, Arithmétique & Chaînes de Caractères",
        description: "Démystifiez le concept le plus puissant du C : l'accès direct aux adresses mémoire RAM, le passage par référence et la manipulation des chaînes.",
        category: "Programmation C",
        level: "Avancé",
        duration: "55 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "c",
        isFree: true,
        tags: ["c", "pointeurs", "ram", "references", "string"],
        chapters: [
            {
                title: "1. Qu'est-ce qu'un Pointeur en C ?",
                description: "Manipuler les adresses physiques de la barrette RAM.",
                order: 1,
                content: "Chaque case mémoire de votre ordinateur possède une adresse binaire/hexadécimale. Un pointeur est simplement une variable dont la valeur est l'adresse mémoire d'une autre variable.\n- `&x` : Récupère l'adresse de `x`.\n- `int *ptr = &x;` : Stocke l'adresse de `x` dans `ptr`.\n- `*ptr` : Déréférence le pointeur pour lire/modifier le contenu de `x`.",
                objectives: ["Comprendre l'opérateur d'adresse `&` et de déréférencement `*`", "Initialiser les pointeurs à `NULL` par sécurité"]
            },
            {
                title: "2. Passage de Paramètres par Référence (Pointeurs)",
                description: "Permettre aux fonctions de modifier des variables externes.",
                order: 2,
                content: "En C, les arguments sont transmis par copie. Pour qu'une fonction modifie une variable du `main()`, il faut passer l'adresse de cette variable. Exemple classique : la fonction `swap(int *a, int *b)`.",
                objectives: ["Écrire des fonctions de modification directe", "Retourner plusieurs résultats via des pointeurs"]
            },
            {
                title: "3. Arithmétique des Pointeurs & Équivalence avec les Tableaux",
                description: "Naviguer à grande vitesse dans la mémoire.",
                order: 3,
                content: "En C, le nom d'un tableau est un pointeur constant vers son premier élément ! La notation `tab[i]` est exactement équivalente à `*(tab + i)`. Lorsque vous faites `ptr++`, le compilateur avance de la taille du type pointé (ex: 4 octets pour un `int`).",
                objectives: ["Parcourir des collections via l'arithmétique de pointeurs", "Optimiser les boucles de traitement haute performance"]
            },
            {
                title: "4. Les Chaînes de Caractères (`char *` et `\0`)",
                description: "Comprendre comment le C traite le texte.",
                order: 4,
                content: "En C, il n'existe pas de type 'String' natif. Une chaîne est un tableau de `char` se terminant obligatoirement par le caractère nul `'\\0'`. Explorez les fonctions standard de `<string.h>` (`strlen`, `strcpy`, `strcmp`, `strcat`).",
                objectives: ["Manipuler les tableaux de caractères et pointeurs `char*`", "Recoder manuellement les fonctions standard de manipulation de texte"]
            },
            {
                title: "5. Projet Pratique : Algorithme de Recherche & Tri par Pointeurs",
                description: "Construire un moteur de traitement de texte rapide.",
                order: 5,
                content: "Implémentez un algorithme d'inversion de chaîne, de comptage de mots et de tri de tableau en utilisant exclusivement l'arithmétique de pointeurs sans crochets `[]`.",
                objectives: ["Prouver sa maîtrise totale de l'adressage mémoire", "Écrire un code C pur, rapide et sécurisé"]
            }
        ]
    },
    {
        id: "c-allocation-dynamique-structures",
        title: "Langage C - 4. Allocation Dynamique, Structures & System",
        description: "Gérez le Tas (Heap) avec malloc/free, créez vos propres types structurés (Struct) et construisez des structures de données dynamiques.",
        category: "Programmation C",
        level: "Expert",
        duration: "60 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "c",
        isFree: true,
        tags: ["c", "malloc", "heap", "struct", "linked-list"],
        chapters: [
            {
                title: "1. Mémoire Tas (Heap) vs Pile (Stack)",
                description: "La gestion dynamique des ressources système.",
                order: 1,
                content: "Contrairement à la Stack dont la taille est limitée et fixe, la Heap (le Tas) vous permet de réserver de grands espaces mémoire pendant l'exécution du programme. C'est indispensable pour gérer des données dont la taille n'est pas connue à la compilation.",
                objectives: ["Distinguer les zones mémoire Stack et Heap", "Comprendre la durée de vie des allocations dynamiques"]
            },
            {
                title: "2. Les Fonctions Malloc, Calloc, Realloc & Free",
                description: "Réserver et libérer la mémoire à l'octet près.",
                order: 2,
                content: "Utilisez les fonctions de `<stdlib.h>` :\n- `malloc(taille)` : Alloue de la mémoire brute en octets.\n- `calloc(n, taille)` : Alloue et réinitialise tous les octets à zéro.\n- `realloc(ptr, nouvelle_taille)` : Redimensionne un bloc mémoire existant.\n- `free(ptr)` : Libère impérativement la mémoire louée pour éviter les fuites mémoire (Memory Leaks).",
                objectives: ["Vérifier le retour de `malloc` contre `NULL`", "Traquer et éliminer les fuites mémoire avec Valgrind"]
            },
            {
                title: "3. Structures de Données Personnalisées (`struct` & `typedef`)",
                description: "Créer des objets métier complexes.",
                order: 3,
                content: "Combinez plusieurs variables dans un type personnalisé avec `struct`. Utilisez `typedef struct { ... } NomType;` pour simplifier les déclarations. Pour accéder aux membres d'une structure via un pointeur, utilisez l'opérateur flèche `ptr->membre`.",
                objectives: ["Modéliser des entités complexes en C", "Manipuler des structures par référence"]
            },
            {
                title: "4. Structures Dynamiques : Listes Chaînées Simples",
                description: "Le sommet de l'ingénierie C.",
                order: 4,
                content: "Une Liste Chaînée est composée de nœuds (`Node`) contenant une donnée et un pointeur `next` vers le nœud suivant. Contrairement aux tableaux, une liste chaînée peut grandir ou rétrécir en mémoire à tout moment sans réallocation globale.",
                objectives: ["Créer, insérer et supprimer des nœuds dans une liste chaînée", "Libérer correctement l'intégralité d'une liste chaînée"]
            },
            {
                title: "5. Fichiers & E/S Système (`FILE*`)",
                description: "Sauvegarder et charger des données sur le disque.",
                order: 5,
                content: "Apprenez à manipuler les fichiers du disque avec `<stdio.h>` :\n- `fopen(\"data.txt\", \"r\")` : Ouvre un fichier.\n- `fprintf()` / `fscanf()` : Écrits et lits du texte formaté.\n- `fwrite()` / `fread()` : Gestion des fichiers binaires ultra-rapide.\n- `fclose(fichier)` : Ferme et sauvegarde les flux.",
                objectives: ["Créer un système d'archivage permanent de données", "Gérer la persistance de structures complexes"]
            }
        ]
    }
];

module.exports = cCourses;
