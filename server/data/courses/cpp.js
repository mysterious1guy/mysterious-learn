const cppCourses = [
    {
        title: "C++ - Niveau Débutant",
        description: "Découvrez l'un des langages les plus puissants au monde. Apprenez la syntaxe C++ moderne, la manipulation d'objets standards et la compilation.",
        category: "Programmation",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=800&q=80",
        rating: 4.8,
        students: 18500,
        language: "french",
        isFree: true,
        tags: ["cpp", "C++", "débutant", "syntaxe"],
        chapters: [
            {
                title: "Introduction et Différences avec le C",
                description: "Votre premier pas dans l'écosystème C++.",
                order: 1,
                duration: "4 heures",
                content: "C++ repose sur les concepts du C mais ajoute, entre autres, la Programmation Orientée Objet formelle. L'affichage ne se fait plus avec `printf`, mais avec les flux d'E/S standard: `std::cout` pour afficher et `std::cin` pour lire. Vous découvrirez l'inclusion de la librairie `<iostream>` et l'espace de nom (`namespace`) std.",
                objectives: ["Différencier C et C++", "Afficher en console avec cout", "Lire avec cin"],
                exercises: [
                    {
                        title: "Hello C++",
                        description: "Oubliez printf. Affichez 'Bienvenue en C++' et faites un saut de ligne en utilisant cout et endl.",
                        difficulty: "Facile",
                        solution: "#include <iostream>\\n\\nint main() {\\n    std::cout << \"Bienvenue en C++\" << std::endl;\\n    return 0;\\n}",
                        hints: ["Rappelez-vous des opérateurs '<<' pour rediriger les données vers le flux de sortie cout."]
                    }
                ],
                resources: [
                    {
                        title: "Démarrer en C++",
                        type: "video",
                        url: "https://www.youtube.com/embed/vLnPwxZdW4Y"
                    }
                ]
            },
            {
                title: "Variables, Strings et Flux Modifiés",
                description: "Types de données modernes en C++.",
                order: 2,
                duration: "5 heures",
                content: "Contrairement au C qui s'appuie sur des tableaux de `char`, C++ apporte le puissant type `std::string` inclus via la librairie `<string>`. Vous apprendrez la concaténation simple, et le typage automatique induit par le mot clé `auto` depuis C++11, qui permet au compilateur de deviner le type de la variable.",
                objectives: ["Maitriser le type string", "Concaténer et comparer des variables string", "Utiliser auto"],
                exercises: [
                    {
                        title: "Concaténation robuste",
                        description: "Déclarez 'prenom' = 'Alice' et 'nom' = 'Smith'. Concaténez-les dans une variable 'complet' avec un espace entre les deux.",
                        difficulty: "Moyen",
                        solution: "std::string prenom = \"Alice\";\\nstd::string nom = \"Smith\";\\nstd::string complet = prenom + \" \" + nom;",
                        hints: ["L'opérateur + marche directement pour concaténer deux objets std::string."]
                    }
                ],
                resources: [
                    {
                        title: "Les strings dans C++",
                        type: "video",
                        url: "https://www.youtube.com/embed/3nwpVR1nMmc"
                    }
                ]
            }
        ]
    },
    {
        title: "C++ - Niveau Intermédiaire",
        description: "Plongez dans l'orienté objet, la bibliothèque standard (STL) et les pointeurs intelligents.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80",
        rating: 4.8,
        students: 12000,
        language: "french",
        isFree: true,
        tags: ["cpp", "OOP", "classes", "STL", "intermédiaire"],
        chapters: [
            {
                title: "Programmation Orientée Objet Basique",
                description: "Regrouper données et comportement.",
                order: 1,
                duration: "6 heures",
                content: "C++ classe les membres comme `private` (accessible uniquement de l'intérieur de l'objet) ou `public` (accessible de partout). Nous allons créer des classes, utiliser le constructeur pour initialiser les objets, et les destructeurs (tildé `~Constructeur`), pour libérer les éventuelles ressources. C'est le principe central de l'encapsulation de données en C++.",
                objectives: ["Différencier private et public", "Construire des classes avec méthodes", "Écrire les fichiers header (.h / .hpp) pour les classes"],
                exercises: [
                    {
                        title: "Guerrier C++",
                        description: "Créez une classe Personnage avec un attribut privé 'pv' (entier) valant 100. Faites un getter (fonction getPv) public.",
                        difficulty: "Moyen",
                        solution: "class Personnage {\\nprivate:\\n    int pv = 100;\\npublic:\\n    int getPv() { return pv; }\\n};",
                        hints: ["Il faut mettre un point-virgule indispensable après l'accolade fermante de la classe."]
                    }
                ],
                resources: [
                    {
                        title: "Les bases de la POO C++",
                        type: "video",
                        url: "https://www.youtube.com/embed/wN0x9eZLix4"
                    }
                ]
            },
            {
                title: "Introduction à la STL (Vecteurs et Itérateurs)",
                description: "Adieu anciens tableaux !",
                order: 2,
                duration: "8 heures",
                content: "La STL (Standard Template Library) est l'armurerie du développeur C++. `std::vector` (inclus via `<vector>`) remplace allègrement les pointeurs/allocations dynamiques et tableaux statiques du C. Le vecteur gère sa mémoire automatiquement. Nous utiliserons également les algos très pratiques comme `std::sort` pour les trier, via la notion d'itérateurs (begin et end).",
                objectives: ["Maitriser std::vector", "Boucler sur un vecteur de façon moderne (for each)", "Utiliser push_back et size"],
                exercises: [
                    {
                        title: "Insertion de vector",
                        description: "Déclarez un std::vector d'entiers, et ajoutez-y dynamiquement les chiffres 10 puis 20.",
                        difficulty: "Facile",
                        solution: "#include <vector>\\nstd::vector<int> v;\\nv.push_back(10);\\nv.push_back(20);",
                        hints: ["N'oubliez pas les chevrons <int> pour indiquer le type, et utilisez push_back()."]
                    }
                ],
                resources: [
                    {
                        title: "La STL C++",
                        type: "video",
                        url: "https://www.youtube.com/embed/PocJ5jP-3JM"
                    }
                ]
            }
        ]
    },
    {
        title: "C++ - Niveau Expert (Avancé)",
        description: "Haut niveau d'ingénierie : héritage complexe, polymorphisme, templates, RAII et pointeurs intelligents (smart pointers).",
        category: "Programmation",
        level: "Avancé",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        rating: 4.9,
        students: 7600,
        language: "french",
        isFree: true,
        tags: ["cpp", "C++11", "smart pointers", "polymorphisme", "templates", "avancé"],
        chapters: [
            {
                title: "Templates et Programmation Générique",
                description: "Le code générique en toute puissance.",
                order: 1,
                duration: "8 heures",
                content: "Les templates (mot clé `template <typename T>`) permettent de créer des fonctions ou des classes génériques (qui marchent avec n'importe quel data-type défini à la volée tant qu'elle en gère les opérations). C'est ainsi qu'a été conçue la STL (Standard Template Library) qui propulse tout C++ moderne.",
                objectives: ["Écrire une fonction template simple", "Maitriser la syntaxe des chevrons", "Repenser la conception polymorphe des fonctions"],
                exercises: [
                    {
                        title: "Permutateur générique",
                        description: "Écrivez le prototype template d'une fonction permuter qui prend deux arguments de même type et échange leurs positions.",
                        difficulty: "Difficile",
                        solution: "template <typename T>\\nvoid permuter(T& a, T& b) {\\n    T temp = a;\\n    a = b;\\n    b = temp;\\n}",
                        hints: ["Vous devez utiliser le passage par référence (&) pour muter des valeurs originelles."]
                    }
                ],
                resources: [
                    {
                        title: "C++ Templates",
                        type: "video",
                        url: "https://www.youtube.com/embed/I-hZkUa9mIs"
                    }
                ]
            },
            {
                title: "RAII et Smart Pointers",
                description: "Sécurisation de la mémoire et fuites (Mémoire Sécurisée C++11+)",
                order: 2,
                duration: "10 heures",
                content: "L'idiome RAII (Resource Acquisition Is Initialization) stipule que la durée de vie d'une ressource est liée à son objet de portée (scope). On n'utilise quasiment plus `new` et `delete` (les malloc et free de C++) manuellement ; on utilise plutôt `<memory>` pour accéder aux Smart Pointers : `std::unique_ptr` (possession exclusive de ressource en mémoire garantissant zéro leakage) et `std::shared_ptr` (comptage de référence).",
                objectives: ["Définir ce qu'est un use-case et design pattern RAII", "Proscrire globalement les \"naked delete\" manuelles au profit des std::make_unique", "Appliquer de la gestion mémoire en prod"],
                exercises: [
                    {
                        title: "Mise pointer robuste",
                        description: "Créer un unique ptr nommé p vers un entier de valeur 100 via la syntax native depuis C++14",
                        difficulty: "Moyen",
                        solution: "#include <memory>\\nauto p = std::make_unique<int>(100);",
                        hints: ["std::make_unique() retourne par convention la sécurisation encapsulante de pointeur."]
                    }
                ],
                resources: [
                    {
                        title: "Au revoir New, Bonjour Smart Pointers",
                        type: "video",
                        url: "https://www.youtube.com/embed/UOBJuOPoRGU"
                    }
                ]
            }
        ]
    }
];

module.exports = cppCourses;
