const User = require('../models/User');
const TwoFactorAuth = require('../models/TwoFactorAuth');
const smsService = require('../services/smsService');
const jwt = require('jsonwebtoken');

// @desc    Activer la 2FA pour un utilisateur
// @route   POST /api/2fa/enable
const enableTwoFactor = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const userId = req.user._id;

    // Valider le numéro de téléphone
    const formattedPhone = smsService.formatPhoneNumber(phoneNumber);
    if (!smsService.validatePhoneNumber(formattedPhone)) {
      return res.status(400).json({ 
        message: 'Numéro de téléphone invalide' 
      });
    }

    // Vérifier si le numéro n'est pas déjà utilisé
    const existingPhone = await TwoFactorAuth.findOne({ 
      phoneNumber: formattedPhone,
      userId: { $ne: userId }
    });
    
    if (existingPhone) {
      return res.status(400).json({ 
        message: 'Ce numéro de téléphone est déjà utilisé' 
      });
    }

    // Créer ou mettre à jour la configuration 2FA
    let twoFactor = await TwoFactorAuth.findOne({ userId });
    
    if (!twoFactor) {
      twoFactor = new TwoFactorAuth({
        userId,
        phoneNumber: formattedPhone
      });
    } else {
      twoFactor.phoneNumber = formattedPhone;
    }

    // Générer et envoyer le code de vérification
    const verificationCode = twoFactor.generateVerificationCode();
    await twoFactor.save();

    const smsResult = await smsService.sendVerificationCode(
      formattedPhone, 
      verificationCode
    );

    if (!smsResult.success) {
      return res.status(500).json({ 
        message: 'Erreur lors de l\'envoi du SMS',
        error: smsResult.error 
      });
    }

    res.json({ 
      message: 'Code de vérification envoyé',
      phoneNumber: formattedPhone,
      simulated: smsResult.simulated
    });
  } catch (error) {
    console.error('Erreur activation 2FA:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Vérifier le code et activer 2FA
// @route   POST /api/2fa/verify
const verifyTwoFactor = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user._id;

    const twoFactor = await TwoFactorAuth.findOne({ userId });
    
    if (!twoFactor) {
      return res.status(400).json({ 
        message: 'Configuration 2FA non trouvée' 
      });
    }

    // Vérifier si le compte est bloqué
    if (twoFactor.lockUntil && twoFactor.lockUntil > Date.now()) {
      return res.status(429).json({ 
        message: 'Compte temporairement bloqué. Réessayez plus tard.' 
      });
    }

    if (twoFactor.verifyCode(code)) {
      twoFactor.isVerified = true;
      twoFactor.isEnabled = true;
      twoFactor.lastUsed = new Date();
      
      // Générer des codes de secours
      const backupCodes = twoFactor.generateBackupCodes();
      await twoFactor.save();

      res.json({ 
        message: '2FA activée avec succès',
        backupCodes // Ne renvoyer qu'une seule fois
      });
    } else {
      await twoFactor.save();
      res.status(400).json({ 
        message: 'Code invalide',
        attemptsLeft: 3 - twoFactor.loginAttempts
      });
    }
  } catch (error) {
    console.error('Erreur vérification 2FA:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Désactiver la 2FA
// @route   POST /api/2fa/disable
const disableTwoFactor = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user._id;

    // Vérifier le mot de passe
    const user = await User.findById(userId);
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ 
        message: 'Mot de passe incorrect' 
      });
    }

    await TwoFactorAuth.findOneAndDelete({ userId });

    res.json({ 
      message: '2FA désactivée avec succès' 
    });
  } catch (error) {
    console.error('Erreur désactivation 2FA:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Vérifier la 2FA lors de la connexion
// @route   POST /api/2fa/login-verify
const verifyTwoFactorLogin = async (req, res) => {
  try {
    const { email, code, backupCode } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: 'Utilisateur non trouvé' 
      });
    }

    // Trouver la configuration 2FA
    const twoFactor = await TwoFactorAuth.findOne({ userId: user._id });
    
    if (!twoFactor || !twoFactor.isEnabled) {
      return res.status(400).json({ 
        message: '2FA non configurée pour cet utilisateur' 
      });
    }

    let isVerified = false;

    if (backupCode) {
      // Utiliser un code de secours
      isVerified = twoFactor.useBackupCode(backupCode);
    } else if (code) {
      // Utiliser le code SMS
      isVerified = twoFactor.verifyCode(code);
    }

    if (isVerified) {
      twoFactor.lastUsed = new Date();
      await twoFactor.save();

      // Générer le token JWT
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Authentification 2FA réussie',
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          twoFactorEnabled: true
        }
      });
    } else {
      await twoFactor.save();
      res.status(400).json({ 
        message: 'Code invalide',
        attemptsLeft: 3 - twoFactor.loginAttempts
      });
    }
  } catch (error) {
    console.error('Erreur vérification 2FA login:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir le statut 2FA
// @route   GET /api/2fa/status
const getTwoFactorStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const twoFactor = await TwoFactorAuth.findOne({ userId });

    if (!twoFactor) {
      return res.json({
        enabled: false,
        phoneNumber: null,
        isVerified: false
      });
    }

    res.json({
      enabled: twoFactor.isEnabled,
      phoneNumber: twoFactor.phoneNumber,
      isVerified: twoFactor.isVerified,
      lastUsed: twoFactor.lastUsed
    });
  } catch (error) {
    console.error('Erreur statut 2FA:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Regénérer les codes de secours
// @route   POST /api/2fa/regenerate-backup-codes
const regenerateBackupCodes = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user._id;

    // Vérifier le mot de passe
    const user = await User.findById(userId);
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ 
        message: 'Mot de passe incorrect' 
      });
    }

    const twoFactor = await TwoFactorAuth.findOne({ userId });
    
    if (!twoFactor) {
      return res.status(400).json({ 
        message: '2FA non configurée' 
      });
    }

    const backupCodes = twoFactor.generateBackupCodes();
    await twoFactor.save();

    res.json({ 
      message: 'Codes de secours regénérés',
      backupCodes
    });
  } catch (error) {
    console.error('Erreur régénération codes:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  enableTwoFactor,
  verifyTwoFactor,
  disableTwoFactor,
  verifyTwoFactorLogin,
  getTwoFactorStatus,
  regenerateBackupCodes
};
