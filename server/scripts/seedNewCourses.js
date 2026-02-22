require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("../models/Course");
const data = require("../data/courses/index");
const fs = require('fs');
const path = require('path');

// Script that deletes all courses and inserts the generated interactive catalog
// with robust fallback to JSON if MongoDB fails
async function seedDB() {
    let isConnected = false;
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("No MONGO_URI in .env");
        }

        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("✅ Connexion à MongoDB réussie.");
        isConnected = true;

        // Deleting existing courses
        await Course.deleteMany({});
        console.log("🗑️ Collection Course vidée.");

        await Course.insertMany(data);
        console.log(`🚀 ${data.length} cours majeurs (multi-niveaux) ont été insérés dans MongoDB.`);

        mongoose.connection.close();
        console.log("🔌 Connexion fermée.");
        process.exit(0);

    } catch (error) {
        console.error("❌ Erreur lors de la migration MongoDB:", error.message);

        // Échec de la connexion, utiliser le Fallback
        console.log('📁 Création des données de démonstration en JSON (Fallback)...');

        const dataDir = path.join(__dirname, '../data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Ajouter des IDs aux cours pour le fallback
        const coursesWithIds = data.map((course, index) => ({
            ...course,
            _id: `course_${index + 1}`,
            id: `course_${index + 1}`
        }));

        // Sauvegarder les cours en JSON
        fs.writeFileSync(
            path.join(dataDir, 'courses.json'),
            JSON.stringify(coursesWithIds, null, 2)
        );

        console.log('📄 Données sauvegardées dans /server/data/courses.json');
        console.log("⚠️ L'application utilisera ce fichier en fallback.");

        if (isConnected) {
            mongoose.connection.close();
        }
        process.exit(0);
    }
}

seedDB();
