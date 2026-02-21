import React from 'react';
import { Cpu, Database, Command, Box, GitBranch, Sparkles, Trophy, Zap, Terminal, Hash, Layers } from 'lucide-react';

export const algoCourseData = [
    {
        id: 'module1',
        title: "Module 1 : L'Art de Parler aux Machines",
        icon: <Cpu size={20} />,
        description: "Apprenez à structurer votre pensée logique avant d'écrire une seule ligne de code. L'ordinateur est obéissant, mais très bête.",
        chapters: [
            {
                id: 'chap1',
                title: "Bases du Raisonnement",
                description: "Qu'est-ce qu'un algorithme et pourquoi l'ordinateur a besoin qu'on lui tienne la main ?",
                lessons: [
                    {
                        id: 'algo_m_1_1',
                        type: 'theory',
                        title: "Qu'est-ce qu'un Algorithme ?",
                        professorSpeech: "Oublie les films de pirates informatiques. Programmer, c'est comme donner la recette d'un gâteau hyper compliqué à un enfant de 4 ans.",
                        duration: '10 min',
                        content: `
# 🧠 L'Essence de l'Algorithmique

La plus grande erreur est de penser qu'apprendre à coder, c'est apprendre un "langage" (comme l'Anglais ou l'Espagnol). Non, coder, **c'est apprendre à penser logicien**. 

> [!IMPORTANT]
> **L'Algorithme est Universel** : Que vous utilisiez Python, Java ou C++, la logique reste *exactement* la même. Un algorithme, c'est la recette. Python, c'est juste la langue dans laquelle la recette est écrite.

[?] Mais alors, l'ordinateur ne devine rien ? | Pas du tout ! L'ordinateur est une machine incroyablement puissante... mais **totalement idiote**. Elle n'a aucune imagination, aucune intuition, aucun bon sens.

## L'Analogie des Crêpes 🥞
Imagine que tu demandes à ton grand frère : *"Fais-moi des crêpes"*. 
Il sait qu'il doit ouvrir le frigo, prendre du lait, casser des œufs, chauffer la poêle... Il a **l'intuition humaine**.

Si tu dis à un ordinateur *"Fais-moi des crêpes"*, il te regardera fixement et plantera. Pourquoi ? Parce qu'il ne sait pas ce qu'est une crêpe. Il ne sait pas ce qu'est un frigo. Il ne sait même pas ce qu'est un bras g pour ouvrir le frigo !

Pour l'ordinateur, tu dois dire :
1. Avance ton bras gauche de 40 centimètres.
2. Serre la poignée avec une force de 2 Newtons.
3. Tire vers toi.
4. Prends le contenant cylindrique blanc (le lait).
...

## Définition
Un **algorithme** est une **suite d'actions précises, ordonnées et limitées dans le temps**, qui permet de résoudre un problème ou d'accomplir une tâche. C'est tout !
`
                    },
                    {
                        id: 'algo_m_1_2',
                        type: 'quiz',
                        title: "Quiz : Le Cerveau de la Machine",
                        professorSpeech: "Voyons si tu as compris comment fonctionne ton nouvel ami stupide.",
                        question: "Si tu dis à un ordinateur 'Sors le chien !', que risque-t-il de se passer ?",
                        options: [
                            { id: 'a', text: "L'ordinateur va analyser la météo et sortir le chien.", correct: false },
                            { id: 'b', text: "L'ordinateur va mordre le chien.", correct: false },
                            { id: 'c', text: "L'ordinateur va planter, car il ne sait pas ce qu'est une porte, un chien, ou l'action de marcher.", correct: true }
                        ],
                        explanation: "Exactement ! La machine est littérale. Elle n'a aucun contexte, ni intuition. Il faut lui expliquer comment déverrouiller la porte, avec quelle main prendre la laisse, etc."
                    },
                    {
                        id: 'algo_m_1_3',
                        type: 'theory',
                        title: "Le Célèbre Pseudo-code",
                        professorSpeech: "Avant de parler Python ou Javascript, on utilise une langue universelle : le Pseudo-code. C'est du français mélangé à un poil de logique.",
                        duration: '12 min',
                        content: `
# 🦴 Le Squelette de ta Pensée

Le **Pseudo-code**, c'est génial. Ça te permet de te concentrer sur la résolution du problème sans te prendre la tête avec l'oubli d'un point-virgule ou d'une parenthèse.

Voici la forme sacrée d'un petit programme :

\`\`\`pseudo
ALGORITHME Faire_Des_Crepes

VARIABLES
    // Ici, on liste le matériel nécessaire (Ingrédients, Saladier)

DÉBUT
    // Ici, on écrit les étapes (L'Action)
    // 1. Casser l'oeuf
    // 2. Mettre la farine
FIN
\`\`\`

## La Trinité du Code :
Peu importe le logiciel du monde (Facebook, un jeu vidéo, ou Word), il fonctionne toujours avec ces 3 étapes :
1. **Entrée (Input)** : On reçoit une information. (ex: L'utilisateur clique sur *Like*).
2. **Traitement (Process)** : On calcule. (ex: On ajoute +1 au compteur de likes).
3. **Sortie (Output)** : On affiche le résultat. (ex: Le petit pouce devient bleu).

> [!TIP]
> Ne saute jamais sur ton clavier sans réfléchir sur papier avant. Si tu ne peux pas expliquer ton algorithme en Pseudo-code, tu ne pourras le coder dans aucun langage.
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module2',
        title: "Module 2 : La Mémoire de l'Ordinateur",
        icon: <Database size={20} />,
        description: "Comprendre comment la machine mémorise les choses. Les Variables sont comme des boîtes en carton magiques.",
        chapters: [
            {
                id: 'chap2',
                title: "Les Tiroirs Magiques",
                description: "Apprends à garder des informations en mémoire pour les réutiliser.",
                lessons: [
                    {
                        id: 'algo_m_2_1',
                        type: 'theory',
                        title: "Qu'est-ce qu'une Variable ?",
                        professorSpeech: "Imagine que la mémoire de l'ordinateur est comme un gigantesque mur rempli de milliers de tiroirs vides. Une variable, c'est simplement un de ces tiroirs sur lequel tu colles une étiquette.",
                        duration: '15 min',
                        content: `
# 📦 Les Variables : Garder un Souvenir

En algorithmique, on ne peut absolument rien faire si l'on ne peut pas **se souvenir** de quelque chose. C'est le rôle de la **Variable**.

**Une variable possède 3 pouvoirs :**
1.  **Un Nom** (L'étiquette) : Pour retrouver la bonne boîte (ex: \`scoreJoueur\`).
2.  **Un Type** (La forme) : Qu'est-ce qu'elle accepte ? (Seulement des nombres ? Du texte ?).
3.  **Une Valeur** (Le contenu) : Ce qu'il y a à l'intérieur en ce moment (ex: \`100\`).

## Créer vs Remplir
- **Déclarer (Créer la boîte)** : On prend un tiroir vide et on met une étiquette.
  \`VARIABLE score : Entier\` *(Ici on dit : cette boîte s'appelle 'score' et n'accepte que des nombres entiers)*
- **Affecter (Remplir la boîte)** : On met quelque chose dedans.
  \`score <- 100\` *(On lit : score "reçoit" 100)*

> [!CAUTION]
> **Règle d'Or Mnémonique** : Une boîte ne peut contenir qu'un seul objet à la fois ! Si le tiroir \`score\` contient 100, et que tu dis \`score <- 50\`, le 100 est détruit pour toujours et remplacé par 50.

[VISUALIZER] {"codeStr": "vies <- 3\\nnom <- \\"Héros\\"\\nvies <- vies - 1", "steps": [{"line": 1, "state": {"vies": 3}, "explanation": "On crée une boîte nommée 'vies' et on y glisse le chiffre 3."}, {"line": 2, "state": {"vies": 3, "nom": "\\"Héros\\""}, "explanation": "On crée une deuxième boîte 'nom' et on y glisse le texte 'Héros'."}, {"line": 3, "state": {"vies": 2, "nom": "\\"Héros\\""}, "explanation": "Aïe, on s'est pris un coup. On regarde ce qu'il y a dans 'vies' (3), on enlève 1, ça fait 2, et on remet ce nouveau résultat (2) dans la boîte 'vies'. L'ancien 3 n'existe plus."}]}
`
                    },
                    {
                        id: 'algo_m_2_2',
                        type: 'theory',
                        title: "Les Formes de Boîtes (Typage)",
                        professorSpeech: "Chaque boîte a une forme précise pour ranger des choses précises. On ne met pas de l'eau dans une boîte à chaussures !",
                        duration: '10 min',
                        content: `
# 🛠️ Les Types de Données

Pour que l'ordinateur ne s'emmêle pas les pinceaux et soit ultra-rapide, il faut lui dire à l'avance "ce" qu'on va ranger.

| Type | On y met quoi ? | Exemple |
| :--- | :--- | :--- |
| **Entier** | Les nombres pile poil | \`10\`, \`-5\`, \`0\` |
| **Réel** | Les nombres à virgule | \`3.14\`, \`1.5\` |
| **Chaîne** | Du texte (Toujours entre " ") | \`\"Bonjour\"\`, \`\"Le joueur 1 a gagné\"\` |
| **Booléen** | Un Oui/Non (Interrupteur) | \`Vrai\`, \`Faux\` |

> [!IMPORTANT]
> **Attention Piège Mortel** : Une chaîne \`\"123\"\` n'est **PAS** un nombre. Pour l'ordinateur, c'est comme le dessin d'un 1, d'un 2 et d'un 3.  Si tu essaies de faire \`\"123\" + \"1\"\`, l'ordinateur ne fera pas 124, il fera \`\"1231\"\` ! C'est ce qu'on appelle "coller" (concaténer) du texte.
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module3',
        title: "Module 3 : Les Calculs et la Magie Logique",
        icon: <Zap size={20} />,
        description: "Apprends à faire des maths comme un ordinateur, et découvre les opérateurs logiques 'ET' et 'OU'.",
        chapters: [
            {
                id: 'chap3',
                title: "Les Manipulations Basiques",
                description: "Faisons souffrir les nombres et connectons les fils logiques.",
                lessons: [
                    {
                        id: 'algo_m_3_1',
                        type: 'theory',
                        title: "Les Outils de Calcul",
                        professorSpeech: "L'ordinateur est le meilleur calculateur du monde. Mais il a sa façon spéciale gérer les divisions. Le reste est de la bouillie pour chat.",
                        duration: '10 min',
                        content: `
# ➕ L'Arithmétique

Les classiques que tu connais déjà  : 
*   **Addition** : \`+\`
*   **Soustraction** : \`-\`
*   **Multiplication** : \`*\` *(L'étoile est vitale, oublie la croix 'x' à l'école !)*
*   **Division** : \`/\`

## Les deux armes secrètes du Codeur

En plus des classiques, l'algorithmique possède deux armes très spéciales liées à la grande école primaire : la division Euclidienne.

*   **DIV** (La division sans virgule) : Si on a 10 bonbons et qu'on est 3 enfants, combien de bonbons entiers a chaque enfant ? 
    👉 \`10 DIV 3 = 3\` (Il ne donne que la part entière).
*   **MOD** (Le Modulo, ou le Reste) : Après avoir distribué ces bonbons, combien reste-t-il dans le sac pour moi ? On a distribué 3x3=9, il restait 10... 
    👉 \`10 MOD 3 = 1\` (Il donne le Reste !).

> [!TIP]
> Le Modulo (\`MOD\`) est le meilleur ami du développeur. Il sert par exemple à savoir très vite si un nombre est "Pair" ! Si \`Nombre MOD 2 = 0\`, alors le nombre se coupe parfaitement par deux, donc il est Pair.
`
                    },
                    {
                        id: 'algo_m_3_2',
                        type: 'theory',
                        title: "Les Interrupteurs de la Réalité (ET / OU)",
                        professorSpeech: "Laisse les chiffres. Pense interrupteur. Allumé ou Éteint. Vrai ou Faux. Voici l'algèbre de Boole.",
                        duration: '12 min',
                        content: `
# 🚥 La Logique de Boole

L'ordinateur n'est en fait qu'une collection de milliards de petits interrupteurs (des transistors). Un interrupteur est soit allumé (Vrai, 1), soit éteint (Faux, 0).

La Logique de Boole permet de lier plusieurs de ces interrupteurs pour prendre des décisions. C'est le **Coeur de l'Intelligence Informatique.**

Il y a 3 portes magiques :

### 1. La Porte "ET" (AND) : Le Garde Sévère
La porte s'ouvre **SEULEMENT SI** toutes les clés fonctionnent.
- J'ai mon Billet \`ET\` j'ai mon Passeport ➡️ **L'avion part (VRAI)**
- J'ai mon Billet \`ET\` je n'ai pas mon Passeport ➡️ **Je reste à terre (FAUX)**

### 2. La Porte "OU" (OR) : Le Garde Sympa
La porte s'ouvre si **AU MOINS UNE** clé fonctionne.
- J'ai mon Gilet Jaune \`OU\` j'ai mon Triangle ➡️ **Je suis en règle (VRAI)**
- Je n'ai ni gilet \`OU\` ni triangle ➡️ **Amende (FAUX)**

### 3. La Porte "NON" (NOT) : L'Adolescent Rebelle
Il dit l'inverse de tout.
- Le jour est levé ? (Vrai). \`NON\`(Le jour est levé) ➡️ **La Nuit (Faux)**.
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module4',
        title: "Module 4 : L'Intelligence Artificielle (Les Conditions)",
        icon: <GitBranch size={20} />,
        description: "Donnez le pouvoir de choisir à votre programme. C'est ici que l'ordinateur fait semblant d'être intelligent.",
        chapters: [
            {
                id: 'chap4',
                title: "Les Embranchements du Destin",
                description: "Le fameux SI ... ALORS ... SINON.",
                lessons: [
                    {
                        id: 'algo_m_4_1',
                        type: 'theory',
                        title: "Le Couteau Suisse : SI... SINON",
                        professorSpeech: "C'est la brique fondamentale de l'Intelligence Artificielle. Un programme sans 'SI' est comme un train sur de simples rails : il va tout droit sans jamais choisir sa destination.",
                        duration: '15 min',
                        content: `
# 🛣️ Les Choix : SI / ALORS / SINON

Jusqu'à maintenant, nos programmes fonçaient tout droit, lisant de haut en bas sans jamais réfléchir. 
Avec les **Conditions**, on peut créer des embranchements, comme dans un livre dont vous êtes le héros.

\`\`\`pseudo
SI (Il pleut) ALORS
    Je prends mon parapluie
SINON
    Je mets mes lunettes de soleil
FINSI
\`\`\`

> [!NOTE]
> La condition entre les parenthèses (Il pleut) doit **TOUJOURS** répondre à une question de type **Booléen** (Vrai ou Faux).

## Le jeu du Videur de Boîte de Nuit
Imagine un script videur appelé *videur.exe* :

[VISUALIZER] {"codeStr": "age_client <- 16\\nSI age_client >= 18 ALORS\\n    AFFICHER \\"Entrez, amusez-vous !\\"\\nSINON\\n    AFFICHER \\"Désolé, reviens dans quelques années.\\"\\nFINSI", "steps": [{"line": 1, "state": {"age_client": 16}, "explanation": "Un client arrive. Son âge est 16."}, {"line": 2, "state": {"age_client": 16}, "explanation": "Le vigile (l'ordinateur) regarde : 16 est-il supérieur ou égal à 18 ? Non, c'est FAUX."}, {"line": 4, "state": {"age_client": 16}, "explanation": "Puisque c'est FAUX, le vigile ignore complètement la phrase d'entrée et saute directement au bloc SINON."}, {"line": 5, "state": {"age_client": 16}, "explanation": "Le vigile recalera le client poliment."}]}
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module5',
        title: "Module 5 : Le Travail à la Chaîne (Boucles)",
        icon: <Terminal size={20} />,
        description: "L'ordinateur ne se fatigue jamais. Apprends à lui faire répéter 10 000 fois la même chose en 3 lignes de code.",
        chapters: [
            {
                id: 'chap5',
                title: "L'Automatisation Absolue",
                description: "Les boucles POUR",
                lessons: [
                    {
                        id: 'algo_m_5_1',
                        type: 'theory',
                        title: "La magie de la Boucle POUR",
                        professorSpeech: "Imaginons qu'on te punisse à écrire 100 fois 'Je ne jetterai plus d'avions en papier'. À la main, c'est dur. En code, c'est fait en 3 lignes et 0.001 seconde.",
                        duration: '10 min',
                        content: `
# 🔄 La Boucle POUR (For)

En informatique, la règle sacrée s'appelle **DRY** (Don't Repeat Yourself / Ne te répète pas).
Si tu dois faire la même chose 100 fois, tu n'écris pas 100 lignes de code. Tu écris une **Boucle**.

La boucle **POUR** s'utilise quand tu sais **exactement** combien de fois tu veux tourner.

\`\`\`pseudo
POUR i ALLANT DE 1 À 100
    AFFICHER "Tour numéro : ", i
FINPOUR
\`\`\`

> [!IMPORTANT]
> **i** (pour Indice ou Index) est la variable la plus célèbre du monde. C'est un **Compteur automatique**. Il commence à 1, fait le tour, passe à 2 tout seul, refait le tour, et s'arrête strictement à 100.

[VISUALIZER] {"codeStr": "tresor <- 0\\nPOUR i ALLANT DE 1 A 3\\n    tresor <- tresor + 10\\nFINPOUR", "steps": [{"line": 1, "state": {"tresor": 0}, "explanation": "Le coffre est vide au départ (0)."}, {"line": 2, "state": {"tresor": 0, "i": 1}, "explanation": "La boucle démarre. Le compteur 'i' prend la valeur 1. C'est le premier tour."}, {"line": 3, "state": {"tresor": 10, "i": 1}, "explanation": "On met 10 pièces dans le coffre (0 + 10 = 10)."}, {"line": 2, "state": {"tresor": 10, "i": 2}, "explanation": "Fin du tour. Le compteur 'i' avance tout seul à 2."}, {"line": 3, "state": {"tresor": 20, "i": 2}, "explanation": "On remet 10 pièces (10 + 10 = 20)."}, {"line": 2, "state": {"tresor": 20, "i": 3}, "explanation": "Le compteur arrive à 3. C'est le dernier tour !"}, {"line": 3, "state": {"tresor": 30, "i": 3}, "explanation": "On ajoute les dernières 10 pièces (20 + 10 = 30)."}, {"line": 4, "state": {"tresor": 30, "i": 3}, "explanation": "Et voilà, la boucle est finie, on sort !"}]}
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
        description: "Apprenez à organiser les données à grande échelle. Maîtrisez le tri à bulles et la recherche dichotomique.",
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

---
**Félicitations, Apprenti.** 
Tu as acquis les bases universelles de la logique de programmation. Ces concepts sont les fondations de tous les langages que tu rencontreras : Python, C, JavaScript ou Java. 
Tu es maintenant prêt à quitter la théorie pure pour la pratique réelle.

**Mouhamed Fall** - *Créateur de Mysterious Classroom*
`
                    }
                ]
            }
        ]
    }
];
