const phpCourses = [
    {
        title: "PHP - Niveau Débutant",
        description: "Apprenez le langage qui fait tourner 80% du Web. Comprenez comment générer du HTML dynamiquement côté serveur.",
        category: "Programmation",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d1d94211?w=800&q=80",
        rating: 4.7,
        students: 18000,
        language: "french",
        isFree: true,
        tags: ["PHP", "backend", "web", "débutant"],
        chapters: [
            {
                title: "Introduction à PHP et Environnement Serveur",
                description: "Comment le web fonctionne : Client vs Serveur.",
                order: 1,
                duration: "3 heures",
                content: "Contrairement à HTML/CSS et JS (qui s'exécutent sur le navigateur du client), PHP s'exécute sur le **serveur**. Le serveur traite le code PHP et renvoie au client du HTML pur. Vous apprendrez à utiliser les balises `<?php ... ?>`, à déclarer des variables avec le dollar `$variable`, et à utiliser `echo` pour envoyer du texte au navigateur.",
                objectives: ["Comprendre le rôle d'un serveur web (Apache/Nginx)", "Intégrer du PHP dans du HTML", "Utiliser echo et les concaténations avec le point (.)"],
                exercises: [
                    {
                        title: "Hello Serveur",
                        description: "Affichez 'Bonjour PHP' en concaténant les chaînes 'Bonjour' et 'PHP'.",
                        difficulty: "Facile",
                        solution: "<?php\\necho 'Bonjour' . ' ' . 'PHP';\\n?>",
                        hints: ["Le point de concaténation . relie deux chaînes."]
                    }
                ],
                resources: [
                    {
                        title: "Le PHP, c'est quoi exactement ?",
                        type: "video",
                        url: "https://www.youtube.com/embed/9Bv_A0M2M1"
                    }
                ]
            },
            {
                title: "Variables, Conditions et Boucles",
                description: "La logique de base en PHP.",
                order: 2,
                duration: "5 heures",
                content: "En PHP, les variables ne sont pas typées strictement. `$age = 25;` est un entier, `$nom = \"Jean\";` est une chaîne. Les conditions `if/else` et les boucles `for` ou `while` ont la même syntaxe qu'en C. Une boucle très pratique en PHP pour les listes est le `foreach`.",
                objectives: ["Maitriser les variables types standards", "Utiliser une boucle foreach sur un Array"],
                exercises: [
                    {
                        title: "Boucle sur un tableau",
                        description: "Soit $couleurs = ['rouge', 'bleu']. Bouclez avec foreach pour afficher chaque couleur.",
                        difficulty: "Facile",
                        solution: "foreach($couleurs as $c) {\\n  echo $c;\\n}",
                        hints: ["Syntaxe magique : foreach($tableau as $element)"]
                    }
                ]
            },
            {
                title: "Gestion des Formulaires (GET et POST)",
                description: "Récupérez ce que l'utilisateur tape sur votre site.",
                order: 3,
                duration: "7 heures",
                content: "Quand un utilisateur clique sur 'Envoyer' dans un `<form>`, PHP peut attraper ces données via les superglobales `$_GET` (données passées dans l'URL) ou `$_POST` (données passées silencieusement). C'est la base de tout système de login. Vous apprendrez aussi à valider et nettoyer ces données avec `htmlspecialchars()` pour éviter les failles XSS.",
                objectives: ["Faire la différence entre GET et POST", "Récupérer la donnée POST", "Sécuriser l'affichage contre la faille XSS"],
                exercises: [
                    {
                        title: "Saluer un utilisateur POST",
                        description: "L'utilisateur a envoyé son pseudo via champ POST 'pseudo'. Affichez 'Salut [pseudo]'. Protégez l'affichage.",
                        difficulty: "Moyen",
                        solution: "if (isset($_POST['pseudo'])) {\\n  echo 'Salut ' . htmlspecialchars($_POST['pseudo']);\\n}",
                        hints: ["Utilisez isset() pour vérifier que la donnée existe avant de l'afficher."]
                    }
                ]
            }
        ]
    },
    {
        title: "PHP - Niveau Intermédiaire",
        description: "Connectez-vous à la base de données. Créez des sessions réelles d'utilisateurs avec PDO MySQL.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d1d94211?w=800&q=80",
        rating: 4.8,
        students: 14000,
        language: "french",
        isFree: true,
        tags: ["PHP", "PDO", "sessions", "MySQL", "intermédiaire"],
        chapters: [
            {
                title: "Connexion PDO et Requêtes Préparées",
                description: "Connectez PHP à MySQL en toute sécurité.",
                order: 1,
                duration: "8 heures",
                content: "On n'utilise plus les vieilles fonctions `mysql_query` (dépréciées). Aujourd'hui nous utilisons l'objet PDO. Il permet de se connecter à n'importe quelle BDD. Et surtout, PDO offre les 'Requêtes Préparées' (`prepare()` et `execute()`), l'arme absolue pour neutraliser les terribles failles d'Injections SQL.",
                objectives: ["Créer une instance PDO connectée", "Faire un SELECT sécurisé", "Traiter la faille requête non sécurisée (Injection SQL)"],
                exercises: [
                    {
                        title: "La requête prepare PDO",
                        description: "Sur l'objet PDO $bdd, préparez une requête qui prend les membres dont le nom est égal au marqueur '?'.",
                        difficulty: "Difficile",
                        solution: "$req = $bdd->prepare('SELECT * FROM membre WHERE nom = ?');\\n$req->execute([$nom_recherche]);",
                        hints: ["Le execute() prend un tableau (array) des valeurs qui correspondent aux '?'."]
                    }
                ],
                resources: [
                    {
                        title: "PHP PDO et Sécurité DB requetes",
                        type: "video",
                        url: "https://www.youtube.com/embed/e1w0"
                    }
                ]
            },
            {
                title: "Sessions et Cookies",
                description: "Se souvenir d'un utilisateur d'une page à l'autre.",
                order: 2,
                duration: "8 heures",
                content: "Sans session, le serveur est amnésique. Chaque requête HTTP est vierge. La fonction `session_start()` doit être la toute première chose appelée dans votre script. Elle génère un cookie `PHPSESSID` chez le client et ouvre accès à la superglobale `$_SESSION[]`. C'est grâce à ça qu'on sait si un utilisateur est 'connecté' en allant de l'Accueil au Profil.",
                objectives: ["Démarrer une session", "Stocker le pseudo du user dans la tableau SESSION", "Détruire la session (Deconnexion) avec session_destroy()"],
                exercises: [
                    {
                        title: "Mise en session",
                        description: "Stockez la valeur 'admin' dans la clef 'role' de la session.",
                        difficulty: "Facile",
                        solution: "session_start();\\n$_SESSION['role'] = 'admin';",
                        hints: ["N'oublie jamais de démarrer le session_start avant l'affectation."]
                    }
                ]
            },
            {
                title: "Architecture MVC - Introduction",
                description: "Ne mélangez plus jamais PHP crado avec HTML.",
                order: 3,
                duration: "4 heures",
                content: "Si vous mettez vos requêtes SQL en plein milieu de votre affichage CSS/HTML, c'est le chaos. Pensez MVC (Modèle-Vue-Contôleur). Le Modèle s'occupe des requêtes BDD. Le Contrôleur reçoit les clics, lance les calculs du Modèle, et envoie les résultats à la Vue (qui est 100% HTML avec juste quelques echo PHP).",
                objectives: ["Séparer logique et affichage.", "Comprendre le routage via index.php basique."]
            }
        ]
    },
    {
        title: "PHP - Niveau Expert (Avancé)",
        description: "Orientation Objet pure en PHP, MVC Structuré Complet et création d'API Rest en Symfony / Laravel mindset.",
        category: "Programmation",
        level: "Avancé",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d1d94211?w=800&q=80",
        rating: 4.8,
        students: 9000,
        language: "french",
        isFree: true,
        tags: ["PHP", "OOP", "MVC", "Composer", "avancé"],
        chapters: [
            {
                title: "POO en PHP",
                description: "Classe, Objet et Visibilité",
                order: 1,
                duration: "10 heures",
                content: "Le PHP moderne est massivement Orienté Objet. Mot clé `class`, instanciation avec `$instance = new Classe();`. Accès aux attributs avec la flêche `$this->attribut`. Gestion des namespace et autoloading via standard PSR-4 avec Composer (le gestionnaire de paquet PHP). C'est la porte d'entrée inévitable pour les grand Frameworks comme Laravel ou Symfony.",
                objectives: ["Créer une classe PHP.", "Comprendre la fonction constructeur __construct();", "Utiliser les Getters et Setters normés."]
            },
            {
                title: "Composer et Autoloading PSR-4",
                description: "Gérer vos packages comme Node NPM",
                order: 2,
                duration: "8 heures",
                content: "Auparavant on devait faire des require_once partout. Grace à `composer.json` et au standard PSR-4, il suffit de configurer et faire un simple `require 'vendor/autoload.php'`. Tous les Object Models avec le bon Namespace s'importeront de façon auto-magique quand on les instancie.",
                objectives: ["Installer composer", "Config autoload namespace"]
            },
            {
                title: "Creation d'API REST PHP Native",
                description: "Répondez aux requetes des applications Javascript Frontend",
                order: 3,
                duration: "7 heures",
                content: "Un PHP moderne de 2024 ne renvoie parfois pas de HTML du tout : Il est juste là pour causer avec React ! On apprendra à configurer les Headers `header('Content-Type: application/json')`, choper le Body Raw au format JSON file_get_contents('php://input'), et recracher le `json_encode($data)`. Bienvenue dans le monde Headless/API PHP.",
                objectives: ["Return un response header JSON", "Intercepter les Cors Headers API"]
            }
        ]
    }
];

module.exports = phpCourses;
