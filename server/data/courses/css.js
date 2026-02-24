const cssCourses = [
    {
        id: "css-niveau-d-butant",
        title: "CSS - Niveau Débutant",
        description: "Peignez le Web. Comprenez la cascade, l'héritage, et le modèle de boîte fondamental pour donner vie à vos structures HTML.",
        category: "Web",
        level: "Débutant",
        duration: "18 heures",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
        rating: 4.8,
        students: 35000,
        language: "french",
        isFree: true,
        tags: ["CSS", "Design", "Débutant", "Box Model"],
        chapters: [
            {
                title: "1. Cascade, Sélecteurs & Couleurs",
                description: "Le principe fondamental du CSS : cibler pour styliser.",
                order: 1,
                duration: "9 heures",
                content: "Le CSS (Cascading Style Sheets) gère l'apparence. Apprenez à cibler des éléments via balises, classes (.) et IDs (#). Maîtrisez la cascade et les couleurs (hex, rgb, hsl).",
                objectives: ["Lier un fichier CSS", "Maîtriser les sélecteurs de base", "Utiliser les couleurs et la typographie"],
                resources: []
            },
            {
                title: "2. Le Modèle de Boîte (Box Model)",
                description: "Padding, Border, Margin : le dogme dimensionnel du Web.",
                order: 2,
                duration: "9 heures",
                content: "Tout élément est un rectangle. Apprenez à gérer l'espace intérieur (padding), la bordure (border) et l'espace extérieur (margin). Utilisez `box-sizing: border-box` pour éviter les maux de tête.",
                objectives: ["Comprendre le calcul des dimensions", "Appliquer des bordures et arrondis", "Maîtriser l'espacement"],
                resources: []
            }
        ]
    },
    {
        id: "css-niveau-interm-diaire",
        title: "CSS - Niveau Intermédiaire",
        description: "Orchestrez l'architecture et la structuration géométrique. Maîtrisez Flexbox et les positionnements hors-flux.",
        category: "Web",
        level: "Intermédiaire",
        duration: "24 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        students: 22000,
        language: "french",
        isFree: true,
        tags: ["Flexbox", "Positionnement", "Layouts"],
        chapters: [
            {
                title: "1. Flexbox : L'alignement divin",
                description: "Le layout unidimensionnel moderne.",
                order: 1,
                duration: "12 heures",
                content: "Flexbox a révolutionné le design web. Centrez des éléments, gérez les espaces et l'ordre d'affichage sans effort.",
                objectives: ["Maîtriser justify-content et align-items", "Gérer flex-grow et flex-shrink", "Créer des barres de navigation réactives"],
                resources: []
            },
            {
                title: "2. Positionnement & Profondeur",
                description: "Relative, Absolute, Fixed et Sticky : brisez le flux normal.",
                order: 2,
                duration: "12 heures",
                content: "Apprenez à détacher des éléments du flux pour créer des headers collants, des modales ou des superpositions via le z-index.",
                objectives: ["Différencier les modes de positionnement", "Manipuler le z-index", "Utiliser position: sticky"],
                resources: []
            }
        ]
    },
    {
        id: "css-niveau-avanc",
        title: "CSS - Niveau Avancé",
        description: "L'ingénierie visuelle. Maîtrisez CSS Grid, les variables natives et les animations keyframes.",
        category: "Web",
        level: "Avancé",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["CSS Grid", "Animations", "Variables"],
        chapters: [
            {
                title: "1. CSS Grid Layout",
                description: "Le summum de la distribution spatiale bidimensionnelle.",
                order: 1,
                duration: "15 heures",
                content: "Si Flexbox est une ligne, Grid est un échiquier. Créez des mises en page complexes avec des zones nommées et une précision chirurgicale.",
                objectives: ["Construire des grilles complexes", "Utiliser grid-template-areas", "Maîtriser l'unité fr"],
                resources: []
            },
            {
                title: "2. Animations & Variables (Custom Properties)",
                description: "Fluidifiez l'UX et centralisez votre design système.",
                order: 2,
                duration: "15 heures",
                content: "Utilisez les variables CSS pour gérer vos thèmes et `@keyframes` pour créer des animations fluides accélérées par le GPU.",
                objectives: ["Créer des thèmes dynamiques", "Maîtriser les transitions et animations", "Optimiser les performances d'animation"],
                resources: []
            }
        ]
    },
    {
        id: "css-niveau-expert",
        title: "CSS - Niveau Expert",
        description: "L'architecture CSS de pointe. Design Systems, Responsive Moderne et Glassmorphism.",
        category: "Web",
        level: "Expert",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["Architecture", "Responsive", "Glassmorphism"],
        chapters: [
            {
                title: "1. Architecture (BEM) & Design Systems",
                description: "Écrivez du CSS maintenable à l'échelle industrielle.",
                order: 1,
                duration: "15 heures",
                content: "Apprenez la méthodologie BEM et comment structurer un projet CSS massif sans conflits.",
                objectives: ["Mettre en place BEM", "Logique de composants", "Maintenabilité"],
                resources: []
            },
            {
                title: "2. Responsive Moderne & Effets Avancés",
                description: "Container Queries et Glassmorphism.",
                order: 2,
                duration: "15 heures",
                content: "Allez au-delà des media queries avec les Container Queries. Maîtrisez le backdrop-filter pour les effets de verre poli.",
                objectives: ["UX adaptative par composant", "Effets visuels premium", "Mobile First radical"],
                resources: []
            }
        ]
    }
];

module.exports = cssCourses;
