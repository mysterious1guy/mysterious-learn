const htmlCourses = [
    {
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
                title: "1. Le Gène Primordial : Structure Logique",
                description: "Comprendre l'anatomie stricte d'un document HTML5 valide.",
                order: 1,
                duration: "3 heures",
                content: "Le HTML (HyperText Markup Language) est un langage de description, non de programmation. Il dicte la hiérarchie sémantique d'un document. La déclaration `<!DOCTYPE html>` force le navigateur en mode standard, évitant le 'quirks mode'. La racine `<html>` encapsule deux entités vitales : `<head>` (le cerveau métaphysique, invisible à l'œil, contenant encodage, titre et métadonnées SEO) et `<body>` (la chair physique, rendue par le moteur de rendu du navigateur). L'encodage `<meta charset=\"UTF-8\">` est crucial pour prévenir la corruption des caractères.",
                objectives: [
                    "Écrire le boilerplate HTML5 de mémoire et sans erreur.",
                    "Distinguer le périmètre de la balise head par rapport au body.",
                    "Comprendre l'implication de l'encodage des caractères."
                ],
                exercises: [
                    {
                        title: "L'Anatomie Minimale",
                        description: "Créez un document HTML5 strict contenant le titre 'Fondations' dans l'onglet et 'Hello World' affiché à l'écran.",
                        difficulty: "Facile",
                        solution: "<!DOCTYPE html>\\n<html lang=\"fr\">\\n<head>\\n  <meta charset=\"UTF-8\">\\n  <title>Fondations</title>\\n</head>\\n<body>\\n  Hello World\\n</body>\\n</html>",
                        hints: ["N'oubliez pas l'attribut lang sur l'élément racine pour l'accessibilité."]
                    }
                ],
                resources: [
                    {
                        title: "Anatomie d'un document HTML (MDN)",
                        type: "article",
                        url: "https://developer.mozilla.org/fr/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure"
                    }
                ]
            },
            {
                title: "2. Hiérarchie et Typographie Sémantique",
                description: "Titres, paragraphes et balises d'emphase logique.",
                order: 2,
                duration: "4 heures",
                content: "Le texte brut n'a aucune valeur sémantique. L'arbre du document doit être balisé : `<h1>` à `<h6>` établissent la hiérarchie de l'information (crucial pour le SEO et les lecteurs d'écran). Règle d'or : un seul `<h1>` par page. Le texte courant vit dans `<p>`. Pour l'emphase, on privilégie le poids sémantique au rendu visuel : `<strong>` indique une forte importance (souvent rendu en gras), `<em>` marque une emphase rhétorique (souvent rendu en italique), remplaçant les anciens `<b>` et `<i>` visuels dépourvus de sens logiciel.",
                objectives: [
                    "Structurer le contenu textuel de manière logicielle.",
                    "Saisir l'impact des balises sur l'accessibilité logicielle.",
                    "Garantir une hiérarchie de titres stricte et linéaire sans saut."
                ],
                exercises: [
                    {
                        title: "Emphase Sémantique",
                        description: "Écrivez un titre principal 'Le Web', suivi d'un paragraphe où le mot 'vital' est marqué comme fortement important.",
                        difficulty: "Facile",
                        solution: "<h1>Le Web</h1>\\n<p>Ceci est <strong>vital</strong> pour la suite.</p>",
                        hints: ["Oubliez la balise b, pensez au poids de l'information."]
                    }
                ],
                resources: []
            },
            {
                title: "3. Navigation et Ressaut : Les Ancres",
                description: "Le concept d'HyperTexte et l'art de lier des documents.",
                order: 3,
                duration: "4 heures",
                content: "L'essence même du World Wide Web réside dans la balise d'ancrage `<a>`. L'attribut `href` (Hypertext Reference) pointe vers une URI. On distingue les URL absolues (pointant vers d'autres domaines) des URL relatives (naviguant dans l'arborescence locale). L'attribut `target=\"_blank\"` permet d'ouvrir le lien dans un nouvel onglet, mais doit être couplé à `rel=\"noopener noreferrer\"` pour des raisons critiques de sécurité contre le reverse tabnabbing.",
                objectives: [
                    "Maîtriser les chemins d'accès relatifs ( ./ , ../ ).",
                    "Construire des liens externes sécurisés.",
                    "Lier vers un point précis de la même page grâce aux ancres nommées (#id)."
                ],
                exercises: [
                    {
                        title: "Lien Sécurisé",
                        description: "Générez un lien vers 'https://exemple.com', indiquant 'Visiter', s'ouvrant dans un nouvel onglet de façon sécurisée.",
                        difficulty: "Moyen",
                        solution: "<a href=\"https://exemple.com\" target=\"_blank\" rel=\"noopener noreferrer\">Visiter</a>",
                        hints: ["Le 'noopener' empêche la nouvelle page de prendre le contrôle de la page originelle via l'API window.opener."]
                    }
                ],
                resources: []
            },
            {
                title: "4. Multimédia et Embedding",
                description: "Intégration rigoureuse d'images et notion d'accessibilité visuelle.",
                order: 4,
                duration: "4 heures",
                content: "L'intégration multimédia utilise des balises orphelines (auto-fermantes) comme `<img>`. L'attribut explicite `src` définit la source, mais l'attribut `alt` (texte alternatif) est non-négociable. Il sert de fallback si la ressource est brisée, de texte pour les crawlers d'indexation (Googlebot), et est oralisé par les screen-readers. Les bonnes pratiques exigent d'allouer explicitement les attributs `width` et `height` pour prévenir les 'Cumulative Layout Shifts' (sauts de mise en page inopinés) lors du chargement réseau.",
                objectives: [
                    "Intégrer des médias graphiques sans pénaliser la performance perceptuelle.",
                    "Rédiger un attribut 'alt' pertinent et descriptif.",
                    "Provoquer l'isolation de contenu avec les balises de type block et inline-block."
                ],
                exercises: [
                    {
                        title: "Image Référencée",
                        description: "Créez une image issue de 'logo.png' de 200px par 100px explicitant le texte 'Logotype'.",
                        difficulty: "Moyen",
                        solution: "<img src=\"logo.png\" alt=\"Logotype\" width=\"200\" height=\"100\">",
                        hints: ["Les attributs dimensionnels s'écrivent sans l'unité px en HTML brut."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        title: "HTML - Niveau Intermédiaire",
        description: "L'ingénierie de la page Web. Sémantique HTML5, structures tabulaires, isolation et formulaires transactionnels natifs.",
        category: "Web",
        level: "Intermédiaire",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        students: 28000,
        language: "french",
        isFree: true,
        tags: ["HTML5", "Sémantique", "Formulaires", "Tableaux", "Intermédiaire"],
        chapters: [
            {
                title: "1. Structuration Sémantique HTML5",
                description: "Éradiquer le 'div-itis' en fragmentant le DOM avec sens.",
                order: 1,
                duration: "5 heures",
                content: "L'évolution HTML5 a introduit des conteneurs qui ont une sémantique lourde pour l'arbre d'accessibilité et les algorithmes de recherche. La balise `<header>` délimite la zone d'en-tête, `<nav>` est strictement réservé à la navigation globale primaire, `<main>` encapsule le contenu unique (un seul par document), `<article>` définit un contenu auto-porteur syndicable (comme un billet de blog), tandis que `<section>` regroupe des éléments thématiques et demande souvent son propre sous-titre de hiérarchie.",
                objectives: [
                    "Cartographier et wireframer une application uniquement en balises sémantiques.",
                    "Saisir la frontière floue entre un <article> et une <section>.",
                    "Assembler une page modulaire logique pour le Document Outline."
                ],
                exercises: [
                    {
                        title: "Main et Navigation",
                        description: "Créez une ossature contenant un Main section, et à l'intérieur, un article portant un header.",
                        difficulty: "Moyen",
                        solution: "<main>\\n  <article>\\n    <header>\\n      <h2>Mon Sujet</h2>\\n    </header>\\n    <p>Contenu principal.</p>\\n  </article>\\n</main>",
                        hints: ["L'article doit pouvoir vivre seul hors de son contexte actuel."]
                    }
                ],
                resources: []
            },
            {
                title: "2. Les Données Tabulaires (Tables)",
                description: "Manipulation matricielle stricte des données à deux dimensions.",
                order: 2,
                duration: "5 heures",
                content: "Historiquement (et abusivement) utilisé pour le design complet des pages (Layout), le tag `<table>` est formellement cantonné à la restitution de données multidimensionnelles, ou data sets bruts. La construction est rigoureuse : un wrapper global contenant les lignes d'en-tête (thead), le corps principal (tbody), et les pieds synthétiques (tfoot). Les lignes sont des `<tr>` (Table Row) et les cellules `<td>` (Table Data) ou `<th>` (Table Heading). Les fusions de cellules s'y opèrent via les attributs 'colspan' et 'rowspan'.",
                objectives: [
                    "Dissocier strictement thead, tbody, et tfoot.",
                    "Mettre en place l'attribut scope sur les th pour lier logiquement l'index à sa valeur text-to-speech.",
                    "Pratiquer le Colspan/Rowspan mathématique sur une grille irrégulière."
                ],
                exercises: [
                    {
                        title: "Tableau Simple Sémantique",
                        description: "Créez une table basique avec thead et tbody, contenant 1 ligne d'en-tête (ID, Nom) et 1 ligne de data (1, Alice).",
                        difficulty: "Difficile",
                        solution: "<table>\\n  <thead>\\n    <tr>\\n      <th>ID</th>\\n      <th>Nom</th>\\n    </tr>\\n  </thead>\\n  <tbody>\\n    <tr>\\n      <td>1</td>\\n      <td>Alice</td>\\n    </tr>\\n  </tbody>\\n</table>",
                        hints: ["Une omission de tr pour wrapper les th ou td causera une cassure critique du DOM."]
                    }
                ],
                resources: []
            },
            {
                title: "3. Formulaires et Inputs (Les I/Os du Web)",
                description: "Gérer la mécanique primitive des entrées utilisateur.",
                order: 3,
                duration: "6 heures",
                content: "Le `<form>` est le pont de communication central avec un serveur backend HTTP. L'attribut 'action' dicte l'URL cible d'ingestion des datas et 'method' la verbologie HTTP (GET ou POST). Les typologies `<input>` natives s'étendent des champs bruts (text, password, hidden) aux champs qualitatifs modifiant les claviers virtuels mobiles (email, number, tel) ou l'UI du navigateur systeme (date, color, file). Tout input actif **doit obligatoirement** se voir assigner l'attribut 'name' afin de figurer dans un Payload HTTP.",
                objectives: [
                    "Différencier conceptuellement le Form Data POST et un QueryParam GET natif.",
                    "Maitriser les différents Input Types (Checkbox, Radio Grouping, Select/Options).",
                    "Coupler sémantiquement chaque input avec une balise <label> utilisant 'for'."
                ],
                exercises: [
                    {
                        title: "Radio Grouping",
                        description: "Créez un groupe de deux boutons radios liés par le meme nom d'attribut 'choix', un pour 'Oui' (valeur 1) un pour 'Non' (valeur 0).",
                        difficulty: "Moyen",
                        solution: "<label>\\n  <input type=\"radio\" name=\"choix\" value=\"1\"> Oui\\n</label>\\n<label>\\n  <input type=\"radio\" name=\"choix\" value=\"0\"> Non\\n</label>",
                        hints: ["S'ils n'ont pas la sticte même valeur d'attribut name, ils ne seront pas mutuellement exclusifs sur interface."]
                    }
                ],
                resources: []
            },
            {
                title: "4. Isolation avec IFrame",
                description: "Le concept d'encapsulation de documents tiers.",
                order: 4,
                duration: "4 heures",
                content: "L'élément `<iframe>` permet l'inclusion d'un document HTML (ou d'une source Media tiers type Youtube/Maps) dans le document parent. Ceci est fondamental dans la sécurité Cross-Origin. Les iframes modernes requièrent l'application d'un attribut 'sandbox' pour définir une politique d'isolation stricte (empêchant la ressource enfant d'invoquer des POPUPS javascript parent ou d'interagir nativement sur le TopWindowContext).",
                objectives: [
                    "Analyser le danger lié à l'intégration tierce aveugle.",
                    "Manipuler l'attribut sandbox et analyser allow-same-origin, allow-scripts, allow-popups.",
                    "Comprendre le blocage X-Frame-Options côté backend émis par le serveur externe injecté."
                ],
                exercises: [
                    {
                        title: "L'Iframe Isolé",
                        description: "Générez un Iframe vers src 'widget.html' en le bloquant totalement par un sandbox ultra restreint.",
                        difficulty: "Moyen",
                        solution: "<iframe src=\"widget.html\" sandbox title=\"Widget Tierce\"></iframe>",
                        hints: ["Sandbox sans paramètre d'exceptions coupe tous les scripts, l'envoi de forms et confine localement."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        title: "HTML - Niveau Expert (Avancé)",
        description: "L'ingénierie Frontend Absolue. Optimisation SEO, A11Y ARIA Poussée, Validation complexe et APIs HTML5 natives.",
        category: "Web",
        level: "Avancé",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        students: 19500,
        language: "french",
        isFree: true,
        tags: ["Accessibilité", "ARIA", "Canvas", "API HTML5", "SEO Avancé"],
        chapters: [
            {
                title: "1. Le Métamodèle : HEAD et SEO Industriel",
                description: "Forger la machine de guerre pour les robots d'indexation (Crawlers).",
                order: 1,
                duration: "5 heures",
                content: "La balise head n'est pas limitée aux simples balises titre. Son arsenal englobe la métadonnée canonique (qui prévient la pénalité de contenu dupliqué (Duplicate Content Penalty) : `<link rel=\"canonical\">`), la définition de l'OpenGraph (og:title, og:image) pour piloter dynamiquement le comportement graphique du site posté sur Twitter, Facebook ou Linkedin, le paramétrage lourd du viewport et les Pre-loads agressifs (`<link rel=\"preload\">`) qui indiquent au navigateur de télécharger urgemment une police ou un script bloquant de rendu avant sa découverte naturelle.",
                objectives: [
                    "Assumer la direction de la politique d'indexation avec 'robots' meta tags.",
                    "Ecrire la grappe exhaustive OpenGraph protocol (OG).",
                    "Orchestrer le ressource-hinting manuel (dns-prefetch, preconnect)."
                ],
                exercises: [
                    {
                        title: "Meta Viewport et Canonique",
                        description: "Declarez un document avec l'url canonique 'https://site.com' et une meta viewport standard pour rendre le site mobile-responsive.",
                        difficulty: "Difficile",
                        solution: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\\n<link rel=\"canonical\" href=\"https://site.com\">",
                        hints: ["Width=device-width est la clé de voûte de l'intelligence artificielle du scaling et média-queries."]
                    }
                ],
                resources: []
            },
            {
                title: "2. Validation Native Complexe (Regex HTML5)",
                description: "Le bouclier Frontend sans JavaScript via pattern attr.",
                order: 2,
                duration: "6 heures",
                content: "HTML5 inclut nativement une machine de validation de données lourdes sans l'intervention d'aucun EventListener Javascript. En couplant l'attribut 'pattern' avec une expression régulière syntaxique sur un input de type texte, nous forçons le contrôle côté client local. Associé avec 'minlength', 'maxlength' et les contraintes step/min/max sur les Input Numeriques, ainsi qu'a la pseudo-classe CSS :invalid, on génère une UI robuste avec des messages API pseudo-customs gérés par le navigateur natif OS.",
                objectives: [
                    "Manipuler une validation RegEx dans un attribut patten='\\[a-z]{3}\'.",
                    "Coupler un Input text invalidé avec un message d'altération en bulle UI",
                    "Maîtriser logiciellement les inputs inactifs (disabled vs readonly) pour validation finale server-side."
                ],
                exercises: [
                    {
                        title: "Le TextField sous Regex Strict",
                        description: "Créez un Input de type texte ne permettant d'entrer STRICTEMENT QUE 3 chiffres, en le rendant requis.",
                        difficulty: "Difficile",
                        solution: "<input type=\"text\" pattern=\"[0-9]{3}\" required>",
                        hints: ["Pensez à utiliser le pattern d'expression rationelle native et le flag required natif."]
                    }
                ],
                resources: []
            },
            {
                title: "3. Accessibilité Avancée : ARIA Roles & États",
                description: "Régir l'arbre d'Accessibilité via WAI-ARIA.",
                order: 3,
                duration: "8 heures",
                content: "Si le HTML sémantique fait défaut (ex: un <div> artificiellement grimé comme un bouton avec JS), spécification WAI-ARIA comble le trou cognitif pour les screen-readers. Les rôles (ex: `role=\"button\"`, `role=\"alert\"`) et les états polymorphes (`aria-expanded=\"true\"`, `aria-hidden=\"true\"`) informent dynamiquement un logiciel vocal des métamorphoses d'une IHM moderne. `aria-live=\"polite\"` indique au lecteur écraniel qu'un fragment a varié en arrière-plan et doit être articulé à la fin de la phrase en cours.",
                objectives: [
                    "Comprendre le fonctionnement d'un logiciel de synthèse vocale ScreenReader/TalkBack",
                    "Redéfinir le bouton Div artificiel avec role et le Focus State TabIndex attr.",
                    "Saisir la subtilité absolue entre role=\"alert\" et aria-live=\"polite\"."
                ],
                exercises: [
                    {
                        title: "L'Alerte Live",
                        description: "Créez une Div qui annoncera urgemment son text (Error 500) à un screen reader sans attendre la fin d'une phrase (assertive), avec le role alert.",
                        difficulty: "Difficile",
                        solution: "<div role=\"alert\" aria-live=\"assertive\">Error 500</div>",
                        hints: ["Assertive force le screenreader à couper toute activité pour hurler votre erreur critique logicielle."]
                    }
                ],
                resources: []
            },
            {
                title: "4. Les APIs HTML5 Brutes (Data, Dialog, Canvas)",
                description: "S'interfacer avec l'écosystème interactif JavaScript.",
                order: 4,
                duration: "6 heures",
                content: "Le balisage se complexifie en apportant de la meta-logic en isolation. L'utilisation du `dataset` (les attributs standards commençants par `data-*` tels que `data-user-id=\"42\"`) permet d'encrypter l'état dans l'Architecture DOM statique sans enfreindre la validation W3C. Pour du rendering 2D/3D GPU accéléré brut en JS direct, `<canvas>` détient la clé. Finalement, la balise de pointe `<dialog>` standardise les modalités natives modales (overlay), éliminant de gigantesques librairies JS pour une solution Browser Backend en un claquement de doigt, invocable nativement via Element.showModal()",
                objectives: [
                    "Manipuler des attributs de donnée isolants W3C-Stricts 'data-*'.",
                    "Instancier un élément Canvas standard paramétré en dimension absolue vs relative.",
                    "Construire la balise <dialog> pour invoquer des Overlays et gérant l'emprisonnement de contexte (Focus Trap) naturel."
                ],
                exercises: [
                    {
                        title: "Data Attribut et Modal",
                        description: "Créez une balise dialog, avec une div possédant l'attribut data-id=\"99\" à l'intérieur.",
                        difficulty: "Difficile",
                        solution: "<dialog>\\n  <div data-id=\"99\">Donnée interne</div>\\n</dialog>",
                        hints: ["L'attribut prend le nom prefixe conventionel de 'data-'"]
                    }
                ],
                resources: []
            }
        ]
    }
];

module.exports = htmlCourses;
