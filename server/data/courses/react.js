const reactCourses = [
    {
        id: "reactjs-niveau-d-butant-les-bases-de-l",
        title: "ReactJS - Niveau Débutant : Les Bases de l'UI Moderne",
        description: "Apprenez la bibliothèque front-end N°1 mondiale. Maîtrisez le JSX, les composants et le flux de données unidirectionnel pour créer des interfaces ultra-rapides.",
        category: "Web",
        level: "Débutant",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee5?w=800&q=80",
        rating: 4.8,
        students: 55000,
        language: "react",
        isFree: true,
        tags: ["ReactJS", "frontend", "JSX", "composants", "débutant", "UI"],
        chapters: [
            {
                title: "Chapitre 1 : L'Écosystème React et le JSX",
                description: "Le mariage révolutionnaire du HTML et du JavaScript. Comprenez pourquoi le DOM Virtuel change tout.",
                order: 1,
                duration: "6 heures",
                content: "React n'est pas un framework, c'est une bibliothèque. Son innovation majeure est le **JSX**, une extension syntaxique du JS qui permet d'écrire du HTML directement dans vos fonctions. Nous étudierons comment Babel compile ce code en appels `React.createElement`. Vous découvrirez le **Virtual DOM**, la copie légère du vrai DOM que React utilise pour calculer les changements minimaux avant de mettre à jour l'écran, garantissant une fluidité exceptionnelle.",
                objectives: ["Configurer un projet React avec Vite", "Manipuler des expressions JavaScript dans le JSX via les accolades", "Comprendre la différence entre le DOM réel et le DOM virtuel"],
                exercises: [
                    {
                        title: "Interpolation Dynamique",
                        description: "Créez une constante `nom = 'React'` et affichez-la dans une balise `<h1>` à l'intérieur d'un composant.",
                        difficulty: "Facile",
                        solution: "const App = () => {\n  const nom = 'React';\n  return <h1>Hello {nom}</h1>;\n}",
                        hints: ["Utilisez les accolades {} pour injecter du JS dans le HTML."]
                    }
                ],
                resources: [{ title: "React Docs: Introducing JSX", type: "article", url: "https://react.dev/learn/writing-markup-with-jsx" }]
            },
            {
                title: "Chapitre 2 : Composants et Props (Réutilisabilité)",
                description: "Construisez votre interface comme un jeu de Legos. Apprenez à créer des composants modulaires et à leur passer des données.",
                order: 2,
                duration: "8 heures",
                content: "Tout en React est un Composant. Une simple fonction JS qui retourne du JSX. Nous apprendrons à découper une page en petits morceaux réutilisables. Vous maîtriserez les **Props**, les paramètres que vous passez à un composant enfant (comme des arguments de fonction). Vous apprendrez que les props sont **read-only** (immuables) : un enfant ne doit jamais modifier ses propres props, garantissant un flux de données descendant prévisible.",
                objectives: ["Créer des composants fonctionnels réutilisables", "Passer des données complexes (objets, tableaux) via les props", "Utiliser la destructuration d'objets pour clarifier vos composants"],
                exercises: [
                    {
                        title: "Le Composant Bouton",
                        description: "Créez un composant `MonBouton` qui reçoit une prop `label` et l'affiche à l'intérieur d'une balise `<button>`.",
                        difficulty: "Facile",
                        solution: "const MonBouton = ({ label }) => (\n  <button>{label}</button>\n);",
                        hints: ["Utilisez la destructuration `{ label }` directement dans les arguments de la fonction."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : État Local avec le Hook useState",
                description: "Rendez votre interface vivante. Apprenez à gérer les changements de données qui déclenchent un re-rendu automatique.",
                order: 3,
                duration: "8 heures",
                content: "L'état (**State**) est la mémoire d'un composant. Contrairement aux variables classiques, modifier le State force React à re-dessiner le composant à l'écran. Nous étudierons le hook `useState`. Vous apprendrez la syntaxe de destructuration `const [val, setVal] = useState(initial)`. Nous aborderons les pièges classiques : l'asynchronisme des mises à jour et pourquoi il ne faut jamais modifier l'état directement (`state = 10` est interdit).",
                objectives: ["Déclarer et mettre à jour un état simple", "Gérer les types complexes (objets/tableaux) dans le state", "Comprendre le cycle de re-rendu déclenché par le setter"],
                exercises: [
                    {
                        title: "Le Compteur Interactif",
                        description: "Créez un bouton qui, à chaque clic, incrémente un nombre affiché à l'écran.",
                        difficulty: "Moyen",
                        solution: "const [count, setCount] = useState(0);\nreturn <button onClick={() => setCount(count + 1)}>{count}</button>;",
                        hints: ["N'oubliez pas d'importer { useState } de 'react'."]
                    }
                ],
                resources: [{ title: "Beta React Docs: State: A Component's Memory", type: "article", url: "https://react.dev/learn/state-a-components-memory" }]
            },
            {
                title: "Chapitre 4 : Rendu Conditionnel et Listes (Map)",
                description: "Affichez vos données intelligemment. Apprenez à boucler sur des tableaux et à masquer/afficher des éléments selon le contexte.",
                order: 4,
                duration: "8 heures",
                content: "Dans le monde réel, les données viennent sous forme de listes. Nous utiliserons la méthode `.map()` du JS pour transformer un tableau de données en une liste de composants JSX. Point crucial : la prop **key**. Vous apprendrez pourquoi React en a besoin pour identifier chaque élément de manière unique dans le Virtual DOM. Nous aborderons également le rendu conditionnel via l'opérateur ternaire `? :` ou l'opérateur logique `&&`.",
                objectives: ["Générer des listes dynamiques à partir de tableaux d'objets", "Utiliser des clés uniques pour optimiser les performances", "Masquer des éléments avec des conditions logiques simples"],
                exercises: [
                    {
                        title: "La Liste de Tâches",
                        description: "Soit `todos = [{id: 1, text: 'A'}, {id: 2, text: 'B'}]`. Affichez-les dans des `<li>` via `.map()`.",
                        difficulty: "Moyen",
                        solution: "<ul>{todos.map(t => <li key={t.id}>{t.text}</li>)}</ul>",
                        hints: ["La clé 'key' doit être sur l'élément le plus à l'extérieur de la boucle."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        id: "reactjs-niveau-interm-diaire-cycle-de-vie-hooks",
        title: "ReactJS - Niveau Intermédiaire : Cycle de Vie & Hooks",
        description: "Allez au-delà de l'affichage passif. Maîtrisez les effets secondaires, les formulaires complexes et la communication avec les APIs externes.",
        category: "Web",
        level: "Intermédiaire",
        duration: "45 heures",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee5?w=800&q=80",
        rating: 4.8,
        students: 22000,
        language: "react",
        isFree: true,
        tags: ["ReactJS", "useEffect", "Hooks", "intermédiaire", "Forms", "API"],
        chapters: [
            {
                title: "Chapitre 1 : Le Hook useEffect (Effets Secondaires)",
                description: "Synchronisez votre composant avec le monde extérieur. Gérer le chargement de données et le nettoyage des ressources.",
                order: 1,
                duration: "12 heures",
                content: "Certaines actions ne sont pas directement liées au rendu : fetch une API, lancer un timer, s'abonner à un socket. C'est le rôle de `useEffect`. Nous étudierons le **tableau de dépendances** : vide `[]` pour s'exécuter une fois au montage, rempli `[val]` pour réagir aux changements. Surtout, nous apprendrons la fonction de **cleanup** (le `return` de l'effet) pour éviter les fuites de mémoire et les bugs de synchronisation.",
                objectives: ["Charger des données depuis une API REST au chargement de la page", "Nettoyer des intervals ou des event listeners", "Éviter les boucles infinies de re-rendu dans useEffect"],
                exercises: [
                    {
                        title: "Chargement API",
                        description: "Utilisez useEffect pour faire un fetch vers 'api.com/users' et stocker le résultat dans un state local au chargement du composant.",
                        difficulty: "Difficile",
                        solution: "useEffect(() => {\n  fetch(url).then(r => r.json()).then(data => setUsers(data));\n}, []);",
                        hints: ["Le tableau de dépendances vide [] est la clé pour ne l'exécuter qu'une seule fois."]
                    }
                ],
                resources: [{ title: "Synchronizing with Effects", type: "article", url: "https://react.dev/learn/synchronizing-with-effects" }]
            },
            {
                title: "Chapitre 2 : Formulaires Contrôlés et Gestion d'Entrées",
                description: "Oubliez le DOM natif. Apprenez à lier vos inputs HTML directement à l'état React pour une validation en temps réel.",
                order: 2,
                duration: "11 heures",
                content: "Dans un formulaire contrôlé, React est la 'source unique de vérité'. La valeur de l'input est dictée par le state, et chaque frappe au clavier met à jour ce state via `onChange`. Cela permet une validation instantanée (ex: mot de passe trop court, mail invalide) et une manipulation simplifiée des données avant envoi. Nous aborderons également la gestion des formulaires complexes avec plusieurs champs via un seul objet d'état.",
                objectives: ["Créer des inputs texte, cases à cocher et selects contrôlés", "Valider les données avant soumission", "Intercepter le submit avec e.preventDefault()"],
                exercises: [
                    {
                        title: "Input en Direct",
                        description: "Créez un input texte dont le contenu est affiché en MAJUSCULES juste en dessous en temps réel.",
                        difficulty: "Moyen",
                        solution: "<input value={text} onChange={e => setText(e.target.value)} />\n<p>{text.toUpperCase()}</p>",
                        hints: ["Liez 'value' au state et déclenchez le setter dans 'onChange'."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Composition vs Héritage (Patterns UI)",
                description: "Adoptez la philosophie React. Apprenez à créer des composants flexibles via la prop 'children' et les composants d'ordre supérieur basiques.",
                order: 3,
                duration: "11 heures",
                content: "React privilégie la **Composition**. Au lieu de faire hériter une classe d'une autre, on imbrique les composants. Nous utiliserons la prop spéciale `children` pour créer des 'wrapper' (ex: une Card, une Modal) qui acceptent n'importe quel contenu. Vous apprendrez à créer des composants d'interface génériques et à les spécialiser via les props, rendant votre code infiniment plus flexible et robuste.",
                objectives: ["Utiliser la prop children pour créer des layouts réutilisables", "Gérer la délégation de rendu", "Comprendre pourquoi la composition est plus puissante que l'héritage en UI"],
                exercises: [
                    {
                        title: "Le Wrapper Card",
                        description: "Créez un composant `Card` qui entoure son contenu d'une `div` avec une bordure grise.",
                        difficulty: "Facile",
                        solution: "const Card = ({ children }) => (\n  <div style={{ border: '1px solid gray' }}>{children}</div>\n);",
                        hints: ["'children' est une prop automatique contenant tout ce qui est mis entre les balises du composant."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 4 : Manipulation de Références (useRef) et Portals",
                description: "Sortez du Virtual DOM quand c'est nécessaire. Apprenez à accéder aux nœuds HTML réels et à rendre des éléments en dehors du conteneur parent.",
                order: 4,
                duration: "11 heures",
                content: "Parfois, on a besoin de toucher au DOM réel : focaliser un input, mesurer une taille de div, intégrer une librairie externe (D3, Google Maps). C'est le rôle de `useRef`. Une référence est une boîte qui garde une valeur entre les rendus sans en provoquer de nouveau. Nous aborderons aussi les **Portals**, permettant de rendre un composant (comme une modale) tout en haut de l'arbre HTML (`<body>`) tout en gardant sa logique dans son parent React.",
                objectives: ["Manipuler le focus HTML programmatiquement", "Stocker des valeurs persistantes hors-state", "Gérer les superpositions (Z-index) via les Portals"],
                exercises: [
                    {
                        title: "Auto-Focus",
                        description: "Utilisez useRef pour donner le focus à un input dès qu'un bouton est cliqué.",
                        difficulty: "Moyen",
                        solution: "const inputRef = useRef();\n<input ref={inputRef} />\n<button onClick={() => inputRef.current.focus()}>Focus</button>",
                        hints: ["Accédez à l'élément via inputRef.current."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        id: "reactjs-niveau-expert-mondiale-performance-architecture-scalable",
        title: "ReactJS - Niveau Expert Mondiale : Performance & Architecture Scalable",
        description: "Devenez un architecte frontend. Maîtrisez le partage d'état global (Context/Redux), l'optimisation des rendus, les hooks personnalisés et les architectures d'entreprise.",
        category: "Web",
        level: "Avancé",
        duration: "65 heures",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee5?w=800&q=80",
        rating: 4.9,
        students: 11000,
        language: "react",
        isFree: true,
        tags: ["React", "Redux", "Context API", "Optimization", "avancé", "Architecture"],
        chapters: [
            {
                title: "Chapitre 1 : Partage d'État Global (Context API)",
                description: "Éliminez le Prop-Drilling. Apprenez à créer un hub de données accessible par n'importe quel composant de votre application.",
                order: 1,
                duration: "18 heures",
                content: "Passer des données à travers 10 niveaux de composants est un cauchemar. La **Context API** permet de créer un 'nuage' de données. Nous apprendrons à créer un `Provider` pour injecter les données (ex: thème sombre, utilisateur connecté) et à les consommer via `useContext`. Nous aborderons les patterns de 'Context splitting' pour éviter les re-rendus inutiles et l'utilisation de `useReducer` pour gérer des états complexes de manière structurée (Redux-like).",
                objectives: ["Implémenter un système de thème (Dark/Light) global", "Gérer l'authentification centralisée", "Combiner Context et useReducer pour une gestion d'état robuste"],
                exercises: [
                    {
                        title: "Le Thème Global",
                        description: "Créez un ThemeContext et un bouton qui change la valeur 'theme' de 'light' à 'dark' pour toute l'app.",
                        difficulty: "Difficile",
                        solution: "const ThemeContext = createContext();\n// Provider: <ThemeContext.Provider value={{theme, toggleTheme}}>\n// Subscriber: const {theme} = useContext(ThemeContext);",
                        hints: ["N'oubliez pas d'envelopper votre application <App /> dans le Provider."]
                    }
                ],
                resources: [{ title: "Passing Data Deeply with Context", type: "article", url: "https://react.dev/learn/passing-data-deeply-with-context" }]
            },
            {
                title: "Chapitre 2 : Custom Hooks (Logique Métier Réutilisable)",
                description: "Bannissez la répétition de code. Apprenez à extraire votre propre logique complexe dans des fonctions 'useX' réutilisables partout.",
                order: 2,
                duration: "15 heures",
                content: "Les **Hooks Personnalisés** sont l'outil d'abstraction ultime. Ils permettent d'extraire la logique (state, effets) d'un composant pour la réutiliser ailleurs. Nous construirons des hooks comme `useFetch` (gestion de chargement/erreur API), `useLocalStorage` (persistance automatique), ou `useAuth`. Cela permet de garder vos composants visuels 'purs' et de tester votre logique métier indépendamment.",
                objectives: ["Extraire la logique de fetch dans un hook useFetch", "Gérer les formulaires via un hook useForm", "Composer plusieurs hooks entre eux"],
                exercises: [
                    {
                        title: "Le Hook useToggle",
                        description: "Écrivez un hook `useToggle` qui retourne un booléen et une fonction pour l'inverser.",
                        difficulty: "Moyen",
                        solution: "function useToggle(init) {\n  const [v, setV] = useState(init);\n  const toggle = () => setV(!v);\n  return [v, toggle];\n}",
                        hints: ["Commencez toujours le nom par 'use' pour respecter les règles des hooks."]
                    }
                ],
                resources: []
            },
            {
                title: "Chapitre 3 : Optimisation des Performances (Memo, useMemo, useCallback)",
                description: "Dites adieu aux lenteurs. Apprenez à empêcher les re-rendus inutiles et à mémoriser les calculs lourds.",
                order: 3,
                duration: "15 heures",
                content: "React est rapide, mais sur des apps massives, les re-rendus superflus peuvent geler l'UI. Nous étudierons : 1) **React.memo** pour ne pas re-dessiner un composant si ses props n'ont pas changé. 2) **useMemo** pour mettre en cache un calcul mathématique lourd. 3) **useCallback** pour maintenir l'identité d'une fonction et éviter de casser les optimisations des enfants. Vous apprendrez à profiler votre app avec les DevTools pour débusquer les goulots d'étranglement.",
                objectives: ["Identifier les re-rendus inutiles via le Profiler", "Optimiser le rendu de listes massives", "Maîtriser le passage de fonctions stables aux composants fils"],
                exercises: [
                    {
                        title: "Mémorisation de Calcul",
                        description: "Utilisez useMemo pour ne recalculer le factoriel d'un grand nombre que si ce nombre change.",
                        difficulty: "Moyen",
                        solution: "const result = useMemo(() => calculLourd(n), [n]);",
                        hints: ["Le deuxième argument est le tableau de dépendances, comme useEffect."]
                    }
                ],
                resources: [{ title: "Skipping Re-renders with useMemo", type: "article", url: "https://react.dev/reference/react/useMemo" }]
            },
            {
                title: "Chapitre 4 : Architecture Avancée et Testing (Jest/RTL)",
                description: "Prêt pour la production. Apprenez à structurer vos dossiers, à gérer les erreurs avec Error Boundaries et à tester vos composants.",
                order: 4,
                duration: "17 heures",
                content: "Une app scalable nécessite une structure rigoureuse (Atomic Design, Feature-based). Nous explorerons les **Error Boundaries** pour capturer les crashs sans faire sauter toute l'app. Enfin, nous aborderons le **Testing**. Avec Jest et React Testing Library, vous apprendrez à simuler des clics utilisateur et à vérifier que vos composants se comportent comme prévu avant de les déployer. C'est l'assurance qualité indispensable de tout ingénieur senior.",
                objectives: ["Mettre en place un Error Boundary global", "Écrire des tests unitaires pour vos composants et hooks", "Implémenter le Lazy Loading et le Code Splitting (React.lazy)"],
                exercises: [
                    {
                        title: "Test de Rendu",
                        description: "Écrivez un test RTL simple qui vérifie qu'un composant affiche bien le texte 'Bonjour'.",
                        difficulty: "Moyen",
                        solution: "test('affiche bonjour', () => {\n  render(<App />);\n  expect(screen.getByText('Bonjour')).toBeInTheDocument();\n});",
                        hints: ["Utilisez 'screen.getByText' pour cibler les éléments."]
                    }
                ],
                resources: []
            }
        ]
    }
];

module.exports = reactCourses;
