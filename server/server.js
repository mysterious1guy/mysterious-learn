// 1. Importations
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

// 2. Connexion à MongoDB
connectDB();

const app = express();

// Configuration pour Render/Proxy
app.set('trust proxy', 1);

// 2. Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));

// Middleware de logging pour débugger les boucles
app.use((req, res, next) => {
  console.log(`🔄 ${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 3. Routes API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/2fa', require('./routes/twoFactorRoutes'));
app.use('/api/activity', require('./routes/activityRoutes'));
app.use('/api/debug', require('./routes/debugRoutes'));
app.use('/api/live-monitor', require('./routes/liveMonitorRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));


// 4. Gestion des fichiers statiques
const rootDir = path.resolve(__dirname, '..');
app.use(express.static(path.join(rootDir, 'dist')));

// Route de base pour tester l'API
app.get('/api/status', (req, res) => {
  res.json({ message: 'L\'API Mysterious Learn est en ligne' });
});

// 5. La "Route Secours" pour le frontend (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'dist', 'index.html'));
});

// 6. Démarrage du serveur
const PORT = process.env.PORT || 10000; // Render utilise souvent 10000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
  console.log(`📂 Dossier racine : ${__dirname}`);
});
