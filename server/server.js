require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); 

// 1. Connexion à MongoDB
connectDB();

const app = express();

// 2. Middlewares
// On autorise le CORS pour ton frontend
app.use(cors({ 
  origin: process.env.CLIENT_URL || '*', 
  credentials: true 
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 3. Routes API (Important : elles doivent être AVANT les fichiers statiques)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));

// 4. Gestion des fichiers statiques (Frontend Vite)
// __dirname est le dossier actuel. On remonte d'un cran si nécessaire.
const rootDir = path.resolve(); 

// Sert les fichiers du dossier 'dist'
app.use(express.static(path.join(rootDir, 'dist')));

// Route de base pour tester l'API
app.get('/api/status', (req, res) => {
  res.json({ message: 'L\'API Mysterious Learn est en ligne' });
});

// 5. La "Route Secours" : Renvoie l'index.html pour toutes les autres requêtes
// (Essentiel pour que React/Vue/Vite gère le routage côté client)
app.get('/:any*', (req, res) => {
  const indexPath = path.join(rootDir, 'dist', 'index.html');
  res.sendFile(indexPath);
});

// 6. Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
  console.log(`📂 Dossier racine : ${rootDir}`);
});
