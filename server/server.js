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

const coursesData = require('./data/courses/index');

const User = require('./models/User');

connectDB().then(async () => {
  try {
    const superAdmin = await User.findOne({ email: 'mouhamedfall@esp.sn' });
    if (superAdmin) {
      superAdmin.firstName = 'Mouhamed';
      superAdmin.lastName = 'FALL';
      superAdmin.name = 'Mouhamed FALL';
      superAdmin.completedQuests = [];
      superAdmin.unlockedCourses = [];
      await superAdmin.save();
      console.log('✅ Profil Super Admin mouhamedfall@esp.sn nettoyé avec succès !');
    }

    const count = await Course.countDocuments();
    if (count !== coursesData.length) {
      console.log(`⚙️ Base de données désynchronisée (${count} cours trouvés, ${coursesData.length} obligatoires). Lancement de la table rase et de l'auto-seeding...`);
      try {
        await Course.collection.dropIndexes();
        console.log('🧹 Index de la collection Course supprimés avec succès pour réinitialisation');
      } catch (indexError) {
        console.log('⚠️ Erreur/Avertissement lors de la suppression des index Course:', indexError.message);
      }
      await Course.deleteMany({}); // Purger l'existant
      await seedCourses(false);
    }
  } catch (e) {
    console.error('❌ Erreur lors de l\'auto-seeding:', e.message);
  }
});

const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Configuration pour Render/Proxy
app.set('trust proxy', 1);

// --- SÉCURITÉ DE L'API ---
// 1. Protection des en-têtes HTTP (anti-clickjacking, anti-XSS de base, etc.)
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// 2. Assainissement des requêtes pour bloquer les injections NoSQL (ex: requêtes contenant {$gt: ""})
app.use(mongoSanitize());

// 3. Limiteur de requêtes global sur l'API (Protection DDoS)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 250, // Limite chaque adresse IP à 250 requêtes par 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Trop de requêtes de votre part. Veuillez patienter 15 minutes avant de réessayer.' }
});
app.use('/api/', apiLimiter);

// 4. Limiteur ultra-strict pour l'authentification (Anti-Brute Force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limite à 20 tentatives de connexion / inscription par 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Sécurité : Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.' }
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/resend-verification', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);

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

// Route spéciale Stripe Webhook (doit préserver le corps brut)
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), require('./controllers/paymentController').webhook);

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
app.use('/api/seed', require('./routes/seedRoutes')); // Temporary route to force update of database
app.use('/api/payment', require('./routes/paymentRoutes'));

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
