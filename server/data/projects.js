const projects = [
    // --- ALGORITHMIQUE ---
    {
        _id: "proj_algo_1",
        title: "Le Labyrinthe du Destin",
        description: "Sortez d'un labyrinthe généré aléatoirement via le backtracking.",
        language: "Algorithmique",
        level: "Intermédiaire",
        difficulty: "Moyen",
        xpReward: 800,
        requirements: ["Matrices", "Backtracking"],
        objectives: ["Recursion", "Spatial Search"]
    },
    // --- JAVASCRIPT ---
    {
        _id: "proj_js_1",
        title: "Calculatrice de Particules",
        description: "Un moteur physique simple en JS pur pour simuler des collisions.",
        language: "JavaScript",
        level: "Moyen",
        difficulty: "Moyen",
        xpReward: 600,
        requirements: ["Canvas API", "Math.sin/cos"],
        objectives: ["Logic Animations", "Vector Math"]
    },
    {
        _id: "proj_js_2",
        title: "Blockchain Minimaliste",
        description: "Implémentez une chaîne de blocs avec hachage SHA-256.",
        language: "JavaScript",
        level: "Expert",
        difficulty: "Difficile",
        xpReward: 1500,
        requirements: ["Crypto API", "Classes"],
        objectives: ["Data Integrity", "Hashing"]
    },
    // --- PYTHON ---
    {
        _id: "proj_python_1",
        title: "CyberPet Evolution",
        description: "Un assistant virtuel évolutif avec persistance JSON.",
        language: "Python",
        level: "Débutant",
        difficulty: "Facile",
        xpReward: 400,
        requirements: ["JSON", "Classes"],
        objectives: ["OOP", "File I/O"]
    },
    {
        _id: "proj_python_2",
        title: "Scraper de Bourse",
        description: "Extrayez les cours des actions en temps réel.",
        language: "Python",
        level: "Intermédiaire",
        difficulty: "Moyen",
        xpReward: 900,
        requirements: ["BeautifulSoup", "Requests"],
        objectives: ["Data Extraction", "Regex"]
    },
    // --- LANGAGE C ---
    {
        _id: "proj_c_1",
        title: "Shell Interne",
        description: "Créez votre propre interpréteur de commandes simple.",
        language: "C",
        level: "Intermédiaire",
        difficulty: "Difficile",
        xpReward: 1200,
        requirements: ["fork()", "exec()", "wait()"],
        objectives: ["Process Management", "System Calls"]
    },
    // --- C++ ---
    {
        _id: "proj_cpp_1",
        title: "Moteur de Rendu 3D (Software)",
        description: "Affichez un cube en rotation sans utiliser de bibliothèque graphique.",
        language: "C++",
        level: "Expert",
        difficulty: "Extrême",
        xpReward: 2500,
        requirements: ["Matrices 4x4", "STL"],
        objectives: ["Linear Algebra", "Optimization"]
    },
    // --- HTML / CSS ---
    {
        _id: "proj_html_css_1",
        title: "Portfolio Cyberpunk",
        description: "Une page perso avec effets de glitch et néons uniquement en CSS.",
        language: "CSS",
        level: "Moyen",
        difficulty: "Moyen",
        xpReward: 500,
        requirements: ["Keyframes", "Clip-path"],
        objectives: ["UI/UX Design", "Animations"]
    },
    // --- BASH ---
    {
        _id: "proj_bash_1",
        title: "Garde du Corps (Sentry)",
        description: "Un script qui surveille les tentatives de connexion SSH et ban les IP.",
        language: "Bash",
        level: "Intermédiaire",
        difficulty: "Moyen",
        xpReward: 700,
        requirements: ["Grep", "Iptables", "AWK"],
        objectives: ["Security", "Log Analysis"]
    },
    // --- PHP / MYSQL ---
    {
        _id: "proj_web_backend_1",
        title: "E-Commerce de l'Espace",
        description: "Boutique complète avec panier et gestion de stock en MySQL.",
        language: "PHP",
        level: "Intermédiaire",
        difficulty: "Difficile",
        xpReward: 1100,
        requirements: ["PDO", "SQL Joins", "Sessions"],
        objectives: ["Database Design", "Backend Logic"]
    },
    // --- REACT / MONGODB ---
    {
        _id: "proj_fullstack_1",
        title: "Réseau Social Mystérieux",
        description: "Feed en temps réel, amis et messages cryptés.",
        language: "React",
        level: "Expert",
        difficulty: "Difficile",
        xpReward: 1800,
        requirements: ["Express", "MongoDB", "Auth"],
        objectives: ["Fullstack Dev", "State Management"]
    }
];

module.exports = projects;
