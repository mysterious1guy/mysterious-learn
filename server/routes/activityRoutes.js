const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  trackLogin,
  trackLogout,
  trackPageActivity,
  trackCourseProgress,
  getUserStats,
  getGlobalStats
} = require('../controllers/activityController');

const router = express.Router();

// Routes publiques (pour le tracking)
router.post('/login', trackLogin);
router.post('/logout', trackLogout);
router.post('/track', trackPageActivity);
router.post('/course-progress', trackCourseProgress);

// Routes protégées
router.use(protect);
router.get('/user-stats/:userId', getUserStats);
router.get('/global-stats', getGlobalStats);

module.exports = router;
