// Data & Générateur de Missions de Mode Apprentissage Infini pour Terminal Linux

export const STATIC_MISSIONS = [
    // --- NIVEAU 1 : DECOUVERTE & NAVIGATION ---
    {
        id: 1,
        title: "Connaitre son emplacement courant",
        category: "Navigation de Base",
        scenario: "Dans un terminal Linux, il est primordial de savoir où l'on se trouve dans l'arborescence du système.",
        explanation: "La commande `pwd` (Print Working Directory) affiche le chemin absolu du dossier actuel.",
        expectedCommand: "pwd",
        hint: "Tapez simplement `pwd` et appuyez sur Entrée.",
        xpReward: 50
    },
    {
        id: 2,
        title: "Lister le contenu d'un dossier",
        category: "Navigation de Base",
        scenario: "Vous voulez voir tous les fichiers et sous-dossiers présents dans votre répertoire actuel.",
        explanation: "La commande `ls` (List) liste les fichiers et répertoires.",
        expectedCommand: "ls",
        hint: "Tapez `ls` pour afficher le contenu.",
        xpReward: 50
    },
    {
        id: 3,
        title: "Créer un nouveau répertoire",
        category: "Gestion de Fichiers",
        scenario: "Pour organiser vos projets, vous devez créer un nouveau dossier nommé `projets`.",
        explanation: "La commande `mkdir` (Make Directory) permet de créer un ou plusieurs répertoires.",
        expectedCommand: "mkdir projets",
        hint: "Tapez `mkdir projets`.",
        xpReward: 50
    },
    {
        id: 4,
        title: "Se déplacer dans un répertoire",
        category: "Navigation de Base",
        scenario: "Entrez dans le dossier `projets` que vous venez de créer.",
        explanation: "La commande `cd` (Change Directory) permet de naviguer vers un autre dossier.",
        expectedCommand: "cd projets",
        hint: "Tapez `cd projets`.",
        xpReward: 50
    },
    {
        id: 5,
        title: "Créer un fichier vide",
        category: "Gestion de Fichiers",
        scenario: "Créez un fichier vide nommé `notes.txt` à l'intérieur du dossier `projets`.",
        explanation: "La commande `touch` permet de créer un fichier vide s'il n'existe pas ou d'actualiser sa date de modification.",
        expectedCommand: "touch notes.txt",
        hint: "Tapez `touch notes.txt`.",
        xpReward: 50
    },
    {
        id: 6,
        title: "Revenir au dossier parent",
        category: "Navigation de Base",
        scenario: "Sortez du dossier `projets` pour revenir dans votre répertoire personnel.",
        explanation: "Le symbole `..` désigne le dossier parent supérieur.",
        expectedCommand: "cd ..",
        hint: "Tapez `cd ..` pour remonter d'un niveau.",
        xpReward: 50
    },
    {
        id: 7,
        title: "Identifier l'utilisateur connecté",
        category: "Système & Identité",
        scenario: "Vérifiez quel nom d'utilisateur est actuellement actif dans votre session.",
        explanation: "La commande `whoami` (Who Am I) renvoie le nom du compte utilisateur courant.",
        expectedCommand: "whoami",
        hint: "Tapez `whoami`.",
        xpReward: 50
    },
    // --- NIVEAU 2 : MANIPULATION AVANCEE DE FICHIERS ---
    {
        id: 8,
        title: "Copier un fichier",
        category: "Manipulation de Fichiers",
        scenario: "Copiez le fichier `script.sh` vers un nouveau fichier nommé `backup.sh`.",
        explanation: "La commande `cp` (Copy) prend la source et la destination (`cp source destination`).",
        expectedCommand: "cp script.sh backup.sh",
        hint: "Tapez `cp script.sh backup.sh`.",
        xpReward: 75
    },
    {
        id: 9,
        title: "Déplacer ou Renommer un fichier",
        category: "Manipulation de Fichiers",
        scenario: "Renommez `backup.sh` en `sauvegarde.sh`.",
        explanation: "La commande `mv` (Move) est utilisée pour déplacer ou renommer des fichiers et répertoires.",
        expectedCommand: "mv backup.sh sauvegarde.sh",
        hint: "Tapez `mv backup.sh sauvegarde.sh`.",
        xpReward: 75
    },
    {
        id: 10,
        title: "Lire le contenu d'un fichier",
        category: "Lecture de Textes",
        scenario: "Affichez l'intégralité du contenu du fichier `script.sh`.",
        explanation: "La commande `cat` (Concatenate) affiche le contenu complet d'un fichier texte.",
        expectedCommand: "cat script.sh",
        hint: "Tapez `cat script.sh`.",
        xpReward: 75
    },
    {
        id: 11,
        title: "Supprimer un fichier",
        category: "Gestion de Fichiers",
        scenario: "Supprimez le fichier de sauvegarde `sauvegarde.sh`.",
        explanation: "La commande `rm` (Remove) efface définitivement un fichier.",
        expectedCommand: "rm sauvegarde.sh",
        hint: "Tapez `rm sauvegarde.sh`.",
        xpReward: 75
    },
    {
        id: 12,
        title: "Supprimer un dossier vide",
        category: "Gestion de Fichiers",
        scenario: "Créez un dossier temporaire `temp` puis supprimez-le avec `rmdir`.",
        explanation: "La commande `rmdir` (Remove Directory) efface uniquement les répertoires vides.",
        expectedCommand: "mkdir temp && rmdir temp",
        hint: "Tapez `mkdir temp` puis `rmdir temp`.",
        xpReward: 75
    },
    // --- NIVEAU 3 : RECHERCHE & REDIRECTIONS ---
    {
        id: 13,
        title: "Écrire du texte dans un fichier via redirection",
        category: "Flux & Redirections",
        scenario: "Écrivez le message 'Bonjour Linux' directement dans le fichier `message.txt`.",
        explanation: "L'opérateur `>` redirige la sortie de la commande `echo` vers un fichier.",
        expectedCommand: "echo \"Bonjour Linux\" > message.txt",
        hint: "Tapez `echo \"Bonjour Linux\" > message.txt`.",
        xpReward: 100
    },
    {
        id: 14,
        title: "Chercher un mot dans un fichier avec Grep",
        category: "Recherche de Texte",
        scenario: "Recherchez le mot 'Bonjour' à l'intérieur du fichier `message.txt`.",
        explanation: "La commande `grep` (Global Regular Expression Print) filtre et affiche les lignes contenant un mot clé.",
        expectedCommand: "grep \"Bonjour\" message.txt",
        hint: "Tapez `grep \"Bonjour\" message.txt`.",
        xpReward: 100
    },
    {
        id: 15,
        title: "Compter les lignes et mots d'un fichier",
        category: "Statistiques & Outils",
        scenario: "Comptez le nombre de lignes et de mots du fichier `message.txt`.",
        explanation: "La commande `wc` (Word Count) calcule les lignes (-l), mots (-w) et caractères (-c).",
        expectedCommand: "wc message.txt",
        hint: "Tapez `wc message.txt`.",
        xpReward: 100
    },
    // --- NIVEAU 4 : DROITS & PRIVILEGES (PERMISSIONS) ---
    {
        id: 16,
        title: "Rendre un script exécutable",
        category: "Droits & Permissions",
        scenario: "Ajoutez la permission d'exécution sur le fichier `script.sh`.",
        explanation: "La commande `chmod +x` modifie les permissions d'un fichier pour autoriser son exécution.",
        expectedCommand: "chmod +x script.sh",
        hint: "Tapez `chmod +x script.sh`.",
        xpReward: 125
    },
    {
        id: 17,
        title: "Changer les permissions en notation octale",
        category: "Droits & Permissions",
        scenario: "Attribuez les droits lecture/écriture/exécution (755) au fichier `script.sh`.",
        explanation: "`chmod 755` attribue les droits rwx pour le propriétaire, et r-x pour le groupe et les autres.",
        expectedCommand: "chmod 755 script.sh",
        hint: "Tapez `chmod 755 script.sh`.",
        xpReward: 125
    },
    {
        id: 18,
        title: "Tester les privilèges Administrateur Sudo",
        category: "Administration Système",
        scenario: "Exécutez la commande `whoami` avec les privilèges d'administration super-utilisateur.",
        explanation: "`sudo` (SuperUser Do) permet d'exécuter n'importe quelle commande en tant que root.",
        expectedCommand: "sudo whoami",
        hint: "Tapez `sudo whoami` (Le mot de passe root par défaut est `root`).",
        xpReward: 125
    },
    // --- NIVEAU 5 : SYSTEME, PROCESSUS & RESEAU ---
    {
        id: 19,
        title: "Inspecter les processus système",
        category: "Processus & Ressources",
        scenario: "Affichez la liste de tous les processus en cours d'exécution sur votre machine.",
        explanation: "La commande `ps aux` affiche une vue détaillée de tous les processus des utilisateurs.",
        expectedCommand: "ps aux",
        hint: "Tapez `ps aux`.",
        xpReward: 150
    },
    {
        id: 20,
        title: "Vérifier l'espace disque disponible",
        category: "Ressources Système",
        scenario: "Consultez le niveau d'occupation et l'espace libre sur vos partitions disque.",
        explanation: "La commande `df -h` (Disk Free, human-readable) affiche l'espace en Go/Mo.",
        expectedCommand: "df -h",
        hint: "Tapez `df -h`.",
        xpReward: 150
    },
    {
        id: 21,
        title: "Consulter la taille d'un dossier",
        category: "Ressources Système",
        scenario: "Mesurez la taille totale occupée par le répertoire actuel.",
        explanation: "La commande `du -sh` (Disk Usage summary, human-readable) calcule le poids d'un répertoire.",
        expectedCommand: "du -sh .",
        hint: "Tapez `du -sh .`.",
        xpReward: 150
    },
    {
        id: 22,
        title: "Afficher les informations du Noyau Kernel Linux",
        category: "Système & Identité",
        scenario: "Affichez la version exacte du Kernel Linux et de l'architecture processeur.",
        explanation: "La commande `uname -a` (Unix Name All) dévoile les infos système.",
        expectedCommand: "uname -a",
        hint: "Tapez `uname -a`.",
        xpReward: 150
    },
    {
        id: 23,
        title: "Inspecter l'historique des commandes",
        category: "Productivité Terminal",
        scenario: "Affichez les dernières commandes que vous avez exécutées dans le terminal.",
        explanation: "La commande `history` dresse la liste numérotée de l'historique de votre shell.",
        expectedCommand: "history",
        hint: "Tapez `history`.",
        xpReward: 150
    },
    {
        id: 24,
        title: "Tester la connectivité réseau",
        category: "Réseau & Services",
        scenario: "Envoyez 2 paquets ICMP pour tester la connexion vers un serveur distants.",
        explanation: "La commande `ping -c 2 google.com` vérifie l'accessibilité réseau.",
        expectedCommand: "ping -c 2 google.com",
        hint: "Tapez `ping -c 2 google.com`.",
        xpReward: 175
    },
    {
        id: 25,
        title: "Se connecter à un serveur distant via SSH",
        category: "Réseau & SSH",
        scenario: "Lancez une tentative de connexion SSH vers une machine distante.",
        explanation: "La commande `ssh utilisateur@ip` établit une session sécurisée cryptée.",
        expectedCommand: "ssh mouhamed@41.82.219.144",
        hint: "Tapez `ssh mouhamed@41.82.219.144`.",
        xpReward: 200
    }
];

// Générateur de Missions de Niveau supérieur (Infini)
export const getMissionByStep = (stepIndex) => {
    if (stepIndex >= 0 && stepIndex < STATIC_MISSIONS.length) {
        return STATIC_MISSIONS[stepIndex];
    }

    const dynamicLevel = stepIndex + 1;
    const targetFolder = `lab_module_${dynamicLevel}`;
    const targetFile = `sec_audit_${dynamicLevel}.log`;

    const subStep = (stepIndex - STATIC_MISSIONS.length) % 3;

    if (subStep === 0) {
        return {
            id: dynamicLevel,
            title: `Mission ${dynamicLevel} : Créer le lab d'audit '${targetFolder}'`,
            category: "Administration & Sécurité Infini",
            scenario: `Créer un environnement de travail sécurisé nommé '${targetFolder}'.`,
            explanation: "L'apprentissage continu sur Linux repose sur l'organisation méthodique des répertoires.",
            expectedCommand: `mkdir ${targetFolder}`,
            hint: `Tapez 'mkdir ${targetFolder}'`,
            xpReward: 200 + (dynamicLevel * 10)
        };
    } else if (subStep === 1) {
        return {
            id: dynamicLevel,
            title: `Mission ${dynamicLevel} : Générer le rapport '${targetFile}'`,
            category: "Administration & Sécurité Infini",
            scenario: `Générer le fichier de log '${targetFile}' à des fins d'analyse.`,
            explanation: "Les journaux de logs sous Linux sont essentiels pour analyser la sécurité système.",
            expectedCommand: `touch ${targetFile}`,
            hint: `Tapez 'touch ${targetFile}'`,
            xpReward: 200 + (dynamicLevel * 10)
        };
    } else {
        return {
            id: dynamicLevel,
            title: `Mission ${dynamicLevel} : Rediriger l'audit de sécurité`,
            category: "Administration & Sécurité Infini",
            scenario: `Inscrivez le statut 'System Secure' dans le fichier '${targetFile}'.`,
            explanation: "La redirection d'output via l'opérateur '>' permet d'enregistrer des rapports automatiques.",
            expectedCommand: `echo "System Secure" > ${targetFile}`,
            hint: `Tapez 'echo "System Secure" > ${targetFile}'`,
            xpReward: 200 + (dynamicLevel * 10)
        };
    }
};
