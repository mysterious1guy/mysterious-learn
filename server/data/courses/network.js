const networkCourses = [
    {
        id: "network-fondamentaux-reseaux",
        title: "Bases des Réseaux - L'Essentiel",
        description: "Comprenez comment les données voyagent sur Internet. Un module simple, direct et pratique.",
        category: "DevOps",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=800&q=80",
        rating: 4.8,
        language: "french",
        isFree: true,
        tags: ["réseau", "IP", "HTTP"],
        chapters: [
            {
                title: "1. Vision Globale : Le Web",
                description: "De votre PC au serveur.",
                order: 1,
                content: "Internet est une toile de câbles et d'ondes. Tout repose sur le modèle Client-Serveur : vous demandez, le serveur répond.",
                objectives: ["Comprendre le modèle Client-Serveur"]
            },
            {
                title: "2. Concept : IP & DNS",
                description: "Les adresses du Web.",
                order: 2,
                content: "L'adresse IP est votre numéro de téléphone sur le réseau. Le DNS est l'annuaire qui traduit 'google.fr' en adresse IP.",
                objectives: ["Différencier IP et DNS"]
            },
            {
                title: "3. Exemple Concret : Requête HTTP",
                description: "Le voyage d'une page web.",
                order: 3,
                content: "Quand vous tapez une URL, votre navigateur envoie une requête GET. Le serveur renvoie du HTML. C'est le protocole HTTP.",
                objectives: ["Analyser un échange HTTP"]
            },
            {
                title: "4. Cas Pratique : Configurer son réseau",
                description: "Masques et Passerelles.",
                order: 4,
                content: "Apprenez à identifier votre IP locale (`ipconfig` ou `ifconfig`). Comprenez le rôle du routeur (passerelle) pour sortir sur Internet.",
                objectives: ["Diagnostiquer sa connexion"]
            },
            {
                title: "5. Exercice : Ping & Traceroute",
                description: "Tester la communication.",
                order: 5,
                content: "Utilisez la commande `ping` pour vérifier si un serveur répond. Utilisez `traceroute` pour voir tous les 'chemins' empruntés par vos données.",
                objectives: ["Utiliser les outils de diagnostic réseau"]
            }
        ]
    }
];

module.exports = networkCourses;
