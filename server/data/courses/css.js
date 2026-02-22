const cssCourses = [
    {
        title: "CSS - Niveau Débutant",
        description: "Devenez un artiste du web. Apprenez à cibler vos éléments HTML pour appliquer des couleurs, des polices et modifier le design.",
        category: "Web",
        level: "Débutant",
        duration: "12 heures",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
        rating: 4.8,
        students: 31000,
        language: "french",
        isFree: true,
        tags: ["CSS", "styles", "design", "débutant", "frontend"],
        chapters: [
            {
                title: "Introduction et Sélecteurs de base",
                description: "Comment relier votre fichier CSS et cibler vos balises HTML.",
                order: 1,
                duration: "3 heures",
                content: "CSS (Cascading Style Sheets) gère l'apparence. Pour le lier, on inclut `<link rel=\"stylesheet\" href=\"style.css\">` dans le `<head>` HTML. La syntaxe est simple : un sélecteur suivi d'un bloc de déclarations entre accolades. Vous apprendrez le sélecteur d'élément (ex: `p`), le sélecteur de classe (ex: `.ma-classe`) et le sélecteur d'identifiant (`#mon-id`). La classe est réutilisable, l'ID est unique.",
                objectives: ["Lier un fichier local CSS dans une page web", "Utiliser le sélecteur de classe (point)", "Mettre en place le sélecteur ID (hashtag)"],
                exercises: [
                    {
                        title: "Votre première classe CSS",
                        description: "Ciblez une classe nommée 'btn-rouge' pour mettre le texte en couleur 'red' et l'arrière-plan (background-color) en coloris 'black'.",
                        difficulty: "Facile",
                        solution: ".btn-rouge {\\n    color: red;\\n    background-color: black;\\n}",
                        hints: ["N'oubliez pas le point devant le nom de la classe."]
                    }
                ],
                resources: [
                    {
                        title: "Les bases absolues du CSS3",
                        type: "video",
                        url: "https://www.youtube.com/embed/1Rs2ND1ryYc"
                    }
                ]
            },
            {
                title: "Propriétés Textuelles et Typographie",
                description: "Polices, tailles, espaces de lignes et couleurs.",
                order: 2,
                duration: "4 heures",
                content: "Personnaliser le texte est souvent la première chose observée par les clients. Les propriétés essentielles incluent `font-family` (la police d'écriture, comme Arial ou les polices Google externes), `font-size` (la taille), `font-weight` (le gras) et `text-align` (gauche, centré, droit). Les couleurs peuvent être définies par nom de mot clé abstrait, RGB, ou les valeurs Hexadécimales (ex: #FF0000 est rouge pur).",
                objectives: ["Mettre un texte en majuscule", "Changer le format numérique Hex des colors de font.", "Aérer les écritures."],
                exercises: [
                    {
                        title: "Texte Centré et Enorme",
                        description: "Cible tous h1. Centre le texte, mets un font-size à 50px.",
                        difficulty: "Facile",
                        solution: "h1 {\\n    text-align: center;\\n    font-size: 50px;\\n}",
                        hints: ["Le tag text-align accèpte une value en anglais simple 'center'"]
                    }
                ],
                resources: [
                    {
                        title: "Gestion colorimetrique standardisée via CSS",
                        type: "video",
                        url: "https://www.youtube.com/embed/IEsZ-T"
                    }
                ]
            },
            {
                title: "Modèle de boite (Box Model)",
                description: "Margin, Padding et Borders : un concept crucial à maitriser",
                order: 3,
                duration: "5 heures",
                content: "En HTML, tout est une boite. Le CSS gère les distances de cette boite via 3 niveaux: Le `padding` (l'espace intérieur entre le texte et la bordure), la `border` (la bordure visible), le `margin` (l'espace extérieur qui repousse les autres éléments). Une règle absolue du webmoderne impose souvent `box-sizing: border-box` appliqué globalement sur `*` pour simplifier les calculs de largeurs finales d’écran.",
                objectives: ["Maitriser la distinction d'écart de padding/margin interne externe.", "Mettre une fine ou grasse bordure solid.", "Mettre à 0 toutes les marges primaires des balises."],
                exercises: [
                    {
                        title: "Bouton distant et gros",
                        description: "Ciblez un btn-gros d'une classe. Espace intérieur de 10px partout, Espace de marge extérieure repoussante à 20px.",
                        difficulty: "Moyen",
                        solution: ".btn-gros {\\n    padding: 10px;\\n    margin: 20px;\\n}",
                        hints: ["Tu peux attribuer aux 4 cotés si la propriété ne précise pas de position exacte `-top`, `-left`."]
                    }
                ],
                resources: [
                    {
                        title: "Le Modèle des boites",
                        type: "video",
                        url: "https://www.youtube.com/embed/2-n"
                    }
                ]
            }
        ]
    },
    {
        title: "CSS - Niveau Intermédiaire",
        description: "La mise en page comme un pro. Apprenez Flexbox, CSS Grid et les positionnements manuels qui rendent un site interactif.",
        category: "Web",
        level: "Intermédiaire",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        students: 18000,
        language: "french",
        isFree: true,
        tags: ["CSS", "Flexbox", "Grid", "position", "intermédiaire"],
        chapters: [
            {
                title: "Flexbox: L'alignement magique",
                description: "L'outil roi qui a tué les anciens flottes (float).",
                order: 1,
                duration: "8 heures",
                content: "En créant sur le composant parent `display: flex;`, tout ses enfants se mettent automatiquement dans une direction par défaut en ligne (Row). Les commandes `justify-content` régissent l'axe principal (par ex pour centrer, ou bien dispatch `space-between`). Tandis que `align-items` joue avec l'axe perpendiculaire. Presque 80% des interfaces modernes se font sous Flexbox.",
                objectives: ["Mettre sur display Flex", "Centrer intégralement bloc vertical et horizontal", "Changer Flex-direction en Column."],
                exercises: [
                    {
                        title: "Mettre tous les div ligne sur la boite main",
                        description: "Créer regle sur la balise .conteneur pour aligner les enfants sur toute la largeur sans dépassement avec espacement reparti.",
                        difficulty: "Difficile",
                        solution: ".conteneur {\\n  display: flex;\\n  justify-content: space-between;\\n}",
                        hints: ["Assigned espace between au justify value."]
                    }
                ],
                resources: [
                    {
                        title: "Le guide définitif ou rapide de CSS Flexbox",
                        type: "video",
                        url: "https://www.youtube.com/embed/u044iM9xsWU"
                    }
                ]
            },
            {
                title: "Positionnements (Absolute, Relative, Fixed)",
                description: "Sortir des éléments du flux classique du navigateur.",
                order: 2,
                duration: "6 heures",
                content: "Les flux naturels suivent le DOM en CSS (display blocks ou inline). Mais si vous voulez punaiser une navbar qui restouille tout temps haut ecran pendant scroll, il faut du `position: fixed`. Si vous voulez qu'une pastille reste en bas à droite d'une carte image c'est de l'`absolute` calculée en fonction du conteneur parent qui possède une `position: relative`. Vous placerez les coords absolues top, bottom, left et right.",
                objectives: ["Figer navbar fixed", "Manipuler une position absolue sur parent repère", "Maitriser le z-index superposition layout."],
                exercises: [
                    {
                        title: "Bulle coin haut droit absolue",
                        description: "Classe de nommée `.badge` sortie de son flux normal pour s'accrocher au top: 0 et right: 0 d'une conteneur limitrophe relative.",
                        difficulty: "Moyen",
                        solution: ".badge {\\n   position: absolute;\\n  top: 0;\\n  right: 0;\\n}",
                        hints: ["En position Absolute la bloc quitte l'intégrité de collision de son ancienne disposition."]
                    }
                ],
                resources: [
                    {
                        title: "Tout maitriser : Pos Relative, Absolue..",
                        type: "video",
                        url: "https://www.youtube.com/embed/jx5jmI0_u_M"
                    }
                ]
            },
            {
                title: "CSS Grid (Les Grilles)",
                description: "Tableaux en ligne et colonnes bidimensionnels formels.",
                order: 3,
                duration: "6 heures",
                content: "Idéal pour créer toute l’ossature globale d’application Desktop d'un coup (comme Dashboard). Avec le très expressif `display: grid`, et la fonction génératrice `grid-template-columns: repeat(3, 1fr)` signifiant \"Génère 3 colonnes flexibles, qui prennent toutes individuellement une Fraction (fr)\" du module d'espace disponible limitrophe de la largeur conteneur. Flex = 1D (ligne ou col). Grid = 2D (ligne et tableau complet).",
                objectives: ["Minitier un layout table globale rapide.", "Comprendre la grille auto responsives."],
                exercises: [
                    {
                        title: "Grille simple des images galeries",
                        description: "Crée conteneur div avec classe .galerie disposant de 2 colonnes parfaitement égales, 50% / 50%.",
                        difficulty: "Moyen",
                        solution: ".galerie {\\n  display: grid;\\n  grid-template-columns: 1fr 1fr;\\n}",
                        hints: ["1fr symbolise 1 'Fraction' disponible ecran, donc 1fr 1fr fait deux colonnes proportionnelles"]
                    }
                ],
                resources: [
                    {
                        title: "CSS Grid en vitesse express",
                        type: "video",
                        url: "https://www.youtube.com/embed/7kVeCqQCxlk"
                    }
                ]
            }
        ]
    },
    {
        title: "CSS - Niveau Expert (Avancé)",
        description: "Responsive web design, animations complexes CSS, Media Queries et variables natives (Custom Properties).",
        category: "Web",
        level: "Avancé",
        duration: "18 heures",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
        rating: 4.9,
        students: 11000,
        language: "french",
        isFree: true,
        tags: ["CSS", "responsive", "animations", "variables", "avancé"],
        chapters: [
            {
                title: "Responsive (Adaptable Phone/Desktop) : Media Queries",
                description: "Construire un site pour mobile en priorité ou faire des breakpoints standards.",
                order: 1,
                duration: "6 heures",
                content: "Le composant le plus redoutable pour modeliser le layout en fonction l'appareil mobile iPhone etc. La regle `@media (max-width: 768px) { ... }` exécute un bloc de variables CSS QUE SI le redimensionnement actuel en largeur de Viewport ecran tombe drastique sous les 768 pixels. Vous maitriserez le `Mobile First` approche.",
                objectives: ["Comprendre breakpoint.", "Changer la ligne direction d'un FlexBox pour s'applatir en mobile Column."],
                exercises: [
                    {
                        title: "Mobile first ou Media Query basique",
                        description: "En deça de la vue max 500px ecran, tu asseois un background bleuté sur une classe .bg global.",
                        difficulty: "Facile",
                        solution: "@media (max-width: 500px) {\\n  .bg {\\n    background-color: blue;\\n  }\\n}",
                        hints: ["Assure de definir le bloc interne du selecteur dans le bloc parent Media query"]
                    }
                ],
                resources: [
                    {
                        title: "Comment réaliser n'importe quel site responsive",
                        type: "video",
                        url: "https://www.youtube.com/embed/yU7jY3NI1"
                    }
                ]
            },
            {
                title: "Animations Pures natives et Transitions",
                description: "Rendez votre composante interactive au survol UX et Microanimations.",
                order: 2,
                duration: "8 heures",
                content: "Sans javascript, on met de la vie de fluiditude gracieuse lors du parcours. Un `transition` défini sur base conteneur prend une cible (exemple 'background-color') un temps de retard chronométrique (exemple 0.5s) et lissent l'animation lors de state déclenchement hover (le curseur souris touche composant). L'Animation complete se joue avec le très lourd mot clé @keyframes qui spécifie explicitement des états pourcentage intermédiaires entre point de debut %0 au terminus 100%.",
                objectives: ["Insérer l'accélérateur UX fluides grace aux transition all 0.3s ease", "Implementer la propriété Transform et css @keyframes logic."],
                exercises: [
                    {
                        title: "Translation d'image ou rotation boutton sur Hover",
                        description: "Cible composante classe '.image-scale': par defaut, place un attribut de transition 0.5s sur tout etat. Rajouter une state au :hover, de manière à lui donner du Transform: scale 2D fois 1.5 sur sa taille.",
                        difficulty: "Moyen",
                        solution: ".image-scale {\\n  transition: all 0.5s ease;\\n}\\n.image-scale:hover {\\n   transform: scale(1.5);\\n}",
                        hints: ["Rappelle le psedo selecteur `:hover` associé classe parente originelle."]
                    }
                ],
                resources: [
                    {
                        title: "Avoir des transitions microanimations CSS lisses",
                        type: "video",
                        url: "https://www.youtube.com/embed/ASa-B-G"
                    }
                ]
            },
            {
                title: "Variables CSS Natives (Propriétés personnalisées)",
                description: "Design-tokens globaux. Mode Nuit sans soucis.",
                order: 3,
                duration: "4 heures",
                content: "Oubliez la redondance d'un '#ff4050' pour de la couleur principal dans 30 endroits du CSS. `var(--primary_color)` récupère une configuration placée logiquement au root scope de votre style : `:root { --primary_color : #ff4050; } `. Très utile qu'on veut brancher pour ReactJS derrière pour forcer l'entiereté du mode Dark avec JS en redéfinissant root.",
                objectives: ["Mettre en place et affecter une custom property avec double dash '--'", "Maitriser fonction d'integration `var()`.", "Savoir créer les palettes couleurs globals Design Systeme."],
                exercises: [
                    {
                        title: "Initier Theme Couleur",
                        description: "Sur selecteur global racine pseudo class :root tu définis --main-bg à 'white'. Ensuite dans la classe bloc tu invoqueras son backgroud-color attibue tirée depuis cette variable en var(-main--bg)",
                        difficulty: "Moyen",
                        solution: ":root {\\n  --main-bg: white;\\n}\\n.bloc {\\n   background-color: var(--main-bg);\\n}",
                        hints: ["N'oublie les doubles tirets qui annoncent la nature de ce token local"]
                    }
                ],
                resources: [
                    {
                        title: "Maitre absolue de variables natives sur architecture système",
                        type: "video",
                        url: "https://www.youtube.com/embed/A"
                    }
                ]
            }
        ]
    }
];

module.exports = cssCourses;
