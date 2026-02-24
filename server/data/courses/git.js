const gitCourses = [
    {
        id: "git-fondamentaux-pratiques",
        title: "Git & GitHub - Fondamentaux Pratiques",
        description: "Maîtrisez le versionnage et la collaboration. Un module unique, concret et orienté action.",
        category: "Outils",
        level: "Débutant", // On garde un niveau technique pour la cohérence UI mais le titre dit "Fondamentaux"
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
        rating: 4.9,
        language: "french",
        isFree: true,
        tags: ["git", "github", "collaboration"],
        chapters: [
            {
                title: "1. Introduction & Workflow",
                description: "Pourquoi Git est indispensable.",
                order: 1,
                content: "Git est l'outil de versionnage n°1. Il permet de sauvegarder chaque étape de votre code et de collaborer sans écraser le travail des autres.",
                objectives: ["Comprendre le concept de versioning"]
            },
            {
                title: "2. Concept : Commits & Branches",
                description: "Les briques de Git.",
                order: 2,
                content: "Le commit est un instantané de votre code. La branche est une ligne de développement parallèle. `git init`, `git add`, `git commit` sont vos premiers outils.",
                objectives: ["Maîtriser le cycle local"]
            },
            {
                title: "3. Exemple Concret : Premier Repo",
                description: "Initialiser et sauvegarder un projet.",
                order: 3,
                content: "Création d'un dossier, `git init`, création de `index.html`, `git add .`, `git commit -m 'Premier commit'`. Votre historique commence ici.",
                objectives: ["Pratiquer le workflow local"]
            },
            {
                title: "4. Cas Pratique : Collaboration sur GitHub",
                description: "Lier local et distant.",
                order: 4,
                content: "Configuration d'un remote (`git remote add origin`), `git push` vers GitHub. Découverte de l'interface GitHub et des Pull Requests.",
                objectives: ["Utiliser GitHub comme serveur de partage"]
            },
            {
                title: "5. Exercice : Résoudre un conflit",
                description: "Gérer les problèmes de fusion.",
                order: 5,
                content: "Simulez une modification sur la même ligne dans deux branches. Utilisez `git merge` et réparez manuellement le conflit affiché par Git.",
                objectives: ["Gérer les conflits de fusion"]
            }
        ]
    }
];

module.exports = gitCourses;
