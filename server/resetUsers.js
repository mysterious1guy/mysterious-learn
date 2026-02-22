require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const PendingUser = require("./models/PendingUser");
const Progress = require("./models/Progress");
const TwoFactorAuth = require("./models/TwoFactorAuth");

async function resetDB() {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("No MONGO_URI in .env");
        }

        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("✅ Connexion à MongoDB réussie pour le Reset.");

        // Deleting all documents
        await User.deleteMany({});
        console.log("🗑️ Collection User vidée.");

        await PendingUser.deleteMany({});
        console.log("🗑️ Collection PendingUser vidée.");

        await Progress.deleteMany({});
        console.log("🗑️ Collection Progress vidée.");

        await TwoFactorAuth.deleteMany({});
        console.log("🗑️ Collection TwoFactorAuth vidée.");

        console.log("🚀 Reset total de la base de données terminé. L'application est vierge pour la mise en production.");

        mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error("❌ Erreur lors du reset MongoDB:", error.message);
        process.exit(1);
    }
}

resetDB();
