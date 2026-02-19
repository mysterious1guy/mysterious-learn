const fs = require('fs');
const path = require('path');

// Données de cours intégrées directement en fallback
const FALLBACK_COURSES = [
  {
    "_id": "course_1",
    "id": "course_1",
    "title": "Introduction à l'Algorithmique",
    "description": "Apprenez les bases fondamentales de l'algorithmique avec des exemples concrets et des exercices pratiques.",
    "category": "Théorie",
    "level": "Débutant",
    "duration": "8h",
    "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
    "rating": 4.8,
    "students": 2341,
    "language": "Français",
    "tags": ["algorithmique", "programmation", "bases"],
    "chapters": [
      {
        "id": "ch1",
        "title": "Introduction aux Algorithmes",
        "description": "Découvrez ce qu'est un algorithme et son importance",
        "content": "Un algorithme est une suite finie d'instructions...",
        "objectives": ["Comprendre la notion d'algorithme", "Analyser des problèmes simples"],
        "exercises": [
          {
            "id": "ex1",
            "title": "Votre premier algorithme",
            "description": "Écrivez un algorithme pour trouver le maximum",
            "solution": "function findMax(array) { let max = array[0]; ... }"
          }
        ],
        "resources": [
          {
            "title": "Documentation MDN",
            "url": "https://developer.mozilla.org/fr/docs/Web/JavaScript"
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
  getAllCoursesFallback,
  getCourseByIdFallback,
  getCategoriesFallback
};
