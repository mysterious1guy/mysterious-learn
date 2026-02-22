const User = require('../models/User');
const PendingUser = require('../models/PendingUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const { sendEmail, sendWelcomeEmail } = require('../utils/emailService');
const {
  getVerificationEmail,
  getPasswordResetEmail,
  getEmailChangeEmail,
  getAccountDeletionEmail,
  getAdminNotificationEmail
} = require('../utils/emailTemplates');

// Initialisation du client Google
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Générer un code de vérification à 6 chiffres
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Envoyer email de vérification
const sendVerificationEmail = async (email, name, code) => {
  const html = getVerificationEmail(name, code);
  await sendEmail({
    to: email,
    subject: 'Vérifie ton email — Mysterious Classroom',
    html
  });
};

// Envoyer code de changement d'email
const sendEmailChangeCode = async (email, name, code) => {
  const html = getEmailChangeEmail(name, code);
  await sendEmail({
    to: email,
    subject: "Code de confirmation — Changement d'email",
    html
  });
};

// ... (nukeUsers reste inchangé)

// @desc    Inscription
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, goal, startingLevel } = req.body;
    const name = `${firstName} ${lastName}`;

    // 1. Vérifier si l'utilisateur existe déjà officiellement
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Un compte existe déjà avec cet email.' });
    }

    // 2. Préparer les données
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationCode = generateVerificationCode();
    const isSuperAdmin = email === 'mouhamedfall@esp.sn';

    // 3. Stocker temporairement dans PendingUser (ou mettre à jour si déjà présent)
    await PendingUser.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        name,
        password: hashedPassword,
        verificationCode,
        role: isSuperAdmin ? 'admin' : 'user',
        goal,
        startingLevel,
        createdAt: new Date() // Reset TTL
      },
      { upsert: true, new: true }
    );

    // 4. Envoi de l'email
    sendVerificationEmail(email, name, verificationCode).catch(mailErr => {
      console.error(`❌ Échec envoi mail verification a ${email}:`, mailErr);
    });

    res.status(201).json({
      email,
      message: 'Code de vérification envoyé sur ton email.'
    });
  } catch (err) {
    console.error('Erreur register:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Vérifier l'email
// @route   POST /api/auth/verify-email
const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    // 1. Chercher dans les inscriptions en attente
    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) {
      // Si pas dans pending, peut-être déjà vérifié ?
      const user = await User.findOne({ email });
      if (user && user.isEmailVerified) {
        return res.status(400).json({ message: 'Cet email est déjà vérifié. Connecte-toi.' });
      }
      return res.status(404).json({ message: 'Aucune inscription en attente trouvée pour cet email.' });
    }

    // 2. Vérifier le code
    if (pendingUser.verificationCode !== code) {
      return res.status(400).json({ message: 'Code invalide' });
    }

    // 3. Créer l'utilisateur officiel
    const newUser = await User.create({
      firstName: pendingUser.firstName,
      lastName: pendingUser.lastName,
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
      role: pendingUser.role,
      onboardingProfile: {
        goal: pendingUser.goal,
        startingLevel: pendingUser.startingLevel
      },
      isEmailVerified: true,
      hasCompletedOnboarding: false,
      joinedAt: new Date()
    });

    // 4. Supprimer l'inscription temporaire
    await PendingUser.deleteOne({ _id: pendingUser._id });

    // 5. Envoi du mail de félicitations (Bienvenue)
    sendWelcomeEmail(newUser.email, newUser.firstName).catch(err => {
      console.error('❌ Échec envoi mail de bienvenue:', err);
    });

    // 6. Notification à l'administrateur
    const adminHtml = getAdminNotificationEmail(newUser.name, newUser.email);
    sendEmail({
      to: 'mouhamedfall@esp.sn',
      subject: 'Nouveau membre sur Mysterious Classroom',
      html: adminHtml
    }).catch(err => {
      console.error('❌ Échec envoi notification admin:', err);
    });

    res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isEmailVerified: true,
      token: generateToken(newUser._id),
      message: 'Félicitations ! Ton compte est maintenant actif.'
    });
  } catch (error) {
    console.error('Erreur verifyEmail:', error);
    res.status(500).json({ message: 'Erreur lors de l\'activation' });
  }
};

// @desc    Renvoyer le code de vérification
// @route   POST /api/auth/resend-verification
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const pendingUser = await PendingUser.findOne({ email });

    if (!pendingUser) {
      const user = await User.findOne({ email });
      if (user && user.isEmailVerified) {
        return res.status(400).json({ message: 'Email déjà vérifié.' });
      }
      return res.status(404).json({ message: 'Aucune inscription en attente.' });
    }

    const newCode = generateVerificationCode();
    pendingUser.verificationCode = newCode;
    pendingUser.createdAt = new Date(); // Reset TTL
    await pendingUser.save();

    await sendVerificationEmail(pendingUser.email, pendingUser.name, newCode);

    res.json({ message: 'Nouveau code envoyé !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'envoi' });
  }
};

// @desc    Connexion
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // La restriction Google est supprimée pour permettre la connexion par mot de passe si disponible
    if (user.googleId && !user.password) {
      return res.status(401).json({
        message: 'Ce compte est lié à Google et n\'a pas encore de mot de passe local. Connecte-toi avec Google une fois pour en définir un.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Restriction : Bloquer tant que l'email n'est pas vérifié (sauf admin)
    if (!user.isEmailVerified && user.role !== 'admin') {
      return res.status(403).json({
        message: 'Veuillez vérifier votre email avant de vous connecter.',
        unverified: true,
        email: user.email
      });
    }

    // Mettre à jour lastLogin
    user.lastLogin = Date.now();
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      joinedAt: user.joinedAt,
      isEmailVerified: user.isEmailVerified,
      hasCompletedOnboarding: user.hasCompletedOnboarding,
      onboardingProfile: user.onboardingProfile,
      unlockedCourses: user.unlockedCourses,
      preferences: user.preferences,
      lastSelectedCourse: user.lastSelectedCourse,
      favorites: user.favorites || [],
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Google OAuth - VERSION CORRIGÉE
// @route   POST /api/auth/google
const googleAuth = async (req, res) => {
  try {
    console.log('Tentative de connexion Google reçue');

    const token = req.body.credential || req.body.token;

    if (!token) {
      return res.status(400).json({ message: 'Token manquant' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, email_verified, name, picture } = payload;

    console.log('Token Google vérifié pour:', email);

    if (!email || !email.includes('@')) {
      return res.status(401).json({
        message: 'Email Google invalide'
      });
    }

    // Permettre l'inscription pour mouhamedfall@esp.sn
    if (!email_verified && email !== 'mouhamedfall@esp.sn') {
      return res.status(403).json({
        message: 'Email non vérifié. Vérifie ton email avant de te connecter.',
        needsVerification: true,
        email: email
      });
    }

    // Si l'utilisateur existe déjà avec cet email, on fusionne ou on le connecte
    let existingUser = await User.findOne({ $or: [{ googleId }, { email }] });

    if (existingUser) {
      if (!existingUser.googleId) {
        existingUser.googleId = googleId;
      }
      if (!existingUser.isEmailVerified) {
        existingUser.isEmailVerified = true;
      }
      if (picture && !existingUser.avatar) {
        existingUser.avatar = picture;
      }
      await existingUser.save();
    } else {
      existingUser = await User.create({
        name: name || email.split('@')[0],
        firstName: name ? name.split(' ')[0] : email.split('@')[0],
        lastName: name && name.split(' ').length > 1 ? name.split(' ').slice(1).join(' ') : 'User',
        email,
        googleId,
        avatar: picture || null,
        isEmailVerified: true,
        hasCompletedOnboarding: false,
        joinedAt: new Date(),
      });
    }

    res.json({
      _id: existingUser._id,
      name: existingUser.name,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      avatar: existingUser.avatar,
      role: existingUser.role,
      joinedAt: existingUser.joinedAt,
      isEmailVerified: true,
      hasCompletedOnboarding: existingUser.hasCompletedOnboarding,
      onboardingProfile: existingUser.onboardingProfile,
      unlockedCourses: existingUser.unlockedCourses,
      preferences: existingUser.preferences,
      lastSelectedCourse: existingUser.lastSelectedCourse,
      favorites: existingUser.favorites || [],
      token: generateToken(existingUser._id),
    });
  } catch (err) {
    console.error('Erreur Google Auth:', err);
    if (err.message.includes('token')) {
      res.status(401).json({ message: 'Token Google invalide ou expiré' });
    } else if (err.message.includes('audience')) {
      res.status(401).json({ message: 'Client ID Google invalide' });
    } else {
      res.status(401).json({ message: 'Échec de l\'authentification Google' });
    }
  }
};

// ========== NOUVELLE FONCTION GOOGLE CALLBACK ==========
// @desc    Google OAuth Callback (échange du code contre un token)
// @route   GET /api/auth/google/callback
const googleCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.CLIENT_URL}/api/auth/google/callback`
    );

    const { tokens } = await client.getToken(code);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, email_verified, name, picture } = payload;

    console.log('Email vérifié:', email);

    if (!email_verified) {
      return res.redirect(`${process.env.CLIENT_URL}/auth?error=email_not_verified`);
    }

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      if (!user.googleId || !user.isEmailVerified) {
        user.googleId = googleId || user.googleId;
        user.isEmailVerified = true;
        user.avatar = picture || user.avatar;

        // Assurer que le créateur garde les droits admin même s'il se connecte via différé
        if (email === 'mouhamedfall@esp.sn') {
          user.role = 'admin';
        }
        await user.save();
      }
    } else {
      const isSuperAdmin = email === 'mouhamedfall@esp.sn';

      user = await User.create({
        name: name || email.split('@')[0],
        firstName: name ? name.split(' ')[0] : email.split('@')[0],
        lastName: name && name.split(' ').length > 1 ? name.split(' ').slice(1).join(' ') : 'User',
        email,
        googleId,
        avatar: picture,
        role: isSuperAdmin ? 'admin' : 'user',
        isEmailVerified: true,
        hasCompletedOnboarding: false,
        joinedAt: new Date()
      });

      // 5. Envoi du mail de félicitations (Bienvenue) pour les nouveaux inscrits Google
      sendWelcomeEmail(user.email, user.firstName).catch(err => {
        console.error('❌ Échec envoi mail de bienvenue (Google Auth):', err);
      });

      // 6. Notification à l'administrateur
      const adminHtml = getAdminNotificationEmail(user.name, user.email);
      sendEmail({
        to: 'mouhamedfall@esp.sn',
        subject: 'Nouveau membre sur Mysterious Classroom (Google)',
        html: adminHtml
      }).catch(err => {
        console.error('❌ Échec envoi notification admin:', err);
      });
    }

    const token = generateToken(user._id);

    const clientUrl = process.env.NODE_ENV === 'production'
      ? 'https://mysterious-classroom-free-courses.onrender.com'
      : process.env.CLIENT_URL || 'http://localhost:5173';

    res.redirect(`${clientUrl}/auth/callback?token=${token}`);

  } catch (error) {
    console.error('Erreur Google callback:', error);
    const clientUrl = process.env.NODE_ENV === 'production'
      ? 'https://mysterious-classroom-free-courses.onrender.com'
      : process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${clientUrl}/auth?error=google_auth_failed`);
  }
};
// ========== FIN NOUVELLE FONCTION ==========

// @desc    Obtenir le profil
// @route   GET /api/auth/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Mettre à jour le profil
// @route   PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      avatar,
      lastSelectedCourse,
      bio,
      location,
      phone,
      firstName,
      lastName,
      preferences,
      hasCompletedOnboarding,
      programmingLevel,
      onboardingProfile,
      unlockedCourses
    } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    // user.email cannot be updated directly here for security reasons (requires re-verification)
    if (avatar) user.avatar = avatar;
    if (lastSelectedCourse !== undefined) user.lastSelectedCourse = lastSelectedCourse;
    if (req.body.favorites !== undefined) user.favorites = req.body.favorites;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (phone !== undefined) user.phone = phone;
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;

    // Nouveaux champs onboarding/preferences
    if (preferences !== undefined) {
      if (!user.preferences) user.preferences = {};
      if (preferences.theme !== undefined) user.preferences.theme = preferences.theme;
      if (preferences.language !== undefined) user.preferences.language = preferences.language;
      if (preferences.soundEnabled !== undefined) user.preferences.soundEnabled = preferences.soundEnabled;
    }
    if (hasCompletedOnboarding !== undefined) user.hasCompletedOnboarding = hasCompletedOnboarding;
    if (programmingLevel !== undefined) user.programmingLevel = programmingLevel;
    if (onboardingProfile !== undefined) user.onboardingProfile = onboardingProfile;
    if (unlockedCourses !== undefined) user.unlockedCourses = unlockedCourses;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      joinedAt: user.joinedAt,
      isEmailVerified: user.isEmailVerified,
      hasCompletedOnboarding: user.hasCompletedOnboarding,
      programmingLevel: user.programmingLevel,
      onboardingProfile: user.onboardingProfile,
      unlockedCourses: user.unlockedCourses,
      preferences: user.preferences,
      lastSelectedCourse: user.lastSelectedCourse,
      favorites: user.favorites || [],
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Demander réinitialisation de mot de passe
// @route   POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'Un compte existe déjà avec cet email'
      });
    }

    const user = existingUser || await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Aucun utilisateur avec cet email' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const html = getPasswordResetEmail(user.firstName || user.name, resetUrl);

    await sendEmail({
      to: email,
      subject: 'Réinitialisation de ton mot de passe — Mysterious Classroom',
      html
    });
    res.json({ message: 'Email envoyé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Réinitialiser le mot de passe
// @route   POST /api/auth/reset-password/:token
const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Token invalide ou expiré' });
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: 'Mot de passe mis à jour' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Changer le mot de passe (utilisateur connecté)
// @route   POST /api/auth/change-password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.googleId && !user.password) {
      return res.status(400).json({ message: 'Ce compte utilise Google. Pas de mot de passe à changer.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Le nouveau mot de passe doit contenir au moins 6 caractères' });
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Mot de passe modifié avec succès' });
  } catch (err) {
    console.error('Erreur changePassword:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Supprimer le compte
// @route   DELETE /api/auth/profile
const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const { email, firstName, name } = user;

    await User.findByIdAndDelete(req.user._id);

    // Envoyer l'email d'adieu
    const html = getAccountDeletionEmail(firstName || name || 'Aventurier');
    try {
      await sendEmail({
        to: email,
        subject: 'Confirmation de suppression de compte - Mysterious Classroom',
        html
      });
    } catch (emailErr) {
      console.error("Erreur envoi email suppression compte:", emailErr);
      // On ne throw pas l'erreur pour ne pas bloquer la suppression côté client
    }

    res.json({ message: 'Compte supprimé' });
  } catch (err) {
    console.error('Erreur deleteAccount:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Vérifier si un email existe déjà
// @route   POST /api/auth/check-email
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email requis' });

    const user = await User.findOne({ email });
    const pending = await PendingUser.findOne({ email });

    res.json({ exists: !!user || !!pending });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
const requestEmailChange = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const user = await User.findById(req.user._id);

    if (newEmail === user.email) {
      return res.status(400).json({ message: "C'est déjà votre email actuel" });
    }

    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return res.status(400).json({ message: "Cet email est déjà utilisé par un autre compte" });
    }

    const verificationCode = generateVerificationCode();
    user.pendingEmail = newEmail;
    user.emailChangeCode = verificationCode;
    user.emailChangeCodeExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendEmailChangeCode(newEmail, user.name, verificationCode);

    res.json({ message: "Un code de confirmation a été envoyé à votre nouvel email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const confirmEmailChange = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findById(req.user._id).select('+emailChangeCode +emailChangeCodeExpire');

    if (!user.emailChangeCode || user.emailChangeCode !== code || user.emailChangeCodeExpire < Date.now()) {
      return res.status(400).json({ message: "Code invalide ou expiré" });
    }

    user.email = user.pendingEmail;
    user.pendingEmail = undefined;
    user.emailChangeCode = undefined;
    user.emailChangeCodeExpire = undefined;
    await user.save();

    res.json({
      message: "Email mis à jour avec succès",
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const getAppStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({
      lastLogin: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });
    res.json({
      totalUsers,
      activeUsers: activeUsers || totalUsers
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  register,
  login,
  googleAuth,
  googleCallback,   // ← AJOUTÉ
  verifyEmail,
  resendVerification,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  forgotPassword,
  resetPassword,
  checkEmail,
  requestEmailChange,
  confirmEmailChange,
  getAppStats,
};