const htmlCourses = [
    {
        title: "HTML - Niveau Débutant",
        description: "Apprenez le socle du web. Maîtrisez la structure sémantique, les balises de base et commencez à créer vos propres pages.",
        category: "Web",
        level: "Débutant",
        duration: "10 heures",
        image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80",
        rating: 4.8,
        students: 35000,
        language: "french",
        isFree: true,
        tags: ["HTML", "web", "débutant", "balises", "frontend"],
        chapters: [
            {
                title: "Introduction : Squelette d'une page",
                description: "Définition et rôles des métadonnées ainsi que le Doctype.",
                order: 1,
                duration: "2 heures",
                content: "Le HTML (HyperText Markup Language) n'est pas un langage de programmation, mais de description ou de balisage. C'est l'ossature d'une page. Toute page nécessite la structure `<DOCTYPE html>` suivie des racines `<html>`, de l'en-tête `<head>` (contenant l'encodage charset utf-8, le titre de l'onglet) et du corps `<body>` où ira le contenu visible pour le client navigateur.",
                objectives: ["Comprendre le rôle du HTML dans l'architecture Web", "Savoir mettre en page le Boilerplate (squelette structuro)", "Créer l'encodage fondamental (meta utf-8)"],
                exercises: [
                    {
                        title: "Le premier squelette",
                        description: "Créez une page avec un titre 'Mon Site' dans l'onglet, et le texte 'Bonjour' dans le document final visible.",
                        difficulty: "Facile",
                        solution: "<!DOCTYPE html>\\n<html>\\n<head>\\n  <meta charset=\\\"UTF-8\\\">\\n  <title>Mon Site</title>\\n</head>\\n<body>\\n  Bonjour\\n</body>\\n</html>",
                        hints: ["Tout élément apparent navigateur réside dans le corps (body)."]
                    }
                ],
                resources: [
                    {
                        title: "C'est quoi le HTML ?",
                        type: "video",
                        url: "https://www.youtube.com/embed/bWPMSSsVdPk"
                    }
                ]
            },
            {
                title: "Balises de Texte (Titres, Paragraphes)",
                description: "Comment formater du contenu écrit brut.",
                order: 2,
                duration: "3 heures",
                content: "Nous utilisons des niveaux hiérarchiques allant de `<h1>` (titre principal) jusqu'à `<h6>` (titre très secondaire). La majorité du contenu texte s'inscrit au sein de paragraphes `<p>`. Des balises en ligne (inlines) permettront les mots mis en emphase : `<strong>` pour souligner l'importance ou le poids sémantiques (met souvent en gras natif) ou `<em>` pour accentuation (italiques normés).",
                objectives: ["Mettre en valeur le SEO avec la bonne gradation des <h>", "Utiliser les balises descriptives brutes pour les paragraphes.", "Différencier bloc et inline basique"],
                exercises: [
                    {
                        title: "Titres hiérarchiques",
                        description: "Ajoutez un titre principal contenant 'Titre principal' suivi d'un sous-titre h2 'Section A'.",
                        difficulty: "Facile",
                        solution: "<h1>Titre principal</h1>\\n<h2>Section A</h2>",
                        hints: ["Jamais plusieurs h1 logiques en contexte simple."]
                    }
                ],
                resources: [
                    {
                        title: "Comprendre et structurer textuellement son site.",
                        type: "video",
                        url: "https://www.youtube.com/embed/BsDoLVMnmZs"
                    }
                ]
            },
            {
                title: "Liens et Images",
                description: "Rendez votre site interactif et multimédia.",
                order: 3,
                duration: "3 heures",
                content: "Le composant le plus capital du WEB d'hypertexte est le LIEN (Ancre). `<a href=\"URL\">Texte</a>`. Pour ajouter le support iconographique, son balise apparentée par nature est sans corps de fermeture. `<img>` utilise nativement un SRC (source url ressource) avec systématiquement un texte alternatif (l'attribut `alt`) si l'image crash à une requete loupée pour des rasions évidentes d'accessibilité UX.",
                objectives: ["Relier son site à un autre document via du HREF relative et absolue", "Embed une image sur son architecture textuelle via <img /> avec respect du W3C", "Gérer l'attribut ALT pour l'optimisation ou lecteurs aveugles"],
                exercises: [
                    {
                        title: "Image incliquée (lien)",
                        description: "Crée un lien vers 'https://google.com'.",
                        difficulty: "Facile",
                        solution: "<a href=\"https://google.com\">Aller sur Google</a>",
                        hints: ["Utiliser l'attribut formel href (hyper reference) dans et autour du maillage externe."]
                    }
                ],
                resources: [
                    {
                        title: "Images et Multimedia",
                        type: "video",
                        url: "https://www.youtube.com/embed/kMuMcGWWE"
                    }
                ]
            }
        ]
    },
    {
        title: "HTML - Niveau Intermédiaire",
        description: "Structurer des documents complexes. Les bases avancées du langage HTML : Tableaux, listes et sémantique HTML5 formelle.",
        category: "Web",
        level: "Intermédiaire",
        duration: "12 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.8,
        students: 22000,
        language: "french",
        isFree: true,
        tags: ["HTML5", "sémantique", "tableaux", "listes", "intermédiaire"],
        chapters: [
            {
                title: "Sémantique de Zone HTML5",
                description: "Découpez correctement avec section, article, header, footer...",
                order: 1,
                duration: "4 heures",
                content: "Avant HTML5, on utilisait massivement `<div id=\"header\">`. Désormais, la nouvelle norme sémantique privilégie des balises propres qui explicitent aux moteurs de recherche des zones fondamentales : `<header>`, `<nav>` pour la navigation, `<main>` (un seul par page pour le contenu focus), `<section>`, `<article>`, et l'inévitable `<footer>`.",
                objectives: ["Mettre en valeur son code avec sémantique propre", "Nettoyer ou refactorer la structure d'accumulation Div-itis.", "Construire la zone navigation"],
                exercises: [
                    {
                        title: "Main Header",
                        description: "Creer une zone globale principale (main) dans lequel on aura une balise unique d'entete de haut de section interne.",
                        difficulty: "Moyen",
                        solution: "<main>\\n  <header>\\n    <h1>Exclusivité article</h1>\\n  </header>\\n</main>",
                        hints: ["Un header est un groupe d'introductif. Un main définit la centralité en document index."]
                    }
                ],
                resources: [
                    {
                        title: "Pourquoi le HTML Sémantique",
                        type: "video",
                        url: "https://www.youtube.com/embed/kMuMcGWWE"
                    }
                ]
            },
            {
                title: "Listes Unordered vs Ordered",
                description: "Agencement textuel normé et enumération.",
                order: 2,
                duration: "2 heures",
                content: "Des items s'affichent sous l'indentation structurelle avec balise Liste: `<ol>` (ordered list pour une base chiffrée 1 2 3) et `<ul>` (unordered list gérée par un point et puce bullet). À l'intérieur, CHAQUE puce requière indéniablement le tag enfant liste article `<li>`. Ce maillage est quasi standardisé sur base internet d'encodage menu navbar.",
                objectives: ["Initier la méthode ul/li", "Comprendre des emboîtements listiques", "Faire la distinction de l'ordinal et bullet-list."],
                exercises: [
                    {
                        title: "Menu Simple",
                        description: "Créez une liste à pouce bullet avec 2 elements : Accueil et Contact.",
                        difficulty: "Facile",
                        solution: "<ul>\\n  <li>Accueil</li>\\n  <li>Contact</li>\\n</ul>",
                        hints: ["UL est le wrapper, LI son iteratif enfant."]
                    }
                ],
                resources: [
                    {
                        title: "Mettre les balises liste à contribution.",
                        type: "video",
                        url: "https://www.youtube.com/embed/p1X1wN5"
                    }
                ]
            }
        ]
    },
    {
        title: "HTML - Niveau Expert (Avancé)",
        description: "Les formulaires avancés, attributs ARIA (accessibilité) et Canvas interactif de meta-manipulation.",
        category: "Web",
        level: "Avancé",
        duration: "18 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        students: 15400,
        language: "french",
        isFree: true,
        tags: ["HTML", "formulaires", "ARIA", "accessibilité", "avancé"],
        chapters: [
            {
                title: "Les Formulaires et API de Validation Ntive",
                description: "Input, Types specifiques et envoi via Form",
                order: 1,
                duration: "8 heures",
                content: "On recupère l'information en front Web depuis `<form>`. En y rajoutant un `action` (l'url d'appel pointant vers un fichier PHP backend typique) et une méthode GET/POST. Les champs sont gérés fondamentalement par balises d'entré (`<input />`) typées (type email, date, range ou native color picker). Le bouton global est `<button type=\"submit\">`. Chaque Input DOIT etre lié avec la composante Label pour son descriptif clair par un système id/for.",
                objectives: ["Maitriser Label et For en UI standardisée.", "Validation côté front par attribut 'required'", "Manipulation des forms submission formelle."],
                exercises: [
                    {
                        title: "Formulaire complet (Name and Password)",
                        description: "Créez form pointant url POST locale avec email, mot de passe requis et button envoyé.",
                        difficulty: "Moyen",
                        solution: "<form method=\"POST\" action=\"/login\">\\n  <label for=\"mail\">E-mail:</label>\\n  <input type=\"email\" id=\"mail\" required>\\n  <label for=\"mdp\">Mot de passe:</label>\\n  <input type=\"password\" id=\"mdp\" required>\\n  <button type=\"submit\">Valider</button>\\n</form>",
                        hints: ["Assurez vous d'implémenter un Input unique par label."]
                    }
                ],
                resources: [
                    {
                        title: "Structure maitrisé d'Input Html DOM",
                        type: "video",
                        url: "https://www.youtube.com/embed/fNcJuPIZ"
                    }
                ]
            }
        ]
    }
];

module.exports = htmlCourses;
