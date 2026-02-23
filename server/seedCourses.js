require('dotenv').config();
const mongoose = require('mongoose');

// Configuration robuste pour Render
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI non défini dans les variables d'environnement");
    }

    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
    };

    if (mongoose.connection.readyState === 1) {
      console.log('✅ Mongoose déjà connecté');
      return true;
    }

    await mongoose.connect(mongoURI, options);
    console.log('✅ Connexion à MongoDB réussie');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    return false;
  }
};
const Course = require('./models/Course');

const coursesData = require('./data/courses/index');

async function seedCourses(closeConnection = true) {
  try {
    const isConnected = await connectDB();

    if (isConnected) {
      // Connexion réussie - utiliser MongoDB
      console.log('🗑️ Collection courses vidée');

      // S'assurer que chaque cours a son identifiant métier 'id'
      const coursesToInsert = coursesData.map(c => ({
        ...c,
        id: c.id || c._id // Assurer la présence du champ 'id' métier
      }));

      await Course.insertMany(coursesToInsert);
      console.log(`✅ ${coursesToInsert.length} cours insérés avec succès dans MongoDB`);
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
      console.log("⚠️ L'application utilisera ce fichier en fallback si MongoDB n'est pas disponible");
    }

    if (closeConnection) {
      mongoose.connection.close();
      console.log('🔌 Connexion fermée');
    }
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error.message);
    if (closeConnection) {
      process.exit(1);
    }
  }
}

if (require.main === module) {
  seedCourses();
}

module.exports = seedCourses;
