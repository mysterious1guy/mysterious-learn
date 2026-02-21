import React from 'react';
import { Cpu, Database, Command, Box, GitBranch, Sparkles, Trophy, Zap, Terminal, Hash, Layers } from 'lucide-react';

export const algoCourseData = [
    {
        id: 'module1',
        title: "Module 1 : Initiation à la Logique",
        icon: <Cpu size={20} />,
        description: "Apprenez à structurer votre pensée logique avant d'écrire une seule ligne de code. Les fondations universelles du développement.",
        chapters: [
            {
                id: 'chap1',
                title: "Bases du Raisonnement",
                description: "Qu'est-ce qu'un algorithme et pourquoi la machine est-elle 'idiote' ?",
                lessons: [
                    {
                        id: 'algo_m_1_1',
                        type: 'theory',
                        title: "Qu'est-ce qu'un Algorithme ?",
                        professorSpeech: "Bienvenue, apprenti. Sais-tu que l'algorithme est né au IXe siècle avec Al-Khwarizmi ? Oublie les écrans, nous allons apprendre à structurer l'univers.",
                        duration: '10 min',
                        content: `
# 🧠 L'Essence de l'Algorithmique

La plus grande erreur est de confondre **Apprendre à Programmer** et **Apprendre un Langage**. 

> [!IMPORTANT]
> **L'Algorithme est Universel** : Que vous utilisiez Python, Java ou C++, la logique reste identique. Un langage n'est qu'une traduction.

[?] Mais alors, c'est quoi le code ? | Le code n'est que la traduction de votre algorithme (qui est universel) dans une syntaxe spécifique compréhensible par l'ordinateur. L'algorithme est l'âme, le code est le corps.

## Pourquoi la machine a-t-elle besoin de nous ?
Un ordinateur est une machine incroyablement rapide, mais **totalement idiote**. Elle ne devine rien. Elle n'a aucune intuition.

**L'Analogie de la Recette :**
Si vous dites à un humain \"Fais-moi des crêpes\", il sait qu'il doit casser les œufs.
Si vous dites à un ordinateur \"Fais-moi des crêpes\", il va rester figé car il ne sait pas ce qu'est une crêpe.

Vous devez lui dire :
1. Prends le récipient.
2. Verse 250g de farine.
3. Casse l'œuf numéro 1.
...

## Définition
Un **algorithme** est une suite d'instructions finies, précises et ordonnées permettant de résoudre un problème ou d'accomplir une tâche.

[?] Pourquoi les algorithmes sont-ils si importants aujourd'hui ? | Ils contrôlent tout : de ce que vous voyez sur vos réseaux sociaux (algorithme de recommandation) à la trajectoire des fusées SpaceX. Maîtriser l'algorithmique, c'est maîtriser le monde moderne.
`
                    },
                    {
                        id: 'algo_m_1_2',
                        type: 'quiz',
                        title: "Quiz : Pensée Procédurale",
                        professorSpeech: "Voyons si tu es prêt à dompter la machine. Réponds avec sagesse.",
                        question: "Quelle est la principale différence entre un humain et un ordinateur face à une instruction ?",
                        options: [
                            { id: 'a', text: "L'ordinateur est plus intelligent et devine nos intentions.", correct: false },
                            { id: 'b', text: "L'humain a de l'intuition, alors que l'ordinateur nécessite une précision absolue étape par étape.", correct: true },
                            { id: 'c', text: "Il n'y a aucune différence, les deux réfléchissent de la même façon.", correct: false }
                        ],
                        explanation: "Parfait ! La machine est 'bête'. Elle exécute exactement ce que vous écrivez, ni plus, ni moins. C'est pour cela que votre algorithme doit être impeccable."
                    },
                    {
                        id: 'algo_m_1_3',
                        type: 'theory',
                        title: "Le Pseudo-code (Structure)",
                        professorSpeech: "Pour parler à la logique, nous utilisons le Pseudo-Code. C'est l'armure de ta pensée avant qu'elle ne devienne du code réel.",
                        duration: '12 min',
                        content: `
# 🦴 Structure Universelle

Pour éviter de se perdre dans les détails techniques d'un langage, on utilise le **Pseudo-code**. Voici notre template sacré :

\`\`\`pseudo
ALGORITHME Nom_Du_Programme

VARIABLES
    // Ici, on liste le matériel nécessaire (Ingrédients)

DÉBUT
    // Ici, on écrit les étapes (Action)
    // Entrée -> Traitement -> Sortie
FIN
\`\`\`

## Les 3 Piliers d'exécution :
1.  **Entrée (Input)** : Ce que l'utilisateur donne (ex: son âge).
2.  **Traitement (Process)** : Ce que l'on calcule (ex: est-il majeur ?).
3.  **Sortie (Output)** : Ce que l'on affiche (ex: \"Bienvenue !\").

> [!TIP]
> Toujours commencer par réfléchir sur papier. Si ton algorithme n'est pas clair dans ta tête, il ne le sera jamais pour la machine.

[?] Et si je me trompe dans mon pseudo-code ? | Ce n'est pas grave ! L'avantage du pseudo-code, c'est qu'il n'y a pas de compilateur pour crier à l'erreur de syntaxe. L'important est que la **logique** (l'ordre des étapes) soit cohérente.
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module2',
        title: "Module 2 : Variables et Stockage",
        icon: <Database size={20} />,
        description: "Comprendre comment la machine mémorise les informations : Nombres, Texte et Etats Logiques.",
        chapters: [
            {
                id: 'chap2',
                title: "Gestion des Données",
                description: "Déclaration, Affectation et Typage.",
                lessons: [
                    {
                        id: 'algo_m_2_1',
                        type: 'theory',
                        title: "Qu'est-ce qu'une Variable ?",
                        professorSpeech: "Imagine que la mémoire de l'ordinateur est un immense entrepôt rempli de tiroirs. Une variable, c'est un tiroir avec une étiquette.",
                        duration: '15 min',
                        content: `
# 📦 Les Variables : Stocker l'Information

En programmation, on ne peut rien faire sans stocker des données temporairement.

**Une variable possède 3 caractéristiques :**
1.  **Un Nom** (L'étiquette) : Pour la retrouver (ex: \`age_utilisateur\`).
2.  **Un Type** (La forme) : Qu'est-ce qu'elle contient ? (Un nombre ? Du texte ?).
3.  **Une Valeur** (Le contenu) : Ce qu'il y a à l'intérieur (ex: \`25\`).

## Déclarer vs Affecter
- **Déclarer** : C'est réserver le tiroir.
  \`VARIABLE age : Entier\`
- **Affecter** : C'est mettre quelque chose dedans.
  \`age <- 25\` (On lit : age reçoit 25)

> [!CAUTION]
> On ne peut mettre qu'un seul objet à la fois dans une variable. Si vous mettez une nouvelle valeur, l'ancienne est écrasée à jamais !

[VISUALIZER] {"codeStr": "age <- 25\nnom <- \\"Alice\\"\nage <- age + 1", "steps": [{"line": 1, "state": {"age": 25}, "explanation": "On crée une boîte nommée 'age' et on y range la valeur 25."}, {"line": 2, "state": {"age": 25, "nom": "\\"Alice\\""}, "explanation": "On crée une boîte 'nom' pour stocker du texte."}, {"line": 3, "state": {"age": 26, "nom": "\\"Alice\\""}, "explanation": "On prend l'ancienne valeur de 'age' (25), on ajoute 1, et on range la nouvelle valeur (26) dans la même boîte."}]}
`
                    },
                    {
                        id: 'algo_m_2_2',
                        type: 'theory',
                        title: "Les Types de Données",
                        professorSpeech: "Chaque tiroir a une forme précise. On ne met pas de l'eau dans une boîte à chaussures !",
                        duration: '10 min',
                        content: `
# 🛠️ Le Typage des Données

Pour optimiser la mémoire, il faut préciser la nature de ce que l'on stocke :

| Type | Description | Exemple |
| :--- | :--- | :--- |
| **Entier** | Nombres sans virgule | \`10\`, \`-5\`, \`0\` |
| **Réel** | Nombres à virgule | \`3.14\`, \`1.5\` |
| **Chaîne** | Texte (entre guillemets) | \`\"Bonjour\"\`, \`\"123\"\` |
| **Booléen** | État logique | \`Vrai\`, \`Faux\` |

> [!IMPORTANT]
> Une chaîne \`\"123\"\` n'est pas un nombre. On ne peut pas l'additionner. C'est juste du dessin pour l'ordinateur.
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module3',
        title: "Module 3 : Opérateurs et Calculs",
        icon: <Zap size={20} />,
        description: "Opérateurs et expressions. Faites chanter les chiffres.",
        chapters: [
            {
                id: 'chap3',
                title: "Opérations Élémentaires",
                description: "Opérateurs Arithmétiques, de Comparaison et Logiques.",
                lessons: [
                    {
                        id: 'algo_m_3_1',
                        type: 'theory',
                        title: "Calculs Arithmétiques",
                        professorSpeech: "Calculer est la base de tout. Mais attention, la machine a ses propres règles pour la division...",
                        duration: '10 min',
                        content: `
# ➕ Opérateurs Arithmétiques

Les classiques : \`+\`, \`-\`, \`*\`, \`/\`.

Mais il y en a deux très spéciaux en algorithmique :
- **DIV** (Division Entière) : Donne le quotient sans la virgule.
  \`10 DIV 3 = 3\`
- **MOD** (Modulo) : Donne le reste de la division.
  \`10 MOD 3 = 1\`

> [!TIP]
> Le Modulo est génial pour savoir si un nombre est pair : \`N MOD 2 = 0\` -> C'est pair !
`
                    },
                    {
                        id: 'algo_m_3_2',
                        type: 'theory',
                        title: "La Logique de Boole (ET, OU, NON)",
                        professorSpeech: "Le cerveau de l'ordinateur ne connaît que le Vrai ou le Faux. Maîtriser ces liens, c'est maîtriser la décision.",
                        duration: '12 min',
                        content: `
# 🚥 Opérateurs Logiques

Ils permettent de combiner plusieurs conditions :

1.  **ET (AND)** : Vrai seulement si TOUT est vrai.
2.  **OU (OR)** : Vrai si AU MOINS une est vraie.
3.  **NON (NOT)** : Inverse le résultat.

**Table de vérité simplifiée :**
- \`VRAI ET FAUX\` -> **FAUX**
- \`VRAI OU FAUX\` -> **VRAI**
- \`NON VRAI\` -> **FAUX**
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module4',
        title: "Module 4 : Les Conditions",
        icon: <GitBranch size={20} />,
        description: "Conditions et structures de contrôle. Donnez une conscience à votre programme.",
        chapters: [
            {
                id: 'chap4',
                title: "Structures de Décision",
                description: "Apprendre à bifurquer dans le code.",
                lessons: [
                    {
                        id: 'algo_m_4_1',
                        type: 'theory',
                        title: "La Condition SI... SINON",
                        professorSpeech: "C'est ici que ton programme commence à 'réfléchir'. S'il pleut, prends un parapluie. C'est aussi simple que cela.",
                        duration: '15 min',
                        content: `
# 🛣️ Les Structures Conditionnelles

Le programme n'est plus linéaire. Il peut choisir son chemin.

\`\`\`pseudo
SI (condition) ALORS
    // Bloc exécuté si condition Vraie
SINON
    // Bloc exécuté si condition Fausse
FINSI
\`\`\`

> [!NOTE]
> La condition doit toujours avoir un résultat **Booléen** (Vrai ou Faux).

[VISUALIZER] {"codeStr": "age <- 16\nSI age >= 18 ALORS\n    acces <- VRAI\nSINON\n    acces <- FAUX\nFINSI", "steps": [{"line": 1, "state": {"age": 16}, "explanation": "L'âge est initialisé à 16."}, {"line": 2, "state": {"age": 16}, "explanation": "L'ordinateur évalue la condition : 16 est-il supérieur ou égal à 18 ? C'est FAUX."}, {"line": 4, "state": {"age": 16}, "explanation": "Puisque c'est FAUX, on saute directement au bloc SINON."}, {"line": 5, "state": {"age": 16, "acces": false}, "explanation": "La variable 'acces' reçoit la valeur booléenne FAUX."}]}
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module5',
        title: "Module 5 : Les Boucles",
        icon: <Terminal size={20} />,
        description: "Maîtrisez l'art de l'automatisation. Apprenez à répéter des actions logiques sans effort.",
        chapters: [
            {
                id: 'chap5',
                title: "Tâches Répétitives",
                description: "POUR, TANT QUE et RÉPÉTER.",
                lessons: [
                    {
                        id: 'algo_m_5_1',
                        type: 'theory',
                        title: "La Boucle POUR (For)",
                        professorSpeech: "Pourquoi écrire 100 fois la même chose ? Utilise une boucle. La boucle POUR est idéale quand tu sais combien de fois tu veux danser.",
                        duration: '10 min',
                        content: `
# 🔄 La Boucle POUR

On l'utilise quand on connaît le nombre exact de répétitions à l'avance.

\`\`\`pseudo
POUR i ALLANT DE 1 À 10
    AFFICHER \"Tour numéro \", i
FINPOUR
\`\`\`

> [!IMPORTANT]
> **i** est une variable de contrôle (le compteur) qui s'incrémente automatiquement à chaque tour.

[VISUALIZER] {"codeStr": "somme <- 0\nPOUR i ALLANT DE 1 A 3\n    somme <- somme + 10\nFINPOUR", "steps": [{"line": 1, "state": {"somme": 0}, "explanation": "On initialise l'accumulateur 'somme' à 0."}, {"line": 2, "state": {"somme": 0, "i": 1}, "explanation": "La boucle démarre. Le compteur 'i' prend la valeur 1."}, {"line": 3, "state": {"somme": 10, "i": 1}, "explanation": "On ajoute 10 à la somme. (0 + 10 = 10)"}, {"line": 2, "state": {"somme": 10, "i": 2}, "explanation": "Fin du premier tour. 'i' s'incrémente et passe à 2. C'est inférieur ou égal à 3, on continue."}, {"line": 3, "state": {"somme": 20, "i": 2}, "explanation": "On ajoute 10 à la somme. (10 + 10 = 20)"}, {"line": 2, "state": {"somme": 20, "i": 3}, "explanation": "'i' passe à 3. C'est le dernier tour !"}, {"line": 3, "state": {"somme": 30, "i": 3}, "explanation": "On ajoute encore 10. (20 + 10 = 30)"}, {"line": 4, "state": {"somme": 30, "i": 3}, "explanation": "La boucle est terminée car l'itération maximale a été atteinte."}]}
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module6',
        title: "Module 6 : Algorithmes Usuels",
        icon: <Layers size={20} />,
        description: "Algorithmes de base et utilitaires. Les briques de tout programme sérieux.",
        chapters: [
            {
                id: 'chap6',
                title: "Statistiques et Calculs",
                description: "Somme, Moyenne, Maximum et Minimum.",
                lessons: [
                    {
                        id: 'algo_m_6_1',
                        type: 'theory',
                        title: "Calculer une Somme et une Moyenne",
                        professorSpeech: "Maintenant que tu maîtrises les boucles, nous pouvons faire de la vraie magie. Apprenons à accumuler des richesses... je veux dire, des données.",
                        duration: '12 min',
                        content: `
# 📊 Accumulation de Données

Pour calculer une somme dans une boucle, on utilise une variable **Accumulateur** initialisée à 0.

\`\`\`pseudo
SOMME <- 0
POUR i ALLANT DE 1 À 10
    SOMME <- SOMME + i
FINPOUR
\`\`\`

> [!TIP]
> Pour la moyenne, n'oubliez pas de diviser la somme totale par le nombre d'éléments à la fin (et vérifiez que ce nombre n'est pas 0 !).
`
                    },
                    {
                        id: 'algo_m_6_2',
                        type: 'theory',
                        title: "Recherche de Minimum/Maximum",
                        professorSpeech: "Qui est le plus grand ? Qui est le plus petit ? C'est une question récurrente. Voici comment trouver l'extrême.",
                        duration: '10 min',
                        content: `
# 🏆 Recherche de l'Extrême

Pour trouver le maximum, on commence par dire que le premier élément est le plus grand, puis on compare avec tous les autres.

\`\`\`pseudo
MAX <- premier_element
POUR chaque element
    SI element > MAX ALORS
        MAX <- element
    FINSI
FINPOUR
\`\`\`
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module7',
        title: "Module 7 : Les Tableaux",
        icon: <Hash size={20} />,
        description: "Tableaux et Listes. Organisez des masses de données dans une seule variable.",
        chapters: [
            {
                id: 'chap7',
                title: "Structures de Données Linéaires",
                description: "Indexation, Dimensions et Parcours.",
                lessons: [
                    {
                        id: 'algo_m_7_1',
                        type: 'theory',
                        title: "Le concept de Tableau",
                        professorSpeech: "Imagine un immeuble où chaque étage porte un numéro. C'est ça un tableau. Une seule adresse, mais plusieurs appartements.",
                        duration: '15 min',
                        content: `
# 🚋 Les Tableaux (Arrays)

Un tableau permet de stocker plusieurs valeurs du **même type** sous un seul nom.

**Syntaxe :**
\`VARIABLE notes : TABLEAU[1..30] d'Entiers\`

## L'Indexation (La clé)
Chaque case a un indice. 
> [!WARNING]
> En informatique, on commence souvent à compter à partir de **0** (0, 1, 2...).

\`notes[0] <- 15\` // On met 15 dans la première case.
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module8',
        title: "Module 8 : Fonctions",
        icon: <Command size={20} />,
        description: "Fonctions et Procédures. Apprenez à modulariser votre code pour le rendre immortel.",
        chapters: [
            {
                id: 'chap8',
                title: "Modularité Appliquée",
                description: "Paramètres, Valeurs de retour et Réutilisation.",
                lessons: [
                    {
                        id: 'algo_m_8_1',
                        type: 'theory',
                        title: "Concept de Fonction",
                        professorSpeech: "Ne refais jamais deux fois la même tâche. Crée une fonction, donne-lui des ordres, et laisse-la travailler pour toi.",
                        duration: '18 min',
                        content: `
# ⚙️ Fonctions et Procédures

Le but est de découper un gros problème en petits morceaux faciles à gérer.

- **Procédure** : Effectue une action (ex: Afficher un message).
- **Fonction** : Effectue un calcul et **RETOURNE** un résultat.

\`\`\`pseudo
FONCTION Additionner(a, b : Entiers) : Entier
DÉBUT
    RETOURNER a + b
FINFONCTION
\`\`\`
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module9',
        title: "Module 9 : Algorithmes de Tri",
        icon: <Layers size={20} />,
        description: "Tris et Recherches. Maîtrisez l'organisation des données à grande échelle.",
        chapters: [
            {
                id: 'chap9',
                title: "Tris et Algorithmes de Recherche",
                description: "Tri à bulles, Tri par insertion et Recherche Dichotomique.",
                lessons: [
                    {
                        id: 'algo_m_9_1',
                        type: 'theory',
                        title: "Le Tri à Bulles (Bubble Sort)",
                        professorSpeech: "C'est le tri le plus simple. Les plus grands éléments remontent comme des bulles à la surface d'un verre de soda.",
                        duration: '15 min',
                        content: `
# 🧼 Le Tri à Bulles

On compare les éléments deux par deux et on les échange s'ils sont dans le mauvais ordre. On répète l'opération jusqu'à ce que tout soit trié.

> [!NOTE]
> C'est un algorithme facile à comprendre, mais très lent pour de grandes quantités de données.
`
                    },
                    {
                        id: 'algo_m_9_2',
                        type: 'theory',
                        title: "Recherche Dichotomique (Binary Search)",
                        professorSpeech: "Chercher un mot dans un dictionnaire en tournant les pages une par une est stupide. Coupons le dictionnaire en deux à chaque fois !",
                        duration: '12 min',
                        content: `
# 🎯 Recherche Dichotomique

Pour utiliser cet algorithme, le tableau **DOIT être trié**.
À chaque étape, on regarde au milieu. Si c'est trop grand, on cherche dans la moitié gauche. Sinon, dans la droite.

**Efficacité Redoutable :** Pour 1 million de noms, il ne faut que 20 étapes maximum pour trouver quelqu'un !
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module10',
        title: "Module 10 : Complexité",
        icon: <Trophy size={20} />,
        description: "Introduction à la Complexité et Structures de Données. Devenez un pur ingénieur.",
        chapters: [
            {
                id: 'chap10',
                title: "Vers l'Infini et l'Optimisation",
                description: "Notation Big O, Piles et Files.",
                lessons: [
                    {
                        id: 'algo_m_10_1',
                        type: 'theory',
                        title: "La Notation Big O",
                        professorSpeech: "Félicitations, tu es arrivé au sommet. Maintenant, tu dois apprendre que le code le plus court n'est pas forcément le plus rapide. Mesurons la performance.",
                        duration: '20 min',
                        content: `
# 🚀 Performance et Complexité (O)

En informatique, on mesure le temps d'exécution en fonction de la taille des données (N).

- **O(1)** : Temps constant (Instantané).
- **O(N)** : Temps linéaire (Plus il y a de données, plus c'est long).
- **O(N²)** : Temps quadratique (Très lent, évitez les boucles dans les boucles !).

## Le Mot de la Fin
Tu as maintenant les bases pour devenir un architecte logiciel. N'oublie jamais : le code expire, mais la logique est éternelle.

**Mouhamed Fall** - *Créateur de Mysterious Classroom*
`
                    }
                ]
            }
        ]
    },
    {
        "id": "module11",
        "title": "Module 11: La Magie de la R\u00e9cursivit\u00e9",
        "icon": "Repeat",
        "description": "Appelez-vous vous-m\u00eame. Comprenez la puissance de la r\u00e9cursivit\u00e9.",
        "chapters": [
            {
                "id": "chap11",
                "title": "Introduction à la Récursivité",
                "description": "L'art de d\u00e9couper un probl\u00e8me en sous-probl\u00e8mes identiques.",
                "lessons": [
                    {
                        "id": "algo_m_11_1",
                        "type": "theory",
                        "title": "Principe de la Récursivité",
                        "professorSpeech": "Pour comprendre la r\u00e9cursivit\u00e9, il faut d'abord comprendre la r\u00e9cursivit\u00e9. C'est l'art de s'appeler soi-m\u00eame.",
                        "duration": "15 min",
                        "content": "# \ud83e\ude86 La R\u00e9cursivit\u00e9\n\nUne fonction **r\u00e9cursive** est une fonction qui fait appel \u00e0 **elle-m\u00eame** pendant son ex\u00e9cution.\n\n## Les 2 Lois Fondamentales\n1.  **Le cas de base (Condition d'arr\u00eat)** : Il FAUT un moment o\u00f9 la fonction arr\u00eate de s'appeler, sinon c'est la boucle infinie (Stack Overflow) !\n2.  **L'appel r\u00e9cursif** : L'\u00e9tape o\u00f9 elle s'appelle elle-m\u00eame avec un probl\u00e8me l\u00e9g\u00e8rement plus petit.\n\n```pseudo\nFONCTION CompteARebours(n : Entier)\nD\u00c9BUT\n    // 1. Cas de base\n    SI n <= 0 ALORS\n        AFFICHER \"D\u00e9collage !\"\n        RETOURNER\n    FINSI\n    \n    AFFICHER n\n    // 2. Appel r\u00e9cursif (probl\u00e8me plus petit)\n    CompteARebours(n - 1)\nFINFONCTION\n```\n"
                    }
                ]
            }
        ]
    },
    {
        "id": "module12",
        "title": "Module 12 : Les Chaînes de Caractères",
        "icon": "Type",
        "description": "L'art de traiter le texte, les mots de passe et la cryptographie.",
        "chapters": [
            {
                "id": "chap12",
                "title": "Algorithmes sur les Strings",
                "description": "Palindromes, Anagrammes et expressions r\u00e9guli\u00e8res.",
                "lessons": [
                    {
                        "id": "algo_m_12_1",
                        "type": "theory",
                        "title": "Inverser et Vérifier (Strings)",
                        "professorSpeech": "RADAR. KAYAK. LAVAL. Un mot qui se lit dans les deux sens cache des sym\u00e9tries int\u00e9ressantes.",
                        "duration": "15 min",
                        "content": "# \ud83e\ude9e Les Palindromes\n\nUn palindrome est un mot qui se lit de la m\u00eame mani\u00e8re de gauche \u00e0 droite et de droite \u00e0 gauche.\n\n**Comment v\u00e9rifier un palindrome ?**\nOn utilise g\u00e9n\u00e9ralement la technique des \"Deux Pointeurs\" (Two Pointers).\n1. Un pointeur \\`gauche\\` commence au d\u00e9but (indice 0).\n2. Un pointeur \\`droite\\` commence \u00e0 la fin.\n3. On compare, puis on rapproche les pointeurs vers le centre.\n\n```pseudo\nFONCTION EstPalindrome(mot : Cha\u00eene)\n    gauche <- 0\n    droite <- LONGUEUR(mot) - 1\n    \n    TANT QUE gauche < droite\n        SI mot[gauche] != mot[droite] ALORS\n            RETOURNER FAUX\n        FINSI\n        gauche <- gauche + 1\n        droite <- droite - 1\n    FINTANTQUE\n    \n    RETOURNER VRAI\nFINFONCTION\n```\n"
                    }
                ]
            }
        ]
    },
    {
        "id": "module13",
        "title": "Module 13 : Listes Chaînées",
        "icon": "Link",
        "description": "Une alternative dynamique aux Tableaux. La m\u00e9moire sous forme de cha\u00eene.",
        "chapters": [
            {
                "id": "chap13",
                "title": "G\u00e9rer la Fronti\u00e8re de la M\u00e9moire",
                "description": "Noeuds, Pointeurs et Allocation dynamique.",
                "lessons": [
                    {
                        "id": "algo_m_13_1",
                        "type": "theory",
                        "title": "Noeuds et Pointeurs",
                        "professorSpeech": "Imaginez des wagons de train. Chaque wagon contient une marchandise, mais aussi un crochet pointant vers le wagon suivant. C'est une liste cha\u00een\u00e9e.",
                        "duration": "20 min",
                        "content": "# \ud83d\udd17 Les Listes Cha\u00een\u00e9es (Linked Lists)\n\nContrairement \u00e0 un tableau o\u00f9 toutes les cases sont coll\u00e9es en m\u00e9moire, une **liste cha\u00een\u00e9e** est dispers\u00e9e. \n\nChaque \u00e9l\u00e9ment (appel\u00e9 **Noeud**) contient :\n1. La Donn\u00e9e (La valeur).\n2. Le **Pointeur** (L'adresse en m\u00e9moire du noeud suivant).\n\n## Pourquoi utiliser des listes cha\u00een\u00e9es ?\n- **\u2705 Ajout/Suppression ultra rapide :** O(1) si on est au bon endroit. Il suffit de changer le lien du pointeur.\n- **\u274c Acc\u00e8s tr\u00e8s lent :** O(N). Pas d'indice ! Pour voir le 50\u00e8me \u00e9l\u00e9ment, il faut parcourir les 49 premiers un par un.\n\n> [!CAUTION]\n> \"Null Pointer Exception\" : L'erreur la plus c\u00e9l\u00e8bre du monde arrive quand un pointeur regarde vers le vide (Null) au lieu d'un Noeud existant.\n"
                    }
                ]
            }
        ]
    },
    {
        "id": "module14",
        "title": "Module 14 : Arbres et Hiérarchies",
        "icon": "Network",
        "description": "Hi\u00e9rarchies et organisation spatiale des donn\u00e9es.",
        "chapters": [
            {
                "id": "chap14",
                "title": "Arbres Binaires et Graphes",
                "description": "BST, Parcours DFS et BFS.",
                "lessons": [
                    {
                        "id": "algo_m_14_1",
                        "type": "theory",
                        "title": "Les Arbres Binaires de Recherche (BST)",
                        "professorSpeech": "L'organisation parfaite n'est pas une ligne droite, c'est un arbre g\u00e9n\u00e9alogique.",
                        "duration": "25 min",
                        "content": "# \ud83c\udf33 Les Arbres Binaires\n\nUn Arbre est compos\u00e9 de **Noeuds**. Le premier noeud tout en haut est la **Racine** (Root). Les noeuds tout en bas sans enfants sont les **Feuilles** (Leaves).\n\nUn **Arbre Binaire de Recherche (BST)** a une r\u00e8gle magique :\n- Tout enfant \u00e0 **gauche** est plus PETIT que son parent.\n- Tout enfant \u00e0 **droite** est plus GRAND que son parent.\n\n## La Recherche Parfaite\nGr\u00e2ce \u00e0 cette r\u00e8gle, chercher un \u00e9l\u00e9ment coupe toujours le probl\u00e8me en deux (comme la recherche dichotomique !). Temps de recherche : **O(log N)**.\n\n```pseudo\nFONCTION RechercheArbre(racine, valeur)\n    SI racine est NULL ALORS\n        RETOURNER FAUX\n    FINSI\n    SI racine.donnee == valeur ALORS\n        RETOURNER VRAI\n    FINSI\n    SI valeur < racine.donnee ALORS\n        RETOURNER RechercheArbre(racine.gauche, valeur)\n    SINON\n        RETOURNER RechercheArbre(racine.droite, valeur)\n    FINSI\nFINFONCTION\n```\n"
                    }
                ]
            }
        ]
    },
    {
        "id": "module15",
        "title": "Module 15 : Dictionnaires et Hachage",
        "icon": "DatabaseZap",
        "description": "Comment les bases de donn\u00e9es trouvent un million d'infos instantan\u00e9ment.",
        "chapters": [
            {
                "id": "chap15",
                "title": "Tables de Hachage et Dictionnaires",
                "description": "Le secret derri\u00e8re la recherche en O(1).",
                "lessons": [
                    {
                        "id": "algo_m_15_1",
                        "type": "theory",
                        "title": "Les Fonctions de Hachage",
                        "professorSpeech": "Chercher dans un tableau prend du temps (O(N)). Imagines si tu connaissais la r\u00e9ponse instantan\u00e9ment sans chercher (O(1)). C'est le pouvoir des cl\u00e9s.",
                        "duration": "20 min",
                        "content": "# \ud83d\udddd\ufe0f Les Tables de Hachage (Hash Tables)\n\nAussi appel\u00e9es **Dictionnaires** (Python) ou **Maps** (Java/JS), c'est la structure de donn\u00e9es la plus utilis\u00e9e au monde.\n\n**Comment \u00e7a marche ?**\n1. Tuple Cl\u00e9-Valeur : Au lieu d'un index num\u00e9rique, on utilise un mot-cl\u00e9 (ex: \"nom\" -> \"Alice\").\n2. **La Fonction de Hachage** : Elle prend le mot-cl\u00e9, fait des math\u00e9matiques bizarres dessus, et crache un num\u00e9ro. \n3. Ce num\u00e9ro indique EXACTEMENT \u00e0 quel endroit dans la m\u00e9moire la valeur est stock\u00e9e.\n\n## Le probl\u00e8me des Collisions\nQue se passe-t-il si \"Alice\" et \"Bob\" donnent le m\u00eame num\u00e9ro apr\u00e8s calcul math\u00e9matique ? C'est une **collision**. L'ordinateur stocke alors les deux dans la m\u00eame case (souvent via une mini-liste cha\u00een\u00e9e).\n\n> [!TIP]\n> C'est avec des tables de hachage que les jeux vid\u00e9o v\u00e9rifient instantan\u00e9ment si le pseudo que vous voulez prendre est d\u00e9j\u00e0 utilis\u00e9 parmi des millions de joueurs !\n"
                    }
                ]
            }
        ]
    },
    {
        "id": "module16",
        "title": "Module 16 : Algorithmes Avancés",
        "icon": "Crown",
        "description": "Programmation Dynamique, Algorithmes Gloutons et Pathfinding.",
        "chapters": [
            {
                "id": "chap16",
                "title": "Ma\u00eetrise Algorithmique",
                "description": "Comment Google Maps trouve le chemin le plus court.",
                "lessons": [
                    {
                        "id": "algo_m_16_1",
                        "type": "theory",
                        "title": "Programmation Dynamique (DP)",
                        "professorSpeech": "Ceux qui oublient le pass\u00e9 sont condamn\u00e9s \u00e0 le r\u00e9p\u00e9ter. La programmation dynamique, c'est se souvenir de ce qu'on a d\u00e9j\u00e0 calcul\u00e9.",
                        "duration": "30 min",
                        "content": "# \ud83e\udde0 La Programmation Dynamique\n\nC'est la technique reine des entretiens chez Google, Microsoft ou Meta.\n\nLe principe est la **M\u00e9mo\u00efsation** (Rappeler \u00e0 la m\u00e9moire).\nSi vous calculez Fibonacci(50) de mani\u00e8re r\u00e9cursive classique, votre ordinateur va exploser car il recalcule les m\u00eames choses des milliards de fois.\n\n**La Solution DP :**\nSi on demande Fibonacci(5), et qu'on a d\u00e9j\u00e0 calcul\u00e9 Fibonacci(5) plus t\u00f4t, on sauvegarde la r\u00e9ponse dans un tableau. La prochaine fois, on lit le tableau (O(1)) au lieu de refaire le calcul !\n\n1. D\u00e9composer le probl\u00e8me en sous-probl\u00e8mes.\n2. R\u00e9soudre chaque sous-probl\u00e8me une seule fois.\n3. Stocker la solution dans une table.\n"
                    },
                    {
                        "id": "algo_m_16_2",
                        "type": "theory",
                        "title": "Le Compas d'Or : A* et Pathfinding",
                        "professorSpeech": "Comment aller d'un point A \u00e0 un point B ? Le GPS ne devine pas, il calcule. Bienvenue dans les Graphes pond\u00e9r\u00e9s.",
                        "duration": "30 min",
                        "content": "# \ud83d\uddfa\ufe0f Pathfinding (Recherche de chemin)\n\nComment un PNJ dans un jeu vid\u00e9o trouve son chemin vers vous en \u00e9vitant les murs ?\n\n## L'algorithme de Dijkstra\nIl explore comme une flaque d'eau : il teste tous les chemins en cercles concentriques grandissants jusqu'\u00e0 trouver la cible. C'est s\u00fbr \u00e0 100%, mais c'est tr\u00e8s lent.\n\n## L'algorithme A*\nIl ajoute une **Heuristique** (Une supposition intelligente). Au lieu d'explorer dans toutes les directions, il calcule une \"distance \u00e0 vol d'oiseau\" et priorise les cases qui se rapprochent physiquement de la cible.\n\n> [!NOTE]\n> Si vous jouez aux \u00c9checs contre l'ordinateur, l'IA utilise un algorithme appel\u00e9 **Minimax** avec \u00e9lagage Alpha-Beta, qui est une exploration de l'arbre des coups possibles ! Vous savez maintenant comment le monde num\u00e9rique est b\u00e2ti.\n\n**Toutes nos f\u00e9licitations, Ma\u00eetre.** Vous avez atteint la limite de l'enseignement classique. Le reste s'\u00e9crit avec vos doigts sur le clavier.\n"
                    }
                ]
            }
        ]
    }
]
