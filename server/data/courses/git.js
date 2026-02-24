const gitCourses = [
    {
        id: "git-niveau-d-butant",
        title: "Git & GitHub - Niveau Débutant",
        description: "Maîtrisez le voyage dans le temps pour votre code. Apprenez le versionnage local avec Git et la collaboration avec GitHub.",
        category: "Outils",
        level: "Débutant",
        duration: "10 heures",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
        rating: 4.8,
        language: "french",
        isFree: true,
        tags: ["git", "github", "débutant"],
        chapters: [
            {
                title: "1. Vos premiers Commits",
                description: "Initialiser un projet et sauvegarder son état.",
                order: 1,
                duration: "5 heures",
                content: "Découvrez `git init`, `git add` et `git commit`. Apprenez à voir l'historique avec `git log`. Comprenez pourquoi Git est l'outil n°1 du développeur moderne.",
                objectives: ["Initialiser un repo", "Faire un commit propre"],
                resources: []
            }
        ]
    },
    {
        id: "git-niveau-moyen",
        title: "Git & GitHub - Niveau Moyen",
        description: "L'art des branches. Apprenez à travailler sur plusieurs fonctionnalités en parallèle sans tout casser.",
        category: "Outils",
        level: "Moyen",
        duration: "12 heures",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
        rating: 4.8,
        language: "french",
        isFree: true,
        tags: ["branches", "merge", "git"],
        chapters: [
            {
                title: "1. Branches & Merges",
                description: "Naviguer entre les versions.",
                order: 1,
                duration: "12 heures",
                content: "Maîtrisez `git branch` et `git checkout`. Apprenez à fusionner vos travaux via `git merge` et à comprendre la philosophie des branches de fonctionnalité.",
                objectives: ["Créer et fusionner des branches", "Gérer les conflits simples"],
                resources: []
            }
        ]
    },
    {
        id: "git-niveau-interm-diaire",
        title: "Git & GitHub - Niveau Intermédiaire",
        description: "Collaboration et Pull Requests. Maîtrisez le travail en équipe sur GitHub.",
        category: "Outils",
        level: "Intermédiaire",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
        rating: 4.9,
        language: "french",
        isFree: true,
        tags: ["GitHub", "Collaboration", "Remote"],
        chapters: [
            {
                title: "1. Travailler à plusieurs",
                description: "Push, Pull et Pull Requests.",
                order: 1,
                duration: "15 heures",
                content: "Apprenez à lier votre projet local à GitHub via `git remote`. Maîtrisez le cycle `push`/`pull` et apprenez à ouvrir votre première Pull Request pour collaborer.",
                objectives: ["Utiliser un dépôt distant", "Comprendre le workflow PR"],
                resources: []
            }
        ]
    },
    {
        id: "git-niveau-expert",
        title: "Git & GitHub - Niveau Expert",
        description: "Workflow Industriel. Rebase, Cherry-pick et résolution de conflits complexes.",
        category: "Outils",
        level: "Expert",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["Rebase", "GitFlow", "Expert"],
        chapters: [
            {
                title: "1. Git Avancé",
                description: "Nettoyer l'historique et réparer les erreurs.",
                order: 1,
                duration: "20 heures",
                content: "Maîtrisez `git rebase` pour un historique propre. Apprenez à utiliser `git cherry-pick` et `git stash`. Découvrez les workflows industriels comme GitFlow.",
                objectives: ["Maîtriser le Rebase", "Gérer des conflits complexes"],
                resources: []
            }
        ]
    }
];

module.exports = gitCourses;
