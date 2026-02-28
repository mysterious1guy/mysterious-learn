const networkCourses = [
    {
        id: "network-fondamentaux-reseaux",
        title: "Bases des Réseaux - L'Essentiel",
        description: "Comprenez comment les données voyagent sur Internet. Un module simple, direct et pratique.",
        category: "DevOps & SI",
        level: "Débutant",
        duration: "10 heures",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        language: "french",
        isFree: false,
        isPremium: true,
        tags: ["réseau", "IP", "HTTP"],
        chapters: [
            {
                title: "1. Le Web & IP",
                description: "De votre PC au serveur.",
                order: 1,
                content: "Internet est une toile de câbles et d'ondes reposant sur le modèle Client-Serveur. L'adresse IP est votre numéro d'identification sur ce réseau.",
                objectives: ["Comprendre le modèle Client-Serveur", "Reconnaître une IP"]
            },
            {
                title: "2. DNS & Requêtes HTTP",
                description: "Les adresses du Web et le voyage d'une page.",
                order: 2,
                content: "Le DNS est l'annuaire qui traduit 'google.fr' en IP. Quand vous tapez une URL, votre navigateur envoie une requête GET au serveur, qui vous renvoie du HTML. C'est le protocole HTTP.",
                objectives: ["Comprendre le DNS", "Analyser un échange HTTP"]
            },
            {
                title: "3. Exercice Pratique : Configuration et Ping",
                description: "Masques, Passerelles & Diagnostic.",
                order: 3,
                content: "Apprenez à identifier votre IP locale (`ipconfig` ou `ifconfig`). Comprenez le rôle du routeur (passerelle) pour sortir sur Internet. Utilisez les commandes `ping` et `traceroute` pour vérifier et pister la communication réseau.",
                objectives: ["Diagnostiquer sa connexion locale", "Tester le réseau via le terminal"]
            }
        ]
    }
];

module.exports = networkCourses;
