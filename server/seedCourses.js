require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Course = require('./models/Course');

const coursesData = require('./data/courses/index');

async function seedCourses(closeConnection = true) {
  try {
    const isConnected = await connectDB();

    if (isConnected || mongoose.connection.readyState === 1) {
      // Connexion réussie - utiliser MongoDB
      console.log('🗑️ Collection courses vidée');
      try {
        await Course.collection.dropIndexes();
      } catch (e) {
        // Ignorer si les index n'existent pas encore
      }

      // S'assurer que chaque cours a son identifiant métier 'id' et ses chapitres conformes
      const coursesToInsert = coursesData.map(c => ({
        ...c,
        id: c.id || c._id,
        chapters: (c.chapters || []).map((ch, idx) => ({
          ...ch,
          order: ch.order || (idx + 1),
          duration: ch.duration || '15 min',
          content: ch.content || 'Contenu à venir...'
        }))
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
