const fs = require('fs');
const path = require('path');

// Données de cours intégrées directement en fallback
const FALLBACK_COURSES = [
  {
    "_id": "algo_pilot",
    "id": "algo_pilot",
    "title": "Algorithmique : Penser comme un Pro",
    "description": "Ne tape plus de code au hasard. Apprends à décomposer les problèmes de manière logique. C'est la compétence la plus précieuse d'un développeur.",
    "category": "Fondamentaux",
    "level": "Débutant",
    "duration": "5h",
    "image": "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    "rating": 4.9,
    "students": 4250,
    "language": "Français",
    "tags": ["algorithmique", "logique", "bases"],
    "chapters": [
      {
        "id": "ch1",
        "title": "1. L'Art de la Recette",
        "description": "Comprendre ce qu'est un algorithme sans écrire une seule ligne de code technique.",
        "duration": "15 min",
        "objectives": ["Comprendre le concept d'instruction", "Distinguer les entrées des sorties"],
        "modules": [
          {
            "id": "m1_1",
            "type": "text",
            "title": "Qu'est-ce qu'un algorithme ?",
            "content": "### La cuisine du code\n\nOublie les mathématiques compliquées. Un algorithme, c'est **exactement comme une recette de cuisine**.\n\nQuand tu veux faire des crêpes, tu suis des étapes dans un ordre précis :\n1. Mettre de la farine.\n2. Ajouter des œufs.\n3. Verser le lait.\n\nSi tu verses le lait avant de mettre la poêle, ça va faire un désastre. En programmation, c'est pareil. L'ordinateur est extrêmement bête, il a besoin d'instructions **claires, ordonnées et finies**."
          },
          {
            "id": "m1_2",
            "type": "quiz",
            "title": "Test de logique",
            "question": "Si tu instructs un robot de te faire du thé, quelle est la MEILLEURE suite d'instructions ?",
            "options": [
              "Faire chauffer l'eau. Boire. Mettre le sachet.",
              "Mettre l'eau dans la tasse. Ajouter le sachet. Servir.",
              "Faire chauffer l'eau. Mettre le sachet dans la tasse. Verser l'eau chaude. Attendre. Servir."
            ],
            "answerIndex": 2,
            "explanation": "Exactement ! L'ordre chronologique et logique est indispensable en algorithmique."
          }
        ]
      },
      {
        "id": "ch2",
        "title": "2. Les Variables : Tes boîtes à souvenirs",
        "description": "Comment l'ordinateur se souvient-il des choses ?",
        "duration": "25 min",
        "objectives": ["Déclarer une variable", "Modifier son contenu", "Comprendre les types simples"],
        "modules": [
          {
            "id": "m2_1",
            "type": "text",
            "title": "La boîte mémoire",
            "content": "Imagine que tu joues à un jeu vidéo. Où est enregistré ton score ? Dans une **variable**.\n\nUne variable est simplement une **boîte** qui porte une étiquette (le nom) et qui contient quelque chose (la valeur).\n\nEn Pseudo-code, on l'écrit souvent ainsi :\n```\nVariable score = 0\nVariable pseudo = \"Gamer99\"\n```\nLe contenu de cette boîte peut changer (varier) au cours du temps, d'où le nom *variable*."
          },
          {
            "id": "m2_2",
            "type": "code",
            "title": "À toi de jouer !",
            "description": "Changeons de score ! Crée une variable nommée `score` et donne-lui la valeur `100`.",
            "language": "javascript",
            "initialCode": "// Modifie la ligne en dessous\nlet score = 0;\n",
            "solution": "let score = 100;",
            "testRegex": "let\\s+score\\s*=\\s*100;?"
          }
        ]
      }
    ]
  },
  {
    "_id": "course_2",
    "id": "course_2",
    "title": "Développement Web React",
    "description": "Maîtrisez React pour créer des applications web modernes et interactives.",
    "category": "Frontend",
    "level": "Intermédiaire",
    "duration": "12h",
    "image": "https://images.unsplash.com/photo-16333561206-a2e3f2b8e8c?w=400",
    "rating": 4.9,
    "students": 1856,
    "language": "Français",
    "tags": ["react", "javascript", "frontend"],
    "chapters": [
      {
        "id": "ch1",
        "title": "Introduction à React",
        "description": "Les bases de React et ses concepts fondamentaux",
        "content": "React est une bibliothèque JavaScript pour créer des interfaces...",
        "objectives": ["Comprendre les composants", "Gérer l'état", "Utiliser les hooks"],
        "exercises": [
          {
            "id": "ex1",
            "title": "Créer votre premier composant",
            "description": "Créez un composant simple avec React",
            "solution": "function Welcome() { return <h1>Bonjour</h1>; }"
          }
        ],
        "resources": [
          {
            "title": "Documentation React",
            "url": "https://react.dev"
          }
        ]
      }
    ]
  },
  {
    "_id": "course_3",
    "id": "course_3",
    "title": "Bases de Données SQL",
    "description": "Apprenez à concevoir et interroger des bases de données relationnelles avec SQL.",
    "category": "Backend",
    "level": "Débutant",
    "duration": "10h",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc711?w=400",
    "rating": 4.7,
    "students": 1523,
    "language": "Français",
    "tags": ["sql", "base de données", "backend"],
    "chapters": [
      {
        "id": "ch1",
        "title": "Introduction aux Bases de Données",
        "description": "Comprendre les concepts fondamentaux des bases de données",
        "content": "Une base de données est une collection organisée d'informations...",
        "objectives": ["Comprendre le modèle relationnel", "Maîtriser les requêtes SQL"],
        "exercises": [
          {
            "id": "ex1",
            "title": "Requête SELECT simple",
            "description": "Écrivez une requête pour sélectionner des données",
            "solution": "SELECT * FROM utilisateurs WHERE age > 18;"
          }
        ],
        "resources": [
          {
            "title": "Tutoriel SQL",
            "url": "https://sql.sh"
          }
        ]
      }
    ]
  }
];

// Fallback controller pour quand MongoDB n'est pas disponible
const getAllCoursesFallback = async (req, res) => {
  try {
    console.log('🔄 Using hardcoded fallback courses data');

    // Utiliser les données intégrées directement
    let filteredCourses = FALLBACK_COURSES;

    // Filtrage
    const { category, level, search } = req.query;
    if (category) {
      filteredCourses = filteredCourses.filter(course => course.category === category);
    }
    if (level) {
      filteredCourses = filteredCourses.filter(course => course.level === level);
    }
    if (search) {
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    console.log(`📊 Returning ${filteredCourses.length} courses`);
    res.json(filteredCourses);
  } catch (error) {
    console.error('Erreur fallback:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getCourseByIdFallback = async (req, res) => {
  try {
    console.log('🔄 Using hardcoded fallback for course by ID');

    // Utiliser les données intégrées directement
    const course = FALLBACK_COURSES.find(c => c._id === req.params.id || c.id === req.params.id);

    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Cours non trouvé' });
    }
  } catch (error) {
    console.error('Erreur fallback:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const getCategoriesFallback = async (req, res) => {
  try {
    console.log('🔄 Using hardcoded fallback for categories');

    // Utiliser les données intégrées directement
    const categories = [...new Set(FALLBACK_COURSES.map(course => course.category))];
    res.json(categories);
  } catch (error) {
    console.error('Erreur fallback:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  FALLBACK_COURSES,
  getAllCoursesFallback,
  getCourseByIdFallback,
  getCategoriesFallback
};
