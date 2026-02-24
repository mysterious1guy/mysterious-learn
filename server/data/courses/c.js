const cCourses = [
    {
        id: "c-niveau-d-butant",
        title: "C - Niveau Débutant",
        description: "Plongez dans le langage le plus fondamental. Comprenez la compilation, les types natifs, et la rudesse de la gestion de mémoire sans filet de sécurité.",
        category: "Programmation",
        level: "Débutant",
        duration: "35 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        students: 8500,
        language: "c",
        isFree: true,
        tags: ["c", "backend", "fondations", "débutant"],
        chapters: [
            {
                title: "Chapitre 1 : Compilation & Structure de Base",
                description: "Comprenez pourquoi le C est le moteur de l'informatique. Du code source au binaire.",
                order: 1,
                duration: "15 heures",
                content: "Tout programme C commence par `#include <stdio.h>` et une fonction `int main()`. Contrairement au JavaScript, le C est **compilé** : vous devez transformer votre texte en 0 et 1 (fichier exécutable) via un compilateur comme GCC. C est un langage à typage statique : vous devez déclarer vos variables avant de les utiliser.",
                objectives: ["Comprendre le rôle du compilateur", "Écrire un Hello World valide", "Maîtriser printf()"],
                exercises: [
                    {
                        title: "Le Salut Technique",
                        description: "Écrivez un programme affichant 'C est la base' suivi d'un saut de ligne.",
                        difficulty: "Facile",
                        solution: "#include <stdio.h>\\nint main() {\\n  printf(\"C est la base\\\\n\");\\n  return 0;\\n}",
                        hints: ["N'oubliez pas le point-virgule."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 2 : Variables, Types & Entrées",
                description: "Apprenez à réserver des cases mémoire et à lire le clavier.",
                order: 2,
                duration: "20 heures",
                content: "En C, les variables sont des emplacements physiques en RAM. Un `int` prend 4 octets, un `char` 1 octet. Utilisez `scanf(\"%d\", &age)` pour lire une valeur, en n'oubliant jamais le `&` qui donne l'adresse de la variable.",
                objectives: ["Déclarer int, float, char", "Utiliser scanf() en toute sécurité", "Comprendre les spécificateurs de format %d, %f, %c"],
                exercises: [
                    {
                        title: "Lecture d'âge",
                        description: "Quel symbole manque dans `scanf(\"%d\", age);` ?",
                        difficulty: "Facile",
                        solution: "Le `&` (esperluette) pour passer l'adresse.",
                        hints: ["Adresse vs Valeur."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        id: "c-niveau-interm-diaire",
        title: "C - Niveau Intermédiaire",
        description: "Contrôlez le flux et les collections. Maîtrisez les structures de décision et les tableaux contigus.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "50 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        rating: 4.9,
        students: 6100,
        language: "c",
        isFree: true,
        tags: ["c", "logic", "arrays", "intermédiaire"],
        chapters: [
            {
                title: "Chapitre 3 : Logique de Contrôle & Boucles",
                description: "Donnez un cerveau à vos programmes. Choix et itérations.",
                order: 1,
                duration: "25 heures",
                content: "Le C utilise `if`, `else`, `switch` pour la décision. Pour la répétition, `while` et `for`. Attention au type booléen : en C, `0` est faux, et tout le reste est vrai.",
                objectives: ["Maîtriser les structures if/else", "Éviter les boucles infinies", "Utiliser le switch avec break"],
                exercises: [
                    {
                        title: "Le Menu",
                        description: "Quelle instruction permet de sortir d'un switch ?",
                        difficulty: "Facile",
                        solution: "break;",
                        hints: ["Casser la suite."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Tableaux & Grilles",
                description: "Gérez des listes de données collées en mémoire.",
                order: 2,
                duration: "25 heures",
                content: "Un tableau `int tab[5]` réserve 20 octets contigus. Attention : le C ne vérifie pas les index ! Accéder à `tab[10]` est une faute grave nommée Buffer Overflow.",
                objectives: ["Manipuler les tableaux 1D et 2D", "Comprendre l'organisation contiguë", "Itérer par index"],
                exercises: [
                    {
                        title: "Dernière Case",
                        description: "Dans `int t[10]`, quel est l'index de la dernière case ?",
                        difficulty: "Facile",
                        solution: "9 (N-1)",
                        hints: ["On commence à 0."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        id: "c-niveau-avanc",
        title: "C - Niveau Avancé",
        description: "Le Saint Graal : les Pointeurs. Gérez la mémoire vive directement et débloquez la puissance brute du C.",
        category: "Programmation",
        level: "Avancé",
        duration: "50 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        rating: 4.9,
        language: "c",
        isFree: true,
        tags: ["c", "pointers", "memory", "avancé"],
        chapters: [
            {
                title: "Chapitre 5 : Pointeurs & Adresses",
                description: "Manipulez les cases mémoire directement.",
                order: 1,
                duration: "25 heures",
                content: "Un pointeur (`int *p`) stocke une adresse (`&x`). Le déréférencement (`*p`) permet d'aller voir ou modifier la valeur à distance. C'est l'outil de performance n°1.",
                objectives: ["Déclarer et utiliser des pointeurs", "Passage par référence dans les fonctions", "Déréférencer avec *"],
                exercises: [
                    {
                        title: "La Télécommande",
                        description: "Comment obtenir l'adresse d'une variable 'x' ?",
                        difficulty: "Facile",
                        solution: "&x",
                        hints: ["L'esperluette."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 6 : Arithmétique & Tableaux Dynamiques",
                description: "Voyagez dans la RAM avec des additions de pointeurs.",
                order: 2,
                duration: "25 heures",
                content: "Le nom d'un tableau est secrètement un pointeur. Faire `ptr + 1` fait bondir l'adresse vers la case suivante selon la taille du type. C'est la base de la performance système.",
                objectives: ["Lien Pointeur-Tableau", "Arithmétique de pointeurs", "Parcourir la RAM sans index"],
                resources: []
            }
        ]
    },
    {
        id: "c-niveau-expert",
        title: "C - Niveau Expert",
        description: "Maîtrisez le tas (Heap) et l'architecture logicielle. Allocation dynamique et structures complexes.",
        category: "Programmation",
        level: "Expert",
        duration: "60 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        rating: 5.0,
        language: "c",
        isFree: true,
        tags: ["c", "malloc", "struct", "expert"],
        chapters: [
            {
                title: "Chapitre 7 : Allocation Dynamique (Malloc/Free)",
                description: "Demandez de la mémoire à la volée sur le tas (Heap).",
                order: 1,
                duration: "30 heures",
                content: "Utilisez `malloc` pour louer de la mémoire pendant que le programme tourne. **Règle d'or** : tout ce qui est loué doit être rendu avec `free` sous peine de Memory Leak.",
                objectives: ["Maîtriser malloc et sizeof", "Vérifier les retours NULL", "Libérer avec free"],
                exercises: [
                    {
                        title: "Le Nettoyage",
                        description: "Quelle fonction évite la fuite mémoire après un malloc ?",
                        difficulty: "Facile",
                        solution: "free();",
                        hints: ["Libérer."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 8 : Structures & Listes Chaînées",
                description: "Construisez vos propres types et organisez les données en graphes.",
                order: 2,
                duration: "30 heures",
                content: "Les `struct` regroupent des variables. En utilisant des pointeurs dans les structures, on peut créer des listes chaînées, des arbres et des systèmes complexes.",
                objectives: ["Définir des structures", "Utiliser l'opérateur flèche ->", "Notions de listes chaînées"],
                resources: []
            }
        ]
    }
];

module.exports = cCourses;
