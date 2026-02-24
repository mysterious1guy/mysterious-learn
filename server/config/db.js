const mongoose = require('mongoose');

const connectDB = async (retryCount = 0) => {
  const maxRetries = 5;
  const retryDelay = Math.min(Math.pow(2, retryCount) * 1000, 30000);

  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    };

    if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(mongoURI, options);
    console.log('✅ MongoDB connecté avec succès');
  } catch (err) {
    console.error(`❌ Erreur connexion MongoDB (tentative ${retryCount + 1}/${maxRetries}):`, err.message);

    if (retryCount < maxRetries) {
      console.log(`🔄 Nouvelle tentative dans ${retryDelay / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return connectDB(retryCount + 1);
    } else {
      console.error('💥 Impossible de se connecter après plusieurs tentatives. Arrêt du processus.');
      process.exit(1);
    }
  }
};

module.exports = connectDB;