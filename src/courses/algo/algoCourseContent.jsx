import React from 'react';
import { Cpu, Database, Command, Box, GitBranch, Sparkles, Trophy, Zap, Terminal, Hash, Layers } from 'lucide-react';

export const algoCourseData = [
    {
        id: 'module1',
        title: "Module 1: L'Éveil du Maître",
        icon: <Cpu size={20} />,
        description: "Comprenez l'essence de la logique pure. Apprenez à penser avant de coder.",
        chapters: [
            {
                id: 'chap1',
                title: "La Genèse Algorithmique",
                description: "Qu'est-ce qu'un algorithme et pourquoi la machine est-elle 'idiote' ?",
                lessons: [
                    {
                        id: 'algo_m_1_1',
                        type: 'theory',
                        title: "Le Pouvoir de la Logique",
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
                        title: "Quiz : Nature de la Pensée",
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
                        title: "Le Squelette de la Pensée (Pseudo-code)",
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
        title: "Module 2: L'Arsenal de Données",
        icon: <Database size={20} />,
        description: "Variables et Types Primitifs. Apprenez à stocker l'information efficacement.",
        chapters: [
            {
                id: 'chap2',
                title: "Les Boîtes de Mémoire",
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
                        title: "Les 4 Types Élémentaires",
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
        title: "Module 3: Les Maîtres des Signes",
        icon: <Zap size={20} />,
        description: "Opérateurs et expressions. Faites chanter les chiffres.",
        chapters: [
            {
                id: 'chap3',
                title: "Calculs et Logique",
                description: "Opérateurs Arithmétiques, de Comparaison et Logiques.",
                lessons: [
                    {
                        id: 'algo_m_3_1',
                        type: 'theory',
                        title: "L'Arithmétique Profane",
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
        title: "Module 4: Le Don du Choix",
        icon: <GitBranch size={20} />,
        description: "Conditions et structures de contrôle. Donnez une conscience à votre programme.",
        chapters: [
            {
                id: 'chap4',
                title: "Si, Sinon et Cas",
                description: "Apprendre à bifurquer dans le code.",
                lessons: [
                    {
                        id: 'algo_m_4_1',
                        type: 'theory',
                        title: "Le SI : L'Aiguillage",
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
        title: "Module 5: La Danse de l'Infini",
        icon: <Terminal size={20} />,
        description: "Les Boucles. Automatisez les tâches répétitives sans effort.",
        chapters: [
            {
                id: 'chap5',
                title: "Itérations et Répétitions",
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
        title: "Module 6: Savoir Commun",
        icon: <Layers size={20} />,
        description: "Algorithmes de base et utilitaires. Les briques de tout programme sérieux.",
        chapters: [
            {
                id: 'chap6',
                title: "Les Algorithmes Classiques",
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
                        title: "Trouver le Maître (Max/Min)",
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
        title: "Module 7: Le Train du Savoir",
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
        title: "Module 8: Le Diviser pour Régner",
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
                        title: "Les Fonctions : Vos Sous-Traitants",
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
        title: "Module 9: L'Art de l'Ordre",
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
        title: "Module 10: L'Aube de l'Efficacité",
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
    }
];
