const bashCourses = [
    {
        title: "Bash Linux - Niveau Débutant",
        description: "Apprenez à utiliser votre ordinateur sans souris. Maîtrisez le terminal, la navigation dans les fichiers et les commandes de base de Linux.",
        category: "DevOps",
        level: "Débutant",
        duration: "10 heures",
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
        rating: 4.8,
        students: 12400,
        language: "french",
        isFree: true,
        tags: ["Bash", "Linux", "Terminal", "débutant", "système"],
        chapters: [
            {
                title: "Introduction et Navigation (cd, ls, pwd)",
                description: "Se repérer dans le labyrinthe des dossiers.",
                order: 1,
                duration: "3 heures",
                content: "Bienvenue dans le shell Bash, le cœur de Linux. Fini l'interface graphique. La commande `pwd` (print working directory) vous donne votre dossier actuel absolu. `ls` (list) liste les fichiers présents. Et `cd` (change directory) vous permet de voyager, comme si vous cliquiez sur des dossiers. Un point spécial `.` désigne le dossier courant et deux points `..` désigne le parent.",
                objectives: ["Savoir où on est avec pwd", "Démasquer les fichiers cachés avec ls -a", "Remonter l'arborescence (cd ..)"],
                exercises: [
                    {
                        title: "Naviguer de deux crans",
                        description: "Quelle commande vous permet de remonter de 2 dossiers en arrière dans l'arborescence ?",
                        difficulty: "Facile",
                        solution: "cd ../..",
                        hints: ["Chaque niveau apparenté est séparé par un slash (/) en linux unix."]
                    }
                ],
                resources: [
                    {
                        title: "Vos premiers pas dans le Terminal",
                        type: "video",
                        url: "https://www.youtube.com/embed/zBOkXw4"
                    },
                    {
                        title: "Terminal Interactif Linux",
                        type: "code",
                        url: "sandbox://bash/nav"
                    }
                ]
            },
            {
                title: "Créer, Copier et Supprimer (touch, mkdir, cp, rm)",
                description: "Manipuler la matière : vos fichiers.",
                order: 2,
                duration: "4 heures",
                content: "Pour créer un fichier vide, on utilise `touch fichier.txt`. Pour un dossier, c'est `mkdir dossier`. Copier un élément se fait par `cp source destination` (avec `-r` pour un dossier complet). Déplacer ou renommer avec `mv vieux_nom nouveau_nom`. La destruction se fait avec `rm fichier`. ATTENTION: Sous linux, pas de corbeille, un `rm` est définitif ! Le drame suprême est `rm -rf /`.",
                objectives: ["Faire des dossiers mkdir", "Copier un dossier itérativement flag -r", "Supprimer ou Move (mv)"],
                exercises: [
                    {
                        title: "Renommer un fichier",
                        description: "Renommez le fichier 'rapport.txt' en 'final.txt'.",
                        difficulty: "Facile",
                        solution: "mv rapport.txt final.txt",
                        hints: ["MV veut dire Move mais il fait office de fonction Rename par translation au mème emplacement."]
                    }
                ],
                resources: [
                    {
                        title: "Manipulation des Fichiers system (CLI)",
                        type: "video",
                        url: "https://www.youtube.com/embed/g2J0Nbg"
                    }
                ]
            },
            {
                title: "Lecture de fichiers (cat, less, echo)",
                description: "Voir dedans sans tout casser.",
                order: 3,
                duration: "3 hours",
                content: "`cat` lit et recrache d'un trait tout le contenu d'un fichier dans le terminal. Trop long ? On utilise `less` (ou son ancêtre `more`) pour paginer avec la touche Espace. Et la commande `echo` ? Elle n'est rien d'autre que du printf de bash, idéale pour injecter des valeurs rapides dans un fichier avec l'opérateur de redirection chevron `>`. Exemple: `echo \"salut\" > test.txt`.",
                objectives: ["Comprendre l'I/O (Input Output)", "Voir un court fichier (cat)", "Maitriser les chevrons de redirection ( > vs >> )"],
                exercises: [
                    {
                        title: "Ajout fin fichier",
                        description: "Ajoutez la pharse 'Ceci est la fin' au fichier existant log.txt. Ne l'ecrasez pas.",
                        difficulty: "Moyen",
                        solution: "echo \"Ceci est la fin\" >> log.txt",
                        hints: ["Le double chevron >> permet l'append mode. Le > écrase l'integrite du fichier."]
                    }
                ],
                resources: [
                    {
                        title: "Lecture Rapide Bash",
                        type: "video",
                        url: "https://www.youtube.com/embed/zB8"
                    }
                ]
            }
        ]
    },
    {
        title: "Bash Linux - Niveau Intermédiaire",
        description: "Les Permissions, la recherche en terminal, GREP et les chaînages de commandes (Pipes).",
        category: "DevOps",
        level: "Intermédiaire",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.7,
        students: 8500,
        language: "french",
        isFree: true,
        tags: ["Bash", "Pipes", "Grep", "intermédiaire"],
        chapters: [
            {
                title: "Recherche Puissante : Find et Grep",
                description: "Trouver le bon fichier. Scanner le bon texte dans milles fichiers.",
                order: 1,
                duration: "6 heures",
                content: "`find` est prodigieux pour localiser un fichier. Ex: `find / -name \"truc.conf\"` cherche depuis la racine toute l'arborescence. Ensuite, le roi absolu : `grep`. Cet outil extrait ou filtre les lignes contenant une expression régulière ou motif sur des gigas de data en quelques millisecondes. Utile pour parser `grep \"ERROR\" logfile.log`.",
                objectives: ["Mettre en valeur le Regex dans grep", "Find itératif -name -type d", "Associer ls à grep"],
                exercises: [
                    {
                        title: "Lister que du JS",
                        description: "Trouvez tout fichier qui se termine par l'extention javascript .js dans le dossier /src",
                        difficulty: "Difficile",
                        solution: "find /src -name \"*.js\"",
                        hints: ["L'utilisation de la metacaractere asterisque (*) en wildcard Linux"]
                    }
                ],
                resources: [
                    {
                        title: "Masterclass sur GREP et FIND",
                        type: "video",
                        url: "https://www.youtube.com/embed/38N"
                    }
                ]
            },
            {
                title: "Les Pipes (Tubes : | )",
                description: "Brancher la sortie de l'un sur l'entrée de l'autre",
                order: 2,
                duration: "5 heures",
                content: "La philosophie UNIX est : 'Faire une seule chose, et bien la faire'. Le caractère `|` (dit : Pipe) permets de passer la sortie console du premier programme au second. Vouloir lister vos dossier filtré ? `ls -la | grep \".txt\"` . Ce paradigme va révolutionner la conception de vos futurs codes d'architecture infra systeme.",
                objectives: ["Passer commande de Cat à Sort (tri)", "Utiliser pipe sur wc -l (word count line)"],
                exercises: [
                    {
                        title: "Combien d'Erreurs globales ?",
                        description: "Chainer un filtre \"FAIL\" sur file system.log et compter juste le nombre exact de lignes totales de ce dump.",
                        difficulty: "Moyen",
                        solution: "cat system.log | grep \"FAIL\" | wc -l",
                        hints: ["La commande wc (word count) a un arg line : -l pour compter ce qui viens d'amont."]
                    }
                ],
                resources: [
                    {
                        title: "Pipes en Shell: Magique",
                        type: "video",
                        url: "https://www.youtube.com/embed/bN"
                    }
                ]
            },
            {
                title: "Droits, Permissions (chown, chmod) & Processus",
                description: "Qui a le droit d'ouvrir la porte de chez vous.",
                order: 3,
                duration: "4 heures",
                content: "Linux base de la securité par le User / Group / Others. Le systeme lit sous 3 piliers RWX (Read = 4, Write = 2, Execute = 1). Donc donner autorisation totale au proprietaire (4+2+1=7) c'est `chmod 700 monFichier`. Nous verrons `sudo` permettant le 'superuser do' qui donne les pouvoirs radicaux root temporaires. Ainsi que ps et htop/top pour tuer des programmes d'arrière plan `kill -9 PID`",
                objectives: ["Changer proprietaire ou groupe avec chown", "Traduire en numerique octal les permissions (755, 777)"],
                exercises: [
                    {
                        title: "Le Droit Divin a Executer",
                        description: "Donner un droit d'execution global (+x) sur le fichier script.sh pour qu'il devienne executable terminal.",
                        difficulty: "Facile",
                        solution: "chmod +x script.sh",
                        hints: ["L'operateur '+' greffe un attribut sans modifier purement le calcul RWX d'avant."]
                    }
                ]
            }
        ]
    },
    {
        title: "Bash Linux - Niveau Expert (Avancé)",
        description: "Le monde Scripting Bash automatisé, Daemons, Taches cron et Réseautage avancé en Sysadmin CLI",
        category: "DevOps",
        level: "Avancé",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        students: 6200,
        language: "french",
        isFree: true,
        tags: ["Bash", "scripting", "sysadmin", "cron", "avancé"],
        chapters: [
            {
                title: "Scripting Bash : If, Boucles, AWK, SED",
                description: "Ne faire plus rien pour toujours.",
                order: 1,
                duration: "10 heures",
                content: "Vous mettez le shebang `#!/bin/bash` et devenez magiciens. Nous coderons formellement dans `.sh`. Le Bash incorpore de vraies structures for, if, while et prend des arguments positionnel system (`$1`, `$2`.. etc). Ajout de la maitrise SED (Search & Replace sur flux en chaine stream editor) pour editez dynamanique. `sed 's/Vieu/Nouveau/g' fichier`. Et AWK le processeur du traitement columnar.",
                objectives: ["Creer Bash File avec arg", "Modifier dynamiquement un JSON/Texte sed regex"],
                exercises: [
                    {
                        title: "Script condition d'arret args",
                        description: "Code l'interieur du if testant strictement qu'on a bien recu la valeur 2 comme premier argument de shell script bash ($1 == 2) sinon exit",
                        difficulty: "Moyen",
                        solution: "if [ \"$1\" -eq 2 ]; then\\n  echo \"Super\"\\nelse\\n  exit 1\\nfi",
                        hints: ["En bash les comparaisons numeriques c'est -eq (equals). Fini toujours les if par 'fi'."]
                    }
                ],
                resources: [
                    {
                        title: "Les shell scripts.sh",
                        type: "video",
                        url: "https://www.youtube.com/embed/2_GfT"
                    }
                ]
            },
            {
                title: "Taches Planifiées avec CRON",
                description: "Monde des robots à 3h du matin",
                order: 2,
                duration: "10 heures",
                content: "Si je veux relancer le serveur tout les mardi à 2h34am ? Le cronjob gère ca pour l'administrateur Système via sa table Cron `crontab -e`. C'est l'essence du backend DevOps asynchrone pour les backups régulières automates, qui s'axe autour des ses 5 astériques: Min, Heure, Jour du mois, Mois, Jour de Semaine.",
                objectives: ["Mettre au point syntaxes crotab", "Envoyer output cron job dans file > null "],
                exercises: [
                    {
                        title: "Backup tous les Minuits de Jeudi.",
                        description: "Faire syntaxe cron (format * * * * * ) pour lancer /script/backup.sh a Minuit (00h00) le jeudi (4ieme jours de de de la sem).",
                        difficulty: "Difficile",
                        solution: "0 0 * * 4 /script/backup.sh",
                        hints: ["Le dimanche peut valloir 0 ou 7. Lundi: 1 ... Jeudi: 4."]
                    }
                ]
            }
        ]
    }
];

module.exports = bashCourses;
