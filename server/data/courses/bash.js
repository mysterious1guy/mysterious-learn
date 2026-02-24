const bashCourses = [
    {
        id: "bash-niveau-d-butant",
        title: "Bash & Terminal - Niveau Débutant",
        description: "Prenez le contrôle de votre PC. Domptez la ligne de commande.",
        category: "Système",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1518433278988-d9bcda90d0b1?w=800&q=80",
        rating: 4.8,
        language: "bash",
        isFree: true,
        tags: ["bash", "linux", "terminal"],
        chapters: [
            { title: "1. Vision Globale : Le Terminal", description: "Pourquoi taper du texte ?", order: 1, content: "Le terminal est plus rapide que la souris pour les pros.", objectives: ["Démystifier le CLI"] },
            { title: "2. Concept : Navigation", description: "ls, cd, pwd.", order: 2, content: "Apprenez à vous déplacer dans les dossiers.", objectives: ["Naviguer en console"] },
            { title: "3. Exemple Concret : Gestion fichiers", description: "mkdir, touch, rm.", order: 3, content: "Créez et supprimez sans interface graphique.", objectives: ["Manipuler les fichiers"] },
            { title: "4. Cas Pratique : Voir le contenu", description: "cat, head, tail.", order: 4, content: "Lisez des fichiers directement dans le terminal.", objectives: ["Consulter les logs"] },
            { title: "5. Exercice : Premier script .sh", description: "Automatisation 101.", order: 5, content: "Créez un script qui dit bonjour et affiche la date.", objectives: ["Créer un script exécutable"] }
        ]
    },
    {
        id: "bash-niveau-moyen",
        title: "Bash & Terminal - Niveau Moyen",
        description: "Piping, Redirections et Permissions.",
        category: "Système",
        level: "Moyen",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1518433278988-d9bcda90d0b1?w=800&q=80",
        rating: 4.8,
        language: "bash",
        isFree: true,
        tags: ["bash", "piping"],
        chapters: [
            { title: "1. Vision Globale : Le Piping (|)", description: "Connecter les commandes.", order: 1, content: "La sortie de l'un devient l'entrée de l'autre.", objectives: ["Comprendre le flux Unix"] },
            { title: "2. Concept : Grep & Find", description: "Chercher l'aiguille.", order: 2, content: "Filtrez des fichiers ou du texte instantanément.", objectives: ["Maîtriser la recherche"] },
            { title: "3. Exemple Concret : Redirections", description: "> et >>.", order: 3, content: "Envoyez le résultat d'une commande dans un fichier log.", objectives: ["Gérer les entrées/sorties"] },
            { title: "4. Cas Pratique : Chmod & Chown", description: "Qui a le droit ?", order: 4, content: "Maîtrisez les permissions 755 et 644.", objectives: ["Gérer la sécurité fichiers"] },
            { title: "5. Exercice : Nettoyeur de Desktop", description: "Synthèse scripts.", order: 5, content: "Créez un script qui déplace tous les .txt dans un dossier Backup.", objectives: ["Automatiser une tâche réelle"] }
        ]
    },
    {
        id: "bash-niveau-interm-diaire",
        title: "Bash & Terminal - Niveau Intermédiaire",
        description: "Scripting avancé : Boucles et Variables.",
        category: "Système",
        level: "Intermédiaire",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1518433278988-d9bcda90d0b1?w=800&q=80",
        rating: 4.9,
        language: "bash",
        isFree: true,
        tags: ["bash", "scripting"],
        chapters: [
            { title: "1. Vision Globale : Scripting Pro", description: "Devenir un magicien.", order: 1, content: "Un script peut gérer des milliers de serveurs.", objectives: ["Passer du CLI au Scripting"] },
            { title: "2. Concept : If/Else & Case", description: "Prendre des décisions.", order: 2, content: "Gérez les arguments passés au script via $1, $2.", objectives: ["Traiter les paramètres"] },
            { title: "3. Exemple Concret : Boucle For", description: "Répétition massive.", order: 3, content: "Renommez 50 fichiers d'un seul coup.", objectives: ["Maîtriser les boucles"] },
            { title: "4. Cas Pratique : SSH & Scp", description: "Travailler à distance.", order: 4, content: "Connectez-vous à un serveur distant et envoyez des fichiers.", objectives: ["Administrer à distance"] },
            { title: "5. Exercice : Script de Backup auto", description: "Synthèse système.", order: 5, content: "Créez un script qui compresse un dossier et l'envoie ailleurs.", objectives: ["Garantir la sécurité des data"] }
        ]
    },
    {
        id: "bash-niveau-expert",
        title: "Bash & Terminal - Niveau Expert",
        description: "Sed, Awk et Administration Système.",
        category: "Système",
        level: "Expert",
        duration: "50 heures",
        image: "https://images.unsplash.com/photo-1518433278988-d9bcda90d0b1?w=800&q=80",
        rating: 5.0,
        language: "bash",
        isFree: true,
        tags: ["bash", "awk", "sed", "expert"],
        chapters: [
            { title: "1. Vision Globale : Text Processing", description: "La puissance de Sed & Awk.", order: 1, content: "Modifiez des fichiers massifs sans les ouvrir.", objectives: ["Maîtriser le stream editing"] },
            { title: "2. Concept : Cron Jobs", description: "Le temps maîtrisé.", order: 2, content: "Planifiez des tâches à la minute près.", objectives: ["Automatiser le planning"] },
            { title: "3. Exemple Concret : Analyseur de Logs", description: "Extraire la data brute.", order: 3, content: "Comptez les erreurs 404 dans un log Apache via Awk.", objectives: ["Produire des rapports via Bash"] },
            { title: "4. Cas Pratique : Docker & CLI", description: "Conteneurisation.", order: 4, content: "Gérez vos containers via des scripts complexes.", objectives: ["Lier Bash et Devops"] },
            { title: "5. Exercice : Monitor Système", description: "Synthèse de l'expertise.", order: 5, content: "Créez un script qui alerte si le CPU dépasse 80% pendant 5 min.", objectives: ["Bâtir un outil d'admin pro"] }
        ]
    }
];

module.exports = bashCourses;
