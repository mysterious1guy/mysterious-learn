const projects = [
    {
        _id: "proj_c_1",
        title: "Quête 1 : Le Calculateur Binaire & Métriques RAM",
        description: "Écrivez un programme C système qui analyse l'occupation mémoire des types stricts (char, int, float, double) et effectue des conversions binaires.",
        language: "C",
        level: "Débutant",
        difficulty: "Facile",
        xpReward: 500,
        requirements: ["printf", "scanf", "sizeof", "GCC"],
        objectives: ["Mesurer les octets réels en RAM", "Gérer les entrées/sorties formatées sans avertissement"]
    },
    {
        _id: "proj_c_2",
        title: "Quête 2 : Le Déchiffreur de Texte par Pointeurs",
        description: "Implémentez un algorithme de cryptage/déchiffrement de texte Vigenère en utilisant exclusivement des pointeurs char* sans crochets [].",
        language: "C",
        level: "Intermédiaire",
        difficulty: "Moyen",
        xpReward: 900,
        requirements: ["Pointeurs char*", "Déréférencement *", "Arithmétique de pointeurs"],
        objectives: ["Parcourir les adresses RAM avec ptr++", "Modifier des chaînes en mémoire vive"]
    },
    {
        _id: "proj_c_3",
        title: "Quête 3 : Le Gestionnaire Malloc & Chasseur de Fuites",
        description: "Créez un tableau dynamique de structures d'étudiants loué sur le Tas (Heap). Libérez chaque octet avec free() et validez avec Valgrind.",
        language: "C",
        level: "Avancé",
        difficulty: "Difficile",
        xpReward: 1400,
        requirements: ["malloc()", "calloc()", "free()", "struct"],
        objectives: ["Allouer la mémoire dynamique sans crash", "Garantir zéro fuite mémoire"]
    },
    {
        _id: "proj_c_4",
        title: "Quête 4 : Le Moteur de Base de Données & Listes Chaînées",
        description: "Construisez une base de données en mémoire basée sur une liste chaînée simple avec sauvegarde et chargement automatique dans un fichier binaire (FILE*).",
        language: "C",
        level: "Expert",
        difficulty: "Extrême",
        xpReward: 2000,
        requirements: ["Listes chaînées", "Pointeurs de structures", "fopen/fwrite/fread"],
        objectives: ["Construire une structure de données dynamique", "Gérer la persistance fichier binaire"]
    }
];

module.exports = projects;
