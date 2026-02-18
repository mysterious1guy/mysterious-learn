require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // ← import correct

// Connexion à MongoDB
connectDB(); // ← appel de la fonction

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));

// Route de base
app.get('/', (req, res) => {
  res.send('API Mysterious Learn fonctionne');
});

const PORT = process.env.PORT || 5000;
const path = require('path');
const _dirname = path.resolve();

// Sert les fichiers statiques du dossier 'dist' (généré par Vite)
app.use(express.static(path.join(_dirname, 'dist')));

// Pour toutes les autres routes, renvoie l'index.html du front
app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, 'dist', 'index.html'));
});
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
