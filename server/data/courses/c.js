const cCourses = [
    {
        title: "C - Niveau Débutant : Les Fondations Système",
        description: "Plongez dans le langage le plus fondamental de l'informatique moderne. Comprenez la compilation, les types natifs, et la rudesse de la gestion de mémoire sans filet de sécurité.",
        category: "Backend",
        level: "Débutant",
        duration: "35 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        students: 8500,
        language: "c",
        isFree: true,
        tags: ["c", "backend", "system", "débutant", "compilation"],
        chapters: [
            {
                title: "Chapitre 1 : Philosophie du C et Chaine de Compilation",
                description: "Le C n'est pas un langage, c'est un assembleur portable. Comprendre la traduction du code à l'exécutable.",
                order: 1,
                duration: "6 heures",
                content: "Créé par Dennis Ritchie en 1972 pour réécrire UNIX, le C est l'épine dorsale du monde. Avant d'écrire 'Hello World', vous devez comprendre la Chaine de Compilation (GCC/Clang) : 1) Le Préprocesseur (#include, #define) qui copie-colle du texte, 2) Le Compilateur qui transforme le C en Assembleur, 3) L'Assembleur qui crée le code objet (binaire pur), 4) L'Éditeur de Liens (Linker) qui relie votre objet aux bibliothèques système (libc). En C, il n'y a pas de magie, pas de Garbage Collector. Si vous allouez de la mémoire, vous en êtes l'unique responsable.",
                objectives: ["Comprendre les 4 étapes de compilation", "Distinguer le Header (.h) de l'implémentation (.c)", "Écrire, compiler et exécuter un programme robuste"],
                exercises: [
                    {
                        title: "Analyse du Préprocesseur",
                        description: "Écrivez un programme avec une macro `#define MAX 100`. Comment utiliseriez-vous GCC pour voir uniquement le résultat de l'étape du préprocesseur (avant compilation) ?",
                        difficulty: "Moyen",
                        solution: "Il faut exécuter `gcc -E programme.c`. Cette commande s'arrête après le préprocesseur. Le code affiché montrera que toutes les occurrences de MAX ont été littéralement remplacées par 100.",
                        hints: ["Cherchez le flag gcc utilisé spécifiquement pour le 'preprocessing' (--help)."]
                    },
                    {
                        title: "Le Linker et les Bibliothèques",
                        description: "Pourquoi un programme utilisant `math.h` (ex: fonction `sqrt`) nécessite-t-il souvent de rajouter `-lm` à la compilation (ex: `gcc prog.c -lm`) ?",
                        difficulty: "Difficile",
                        solution: "Faire `#include <math.h>` ne fait que copier la *déclaration* (la signature) de la fonction pour rassurer le compilateur. Mais le vrai code binaire de `sqrt` est compilé dans une bibliothèque séparée (`libm`). Le `-lm` ordonne au Linker (Éditeur de Liens) de lier virtuellement `libm` à votre exécutable final.",
                        hints: ["Différenciez la compilation (vérification syntaxique) de l'édition de liens (agrégation des binaires)."]
                    }
                ],
                resources: [
                    { title: "L'Histoire de UNIX et du C", type: "article", url: "https://fr.wikipedia.org/wiki/Histoire_d%27Unix" }
                ]
            },
            {
                title: "Chapitre 2 : Types Primitifs, Tailles Mémorielles et Transtypage",
                description: "La taille compte. Un octet de trop et votre système embarqué explose.",
                order: 2,
                duration: "8 heures",
                content: "Le C est statiquement et faiblement typé (on peut feinter le compilateur). Vous étudierez les types : `char` (généralement 1 octet), `short` (2 octets), `int` (4 octets), `long` (8 octets en 64-bit), `float` et `double`. Vous apprendrez l'opérateur fondamental `sizeof()` pour déterminer dynamiquement l'empreinte mémoire d'une donnée selon l'architecture de la machine. Nous verrons les dangers du dépassement de capacité (Integer Overflow) et la promotion entière (Casting) explicite vs implicite. En C, un booléen (`bool`) n'existait pas historiquement : 0 est Faux, tout le reste est Vrai.",
                objectives: ["Mesurer l'encombrement RAM via sizeof", "Maîtriser les limites (INT_MAX, INT_MIN)", "Comprendre la représentation en complément à deux formellement"],
                exercises: [
                    {
                        title: "Le Danger du Dépassement Intégral (Integer Overflow)",
                        description: "Si `unsigned char x = 255;`, que se passe-t-il après `x = x + 1;` ?",
                        difficulty: "Moyen",
                        solution: "La valeur devient 0. Un `unsigned char` fait 1 octet (8 bits). 255 en binaire est 11111111. Ajouter 1 modifie la valeur en (1)00000000. Le 9ème bit est perdu (tronqué), donc x revient à 0. C'est le principe du modulo.",
                        hints: ["Visualisez 8 bits remplis de 1, et l'effet de l'addition d'une retenue infinie."]
                    },
                    {
                        title: "Transtypage Explicite (Cast)",
                        description: "Expliquez pourquoi `float moyenne = 5 / 2;` donne `2.000` au lieu de `2.500`, et fournissez le correctif exact.",
                        difficulty: "Difficile",
                        solution: "L'opérateur de division `/` entre deux entiers effectue une division euclidienne stricte, générant l'entier `2`. Ce `2` est ensuite casté implicitement en `float` (2.0) pour l'affection. Le correctif est de forcer au moins un des opérandes en flottant : `float moyenne = (float)5 / 2;` ou `... = 5.0 / 2;`.",
                        hints: ["En C, le type de sortie dépend avant tout du type des membres de l'opération, pas du type de destination de l'affectation."]
                    }
                ],
                resources: [{ title: "Limites des Tyes en C", type: "video", url: "https://www.youtube.com/embed/5mFpPbcXgB0" }]
            },
            {
                title: "Chapitre 3 : Structuration, Boucles et Sécurité des Saisies",
                description: "Le flux de contrôle brutal. Scanf et ses failles béantes de sécurité.",
                order: 3,
                duration: "10 heures",
                content: "Maîtrise des blocs logiques (if, else, switch) et itérateurs (for, while, do-while). Nous nous concentrerons particulièrement sur la fonction d'entrée standard `scanf`. `scanf` est l'une des fonctions les plus dangereuses jamais écrites, causant des milliers de failles 'Buffer Overflow' si elle est mal encadrée. Nous verrons comment le buffer d'entrée du clavier (`stdin`) conserve des sauts de lignes fantômes (`\\n`) qui corrompent les saisies suivantes, et de quelle manière les ingénieurs senior utilisent `fgets()` couplé à `sscanf` pour une robustesse industrielle absolue.",
                objectives: ["Vider le buffer clavier (fflush/fpurge logic)", "Remédier aux pièges de scanf()", "Capter les signaux d'EOF"],
                exercises: [
                    {
                        title: "Le Déni de Scanf",
                        description: "Pourquoi `scanf(\"%s\", mot)` est-il un danger critique de sécurité dans un programme d'entreprise ?",
                        difficulty: "Expert",
                        solution: "Si `mot` est défini comme `char mot[10];`, un hacker peut taper 500 caractères. `scanf` n'impose aucune limite de base et écrasera aveuglément la mémoire au-delà du tableau, détruisant l'intégrité de la pile d'exécution (Smashing the stack for fun and profit). Il FAUT écrire : `scanf(\"%9s\", mot);`.",
                        hints: ["Que se passe-t-il si l'utilisateur saisit un roman pour un nom_limite à 10 lettres ?"]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : La Table ASCII, Les Chaînes et l'Absence d'Objets",
                description: "Une chaîne de caractères n'est qu'une illusion mathématique masquant de la mémoire contiguë.",
                order: 4,
                duration: "11 heures",
                content: "Le C ne connaît pas le texte. Une chaîne (string) est obligatoirement un tableau unidimensionnel de type `char`, obligatoirement terminé par le caractère Nul `\\0` (ASCII 0). Sans ce `\\0`, toutes les fonctions comme `printf` ou `strlen` liront la RAM indéfiniment jusqu'à un crash 'Segmentation Fault'. Nous étudierons la bibliothèque `<string.h>` (`strcpy`, `strcmp`, `strcat`), mais surtout pourquoi il faut toujours leur préférer leurs versions sécurisées (`strncpy`, `strncat`).",
                objectives: ["Comprendre l'impératif du pointeur nul de fin de chaine", "Créer des tableaux de strings (Matrices de Char)", "Manipuler explicitement les codes ASCII par addition/soustraction"],
                exercises: [
                    {
                        title: "Changement de Casse Manuel (Sans fonction native)",
                        description: "Écrivez un algorithme en C pour convertir tous les caractères minuscules d'une chaîne `T` en majuscules avec une simple addition arithmétique.",
                        difficulty: "Difficile",
                        solution: "for (int i = 0; T[i] != '\\0'; i++) {\n  if (T[i] >= 'a' && T[i] <= 'z') {\n    T[i] = T[i] - 32;\n  }\n}",
                        hints: ["En ASCII, la lettre 'A' vaut 65, et 'a' vaut 97. L'écart est de 32 précis."]
                    },
                    {
                        title: "L'oubli du Backslashzéro",
                        description: "Si on initialise `char msg[3] = {'Y', 'e', 's'};` et qu'on appelle `printf(\"%s\", msg)`, que va-t-il se passer ?",
                        difficulty: "Moyen",
                        solution: "Comportement indéfini (Undefined Behavior). Le `printf` lira 'Yes' mais continuera de lire et d'imprimer la mémoire RAM adjacente (affichant des déchets ou crachant le programme) jusqu'à tomber au hasard sur un octet valant 0 (`\\0`). Le tableau DEVRAIT faire 4 cases : `{'Y', 'e', 's', '\\0'}`.",
                        hints: ["Toute fonction qui demande un \"%s\" est aveugle. Comment sait-elle où s'arrêter ?"]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        title: "C - Niveau Intermédiaire : L'Enfer des Pointeurs",
        description: "L'essence même du C. Manipulez la mémoire vive de l'ordinateur à la volée. Apprenez l'allocation dynamique et le cauchemar des fuites de mémoire (Memory Leaks).",
        category: "Backend",
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
                title: "Chapitre 1 : Pointeurs et Adresses (L'Éveil)",
                description: "Le concept le plus terrifiant et puissant de la programmation. Ce qui différencie un développeur C d'un autre.",
                order: 1,
                duration: "10 heures",
                content: "Un pointeur n'est rien d'autre qu'une variable. Mais au lieu de stocker un entier ou un caractère, elle stocke une Adresse Mémoire Vivante. Nous étudierons en profondeur l'Opérateur d'Adresse (`&`), qui extrait l'adresse d'une variable existante, et l'Opérateur d'Indirection ou de Déréférencement (`*`), qui ordonne au CPU d'aller voir 'ce qu'il y a à cette adresse'. Nous verrons pourquoi un pointeur doit être fortement typé (un pointeur de `int` sait qu'il doit lire 4 octets à partir de l'adresse de base). Vous construirez vos premières fonctions avec un 'passage par adresse' réel.",
                objectives: ["Déclarer, initialiser et déréférencer des pointeurs", "Altérer la valeur de variables distantes inter-fonctions", "Comprendre les Déréférencement Nuls (Segfaults)"],
                exercises: [
                    {
                        title: "L'Échange Absolu (Swap By Pointer)",
                        description: "Écrivez la fonction stricte `void swap(int *a, int *b)` qui modifie deux variables passées depuis le `main()`. Interdit d'utiliser `return`.",
                        difficulty: "Difficile",
                        solution: "void swap(int *a, int *b) {\n  int temp = *a; // va chercher la VAUR brute\n  *a = *b;       // remplace la valeur lointaine A par celle lointaine B\n  *b = temp;     // remet la valeur originelle\n}",
                        hints: ["On vous donne les clés de deux maisons (les adresses pointer). Utilisez `*` pour entrer dedans et interchanger les meubles."]
                    }
                ],
                resources: [{ title: "Comprendre les Pointers (Harvard CS50)", type: "video", url: "https://www.youtube.com/embed/XISnO2YhnsY" }]
            },
            {
                title: "Chapitre 2 : Arithmétique des Pointeurs et Tableaux Réels",
                description: "La vérité cachée : Un tableau n'a jamais existé. Il n'est qu'un sucre syntaxique pour un pointeur constant.",
                order: 2,
                duration: "12 heures",
                content: "Quand vous déclarez `int T[5];`, `T` n'est pas un tableau. `T` est un 'const pointer' pointant secrètement sur la case mémoire `T[0]`. Nous allons détruire la syntaxe des crochets : vous apprendrez que écrire `T[3]` est stictement remplacé par le compilateur en `*(T + 3)`. C'est l'Arithmétique des Pointeurs : si T est un pointeur d'entiers (4 octets), faire `T + 1` ne rajoute pas 1 à l'adresse mémoire, mais bondit de 4 octets vers la case suivante ! Nous aborderons les Pointeurs sur Pointeurs (`**ptr`) (nécessaires pour les matrices d'adresses).",
                objectives: ["Traverser un tableau par pure arithmétique de pointeur", "Comprendre que (T + i) vaut l'adresse et *(T + i) vaut la valeur", "Transmettre un tableau sans sa taille (et les enjeux de sécurité qui suivent)"],
                exercises: [
                    {
                        title: "Équivalence stricte",
                        description: "Dans le langage C, la syntaxe autorise formellement à écrire `3[T]` au lieu de `T[3]`. Prouvez pourquoi cela fonctionne en utilisant la définition mathématique interne.",
                        difficulty: "Expert",
                        solution: "Le compilateur traduit intrinsèquement `X[Y]` par `*(X + Y)`. L'addition étant commutative, `*(T + 3)` est strictement égal à `*(3 + T)`. Par rétro-traduction magique, `*(3 + T)` donne `3[T]`. C'est l'une des bizarreries fondatrices du langage.",
                        hints: ["Revenez à la définition d'un offset depuis une adresse de base via la formule d'addition du déréférencement."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Allocation Dynamique (Le Malloc) du C (Heap vs Stack)",
                description: "La Pile ne suffit plus, invoquons le Tas (Heap). Devenez architecte des fondations RAM.",
                order: 3,
                duration: "15 heures",
                content: "Toute variable normale meurt à la fin de la fonction qui l'abrite (Scope). Elle est sur la Stack (Rapide, mais très limitée en Mo). Pour charger 1 Gigaoctet de données depuis un disque dur, il faut recourir à la Heap (Le Tas) via l'Allocation Dynamique. Ce chapitre couvre les légendaires `malloc()`, `calloc()` (initialisation à 0), et `realloc()` (étirement mémoire). Le corollaire ultime : quiconque emprunte de la mémoire système DOIT la rendre. La fonction `free()` doit être invoquée scrupuleusement, sous peine d'un fatal 'Memory Leak' qui paralysera le serveur et forcera un reboot brutal.",
                objectives: ["Demander de la mémoire au système l'opération malloc(sizeof(Type) * N)", "Rendre proprement la ram via free(ptr)", "Détecter avec rigueur les Pointeurs Fous / Sauvages (Dangling Pointers) et les remettre à NULL", "Maîtriser Valgrind, l'outil détective de fuites mémoires"],
                exercises: [
                    {
                        title: "La Fuite Cataclysmique (Memory Leak)",
                        description: "Créez une fonction `void generate()` qui alloue un tableau dynamique de 100 entiers mais ne le libère pas. Quel est l'impact si cette fonction est appelée 10 millions de fois dans une boucle serveur ?",
                        difficulty: "Moyen",
                        solution: "Chaque appel prend environ 400 octets (100 * 4 octets). Sur 10 millions, cela consomme 4 Go de RAM irrécupérables en quelques secondes (Leak). Le système d'exploitation tuera le processus (OOM Killer - Out Of Memory). L'oubli de `free(tab);` est fatal.",
                        hints: ["Pensez à ce qui arrive quand vous louez des appartements sans jamais rendre les clés ni résilier le bail."]
                    },
                    {
                        title: "Stabilité du Dangling Pointer",
                        description: "Pourquoi la règle d'or industrielle après un `free(ptr)` est-elle d'invoquer immédiatement `ptr = NULL;` ?",
                        difficulty: "Difficile",
                        solution: "`free(ptr)` avertit l'OS que la RAM liée peut être réutilisée, mais la variable ptr CONSERVE toujours physiquement l'adresse. Si quelqu'un d'autre tente de faire `*ptr = 10;` plus tard dans le code (Use-After-Free), c'est une corruption de mémoire atroce (Faille de Sécurité majeure de type 0-Day). Assigner `NULL` (adresse 0 invalide) garantit un crash propre et lisible en cas de réutilisation involontaire, plutôt qu'une faille pernicieuse.",
                        hints: ["Que se passe-t-il quand la nouvelle valeur écrase les données du prochain acheteur de cet espace RAM ?"]
                    }
                ],
                resources: [{ title: "Memory Leak expliqué via Valgrind", type: "video", url: "https://www.youtube.com/embed/b-2oI2P24bQ" }]
            },
            {
                title: "Chapitre 4 : Structuration Complexes et Pointeurs de Fonctions",
                description: "Construire des types de données personnalisés et l'illusion de l'Orienté Objet en C brut.",
                order: 4,
                duration: "13 heures",
                content: "Une `struct` (Structure) forme l'agrégation de multiples variables sous forme de \"Mégaclasse\" primitive. Par exemple, assembler un X(float) et un Y(float) pour définir un point GPS. Nous décortiquerons l'opérateur Arrow ou flèche (`->`) : un sucre syntaxique ultra-rapide pour `(*ptr_struct).attribut`. Nous parlerons d'une des notions les plus complexes du C : les Pointeurs de Fonctions (pouvoir passer dynamiquement toute une fonction comme paramètre ou créer des dictionnaires d'exécution pour émuler un comportement Polymorphe (OOP)).",
                objectives: ["Créer des structures imbriquées", "Maîtriser Typedef pour masquer les noms de structures longues", "Invoquer dynamiquement via un tableau de Pointeurs de Fonctions"],
                exercises: [
                    {
                        title: "Déréférencement Stricts de Structures",
                        description: "Soit `struct Etudiant *ptr = allocEtudiant()`. Écrivez la syntaxe pure mathématique, sans sucre syntaxique avec la flèche (`->`), pour récupérer le champ 'age'.",
                        difficulty: "Moyen",
                        solution: "Il faut déréférencer le pointeur avec des parenthèses avant d'accéder à l'attribut dot (`.`) : `(*ptr).age`. La syntaxe flèche `ptr->age` a été inventée spécifiquement parce que les parenthèses de `(*ptr).age` rendaient le code trop inesthétique aux yeux de Ritchies.",
                        hints: ["N'oubliez pas les parenthèses de priorité pour empêcher l'opérateur Point de passer avant le Déréférencement !"]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        title: "C - Niveau Expert Mondiale : Programmation POSIX, Threads et Noyau",
        description: "Codez un OS, écrivez pour le réseau, forgez votre propre Multithreading de bas niveau. Un niveau réservé aux Ingénieurs de Systèmes Distribués Embaqués (IoT, Aérospatial).",
        category: "Backend",
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
                        difficulty: "Expert",
                        solution: "Il y aura 8 processus au total (1 parent original + 7 descendants de diverses branches = 2^3 processus). Le 1er fork créer un clone. Au cycle 2, les DEUX processes exécutent indépendamment le fork et créent deux enfants. Puis 4 font de même et génèrent 4 nouveaux, soit 8. C'est une fractale exponentielle de l'exécution.",
                        hints: ["Pensez comme l'Hydre de Lerne. Chaque tête (process) coupe des branches qui coupent des branches récursivement."]
                    }
                ],
                resources: [{ title: "Le Modèle des Process IPC UNIX", type: "video", url: "https://www.youtube.com/embed/xVSPv-9NJJE" }]
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
                        difficulty: "Acharne",
                        solution: "5 Threads (les philosophes). Et 5 ressources critiques partagés (fourchettes simples - Mutex). Thread 1 utilise son Mutex_1 et attend un temps infini le Mutex_2. Or Thread 2 utilise le Mutex_2 et attend sa voisine. Chaque Cœur CPU attend pour l'éternité une ressource bloquée pour être libérée (La situation d'étreinte mortelle ou interblocage, tuant inévitablement l'Operating System car la condition de brisure est impossible sans Terminate/KILL -9 ).",
                        hints: ["Le modèle de l'économie circulaire fermée et dépendante."]
                    }
                ],
                resources: [{ title: "Dîner des Philosophes de Dijkstra (Concurrence Pthread)", type: "video", url: "https://www.youtube.com/embed/Z0o4Sih3s1g" }]
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
                        difficulty: "Expert",
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
