import React from 'react';
import { Cpu, Database, Repeat, Box, GitBranch, Sparkles, Trophy } from 'lucide-react';

export const algoCourseData = [
    {
        id: 'module1',
        title: 'Module 1: L\'Éveil du Codeur (Introduction)',
        icon: <Cpu size={20} />,
        description: "Le fondement absolu. Découvrez ce qu'est vraiment un algorithme et pourquoi ce N'EST PAS un langage de programmation.",
        chapters: [
            {
                id: 'chap1',
                title: "Le Mythe du Langage",
                description: "L'Algorithmique n'est pas du code, c'est de la pensée.",
                lessons: [
                    {
                        id: 'algo_m_1_1',
                        type: 'theory',
                        title: "Qu'est-ce qu'un Algorithme ?",
                        professorSpeech: "Ah, te voilà ! Bienvenue dans ton premier cours de maître. Oublie tout ce que tu sais sur les ordinateurs pour l'instant. Sais-tu que l'algorithme est né bien avant l'informatique ?",
                        duration: '10 min',
                        content: `
# 🧠 L'Art de la Pensée Structurée

La plus grande erreur d'un débutant est de croire qu'apprendre à programmer, c'est apprendre un langage (comme Python, C ou Java). C'est faux. **Apprendre à programmer, c'est apprendre l'algorithmique.**

Un langage n'est qu'un outil de traduction. L'algorithme, c'est l'intelligence pure.

## 🛑 L'Algorithmique N'EST PAS un langage

> **Règle d'or :** Un algorithme est universel. Il s'en fiche complètement de savoir si vous allez utiliser Python, Java ou du C++. 

Pensez à un roman : l'histoire (l'algorithme) reste la même, que le livre soit traduit en français, en anglais ou en japonais (les langages de programmation).

## Mais alors, c'est quoi ?
Un algorithme est une **suite d'opérations ou d'instructions finies** permettant de résoudre un problème précis.

**L'Analogie de la Recette de Cuisine :**
Pour faire un gâteau (le problème à résoudre), vous suivez une recette.
1. Prendre 3 œufs.
2. Casser les œufs dans un bol.
3. Ajouter 100g de sucre.
4. Mélanger jusqu'à ce que ce soit blanc.

Si vous dites simplement "Fais un gâteau", l'ordinateur va planter. Il est extrêmement obéissant, mais totalement dénué d'initiative. **Il faut tout lui détailler, étape par étape.**

## Pourquoi c'est le pouvoir ultime ?
Une fois que vous maîtrisez la logique algorithmique, apprendre un nouveau langage de programmation ne vous prendra que quelques jours. Vous saurez déjà *comment* réfléchir ; il ne restera qu'à chercher la traduction.
            `
                    },
                    {
                        id: 'algo_m_1_2',
                        type: 'quiz',
                        title: "Quiz : La nature de l'algorithme",
                        professorSpeech: "Voyons si tu as bien saisi l'essence de ma leçon. Réponds à cette petite énigme sur les algorithmes...",
                        question: "Sachant ce que nous venons de voir, comment définiriez-vous la relation entre un algorithme et un langage de programmation ?",
                        options: [
                            { id: 'a', text: "L'algorithme est spécifique à un langage comme Python ou C.", correct: false },
                            { id: 'b', text: "L'algorithme est l'idée logique universelle, le langage n'est que l'outil de traduction pour la machine.", correct: true },
                            { id: 'c', text: "Un algorithme est un petit programme écrit en langage machine.", correct: false }
                        ],
                        explanation: "Exact ! L'algorithme est complètement indépendant de la technologie. C'est l'essence même de votre solution."
                    },
                    {
                        id: 'algo_m_1_3',
                        type: 'theory',
                        title: "L'Anatomie d'un Algorithme",
                        professorSpeech: "Excellent ! Maintenant, regardons comment on construit le 'squelette' d'une pensée logique. C'est ce qu'on appelle l'anatomie.",
                        duration: '8 min',
                        content: `
# 🦴 Squelette d'un Algorithme

Pour écrire un algorithme clair, on utilise un "pseudo-code". C'est un langage hybride, mi-français, mi-code, compréhensible par tout humain logique.

Voici la structure de base qui sera notre bible :

\`\`\`
ALGORITHME NomDeLAlgorithme

VARIABLES
    // C'est ici qu'on prépare nos ingrédients (les boîtes mémoires)

DÉBUT
    // C'est ici que l'action commence
    // On écrit les instructions pas à pas
FIN
\`\`\`

## Les 3 phases obligatoires :
1. **Les Entrées (Input)** : Qu'est-ce qu'on donne à l'algorithme pour démarrer ? (ex: les ingrédients de la recette).
2. **Le Traitement (Process)** : Qu'est-ce qu'on en fait ? (ex: mélanger et cuire).
3. **Les Sorties (Output)** : Quel est le résultat final ? (ex: le gâteau prêt à manger).

Dès la prochaine leçon, nous allons plonger dans le concept de "Variables", qui représentent les entrées de notre système. Préparez-vous !
            `
                    }
                ]
            }
        ]
    },
    {
        id: 'module2',
        title: 'Module 2: Les Boîtes Magiques (Données)',
        icon: <Database size={20} />,
        description: "Le concept fondamental de la mémoire : les variables et les types de données.",
        chapters: [
            {
                id: 'chap2',
                title: "Stocker l'Information",
                description: "Comment l'ordinateur se souvient des choses ?",
                lessons: [
                    {
                        id: 'algo_m_2_1',
                        type: 'theory',
                        title: "Les Variables : La Mémoire de l'Ordi",
                        professorSpeech: "Imagine que ton cerveau est comme une étagère vide. Pour ne rien oublier, tu as besoin de boîtes. Ces boîtes, ce sont nos variables !",
                        duration: '15 min',
                        content: `
# 📦 Les Variables

L'ordinateur est un poisson rouge. Si vous ne mettez pas une information dans une boîte clairement nommée, il l'oublie à la seconde suivante.

Ces "boîtes", on les appelle des **Variables**. 

## Les 3 règles d'une variable :
Chaque variable que vous créez possède obligatoirement :
1. **Un Nom (Identifiant)** : Pour pouvoir la rappeler plus tard. (ex: \`scoreJoueur\`).
2. **Une Valeur** : Son contenu actuel. (ex: \`42\`).
3. **Un Type** : L'étiquette sur la boîte qui dit "Ici, on ne stocke que des nombres" ou "Ici, on ne stocke que du texte".

> **Pourquoi "Variable" ?** Parce que son contenu peut *varier* (changer) au cours du temps. Si je gagne un point, la boîte \`scoreJoueur\` qui contenait 42 va se vider et je vais mettre 43 à la place.

## L'Affectation (L'Opération de Base)
L'action Ranger une valeur dans une boîte s'appelle l'**affectation**. On utilise souvent le symbole \`<-\` ou \`=\`.

\`\`\`
VARIABLES
    score : Entier

DÉBUT
    score <- 10  // Je mets 10 dans la boîte score
    score <- 20  // J'écrase le 10, la boîte contient maintenant 20
FIN
\`\`\`
            `
                    },
                    {
                        id: 'algo_m_2_2',
                        type: 'quiz',
                        title: "Quiz : Mutabilité des Boîtes",
                        professorSpeech: "D'accord, voyons si tu as compris comment les valeurs se déplacent d'une boîte à l'autre. Ne tombe pas dans mon piège !",
                        question: "Dans mon algorithme, je fais les actions suivantes : `A <- 5`, puis `B <- A`, puis `A <- 10`. Que contient la variable B à la fin ?",
                        options: [
                            { id: 'a', text: "B contient 10, car elle suit A.", correct: false },
                            { id: 'b', text: "B contient 5, car on a copié la valeur de A quand A valait 5.", correct: true },
                            { id: 'c', text: "L'ordinateur plante car on a changé A.", correct: false }
                        ],
                        explanation: "Parfait ! `B <- A` crée une COPIE de ce qu'il y a dans A à cet instant précis (5). Si A change plus tard, B s'en moque, B a sa propre valeur sécurisée dans sa boîte."
                    },
                    {
                        id: 'algo_m_2_3',
                        type: 'theory',
                        title: "Les Types de Données",
                        professorSpeech: "Une boîte à chaussures ne sert pas à ranger de la soupe, n'est-ce pas ? En informatique, chaque boîte a son 'type'. C'est crucial pour ne pas tout mélanger.",
                        duration: '10 min',
                        content: `
# 🏷️ Les Types : Trier les Choux et les Carottes

On ne mélange pas des nombres avec des mots. Le processeur traite différemment l'addition mathématique "1 + 1 = 2" et la fusion de texte "A + B = AB".

C'est pour cela qu'il faut préciser le **Type** des variables.

## Les 4 Types Universels :
1. **L'Entier (Integer)** : Les nombres sans virgule (\`1\`, \`-45\`, \`0\`, \`1000\`). Idéal pour compter.
2. **Le Réel (Float / Double)** : Les nombres à virgule (\`3.14\`, \`-0.5\`). Idéal pour la physique ou les prix en euros.
3. **La Chaîne de caractères (String)** : Du texte. On l'entoure toujours de guillemets pour que l'ordi comprenne que ce n'est pas une commande. (\`"Bonjour"\`, \`"A"\`, \`"Le chat"\`).
4. **Le Booléen (Boolean)** : Le yin et le yang de l'informatique. Il ne prend que deux valeurs : **VRAI** (True / 1) ou **FAUX** (False / 0). Idéal pour répondre à des questions binaires (Le joueur est-il vivant ?).
            `
                    },
                    {
                        id: 'algo_m_2_4',
                        type: 'practice',
                        title: "Manipulation Pratique (Pseudo-Code)",
                        professorSpeech: "Assez parlé ! C'est à toi de jouer. Ouvre ton grimoire et déclare tes premières variables. Montre-moi que tu es un vrai bâtisseur.",
                        description: "Créez une variable de type Entier et une autre de type Texte.",
                        instruction: "Déclarez les variables 'age' (Entier) et 'nom' (Chaîne) puis assignez '25' à 'age' et '\"Héros\"' à 'nom'.",
                        initialCode: "VARIABLES\n    // Déclarez et assignez ici\n\nDÉBUT\n    \nFIN",
                        hints: ["N'oubliez pas les guillemets pour le texte ! Ex: nom <- \"Héros\""],
                        validationRegex: /age\s*(?:<-|=)\s*25.*nom\s*(?:<-|=)\s*["']H[ée]ros["']/si,
                        difficulty: "Débutant"
                    }
                ]
            }
        ]
    },
    {
        id: 'module3',
        title: 'Module 3: Le Don de la Pensée (Logique de Décision)',
        icon: <GitBranch size={20} />,
        description: "Apprenez à votre programme à réfléchir, analyser, et faire des choix intelligents.",
        chapters: [
            {
                id: 'chap3',
                title: "Les Structures Conditionnelles",
                description: "Faire des embranchements dans le flux d'exécution.",
                lessons: [
                    {
                        id: 'algo_m_3_1',
                        type: 'theory',
                        title: "L'art du Choix (SI... ALORS)",
                        professorSpeech: "Tes algorithmes commencent à avoir de la mémoire, mais ils sont encore bêtes : ils font toujours la même chose. Apprenons-leur à choisir !",
                        duration: '12 min',
                        content: `
# 🚦 SI Cela, ALORS Ceci

L'informatique ne serait qu'une calculatrice super rapide sans les **Conditions**.
Les conditions donnent au code le pouvoir de **réagir à son environnement**.

Le principe est simple : le code vérifie une situation (qui donne un Booléen : Vrai ou Faux). 
* SI c'est Vrai, le code emprunte le chemin A.
* SINON, le code emprunte le chemin B.

## La Syntaxe Universelle

\`\`\`
VARIABLES
    hp_joueur : Entier <- 0

DÉBUT
    SI (hp_joueur <= 0) ALORS
        Afficher("GAME OVER")
    SINON
        Afficher("Continuer le combat")
    FIN SI
FIN
\`\`\`

## Les Opérateurs de Comparaison : Les Yeux de l'Ordi
Pour évaluer une condition, l'ordinateur doit comparer des valeurs :
* \`==\` : Est-ce strictement égal ?
* \`!=\` : Est-ce différent ?
* \`>\` et \`<\` : Supérieur et inférieur strict.
* \`>=\` et \`<=\` : Supérieur ou égal, Inférieur ou égal.
            `
                    },
                    {
                        id: 'algo_m_3_2',
                        type: 'practice',
                        title: "Pratique : Le Videur de Boîte de Nuit",
                        professorSpeech: "Imagine que tu es un gardien à l'entrée d'un temple mystérieux. Si le visiteur est trop jeune, il ne passe pas. À toi de coder cette logique !",
                        description: "Créez l'algorithme d'un videur qui refuse l'entrée aux mineurs.",
                        instruction: "Si l'âge est majeur (>= 18), la variable 'entree' vaut \"Autorisé\", sinon elle vaut \"Refusé\".",
                        initialCode: "VARIABLES\n    age : Entier <- 16\n    entree : Chaîne\n\nDÉBUT\n    // Écrivez votre condition SI/SINON ici\n    \nFIN",
                        hints: ["Utilisez SI (age >= 18) ALORS..."],
                        validationRegex: /SI\s*\(\s*age\s*>=\s*18\s*\)\s*ALORS.*entree\s*(?:<-|=)\s*["']Autorisé["'].*SINON.*entree\s*(?:<-|=)\s*["']Refusé["']/si,
                        difficulty: "Intermédiaire"
                    }
                ]
            }
        ]
    },
    {
        id: 'module4',
        title: 'Module 4: Le Pouvoir de l\'Infini (Les Boucles)',
        icon: <Repeat size={20} />,
        description: "La capacité fondamentale de l'ordinateur : répéter des tâches ingrates à la vitesse de la lumière sans jamais se fatiguer.",
        chapters: [
            {
                id: 'chap4',
                title: "Tourner en rond intelligemment",
                description: "TANT QUE et POUR.",
                lessons: [
                    {
                        id: 'algo_m_4_1',
                        type: 'theory',
                        title: "La Boucle TANT QUE (While)",
                        professorSpeech: "Sais-tu ce qui rend les machines supérieures aux humains ? Elles ne se fatiguent JAMAIS de répéter la même tâche. C'est le pouvoir des boucles.",
                        duration: '12 min',
                        content: `
# 🔄 La Boucle Inconditionnelle

Imaginez qu'on vous demande de creuser au hasard jusqu'à trouver un trésor. Vous ne savez pas *combien de temps* ça va prendre. 
Vous allez utiliser la logique suivante : **Tant Que je n'ai pas trouvé le trésor, je continue de creuser.**

En algorithmique, c'est la boucle **TANT QUE**. Elle s'exécute encore et encore, _tant qu'une condition reste VRAIE_.

## Le Danger Mortel : La Boucle Infinie 💀
Le grand risque de la boucle TANT QUE, c'est qu'elle ne s'arrête jamais si vous oubliez de modifier la condition à l'intérieur !

\`\`\`
VARIABLES
    courage : Entier <- 10

DÉBUT
    TANT QUE (courage > 0) FAIRE
        Afficher("Je combats le boss !")
        courage <- courage - 1  // INDISPENSABLE ! Sans ça, le courage reste à 10 et on boucle à l'infini.
    FIN TANT QUE
FIN
\`\`\`
            `
                    },
                    {
                        id: 'algo_m_4_2',
                        type: 'theory',
                        title: "La Boucle POUR (For)",
                        professorSpeech: "Parfois, on n'a pas envie de surveiller la boucle nous-mêmes. Pour ça, il y a la boucle 'POUR'. C'est comme un régulateur de vitesse pour ton code.",
                        duration: '10 min',
                        content: `
# 🔢 Le Compteur Automatique

Parfois, on sait exactement combien de fois on veut répéter une action. Par exemple : "Affiche 50 étoiles sur l'écran".

Plutôt que d'utiliser un TANT QUE où l'on doit soi-même gérer un compteur (initialiser à 0, rajouter +1 à la fin), les développeurs ont créé une structure optimisée pour : **La boucle POUR**.

## La syntaxe
La boucle POUR possède sa propre variable intégrée (souvent appelée 'i' pour Itérateur) qui augmente ou diminue toute seule !

\`\`\`
DÉBUT
    POUR i ALLANT DE 1 A 5 FAIRE
        Afficher("Je suis l'itération numéro : ", i)
    FIN POUR
FIN
\`\`\`

À l'exécution, ce code affichera le texte 5 fois, et à chaque fois \`i\` vaudra 1, puis 2, 3, 4 et 5.
            `
                    },
                    {
                        id: 'algo_m_4_3',
                        type: 'practice',
                        title: "La Table de Multiplication",
                        professorSpeech: "Un classique ! Calcule-moi cette table de multiplication. Mais attention, fais en sorte que l'algorithme travaille pour toi.",
                        description: "Générez la table de multiplication par 7.",
                        instruction: "Utilisez une boucle POUR pour calculer et assigner à 'resultat' chaque multiple de 7 (de 1 à 10). (Vous n'avez besoin d'écrire que l'assignation dans la boucle)",
                        initialCode: "VARIABLES\n    resultat : Entier\n\nDÉBUT\n    POUR i ALLANT DE 1 A 10 FAIRE\n        // Écrivez l'équation ici (ex: resultat <- ...)\n    FIN POUR\nFIN",
                        hints: ["Multipliez 'i' par 7 à chaque tour de boucle."],
                        validationRegex: /resultat\s*(?:<-|=)\s*i\s*\*\s*7/i,
                        difficulty: "Intermédiaire"
                    }
                ]
            }
        ]
    },
    {
        id: 'module5',
        title: 'Module 5: Armées de Données (Les Tableaux)',
        icon: <Box size={20} />,
        description: "Stocker des variables unitaires c'est bien, mais comment stocker les informations de 10 000 utilisateurs ? Avec les Tableaux.",
        chapters: [
            {
                id: 'chap5',
                title: "Les Collections de Données",
                description: "Aligner les boîtes dans la mémoire.",
                lessons: [
                    {
                        id: 'algo_m_5_1',
                        type: 'theory',
                        title: "Concept du Tableau (Array)",
                        professorSpeech: "Stocker une valeur c'est bien. En stocker mille, c'est mieux. Bienvenue dans le monde des collections de données : les tableaux !",
                        duration: '15 min',
                        content: `
# 🚂 Le Train des Données

Jusqu'ici, nos variables étaient des maisons individuelles. Que faire quand on doit stocker les notes des 30 élèves d'une classe ? Créer \`note1\`, \`note2\`... \`note30\` ? C'est ingérable.

L'ordinateur propose les **Tableaux (Arrays)**. Ce sont des variables massives divisées en compartiments (comme des wagons de train) où toutes les données sont rangées à la suite en mémoire.

## L'Indexation : La Grande Trahison
Comment accéder à un compartiment en particulier ? Grâce à son numéro de position, qu'on appelle l'**Index**.

⚠️ **ATTENTION DANGER** : En informatique, quasiment tous les systèmes commencent à compter **à partir de ZÉRO**.

Si j'ai un tableau \`T\` de 5 cases :
* La Première case est \`T[0]\`
* La Deuxième case est \`T[1]\`
* La Dernière case est \`T[4]\` (Taille moins 1)

\`\`\`
VARIABLES
    scores : Tableau[5] d'Entiers

DÉBUT
    scores[0] <- 95
    scores[1] <- 42
    // ...
FIN
\`\`\`
            `
                    },
                    {
                        id: 'algo_m_5_2',
                        type: 'quiz',
                        title: "Quiz : Le Piège de l'Index",
                        professorSpeech: "Attention ! Ici, beaucoup de débutants se trompent. Rappelle-toi : en informatique, on ne commence pas toujours à compter par 1...",
                        question: "J'ai un tableau 'Noms' qui contient 100 éléments. Je veux afficher le cinquantième nom de la liste. Que dois-je écrire ?",
                        options: [
                            { id: 'a', text: "Afficher(Noms[50])", correct: false },
                            { id: 'b', text: "Afficher(Noms[49])", correct: true },
                            { id: 'c', text: "Afficher(Noms[51])", correct: false }
                        ],
                        explanation: "Excellent ! Puisque le comptage commence à 0, l'élément numéro 1 est à l'index 0. Donc l'élément 50 est à l'index 49."
                    },
                    {
                        id: 'algo_m_5_3',
                        type: 'theory',
                        title: "Parcourir un Tableau",
                        professorSpeech: "C'est ici que la magie opère : on combine les boucles et les tableaux pour traiter des armées entières de données en une fraction de seconde.",
                        duration: '10 min',
                        content: `
# 🚗 Traverser les Tableaux

Comment fait-on pour traiter toutes les valeurs d'un tableau d'un seul coup (pour faire une moyenne par exemple) ? On associe les Tableaux avec le concept ultime qu'on vient d'apprendre : **La boucle POUR**.

En effet, la variable \`i\` de la boucle POUR, qui augmente à chaque tour, représente l'index parfait pour visiter chaque case du tableau une à une !

\`\`\`
VARIABLES
    notes : Tableau[3] d'Entiers
    somme : Entier <- 0

DÉBUT
    notes[0] <- 12
    notes[1] <- 16
    notes[2] <- 20
    
    // On visite le tableau (index de 0 à 2)
    POUR i ALLANT DE 0 A 2 FAIRE
        somme <- somme + notes[i]
    FIN POUR
    
    // Ici somme vaut 48 !
FIN
\`\`\`
            `
                    }
                ]
            }
        ]
    },
    {
        id: 'module6',
        title: 'Module 6: Diviser pour Mieux Coder (Fonctions)',
        icon: <GitBranch size={20} />,
        description: "Finis les algorithmes kilométriques et spaghettis. Apprenez le pouvoir de la modularité.",
        chapters: [
            {
                id: 'chap6',
                title: "Fonctions & Procédures",
                description: "Créer ses propres commandes personnalisées.",
                lessons: [
                    {
                        id: 'algo_m_6_1',
                        type: 'theory',
                        title: "Qu'est-ce qu'une Fonction ?",
                        professorSpeech: "Ne te répète jamais ! Si tu dois faire une tâche plusieurs fois, crée une commande personnalisée : une fonction. C'est le secret des pros.",
                        duration: '15 min',
                        content: `
# ⚙️ La Boîte Noire Magique

Quand un problème devient complexe, l'algorithme devient gigantesque. Les professionnels ne tolèrent jamais ça : ils découpent le problème en petits sous-problèmes qu'on confie à des **Fonctions**.

Une fonction est un bloc de code indépendant qui a :
1. **Un Nom** (pour l'appeler).
2. **Des Entrées (Paramètres/Arguments)** : Les données qu'on lui fournit pour qu'elle puisse bosser.
3. **Une Sortie (Retour):** Le résultat final qu'elle recrache à la fin.

## Le Principe du "DRY" (Don't Repeat Yourself)
Imaginons que vous deviez calculer 10 moyennes différentes. Plutôt que de recopier 10 fois les boucles POUR, vous créez UNE SEULE fonction \`CalculerMoyenne(tableau)\` et vous l'appelez 10 fois.

\`\`\`
FONCTION Addition(a: Entier, b: Entier) -> Entier
DÉBUT
    RETOURNE a + b
FIN FONCTION

// Plus tard dans votre programme principal :
valeur <- Addition(10, 5)  // valeur vaut maintenant 15 !
\`\`\`
            `
                    },
                    {
                        id: 'algo_m_6_2',
                        type: 'practice',
                        title: "Créer la fonction Double",
                        professorSpeech: "Prêt à créer ta première usine à données ? Fabrique-moi une fonction qui multiplie tout par deux !",
                        description: "Créez une fonction qui renvoie le double de la valeur reçue.",
                        instruction: "Remplissez le contenu de la fonction pour qu'elle RETOURNE la valeur 'nombre' multipliée par 2.",
                        initialCode: "FONCTION CalculerDouble(nombre: Entier) -> Entier\nDÉBUT\n    // Taper la commande de retour ici\n    \nFIN FONCTION",
                        hints: ["Utilisez le mot clé RETOURNE"],
                        validationRegex: /RETOURNE\s*nombre\s*\*\s*2/i,
                        difficulty: "Intermédiaire"
                    }
                ]
            }
        ]
    },
    {
        id: 'module7',
        title: 'Module 7: Les Algorithmes de Légende',
        icon: <Trophy size={20} />,
        description: "Plongez dans les algorithmes classiques (Recherches & Tris) qui propulsent l'humanité (et Google) aujourd'hui.",
        chapters: [
            {
                id: 'chap7',
                title: "Le Tri et la Recherche",
                description: "Comment dompter des millions de données.",
                lessons: [
                    {
                        id: 'algo_m_7_1',
                        type: 'theory',
                        title: "La Recherche Séquentielle vs Dichotomique",
                        professorSpeech: "Te voilà au sommet ! Voyons comment les géants comme Google trouvent une information parmi des milliards d'autres. C'est une question de stratégie.",
                        duration: '20 min',
                        content: `
# 🔍 Trouver une Aiguille dans une Botte de Foin

Comment savoir si le nombre "42" se trouve dans un tableau aléatoire de 1 million d'entrées ?
L'approche naïve, c'est de regarder chaque case (la boucle POUR de 0 à 1 million). C'est la **Recherche Séquentielle**, ou Linéaire. Temps estimé : lent. 🐌

## Le Pouvoir de la Dichotomie (Diviser pour Régner)
Mais imaginons que le tableau soit **déjà trié** (du plus petit au plus grand).
C'est comme chercher un mot dans le dictionnaire. Vous ne lisez pas la page 1, puis la 2... 
Vous ouvrez le dictionnaire *au milieu*.
Si vous cherchez "Zèbre" et que vous tombez sur "Lion" (au milieu), vous savez que le Zèbre est dans la moitié de droite. Vous avez instantanément éliminé la moitié gauche (des milliers de pages !).

**C'est la Recherche Dichotomique.**
1. Regarder au milieu.
2. Si c'est notre valeur, bingo !
3. Sinon, si c'est plus grand, on recommence sur la sous-moitié de gauche. Sinon, sur la moitié de droite.

On réduit drastiquement le nombre de coups nécessaires (Complexité Logarithmique : O(log n)).
            `
                    },
                    {
                        id: 'algo_m_7_2',
                        type: 'theory',
                        title: "L'Algorithme de Tri à Bulles",
                        professorSpeech: "Une dernière leçon pour la route. Le tri à bulles est un classique indémodable. C'est simple, c'est beau, et c'est la base de tout !",
                        duration: '15 min',
                        content: `
# 🫧 Mettre de l'ordre : Le Tri à Bulles

Pour utiliser la Dichotomie, il faut que ce soit trié. Mais comment trier 1000 nombres dans le désordre total ?
L'un des algorithmes historiques les plus visuels est le **Tri à Bulles**.

## Le Principe :
On parcourt le tableau de gauche à droite, et on regarde les nombres par paires (Voisin de gauche, et Voisin de droite).
* Si le voisin de gauche est PLUS GRAND que le voisin de droite, on les **échange**.
* Sinon on continue.

À la fin du parcours, le plus gros nombre sera naturellement "remonté" tout à droite, comme une grosse bulle d'air dans l'eau.
On répète ce processus complet autant de fois qu'il y a d'éléments. Et tout finit parfaitement trié !

C'est simple, élégant, mais pas très optimisé pour des téraoctets de données. C'est néanmoins un classique absolu pour l'éveil algorithmique. C'est ici que votre formation de base s'achève... Bienvenue parmi les architectes du numérique ! 🎓
            `
                    }
                ]
            }
        ]
    }
];
