const jsCourses = [
    {
        title: "JavaScript - Niveau Débutant",
        description: "Apprenez le seul langage exécutable nativement par le navigateur. Maîtrisez la syntaxe ES6 moderne et les bases de la programmation orientée web.",
        category: "Web",
        level: "Débutant",
        duration: "15 heures",
        image: "https://images.unsplash.com/photo-1579468458835-cd73b7b7dfd5?w=800&q=80",
        rating: 4.8,
        students: 45000,
        language: "french",
        isFree: true,
        tags: ["javascript", "web", "débutant", "ES6"],
        chapters: [
            {
                title: "Introduction et Interaction Naviguateur",
                description: "Ouvrir votre console F12 et dire Hello !",
                order: 1,
                duration: "3 heures",
                content: "Javascript (JS) a été créé en 10 jours en 1995. Tout de suite il a donné lieu a des sites dynamiques. JS se place avec la balise `<script src=\"test.js\"></script>` dans un fichier HTML. Le flux classique de console est `console.log('Test')`, la notification visuelle front se fait via `alert('Boom !')` et les var entrante avec le popup `prompt('Age ?')`.",
                objectives: ["Comprendre Console inspect Element (Dev Tools)", "Afficher et lire variables du front"],
                exercises: [
                    {
                        title: "Hello dans terminal de navigateur",
                        description: "Execute l'instruction classique dans JS pour debug le mot simple : Coucou.",
                        difficulty: "Facile",
                        solution: "console.log('Coucou');",
                        hints: ["La methode log reside dans l'object console global."]
                    }
                ],
                resources: [
                    {
                        title: "Le Langage Javascript",
                        type: "video",
                        url: "https://www.youtube.com/embed/W6NZfCO5SIk"
                    }
                ]
            },
            {
                title: "Let, Const, Var, et Types Dynamique.",
                description: "Variables ES6 en Javascript moderne",
                order: 2,
                duration: "5 heures",
                content: "On déteste l'ancien standard `var`. L'ES6 introduce `let` (modifiables) et `const` (constantes immuables bloqué). Les types gérés : String, Number (flotants inclus), Boolean et Null et Undefined. Il est capital de faire triple égalité `===` pour que JS ne fasse pas de type coercion dangereuses en implicat (où 5 == '5' est true... mais faux strict 5 === '5')",
                objectives: ["Déclarer Scope de blocs via const et let", "Imposer le triple egal stricts (===) sur le double."],
                exercises: [
                    {
                        title: "La constant inchangeable",
                        description: "Déclarer une constante pour PI valeur 3.14.",
                        difficulty: "Facile",
                        solution: "const PI = 3.14;",
                        hints: ["Les primitives numbers ne nécessite pas les quote de texte !"]
                    }
                ]
            },
            {
                title: "Fonctions Fléchées (Arrow Function) / Object Basique",
                description: "La syntaxe la plus utilisée en FrontReact futur.",
                order: 3,
                duration: "7 heures",
                content: "On définit des fonctions : `function old(x){...}`. Mais on code aujourd'hui quasi que de l'Arrow fonction : `const new = (x) => { return x*2; }`. Cela limite les galères avec la binding du pointeur global `this`. Les Obj literals JS : `const obj = { user: 'Paul', score: 30 }`. En javascript c'est ce format Objet qui donnera lieu au concept de fichier JSON server.",
                objectives: ["Ecrire propre format Fat arrow. =>", "Iterer Objet notation.", "Manipuler des Array natives"],
                exercises: [
                    {
                        title: "Flèche Carré",
                        description: "Créez fonction fleché const carre qui retourne x*x. sans return keyword implicite.",
                        difficulty: "Moyen",
                        solution: "const carre = (x) => x * x;",
                        hints: ["Si t'a pas mis l'accolade ouvrante de body de fonction, c'est auto-return"]
                    }
                ],
                resources: [
                    {
                        title: "Arrow fonction et le grand This",
                        type: "video",
                        url: "https://www.youtube.com/embed/5mFZ"
                    }
                ]
            }
        ]
    },
    {
        title: "JavaScript - Niveau Intermédiaire",
        description: "Le DOM. Apprenez à manipuler les balises HTML en direct pour créer des applications web interactives (To-Do lists réactives).",
        category: "Web",
        level: "Intermédiaire",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1579468458835-cd73b7b7dfd5?w=800&q=80",
        rating: 4.8,
        students: 31000,
        language: "french",
        isFree: true,
        tags: ["javascript", "DOM", "events", "intermédiaire"],
        chapters: [
            {
                title: "Le DOM Manipulation Globale",
                description: "Chirurgie en plein ventre : rajouter de trucs en direct sur la page client.",
                order: 1,
                duration: "8 heures",
                content: "Document Object Model. On navigue sur l'arbre de balise. L'outil suprème JS est : `document.querySelector('#id ou .classe ou tagname')`. Vous y avez un accès qui vous permets de mettre à jour son HTML inclus `element.innerHTML = 'Nouveau texte'` ou ses couleurs via composante node `element.style.color = 'red'` et le masquer `element.classList.add('hidden')`.",
                objectives: ["Rechercher par querrySelector et getAll", "Modifier une prop inligne avec innerTEXT et innerHTML"],
                exercises: [
                    {
                        title: "Changer Texte",
                        description: "Un H1 possède lid #majeur. Mets son textContent sur 'Succés'.",
                        difficulty: "Facile",
                        solution: "document.querySelector('#majeur').textContent = 'Succés';",
                        hints: ["N'oublie le '#', qui représente une ID."]
                    }
                ],
                resources: [
                    {
                        title: "DOM la manipulation complete",
                        type: "video",
                        url: "https://www.youtube.com/embed/DOMJS1q"
                    }
                ]
            },
            {
                title: "Gestion des Evénement Listeners (Listen Event)",
                description: "Rendre ca cliquable, vivants et animés au scroll !",
                order: 2,
                duration: "12 heures",
                content: "Quand je clique un bouton JS doit le capter: `btn.addEventListener('click', fonctionCallback)`. JS gère des événements innombrable sur du Browser (clavier 'keydown', la souris 'mouseenter' sur composant, la fenetre resize). JS va meme emmetre avec l'objet Event (`e`) plein de meta-details pour capturer la value exacte de frappe dans le cadre dun keydown 'e.target.value'.",
                objectives: ["Cabler events multiples", "Créer elements createElement pour To-Do appendChild"],
                exercises: [
                    {
                        title: "Cable d'un boutton alerte",
                        description: "Cible objet 'button' via selec et donne lui function anonyme via EventListener click de l'alerte 'Click!'",
                        difficulty: "Moyen",
                        solution: "document.querySelector('button').addEventListener('click', () => {\\n    alert('Click!');\\n});",
                        hints: ["A l'interieur de addEventListener on insère Arrow function"]
                    }
                ]
            }
        ]
    },
    {
        title: "JavaScript - Niveau Expert (Avancé)",
        description: "Le Moteur pur. Traitement asynchrone (Promises, Async/Await), Programmation Orienté Web Service d'API, Module Node/Backend.",
        category: "Web",
        level: "Avancé",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
        rating: 4.8,
        students: 12000,
        language: "french",
        isFree: true,
        tags: ["javascript", "ASYNCHRONE", "fetch", "nodeJS", "avancé"],
        chapters: [
            {
                title: "Asynchrone Event : Des Callbacks à Async/Await",
                description: "L'attente n'est jamais bloquante avec JavaScript Web Worker.",
                order: 1,
                duration: "10 heures",
                content: "Javascript ne fait qu'une trame(Thread unqiue). Donc s'il télécharge image de 10Mo votre site freezr : sauf via concept d'Async. Les Promesses(Promise(resolve/reject)). Depuis ES7 La solution revolutionnaire est un couple `async function init()` et un `await process()` à l'interieur permettant a Javascript de traiter un délai asychrone comme des lignes synchrone de lecture clean.",
                objectives: ["Ecrire un objet New Promise()", "Remplacer .then() .catch() du fetch par try-catch Await format."],
                exercises: [
                    {
                        title: "Pause de seconde async",
                        description: "Creer fonction asyncrono fleche timerPause attendant 1000 milisecond. Puis qui console log \"Fin\".",
                        difficulty: "Moyen",
                        solution: "const timerPause = async () => {\\n  await new Promise(r => setTimeout(r, 1000));\\n  console.log('Fin');\\n}",
                        hints: ["setTimeout prend sa reponse r sans faire de variable supplementaire in-line"]
                    }
                ],
                resources: [
                    {
                        title: "Async, eventloop",
                        type: "video",
                        url: "https://www.youtube.com/embed/8aGh"
                    }
                ]
            },
            {
                title: "Requêtes Serveurs HTTP (Fetch API)",
                description: "Les communications serveur AJAX et requetes vers data.",
                order: 2,
                duration: "15 heures",
                content: "On consomme les APIs Rest FullBackend en javascript avec the native `fetch('url')`. Elle tire par defaut la methode GET du serveur et récupére res que l'on transforme json() via `.then(res => res.json())`. Nous verrons comment y coller du Request POST custom bearer tokens config et header CORS de securité.",
                objectives: ["Invoquer fetch asyncrone url REST", "Poster sur Database mongo par API body payload method Json Stringify"],
                exercises: [
                    {
                        title: "Fetch Api basique await",
                        description: "Fetch API get sur '/users'. Mets son return json sur variable data, async mode pure",
                        difficulty: "Difficile",
                        solution: "const response = await fetch('/users');\\nconst data = await response.json();\\nconsole.log(data);",
                        hints: ["Le fetch lui meme requière AWAIT. Puis la transformation en type obj (response.json()) de l'entiereté stream la requiert aussi !"]
                    }
                ]
            }
        ]
    }
];

module.exports = jsCourses;
