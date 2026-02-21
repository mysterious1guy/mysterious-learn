require('dotenv').config();
const mongoose = require('mongoose');

// Configuration robuste pour Render
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI non défini dans les variables d\'environnement');
    }

    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
    };

    await mongoose.connect(mongoURI, options);
    console.log('✅ Connexion à MongoDB réussie');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);

    // En cas d'échec, créer des données de démonstration locales
    console.log('📁 Création des données de démonstration en JSON...');
    const fs = require('fs');
    const path = require('path');

    // Créer le dossier data s'il n'existe pas
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Ajouter des IDs aux cours pour le fallback
    const coursesWithIds = coursesData.map((course, index) => ({
      ...course,
      _id: `course_${index + 1}`,
      id: `course_${index + 1}`
    }));

    // Sauvegarder les cours en JSON
    fs.writeFileSync(
      path.join(dataDir, 'courses.json'),
      JSON.stringify(coursesWithIds, null, 2)
    );

    console.log('📄 Données sauvegardées dans /data/courses.json');
    console.log('⚠️ L\'application utilisera ce fichier en fallback si MongoDB n\'est pas disponible');
    return false;
  }
};
const Course = require('./models/Course');

const coursesData = [
  {
    title: "Introduction à l'Algorithmique",
    description: "Apprenez les bases fondamentales de l'algorithmique avec des exemples concrets et des exercices pratiques.",
    category: "Théorie",
    level: "Débutant",
    duration: "8h",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
    rating: 4.8,
    students: 2341,
    tags: ["algorithmique", "bases", "débutant"],
    chapters: [
      {
        title: "Introduction aux Algorithmes",
        description: "Découvrez ce qu'est un algorithme et pourquoi c'est fondamental en programmation",
        order: 1,
        duration: "45min",
        content: "Un algorithme est une suite d'instructions précises qui résout un problème spécifique...",
        objectives: ["Comprendre la notion d'algorithme", "Reconnaître les algorithmes du quotidien"],
        exercises: [
          {
            title: "Identifier les algorithmes",
            description: "Trouvez des exemples d'algorithmes dans votre vie quotidienne",
            difficulty: "Facile",
            solution: "Exemples: recette de cuisine, itinéraire GPS, tri de cartes..."
          }
        ]
      },
      {
        title: "Variables et Types de Données",
        description: "Apprenez à stocker et manipuler différentes sortes de données",
        order: 2,
        duration: "60min",
        content: "Les variables sont comme des boîtes qui stockent des informations...",
        objectives: ["Déclarer des variables", "Comprendre les types de base"],
        exercises: [
          {
            title: "Calculatrice simple",
            description: "Créez un algorithme qui effectue des opérations mathématiques",
            difficulty: "Facile",
            solution: "Utiliser des variables pour stocker les nombres et les opérateurs pour calculer"
          }
        ]
      }
    ]
  },
  {
    id: "c",
    title: "Langage C pour Débutants",
    description: "Maîtrisez les fondamentaux du langage C, base de nombreux autres langages de programmation.",
    category: "Programmation",
    level: "Débutant",
    duration: "12h",
    image: "https://images.unsplash.com/photo-1516116216624-98e6e351d85e?w=400",
    rating: 4.8,
    students: 1540,
    tags: ["C", "programmation", "mémoire", "bas niveau"],
    chapters: [
      {
        title: "Premiers Pas en C",
        description: "Installation et premier programme Hello World.",
        order: 1,
        duration: "30min",
        content: "Le langage C a été créé dans les années 70. Il est le père de nombreux langages modernes...",
        objectives: ["Comprendre la compilation", "Écrire un Hello World"],
        exercises: [
          {
            title: "Votre premier code",
            description: "Écrivez un programme qui affiche 'Hello, World!'",
            difficulty: "Facile",
            solution: "#include <stdio.h>\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}"
          }
        ]
      }
    ]
  },

  {
    title: "Python Complet",
    description: "De zéro à expert : apprenez Python avec des projets pratiques et des concepts avancés",
    category: "Programmation",
    level: "Débutant",
    duration: "15h",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
    rating: 4.9,
    students: 3124,
    tags: ["python", "data science", "IA"],
    chapters: [
      {
        title: "Introduction à Python",
        description: "Découvrez pourquoi Python est le langage parfait pour débuter",
        order: 1,
        duration: "40min",
        content: "Python a été créé par Guido van Rossum en 1991...",
        objectives: ["Installer Python", "Comprendre la syntaxe de base"],
        exercises: [
          {
            title: "Premier script Python",
            description: "Écrivez un script qui affiche votre nom",
            difficulty: "Facile",
            solution: "print('Votre nom')"
          }
        ]
      }
    ]
  },
  {
    title: "JavaScript Moderne",
    description: "Apprenez JavaScript ES6+ et construisez des applications web interactives",
    category: "Web",
    level: "Intermédiaire",
    duration: "10h",
    image: "https://images.unsplash.com/photo-1579468458835-cd73b7b7dfd5?w=400",
    rating: 4.8,
    students: 2567,
    tags: ["javascript", "web", "ES6"],
    chapters: [
      {
        title: "Fondamentaux JavaScript",
        description: "Maîtrisez les bases du langage qui fait vivre le web",
        order: 1,
        duration: "50min",
        content: "JavaScript est le langage de programmation du web...",
        objectives: ["Comprendre la syntaxe JS", "Manipuler le DOM"],
        exercises: [
          {
            title: "Calculatrice web",
            description: "Créez une calculatrice simple avec HTML et JavaScript",
            difficulty: "Moyen",
            solution: "Utiliser les événements et les fonctions JavaScript"
          }
        ]
      }
    ]
  },
  {
    title: "React Avancé",
    description: "Construisez des applications web modernes avec React, Hooks et les meilleures pratiques",
    category: "Web",
    level: "Avancé",
    duration: "20h",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee5?w=400",
    rating: 4.9,
    students: 1432,
    tags: ["react", "hooks", "frontend"],
    chapters: [
      {
        title: "React et Composants",
        description: "Comprendre l'architecture basée sur les composants",
        order: 1,
        duration: "60min",
        content: "React est une bibliothèque JavaScript pour créer des interfaces...",
        objectives: ["Créer des composants", "Comprendre le state et props"],
        exercises: [
          {
            title: "Compteur React",
            description: "Créez votre premier composant React avec état",
            difficulty: "Moyen",
            solution: "Utiliser useState pour gérer le compteur"
          }
        ]
      }
    ]
  },
  {
    title: "Bases de Données SQL",
    description: "Apprenez à concevoir et interroger des bases de données relationnelles avec SQL",
    category: "Data",
    level: "Intermédiaire",
    duration: "14h",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    rating: 4.6,
    students: 1893,
    tags: ["SQL", "bases de données", "MySQL"],
    chapters: [
      {
        title: "Introduction aux Bases de Données",
        description: "Comprendre le modèle relationnel et les concepts fondamentaux",
        order: 1,
        duration: "45min",
        content: "Une base de données est une collection organisée de données...",
        objectives: ["Comprendre le modèle relationnel", "Connaître les types de relations"],
        exercises: [
          {
            title: "Conception simple",
            description: "Concevez une base de données pour une bibliothèque",
            difficulty: "Moyen",
            solution: "Créer des tables Livres, Auteurs, Emprunts avec relations"
          }
        ]
      }
    ]
  }
];

async function seedCourses() {
  try {
    const isConnected = await connectDB();

    if (isConnected) {
      // Connexion réussie - utiliser MongoDB
      await Course.deleteMany({});
      console.log('🗑️ Collection courses vidée');

      await Course.insertMany(coursesData);
      console.log(`✅ ${coursesData.length} cours insérés avec succès dans MongoDB`);
    } else {
      // Échec connexion - créer fichier JSON de démonstration
      console.log('📁 Création des données de démonstration en JSON...');
      const fs = require('fs');
      const path = require('path');

      // Créer le dossier data s'il n'existe pas
      const dataDir = path.join(__dirname, '../data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Sauvegarder les cours en JSON
      fs.writeFileSync(
        path.join(dataDir, 'courses.json'),
        JSON.stringify(coursesData, null, 2)
      );

      console.log('📄 Données sauvegardées dans /data/courses.json');
      console.log('⚠️ L\'application utilisera ce fichier en fallback si MongoDB n\'est pas disponible');
    }

    mongoose.connection.close();
    console.log('🔌 Connexion fermée');
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  seedCourses();
}

module.exports = seedCourses;
