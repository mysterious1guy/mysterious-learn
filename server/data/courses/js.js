const jsCourses = [
    {
        title: "JavaScript - Niveau Débutant",
        description: "Le Mouvement et la Logique. Apprenez le seul langage exécutable nativement par tous les navigateurs web. Maîtrisez la syntaxe moderne ES6+ et les fondements algorithmiques.",
        category: "Web",
        level: "Débutant",
        duration: "20 heures",
        image: "https://images.unsplash.com/photo-1579468458835-cd73b7b7dfd5?w=800&q=80",
        rating: 4.8,
        students: 52000,
        language: "french",
        isFree: true,
        tags: ["JavaScript", "ES6+", "Logique", "Variables", "Débutant"],
        chapters: [
            {
                title: "1. L'Écosystème et la Déclaration (Let & Const)",
                description: "L'abandon total de 'var' au profit des portées de bloc modernes (Block Scoping).",
                order: 1,
                duration: "4 heures",
                content: "JavaScript a été conçu en 10 jours en 1995, mais a drastiquement évolué depuis l'ES6 (ECMAScript 2015). La déclaration historique `var` engendrait des fuites de portée (Hoisting) fatales. Aujourd'hui, on déclare exclusivement des variables muables via `let` et des constantes immuables (dont la réaffectation est bloquée en mémoire) par `const`. Par défaut, un ingénieur JS utilise `const` à 90%, basculant sur `let` uniquement si une boucle mathématique l'exige. Tout s'exécute dans l'Engine du navigateur (V8 pour Chrome) et s'affiche aux développeurs via F12 (`console.log()`).",
                objectives: [
                    "Saisir la différence fondamentale entre portée de bloc (let/const) et portée de fonction (var).",
                    "Comprendre le fonctionnement du Hoisting JS et la 'Temporal Dead Zone'.",
                    "Déclarer une constante impossible à réassigner mathématiquement."
                ],
                exercises: [
                    {
                        title: "La Constante Universelle",
                        description: "Créez une constante 'TAUX' valant 1.20 et logguez-la dans la console système.",
                        difficulty: "Facile",
                        solution: "const TAUX = 1.20;\\nconsole.log(TAUX);",
                        hints: ["Les primitives numériques s'écrivent sans guillemets, contrairement aux Strings."]
                    }
                ],
                resources: [
                    {
                        title: "Let, Const et Hoisting (MDN)",
                        type: "article",
                        url: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/let"
                    }
                ]
            },
            {
                title: "2. Types Primitifs et Égalité Stricte (===)",
                description: "Le typage dynamique et le piège de la coercition de type JS.",
                order: 2,
                duration: "5 heures",
                content: "JS est un langage à typage dynamique faible. Une variable peut naître 'String' et mourir 'Number'. Les primitives sont : String (texte), Number (entiers et flottants confondus), Boolean (true/false), Undefined (déclaré mais vide de valeur matérielle) et Null (vide intentionnel imposé par le développeur). Le plus grand danger du langage est la coercition de type implicite : l'opérateur `==` affirmera que `5 == '5'` est *vrai*. C'est pourquoi l'industrie impose l'opérateur d'égalité stricte `===` (qui vérifie la valeur ET le type matériel), rendant `5 === '5'` heureusement *faux*.",
                objectives: [
                    "Manipuler les types primitifs sans erreur d'affectation.",
                    "Savoir pourquoi typeof null retourne curieusement 'object' (bug historique JS).",
                    "Bannir l'égalité souple == au profit de l'égalité stricte ===."
                ],
                exercises: [
                    {
                        title: "Le Gardien Stricte",
                        description: "Écrivez une condition (if) vérifiant strictement qu'une variable (déjà définie) 'age' (Number 18) est égale à 18, et loguez 'Majeur'.",
                        difficulty: "Moyen",
                        solution: "if (age === 18) {\\n  console.log('Majeur');\\n}",
                        hints: ["Utilisez les trois signes égal pour bloquer la coercition chaîne vers nombre."]
                    }
                ],
                resources: []
            },
            {
                title: "3. Le Contrôle du Flux d'Exécution",
                description: "Opérateurs Logiques, If/Else, Switch et structures itératives (Boucles).",
                order: 3,
                duration: "6 heures",
                content: "Le processeur lit le code séquentiellement. Pour bifurquer, on utilise `if/else if/else`. On combine les prédicats via les opérateurs logiques ET `&&` (tous vrais) ou OU `||` (un seul vrai). Si les embranchements sont multiples sur la même variable, le `switch(variable)` est sémantiquement supérieur, nécessitant explicitement un mot-clé `break` sous peine d'exécuter les cas suivants en cascade (Fall-through). Pour l'itération, la boucle `for(let i=0; i<10; i++)` exécute un bloc un nombre connu de fois, tandis que `while(condition)` tourne tant que la condition perdure (risque de boucle infinie).",
                objectives: [
                    "Évaluer les valeurs 'Truthy' et 'Falsy' en JavaScript (0, '', null, undefined, NaN sont Falsy).",
                    "Construire un Switch Case avec Break et Default.",
                    "Implémenter une boucle For ascendante."
                ],
                exercises: [
                    {
                        title: "La Boucle d'Incrémentation",
                        description: "Créez une boucle for classique qui logue les chiffres stricts de 0 à 4 (soit 5 itérations exactes).",
                        difficulty: "Moyen",
                        solution: "for (let i = 0; i < 5; i++) {\\n  console.log(i);\\n}",
                        hints: ["L'initialisation crée i, la condition teste i < 5, l'expression finale incrémente i++."]
                    }
                ],
                resources: []
            },
            {
                title: "4. Les Fonctions et l'Émergence du Fat Arrow (=>)",
                description: "Des machines à réutiliser du code à l'ingénierie moderne fonctionnelle.",
                order: 4,
                duration: "5 heures",
                content: "Les fonctions encapsulent des algorithmes. Historiquement déclarées via mot conventionnel `function carre(x) { return x*x; }` (qui subissait le Hoisting au sommet du fichier). L'ES6 a introduit la syntaxe de fonction fléchée (Arrow Function) : `const carre = (x) => { return x*x; }`. Ou, si l'on retourne directement une valeur simple (Return Implicite) : `const carre = x => x*x;`. Cette syntaxe est dorénavant ubiquitaire en React car elle ne lie pas (bind) de nouveau contexte local virtuel `this`, elle hérite de la réalité de l'environnement matériel parent (Portée Lexicale).",
                objectives: [
                    "Convertir mentalement toute fonction classique en fonction fléchée ES6.",
                    "Exploiter le retour explicite et le retour implicite d'une Arrow Function.",
                    "Saisir le rôle de l'argument et du paramètre d'exécution."
                ],
                exercises: [
                    {
                        title: "La Flèche Multiplicatrice",
                        description: "Déclarez une Arrow Function constante nommée 'multi' prenant les paramètres (a, b) et retournant (implicitement sans crochet) leur multiplication.",
                        difficulty: "Difficile",
                        solution: "const multi = (a, b) => a * b;",
                        hints: ["Omettez les accolades {} et le mot-clé return pour profiter du mode implicite direct."]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        title: "JavaScript - Niveau Intermédiaire",
        description: "L'ingénieur du Document. Parcourez l'arbre DOM, capturez des événements, manipulez des Objets complexes et maîtrisez les méthodes de Tableaux de Haut Niveau (Map, Filter, Reduce).",
        category: "Web",
        level: "Intermédiaire",
        duration: "25 heures",
        image: "https://images.unsplash.com/photo-1579468458835-cd73b7b7dfd5?w=800&q=80",
        rating: 4.9,
        students: 39000,
        language: "french",
        isFree: true,
        tags: ["DOM", "Events", "Array Methods", "Objets", "Intermédiaire"],
        chapters: [
            {
                title: "1. Structuration Complexe : Objets et Tableaux (Arrays)",
                description: "Maniement de la donnée structurée, Déstructuration et Spread Operator.",
                order: 1,
                duration: "6 heures",
                content: "Un Tableau (Array) est une liste indexée : `const tab = [10, 20]`. Un Objet Litteral dicte un dictionnaire Paire Clé/Valeur brut : `const user = { name: 'Bob', role: 'Admin' }`. L'ES6 a introduit deux révolutions : La **Déstructuration** permet d'extraire chirurgicalement les données (`const { name } = user;`). L'opérateur de décomposition, le **Spread/Rest Operator** (`...`), permet de cloner nativement des objets ou tableaux par valeur pour éviter le désastreux passage par référence JS : `const cloneTab = [...tab];`. Idéal pour l'immutabilité exigée par Redux.",
                objectives: [
                    "Créer et invoquer des propriétés d'Obélisques JavaScript Object via le point (`user.name`) ou les crochets (`user['name']`).",
                    "Déstructurer un objet complexe sur une seule ligne pure.",
                    "Cloner formellement un tableau en détruisant sa référence mémoire via const new = [...old]."
                ],
                exercises: [
                    {
                        title: "Extraction par Déstructuration",
                        description: "Étant donné un objet 'data' au préalable défini contenant x et y. Déstructurez x et y sur une seule ligne.",
                        difficulty: "Moyen",
                        solution: "const { x, y } = data;",
                        hints: ["Le nom de votre variable entre { } DOIT matcher exactement la clé de l'objet source."]
                    }
                ],
                resources: []
            },
            {
                title: "2. Les Fonctions Arrays de Haut Ordre (HOF)",
                description: "Remplacer purement les boucles 'for' avec Map, Filter et Reduce.",
                order: 2,
                duration: "7 heures",
                content: "En JS Moderne (Déclaratif), on ne gère plus la mutation d'index avec les boucles `for/while` sur des listes. On utilise des méthodes natives qui retournent toujours *un nouveau tableau*, respectant l'immutabilité. L'itérateur **map()** transforme chaque élément et renvoie un tableau de même taille : `[1,2].map(x => x*2)` donne `[2,4]`. L'extracteur **filter()** passe la liste dans un crible boolean pour ne garder que le vrai : `[1,2,3].filter(x => x>1)` donne `[2,3]`. L'agrégateur mathématique absolu **reduce()** compile un tableau vers une valeur unique primitive terminale (ex: une somme).",
                objectives: [
                    "Bannir l'utilisation de for() ou forEach() lors d'une mutation de retour globale.",
                    "Appliquer brillamment la chaine d'opérateurs array.filter().map().",
                    "Comprendre le fonctionnement mathématique de l'accumulateur JS Array.reduce()."
                ],
                exercises: [
                    {
                        title: "Filtrage Positif",
                        description: "Vous avez un argument 'nombres' (tableau). Créez une constante 'positifs' en lui appliquant un filter() pour ne garder que les x strictement supérieurs à 0.",
                        difficulty: "Moyen",
                        solution: "const positifs = nombres.filter(x => x > 0);",
                        hints: ["Filter prend une callback (x => boolean). Si c'est vrai, l'élément est conservé dans le nouveau tableau rendu."]
                    }
                ],
                resources: []
            },
            {
                title: "3. Mutation du DOM (Document Object Model)",
                description: "Prendre le contrôle du squelette HTML sans recharger.",
                order: 3,
                duration: "6 heures",
                content: "Le navigateur transforme le code HTML statique en un gigantesque Objet hiérarchique : le DOM. JS manipule cet univers. On cible un nœud grâce à l'implacable `document.querySelector('.ma-classe')` (remplaçant les anciens getElementById fastidieux). Une fois l'entité extraite, on modifie son contenu brutal via `element.textContent`, son contenu balisé via `element.innerHTML` (dangereux si les datas viennent des utilisateurs : failles XSS Cross-Site Scripting). On change l'UI classe en invoquant `element.classList.add('actif')` ou `.toggle('cache')`.",
                objectives: [
                    "Identifier les limitations d'un NodeList renvoyé par querySelectorAll (n'est pas un vrai Array entierement).",
                    "Remplacer le texte formel d'un Header h1 ciblé dynamiquement.",
                    "Créer un noeud ex-nihilo via document.createElement() et l'injecter via append()."
                ],
                exercises: [
                    {
                        title: "Interrupteur de Classe",
                        description: "Ciblez une id '#menu' et utilisez sa classList pour forcer l'ajout (.add) d'une classe 'open'.",
                        difficulty: "Moyen",
                        solution: "document.querySelector('#menu').classList.add('open');",
                        hints: ["L'attribut classList natif possède ses propres méthodes d'ajout (add), de retrait (remove) et de bascule (toggle)."]
                    }
                ],
                resources: []
            },
            {
                title: "4. Architecture Événementielle (DOM Events)",
                description: "L'Event Loop réagit aux actions humaines Client.",
                order: 4,
                duration: "6 heures",
                content: "La page web est un système d'écoute. Écouter un bouton se fait par le biais exclusif de la méthode attente : `element.addEventListener('click', callback)`. Le bloc Callback (souvent une fat arrow) reçoit toujours en premier paramètre `e` (l'objet Event). Celui-ci contient la mine d'or vitale : `e.target` (le focus exact du clic physique), `e.preventDefault()` (pour stopper le rechargement navigateur automatique d'un `<form>` Submit par défaut), ou `e.stopPropagation()` (bloquer la bulle événementielle montante, ou Bubbling, qui remonte sur les parents collatéraux).",
                objectives: [
                    "Câbler un EventListener robuste réactif Click ou Keydown clavier.",
                    "Stopper l'anarchie formelle d'un formulaire via objet e formel preventDefault().",
                    "Saisir le concept avancé de 'Event Delegation' (placer le listener sur le conteneur lointain Père plutôt que 100 enfants Fils séparés)."
                ],
                exercises: [
                    {
                        title: "Stopper L'Envoi",
                        description: "Supposons un élément 'formulaire'. Ajoutez dessus un listener d'événement 'submit', prenant l'event d'argument (e), et appelez strictement sa méthode preventDefault().",
                        difficulty: "Difficile",
                        solution: "formulaire.addEventListener('submit', (e) => {\\n  e.preventDefault();\\n});",
                        hints: ["En JavaScript Natif (Vanilla), soumettre (Submit) un formulaire recharge violemment l'onglet intégral du User s'il n'est pas court-circuité par preventDefault() !"]
                    }
                ],
                resources: []
            }
        ]
    },
    {
        title: "JavaScript - Niveau Expert (Avancé)",
        description: "L'Ingénierie Systémique asynchrone absolue. Maîtrisez la Single-Thread Event Loop, les requêtes HTTP (Fetch, JWT Authorization), la POO via Classes et le drame matériel Closures.",
        category: "Web",
        level: "Avancé",
        duration: "30 heures",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
        rating: 5.0,
        students: 26500,
        language: "french",
        isFree: true,
        tags: ["Asynchrone", "Promises", "Fetch API", "Event Loop", "Closures"],
        chapters: [
            {
                title: "1. Mécanique Quantique : Asynchronisme et Promesses",
                description: "Sortir du Callback Hell et résoudre le drame du thread JavaScript.",
                order: 1,
                duration: "8 heures",
                content: "Le JavaScript moteur (V8) est rigoureusement Single-Threadé et synchrone. Il n'a qu'un canal (Call Stack). Si une opération de temporisation (Timer) ou de base de données durait 2 secondes, tout le site devrait crasher et freezer en permanence (Blocking IO). Le Backend Browser sauve avec le transfert du Timer en tâche d'arrière-plan par le navigateur. Historiquement on gérait ce retour d'exécution au hasard dans l'avenir via les fameux Callbacks. Aujourd'hui on utilise la Forme d'Objet `Promise`. Une variable Promesse existe sous 3 états matriciels stricts : En attente (Pending), Résolue Succès (Fulfilled/Resolve), ou bien Crash/Erreur violente réseau (Rejected). On intercepte classiquement le bloc data de réussite par `.then(res => ...)` et l'erreur d'exceptions HTTP par son bloc garde-fou `.catch(err => ...)`.",
                objectives: [
                    "Théoriser pourquoi JS est Single-Thread Synchrone.",
                    "Saisir la puissance magique asynchrone de l'API navigateur WebAPI.",
                    "Construire formellement et manuellement `new Promise((resolve, reject) => {...})`."
                ],
                exercises: [
                    {
                        title: "Promesse Mathématique Simple",
                        description: "Assignez à une variable 'check' une Nouvelle Promesse (new Promise). Elle prendra en paramètres natifs les arguments fonctionnels resolve et reject, et exécutera toujours de suite la méthode fonction 'resolve(\"OK\")'.",
                        difficulty: "Difficile",
                        solution: "const check = new Promise((resolve, reject) => {\\n  resolve('OK');\\n});",
                        hints: ["L'instanciation de l'objet Promise demande le mot-clé class 'new', suivi des deux fonctions vitales (callbacks de control) dans son expression."]
                    }
                ],
                resources: []
            },
            {
                title: "2. La Révolution ES8 : Async / Await",
                description: "Muter l'apparence asynchrone complexe en un script synchrone ultra-lisible.",
                order: 2,
                duration: "6 heures",
                content: "L'escalade des syntaxes `.then().then().then()` produisait vite un code laborieux à déboguer humainement. L'introduction massive des mots clés de contrôle `async` et `await` modifie complètement le méta-paradigme. Toute fonction préfixée d'un `async` renvoie implicitement au compilateur une Promesse enrobée (même sans new Promise interne). À l'intérieur du corps (body) de cette fonction, le mot bloquant `await` force le moteur d'exécution local de la ligne à *suspendre son Threading propre logiquement* le temps d'attendre (Awaiting) que la tâche matérielle de fond se résolve intégralement ! L'équivalent humain strict est d'avoir du code séquentiel simple. On protègera cela en l'englobant fatalement d'un lourd bloc de gestion d'erreur formel en béton massif `try { ... } catch (error) { ... }`.",
                objectives: [
                    "Traduire formellement des blocs chaînes 'Then()' en code Linéaire Syncron-like 'Await'.",
                    "Sécuriser la capture d'erreur asynchrone d'API (Network Request) par bloc try/catch local.",
                    "Comprendre le piège du parallélisme avec blocage d'await cascades (l'appel de Promise.all)."
                ],
                exercises: [
                    {
                        title: "Récupération Suspendue (Try/Catch Local)",
                        description: "Dans une fonction async 'run', créez un bloc try contenant const res valant l'await de fetch('/data'), et un bloc catch(err) qui log l'erreur console.",
                        difficulty: "Difficile",
                        solution: "const run = async () => {\\n  try {\\n    const res = await fetch('/data');\\n  } catch (err) {\\n    console.log(err);\\n  }\\n};",
                        hints: ["Si fetch crash en réseau global, le JS est suspendu et déroute au catch local."]
                    }
                ],
                resources: []
            },
            {
                title: "3. Communication HTTP Mondiale : L'API Native Fetch",
                description: "Le composant crucial client-serveur pour le développement WEB REST.",
                order: 3,
                duration: "8 heures",
                content: "Pour que le FrontEnd (React/JSVanilla) discute avec un Backend (NodeJS/Django/Spring), le standard natif implémenté mondialement se nomme `fetch()`. Fetch lance une transmission en requête Request de méthode Verbe HTTP (GET par défaut passif) via le réseau TCP, puis ramène une Response. La particularité critique : c'est un flux Stream asynchrone brut illisible ! Pour extraire et lire l'enveloppe JSON matérielle venue du Backend, le JS Front exige une *seconde phase async* de transformation, d'où la syntaxe iconique double de décodage serveur (`await fetch('url')` PUIS `await reponseData.json()`). En cas de requête de mutation (création POST au Serveur, Update locale PUT), le fetch nécessite un Object Argument deuxième très lourd contenant le verbe Method, les Headers cruciaux ('Content-Type': 'application/json') et enfin le corps Stringifié formellement pour transfert ('body: JSON.stringify(object_js)').",
                objectives: [
                    "Décoder les méandres du flux REST Client-Serveur Bidirectionnel.",
                    "Saisir la subtilité absolue du stringify formel lors des mutations réseau backend Data.",
                    "Injecter méthodologiquement le Header formel 'Authorization: Bearer TokenJWT' pour accès route privée Admin."
                ],
                exercises: [
                    {
                        title: "Le Double Décodage Fetch Await API",
                        description: "Dans un bloc local, récupérez const res = await fetch('url'). Sur l'instruction stricte qui suit, créez et remplissez const donneesFormelles valant la Promesse décodée asyncrone matérielle locale issue de res.json() !",
                        difficulty: "Difficile",
                        solution: "const res = await fetch('url');\\nconst donneesFormelles = await res.json();",
                        hints: ["Ne JAMAIS oublier le fait mathématique que .json() renvoie elle-aussi d'elle-même une nouvelle Promesse demandant impérativement son Await."]
                    }
                ],
                resources: []
            },
            {
                title: "4. Concepts Ingénieurs JS : Closures (Fermetures) & Classes POO",
                description: "Pénétration absolue de l'architecture bas niveau (Lexical Environment) et syntaxe Orientée Objet ES2015+.",
                order: 4,
                duration: "8 heures",
                content: "Les fonctions JavaScript sont de Premières Class Citoyennes, c-à-d elles agissent comme n'importe variable. Plus troublant : la fonction enfant d'une autre fonction **se souviendra mathématiquement toujours éternellement des valeurs variables locales de sa mère**, *MÊME une fois que la fonction mère s'est finie et a été détruite du CallStack Garbage Collector* ! C'est ce miracle fondamental d'isolation mémoire qu'on appelle historiquement 'Closure'. Les patterns design de pointe en découlent (React Hooks useState natifs). Plus formellement aujourd'hui sur ES6, JS apporte du Syntactic Sugar avec l'intégration du système de Class type JAVA (`class Humain {}`), le polymorphisme d'héritage (`class Magicien extends Humain {}`), les constructeurs (`constructor(nom) {}`), et l'immuable encapsulation de classe `#methodeprivee` pour structurer logiquement les grosses applications complexes en Composants d'ingénierie Logicielle formels purs OOP.",
                objectives: [
                    "Identifier formellement des zones critiques Closures isolées (Privatisation Lexicale globale sans classe).",
                    "Construire, initier via Constructeur de Classe et hériter Polymorphe.",
                    "Invoquer avec super() l'instance de modèle constructeur classe de Parents globaux."
                ],
                exercises: [
                    {
                        title: "Syntaxe de Classe de Base (OOP Class)",
                        description: "Dans le scope, déclarez une class JS nommée simple 'User'. Déclarez à l'intérieur la méthode locale typique 'constructor(nom)' qui mettra formellement local sur scope 'this.name' l'argument reçu 'nom'.",
                        difficulty: "Moyen",
                        solution: "class User {\\n  constructor(nom) {\\n    this.name = nom;\\n  }\\n}",
                        hints: ["En Programmation Objet Classique JS, `this` invoque le contexte spatial de l'objet qui viendra plus tard en être formellement instancié nativement."]
                    }
                ],
                resources: []
            }
        ]
    }
];

module.exports = jsCourses;
