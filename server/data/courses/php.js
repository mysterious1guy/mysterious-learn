const phpCourses = [
    {
        id: "php-niveau-d-butant-la-dynamique-du-web",
        title: "PHP - Niveau Débutant : La Dynamique du Web",
        description: "Découvrez le langage qui propulse 80% d'internet. Apprenez à transformer des pages HTML statiques en applications web vivantes et interactives.",
        category: "Programmation",
        level: "Débutant",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d1d94211?w=800&q=80",
        rating: 4.7,
        students: 18000,
        language: "php",
        isFree: true,
        tags: ["PHP", "backend", "web", "débutant", "html"],
        chapters: [
            {
                title: "Chapitre 1 : Architecture Client-Serveur et Premier Script",
                description: "Comprenez comment le code PHP s'exécute sur le serveur avant d'atteindre le navigateur.",
                order: 1,
                duration: "6 heures",
                content: "Contrairement au HTML/CSS, PHP est un langage de script côté serveur. Lorsqu'un utilisateur demande une page `.php`, le serveur (Apache/Nginx) traite les balises `<?php ... ?>` et renvoie du HTML pur au navigateur. Nous aborderons la configuration de l'environnement (XAMPP/Docker), la déclaration de variables avec `$`, et l'utilisation de `echo` pour l'affichage. Vous apprendrez également l'importance du point-virgule et les commentaires.",
                objectives: ["Installer et configurer un serveur local PHP", "Intégrer du PHP dans un fichier HTML", "Utiliser les variables et les types scalaires (string, int, float, bool)"],
                exercises: [
                    {
                        title: "Votre Premier Echo Dynamique",
                        description: "Créez une variable `$nom` et affichez la phrase 'Bienvenue sur Mysterious Learn, [nom]' en utilisant la concaténation.",
                        difficulty: "Facile",
                        solution: "<?php\n$nom = \"Apprenti\";\necho \"Bienvenue sur Mysterious Learn, \" . $nom;\n?>",
                        hints: ["Utilisez le point (.) pour relier deux chaînes de caractères."]
                    }
                ],
                resources: [{ title: "PHP: The Right Way - Getting Started", type: "article", url: "https://phptherightway.com/" }]
            },
            {
                title: "Chapitre 2 : Logique de Contrôle et Tableaux Associatifs",
                description: "Maîtrisez les conditions, les boucles et la structure de données reine du PHP : l'Array.",
                order: 2,
                duration: "8 heures",
                content: "Un programme sans condition n'est qu'une simple liste. Nous étudierons `if`, `else`, `elseif` et le `switch`. Nous passerons ensuite aux tableaux, pilier du langage. C++ a ses vecteurs, PHP a ses **Tableaux Associatifs** (`['clé' => 'valeur']`). Vous apprendrez à utiliser `foreach` pour itérer élégamment sur ces données, une compétence vitale pour afficher des listes d'articles ou de produits.",
                objectives: ["Structurer des conditions complexes", "Manipuler des tableaux multidimensionnels", "Utiliser foreach comme un pro pour parser des données"],
                exercises: [
                    {
                        title: "Le Menu Dynamique",
                        description: "Soit un tableau `$menu = ['Accueil' => 'index.php', 'Profil' => 'profile.php']`. Générez une liste HTML `<ul><li>` via une boucle foreach.",
                        difficulty: "Moyen",
                        solution: "<ul>\n<?php foreach($menu as $nom => $url): ?>\n  <li><a href='<?= $url ?>'><?= $nom ?></a></li>\n<?php endforeach; ?>\n</ul>",
                        hints: ["Utilisez la syntaxe alternative des boucles (`:`, `endforeach`) pour une meilleure lisibilité dans le HTML."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Fonctions, Portée et Passage de Paramètres",
                description: "Organisez votre code en blocs réutilisables. Comprenez la portée globale vs locale.",
                order: 3,
                duration: "8 heures",
                content: "Ne vous répétez pas (DRY). Nous apprendrons à créer des fonctions personnalisées avec des paramètres par défaut et des types de retour (PHP 7/8). Nous aborderons le piège du mot-clé `global` et pourquoi il faut l'éviter au profit de l'injection d'arguments. Nous introduirons également les fonctions anonymes (closures) et leur utilité dans les rappels.",
                objectives: ["Écrire des fonctions typées proprement", "Comprendre la différence entre passage par valeur et par référence (&$var)", "Utiliser return pour renvoyer des résultats complexes"],
                exercises: [
                    {
                        title: "Le Formateur de Prix",
                        description: "Écrivez une fonction `formatPrix` qui prend un nombre et retourne une chaîne avec le symbole '€' et deux décimales.",
                        difficulty: "Facile",
                        solution: "function formatPrix(float $prix): string {\n  return number_format($prix, 2) . \" €\";\n}",
                        hints: ["Utilisez la fonction native number_format() de PHP."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Gestion des Formulaires et Sécurité XSS",
                description: "Récupérez les données utilisateur via $_GET et $_POST. Apprenez à neutraliser les injections de scripts.",
                order: 4,
                duration: "8 heures",
                content: "Le web est interactif grâce aux formulaires. Nous étudierons comment PHP intercepte ces données via les superglobales. **Sécurité Critique :** Ne jamais faire confiance à l'utilisateur. Vous apprendrez à utiliser `htmlspecialchars()` pour prévenir les failles Cross-Site Scripting (XSS). Nous aborderons également le nettoyage (sanitization) des données avant traitement.",
                objectives: ["Choisir entre GET et POST selon le cas d'usage", "Valider la présence des données avec empty() et isset()", "Appliquer une protection systématique sur les affichages dynamiques"],
                exercises: [
                    {
                        title: "Le Formulaire de Contact Sécure",
                        description: "Interceptez un champ 'message' envoyé en POST et affichez-le en vous protégeant contre les injections HTML.",
                        difficulty: "Moyen",
                        solution: "<?php\nif(!empty($_POST['message'])) {\n  echo \"Votre message : \" . htmlspecialchars($_POST['message']);\n} ?>",
                        hints: ["L'injection de `<script>` dans un formulaire est la menace N°1 des débutants."]
                    }
                ],
                resources: [{ title: "OWASP: Preventing XSS in PHP", type: "article", url: "https://owasp.org/www-community/attacks/xss/" }]
            }
        ]
    },
    {
        id: "php-niveau-interm-diaire-base-de-donn-es-sessions",
        title: "PHP - Niveau Intermédiaire : Base de Données & Sessions",
        description: "Passez au backend professionnel. Connectez-vous à MySQL avec PDO, gérez l'authentification des utilisateurs et structurez votre code en MVC.",
        category: "Programmation",
        level: "Intermédiaire",
        duration: "45 heures",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d1d94211?w=800&q=80",
        rating: 4.8,
        students: 14000,
        language: "php",
        isFree: true,
        tags: ["PHP", "PDO", "sessions", "MySQL", "intermédiaire", "MVC"],
        chapters: [
            {
                title: "Chapitre 1 : PDO et Requêtes Préparées (Anti-Injection SQL)",
                description: "Connectez PHP à MySQL de manière moderne. Éradiquez les injections SQL définitivement.",
                order: 1,
                duration: "12 heures",
                content: "L'ancienne extension `mysql_` est morte. Nous utiliserons **PDO (PHP Data Objects)**. C'est une interface d'abstraction qui permet de changer de base de données sans réécrire tout le code. Point crucial : les **Requêtes Préparées**. En séparant la structure de la requête des données de l'utilisateur, on rend les injections SQL physiquement impossibles. Vous maîtriserez `prepare()`, `bindValue()` et `execute()`.",
                objectives: ["Établir une connexion robuste via DSN", "Exécuter des SELECT, INSERT et UPDATE sécurisés", "Gérer les erreurs de base de données via les exceptions PDO"],
                exercises: [
                    {
                        title: "Récupération d'un Utilisateur",
                        description: "Écrivez le code PDO pour récupérer un utilisateur par son ID en utilisant une requête préparée.",
                        difficulty: "Difficile",
                        solution: "$stmt = $db->prepare(\"SELECT * FROM users WHERE id = ?\");\n$stmt->execute([$id]);\n$user = $stmt->fetch();",
                        hints: ["Le marqueur '?' ou les paramètres nommés (:id) sont obligatoires pour la sécurité."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 2 : Sessions, Cookies et Authentification",
                description: "Rendez le serveur intelligent. Gérez la connexion des utilisateurs et les cookies de préférence.",
                order: 2,
                duration: "11 heures",
                content: "HTTP est apatride (stateless). Pour qu'un site sache que vous êtes connecté, on utilise les **Sessions**. Nous étudierons `session_start()`, le stockage de données dans `$_SESSION` et le cycle de vie du cookie `PHPSESSID`. Vous apprendrez à créer un système de login complet avec hachage de mot de passe sécurisé via `password_hash()` (Argon2/Bcrypt) et vérification via `password_verify()`.",
                objectives: ["Démarrer et détruire une session proprement", "Protéger une page avec une condition de connexion", "Ne jamais stocker de mots de passe en clair (Interdiction absolue)"],
                exercises: [
                    {
                        title: "Le Gardien de Page",
                        description: "Écrivez le début d'un fichier `admin.php` qui redirige vers `login.php` si l'utilisateur n'a pas la clé 'user_id' en session.",
                        difficulty: "Moyen",
                        solution: "<?php\nsession_start();\nif(!isset($_SESSION['user_id'])) {\n  header('Location: login.php');\n  exit();\n} ?>",
                        hints: ["header('Location: ...') doit être suivi d'un exit() pour arrêter l'exécution."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Architecture MVC et Séparation des Responsabilités",
                description: "Arrêtez le code spaghetti. Séparez votre logique métier de votre affichage HTML.",
                order: 3,
                duration: "12 heures",
                content: "Le design pattern **MVC (Modèle-Vue-Contrôleur)** est le standard de l'industrie. 1) Le Modèle gère la donnée (requêtes SQL). 2) La Vue gère l'affichage (HTML/CSS). 3) Le Contrôleur fait le lien, traite les entrées et décide quoi afficher. Nous construirons une architecture simplifiée pour comprendre comment les grands frameworks (Symfony, Laravel) fonctionnent sous le capot.",
                objectives: ["Refactorer un script monolithique en architecture MVC", "Comprendre le rôle du Routeur (Front Controller)", "Maintenir une base de code propre et évolutive"],
                exercises: [
                    {
                        title: "Logique de Contrôleur",
                        description: "Dans un schéma MVC, quel composant doit contenir la vérification d'un formulaire et l'appel au modèle ?",
                        difficulty: "Facile",
                        solution: "Le Contrôleur.",
                        hints: ["Il agit comme le chef d'orchestre entre l'utilisateur et les données."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Manipulation de Fichiers et Upload Sécurisé",
                description: "Gérez les avatars et les documents. Apprenez à valider les types MIME et les tailles de fichiers.",
                order: 4,
                duration: "10 heures",
                content: "L'upload de fichiers est une zone critique pour la sécurité. Nous étudierons `$_FILES`, le déplacement des fichiers temporaires avec `move_uploaded_file()` et la validation stricte des extensions. Vous apprendrez pourquoi renommer un fichier uploadé est une mesure de sécurité indispensable pour éviter l'écrasement ou l'exécution de scripts malveillants.",
                objectives: ["Vérifier la taille et le type réel (MIME) d'un fichier", "Générer des noms de fichiers uniques", "Sécuriser le dossier de destination"],
                exercises: [
                    {
                        title: "Vérifier l'Extension",
                        description: "Utilisez `pathinfo()` pour vérifier que le fichier uploadé a bien une extension '.jpg' ou '.png'.",
                        difficulty: "Moyen",
                        solution: "$ext = pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION);\nif(!in_array($ext, ['jpg', 'png'])) die('Refusé');",
                        hints: ["Ne vous fiez jamais uniquement au type MIME envoyé par le navigateur."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        id: "php-niveau-expert-mondiale-programmation-orient-e-objet-frameworks",
        title: "PHP - Niveau Expert Mondiale : Programmation Orientée Objet & Frameworks",
        description: "Maîtrisez le PHP moderne de 2024. Plongez dans la POO avancée, les Namespaces, Composer, et les standards PSR utilisés par les ingénieurs Facebook et Slack.",
        category: "Programmation",
        level: "Avancé",
        duration: "65 heures",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d1d94211?w=800&q=80",
        rating: 5.0,
        students: 9000,
        language: "php",
        isFree: true,
        tags: ["PHP", "OOP", "Composer", "PSR", "Symfony", "Laravel", "Expert"],
        chapters: [
            {
                title: "Chapitre 1 : POO Avancée : Classes, Héritage et Interfaces",
                description: "Pensez en Objets. Maîtrisez la visibilité, les méthodes statiques et les contrats d'interfaces.",
                order: 1,
                duration: "18 heures",
                content: "Le PHP moderne est 100% orienté objet. Nous étudierons en profondeur : l'encapsulation réelle (`private` vs `protected`), l'héritage, et surtout les **Interfaces**. Une interface définit un contrat : toute classe qui l'implémente *doit* posséder certaines méthodes. C'est la base du découplage et de l'injection de dépendances. Nous aborderons également les **Traits**, une solution élégante au manque d'héritage multiple en PHP.",
                objectives: ["Modéliser des systèmes complexes via des hiérarchies d'objets", "Implémenter le polymorphisme via les interfaces", "Utiliser le chaînage de méthodes (Fluent Interface)"],
                exercises: [
                    {
                        title: "L'Interface de Paiement",
                        description: "Créez une interface `PaymentMethod` avec une méthode `pay(float $amt)`. Implémentez `Paypal` et `Stripe`.",
                        difficulty: "Difficile",
                        solution: "interface PaymentMethod { public function pay(float $amt); }\nclass Stripe implements PaymentMethod {\n  public function pay(float $amt) { /* Logique Stripe */ }\n}",
                        hints: ["L'interface force les développeurs à suivre une structure commune."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 2 : Namespaces, Autoloading et Composer",
                description: "Organisez des projets massifs. Maîtrisez le gestionnaire de paquets Composer et le standard PSR-4.",
                order: 2,
                duration: "15 heures",
                content: "Fini les `require` à chaque ligne. Les **Namespaces** isolent votre code pour éviter les collisions de noms de classes. Vous apprendrez à configurer **Composer**, l'outil indispensable de l'écosystème PHP, pour gérer vos dépendances (librairies externes) et l'autoloading automatique via le standard **PSR-4**. C'est ainsi que vous pourrez importer n'importe quel package (envoi de mail, gestion d'images, framework) en une commande.",
                objectives: ["Installer et configurer Composer dans un projet", "Mettre en place un Autoloader PSR-4 personnalisé", "Utiliser des librairies tierces via Packagist"],
                exercises: [
                    {
                        title: "Installer une librairie",
                        description: "Quelle commande Composer permet d'ajouter la librairie 'Guzzle' (requêtes HTTP) à votre projet ?",
                        difficulty: "Facile",
                        solution: "composer require guzzlehttp/guzzle",
                        hints: ["Composer recherche automatiquement sur Packagist.org."]
                    }
                ],
                resources: [{ title: "Composer: Dependency Manager for PHP", type: "article", url: "https://getcomposer.org/" }]
            },
            {
                title: "Chapitre 3 : Exceptions, Typage Strict et PHP 8.x Features",
                description: "Écrivez du code indestructible. Utilisez le typage strict (`declare(strict_types=1)`) et les nouvelles syntaxes (Readonly, Union Types).",
                order: 3,
                duration: "15 heures",
                content: "PHP n'est plus le langage 'mou' du passé. Nous activerons le **mode strict** pour transformer les erreurs silencieuses en exceptions fatales immédiates. Nous explorerons les pépites de PHP 8 : les **Constructor Property Promotion** (réduit le code par 3), les **Attributs** (métadonnées), les **Union Types** (`string|int`) et l'opérateur **Nullsafe** (`$user?->getAddress()`). Apprendre ces syntaxes vous place instantanément dans le top 5% des développeurs PHP.",
                objectives: ["Sécuriser le code via `strict_types`", "Utiliser les Match expressions au lieu des switch", "Manipuler les propriétés readonly pour l'immutabilité"],
                exercises: [
                    {
                        title: "Promotion de Propriété",
                        description: "Réécrivez une classe User avec constructeur classique en utilisant la syntaxe 'Property Promotion' de PHP 8.",
                        difficulty: "Moyen",
                        solution: "class User {\n  public function __construct(public string $name) {}\n}",
                        hints: ["Il suffit d'ajouter la visibilité (public/private) devant l'argument du constructeur."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Création d'API REST et Middlewares",
                description: "Transformez PHP en moteur de données pour React/Vue. Maîtrisez le JSON, les Headers CORS et les JWT.",
                order: 4,
                duration: "17 heures",
                content: "Aujourd'hui, PHP ne génère pas toujours du HTML, il sert souvent d'API. Nous apprendrons à configurer les en-têtes HTTP pour renvoyer du JSON (`header('Content-Type: application/json')`). Nous aborderons le concept de **Middleware** pour filtrer les requêtes (auth, logs) avant qu'elles n'atteignent le contrôleur. Enfin, nous introduirons les **JWT (JSON Web Tokens)** pour une authentification sans état entre un frontend JS et votre backend PHP.",
                objectives: ["Concevoir une architecture API Headless", "Gérer les requêtes pré-vol (CORS OPTIONS)", "Sécuriser une API via Token Authorization"],
                exercises: [
                    {
                        title: "La Réponse JSON",
                        description: "Écrivez la ligne PHP pour transformer un tableau associatif en chaîne JSON et l'afficher.",
                        difficulty: "Facile",
                        solution: "echo json_encode(['status' => 'ok']);",
                        hints: ["Utilisez json_encode() pour l'encodage."]
                    }
                ],
                resources: []
            }
        ]
    }
];

module.exports = phpCourses;
