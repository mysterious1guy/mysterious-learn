const reactCourses = [
    {
        title: "ReactJS - Niveau Débutant",
        description: "Apprenez la bibliothèque front-end N°1 mondial créée par Facebook. Créez des interfaces utilisateurs dynamiques avec des composants.",
        category: "Web",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee5?w=800&q=80",
        rating: 4.8,
        students: 55000,
        language: "french",
        isFree: true,
        tags: ["ReactJS", "frontend", "JSX", "composants", "débutant"],
        chapters: [
            {
                title: "Introduction et JSX",
                description: "Le mariage du HTML en plein milieu du JavaScript.",
                order: 1,
                duration: "4 heures",
                content: "Fini un fichier partagé distinct JS DOM et HTML. ReactJS a fusioné ça via sa création syntaxique le 'JSX'. Une fonction Javascript qui retourne formellement une balise `return <div>Hello</div>`. Pour incorporer du JS dynamique dedans, on encadre des accolades `return <h1>Hello {name}</h1>`. Attention `class` devient `className` en JSX !",
                objectives: ["Comprendre Babel et la compilation JSX", "Maitriser variable en accolade", "Passer la classe CSS via nom className"],
                exercises: [
                    {
                        title: "Interpolation variable basic",
                        description: "Creer fonction React Profil. Avec variable let age = 22. Retourne balise div contentant : 'Age: 22' integré de facon JS JSX dynamique.",
                        difficulty: "Facile",
                        solution: "function Profil() {\\n  let age = 22;\\n  return <div>Age: {age}</div>;\\n}",
                        hints: ["N'oublie les accolades autour du age ! {age}"]
                    }
                ],
                resources: [
                    {
                        title: "C'est quoi un composant REACT ?",
                        type: "video",
                        url: "https://www.youtube.com/embed/dGcsH1"
                    }
                ]
            },
            {
                title: "La notion de Composants et Props",
                description: "Des Legos réutilisables à l'infini et communication",
                order: 2,
                duration: "5 heures",
                content: "En React, un composant est juste une Fonction qui commence par Majuscule (ex : `function Button()`). On l'utilise ailleurs en écrivant `<Button />`. On peut lui passer en arg d'attribut enfant personnalisé les `props` (properties) : `<Button titre=\"Acheter\" />`. A l'intérieur ton code recuperera argument props.titre dynamiqumentement. C'est le flux Uni-directionnel standard React UI parent à l'Enfant component.",
                objectives: ["Creer Composant modulaire externe", "Passer valeur String dynamique en props composante Enfant", "Utiliser Destructuration `{titre}` native param javascript."],
                exercises: [
                    {
                        title: "Bouton Personnalite",
                        description: "Creez function MyButton(props) et retourne bouton avec label affichant son props.txt en JSX interpole",
                        difficulty: "Faible",
                        solution: "function MyButton({txt}) {\\n  return <button>{txt}</button>;\\n}",
                        hints: ["N'hesite pas a destrucurer parametre direct en {txt}"]
                    }
                ],
                resources: [
                    {
                        title: "Composants React et Props passing",
                        type: "video",
                        url: "https://www.youtube.com/embed/8rW"
                    }
                ]
            },
            {
                title: "Le Hook useState",
                description: "Faire vivre l'Interface sans reload naviguation",
                order: 3,
                duration: "6 heures",
                content: "L'innovation React: Le State. Déclaration magique: `const [count, setCount] = useState(0)`. JS natif a besoin de DOM Manip pour MAJ le front, React Non: des lors que vous appelez methode majuscule `setCount(4)`, React en detectant ceci de lui-meme re-affiche instannement l'arbre Visuel DOM Component impacté dans Navigateur avec zero temps mort (Virtual DOM concept Re-render).",
                objectives: ["Maitriser Import de react hooks import {useState} from 'react'", "Declencher Set function au un onClick Event Listener format camelCase"],
                exercises: [
                    {
                        title: "Hook de Compte Increment simple",
                        description: "Importé. Initiez la const destructurée du compteur et de sa fonction setter, sa valeur défaut est 0.",
                        difficulty: "Moyen",
                        solution: "const [compteur, setCompteur] = useState(0);",
                        hints: ["Utilisez Array Destructuring classique hooks"]
                    }
                ]
            }
        ]
    },
    {
        title: "ReactJS - Niveau Intermédiaire",
        description: "Partez plus loin : Cycle de vie composant (useEffect), Listes dynamiques, Formulaire controlés.",
        category: "Web",
        level: "Intermédiaire",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee5?w=800&q=80",
        rating: 4.8,
        students: 22000,
        language: "french",
        isFree: true,
        tags: ["ReactJS", "useEffect", "Hooks", "intermédiaire"],
        chapters: [
            {
                title: "Le Hook useEffect",
                description: "Le Cycle de vie. (Chargement Page complet / Dechargement UnMount).",
                order: 1,
                duration: "8 heures",
                content: "Quand executer code ? Juste Après l'affichage d'un visuel du composant (Fetch API DB) ? `useEffect( () => { init() }, [] )`. La puissance se cache dans son tableau de Dépendance en fin. Vide `[]` il sexécute 1 x. Chargé `[valeur]`, il se declenche dynamiquement avec un side-event des que cette State Valeur specifique a mute à n'importe quel moment.",
                objectives: ["Chargement de data fetch externe dans un effet.", "Manipuler le Cleanup return () de l'use Effect unmount timer Interval list."],
                exercises: [
                    {
                        title: "L'effet Unique",
                        description: "Ajouter le UseEffect basique de log 'Mounted' pour qu'il ne se lance stricement qu'une seule et l'unique unique fois à la création visuel DOM (Tableau de dépendance vide)",
                        difficulty: "Difficile",
                        solution: "useEffect(() => {\\n  console.log('Mounted');\\n}, []);",
                        hints: ["L'arr dépendance Vide c'est ce qui gère sa limitation stricte 1 seule loop mount"]
                    }
                ]
            },
            {
                title: "Rendu de Listes Map() et Attribut .Key",
                description: "Générer du code en boucle dans le Rendu.",
                order: 2,
                duration: "6 heures",
                content: "Dans du JSX on ne peut pas mettre de bloc boucle 'for'. Il faut iterer obligatoirement via la methode `.map()` Javascript de tableau qui va renvoyer Array. React exige qu'un composant multiple de Liste ai imperativement l'identifiant React attrib : `key={data.id}`. Faute de quoi la console petera de Warning sur la desync Virtual dom React Rendering re-use element list.",
                objectives: ["Mettre rendu via Map() iterateur", "Utilisation stringte key ID Unique sur parent Node list."]
            },
            {
                title: "Les Formulaire Controlés",
                description: "Lie l'input string de form native au flux React de UseState Data variable String",
                order: 3,
                duration: "6 heures",
                content: "On assigne la valeur input non par DOM mais native avec attribut JSX valu et Event : `value={monTexte} onChange={(e) => setMonTexte(e.target.value)}`. L'etat state React dicte la verité. Interceptez l'envoi submit button `<form onSubmit...>` à l'aide `e.preventDefault()`. On a un controle complet Data avant tout envoi API serveurs Node PHP backend .",
                objectives: ["Interdire rechargement page form submission natif", "Synch le e.target.value"]
            }
        ]
    },
    {
        title: "ReactJS - Niveau Expert (Avancé)",
        description: "Le Frontend Enginering : Context API as global Store, React Router V6, Framework Next.js Intro.",
        category: "Web",
        level: "Avancé",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee5?w=800&q=80",
        rating: 4.9,
        students: 11000,
        language: "french",
        isFree: true,
        tags: ["React", "Redux", "Context", "NextJS", "avancé", "router"],
        chapters: [
            {
                title: "Context API globale",
                description: "Casser le cauchemardeux passage Prop-Drilling.",
                order: 1,
                duration: "10 heures",
                content: "A force de passer les props d'enfant a enfant jusqu'au niveau 10.. on devient dingue. La ContextAPI ou Redux permettent de creer un Hub global d'information. Importez du hook magique `const {userRole} = useContext(UserContext)`. Ainsi un composant visuel lointain Footer.js peut etre au courant instantanement qu'il faille mettre bouton dark_mode globale theme state ou déconnection auth token sans aucun Props Parents link. Merveilleux de propreté Architecture projet.",
                objectives: ["Initie Context.Provider value ", "Call du Hook consume UseContext"]
            },
            {
                title: "React Router DOM",
                description: "Gerer les Adresses URL pour sa Single Page Application (SPA)",
                order: 2,
                duration: "10 heures",
                content: "Un click et l'URL change complet (/profil), mais curieusement, la page navigateur ne s'est jammais rechargé ! C'est rendu des SPA. ReactRouterDOM met à dispo sa balise global `<BrowserRouter>` et des ` <Route path='/test' element={<Test />}>` . Pour changer on utilise balise native `<Link to=\"/test\">` . Et Hop l'illusion est absolu. Ultra Fluidité User Frontend sans Backend Request PHP view HTML. ",
                objectives: ["Saisir concept et deployer un SPA browser Routing sys", "Gérer de l'URL parameter /user/:id avec hook extraction"]
            }
        ]
    }
];

module.exports = reactCourses;
