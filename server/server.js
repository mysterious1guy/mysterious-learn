// 1. Initialisation Environnement
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

// 2. Connexion à MongoDB & Services
const Course = require('./models/Course');
const seedCourses = require('./seedCourses');

connectDB().then(async () => {
  try {
    const count = await Course.countDocuments();
    if (count !== 50) {
      console.log(`⚙️ Base de données désynchronisée (${count} cours trouvés, 50 obligatoires). Lancement de l'auto-seeding...`);
      await Course.deleteMany({}); // Purger l'existant
      await seedCourses(false);
    }
  } catch (e) {
    console.error('❌ Erreur lors de l\'auto-seeding:', e.message);
  }
});

const app = express();

// Configuration pour Render/Proxy
app.set('trust proxy', 1);

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));

// Middleware de logging
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
app.use('/api/site-config', require('./routes/siteConfigRoutes'));
app.use('/api/course-knowledge', require('./routes/courseKnowledgeRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

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
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});

// 7. Auto-Ping to keep Render awake (Free Tier)
const https = require('https');
const RENDER_SERVICE_NAME = process.env.RENDER_SERVICE_NAME;
const RENDER_URL = process.env.RENDER_URL || (RENDER_SERVICE_NAME ? `https://${RENDER_SERVICE_NAME}.onrender.com/api/status` : null);

if (RENDER_URL) {
  setInterval(() => {
    https.get(RENDER_URL, (res) => {
      console.log(`🚀 Ping de réveil réussi: ${res.statusCode}`);
    }).on('error', (err) => {
      console.log('⚠️ Erreur ping de réveil:', err.message);
    });
  }, 14 * 60 * 1000); // 14 mins
}
