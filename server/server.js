require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); 

// 1. Connexion à MongoDB
connectDB();

const app = express();

// 2. Middlewares
app.use(cors({ 
  origin: process.env.CLIENT_URL || '*', 
  credentials: true 
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 3. Routes API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// 4. Gestion des fichiers statiques
const rootDir = path.resolve(); 
app.use(express.static(path.join(rootDir, 'dist')));

// Route de base pour tester l'API
app.get('/api/status', (req, res) => {
  res.json({ message: 'L\'API Mysterious Learn est en ligne' });
});

// 5. La "Route Secours" (Syntaxe compatible Node 22+)
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(rootDir, 'dist', 'index.html'));
});

// 6. Démarrage du serveur
const PORT = process.env.PORT || 10000; // Render utilise souvent 10000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
  console.log(`📂 Dossier racine : ${rootDir}`);
});
