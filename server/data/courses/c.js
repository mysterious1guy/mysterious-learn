const cCourses = [
    {
        id: "c-niveau-d-butant",
        title: "Langage C - Niveau Débutant",
        description: "Maîtrisez la base de l'informatique moderne. Comprenez la compilation et la gestion physique de la mémoire.",
        category: "Programmation",
        level: "Débutant",
        duration: "35 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "c",
        isFree: true,
        tags: ["c", "compilation", "débutant"],
        chapters: [
            {
                title: "1. Vision Globale : Le langage système",
                description: "Le C est partout (Windows, Linux, Tesla).",
                order: 1,
                content: "Le C est un langage compilé, proche du processeur. Pas de magie ici : chaque octet doit être géré avec rigueur.",
                objectives: ["Comprendre le rôle du C"]
            },
            {
                title: "2. Concept : Types & Variables statiques",
                description: "Réserver des cases mémoire précisément.",
                order: 2,
                content: "Contrairement au JS, vous devez dire à l'avance si c'est un `int` (4 octets) ou un `char` (1 octet). Le compilateur GCC fera le reste.",
                objectives: ["Déclarer et compiler un programme"]
            },
            {
                title: "3. Exemple Concret : Hello World & Printf",
                description: "Votre première sortie standard.",
                order: 3,
                content: "#include <stdio.h>\\nint main() { printf(\"Salut!\"); return 0; }. Apprenez le rôle des fichiers headers (h).",
                objectives: ["Écrire un code C valide"]
            },
            {
                title: "4. Cas Pratique : Calcul de périmètre",
                description: "Saisie clavier via scanf.",
                order: 4,
                content: "Utilisez `scanf(\"%d\", &rayon)` pour récupérer une valeur. Comprenez l'importance du symbole '&' (adresse).",
                objectives: ["Utiliser les entrées/sorties"]
            },
            {
                title: "5. Exercice : Convertisseur de température",
                description: "Logique mathématique simple.",
                order: 5,
                content: "Écrivez un programme qui convertit les Celsius en Fahrenheit via la formule standard. Compilez-le sans erreur.",
                objectives: ["Maîtriser le workflow d'un fichier .c"]
            }
        ]
    },
    {
        id: "c-niveau-moyen",
        title: "Langage C - Niveau Moyen",
        description: "Contrôlez le flux et les collections. Maîtrisez les structures de décision et les tableaux contigus.",
        category: "Programmation",
        level: "Moyen",
        duration: "50 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        language: "c",
        isFree: true,
        tags: ["c", "logic", "moyen"],
        chapters: [
            {
                title: "1. Vision Globale : La logique binaire",
                description: "Prendre des décisions au plus bas niveau.",
                order: 1,
                content: "En C, les conditions sont le socle du contrôle. Maîtrisez les opérateurs logiques pour diriger le processeur.",
                objectives: ["Maîtriser le flux d'exécution"]
            },
            {
                title: "2. Concept : If, Else & Switch",
                description: "Les embranchements.",
                order: 2,
                content: "Apprenez à structurer vos choix logiques. Le `switch` est idéal pour les menus de console complexes.",
                objectives: ["Implémenter des algorithmes de décision"]
            },
            {
                title: "3. Exemple Concret : Boucles d'affichage",
                description: "Automatiser avec For et While.",
                order: 3,
                content: "Affichez une table de multiplication en utilisant une boucle imbriquée. Comprenez l'incrémentation en C.",
                objectives: ["Répéter des tâches efficacement"]
            },
            {
                title: "4. Cas Pratique : Gestion de notes",
                description: "Les Tableaux (Arrays).",
                order: 4,
                content: "Stockez 10 notes dans un tableau `int notes[10]`. Calculez la moyenne en parcourant le tableau avec une boucle.",
                objectives: ["Gérer des listes de données contigües"]
            },
            {
                title: "5. Exercice : Tri à bulles",
                description: "Votre premier algorithme de tri.",
                order: 5,
                content: "Ordonnez une liste de nombres du plus petit au plus grand par des échanges successifs. Indice : C'est le tri le plus simple au monde.",
                objectives: ["Implémenter un algorithme de tri"]
            }
        ]
    },
    {
        id: "c-niveau-interm-diaire",
        title: "Langage C - Niveau Intermédiaire",
        description: "Le Saint Graal : les Pointeurs. Gérez la mémoire vive directement.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "50 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        language: "c",
        isFree: true,
        tags: ["c", "pointers", "intermédiaire"],
        chapters: [
            {
                title: "1. Vision Globale : L'adressage RAM",
                description: "La vérité sur les variables.",
                order: 1,
                content: "Une variable n'est qu'une adresse dans la barrette RAM. Un pointeur est une variable qui stocke cette adresse.",
                objectives: ["Démystifier la mémoire vive"]
            },
            {
                title: "2. Concept : Pointeurs & Déréférencement",
                description: "Accéder à la donnée par son adresse.",
                order: 2,
                content: "Utilisez `*ptr` pour modifier la valeur pointée. C'est le passage par référence, indispensable pour les performances.",
                objectives: ["Manipuler les pointeurs"]
            },
            {
                title: "3. Exemple Concret : Swap par pointeur",
                description: "Échanger deux variables efficacement.",
                order: 3,
                content: "Créez une fonction `void echange(int *a, int *b)` qui inverse les valeurs sans utiliser de variable globale.",
                objectives: ["Utiliser les pointeurs en fonction"]
            },
            {
                title: "4. Cas Pratique : Arithmétique de pointeurs",
                description: "Voyager dans la RAM.",
                order: 4,
                content: "Parcourez un tableau en utilisant `ptr++` au lieu de `tab[i]`. Découvrez la puissance brute de l'accès direct.",
                objectives: ["Naviguer dans les adresses mémoire"]
            },
            {
                title: "5. Exercice : Inverser une chaîne",
                description: "Manipulation de Strings (Pointeurs de char).",
                order: 5,
                content: "En C, un String est un tableau de caractères fini par '\\0'. Inversez l'ordre des lettres en utilisant des pointeurs.",
                objectives: ["Maîtriser les chaînes de bas niveau"]
            }
        ]
    },
    {
        id: "c-niveau-expert",
        title: "Langage C - Niveau Expert",
        description: "Allocation dynamique et Structures. Maîtrisez le tas (Heap) et les systèmes complexes.",
        category: "Programmation",
        level: "Expert",
        duration: "60 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "c",
        isFree: true,
        tags: ["c", "malloc", "expert"],
        chapters: [
            {
                title: "1. Vision Globale : Le Tas (Heap)",
                description: "Gérer la mémoire à la volée.",
                order: 1,
                content: "Le tas permet d'allouer de la mémoire pendant l'exécution, pas seulement au démarrage. C'est crucial pour les grandes applications.",
                objectives: ["Comprendre l'allocation dynamique"]
            },
            {
                title: "2. Concept : Malloc, Calloc & Free",
                description: "Louer et rendre la mémoire.",
                order: 2,
                content: "Utilisez `malloc` pour réserver de l'espace. **N'oubliez jamais `free()`** pour éviter les fuites mémoire (Memory Leaks).",
                objectives: ["Allouer proprement la mémoire"]
            },
            {
                title: "3. Exemple Concret : Tableau dynamique",
                description: "Un tableau qui s'adapte.",
                order: 3,
                content: "Demandez à l'utilisateur combien de notes il veut saisir, et allouez exactement la place nécessaire via `malloc`.",
                objectives: ["Optimiser l'usage des ressources"]
            },
            {
                title: "4. Cas Pratique : Structures (Struct) & Flèches",
                description: "Créer ses propres types.",
                order: 4,
                content: "Regroupez des données (ex: Nom, Age, Note) dans une `struct Etudiant`. Accédez aux membres via l'opérateur flèche `->` sur un pointeur.",
                objectives: ["Modéliser des données complexes"]
            },
            {
                title: "5. Exercice : Liste Chaînée simple",
                description: "Le sommet de l'algorithmique C.",
                order: 5,
                content: "Créez une structure qui possède un pointeur vers son successeur. Reliez plusieurs éléments ensemble dynamiquement.",
                objectives: ["Construire une structure de données dynamique"]
            }
        ]
    }
];

module.exports = cCourses;
