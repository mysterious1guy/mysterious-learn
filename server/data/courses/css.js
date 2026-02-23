const cssCourses = [
    {
        title: "CSS - Niveau Débutant",
        description: "Peignez et sculptez le Web. Comprenez la cascade, l'héritage, et le modèle de boîte fondamental pour donner vie à vos structures HTML.",
        category: "Frontend",
        level: "Débutant",
        duration: "18 heures",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
        rating: 4.8,
        students: 35000,
        language: "french",
        isFree: true,
        tags: ["CSS", "Design", "Débutant", "Box Model", "Typographie"],
        chapters: [
            {
                title: "1. La Cascade et le Ciblage (Sélecteurs)",
                description: "Le principe fondamental de CSS : cibler pour styliser, avec précision mathématique.",
                order: 1,
                duration: "4 heures",
                content: "CSS (Cascading Style Sheets) fonctionne sur deux dogmes : l'Héritage (un enfant hérite des styles typographiques de son parent) et la Cascade (règles de résolution des conflits). Pour styliser, le moteur de rendu a besoin d'une cible. Les sélecteurs primitifs sont : l'Élément (ex: `p`), la Classe (`.carte-profil`, réutilisable à l'infini) et l'Identifiant (`#menu-principal`, unique dans le DOM). La best practice moderne interdit presqu'entièrement le stylage par ID (trop lourd en spécificité). On liera le fichier via `<link rel=\"stylesheet\" href=\"style.css\">`.",
                objectives: [
                    "Lier une feuille de style externe au HTML.",
                    "Maîtriser le triptyque : Sélecteur d'élément, Classe et Identifiant.",
                    "Saisir pourquoi la classe est l'unité de mesure préférentielle de facto."
                ],
                exercises: [
                    {
                        title: "Priorité de Classe",
                        description: "Ciblez une classe '.texte-urgent' et donnez au texte la couleur rouge 'red' et un fond 'black'.",
                        difficulty: "Facile",
                        solution: ".texte-urgent {\\n  color: red;\\n  background-color: black;\\n}",
                        hints: ["N'appliquez jamais de majuscules aux noms de vos classes, préférez le kebab-case (mots-séparés-par-tirets)."]
                    }
                ],
                resources: [
                    {
                        title: "La Spécificité CSS (MDN)",
                        type: "link",
                        url: "https://developer.mozilla.org/fr/docs/Web/CSS/Specificity"
                    }
                ]
            },
            {
                title: "2. Typographie et Philosophie des Couleurs",
                description: "Hiérarchie visuelle, espaces et gestion du spectre colorimétrique.",
                order: 2,
                duration: "4 heures",
                content: "La lecture est l'action #1 sur le Web. Les propriétés typographiques fondamentales incluent `font-family` (la pile de polices avec fallbacks natifs), `font-size` (la taille, idéalement en `rem` pour l'accessibilité), `font-weight` (la graisse, de 100 à 900) et `line-height` (l'interlignage pour faire respirer le texte). Les couleurs se définissent traditionnellement en codes Hexadécimaux (ex: `#1a1a1a`), mais le web moderne favorise grandement `rgb/rgba` et surtout `hsl` (Teinte, Saturation, Luminosité) pour créer des palettes mathématiquement cohérentes.",
                objectives: [
                    "Varier la graisse d'un texte et nettoyer le style de base.",
                    "Configurer les couleurs via la fonction hsl() avec alpha (transparence).",
                    "Aérer un paragraphe pour le rendre lisible."
                ],
                exercises: [
                    {
                        title: "Titre Aérien et Opaque",
                        description: "Ciblez tous les <h1>. Centrer le texte, mettre la taille à 40px et forcer une opacité couleur (color) fondé sur rgb() rouge (255, 0, 0).",
                        difficulty: "Moyen",
                        solution: "h1 {\\n  text-align: center;\\n  font-size: 40px;\\n  color: rgb(255, 0, 0);\\n}",
                        hints: ["Le rgb prend trois arguments de 0 à 255."]
                    }
                ],
                resources: []
            },
            {
                title: "3. Le Modèle de Boîte (Box Model)",
                description: "Padding, Border, Margin : le dogme dimensionnel du Web.",
                order: 3,
                duration: "6 heures",
                content: "Tout élément rendu en HTML est un rectangle. Le CSS gère les distances de ce rectangle via un oignon mathématique à 3 couches partant du texte vers l'extérieur : Le `padding` (le rembourrage ou espace intérieur), la `border` (la bordure potentiellement visible et tracée), et finalement la `margin` (la marge repoussante extérieure qui n'a ni couleur ni fond, son seul but est l'espacement). Par défaut, Width = Contenu + Padding + Border. Pour éviter les maux de tête de calcul, le web entier applique le reset universel `* { box-sizing: border-box; }` qui force la largeur donnée à englober la bordure et le padding.",
                objectives: [
                    "Disséquer le layout navigateur pour y comprendre le Box Model.",
                    "Créer un bouton harmonieux avec des Paddings plus importants sur l'axe horizontal.",
                    "Appliquer universellement le Reset border-box."
                ],
                exercises: [
                    {
                        title: "Construction de Boîte",
                        description: "Ciblez l'id '#carte'. Mettez un padding global de 20px, une bordure solide de 2px noire (black), et une marge basse de 15px.",
                        difficulty: "Moyen",
                        solution: "#carte {\\n  padding: 20px;\\n  border: 2px solid black;\\n  margin-bottom: 15px;\\n}",
                        hints: ["La bordure demande 3 valeurs: épaisseur, type de ligne, couleur."]
                    }
                ],
                resources: []
            },
            {
                title: "4. Le Flux Normal : Inline vs Block",
                description: "Comprendre pourquoi certains éléments sautent des lignes et d'autres non.",
                order: 4,
                duration: "4 heures",
                content: "Dans le flux normal de rendu de la page, tout élément possède une valeur `display` native. Les éléments `block` (comme `<div>`, `<h1>`, `<p>`) s'empilent verticalement, prennent 100% de la largeur du parent par défaut et forcent un saut de ligne. Les éléments `inline` (comme `<span>`, `<a>`, `<strong>`) cohabitent sur la même ligne, enveloppent leur contenu stricto-sensu, et ignorent purement et simplement les marges hautes et basses (`margin-top`/`margin-bottom`) ou largeurs manuelles associées qu'on essaierait de leur imposer ! D'où l'existence hybride magique de `inline-block` pour les boutons.",
                objectives: [
                    "Savoir pourquoi un width imposé sur un lien <a> ne fonctionne pas nativement.",
                    "Métamorphoser un élément 'Inline' en 'Block' pour lui imposer des dimensions.",
                    "Transformer un <div> pour côtoyer un voisin sur sa droite horizontale."
                ],
                exercises: [
                    {
                        title: "Le Span Rebelle",
                        description: "Ciblez un élément <span> générique. Forcez-le à agir comme un block et donnez-lui une largeur de 200px exactement.",
                        difficulty: "Facile",
                        solution: "span {\\n  display: block;\\n  width: 200px;\\n}",
                        hints: ["Sans le display block, la déclaration de width sera jetée à la poubelle par le moteur."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        title: "CSS - Niveau Intermédiaire",
        description: "Orchestrez l'architecture et la structuration géométrique. Maîtrisez Flexbox, les positionnements hors-flux et l'architecture CSS OOCSS/BEM.",
        category: "Frontend",
        level: "Intermédiaire",
        duration: "24 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        students: 22000,
        language: "french",
        isFree: true,
        tags: ["Flexbox", "Architecture", "BEM", "Positionnement", "Layouts"],
        chapters: [
            {
                title: "1. Le Saint Graal Unidimensionnel : Flexbox",
                description: "Le layout modulable, l'alignement divin et la répartition des espaces.",
                order: 1,
                duration: "8 heures",
                content: "Le Flexible Box Module (Flexbox) a pulvérisé les Hacks mortuaires historiques (Float, Table-layout). Déclaré sur un container parent `display: flex;`, il transforme sur-le-champ l'axe du repère. Ses enfants (les flex-items) se placent en file indienne (`flex-direction: row` ou `column`). L'entité fondamentale pilote la distribution des espaces vierges horizontaux sur l'axe principal via `justify-content` (ex: `center`, `space-between`) et aligne verticalement avec `align-items` (axe transversal).",
                objectives: [
                    "Centrer indubitablement n'importe quel élément logiquement et verticalement avec 3 lignes de code.",
                    "Renverser l'axe de progression (column-reverse).",
                    "Ajuster la croissance flex (flex-grow) d'un enfant unique pour remplir l'espace rémanent."
                ],
                exercises: [
                    {
                        title: "Le Parfait Centrage",
                        description: "Ciblez une classe '.hero-section', assignez-lui flex, et centrez absolument tout son contenu verticalement et horizontalement.",
                        difficulty: "Difficile",
                        solution: ".hero-section {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}",
                        hints: ["Assurez-vous de manipuler l'alignement sur les DEUX axes (principal et croisé)."]
                    }
                ],
                resources: []
            },
            {
                title: "2. Spacialisation Hors-Flux : Positionnement Manuel",
                description: "Briser la physique de la page en décrochant des éléments du sol avec Relative, Absolute et Fixed.",
                order: 2,
                duration: "6 heures",
                content: "Lorsqu'on assigne à un élément une `position: relative`, sa case mémoire dans l'arbre ne bouge pas, mais on peut le décaler visuellement avec `top`, `bottom`, `left`, `right`. En l'assignant en `position: absolute`, le bloc déchire ses chaînes physiques : tout le layout se reforme comme s'il n'avait jamais existé. Il se colle alors aux bords géométriques de son prmier parent dit 'positionné' (souvent rendu Relative à cet effet). La `position: fixed` fait la même magie mais par rapport à un parent invariant immuable : l'Écran Vieport de verre du navigateur, parfait pour une Navbar statique au scroll.",
                objectives: [
                    "Créer une info-bulle flottante au-dessus d'une carte d'utilisateur sans détruire le CSS avoisinant.",
                    "Maîtriser le triptyque : le Parent est 'Relative', l'Enfant 'Absolute'.",
                    "Orchestrer l'indexation de profondeur avec le redoutable 'z-index'."
                ],
                exercises: [
                    {
                        title: "Pastille Notification",
                        description: "Ciblez la classe '.pastille'. Détachez-la du flux normal (absolute) pour la pincer mathématiquement à 0px du nord (top) et 0px de l'est (right).",
                        difficulty: "Moyen",
                        solution: ".pastille {\\n  position: absolute;\\n  top: 0;\\n  right: 0;\\n}",
                        hints: ["En position Absolute, le display inline/block naturel devient obsolète."]
                    }
                ],
                resources: []
            },
            {
                title: "3. Sticky et Fondamentaux d'Architecture (BEM)",
                description: "L'hybride collant et comment ne pas pondre une soupe CSS spaghetti de mille lignes inmaintenable.",
                order: 3,
                duration: "6 heures",
                content: "La `position: sticky` est une évolution de l'ingénierie CSS moderne. Relative lors du comportement naturel, elle se pétrifie en Fixed instantanément si le défilement navigateur tend à l'expulser de la vue (tel un header de tableur). Cependant, le défi du design CSS n'est pas ce que réalise une technologie, mais comment elle sera perçu par 5 autres codeurs ! L'intégration de la méthodologie BEM (Block, Element, Modifier) norme notre écriture. Une carte est `.card`, son image interne dépendante `.card__image`, et sa version danger rouge mutée devient `.card--danger`.",
                objectives: [
                    "Manipuler Sticky pour construire un layout de lecture fluide (Table Of Contents).",
                    "Implémenter une nomenclature de naming des classes BEM rigoureuse.",
                    "Interdire psychologiquement l'utilisation de sélecteurs imbriqués brutaux ('nav ul li a:hover') pour l'OOCSS flat (orienté objet CSS)."
                ],
                exercises: [
                    {
                        title: "Syntaxe BEM Stricte",
                        description: "Écrivez une classe pour manipuler la couleur bleu d'un élément Modifier (qui caractérise le succès) de la composante 'bouton'.",
                        difficulty: "Facile",
                        solution: ".bouton--succes {\\n  background-color: blue;\\n}",
                        hints: ["Un Modifier s'écrit toujours avec le parent suivi d'un double tiret '--' selon le dogme BEM."]
                    }
                ],
                resources: []
            },
            {
                title: "4. Esthétique Graphique : Ombres, Dégradés et Filtres",
                description: "Atteindre la claque visuelle du Glassmorphism en CSS pur natif.",
                order: 4,
                duration: "4 heures",
                content: "CSS donne un panel graphique digne de Photoshop. La propriété complexe `box-shadow: X Y Blur Spread Couleur` ajoute de la consistance aux cartes. Les typologies de fond ne se limitent plus à la simple teinte flat : la fonction native algorithmique `linear-gradient` dessine par interpolation. Les filtres CSS récents via `backdrop-filter: blur(10px)` permettent de flouter ce qui se trouve physiquement *derrière* une div semi-transparente, instaurant la tendance architecturale du Glassmorphism (l'illusion de verre poli) et l'effet OS d'Apple.",
                objectives: [
                    "Sculpter et affiner un Box-Shadow très léger et allongé (Modern Soft Shadow).",
                    "Générer un Linear-gradient vectoriel diagonale à 45 degrés.",
                    "Saisir l'interaction lourde en performance GPU de l'attribut backdrop-filter."
                ],
                exercises: [
                    {
                        title: "L'Ombre Soft",
                        description: "Appliquez à '.box' une ombre portée (box-shadow) axée Y vers le bas de 10px, sans décalage X (0), avec 15px de flou blur et colorée 'rgba(0,0,0,0.1)'.",
                        difficulty: "Moyen",
                        solution: ".box {\\n  box-shadow: 0 10px 15px rgba(0,0,0,0.1);\\n}",
                        hints: ["Les arguments sont dans l'ordre strict: ox, oy, blur, couleur."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        title: "CSS - Niveau Expert (Avancé)",
        description: "Devenez un Ingénieur de Rendu CSS. Maîtrisez la grille mathématique CSS Grid, l'interactivité dynamique via Keyframes 3D, Custom Properties pour les thèmes OS, et les requêtes réactives modernes.",
        category: "Frontend",
        level: "Avancé",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 5.0,
        students: 15400,
        language: "french",
        isFree: true,
        tags: ["CSS Grid", "Animations Keyframes", "Variables Natives", "Media Queries", "Container Queries"],
        chapters: [
            {
                title: "1. La Singularité Bidimensionnelle : CSS Grid Layout",
                description: "Le summum de la distribution spatiale pour les tableaux de bord matriciels complexes.",
                order: 1,
                duration: "8 heures",
                content: "Si Flexbox est unidimensionnel, Grid est omnipotent. Avec `display: grid;`, vous déclarez un échiquier conceptuel. La commande `grid-template-columns: repeat(3, 1fr)` crée sur ordre trois pistes de 33% chacune. Mais la révolution absolue de puissance s'observe via l'asymétrie avec `grid-template-areas` pour faire du Layout visuel à base de chaîne de caractères ASCII : `'header header' 'sidebar main' 'footer footer'`. Ce paradigme rend les Wireframes de designers vivants sans aucun div inutile d'encapsulation (wrapping markup).",
                objectives: [
                    "Comprendre l'unité Fr (Fractional Space) régissant la philosophie Grid.",
                    "Positionner un composant précis au millimètre (grid-column: 1 / 3).",
                    "Construire la maquette classique Holy Grail avec 'grid-template-areas'."
                ],
                exercises: [
                    {
                        title: "La Grille Auto-Adaptative 12 Colonnes",
                        description: "Créez une classe '.grille'. Forcez-la en display grid et exigez l'apparition de 12 colonnes, chacune de 1 fraction d'espace.",
                        difficulty: "Difficile",
                        solution: ".grille {\\n  display: grid;\\n  grid-template-columns: repeat(12, 1fr);\\n}",
                        hints: ["La fonction repeat() économise de la dette visuelle dans votre CSS."]
                    }
                ],
                resources: []
            },
            {
                title: "2. Mouvement Cinétique : Transitions & Animations (@keyframes)",
                description: "Lisser l'Axe Temporel UX et animer les vecteurs sans javascript lourd.",
                order: 2,
                duration: "8 heures",
                content: "Les micro-interactions fidélisent fortement. L'attribut combiné universel `transition: all 0.3s ease-in-out;` fluidifie les altérations arbitraires lors de pseudo-classes `:hover` ou `:focus`. Pour les séquences chorégraphiques autonomes, nous utilisons la syntaxe `@keyframes name_anim { 0% { ... } 100% { ... } }`. Le processeur graphique CSS implémente `transform: translate()` et `scale()`. Attention : Seules les propriétés d'Opacité et de Transformation doivent être animées, car toute modification temporelle de Margin ou Contenu recompose toute la grille vectorielle de la page à 60 Fps, entraînant de majeurs Drop-Frames UX (Jank effect).",
                objectives: [
                    "Créer une Timeline temporelle purement CSS avec @keyframes.",
                    "Invoquer la courbe de Bézier paramétrique (Cubic-Bezier) de l'animation.",
                    "Savoir pourquoi animer Width est mortel pour les performances CPU client vs Scale GPU."
                ],
                exercises: [
                    {
                        title: "La Pulsation du Cœur",
                        description: "Créez une règle keyframes nommée 'pulse' qui, à son apogée absolue de 50%, provoque un scale() d'un coefficient 1.2 sur les éléments.",
                        difficulty: "Difficile",
                        solution: "@keyframes pulse {\\n  50% {\\n    transform: scale(1.2);\\n  }\\n}",
                        hints: ["N'oubliez pas l'identificateur (nom) strict de votre groupe à côté de @keyframes."]
                    }
                ],
                resources: []
            },
            {
                title: "3. Architecture Thématique & Custom Properties (Variables CSS)",
                description: "Centralisation des sources de vérité et mise en œuvre du Dark Mode par mutation native.",
                order: 3,
                duration: "6 heures",
                content: "SASS/SCSS ont créé l'industrie de la variable précompilée statique. Mais les Custom Properties HTML5 (`--ma-variable: 10px;`) vivent en Direct-Memory au rendu Client Navigateur (Runtime). Elles s'encapsulent typiquement dans le scope root de priorité maximale `:root`. Leur immense puissance apparait face à JavaScript car on peut muter de l'UI entière (`document.documentElement.style.setProperty('--fond', 'black')`) sur toute une application React/Vue. Découpez une charte : Primitives (Bleu-500) encapsulées dans la Semanticité (Bouton-Action-Couleur).",
                objectives: [
                    "Manipuler une cascade avec double-dash et la fonction de fallback d'affectation var(--x, red).",
                    "Redéfinir le scope temporel de la variable au niveau du Media Query d'ombre.",
                    "Différencier la primitive du token de sémantique design système."
                ],
                exercises: [
                    {
                        title: "Bouton Thématique Primaire",
                        description: "Dans la classe statique :root, définissez la variable --primary à '#007bff'. Puis utiliser var() pour mettre la background-color de '.btn' à la primitive primary.",
                        difficulty: "Moyen",
                        solution: ":root {\\n  --primary: #007bff;\\n}\\n.btn {\\n  background-color: var(--primary);\\n}",
                        hints: ["En cascade, la fonction est rigoureusement var(nom)."]
                    }
                ],
                resources: []
            },
            {
                title: "4. Élasticité Moderne (Media Queries vs Container Queries)",
                description: "L'intelligence redoutable contextuelle. Comment s'adapter aux Viewports d'appareils et, l'ultime norme : s'adapter à l'espace Parent immédiat.",
                order: 4,
                duration: "8 heures",
                content: "La règle historique `@media screen and (max-width: 768px)` modifie de façon globale toutes les classes du fichier à l'aune restrictive de la dimension du Screen Window du téléphone. Le paradigme actuel est cependant le *Mobile First* : nous concevons le rendu Mobile de facto par défaut hors-blocue, et nous améliorons l'UX en interceptant progressivement (Progressive Enhancement) les tablettes en Desktop via la syntaxe ascendante (`min-width`). La nouvelle révolution atomique se nomme les **Container Queries** (`@container`) : Un composant Modulaire carte ne lit plus son adaptation à l'écran Windows en largeur, mais scrute la taille disponible dynamique de son strict Conteneur Parent (le Grid Box dans lequel on le jette). Cela favorise une résilience absolue et un Component-Driven Design impitoyable.",
                objectives: [
                    "Gérer un workflow CSS fluide en conception Strictement Formelle Mobile-First.",
                    "Altérer radicalement un affichage Navbar display:flex vers flex-direction: column sous la passe mobile de 600px breakpoint.",
                    "Saisir la philosophie disruptive de la règle en conteneur locale (@container)."
                ],
                exercises: [
                    {
                        title: "Interception Ascendante Desktop (Mobile First)",
                        description: "Écrivez une requête de média (@media) ciblant au minimum une taille d'écran (min-width) de 1024px. À l'intérieur du bloc géré, forcez une classe '.titre' à utiliser une police de 5rem sur gros écran informatique.",
                        difficulty: "Difficile",
                        solution: "@media (min-width: 1024px) {\\n  .titre {\\n    font-size: 5rem;\\n  }\\n}",
                        hints: ["Le 'min-width' force l'exécution du bloc interne quand le moteur sortira de la sphère des petits modems web portables pour afficher un support large."]
                    }
                ],
                resources: []
            }
        ]
    }
];

module.exports = cssCourses;
