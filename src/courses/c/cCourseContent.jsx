import React from 'react';
import { Cpu, Database, Layers, Target, Package, List } from 'lucide-react';

export const cCourseData = [
    {
        id: 'module1',
        title: 'Module 1: Rencontre avec la Machine',
        icon: <Cpu size={20} />,
        description: "Découvrez le langage qui a construit le monde moderne. Puissant, rapide, mais impitoyable.",
        chapters: [
            {
                id: 'chap1',
                title: "Le Dinosaure Surpuissant",
                description: "Pourquoi apprendre le C aujourd'hui ?",
                lessons: [
                    {
                        id: 'c_m_1_1',
                        type: 'theory',
                        title: "Le Langage C : La Matrice",
                        duration: '8 min',
                        professorSpeech: "Tu veux voir le code de la Matrice ? Le C est ce qui s'en rapproche le plus. C'est le socle de toute l'informatique moderne.",
                        content: `
# 🌟 Le C : Le Boss Final (qui est là depuis 1972)

Imagine que l'ordinateur est une voiture de course. 
*   Apprendre Python ou Javascript, c'est apprendre à conduire avec une boîte automatique et le pilote automatique activé. C'est confortable. 
*   **Apprendre le C, c'est ouvrir le capot, mettre les mains dans le cambouis et construire le moteur soi-même.**

## Pourquoi c'est important ?
Le C est le langage avec lequel **Windows, Linux, macOS et même Android** ont été construits. Si tu comprends le C, tu comprends comment un ordinateur **pense physiquement**. 

> [!IMPORTANT]
> Le C te donne un pouvoir absolu sur la machine (la mémoire). Mais n'oublie pas : *Un grand pouvoir implique de grandes responsabilités*. Si tu fais une erreur en C, l'ordinateur ne t'aide pas, il "plante" violemment (le fameux écran bleu).

[?] Pourquoi on utilise encore un langage si vieux ? | Parce qu'il n'y a (presque) **rien de plus rapide**. Quand on envoie une fusée SpaceX dans l'espace ou qu'on crée un jeu vidéo hyper réaliste, on a besoin de vitesse pure. On utilise le C ou son petit frère, le C++.
`
                    },
                    {
                        id: 'c_m_1_2',
                        type: 'practice',
                        title: "Hello, World ! (Le Rituel)",
                        description: "Ton premier contact avec le compilateur.",
                        professorSpeech: "Chaque grand sorcier a commencé par faire léviter une plume. Ton premier sort s'appelle 'Hello World'.",
                        instruction: "Complète le code pour afficher 'Hello, World!' suivi d'un retour à la ligne (\\n).",
                        initialCode: `#include <stdio.h>\n// Ceci charge la boîte à outils pour "parler" à l'écran\n\nint main() {\n    // Affiche le message ici en utilisant printf\n    \n    return 0; // On dit à Windows/Linux que tout s'est bien passé\n}`,
                        solution: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
                        validationRegex: /printf\s*\(\s*"Hello,\s*World!\\n"\s*\)\s*;/,
                        hints: [
                            "La fonction s'appelle printf.",
                            "Le texte doit être entre guillemets.",
                            "N'oublie pas le point-virgule ';' à la fin, c'est la hantise de tous les codeurs C !",
                            "N'oublie pas le \\n avant de fermer les guillemets."
                        ],
                        expectedOutput: "Hello, World!",
                        difficulty: "Débutant"
                    }
                ]
            }
        ]
    },
    {
        id: 'module2',
        title: 'Module 2: Les Tiroirs de la RAM',
        icon: <Database size={20} />,
        description: "Apprends comment le C gère les variables. Ici, on ne rigole pas avec le type de boîte.",
        chapters: [
            {
                id: 'chap2',
                title: "Trier ses Affaires",
                description: "Les Types de données.",
                lessons: [
                    {
                        id: 'c_m_2_1',
                        type: 'theory',
                        title: "Strictement Typé",
                        duration: '10 min',
                        professorSpeech: "Le C est un maniaque du rangement. On ne met pas un nombre à virgule dans la boîte des nombres entiers.",
                        content: `
# 📦 Le Rangement Maniaque

Comme on l'a vu en Algorithmique, une variable est un tiroir en mémoire. Mais le Langage C est très pointilleux sur la forme du tiroir.

| Type C | Pour ranger quoi ? | Exemple |
| :--- | :--- | :--- |
| **\`int\`** | Les nombres entiers (Integer) | \`int age = 22;\` |
| **\`float\`** | Les nombres à virgule | \`float prix = 19.99;\` |
| **\`char\`** | Un seul caractère (lettre/symbole) | \`char groupe = 'A';\` |

> [!CAUTION]
> En C, oublier le point-virgule \`;\` à la fin de la déclaration déclenchera la colère rouge sang du compilateur.

## L'Affichage (La fonction printf)
Quand tu veux afficher une variable en C, tu ne peux pas juste la donner à \`printf\`. Il faut lui réserver un "trou" avec un code secret selon son type :
*   \`%d\` : Trou pour un Entier (Decimal)
*   \`%f\` : Trou pour un Réel (Float)
*   \`%c\` : Trou pour un Caractère (Char)

\`\`\`c
int vies = 3;
printf("Il me reste %d vies.", vies);
\`\`\`
*(Le %d sera remplacé magiquement par la valeur de 'vies')*
`
                    },
                    {
                        id: 'c_m_2_2',
                        type: 'quiz',
                        title: "Quiz : Les Trous de printf",
                        professorSpeech: "On va voir si tu as compris comment parler à l'écran sans bégayer.",
                        question: "Pour afficher la variable `float monnaie = 2.50;`, quel code est correct ?",
                        options: [
                            { id: 'a', text: "printf(\"J'ai %d euros\", monnaie);", correct: false },
                            { id: 'b', text: "printf(\"J'ai monnaie euros\");", correct: false },
                            { id: 'c', text: "printf(\"J'ai %f euros\", monnaie);", correct: true }
                        ],
                        explanation: "Exact ! '%f' est le code secret (le spécificateur de format) pour les nombres à virgule (float). '%d' aurait causé un bug d'affichage !"
                    }
                ]
            }
        ]
    },
    {
        id: 'module3',
        title: 'Module 3: Le Labyrinthe du Code',
        icon: <Layers size={20} />,
        description: "Les conditions et les boucles. Fais faire les choix compliqués à la machine.",
        chapters: [
            {
                id: 'chap3',
                title: "Contrôler le Flux",
                description: "If, Else et For.",
                lessons: [
                    {
                        id: 'c_m_3_1',
                        type: 'theory',
                        title: "Les Conditions (if / else)",
                        duration: '8 min',
                        professorSpeech: "La traduction directe du SI... SINON. Rien de bien méchant, mais attention aux accolades !",
                        content: `
# 🚦 L'Aiguillage : if et else

Voici comment on écrit un SI... SINON en langage C :

\`\`\`c
int age = 16;

if (age >= 18) {
    printf("Tu peux entrer dans le casino !\\n");
} else {
    printf("Désolé, va jouer au parc.\\n");
}
\`\`\`

> [!NOTE]
> Les accolades \`{\` et \`}\` délimitent ce qu'on appelle "un bloc". C'est pour dire au compilateur "Voici tout ce que tu dois faire si la condition est remplie".

[VISUALIZER] {"codeStr": "int x = 5;\\nif (x > 10) {\\n  x = 100;\\n} else {\\n  x = 0;\\n}", "steps": [{"line": 1, "state": {"x": 5}, "explanation": "x vaut 5."}, {"line": 2, "state": {"x": 5}, "explanation": "Est-ce que 5 est plus grand que 10 ? Faux."}, {"line": 4, "state": {"x": 5}, "explanation": "On saute dans le bloc 'else'."}, {"line": 5, "state": {"x": 0}, "explanation": "x est écrasé par la valeur 0."}]}
`
                    },
                    {
                        id: 'c_m_3_2',
                        type: 'practice',
                        title: "La Machine à Punitions (Boucles)",
                        description: "Faire des boucles en C.",
                        professorSpeech: "La boucle FOR est ta nouvelle meilleure amie. Elle fera le sale boulot à ta place.",
                        instruction: "Complète la boucle FOR pour qu'elle affiche 'Je code en C !' exactement 3 fois.",
                        initialCode: `#include <stdio.h>\n\nint main() {\n    // Remplis les conditions du 'for'\n    // for(départ; condition_fin; incrémentation)\n    for (int i = 0; ________; ____) {\n        printf("Je code en C !\\n");\n    }\n    return 0;\n}`,
                        solution: `#include <stdio.h>\n\nint main() {\n    for (int i = 0; i < 3; i++) {\n        printf("Je code en C !\\n");\n    }\n    return 0;\n}`,
                        validationRegex: /for\s*\(\s*int\s*i\s*=\s*0\s*;\s*i\s*<\s*3\s*;\s*i\+\+\s*\)/,
                        hints: [
                            "La condition doit être `i < 3`.",
                            "L'incrémentation doit être `i++` (ce qui veut dire i = i + 1)."
                        ],
                        expectedOutput: "Je code en C !\nJe code en C !\nJe code en C !",
                        difficulty: "Intermédiaire"
                    }
                ]
            }
        ]
    },
    {
        id: 'module4',
        title: 'Module 4: Le Cauchemar Merveilleux (Pointeurs)',
        icon: <Target size={20} />,
        description: "Le concept qui fait abandonner 90% des débutants. Mais pas toi. Tu vas dompter la matrice mémoire.",
        chapters: [
            {
                id: 'chap4',
                title: "Les Pointeurs",
                description: "Adresses et déréférencement.",
                lessons: [
                    {
                        id: 'c_m_4_1',
                        type: 'theory',
                        title: "L'Adresse de la Maison",
                        duration: '15 min',
                        professorSpeech: "Bienvenue dans le cœur du réacteur. Un pointeur n'est PAS une donnée. C'est le PLAN qui mène à la donnée.",
                        content: `
# 📍 Les Pointeurs : L'Arme Absolue

C'est LE truc qui fait dire aux gens que le C est difficile. En réalité, c'est logique comme un plan de ville.

Imagine que ta variable est une **maison**.
\`int age = 25;\` (Dans la maison, il y a le monsieur 25).

Cette maison a une **adresse** physique sur l'ordinateur (ex: Rue de la RAM, Case numéro 4022).
Si je veux te donner l'adresse de la maison, je ne te donne pas la maison (c'est lourd), je te donne un bout de papier avec l'adresse écrite dessus.

**Ce bout de papier, c'est un POINTEUR.**

## Les Deux Symboles Sacrés
1.  **Le symbole \`&\` (Où habites-tu ?)** : Il permet d'obtenir l'adresse d'une variable.
    \`printf("L'adresse est %p", &age);\`
2.  **Le symbole \`*\` (Qui habite là ?)** : Il permet de créer une variable pointeur, ou de regarder à l'intérieur d'une adresse.

\`\`\`c
int age = 25;
int* adresse_de_age = &age; // Je crée le bout de papier, j'y note l'adresse de 'age'

// Si je veux modifier l'âge depuis l'adresse :
*adresse_de_age = 30; // Je vais à cette rue, j'ouvre la porte et je mets 30 à l'intérieur !
\`\`\`

> [!CAUTION]
> Les pointeurs sont extrêmement puissants car ils te permettent de modifier des données directement dans les disques de l'ordinateur. C'est l'essence même du "Hack".
`
                    },
                    {
                        id: 'c_m_4_2',
                        type: 'quiz',
                        title: "Quiz : Les Pointeurs",
                        professorSpeech: "Ne te laisse pas intimider par les étoiles.",
                        question: "Que signifie le '&' dans le code '&variable' ?",
                        options: [
                            { id: 'a', text: "Ça multiplie la variable par 2.", correct: false },
                            { id: 'b', text: "Ça retourne l'adresse mémoire physique de la variable.", correct: true },
                            { id: 'c', text: "Ça détruit la variable.", correct: false }
                        ],
                        explanation: "Le '&' (Esperluette) est l'opérateur d'adresse. C'est comme demander les coordonnées GPS du tiroir dans lequel on a rangé la donnée."
                    }
                ]
            }
        ]
    },
    {
        id: 'module5',
        title: 'Module 5: Modéliser (Fonctions et Tableaux)',
        icon: <Package size={20} />,
        description: "Apprends à découper ton code propre et à stocker des armées de données.",
        chapters: [
            {
                id: 'chap5',
                title: "L'Usine et les Trains",
                description: "Sous-programmes et Listes.",
                lessons: [
                    {
                        id: 'c_m_5_1',
                        type: 'theory',
                        title: "Les Fonctions en C",
                        duration: '10 min',
                        professorSpeech: "Pourquoi refaire les mêmes calculs ? Crée une machine qui le fait pour toi.",
                        content: `
# 🛠️ Les Fonctions

Comme vu en algorithmique, on ne répète pas son code. On crée une Fonction.

\`\`\`c
// Type_de_retour Nom_de_la_fonction ( Parametres )
int CalculerCarre(int nombre) {
    int resultat = nombre * nombre;
    return resultat;
}

int main() {
    int x = CalculerCarre(5); // x vaudra 25 !
    return 0;
}
\`\`\`

Si ta machine ne doit **rien** renvoyer (juste afficher un truc), son type de retour est **\`void\`** (le vide intersidéral).
`
                    },
                    {
                        id: 'c_m_5_2',
                        type: 'theory',
                        title: "Les Tableaux (Arrays)",
                        duration: '12 min',
                        professorSpeech: "Imagine un HLM géant où chaque appartement contient une valeur. C'est ça un tableau.",
                        content: `
# 🚆 Les Tableaux : La Rangée de Tiroirs

Parfois, tu veux stocker 100 Boss de fin ou 50 Notes d'élèves. Tu ne vas pas créer \`note1\`, \`note2\`... \`note50\`.
Tu crées un **Tableau**.

\`\`\`c
// Je réserve un bloc de 5 entiers
int notes[5] = {12, 15, 8, 20, 14};

// Pour accéder au PREMIER élément (l'ingénieur compte à partir de 0) :
printf("Le premier est %d", notes[0]); // Affiche 12

// Pour changer le deuxième élément :
notes[1] = 16;
\`\`\`

> [!CAUTION]
> En C, **les indices commencent à 0**. Le premier élément est à l'index 0. Le 5ème élément est à l'index 4. Si tu essaies de lire \`notes[5]\`, le programme va planter (Segmentation Fault), car tu essaies d'ouvrir la porte d'un voisin qui n'existe pas !
`
                    }
                ]
            }
        ]
    }
];
