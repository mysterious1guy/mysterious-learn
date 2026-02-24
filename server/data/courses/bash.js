const bashCourses = [
    {
        id: "bash-niveau-d-butant",
        title: "Bash Linux - Niveau Débutant",
        description: "Maîtrisez l'interface originelle. Abandonnez la souris, comprenez l'arborescence UNIX et devenez plus rapide que la lumière pour manipuler votre machine.",
        category: "DevOps",
        level: "Débutant",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
        rating: 4.8,
        students: 7200,
        language: "bash",
        isFree: true,
        tags: ["bash", "linux", "terminal", "débutant"],
        chapters: [
            {
                title: "1. Le Kernel, le Shell & l'Arborescence",
                description: "Comprenez la différence entre OS, Kernel et Shell.",
                order: 1,
                duration: "10 heures",
                content: "Le Kernel est le chef d'orchestre. Le Shell (Bash) est votre interprète. Apprenez à naviguer dans l'arborescence UNIX (`/`, `/home`, `/etc`) via des chemins absolus et relatifs.",
                objectives: ["Distinguer Kernel et Shell", "Naviguer via cd, pwd, ls", "Comprendre la hiérarchie standard FHS"],
                resources: []
            },
            {
                title: "2. CRUD Fichiers & Permissions",
                description: "Manipulez les fichiers et apprenez la sécurité UNIX.",
                order: 2,
                duration: "15 heures",
                content: "Apprenez à créer (`touch`, `mkdir`), copier (`cp`), déplacer (`mv`) et supprimer (`rm`). Maîtrisez le système de permissions `rwx` via `chmod` et `chown`.",
                objectives: ["Manipuler dossiers et fichiers", "Calculer les droits octaux (755, 644)", "Utiliser sudo en toute sécurité"],
                resources: []
            }
        ]
    },
    {
        id: "bash-niveau-interm-diaire",
        title: "Bash Linux - Niveau Moyen",
        description: "L'art du chaînage et de l'automatisation. Redirections, Pipes et introduction au scripting.",
        category: "DevOps",
        level: "Moyen",
        duration: "45 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        rating: 4.9,
        students: 5100,
        language: "bash",
        isFree: true,
        tags: ["bash", "scripting", "pipes", "intermédiaire"],
        chapters: [
            {
                title: "1. Redirections & Pipes",
                description: "Connectez les commandes pour créer des outils puissants.",
                order: 1,
                duration: "20 heures",
                content: "Utilisez `>` et `>>` pour rediriger la sortie vers des fichiers. Maîtrisez le Pipe `|` pour chaîner les commandes selon la philosophie UNIX : faire une seule chose et la faire bien.",
                objectives: ["Rediriger Stdout et Stderr", "Utiliser le pipe magique", "Découvrir grep pour la recherche"],
                resources: []
            },
            {
                title: "2. Variables & Shebang",
                description: "Écrivez vos premiers scripts .sh autonomes.",
                order: 2,
                duration: "25 heures",
                content: "Apprenez à déclarer des variables Shell, à utiliser le Shebang `#!/bin/bash` et à comprendre la différence entre variables locales et d'environnement ($PATH, $USER).",
                objectives: ["Écrire un script exécutable", "Utiliser les variables $NAME", "Différencier Single et Double Quotes"],
                resources: []
            }
        ]
    },
    {
        id: "bash-niveau-avanc",
        title: "Bash Linux - Niveau Intermédiaire",
        description: "Devenez Développeur Shell. Maîtrisez les structures de contrôle, les boucles et les arguments CLI complexes.",
        category: "DevOps",
        level: "Intermédiaire",
        duration: "50 heures",
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
        rating: 4.9,
        language: "bash",
        isFree: true,
        tags: ["bash", "scripting", "logic", "avancé"],
        chapters: [
            {
                title: "1. Conditions & Tests",
                description: "Rendez vos scripts intelligents.",
                order: 1,
                duration: "25 heures",
                content: "Utilisez `if`, `else`, and `test` (les crochets `[]`) pour vérifier l'existence de fichiers, comparer des nombres ou des chaînes. Maîtrisez le code de retour `$?`.",
                objectives: ["Valider des entrées utilisateur", "Tester l'existence de fichiers", "Gérer les codes d'erreur système"],
                resources: []
            },
            {
                title: "2. Boucles & Itérations",
                description: "Traitez des milliers de fichiers en une seule ligne.",
                order: 2,
                duration: "25 heures",
                content: "Maîtrisez les boucles `for` (globbing) et `while read` pour le parsing sécurisé de fichiers ligne par ligne.",
                objectives: ["Automatiser des backups massifs", "Parcourir des listes de serveurs", "Utiliser la substitution de commande $()"],
                resources: []
            }
        ]
    },
    {
        id: "bash-niveau-expert",
        title: "Bash Linux - Niveau Expert",
        description: "L'élite de l'administration système. Sed, Awk, Regex, et planification industrielle.",
        category: "DevOps",
        level: "Expert",
        duration: "65 heures",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        rating: 5.0,
        language: "bash",
        isFree: true,
        tags: ["sed", "awk", "regex", "cron", "expert"],
        chapters: [
            {
                title: "1. Sed & Awk : Les chirurgiens du texte",
                description: "Modifiez des gigaoctets de texte sans ouvrir d'éditeur.",
                order: 1,
                duration: "35 heures",
                content: "Maîtrisez `sed` pour le remplacement massif via RegEx et `awk` pour le traitement de données tabulaires (parsing de colonnes, calculs de logs).",
                objectives: ["Mises à jour massives via Sed", "Parsing de logs via Awk", "Maîtriser les expressions régulières"],
                resources: []
            },
            {
                title: "2. Planification & Job Control",
                description: "Détachez vos scripts de l'écran et planifiez-les.",
                order: 2,
                duration: "30 heures",
                content: "Utilisez `cron` pour la planification, gérez les processus en fond (`&`, `nohup`) et apprenez à manipuler les signaux système (kill -9).",
                objectives: ["Automatiser via Crontab", "Maîtriser le Job Control", "Gérer les signaux OS"],
                resources: []
            }
        ]
    }
];

module.exports = bashCourses;
