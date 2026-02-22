import { Terminal, FolderTree, Cpu, Shield, Zap, BookOpen } from 'lucide-react';
import React from 'react';

export const courseData = [
    {
        id: 'module1',
        title: "Le Terminal : Ta Nouvelle Baguette Magique",
        description: "Découvre l'outil le plus puissant de ton ordinateur. Pas de souris, juste des mots de pouvoir.",
        icon: <Terminal size={24} />,
        chapters: [
            {
                id: 'ch1',
                title: "Pourquoi le Terminal ?",
                lessons: [
                    {
                        id: 'bash_m_1_1',
                        type: 'theory',
                        title: "L'Illusion Graphique",
                        description: "Qu'est-ce que le terminal et pourquoi l'utiliser ?",
                        professorSpeech: "Bienvenue dans les coulisses, jeune hacker ! Tu passes tes journées à cliquer sur des boutons colorés. Mais derrière chaque clic, ton ordinateur exécute des commandes textuelles. Aujourd'hui, on enlève les petites roues du vélo.",
                        content: `
## L'Interface Graphique (GUI) vs La Ligne de Commande (CLI)

Imagine que ton ordinateur est un immense restaurant gastronomique.

- **L'Interface Graphique (GUI)**, c'est comme passer commande à un serveur. Tu montres du doigt la carte (tu cliques sur une icône), le serveur va en cuisine, et revient avec ton plat. C'est facile, c'est beau, mais tu es limité au menu.
- **La Ligne de Commande (CLI / Terminal)**, c'est comme entrer directement dans la cuisine et parler au Chef. Tu peux lui demander des choses qui ne sont pas sur la carte, combiner des ingrédients, et lui faire préparer 10 000 plats en une seconde.

> [!NOTE]
> Le "Terminal", "Console", "Invite de Commande" ou "Shell" : tous ces mots désignent grosso modo la même chose : **un endroit où tu tapes du texte pour donner des ordres directs à l'ordinateur.**

## Bash : La langue du système

Pour parler au Chef, il faut parler sa langue. Sous Linux et macOS (et de plus en plus sous Windows), cette langue s'appelle souvent **Bash** (Bourne Again SHell).

C'est un interpréteur de commandes. Son seul but dans la vie : lire ce que tu tapes, comprendre ce que tu veux faire, et dire au système d'exploitation de le faire.
`
                    },
                    {
                        id: 'bash_m_1_2',
                        type: 'theory',
                        title: "Ta première commande",
                        description: "Où suis-je et qui suis-je ?",
                        professorSpeech: "Quand tu ouvres un terminal, tu te retrouves le plus souvent face à un écran noir avec un petit curseur qui clignote. Pas de panique, apprenons à nous repérer.",
                        content: `
## Le Prompt : Ton serviteur attentif

Quand tu ouvres le terminal, tu vois souvent quelque chose comme ça :
\`mouhamed@mon-pc:~$ \`

C'est le **Prompt** (l'invite). Il te dit : "Je suis prêt, maître. Que souhaitez-vous ?"
- \`mouhamed\` : C'est toi (l'utilisateur).
- \`mon-pc\` : C'est le nom de ta machine.
- \`~\` : C'est l'endroit où tu te trouves (ton dossier personnel).
- \`$\` : Indique que tu es un utilisateur classique (si tu vois un \`#\`, c'est que tu as les pouvoirs suprêmes, "root").

## Commande 1 : "Où suis-je ?" (\`pwd\`)

Dans l'interface graphique, tu sais dans quel dossier tu es grâce au titre de la fenêtre. Dans le terminal, tu es "aveugle". Pour savoir où tu es, utilise \`pwd\` (Print Working Directory = Affiche le dossier de travail).

[VISUALIZER] {"codeStr": "mouhamed@mon-pc:~$ pwd\\n/home/mouhamed\\nmouhamed@mon-pc:~$", "steps": [{"line": 1, "state": {"dossier_actuel": "Inconnu"}, "explanation": "Tu tapes 'pwd' et tu appuies sur Entrée."}, {"line": 2, "state": {"dossier_actuel": "/home/mouhamed"}, "explanation": "L'ordinateur te répond : Tu es dans le dossier '/home/mouhamed'."}]}

## Commande 2 : "Qui suis-je ?" (\`whoami\`)

Parfois, si tu te connectes sur un serveur distant, tu peux oublier sous quel compte tu es connecté.

[VISUALIZER] {"codeStr": "mouhamed@mon-pc:~$ whoami\\nmouhamed\\nmouhamed@mon-pc:~$", "steps": [{"line": 1, "state": {"utilisateur": "?"}, "explanation": "Tu demandes à l'ordinateur quel est ton identifiant."}, {"line": 2, "state": {"utilisateur": "mouhamed"}, "explanation": "Il te confirme ton nom d'utilisateur."}]}
`
                    }
                ]
            }
        ]
    },
    {
        id: 'module2',
        title: "Navigation et Arborescence",
        description: "Se déplacer dans le système de fichiers sans jamais toucher la souris.",
        icon: <FolderTree size={24} />,
        chapters: [
            {
                id: 'ch2',
                title: "L'Arbre de la Connaissance",
                lessons: [
                    {
                        id: 'bash_m_2_1',
                        type: 'theory',
                        title: "Qu'y a-t-il ici ?",
                        description: "La commande ls",
                        professorSpeech: "Maintenant qu'on sait où on est, regardons ce qu'il y a autour de nous. La lampe torche du terminal s'appelle 'ls'.",
                        content: `
## Lister le contenu avec \`ls\`

La commande \`ls\` (pour *list*) sert à afficher le contenu du répertoire (dossier) dans lequel tu te trouves actuellement.

[VISUALIZER] {"codeStr": "$ pwd\\n/home/mouhamed/Bureau\\n$ ls\\nCours   Images   notes.txt   Projets", "steps": [{"line": 1, "state": {"dossier": "Bureau"}, "explanation": "Tu es sur ton Bureau."}, {"line": 3, "state": {"dossier": "Bureau", "contenu": "Caché"}, "explanation": "Tu allumes la lampe torche avec 'ls'."}, {"line": 4, "state": {"dossier": "Bureau", "contenu": ["Cours", "Images", "notes.txt", "Projets"]}, "explanation": "Tu vois tes dossiers (Cours, Images, Projets) et tes fichiers (notes.txt)."}]}

## Les Options : Donner du style à tes commandes

Une commande peut prendre des **options** (ou drapeaux/flags) pour changer son comportement. En général, c'est un tiret suivi d'une lettre.

- \`ls -l\` : Affichage Long (Liste détaillée avec la taille, la date de modification, etc.).
- \`ls -a\` : Afficher TOUT, même les fichiers cachés (les fichiers qui commencent par un point, comme \`.gitignore\` ou \`.bashrc\`).
- \`ls -la\` : Tu peux combiner les options ! (Détails + Fichiers cachés).

> [!TIP]
> Dans le monde Linux, si tu veux cacher un fichier ou un dossier, il suffit de mettre un point \`.\` au début de son nom. 
`
                    },
                    {
                        id: 'bash_m_2_2',
                        type: 'theory',
                        title: "Changer de dimension",
                        description: "La commande cd pour naviguer.",
                        professorSpeech: "On a vu. Maintenant, bougeons. C'est le moment d'apprendre la téléportation.",
                        content: `
## Naviguer avec \`cd\`

\`cd\` signifie *Change Directory* (Changer de répertoire). C'est le double-clic du terminal.

- \`cd Documents\` : Entre dans le dossier "Documents" (qui doit se trouver là où tu es).
- \`cd ..\` : Règle d'or ! \`..\` signifie "Le dossier parent". Cela te fait reculer/remonter d'un cran.
- \`cd ~\` ou juste \`cd\` : Te téléporte directemet dans ta maison, ton dossier utilisateur.

[VISUALIZER] {"codeStr": "mouhamed@pc:~$ pwd\\n/home/mouhamed\\nmouhamed@pc:~$ cd Projets\\nmouhamed@pc:~/Projets$ pwd\\n/home/mouhamed/Projets\\nmouhamed@pc:~/Projets$ cd ..\\nmouhamed@pc:~$ pwd\\n/home/mouhamed", "steps": [{"line": 1, "state": {"pos": "Maison"}, "explanation": "Tu es chez toi."}, {"line": 3, "state": {"pos": "Maison"}, "explanation": "Tu décides d'aller dans le dossier Projets."}, {"line": 4, "state": {"pos": "Projets"}, "explanation": "Le prompt change ! Tu es maintenant dans ~/Projets."}, {"line": 6, "state": {"pos": "Projets"}, "explanation": "Tu utilises 'cd ..' pour reculer d'une étape."}, {"line": 8, "state": {"pos": "Maison"}, "explanation": "Te revoilà dans ton dossier principal."}]}

> [!IMPORTANT]
> **Chemin relatif vs Chemin absolu**
> Si tu tapes \`cd Projets\`, c'est un chemin **relatif** : l'ordinateur cherche "Projets" *autour de toi*.
> Si tu tapes \`cd /var/www\`, c'est un chemin **absolu** : l'ordinateur part de la racine (le tout premier dossier \`/\`) et parcourt le chemin exact, peu importe où tu te trouves actuellement.
`
                    },
                    {
                        id: 'bash_m_2_3',
                        type: 'practice',
                        title: "Entraînement : Navigation",
                        description: "Prouve que tu sais te déplacer.",
                        professorSpeech: "Tu es dans ton dossier 'Images'. Tu veux te rendre dans le dossier 'Recettes' qui se trouve dans ton dossier parent. Quelle commande tapes-tu ?",
                        instruction: "Écris la commande qui permet de reculer d'un dossier, puis d'entrer dans 'Recettes'. (Astuce : on a vu que `..` permet de reculer, et tu peux utiliser des `/` pour lier les dossiers).",
                        initialCode: `cd `,
                        solution: `cd ../Recettes`,
                        validationRegex: /cd\s+\.\.\/Recettes/,
                        hints: [
                            "Tu peux enchaîner les dossiers en les séparant par des slashes '/'.",
                            "D'abord reculer avec `..`",
                            "Ensuite entrer dans Recettes : `../Recettes`"
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'module3',
        title: "Création et Destruction",
        description: "Devenir le roi de ton espace de stockage.",
        icon: <Zap size={24} />,
        chapters: [
            {
                id: 'ch3',
                title: "Manipuler la Matière",
                lessons: [
                    {
                        id: 'bash_m_3_1',
                        type: 'theory',
                        title: "Créer des choses",
                        description: "mkdir et touch",
                        professorSpeech: "Assez observé. Il est temps de bâtir. Dans la vraie vie, tu fais 'Clic droit -> Nouveau dossier'. Ici, c'est bien plus rapide.",
                        content: `
## Créer un dossier avec \`mkdir\`

\`mkdir\` (Make Directory).
Exemple : \`mkdir Projets_Secrets\` crée un nouveau dossier.

Tu peux même en créer plein d'un coup, séparés par des espaces :
\`mkdir Toto Tata Tutu\` (Crée 3 dossiers d'un coup ! Essaie de faire ça avec ta souris...).

## Créer un fichier de magie avec \`touch\`

La commande \`touch\` sert à mettre à jour la date de modification d'un fichier. MAIS, petit secret : si le fichier n'existe pas, \`touch\` va le créer, complètement vide.

\`touch index.html\` -> Crée un fichier \`index.html\` vide, prêt à être édité.

[VISUALIZER] {"codeStr": "$ ls\\n$ mkdir Web\\n$ cd Web\\n$ touch page.html style.css\\n$ ls\\npage.html   style.css", "steps": [{"line": 1, "state": {"disque": "Vide"}, "explanation": "Il n'y a rien ici."}, {"line": 2, "state": {"disque": "Dossier Web"}, "explanation": "On fabrique un dossier Web."}, {"line": 4, "state": {"disque": "Dossier Web"}, "explanation": "On entre dedans et on crée deux fichiers d'un coup avec touch."}, {"line": 6, "state": {"disque": "Web(page.html, style.css)"}, "explanation": "Et voilà, on vérifie avec ls, les fichiers sont là."}]}
`
                    },
                    {
                        id: 'bash_m_3_2',
                        type: 'theory',
                        title: "Détruire",
                        description: "Le pouvoir effrayant de rm",
                        professorSpeech: "Attention. Ce que je vais t'apprendre ici est dangereux. Sous Linux dans le terminal, il n'y a pas de CORBEILLE. Ce qui est supprimé l'est définitivement.",
                        content: `
## Supprimer un fichier avec \`rm\`

\`rm\` (Remove).
Exemple : \`rm brouillon.txt\` efface le fichier pour toujours.

## Supprimer un dossier

Si tu essaies de faire \`rm Modèles\`, le terminal va crier : *"rm: Modèles: is a directory"*. \`rm\` est sécurisé et refuse d'effacer les dossiers par défaut.

Pour effacer un dossier (et TOUT ce qu'il contient), il faut forcer le destin avec des options :
\`rm -r Modèles\` (Le \`-r\` veut dire Récursif. Il plonge dans le dossier, efface tout, puis efface le dossier lui-même).

> [!CAUTION]
> Tu entendras peut-être parler sur les forums de la blague de \`rm -rf /\`. 
> - \`-r\` : Récursif (efface les dossiers)
> - \`-f\` : Force (ne pose aucune question, ne s'arrête devant rien)
> - \`/\` : La racine absolue de ton ordinateur.
> **En clair : Cette commande efface purement et simplement tout le disque dur de ton PC instantanément. Ne tape JAMAIS ça.**
`
                    }
                ]
            }
        ]
    }
];
