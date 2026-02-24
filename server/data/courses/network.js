const networkCourses = [
    {
        id: "network-niveau-d-butant",
        title: "Bases des réseaux - Niveau Débutant",
        description: "Comprenez comment les machines communiquent. Découvrez l'adresse IP et le fonctionnement de base d'Internet.",
        category: "Système",
        level: "Débutant",
        duration: "10 heures",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=800&q=80",
        rating: 4.7,
        language: "french",
        isFree: true,
        tags: ["réseau", "IP", "Internet"],
        chapters: [
            {
                title: "1. L'Adresse IP & Masques",
                description: "L'identité d'une machine sur le réseau.",
                order: 1,
                duration: "5 heures",
                content: "Qu'est-ce qu'une adresse IP ? Apprenez la différence entre IPv4 et IPv6. Comprenez le rôle du masque de sous-réseau et de la passerelle par défaut.",
                objectives: ["Identifier son IP", "Comprendre le routage de base"],
                resources: []
            }
        ]
    },
    {
        id: "network-niveau-moyen",
        title: "Bases des réseaux - Niveau Moyen",
        description: "Le modèle Client-Serveur. Comprenez comment votre navigateur demande une page web.",
        category: "Système",
        level: "Moyen",
        duration: "12 heures",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=800&q=80",
        rating: 4.8,
        language: "french",
        isFree: true,
        tags: ["HTTP", "Client-Serveur", "Web"],
        chapters: [
            {
                title: "1. Le Protocole HTTP",
                description: "La langue du Web.",
                order: 1,
                duration: "12 heures",
                content: "Maîtrisez le cycle Requête-Réponse. Apprenez les méthodes (GET, POST) et les codes de statut (200, 404, 500). Comprenez le rôle du DNS.",
                objectives: ["Déchiffrer une requête HTTP", "Comprendre la résolution de noms"],
                resources: []
            }
        ]
    },
    {
        id: "network-niveau-interm-diaire",
        title: "Bases des réseaux - Niveau Intermédiaire",
        description: "Les Ports et Protocoles de Transport. TCP vs UDP.",
        category: "Système",
        level: "Intermédiaire",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=800&q=80",
        rating: 4.8,
        language: "french",
        isFree: true,
        tags: ["TCP", "UDP", "Ports"],
        chapters: [
            {
                title: "1. TCP & UDP",
                description: "La fiabilité contre la vitesse.",
                order: 1,
                duration: "15 heures",
                content: "Comprenez la différence entre un protocole orienté connexion (TCP) et un protocole rapide (UDP). Apprenez le concept de Ports (80, 443, 22).",
                objectives: ["Choisir entre TCP et UDP", "Manipuler les sockets"],
                resources: []
            }
        ]
    },
    {
        id: "network-niveau-expert",
        title: "Bases des réseaux - Niveau Expert",
        description: "Sécurité & SSL/TLS. Comment le Web est devenu sécurisé.",
        category: "Système",
        level: "Expert",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=800&q=80",
        rating: 4.9,
        language: "french",
        isFree: true,
        tags: ["SSL", "TLS", "Sécurité"],
        chapters: [
            {
                title: "1. Chiffrement & Certificats",
                description: "Le fonctionnement de HTTPS.",
                order: 1,
                duration: "20 heures",
                content: "Comprenez le Handshake SSL/TLS. Apprenez comment fonctionnent les certificats et l'autorité de certification. Introduction aux VPN et Firewalls.",
                objectives: ["Sécuriser une communication", "Comprendre PKI"],
                resources: []
            }
        ]
    }
];

module.exports = networkCourses;
