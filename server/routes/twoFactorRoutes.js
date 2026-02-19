const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  enableTwoFactor,
  verifyTwoFactor,
  disableTwoFactor,
  verifyTwoFactorLogin,
  getTwoFactorStatus,
  regenerateBackupCodes
} = require('../controllers/twoFactorController');

const router = express.Router();

// Routes publiques (pour la vérification login)
router.post('/login-verify', verifyTwoFactorLogin);

// Routes protégées (nécessitent une authentification)
router.use(protect);

router.get('/status', getTwoFactorStatus);
router.post('/enable', enableTwoFactor);
router.post('/verify', verifyTwoFactor);
router.post('/disable', disableTwoFactor);
router.post('/regenerate-backup-codes', regenerateBackupCodes);

module.exports = router;
