const cppCourses = [
    {
        id: "c-niveau-d-butant-les-fondations-de-fer",
        title: "C++ - Niveau Débutant : Les Fondations de Fer",
        description: "Maîtrisez le langage des systèmes hautes performances. Comprenez la mémoire, la compilation native et la syntaxe C++ moderne (C++11 à C++20).",
        category: "Programmation",
        level: "Débutant",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=800&q=80",
        rating: 4.8,
        students: 18500,
        language: "cpp",
        isFree: true,
        tags: ["cpp", "C++", "débutant", "syntaxe", "système"],
        chapters: [
            {
                title: "Chapitre 1 : Compilation, Linking et le flux I/O Standard",
                description: "Le passage du code source au binaire. Comprenez le rôle du compilateur (GCC/Clang) et la puissance des flux.",
                order: 1,
                duration: "6 heures",
                content: "C++ est un langage compilé. Le processus comporte quatre étapes : 1) Préprocesseur (directives #), 2) Compilation (translation en assembleur), 3) Assemblage (code objet binaire), 4) Linking (résolution des adresses externes). Nous utiliserons `<iostream>` pour les entrées/sorties. Contrairement au `printf` du C, `std::cout` et `std::cin` sont des flux typés et sécurisés. Vous apprendrez l'importance du `namespace std` et pourquoi l'utilisation de `using namespace std;` est une pratique risquée en milieu professionnel.",
                objectives: ["Configurer un environnement de compilation (g++)", "Manipuler les flux de sortie avec les manipulateurs (endl, hex, scientific)", "Distinguer les erreurs de compilation des erreurs de link"],
                exercises: [
                    {
                        title: "Salut le Monde Typé",
                        description: "Créez un programme qui demande l'âge de l'utilisateur et l'affiche en format Hexadécimal via les manipulateurs de flux.",
                        difficulty: "Facile",
                        solution: "#include <iostream>\nint main() {\n  int age;\n  std::cout << \"Age ? \";\n  std::cin >> age;\n  std::cout << \"Hex: \" << std::hex << age << std::endl;\n  return 0;\n}",
                        hints: ["Utilisez std::hex pour modifier le comportement du flux cout."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 2 : Types Primitifs, Références et le Typage 'auto'",
                description: "Gestion des données et passage de paramètres. Pourquoi les références C++ sont supérieures aux pointeurs C pour la sécurité.",
                order: 2,
                duration: "8 heures",
                content: "C++ est statiquement et fortement typé. Nous explorerons les types scalaires (int, double, char) et le puissant `std::string`. Mais la révolution du C++ réside dans la **Référence (`&`)**. Une référence est un alias permanent pour un objet existant. Elle permet le passage de paramètres 'par référence' (sans copie, comme un pointeur) mais sans la syntaxe complexe ni le risque de nullité. Nous aborderons également `auto` (depuis C++11) qui permet au compilateur de déduire le type à l'initialisation, rendant le code plus maintenable sans sacrifier la performance.",
                objectives: ["Différencier passage par valeur et passage par référence", "Utiliser auto pour les types complexes", "Comprendre le type booléen natif"],
                exercises: [
                    {
                        title: "Le Swappeur Sécurisé",
                        description: "Écrivez une fonction `void swap(int& a, int& b)` qui échange les valeurs des deux entiers passés en argument sans utiliser de pointeurs.",
                        difficulty: "Moyen",
                        solution: "void swap(int& a, int& b) {\n  int temp = a;\n  a = b;\n  b = temp;\n}",
                        hints: ["Le symbole & après le type indique que vous travaillez sur l'original, pas une copie."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Structures de Contrôle et Fonctions Surchargées",
                description: "Logique, boucles for-each modernes et polymorphisme statique (Surcharge).",
                order: 3,
                duration: "8 heures",
                content: "Nous étudierons les structures de contrôle classiques (if, switch, while). La nouveauté majeure est la boucle **Range-based for loop** (`for(auto x : collection)`), beaucoup plus sûre et lisible. Nous aborderons ensuite la **Surcharge de Fonctions** (Overloading) : la capacité d'avoir plusieurs fonctions ayant le même nom mais des signatures (paramètres) différentes. C'est le premier pas vers le polymorphisme, où le compilateur choisit la bonne version au moment de la compilation.",
                objectives: ["Utiliser la boucle for moderne sur des tableaux statiques", "Surcharger une fonction de calcul pour différents types (int, float)", "Bannir les macro-fonctions au profit des fonctions inline"],
                exercises: [
                    {
                        title: "Calculateur Surchargé",
                        description: "Écrivez deux fonctions `carre`. L'une prend un int, l'autre un double. Elles retournent respectivement le carré de la valeur.",
                        difficulty: "Facile",
                        solution: "int carre(int n) { return n * n; }\ndouble carre(double n) { return n * n; }",
                        hints: ["Le compilateur distingue les fonctions par leurs arguments, pas par leur nom seul."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Mémoire Statique, Tableaux et Vector (Intro STL)",
                description: "La pile vs le tas. Pourquoi std::vector est votre meilleur ami pour la gestion de listes.",
                order: 4,
                duration: "8 heures",
                content: "Les tableaux C-style (`int arr[10]`) sont dangereux car ils ne connaissent pas leur propre taille. C++ introduit `std::vector` (via `<vector>`), un tableau dynamique de la STL qui gère sa propre mémoire. Il se redimensionne tout seul, possède une méthode `.size()` et garantit l'accès sécurisé aux données. Nous explorerons également la notion de **Const-Correctness** : utiliser `const` partout où la donnée ne doit pas changer pour aider le compilateur à optimiser le code et prévenir les bugs.",
                objectives: ["Remplacer les tableaux fixes par des vecteurs", "Utiliser const pour protéger les arguments de fonctions", "Ajouter et supprimer des éléments dynamiquement avec push_back()"],
                exercises: [
                    {
                        title: "Sommeur de Vecteur",
                        description: "Écrivez une fonction qui prend un `std::vector<int>` constant par référence et retourne la somme de ses éléments.",
                        difficulty: "Moyen",
                        solution: "int somme(const std::vector<int>& v) {\n  int s = 0;\n  for(int x : v) s += x;\n  return s;\n}",
                        hints: ["Passer par référence constante évite une copie lourde tout en garantissant que le vecteur ne sera pas modifié."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        id: "c-niveau-interm-diaire-l",
        title: "C++ - Niveau Intermédiaire : L'Architecture Orientée Objet",
        description: "Transformez votre code en composants robustes. Maîtrisez les classes, l'encapsulation, la STL et les premiers concepts de gestion mémoire.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "45 heures",
        image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80",
        rating: 4.8,
        students: 12000,
        language: "cpp",
        isFree: true,
        tags: ["cpp", "OOP", "classes", "STL", "intermédiaire", "objets"],
        chapters: [
            {
                title: "Chapitre 1 : Classes, Objets et Encapsulation Réelle",
                description: "Modélisez le monde réel. Comprenez la différence entre structure (C) et classe (C++).",
                order: 1,
                duration: "10 heures",
                content: "Une Classe est un blueprint, un Objet est une instance. L'**Encapsulation** consiste à masquer les détails internes (`private`) et à exposer une interface (`public`). Nous étudierons les **Constructeurs** (incluant la liste d'initialisation, plus performante) et les **Destructeurs** (`~NomClasse`), cruciaux pour libérer les ressources. Vous apprendrez que par défaut, les membres d'une classe sont privés, contrairement à une struct où ils sont publics.",
                objectives: ["Concevoir des classes avec des données privées et des accesseurs", "Utiliser la liste d'initialisation du constructeur", "Comprendre le cycle de vie d'un objet automatique"],
                exercises: [
                    {
                        title: "La Classe CompteBancaire",
                        description: "Créez une classe avec un attribut privé 'solde'. Ajoutez des méthodes 'deposer' et 'consulter' (cette dernière doit être const).",
                        difficulty: "Moyen",
                        solution: "class Compte {\nprivate: double solde = 0;\npublic:\n  void deposer(double m) { solde += m; }\n  double consulter() const { return solde; }\n};",
                        hints: ["Une méthode qui ne modifie rien doit être marquée const."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 2 : La Bibliothèque Standard (STL) : Algorithmes et Itérateurs",
                description: "N'écrivez plus jamais une boucle de tri à la main. Maîtrisez les conteneurs et les algos génériques.",
                order: 2,
                duration: "12 heures",
                content: "La STL repose sur trois piliers : Conteneurs (vector, list, map), Algorithmes (sort, find, transform) et Itérateurs (le pont entre les deux). Nous apprendrons à utiliser `std::sort` avec des fonctions personnalisées, et `std::map` pour gérer des paires clé-valeur avec une complexité logarithmique O(log n). Vous découvrirez comment les itérateurs abstraient la structure de données, permettant de trier un tableau aussi facilement qu'une liste chaînée.",
                objectives: ["Manipuler std::map pour des dictionnaires", "Utiliser std::sort avec lambda expressions basiques", "Parcourir un conteneur via les itérateurs auto iterator"],
                exercises: [
                    {
                        title: "Dictionnaire de Mots",
                        description: "Utilisez un `std::map<std::string, int>` pour compter les occurrences d'un mot dans une liste.",
                        difficulty: "Moyen",
                        solution: "std::map<std::string, int> counts;\nfor(auto s : mots) counts[s]++;",
                        hints: ["std::map crée automatiquement l'entrée avec 0 si la clé n'existe pas encore."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Héritage, Polymorphisme et Fonctions Virtuelles",
                description: "Le cœur du design pattern. Apprenez à manipuler des objets hétérogènes via une interface commune.",
                order: 3,
                duration: "12 heures",
                content: "L'héritage permet de spécialiser des comportements. Mais le vrai pouvoir vient du **Polymorphisme Dynamique**. Grâce au mot-clé `virtual`, vous pouvez appeler une méthode sur un pointeur/référence de classe de base, et C++ exécutera la version de la classe dérivée au runtime (via la VTable). C'est la base de tout framework extensible. Nous aborderons également les **Classes Abstraites** (interfaces) possédant des fonctions virtuelles pures (`= 0`).",
                objectives: ["Implémenter une hiérarchie de classes cohérente", "Utiliser le mot-clé override pour la sécurité", "Comprendre pourquoi un destructeur de classe de base doit être virtual"],
                exercises: [
                    {
                        title: "Formes Géométriques",
                        description: "Créez une classe Forme (abstraite) avec une méthode virtuelle pure aire(). Dérivez Cercle et Rectangle.",
                        difficulty: "Difficile",
                        solution: "class Forme { public: virtual double aire() const = 0; };\nclass Cercle : public Forme {\n  double r; public: Cercle(double r) : r(r) {}\n  double aire() const override { return 3.14 * r * r; }\n};",
                        hints: ["Le '= 0' rend la fonction virtuelle pure et la classe abstraite."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Gestion d'Exceptions et Robustesse",
                description: "Prévenir le crash. Apprenez le mécanisme throw / try / catch pour gérer les erreurs inattendues.",
                order: 4,
                duration: "11 heures",
                content: "Les erreurs ne doivent pas être ignorées. C++ propose un système d'exceptions structuré. Nous apprendrons à lancer des exceptions (`std::runtime_error`) et à les intercepter proprement. Surtout, nous aborderons la garantie d'exception et pourquoi il ne faut JAMAIS laisser une exception s'échapper d'un destructeur. C'est l'introduction au concept fondamental du RAII que nous approfondirons au niveau expert.",
                objectives: ["Créer vos propres types d'exceptions", "Gérer les erreurs de ressource (fichier manquant, allocation échouée)", "Utiliser Noexcept pour l'optimisation"],
                exercises: [
                    {
                        title: "Division Sécurisée",
                        description: "Créez une fonction de division qui lance une `std::invalid_argument` si le dénominateur est zéro.",
                        difficulty: "Moyen",
                        solution: "double div(double a, double b) {\n  if(b == 0) throw std::invalid_argument(\"Zero!\");\n  return a / b;\n}",
                        hints: ["Incluez <stdexcept> pour utiliser les exceptions standards."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        id: "c-niveau-expert-mondiale-l",
        title: "C++ - Niveau Expert Mondiale : L'Ingénierie de Haute Précision",
        description: "Devenez un architecte système. Maîtrisez la gestion mémoire moderne, les templates, la programmation système et les optimisations bas niveau.",
        category: "Programmation",
        level: "Avancé",
        duration: "65 heures",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        rating: 4.9,
        students: 7600,
        language: "cpp",
        isFree: true,
        tags: ["cpp", "C++20", "smart pointers", "memory", "templates", "avancé", "système"],
        chapters: [
            {
                title: "Chapitre 1 : RAII et Smart Pointers (Gestion Mémoire Moderne)",
                description: "Bannissez 'new' et 'delete' de votre vocabulaire. Apprenez la gestion automatique des ressources.",
                order: 1,
                duration: "15 heures",
                content: "L'idiome **RAII** (Resource Acquisition Is Initialization) est le cœur du C++ moderne. La ressource est liée à la durée de vie de l'objet. Nous étudierons les **Smart Pointers** (C++11+) : `std::unique_ptr` pour la propriété unique (zéro coût, transfert via move semantics) et `std::shared_ptr` pour la propriété partagée (comptage de référence). Nous apprendrons pourquoi les pointeurs nus ne doivent être utilisés que pour l'observation, jamais pour la propriété.",
                objectives: ["Implémenter le pattern RAII pour n'importe quelle ressource (File, Socket, Mutex)", "Utiliser std::make_unique et std::make_shared", "Comprendre et éviter les cycles de référence avec std::weak_ptr"],
                exercises: [
                    {
                        title: "Le Gestionnaire de Fichier RAII",
                        description: "Créez une classe qui ouvre un fichier dans le constructeur et le ferme AUTOMATIQUEMENT dans le destructeur, garantissant zéro fuite même en cas d'exception.",
                        difficulty: "Difficile",
                        solution: "class FileWrapper {\n  FILE* f;\npublic:\n  FileWrapper(const char* n) { f = fopen(n, \"r\"); }\n  ~FileWrapper() { if(f) fclose(f); }\n};",
                        hints: ["Le destructeur est appelé lors de la remontée de pile (Stack Unwinding) d'une exception."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 2 : Move Semantics et Rvalue References",
                description: "Supprimez les copies inutiles. Apprenez à 'voler' le contenu des objets temporaires pour une performance maximale.",
                order: 2,
                duration: "15 heures",
                content: "Introduit en C++11, le mouvement (`std::move`) permet de transférer les ressources d'un objet temporaire vers un nouvel objet au lieu de les copier. Nous étudierons les **Rvalue References (`&&`)**, le constructeur de mouvement et l'opérateur d'affectation par mouvement. Cela permet des performances proches du C tout en gardant des objets de haut niveau (comme des vecteurs de millions d'éléments). Nous aborderons également le concept de **Rule of Five**.",
                objectives: ["Implémenter la Rule of Five pour une classe gérant des ressources", "Utiliser std::move pour optimiser les retours de fonctions", "Comprendre le Perfect Forwarding avec std::forward"],
                exercises: [
                    {
                        title: "Le Constructeur de Mouvement",
                        description: "Pour une classe Buffer possédant un pointeur `int* data`, écrivez le constructeur de mouvement qui transfère le pointeur et met la source à nullptr.",
                        difficulty: "Difficile",
                        solution: "Buffer(Buffer&& other) noexcept {\n  data = other.data;\n  other.data = nullptr;\n}",
                        hints: ["N'oubliez pas de mettre la source à un état neutre (.data = nullptr) pour éviter un double-free."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Metaprogrammation et Templates Avancés",
                description: "Générez du code à la compilation. Maîtrisez les templates, la spécialisation et les Concepts (C++20).",
                order: 3,
                duration: "20 heures",
                content: "Les templates ne servent pas qu'aux vecteurs. Nous explorerons la programmation générique avancée : spécialisation de templates, variadic templates (`...`), et la SFINAE. Nous introduirons la révolution de **C++20 : les Concepts**. Ils permettent de poser des contraintes sémantiques sur les types templates, remplaçant les erreurs nébuleuses du compilateur par des messages clairs. C'est le sommet de l'abstraction C++.",
                objectives: ["Écrire des fonctions variadiques de type Print(a, b, c...)", "Utiliser des Concepts pour restreindre un template aux nombres", "Comprendre le calcul à la compilation via constexpr"],
                exercises: [
                    {
                        title: "Sommeur Universel (Templates)",
                        description: "Créez une fonction template `somme(T a, T b)` qui ne fonctionne QUE si T est un type numérique (via Concept ou static_assert).",
                        difficulty: "Difficile",
                        solution: "template<typename T>\nrequires std::is_arithmetic_v<T>\nT somme(T a, T b) { return a + b; }",
                        hints: ["Utilisez le header <type_traits> pour les tests de type."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Multithreading, Concurrence et Lock-Free",
                description: "Parallélisez vos calculs. Exploitez tous les cœurs de votre processeur avec std::thread et les atomiques.",
                order: 4,
                duration: "15 heures",
                content: "C++ offre un support natif pour le multithreading. Nous étudierons `std::thread`, les `std::mutex` pour la synchronisation, et les `std::future`/`std::promise` pour l'asynchronisme. Nous aborderons les pièges mortels (Deadlocks, Race Conditions) et comment les éviter via `std::lock_guard`. Enfin, nous jetterons un œil aux **Atomiques**, permettant des opérations sans verrou pour une performance extrême sur les données partagées.",
                objectives: ["Lancer et synchroniser des threads", "Protéger une ressource partagée avec un mutex", "Utiliser std::async pour des tâches de fond"],
                exercises: [
                    {
                        title: "Le Compteur Atomique",
                        description: "Créez une variable partagée incrémentée par 10 threads simultanément. Utilisez `std::atomic` pour garantir la justesse sans utiliser de Mutex lourd.",
                        difficulty: "Difficile",
                        solution: "std::atomic<int> count(0);\n// Dans le thread:\ncount++;",
                        hints: ["Les atomiques utilisent des instructions CPU spéciales beaucoup plus rapides que les verrous OS."]
                    }
                ],
                resources: [{ title: "C++ Concurrency in Action", type: "article", url: "https://en.cppreference.com/w/cpp/thread" }]
            }
        ]
    }
];

module.exports = cppCourses;
