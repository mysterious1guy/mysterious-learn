const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  register,
  login,
  googleAuth,
  googleCallback,   // ← IMPORT AJOUTÉ
  verifyEmail,
  resendVerification,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  forgotPassword,
  resetPassword,
  nukeUsers,
  checkEmail,
  requestEmailChange,
  confirmEmailChange,
  getAppStats,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/google/callback', googleCallback);  // ← CORRIGÉ (utilise googleCallback)
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);
router.post('/check-email', checkEmail); // ← AJOUTÉ
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteAccount);
router.post('/change-password', protect, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Nouvelles routes de sécurité et stats
router.post('/request-email-change', protect, requestEmailChange);
router.post('/confirm-email-change', protect, confirmEmailChange);
router.get('/stats', getAppStats);
router.post('/profile-picture', protect, updateProfile); // Utilise updateProfile pour l'instant car il gère déjà l'avatar

module.exports = router;