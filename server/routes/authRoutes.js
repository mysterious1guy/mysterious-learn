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
  checkEmail, // ← AJOUTÉ
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

module.exports = router;