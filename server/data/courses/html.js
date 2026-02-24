const htmlCourses = [
    {
        id: "html-niveau-d-butant",
        title: "HTML - Niveau Débutant",
        description: "L'ossature fondamentale du Web. Maîtrisez la syntaxe, la sémantique de base et l'imbrication des balises pour construire des documents robustes.",
        category: "Web",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80",
        rating: 4.8,
        students: 42000,
        language: "french",
        isFree: true,
        tags: ["HTML", "Web", "Débutant", "Architecture", "DOM"],
        chapters: [
            {
                title: "1. Structure & Sémantique de base",
                description: "Comprendre l'anatomie d'un document HTML5 et les balises textuelles.",
                order: 1,
                duration: "8 heures",
                content: "Le HTML est le squelette du web. Un document commence par `<!DOCTYPE html>`. On utilise `<h1>` pour les titres et `<p>` pour les paragraphes. La sémantique est vitale pour le SEO et l'accessibilité.",
                objectives: ["Écrire le boilerplate HTML5", "Utiliser les balises de titre et paragraphes", "Comprendre le head vs body"],
                exercises: [
                    {
                        title: "Anatomie Minimale",
                        description: "Créez un document HTML5 avec 'Mysterious' en titre.",
                        difficulty: "Facile",
                        solution: "<!DOCTYPE html><html><head><title>Mysterious</title></head><body><h1>Hello</h1></body></html>",
                        hints: ["Structure standard."]
                    }
                ],
                resources: []
            },
            {
                title: "2. Liens & Médias",
                description: "Apprenez à lier des documents et à intégrer des images.",
                order: 2,
                duration: "7 heures",
                content: "L'essence du web est le lien hypertexte via `<a>`. Pour les images, on utilise `<img>` avec l'attribut `alt` obligatoire pour l'accessibilité.",
                objectives: ["Maîtriser les liens relatifs et absolus", "Intégrer des images avec Alt", "Ouvrir des liens dans de nouveaux onglets"],
                resources: []
            }
        ]
    },
    {
        id: "html-niveau-interm-diaire",
        title: "HTML - Niveau Intermédiaire",
        description: "L'ingénierie de la page Web. Sémantique HTML5 avancée et structures tabulaires.",
        category: "Web",
        level: "Intermédiaire",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        students: 28000,
        language: "french",
        isFree: true,
        tags: ["HTML5", "Sémantique", "Tableaux", "Intermédiaire"],
        chapters: [
            {
                title: "1. Sémantique Structurelle HTML5",
                description: "Utilisez header, nav, main, section et article avec précision.",
                order: 1,
                duration: "10 heures",
                content: "Le HTML5 apporte des balises de structure qui ont du sens pour les moteurs de recherche. Ne faites pas de 'div-itis'.",
                objectives: ["Structurer une page complexe", "Distinguer section et article", "Optimiser le document outline"],
                resources: []
            },
            {
                title: "2. Tableaux & Listes Complexes",
                description: "Maîtrisez les données tabulaires et les listes imbriquées.",
                order: 2,
                duration: "10 heures",
                content: "Le tag `<table>` est réservé aux données, pas au design. Utilisez thead, tbody et tfoot pour une structure robuste.",
                objectives: ["Créer des tableaux accessibles", "Utiliser colspan et rowspan", "Manipuler les listes descriptives <dl>"],
                resources: []
            }
        ]
    },
    {
        id: "html-niveau-avanc",
        title: "HTML - Niveau Avancé",
        description: "Maîtrisez les interactions utilisateur complexes : Formulaires transactionnels et multi-média avancé.",
        category: "Web",
        level: "Avancé",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        students: 19500,
        language: "french",
        isFree: true,
        tags: ["Formulaires", "Vidéo", "Audio", "Avancé"],
        chapters: [
            {
                title: "1. Formulaires & Validation Native",
                description: "Construisez des entrées utilisateur robustes et sécurisées.",
                order: 1,
                duration: "15 heures",
                content: "Les formulaires sont le pont entre l'utilisateur et le serveur. Utilisez les types d'input HTML5 (email, date, number) et la validation par Regex native avec l'attribut `pattern`.",
                objectives: ["Maîtriser tous les types d'input", "Utiliser labels et fieldsets", "Validation sans JavaScript"],
                resources: []
            },
            {
                title: "2. Multimédia & Embedding",
                description: "Intégrez des vidéos, de l'audio et des iframes sandboxés.",
                order: 2,
                duration: "10 heures",
                content: "Utilisez `<video>` et `<audio>` avec des formats multiples pour le fallback. Maîtrisez les IFrames avec l'attribut `sandbox` pour la sécurité.",
                objectives: ["Intégrer des lecteurs natifs", "Sécuriser les Iframes", "Gérer les sources multiples"],
                resources: []
            }
        ]
    },
    {
        id: "html-niveau-expert",
        title: "HTML - Niveau Expert",
        description: "L'ingénierie Frontend Absolue. SEO industriel, Accessibilité A11Y ARIA et APIs HTML5 natives.",
        category: "Web",
        level: "Expert",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["SEO", "ARIA", "Canvas", "Expert"],
        chapters: [
            {
                title: "1. SEO & OpenGraph",
                description: "Optimisez la visibilité de vos pages pour les robots et les réseaux sociaux.",
                order: 1,
                duration: "15 heures",
                content: "Maîtrisez les meta balises head, le link canonical, et le protocole OpenGraph pour un partage parfait sur les réseaux sociaux.",
                objectives: ["SEO technique avancé", "Configuration OpenGraph complète", "Optimisations head critiques"],
                resources: []
            },
            {
                title: "2. Accessibilité & APIs Natives",
                description: "ARIA, Canvas et Dialog : repoussez les limites du navigateur.",
                order: 2,
                duration: "15 heures",
                content: "Utilisez ARIA pour les lecteurs d'écran. Découvrez le `<canvas>` pour le dessin 2D/3D et la balise `<dialog>` pour les modales natives.",
                objectives: ["Rendre tout composant accessible", "S'initier au Canvas", "Utiliser les APIs HTML5 modernes"],
                resources: []
            }
        ]
    }
];

module.exports = htmlCourses;
