const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  deleteUser,
  sendEmailToUsers,
  sendNotificationToUsers,
  getAdminStats,
  updateUserRole,
  toggleUserBan
} = require('../controllers/adminController');

const router = express.Router();

// Toutes les routes admin nécessitent une authentification et des droits admin
router.use(protect);
router.use(admin);

// Routes utilisateurs
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id/ban', toggleUserBan);

// Routes communications
router.post('/send-email', sendEmailToUsers);
router.post('/send-notification', sendNotificationToUsers);

// Routes statistiques
router.get('/stats', getAdminStats);

module.exports = router;
