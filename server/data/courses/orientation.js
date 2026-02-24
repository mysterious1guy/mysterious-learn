const orientationCourse = [
    {
        id: "orientation-comprendre-les-roles-des-disciplines",
        title: "Orientation - Rôles des Disciplines",
        description: "LE COURS OBLIGATOIRE. Avant de coder, apprenez pourquoi vous codez. Comprenez la synergie entre logique, langages, web et serveurs.",
        category: "Orientation",
        level: "Débutant",
        duration: "1 heure",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        rating: 5.0,
        language: "french",
        isFree: true,
        tags: ["Orientation", "Introduction", "Mandatory"],
        chapters: [
            {
                title: "1. La Carte du Monde Informatique",
                description: "Une vision globale du métier de développeur.",
                order: 1,
                duration: "20 min",
                content: "L'informatique n'est pas qu'une suite de langages. C'est une architecture. 1) L'Algorithmique (Le Cerveau) : Le raisonnement logique pur. 2) Les Langages (La Langue) : Comment on parle à la machine (C, Python). 3) Le Web (La Vitrine) : Frontend pour l'œil, Backend pour le moteur. 4) Les Bases de Données (La Mémoire) : Où l'on stocke tout. 5) DevOps/Système (L'Usine) : Linux et Git pour faire tourner le tout.",
                objectives: ["Identifier les 5 piliers de l'informatique", "Comprendre que l'Algo précède le code"],
                resources: []
            },
            {
                title: "2. Votre Parcours d'Apprentissage",
                description: "Comment utiliser Mysterious Classroom efficacement.",
                order: 2,
                duration: "20 min",
                content: "Pour devenir un ingénieur crédible, suivez l'ordre : 1. Algorithmique (Logique). 2. Langages Fondamentaux (C/Python). 3. Web ou Data selon votre affinité. N'oubliez jamais : Git et Linux sont vos outils de travail quotidiens. Ce site utilise un système d'XP et de projets pour valider vos compétences réelles.",
                objectives: ["Planifier son apprentissage", "Comprendre le système d'XP"],
                resources: []
            },
            {
                title: "3. La Philosophie du Logiciel Libre",
                description: "L'esprit GNU et le partage des connaissances.",
                order: 3,
                duration: "20 min",
                content: "Mysterious Classroom s'inspire de la culture Open Source. Apprendre à coder, c'est apprendre à collaborer. Nous privilégions les technologies ouvertes (Linux, MongoDB, React) et la rigueur technique.",
                objectives: ["Comprendre l'importance de l'Open Source", "Adopter une posture d'ingénieur"],
                resources: []
            }
        ]
    }
];

module.exports = orientationCourse;
