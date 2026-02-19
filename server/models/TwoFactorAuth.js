const mongoose = require('mongoose');

const twoFactorAuthSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: {
    type: String,
    select: false // Ne jamais renvoyer ce champ dans les requêtes
  },
  verificationCodeExpires: {
    type: Date,
    select: false
  },
  backupCodes: [{
    code: String,
    used: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  isEnabled: {
    type: Boolean,
    default: false
  },
  lastUsed: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date
}, {
  timestamps: true
});

// Les index sont déjà créés par les propriétés `unique: true`
// deuxFactorAuthSchema.index({ userId: 1 });
// deuxFactorAuthSchema.index({ phoneNumber: 1 });

// Méthode pour générer un code de vérification
twoFactorAuthSchema.methods.generateVerificationCode = function () {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  this.verificationCode = code;
  this.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return code;
};

// Méthode pour vérifier le code
twoFactorAuthSchema.methods.verifyCode = function (code) {
  if (this.lockUntil && this.lockUntil > Date.now()) {
    return false; // Compte bloqué
  }

  if (this.verificationCode !== code) {
    this.loginAttempts += 1;

    // Bloquer après 3 tentatives pendant 15 minutes
    if (this.loginAttempts >= 3) {
      this.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
    }

    this.save();
    return false;
  }

  // Réinitialiser les tentatives en cas de succès
  this.loginAttempts = 0;
  this.lockUntil = undefined;
  this.verificationCode = undefined;
  this.verificationCodeExpires = undefined;
  return true;
};

// Méthode pour générer des codes de secours
twoFactorAuthSchema.methods.generateBackupCodes = function () {
  const backupCodes = [];
  for (let i = 0; i < 10; i++) {
    backupCodes.push({
      code: Math.random().toString(36).substring(2, 10).toUpperCase(),
      used: false,
      createdAt: new Date()
    });
  }
  this.backupCodes = backupCodes;
  return backupCodes;
};

// Méthode pour utiliser un code de secours
twoFactorAuthSchema.methods.useBackupCode = function (code) {
  const backupCode = this.backupCodes.find(bc =>
    bc.code === code && !bc.used
  );

  if (backupCode) {
    backupCode.used = true;
    this.save();
    return true;
  }

  return false;
};

module.exports = mongoose.model('TwoFactorAuth', twoFactorAuthSchema);
