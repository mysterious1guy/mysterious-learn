const htmlCourses = [
    {
        id: "html-niveau-d-butant",
        title: "HTML5 - Niveau Débutant",
        description: "Le squelette du Web. Apprenez à structurer vos pages.",
        category: "Programmation",
        level: "Débutant",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "html",
        isFree: true,
        tags: ["html", "web", "débutant"],
        chapters: [
            { title: "1. Vision Globale : Le Squelette", description: "Le rôle du HTML.", order: 1, content: "HTML définit le contenu de la page.", objectives: ["Comprendre le rôle du HTML"] },
            { title: "2. Concept : Les Balises", description: "Ouvrir et fermer l'info.", order: 2, content: "Tout est balise : <h1>, <p>, <a>.", objectives: ["Maîtriser la syntaxe"] },
            { title: "3. Exemple Concret : Titres", description: "Hiérarchie du contenu.", order: 3, content: "Utilisez h1 à h6.", objectives: ["Structurer du texte"] },
            { title: "4. Cas Pratique : Images", description: "Illustrer la page.", order: 4, content: "Utilisez <img src='...'>.", objectives: ["Intégrer des médias"] },
            { title: "5. Exercice : Premier CV", description: "Projet de synthèse.", order: 5, content: "Créez une page avec votre nom et parcours.", objectives: ["Appliquer les bases"] }
        ]
    },
    {
        id: "html-niveau-moyen",
        title: "HTML5 - Niveau Moyen",
        description: "Formulaires et Tableaux. Gérez les données utilisateur.",
        category: "Programmation",
        level: "Moyen",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "html",
        isFree: true,
        tags: ["html", "forms", "moyen"],
        chapters: [
            { title: "1. Vision Globale : L'Interactivité", description: "Envoyer des données.", order: 1, content: "Les formulaires sont le canal de communication.", objectives: ["Comprendre le workflow client-serveur"] },
            { title: "2. Concept : Input types", description: "Texte, Password, Email.", order: 2, content: "Choisissez le bon type pour chaque donnée.", objectives: ["Maîtriser les types d'input"] },
            { title: "3. Exemple Concret : Formulaire d'inscription", description: "Un cas réel.", order: 3, content: "Regroupez les champs dans un <form>.", objectives: ["Structurer un formulaire"] },
            { title: "4. Cas Pratique : Les Tableaux", description: "Afficher des data complexes.", order: 4, content: "Utilisez <table>, <tr>, <td>.", objectives: ["Gérer l'affichage tabulaire"] },
            { title: "5. Exercice : Formulaire de contact complet", description: "Validation basique.", order: 5, content: "Créez un formulaire avec textarea et select.", objectives: ["Synthétiser les entrées"] }
        ]
    },
    {
        id: "html-niveau-interm-diaire",
        title: "HTML5 - Niveau Intermédiaire",
        description: "Sémantique et Accessibilité. Le Web pour tous.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "html",
        isFree: true,
        tags: ["html", "seo", "accessibility"],
        chapters: [
            { title: "1. Vision Globale : Le Web Sémantique", description: "Aider les robots et les humains.", order: 1, content: "Utilisez <main>, <article>, <section>.", objectives: ["Comprendre la sémantique"] },
            { title: "2. Concept : Accessibilité (ARIA)", description: "Inclure tout le monde.", order: 2, content: "Apprenez les rôles ARIA et les labels alternatifs.", objectives: ["Rendre le web accessible"] },
            { title: "3. Exemple Concret : Un article optimisé", description: "Structure parfaite.", order: 3, content: "Combinez balises sémantiques et attributs alt.", objectives: ["Améliorer le SEO technique"] },
            { title: "4. Cas Pratique : Audio & Vidéo", description: "Multi-médias natif.", order: 4, content: "Utilisez les balises <video> et <audio>.", objectives: ["Intégrer du multimédia sans plugin"] },
            { title: "5. Exercice : Audit d'une page", description: "Améliorer l'existant.", order: 5, content: "Prenez une page simple et rajoutez-y la sémantique manquante.", objectives: ["Optimiser une structure"] }
        ]
    },
    {
        id: "html-niveau-expert",
        title: "HTML5 - Niveau Expert",
        description: "APIs Web et Canvas. Repoussez les limites du navigateur.",
        category: "Programmation",
        level: "Expert",
        duration: "35 heures",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "html",
        isFree: true,
        tags: ["html", "canvas", "api"],
        chapters: [
            { title: "1. Vision Globale : Le HTML5 Programmatique", description: "Le navigateur est un OS.", order: 1, content: "Découvrez les APIs Geolocation, Drag and Drop, Web Storage.", objectives: ["Exploiter les APIs navigateur"] },
            { title: "2. Concept : Le Canvas 2D", description: "Dessiner en code.", order: 2, content: "Utilisez <canvas> pour générer des graphiques en JS.", objectives: ["Maîtriser le dessin programmable"] },
            { title: "3. Exemple Concret : Un graphique dynamique", description: "Visualisation de données.", order: 3, content: "Tracez une ligne de progression sur un canvas.", objectives: ["Lier données et visuel"] },
            { title: "4. Cas Pratique : SVG vs Canvas", description: "Choisir le bon format.", order: 4, content: "Découvrez quand utiliser le vectoriel (SVG) ou le matriciel.", objectives: ["Optimiser les graphiques web"] },
            { title: "5. Exercice : Mini-moteur de dessin", description: "Synthèse de l'expertise.", order: 5, content: "Créez un espace où l'on peut dessiner à la souris sur un canvas.", objectives: ["Bâtir une application HTML5 riche"] }
        ]
    }
];

module.exports = htmlCourses;
