const express = require('express');
const { protect, admin, ownerAdmin } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  deleteUser,
  sendEmailToUsers,
  sendNotificationToUsers,
  getAdminStats,
  updateUserRole,
  toggleUserBan,
  updateUserLevel,
  getAllNotifications,
  deleteNotification
} = require('../controllers/adminController');

const router = express.Router();

router.use(protect);

// Routes utilisateurs (Owner Only)
router.get('/users', ownerAdmin, getAllUsers);
router.delete('/users/:id', ownerAdmin, deleteUser);
router.put('/users/:id/role', ownerAdmin, updateUserRole);
router.put('/users/:id/ban', ownerAdmin, toggleUserBan);
router.put('/users/:id/level', ownerAdmin, updateUserLevel);

// Routes communications (Owner Only for sending/deleting)
router.post('/send-email', ownerAdmin, sendEmailToUsers);
router.post('/send-notification', ownerAdmin, sendNotificationToUsers);
router.delete('/notifications/:id', ownerAdmin, deleteNotification);

// Accessible by standard Admin
router.get('/notifications', admin, getAllNotifications);
router.get('/stats', admin, getAdminStats);

module.exports = router;
