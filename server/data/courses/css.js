const cssCourses = [
    {
        id: "css-niveau-d-butant",
        title: "CSS3 - Niveau Débutant",
        description: "L'art du design web. Apprenez à styliser vos pages.",
        category: "Programmation",
        level: "Débutant",
        duration: "20 heures",
        image: ""https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "css",
        isFree: true,
        tags: ["css", "design"],
        chapters: [
            { title: "1. Vision Globale : Le Peintre", description: "Le rôle du CSS.", order: 1, content: "Le CSS gère l'apparence (couleurs, polices).", objectives: ["Comprendre le rôle du CSS"] },
            { title: "2. Concept : Les Sélecteurs", description: "Cibler vos éléments.", order: 2, content: "Ciblez par balise, classe (.) ou ID (#).", objectives: ["Maîtriser le ciblage"] },
            { title: "3. Exemple Concret : Couleurs & Polices", description: "Premier style.", order: 3, content: "Changez le background et la color d'un texte.", objectives: ["Appliquer des styles simples"] },
            { title: "4. Cas Pratique : Box Model", description: "Marges et Bordures.", order: 4, content: "Comprenez margin, border et padding.", objectives: ["Gérer l'espacement"] },
            { title: "5. Exercice : Mise en page texte", description: "Synthèse design.", order: 5, content: "Stylez un article entier proprement.", objectives: ["Appliquer les bases du design"] }
        ]
    },
    {
        id: "css-niveau-moyen",
        title: "CSS3 - Niveau Moyen",
        description: "Flexbox et Positionnement.",
        category: "Programmation",
        level: "Moyen",
        duration: "25 heures",
        image: ""https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "css",
        isFree: true,
        tags: ["css", "flexbox"],
        chapters: [
            { title: "1. Vision Globale : Le Layout", description: "Aligner les éléments.", order: 1, content: "Flexbox a révolutionné le positionnement web.", objectives: ["Comprendre les containers"] },
            { title: "2. Concept : Justify & Align", description: "Centrer en un clic.", order: 2, content: "Utilisez justify-content et align-items.", objectives: ["Maîtriser Flexbox"] },
            { title: "3. Exemple Concret : Barre de navigation", description: "Un classique.", order: 3, content: "Créez une navbar avec logo à gauche et liens à droite.", objectives: ["Bâtir un menu moderne"] },
            { title: "4. Cas Pratique : Position Absolute & Relative", description: "Superposer les éléments.", order: 4, content: "Apprenez à sortir du flux normal de la page.", objectives: ["Maîtriser le positionnement"] },
            { title: "5. Exercice : Galerie de cartes", description: "Synthèse Flex.", order: 5, content: "Affichez 3 cartes de manière responsive.", objectives: ["Appliquer le layout moderne"] }
        ]
    },
    {
        id: "css-niveau-interm-diaire",
        title: "CSS3 - Niveau Intermédiaire",
        description: "Grid Layout et Responsive Design.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "30 heures",
        image: ""https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        language: "css",
        isFree: true,
        tags: ["css", "grid", "responsive"],
        chapters: [
            { title: "1. Vision Globale : CSS Grid", description: "Le 2D Layout.", order: 1, content: "Grid gère les lignes et les colonnes simultanément.", objectives: ["Comprendre CSS Grid"] },
            { title: "2. Concept : Media Queries", description: "S'adapter au mobile.", order: 2, content: "Transformez votre site selon la largeur de l'écran.", objectives: ["Maîtriser le Responsive"] },
            { title: "3. Exemple Concret : Header Adaptatif", description: "Mobile First.", order: 3, content: "Cachez ou changez le menu sur mobile.", objectives: ["Penser responsive"] },
            { title: "4. Cas Pratique : CSS Variables", description: "Maintenir son style.", order: 4, content: "Utilisez --main-color pour changer tout le site d'un coup.", objectives: ["Optimiser la maintenance"] },
            { title: "5. Exercice : Page Magazine complexe", description: "Synthèse Grid.", order: 5, content: "Bâtissez un layout asymétrique avec CSS Grid.", objectives: ["Architecturer des designs complexes"] }
        ]
    },
    {
        id: "css-niveau-expert",
        title: "CSS3 - Niveau Expert",
        description: "Animations, Transitions et Shaders.",
        category: "Programmation",
        level: "Expert",
        duration: "45 heures",
        image: ""https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
        language: "css",
        isFree: true,
        tags: ["css", "animations", "expert"],
        chapters: [
            { title: "1. Vision Globale : Motion Design", description: "Rendre le site vivant.", order: 1, content: "Le mouvement guide l'utilisateur.", objectives: ["Appréhender l'animation web"] },
            { title: "2. Concept : Keyframes", description: "Le timing parfait.", order: 2, content: "Créez des animations boucle et complexes.", objectives: ["Maîtriser les timelines CSS"] },
            { title: "3. Exemple Concret : Loader custom", description: "Patienter avec style.", order: 3, content: "Créez un cercle qui tourne avec des effets de lueur.", objectives: ["Bâtir des feedbacks visuels"] },
            { title: "4. Cas Pratique : Transformations 3D", description: "Profondeur visuelle.", order: 4, content: "Faites pivoter des cartes sur l'axe Y.", objectives: ["Exploiter la 3D GPU"] },
            { title: "5. Exercice : Interface Futuriste", description: "Synthèse expertise.", order: 5, content: "Créez un bouton avec reflets animés et micro-interactions.", objectives: ["Atteindre le niveau AAA"] }
        ]
    }
];

module.exports = cssCourses;
