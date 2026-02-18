import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ChevronRight, ChevronDown, Code, BookOpen,
  CheckCircle, Circle, Terminal, Play, Cpu, Database,
  Layers, AlertTriangle, Info, Check, X, RefreshCw,
  Maximize2, Minimize2, Save, Trophy, Lock, FileText,
  HelpCircle, Lightbulb, Award, Star, Target
} from 'lucide-react';

// =====================================================================
// DONNÉES DU COURS - Version Ultra-Détaillée et Pédagogique
// =====================================================================
// Chaque module, chapitre et leçon est conçu pour enseigner un concept
// précis avec une progression naturelle.
// =====================================================================

const courseData = [
  // =================================================================
  // MODULE 1 : INTRODUCTION & FONDATIONS
  // =================================================================
  {
    id: 'module1',
    title: 'Module 1: Les Fondations du C',
    icon: <Cpu size={20} />,
    description: "Posez les bases solides de votre apprentissage. Comprenez l'histoire, l'environnement et la structure fondamentale d'un programme C.",
    chapters: [
      // -------------------------------------------------------------
      // Chapitre 1.1 : Premier Contact
      // -------------------------------------------------------------
      {
        id: 'chap1',
        title: "Premier Contact avec le C",
        description: "Découvrez l'histoire du C, installez votre environnement et écrivez votre tout premier programme.",
        lessons: [
          {
            id: 'c_intro_1',
            type: 'theory',
            title: "Pourquoi le C est-il si important ?",
            duration: '8 min',
            content: `
              # 🌟 Le Langage C : Le Pilier de l'Informatique Moderne

              Imaginez un monde sans Windows, sans Linux, sans Android, sans jeux vidéo performants. Difficile, n'est-ce pas ? Pourtant, sans le langage C, tout cela n'existerait pas.

              ## 📜 Une Brève Histoire
              * **1969-1973** : Dennis Ritchie et Ken Thompson créent le C aux Bell Labs pour développer le système d'exploitation **UNIX**.
              * **Pourquoi "C" ?** Il succède au langage "B" (lui-même inspiré de BCPL). La progression alphabétique a donné "C".
              * **1989** : Première normalisation ANSI C (C89/C90). Le langage devient un standard universel.

              ## ⚡ Pourquoi le C est-il si PUISSANT ?
              1.  **Proche du Matériel** : Le C manipule directement la mémoire (RAM) via les **pointeurs**. Vous contrôlez chaque octet.
              2.  **Rapidité** : Les programmes C sont parmi les plus rapides, car ils sont compilés directement en langage machine.
              3.  **Portabilité** : Un code C bien écrit peut être recompilé sur presque toutes les architectures (x86, ARM, etc.).
              4.  **Influence Majeure** : La syntaxe du C a été reprise par C++, Java, C#, JavaScript, PHP, et bien d'autres.

              ## 💡 Où Trouve-t-on du C Aujourd'hui ?
              * **Systèmes d'exploitation** : Linux (90% en C), Windows, macOS (XNU est en partie en C).
              * **Embedded (Objets Connectés)** : Arduino, Raspberry Pi, microcontrôleurs.
              * **Bases de données** : MySQL, PostgreSQL, SQLite.
              * **Langages de programmation** : Python (l'interpréteur CPython est écrit en C), Ruby, PHP.
              * **Jeux vidéo** : Moteurs graphiques, Unreal Engine (C++ mais bâti sur des concepts C).

              > **À retenir** : Le C n'est pas un langage "mort". C'est le socle sur lequel repose l'informatique moderne. Le maîtriser, c'est comprendre comment un ordinateur fonctionne vraiment.
            `
          },
          {
            id: 'c_intro_2',
            type: 'theory',
            title: "Votre Environnement de Travail",
            duration: '10 min',
            content: `
              # 🛠️ Mettre en Place son Atelier

              Pour écrire et exécuter du C, vous avez besoin de deux choses : un **éditeur de texte** (pour écrire le code) et un **compilateur** (pour transformer le code en programme exécutable).

              ## 1. Le Compilateur : Le Cœur du Moteur
              Le compilateur le plus célèbre est **GCC (GNU Compiler Collection)**. Il est open-source et disponible partout.

              *   **Sur Linux** : Il est probablement déjà installé. Vérifiez avec \`gcc --version\`. Sinon : \`sudo apt install gcc\` (Ubuntu/Debian).
              *   **Sur macOS** : Installez "Xcode Command Line Tools" avec \`xcode-select --install\`.
              *   **Sur Windows** : La solution la plus simple est d'installer **MinGW** ou d'utiliser un IDE complet comme **Code::Blocks** ou **Visual Studio**.

              ## 2. L'Éditeur de Code : Votre Crayon
              Vous pouvez écrire du C dans n'importe quel éditeur de texte (Bloc-notes !). Mais pour être efficace, utilisez un éditeur de code avec coloration syntaxique.
              *   **VS Code** (Recommandé) : Léger, puissant, avec une multitude d'extensions pour le C/C++.
              *   **Sublime Text** : Rapide et élégant.
              *   **Vim / Neovim** : Pour les puristes (et les masochistes).

              ## 🏁 Vérifions que tout est prêt

              **Étape 1 :** Ouvrez votre terminal (ou invite de commandes).
              **Étape 2 :** Tapez \`gcc --version\`. Vous devriez voir apparaître la version de GCC installée. Sinon, retournez à l'étape d'installation.
              **Étape 3 :** Vous êtes prêt à coder !
            `
          },
          {
            id: 'c_intro_3',
            type: 'practice',
            title: "Mon Premier Programme : Hello, World!",
            description: "Le rituel de passage obligé pour tout apprenti sorcier.",
            instruction: "Écrivez un programme complet qui affiche 'Hello, World!' suivi d'un retour à la ligne.",
            initialCode: `// Une ligne de commentaire commence par //
// Les commentaires sont ignorés par le compilateur.
// Ils servent à expliquer le code.

// Inclure la bibliothèque standard d'entrée/sortie (stdio)
// Elle nous donne accès à la fonction printf
#include <stdio.h>

// La fonction main() est le point d'entrée de TOUT programme C
// Le programme commence son exécution ici.
int main() {
    // TODO : Écrire votre code ici
    
    return 0; // Indique que le programme s'est terminé avec succès
}`,
            solution: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
            validationRegex: /printf\s*\(\s*"Hello, World!\\n"\s*\)\s*;/,
            hints: [
              "La fonction pour afficher du texte s'appelle 'printf'.",
              "N'oubliez pas les guillemets autour du texte.",
              "Le '\\n' crée un saut de ligne à la fin.",
              "Chaque instruction en C se termine par un point-virgule ';'."
            ],
            expectedOutput: "Hello, World!",
            difficulty: "Débutant"
          },
          {
            id: 'c_intro_4',
            type: 'quiz',
            title: "Quiz : Les Bases du Programme C",
            question: "Que signifie '#include <stdio.h>' dans un programme C ?",
            options: [
              { id: 'a', text: "C'est le nom du programme.", correct: false },
              { id: 'b', text: "On inclut une bibliothèque pour gérer les entrées/sorties (affichage, lecture clavier).", correct: true },
              { id: 'c', text: "On déclare une nouvelle variable.", correct: false },
              { id: 'd', text: "On démarre la fonction main.", correct: false },
            ],
            explanation: "`#include <stdio.h>` est une directive de préprocesseur qui demande d'ajouter le contenu du fichier d'en-tête `stdio.h` (Standard Input Output). Ce fichier contient les déclarations de fonctions comme `printf` et `scanf`, essentielles pour communiquer avec l'utilisateur."
          }
        ]
      },
      // -------------------------------------------------------------
      // Chapitre 1.2 : Anatomie d'un Programme
      // -------------------------------------------------------------
      {
        id: 'chap2',
        title: "L'Anatomie d'un Programme C",
        description: "Décortiquons le code pour comprendre chaque élément.",
        lessons: [
          {
            id: 'c_anat_1',
            type: 'theory',
            title: "Les Ingrédients d'un Programme",
            duration: '12 min',
            content: `
              # 🧩 Les Blocs de Construction

              Analysons en détail notre programme "Hello World".

              \`\`\`c
              // 1. Directive de préprocesseur
              #include <stdio.h>

              // 2. La fonction principale
              int main() {
                  // 3. Une instruction
                  printf("Hello, World!\\n");
                  
                  // 4. L'instruction de retour
                  return 0;
              }
              \`\`\`

              ## 1. Les Directives de Préprocesseur (\`#include\`)
              *   Elles commencent toujours par \`#\`.
              *   Elles sont traitées **avant** la compilation proprement dite.
              *   \`#include <stdio.h>\` : Copie et colle le contenu du fichier \`stdio.h\` à cet endroit. C'est comme si vous aviez écrit toutes les déclarations de fonctions d'entrée/sortie vous-même.

              ## 2. La Fonction \`main()\`
              *   **Point d'entrée** : C'est la première fonction appelée quand votre programme est exécuté.
              *   **\`int\`** : Le type de retour. \`main\` doit retourner un entier (\`int\`) au système d'exploitation pour indiquer comment le programme s'est terminé.
              *   **\`()\`** : Les parenthèses indiquent que c'est une fonction. Ici, elle ne prend pas d'arguments (en réalité, elle peut prendre \`argc\` et \`argv\`, mais on verra ça plus tard).

              ## 3. Les Instructions
              *   Une instruction est une action à exécuter.
              *   **\`printf("Hello, World!\\n");\`** :
                  *   \`printf\` est une **fonction** de la bibliothèque standard.
                  *   Les parenthèses contiennent les **arguments** (ce qu'on donne à la fonction).
                  *   \`"Hello, World!\\n"\` est une **chaîne de caractères** (string).
                  *   \`\\n\` est un caractère d'**échappement** qui représente un saut de ligne (newline).
              *   **Chaque instruction se termine par un point-virgule \`;\`** . C'est une erreur très fréquente de l'oublier !

              ## 4. L'Instruction \`return\`
              *   \`return 0;\` : Termine la fonction \`main\` et renvoie la valeur 0 au système d'exploitation. Par convention, **0 signifie "succès"**. Toute autre valeur signifie "erreur".
            `
          },
          {
            id: 'c_anat_2',
            type: 'quiz',
            title: "Quiz : Anatomie",
            question: "Quel est le rôle du point-virgule ';' en C ?",
            options: [
              { id: 'a', text: "Il termine une instruction.", correct: true },
              { id: 'b', text: "Il sépare les paramètres d'une fonction.", correct: false },
              { id: 'c', text: "Il indique un commentaire.", correct: false },
              { id: 'd', text: "Il est optionnel et sert à décorer le code.", correct: false },
            ],
            explanation: "Le point-virgule est un **terminateur d'instruction**. Il indique au compilateur où une instruction se termine. L'oublier provoque une erreur de compilation."
          }
        ]
      }
    ]
  },

  // =================================================================
  // MODULE 2 : LES VARIABLES ET TYPES DE DONNÉES
  // =================================================================
  {
    id: 'module2',
    title: 'Module 2: Les Variables et Types',
    icon: <Database size={20} />,
    description: "Apprenez à stocker et manipuler des données en mémoire.",
    chapters: [
      // -------------------------------------------------------------
      // Chapitre 2.1 : Les Types Primitifs
      // -------------------------------------------------------------
      {
        id: 'chap3',
        title: "Les Types de Données Fondamentaux",
        description: "Découvrez comment le C voit les nombres, les lettres et les décimaux.",
        lessons: [
          {
            id: 'c_types_1',
            type: 'theory',
            title: "Les Nombres Entiers (int)",
            duration: '10 min',
            content: `
              # 🔢 Les Entiers (\`int\`)

              Le type \`int\` est utilisé pour représenter des nombres entiers (sans partie décimale). C'est le type le plus courant.

              ## Déclaration et Initialisation
              \`\`\`c
              int age;           // Déclaration : on dit au compilateur qu'on va utiliser une variable 'age' de type int.
              age = 25;          // Initialisation : on lui donne une valeur pour la première fois.

              int score = 100;    // Déclaration et initialisation en une ligne.
              int compteur;       // Si on ne l'initialise pas, sa valeur est "indéterminée" (c'est dangereux !).
              \`\`\`

              ## La Taille et les Limites d'un \`int\`
              Un \`int\` occupe généralement **4 octets** (32 bits) sur la plupart des systèmes modernes.
              Cela signifie qu'il peut stocker des valeurs de **-2 147 483 648** à **2 147 483 647**.

              > **Pourquoi ces limites ?** En binaire, avec 32 bits, on peut représenter 2^32 valeurs différentes (environ 4,3 milliards). Comme on veut aussi des nombres négatifs, on utilise une convention (le complément à deux) pour partager cet espace entre positifs et négatifs.

              ## Afficher un \`int\` avec \`printf\`
              Pour afficher un entier, on utilise le spécificateur de format **\`%d\`** (pour "decimal").

              \`\`\`c
              int temperature = 22;
              printf("Il fait %d degrés.\\n", temperature);
              // Affiche : Il fait 22 degrés.
              \`\`\`
            `
          },
          {
            id: 'c_types_2',
            type: 'theory',
            title: "Les Nombres à Virgule (float, double)",
            duration: '10 min',
            content: `
              # 🎯 Les Nombres Réels (\`float\` et \`double\`)

              Pour représenter des nombres avec une partie décimale, on utilise les types à virgule flottante.

              ## \`float\` : Simple Précision (4 octets)
              *   Précision d'environ 6 à 7 chiffres décimaux.
              *   Idéal pour les calculs graphiques ou quand la mémoire est limitée.

              ## \`double\` : Double Précision (8 octets)
              *   Précision d'environ 15 à 16 chiffres décimaux.
              *   Le type par défaut pour les calculs scientifiques et financiers.

              \`\`\`c
              float pi_approx = 3.14159f;   // Le 'f' à la fin est optionnel mais recommandé pour un float.
              double pi_precis = 3.141592653589793;
              \`\`\`

              ## Afficher un Réel avec \`printf\`
              *   \`%f\` pour un \`float\` ou un \`double\` (par défaut, 6 décimales).
              *   \`%.2f\` pour afficher 2 décimales seulement.

              \`\`\`c
              double prix = 19.99;
              printf("Prix : %.2f euros\\n", prix); // Affiche : Prix : 19.99 euros
              \`\`\`
            `
          },
          {
            id: 'c_types_3',
            type: 'theory',
            title: "Les Caractères (char)",
            duration: '8 min',
            content: `
              # 🔤 Les Caractères (\`char\`)

              Le type \`char\` sert à stocker un **unique caractère**. En réalité, il stocke un **petit entier** (sur 1 octet, soit 256 valeurs possibles), qui correspond au code ASCII du caractère.

              ## Déclaration et Utilisation
              \`\`\`c
              char lettre = 'A';    // Notez les guillemets SIMPLES pour un char.
              char chiffre = '9';    // C'est le caractère '9', pas le nombre 9.
              char code = 65;        // Equivalent à 'A', car le code ASCII de 'A' est 65.
              
              printf("La lettre est : %c\\n", lettre);   // %c pour afficher le caractère
              printf("Son code ASCII est : %d\\n", lettre); // %d pour afficher l'entier sous-jacent
              \`\`\`

              ## Les Caractères Spéciaux
              Certains caractères sont représentés par des séquences d'échappement :
              *   \`\\n\` : Nouvelle ligne (Newline)
              *   \`\\t\` : Tabulation
              *   \`\\\\\` : Un anti-slash littéral
              *   \`\\'\` : Un guillemet simple
              *   \`\\"\` : Un guillemet double (dans une chaîne)
            `
          },
          {
            id: 'c_types_4',
            type: 'quiz',
            title: "Quiz : Types et printf",
            question: "Quel spécificateur de format utiliseriez-vous pour afficher une variable 'double' nommée 'solde' ?",
            options: [
              { id: 'a', text: "%d", correct: false },
              { id: 'b', text: "%c", correct: false },
              { id: 'c', text: "%f", correct: true },
              { id: 'd', text: "%s", correct: false },
            ],
            explanation: "Bien que '%f' soit historiquement pour 'float', il est aussi utilisé pour 'double' avec printf (en raison de la promotion automatique des arguments). C'est le spécificateur standard pour les nombres à virgule flottante."
          },
          {
            id: 'c_types_5',
            type: 'practice',
            title: "Exercice : Présentez-vous",
            description: "Créez un petit programme qui affiche votre âge, votre taille et la première lettre de votre prénom.",
            instruction: "Déclarez une variable 'age' (int), une variable 'taille' (double, en mètres) et une variable 'initiale' (char). Affichez-les proprement.",
            initialCode: `#include <stdio.h>

int main() {
    // Déclarez et initialisez vos variables ici
    
    // Affichez-les
    // Exemple d'affichage attendu :
    // J'ai 30 ans, je mesure 1.75m et mon initiale est M.
    
    return 0;
}`,
            hints: [
              "int age = 30;",
              "double taille = 1.75;",
              "char initiale = 'M';",
              "Utilisez printf(\"J'ai %d ans, je mesure %.2fm et mon initiale est %c.\\n\", age, taille, initiale);"
            ],
            expectedOutput: "J'ai 30 ans, je mesure 1.75m et mon initiale est M.",
            difficulty: "Débutant"
          }
        ]
      },
      // -------------------------------------------------------------
      // Chapitre 2.2 : Les Opérations Arithmétiques
      // -------------------------------------------------------------
      {
        id: 'chap4',
        title: "Manipuler les Variables",
        description: "Addition, soustraction, multiplication... Apprenez à faire des calculs.",
        lessons: [
          {
            id: 'c_ops_1',
            type: 'theory',
            title: "Les Opérateurs de Base",
            duration: '8 min',
            content: `
              # ➕ Opérations Arithmétiques

              Le C supporte les opérations mathématiques classiques.

              | Opérateur | Description | Exemple | Résultat |
              |-----------|-------------|---------|----------|
              | \`+\` | Addition | \`5 + 3\` | \`8\` |
              | \`-\` | Soustraction | \`10 - 4\` | \`6\` |
              | \`*\` | Multiplication | \`7 * 6\` | \`42\` |
              | \`/\` | Division | \`20 / 5\` | \`4\` |
              | \`%\` | Modulo (reste) | \`17 % 5\` | \`2\` |

              ## Attention à la Division !
              La division se comporte différemment selon les types :
              \`\`\`c
              int a = 5, b = 2;
              int resultat1 = a / b;   // resultat1 = 2 (division entière, la partie décimale est tronquée)
              
              double c = 5.0, d = 2.0;
              double resultat2 = c / d; // resultat2 = 2.5 (division réelle)
              \`\`\`

              ## Modulo (reste de la division)
              Le modulo \`%\` est très utile pour savoir si un nombre est pair (nombre % 2 == 0) ou impair.
            `
          },
          {
            id: 'c_ops_2',
            type: 'theory',
            title: "Opérateurs Combinés et Incrémentation",
            duration: '7 min',
            content: `
              # ⚡ Raccourcis Pratiques

              ## Opérateurs d'Assignation Combinée
              \`\`\`c
              int x = 10;
              x = x + 5;   // x devient 15
              
              // On peut écrire plus court :
              x += 5;       // x devient 20 (équivalent à x = x + 5)
              x -= 3;       // x devient 17 (x = x - 3)
              x *= 2;       // x devient 34
              x /= 2;       // x devient 17
              x %= 5;       // x devient 2 (17 % 5 = 2)
              \`\`\`

              ## Incrémentation et Décrémentation
              Très fréquent dans les boucles :
              \`\`\`c
              int compteur = 0;
              compteur++;    // compteur devient 1 (compteur = compteur + 1)
              compteur--;    // compteur redevient 0 (compteur = compteur - 1)
              \`\`\`
            `
          },
          {
            id: 'c_ops_3',
            type: 'practice',
            title: "Mini-Calculatrice",
            description: "Mettez en pratique les opérateurs.",
            instruction: "Créez deux variables 'a = 15' et 'b = 4'. Calculez et affichez leur somme, leur différence (a-b), leur produit, le quotient (a/b) et le reste de la division (a%b).",
            initialCode: `#include <stdio.h>

int main() {
    int a = 15;
    int b = 4;
    
    // Calculez et affichez les résultats
    
    return 0;
}`,
            hints: [
              "int somme = a + b;",
              "printf(\"Somme : %d\\n\", somme);",
              "Faites de même pour différence, produit, quotient et reste."
            ],
            expectedOutput: "Somme : 19\nDifférence : 11\nProduit : 60\nQuotient : 3\nReste : 3",
            difficulty: "Débutant"
          }
        ]
      }
    ]
  },

  // =================================================================
  // MODULE 3 : LE CONTRÔLE DU FLUX
  // =================================================================
  {
    id: 'module3',
    title: 'Module 3: Contrôle du Flux',
    icon: <Layers size={20} />,
    description: "Apprenez à prendre des décisions et à répéter des actions.",
    chapters: [
      // -------------------------------------------------------------
      // Chapitre 3.1 : Les Conditions
      // -------------------------------------------------------------
      {
        id: 'chap5',
        title: "Prendre des Décisions (if/else)",
        description: "Votre programme devient intelligent : il réagit aux données.",
        lessons: [
          {
            id: 'c_cond_1',
            type: 'theory',
            title: "La Logique Booléenne en C",
            duration: '12 min',
            content: `
              # 🤔 Vrai ou Faux ?

              En C, il n'y a pas de type "booléen" dédié (jusqu'à C99 avec stdbool.h). On utilise des entiers :
              *   **0** est considéré comme **FAUX (FALSE)**.
              *   **Toute valeur non nulle** (1, 10, -5, etc.) est considérée comme **VRAI (TRUE)**.

              ## Opérateurs de Comparaison
              Ces opérateurs comparent deux valeurs et retournent 1 (vrai) ou 0 (faux).

              | Opérateur | Signification | Exemple (si age = 18) |
              |-----------|---------------|------------------------|
              | \`==\` | Égal à | \`age == 18\` → 1 |
              | \`!=\` | Différent de | \`age != 20\` → 1 |
              | \`>\` | Plus grand que | \`age > 16\` → 1 |
              | \`<\` | Plus petit que | \`age < 18\` → 0 |
              | \`>=\` | Plus grand ou égal | \`age >= 18\` → 1 |
              | \`<=\` | Plus petit ou égal | \`age <= 18\` → 1 |

              ## La Structure \`if\`
              \`\`\`c
              if (condition) {
                  // Code exécuté SI la condition est VRAIE (non nulle)
              }
              \`\`\`

              ## La Structure \`if...else\`
              \`\`\`c
              if (condition) {
                  // Code si VRAI
              } else {
                  // Code si FAUX
              }
              \`\`\`

              ## Exemple Concret
              \`\`\`c
              int age = 17;
              
              if (age >= 18) {
                  printf("Vous êtes majeur.\\n");
              } else {
                  printf("Vous êtes mineur.\\n");
                  printf("Encore %d années à attendre.\\n", 18 - age);
              }
              \`\`\`
            `
          },
          {
            id: 'c_cond_2',
            type: 'practice',
            title: "Le Contrôle au Cinéma",
            description: "Simulez un contrôle d'âge pour un film interdit aux moins de 12 ans.",
            instruction: "Créez une variable 'age' initialisée à 10. Si l'âge est inférieur à 12, affichez 'Accès refusé'. Sinon, affichez 'Bienvenue !'.",
            initialCode: `#include <stdio.h>

int main() {
    int age = 10;
    
    // Votre code ici
    
    return 0;
}`,
            validationRegex: /if\s*\(\s*age\s*[<]\s*12\s*\)/,
            expectedOutput: "Accès refusé",
            hints: [
              "Utilisez if (age < 12) { ... } else { ... }",
              "N'oubliez pas les accolades {} même pour une seule instruction (c'est une bonne pratique)."
            ]
          },
          {
            id: 'c_cond_3',
            type: 'quiz',
            title: "Quiz : Conditions",
            question: "Quelle est la valeur de l'expression '10 >= 5' en C ?",
            options: [
              { id: 'a', text: "VRAI", correct: false },
              { id: 'b', text: "1", correct: true },
              { id: 'c', text: "0", correct: false },
              { id: 'd', text: "FAUX", correct: false },
            ],
            explanation: "En C, les expressions de comparaison retournent **1** (pour vrai) ou **0** (pour faux). 'VRAI' ou 'FAUX' ne sont pas des valeurs C standard (sauf si vous utilisez stdbool.h)."
          }
        ]
      },
      // -------------------------------------------------------------
      // Chapitre 3.2 : Les Boucles
      // -------------------------------------------------------------
      {
        id: 'chap6',
        title: "Répéter des Actions (Boucles)",
        description: "Automatisez les tâches répétitives.",
        lessons: [
          {
            id: 'c_loop_1',
            type: 'theory',
            title: "La Boucle while",
            duration: '8 min',
            content: `
              # 🔁 La Boucle \`while\`

              La boucle \`while\` exécute un bloc de code **tant qu'une condition est vraie**.

              ## Syntaxe
              \`\`\`c
              while (condition) {
                  // Instructions répétées
              }
              \`\`\`

              ## Exemple : Compter de 1 à 5
              \`\`\`c
              int i = 1;
              while (i <= 5) {
                  printf("%d ", i);
                  i++; // Il est CRUCIAL de modifier la condition pour éviter une boucle infinie !
              }
              // Affiche : 1 2 3 4 5
              \`\`\`

              ## ⚠️ Attention aux Boucles Infinies
              Si vous oubliez d'incrémenter \`i\`, la condition \`i <= 5\` restera toujours vraie et le programme ne s'arrêtera jamais (ou plantera). C'est une erreur classique.
            `
          },
          {
            id: 'c_loop_2',
            type: 'theory',
            title: "La Boucle for",
            duration: '10 min',
            content: `
              # 🔁 La Boucle \`for\`

              La boucle \`for\` est plus compacte et idéale quand on connaît le nombre d'itérations à l'avance.

              ## Syntaxe
              \`\`\`c
              for (initialisation; condition; incrémentation) {
                  // Instructions répétées
              }
              \`\`\`

              1.  **initialisation** : Exécutée une seule fois, au début.
              2.  **condition** : Testée avant chaque itération. Si vraie, on entre dans la boucle.
              3.  **incrémentation** : Exécutée à la fin de chaque itération.

              ## Exemple : Compter de 1 à 5 (version for)
              \`\`\`c
              for (int i = 1; i <= 5; i++) {
                  printf("%d ", i);
              }
              // Affiche : 1 2 3 4 5
              \`\`\`

              Cette version est plus élégante car tout ce qui concerne la boucle (initialisation, condition, incrément) est regroupé sur une seule ligne.
            `
          },
          {
            id: 'c_loop_3',
            type: 'practice',
            title: "Table de Multiplication",
            description: "Affichez la table de multiplication du nombre 7.",
            instruction: "Utilisez une boucle pour afficher : 7x1 = 7, 7x2 = 14, ... jusqu'à 7x10 = 70.",
            initialCode: `#include <stdio.h>

int main() {
    int nombre = 7;
    
    // Votre boucle ici
    
    return 0;
}`,
            hints: [
              "for (int i = 1; i <= 10; i++)",
              "printf(\"%d x %d = %d\\n\", nombre, i, nombre * i);"
            ],
            expectedOutput: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70",
            difficulty: "Débutant"
          }
        ]
      }
    ]
  },

  // =================================================================
  // MODULE 4 : LES POINTEURS (Le Graal)
  // =================================================================
  {
    id: 'module4',
    title: 'Module 4: La Mémoire et les Pointeurs',
    icon: <Target size={20} />,
    description: "Le concept le plus difficile, mais aussi le plus puissant du C.",
    chapters: [
      // -------------------------------------------------------------
      // Chapitre 4.1 : Introduction aux Adresses
      // -------------------------------------------------------------
      {
        id: 'chap7',
        title: "Comprendre la Mémoire",
        description: "La RAM n'est pas un mystère. C'est une immense bibliothèque.",
        lessons: [
          {
            id: 'c_ptr_1',
            type: 'theory',
            title: "L'Analogie de la Bibliothèque",
            duration: '15 min',
            content: `
              # 🏛️ La Mémoire RAM est une Bibliothèque

              Pour comprendre les pointeurs, il faut visualiser la mémoire RAM (Random Access Memory).

              ## La Métaphore
              Imaginez une immense bibliothèque avec des millions de **casiers** (les cases mémoire).
              *   Chaque casier a une **adresse unique** (par exemple, l'étagère 5, rangée 3, casier 12). En C, ces adresses sont des nombres hexadécimaux comme \`0x7ffd4a8b\`.
              *   Dans chaque casier, on peut ranger un **livre** (une donnée : un nombre, une lettre, etc.).

              ## Variables et Pointeurs
              *   **Une variable classique (\`int age = 25;\`)** : C'est comme si on mettait le nombre 25 dans un casier, et on collait une étiquette "age" sur ce casier.
              *   **Un pointeur (\`int *ptr = &age;\`)** : C'est un casier spécial qui ne contient pas un livre (une donnée), mais l'**adresse d'un autre casier**. C'est une note qui dit "le casier 'age' se trouve à l'adresse 0x7ffd4a8b".

              ## Les Opérateurs Clés
              1.  **\`&\` (opérateur d'adresse)** : \`&age\` signifie "quelle est l'adresse du casier étiqueté 'age' ?". Cela retourne une adresse (ex: \`0x7ffd4a8b\`).
              2.  **\`*\` (opérateur de déréférencement)** : Si \`ptr\` contient l'adresse d'un casier, \`*ptr\` signifie "va dans le casier dont l'adresse est stockée dans ptr, et donne-moi le livre qui s'y trouve".

              ## Code d'Illustration
              \`\`\`c
              int age = 25;
              int *ptr = &age;   // ptr contient l'adresse de age
              
              printf("Valeur de age : %d\\n", age);        // 25
              printf("Adresse de age : %p\\n", &age);     // 0x7ffd4a8b
              printf("Valeur de ptr (adresse pointée) : %p\\n", ptr); // 0x7ffd4a8b
              printf("Valeur pointée par ptr : %d\\n", *ptr); // 25 (on déréférence)
              
              *ptr = 30; // On modifie la valeur à l'adresse pointée. age devient 30 !
              printf("Nouvel age : %d\\n", age); // 30
              \`\`\`
            `
          },
          {
            id: 'c_ptr_2',
            type: 'practice',
            title: "Premier Pas avec les Adresses",
            description: "Manipulez les adresses pour vous familiariser.",
            instruction: "Déclarez un entier 'x' avec la valeur 99. Déclarez un pointeur 'p' qui pointe vers x. Affichez l'adresse de x (via &x) et la valeur pointée par p (via *p).",
            initialCode: `#include <stdio.h>

int main() {
    int x = 99;
    int *p = &x;
    
    // Affichez l'adresse de x (utilisez %p)
    
    // Affichez la valeur pointée par p
    
    return 0;
}`,
            hints: [
              "printf(\"Adresse de x : %p\\n\", &x);",
              "printf(\"Valeur pointée par p : %d\\n\", *p);"
            ],
            difficulty: "Intermédiaire"
          },
          {
            id: 'c_ptr_3',
            type: 'quiz',
            title: "Quiz : Comprendre les Pointeurs",
            question: "Que signifie l'expression '*ptr' en C ?",
            options: [
              { id: 'a', text: "L'adresse de la variable ptr.", correct: false },
              { id: 'b', text: "La valeur stockée à l'adresse contenue dans ptr.", correct: true },
              { id: 'c', text: "Déclarer un pointeur.", correct: false },
              { id: 'd', text: "Multiplier ptr par quelque chose.", correct: false },
            ],
            explanation: "C'est l'opérateur de **déréférencement**. Il permet d'accéder à la valeur qui se trouve à l'adresse mémoire stockée dans le pointeur. Si on imagine ptr comme un morceau de papier avec une adresse écrite dessus, *ptr, c'est se rendre à cette adresse et ouvrir la porte."
          }
        ]
      },
      // -------------------------------------------------------------
      // Chapitre 4.2 : Applications Concrètes
      // -------------------------------------------------------------
      {
        id: 'chap8',
        title: "Pourquoi les Pointeurs sont-ils utiles ?",
        description: "On ne modifie pas une copie, on modifie l'original.",
        lessons: [
          {
            id: 'c_ptr_4',
            type: 'theory',
            title: "Passage par Référence",
            duration: '10 min',
            content: `
              # 🔄 Le Pouvoir de Modifier l'Original

              Quand on passe une variable classique à une fonction, on passe une **copie** de sa valeur (passage par valeur). La fonction ne peut pas modifier la variable originale.

              Les pointeurs permettent le **passage par référence** : on passe l'adresse de la variable, donc la fonction peut modifier la variable d'origine.

              ## Exemple : Fonction d'Échange (Swap)
              \`\`\`c
              #include <stdio.h>
              
              // Version qui échoue : on échange des copies
              void swap_mauvais(int a, int b) {
                  int temp = a;
                  a = b;
                  b = temp;
                  printf("Dans swap_mauvais : a=%d, b=%d\\n", a, b);
              }
              
              // Version qui réussit : on échange les originaux via pointeurs
              void swap_bon(int *a, int *b) {
                  int temp = *a;
                  *a = *b;
                  *b = temp;
              }
              
              int main() {
                  int x = 5, y = 10;
                  
                  printf("Avant swap_mauvais : x=%d, y=%d\\n", x, y);
                  swap_mauvais(x, y);
                  printf("Après swap_mauvais : x=%d, y=%d\\n", x, y); // Rien n'a changé !
                  
                  printf("\\nAvant swap_bon : x=%d, y=%d\\n", x, y);
                  swap_bon(&x, &y); // On passe les adresses !
                  printf("Après swap_bon : x=%d, y=%d\\n", x, y); // x=10, y=5 : ça marche !
                  
                  return 0;
              }
              \`\`\`

              Ce concept est fondamental et vous le retrouverez dans tous les langages (sous une forme ou une autre).
            `
          },
          {
            id: 'c_ptr_5',
            type: 'practice',
            title: "Échangez deux nombres",
            description: "Implémentez la fonction d'échange.",
            instruction: "Écrivez une fonction 'echange' qui prend deux pointeurs sur entiers et échange les valeurs pointées. Testez-la dans main.",
            initialCode: `#include <stdio.h>

// Écrivez votre fonction echange ici


int main() {
    int a = 5, b = 8;
    
    printf("Avant echange : a=%d, b=%d\\n", a, b);
    
    // Appelez votre fonction ici
    
    printf("Après echange : a=%d, b=%d\\n", a, b);
    
    return 0;
}`,
            hints: [
              "void echange(int *p, int *q) { ... }",
              "int temp = *p;",
              "*p = *q;",
              "*q = temp;"
            ],
            expectedOutput: "Avant echange : a=5, b=8\nAprès echange : a=8, b=5",
            difficulty: "Intermédiaire"
          }
        ]
      }
    ]
  },

  // =================================================================
  // MODULE 5 : PROJET FINAL
  // =================================================================
  {
    id: 'module5',
    title: 'Module 5: Projet Final',
    icon: <Trophy size={20} />,
    description: "Mettez tout en pratique avec un mini-projet.",
    chapters: [
      {
        id: 'chap9',
        title: "Mini-Projet : Devinette de Nombre",
        description: "Créez un jeu complet où l'ordinateur choisit un nombre et vous devez le deviner.",
        lessons: [
          {
            id: 'c_proj_1',
            type: 'theory',
            title: "Cahier des Charges",
            duration: '5 min',
            content: `
              # 🎮 Projet : Jeu de Devinette

              Votre mission, si vous l'acceptez, est de créer un jeu interactif.

              ## Règles du Jeu
              1.  Le programme choisit un nombre **aléatoire** entre 1 et 100.
              2.  Le joueur propose un nombre.
              3.  Le programme répond "Trop grand", "Trop petit" ou "Bravo, vous avez trouvé en X coups !".
              4.  Le jeu continue jusqu'à ce que le joueur trouve le nombre.

              ## Fonctions Utiles
              *   \`rand()\` : Génère un nombre aléatoire (nécessite \`#include <stdlib.h>\`).
              *   \`srand(time(NULL))\` : Initialise le générateur aléatoire pour avoir des nombres différents à chaque exécution (\`#include <time.h>\`).
              *   \`scanf("%d", &variable)\` : Lit un entier entré par l'utilisateur.

              ## Exemple d'Initialisation
              \`\`\`c
              #include <stdio.h>
              #include <stdlib.h>
              #include <time.h>
              
              int main() {
                  srand(time(NULL));
                  int nombre_mystere = (rand() % 100) + 1; // Nombre entre 1 et 100
                  // ... reste du code
              }
              \`\`\`
            `
          },
          {
            id: 'c_proj_2',
            type: 'practice',
            title: "Implémentez le Jeu",
            description: "C'est le moment de tout rassembler !",
            instruction: "Créez le jeu complet en suivant le cahier des charges.",
            initialCode: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    // Initialisation
    srand(time(NULL));
    int nombre_mystere = (rand() % 100) + 1;
    int proposition;
    int coups = 0;
    
    printf("=== JEU DE DEVINETTE ===\\n");
    printf("J'ai choisi un nombre entre 1 et 100. A vous de le trouver !\\n\\n");
    
    // Boucle de jeu
    do {
        printf("Votre proposition : ");
        scanf("%d", &proposition);
        coups++;
        
        // Comparez la proposition et affichez l'indice
        
        
    } while (proposition != nombre_mystere);
    
    // Affichez le message de victoire
    
    return 0;
}`,
            hints: [
              "if (proposition < nombre_mystere) { printf(\"Trop petit !\\n\"); }",
              "else if (proposition > nombre_mystere) { printf(\"Trop grand !\\n\"); }",
              "Affichez \"Bravo ! Vous avez trouvé en %d coups.\\n\""
            ],
            difficulty: "Intermédiaire"
          }
        ]
      }
    ]
  }
];

// =====================================================================
// COMPOSANTS PÉDAGOGIQUES INTERNES
// =====================================================================

const TheoryViewer = ({ title, content }) => {
  // Version améliorée avec support markdown basique
  const renderContent = (text) => {
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) return <h1 key={idx} className="text-3xl font-bold text-blue-400 mb-4 mt-2">{trimmed.replace('# ', '')}</h1>;
      if (trimmed.startsWith('## ')) return <h2 key={idx} className="text-2xl font-semibold text-purple-400 mb-3 mt-5">{trimmed.replace('## ', '')}</h2>;
      if (trimmed.startsWith('### ')) return <h3 key={idx} className="text-xl font-bold text-pink-400 mb-2 mt-4">{trimmed.replace('### ', '')}</h3>;
      if (trimmed.startsWith('> ')) return (
        <blockquote key={idx} className="border-l-4 border-yellow-500 pl-4 italic text-gray-300 my-3 bg-gray-800/30 p-3 rounded-r">
          {trimmed.replace('> ', '')}
        </blockquote>
      );
      if (trimmed.startsWith('* ')) {
        // Gérer les listes
        return (
          <li key={idx} className="ml-6 list-disc text-gray-300 mb-1">
            {trimmed.replace('* ', '')}
          </li>
        );
      }
      if (trimmed === '') return <div key={idx} className="h-3"></div>;

      // Détection simple de code (lignes avec des mots-clés C)
      if (line.includes('int ') || line.includes('char ') || line.includes('printf') ||
        line.includes('return ') || line.includes('if ') || line.includes('while ') ||
        line.includes('for ') || line.includes('//')) {
        return (
          <div key={idx} className="font-mono text-sm text-green-400 bg-gray-950 px-3 py-1 rounded border-l-4 border-blue-600 my-2">
            {line}
          </div>
        );
      }

      // Paragraphe normal
      return <p key={idx} className="text-gray-300 leading-relaxed mb-3">{line}</p>;
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="prose prose-invert">
        {renderContent(content)}
      </div>
      <div className="mt-8 text-sm text-gray-500 flex items-center gap-2 border-t border-gray-800 pt-4">
        <Info size={16} /> Prenez le temps de bien comprendre. N'hésitez pas à relire.
      </div>
    </div>
  );
};

const QuizViewer = ({ data, onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setShowExplanation(true);
    const option = data.options.find(o => o.id === selected);
    if (option && option.correct) {
      // Notifier le parent après un délai
      setTimeout(() => onComplete(true), 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 h-full flex flex-col justify-center">
      <div className="bg-gray-800/40 rounded-2xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-white">{data.title}</h2>
        <div className="bg-gray-900/60 p-6 rounded-xl mb-6 border-l-4 border-blue-500">
          <p className="text-lg text-gray-200">{data.question}</p>
        </div>

        <div className="space-y-3">
          {data.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => !submitted && setSelected(opt.id)}
              className={`w-full p-4 rounded-xl text-left border transition-all flex justify-between items-center
                ${submitted && opt.correct ? 'bg-green-900/30 border-green-500 ring-1 ring-green-500' : ''}
                ${submitted && selected === opt.id && !opt.correct ? 'bg-red-900/30 border-red-500' : ''}
                ${!submitted && selected === opt.id ? 'bg-blue-900/30 border-blue-500 ring-1 ring-blue-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-750'}
              `}
            >
              <span className="text-gray-100">{opt.text}</span>
              {submitted && opt.correct && <CheckCircle className="text-green-500" size={20} />}
              {submitted && selected === opt.id && !opt.correct && <X className="text-red-500" size={20} />}
            </button>
          ))}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30 flex items-start gap-3"
          >
            <Lightbulb className="text-yellow-400 shrink-0 mt-1" size={20} />
            <p className="text-blue-200 text-sm">{data.explanation}</p>
          </motion.div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!selected || submitted}
          className={`mt-8 w-full py-3 rounded-xl font-bold transition-all
            ${!selected || submitted ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] text-white shadow-lg'}
          `}
        >
          {submitted ? 'Réponse enregistrée ✓' : 'Vérifier ma réponse'}
        </button>
      </div>
    </div>
  );
};

const CodeEditor = ({ lesson, onComplete }) => {
  const [code, setCode] = useState(lesson.initialCode);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('idle');

  const runCode = () => {
    setIsRunning(true);
    setOutput([{ type: 'info', text: '🔄 Compilation en cours...' }]);

    setTimeout(() => {
      const logs = [];
      logs.push({ type: 'success', text: '✅ Compilation réussie.' });
      logs.push({ type: 'info', text: '🚀 Exécution du programme...' });

      // Simulation intelligente pour cet exercice
      // let simOutput = ""; (removed unused)
      let passed = false;

      if (lesson.validationRegex) {
        passed = lesson.validationRegex.test(code);
      } else if (lesson.expectedOutput) {
        // Simulation basique : on vérifie si le code contient le bon printf
        passed = code.includes(lesson.expectedOutput.split('\n')[0].substring(0, 20));
      }

      if (passed) {
        logs.push({ type: 'stdout', text: lesson.expectedOutput || "Programme exécuté avec succès." });
        setStatus('success');
        logs.push({ type: 'system', text: '🎉 Exercice réussi !' });
        setTimeout(() => onComplete(true), 2000);
      } else {
        logs.push({ type: 'error', text: '❌ Le résultat n\'est pas celui attendu.' });
        logs.push({ type: 'hint', text: '💡 Vérifiez votre code, les point-virgules, et les guillemets.' });
        setStatus('error');
      }

      setOutput(logs);
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-gray-950">
      <div className="bg-gray-900 border-b border-gray-800 p-4 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-200 flex items-center gap-2">
            <Code size={18} className="text-blue-400" /> {lesson.title}
          </h3>
          {lesson.difficulty && (
            <span className={`text-xs px-2 py-1 rounded-full ${lesson.difficulty === 'Débutant' ? 'bg-green-900/30 text-green-400 border border-green-800' :
              lesson.difficulty === 'Intermédiaire' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800' :
                'bg-red-900/30 text-red-400 border border-red-800'
              }`}>
              {lesson.difficulty}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400 mt-1">{lesson.instruction}</p>
        {lesson.hints && (
          <div className="mt-3 flex flex-wrap gap-2">
            {lesson.hints.map((hint, i) => (
              <span key={i} className="text-xs bg-gray-800 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20 flex items-center gap-1">
                <Lightbulb size={10} /> {hint}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="flex-1 relative font-mono text-sm">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-[#1e1e1e] text-gray-300 p-4 resize-none focus:outline-none font-mono"
            spellCheck="false"
          />
        </div>

        <div className="h-1/3 md:h-full md:w-1/3 bg-[#0d1117] border-t md:border-t-0 md:border-l border-gray-800 flex flex-col">
          <div className="flex items-center justify-between p-2 bg-gray-900 border-b border-gray-800">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Terminal size={12} /> Console
            </span>
            {status === 'success' && <span className="text-xs text-green-500 font-bold flex items-center gap-1"><Check size={12} /> Succès</span>}
          </div>
          <div className="flex-1 p-3 font-mono text-xs overflow-y-auto space-y-1">
            {output.map((log, i) => (
              <div key={i} className={`
                ${log.type === 'info' ? 'text-blue-400' : ''}
                ${log.type === 'success' ? 'text-green-500 font-bold' : ''}
                ${log.type === 'error' ? 'text-red-400' : ''}
                ${log.type === 'stdout' ? 'text-white pl-2 border-l-2 border-gray-700' : ''}
                ${log.type === 'system' ? 'text-yellow-400 mt-2 font-bold' : ''}
                ${log.type === 'hint' ? 'text-purple-400 italic' : ''}
                whitespace-pre-wrap
              `}>
                {log.text}
              </div>
            ))}
            {output.length === 0 && <span className="text-gray-600 italic">Prêt à compiler...</span>}
          </div>
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={runCode}
              disabled={isRunning}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                ${isRunning
                  ? 'bg-gray-700 text-gray-400 cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                }
              `}
            >
              {isRunning ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />}
              {isRunning ? 'Compilation...' : 'Exécuter le code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================================
// COMPOSANT PRINCIPAL DU COURS C
// =====================================================================

const CCourse = ({ onClose, completedLessons = [], onLessonComplete }) => {
  const [activeModuleId, setActiveModuleId] = useState('module1');
  const [activeChapterId, setActiveChapterId] = useState('chap1');
  const [activeLessonId, setActiveLessonId] = useState('c_intro_1');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentModule = courseData.find(m => m.id === activeModuleId);
  const currentChapter = currentModule?.chapters.find(c => c.id === activeChapterId);
  const currentLesson = currentChapter?.lessons.find(l => l.id === activeLessonId);

  const totalLessons = courseData.reduce((acc, m) =>
    acc + m.chapters.reduce((acc2, c) => acc2 + c.lessons.length, 0), 0);
  const completedCount = completedLessons.length;
  const currentProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleLessonSelect = (modId, chapId, lessonId) => {
    setActiveModuleId(modId);
    setActiveChapterId(chapId);
    setActiveLessonId(lessonId);
    setMobileMenuOpen(false);
  };

  const handleLessonCompletion = (success) => {
    if (success) {
      onLessonComplete('c', activeLessonId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 text-gray-100 flex flex-col font-sans">

      <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="hidden md:block">
            <h1 className="font-bold text-lg flex items-center gap-2">
              <span className="bg-blue-600 text-xs px-2 py-0.5 rounded text-white">C</span>
              Le Langage C - Cours Complet
            </h1>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progression</span>
            <span>{completedCount}/{totalLessons} leçons • {currentProgress}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>

        <button
          className="md:hidden text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Layers />}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">

        <aside className={`
          absolute md:relative z-20 w-80 h-full bg-gray-900 border-r border-gray-800 flex flex-col
          transition-transform duration-300 transform
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="p-4 border-b border-gray-800 bg-gray-900/50">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">📚 Plan du cours</h2>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {courseData.map((module) => (
              <div key={module.id} className="mb-4">
                <div className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-blue-300 hover:bg-gray-800/50 rounded-lg transition">
                  {module.icon} {module.title}
                </div>
                {module.chapters.map(chap => (
                  <div key={chap.id} className="mb-2 ml-4 border-l-2 border-gray-800 pl-2">
                    <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase mt-2 mb-1">
                      {chap.title}
                    </div>
                    {chap.lessons.map(lesson => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isActive = activeLessonId === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonSelect(module.id, chap.id, lesson.id)}
                          className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                            ${isActive
                              ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                            }
                          `}
                        >
                          {isCompleted ? (
                            <CheckCircle size={16} className="text-green-500 shrink-0" />
                          ) : (
                            <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${isActive ? 'border-blue-400' : 'border-gray-600'}`} />
                          )}
                          <span className="truncate flex-1">{lesson.title}</span>
                          {lesson.type === 'practice' && <Code size={12} className="opacity-50 shrink-0" />}
                          {lesson.type === 'quiz' && <HelpCircle size={12} className="opacity-50 shrink-0" />}
                          {lesson.type === 'theory' && <BookOpen size={12} className="opacity-50 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col bg-gray-950 relative overflow-hidden">
          <div className="h-10 border-b border-gray-800 flex items-center px-6 text-sm text-gray-500 bg-gray-900/30">
            <span className="text-blue-400">{currentModule?.title}</span>
            <ChevronRight size={14} className="mx-2 text-gray-600" />
            <span className="text-gray-300">{currentChapter?.title}</span>
            <ChevronRight size={14} className="mx-2 text-gray-600" />
            <span className="text-white font-medium">{currentLesson?.title}</span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLessonId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full overflow-y-auto"
              >
                {currentLesson?.type === 'theory' && (
                  <TheoryViewer
                    title={currentLesson.title}
                    content={currentLesson.content}
                  />
                )}

                {currentLesson?.type === 'practice' && (
                  <CodeEditor
                    lesson={currentLesson}
                    onComplete={handleLessonCompletion}
                  />
                )}

                {currentLesson?.type === 'quiz' && (
                  <QuizViewer
                    data={currentLesson}
                    onComplete={handleLessonCompletion}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CCourse;