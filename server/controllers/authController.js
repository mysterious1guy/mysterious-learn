const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendMail = require('../config/mail');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Générer token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Générer un code de vérification à 6 chiffres
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Envoyer email de vérification
const sendVerificationEmail = async (email, name, code) => {
  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #e2e8f0; padding: 40px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 28px; background: linear-gradient(to right, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0;">MYSTERIOUS CLASSROOM</h1>
      </div>
      <h2 style="color: #fff; font-size: 22px;">Bonjour ${name} ! 👋</h2>
      <p style="color: #94a3b8; line-height: 1.8;">Bienvenue dans l'univers Mysterious Classroom. Pour activer ton compte, entre ce code de vérification :</p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; padding: 20px 40px; background: linear-gradient(135deg, #2563eb, #7c3aed); border-radius: 12px; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: white;">
          ${code}
        </div>
      </div>
      <p style="color: #64748b; font-size: 13px; text-align: center;">Ce code expire dans 30 minutes.</p>
      <hr style="border: none; border-top: 1px solid #334155; margin: 30px 0;" />
      <p style="color: #475569; font-size: 12px; text-align: center;">Si tu n'as pas créé de compte, ignore cet email.</p>
    </div>
  `;
  await sendMail(email, 'Vérifie ton email — Mysterious Classroom', html);
};

// @desc    Nuke all users (Temp)
const nukeUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: 'All users deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Inscription
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification code
    const verificationCode = generateVerificationCode();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      emailVerificationCode: verificationCode,
      emailVerificationExpire: Date.now() + 30 * 60 * 1000, // 30 min
      isEmailVerified: false,
    });

    // Send verification email
    await sendVerificationEmail(email, name, verificationCode);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      joinedAt: user.joinedAt,
      isEmailVerified: false,
      favorites: user.favorites || [],
      token: generateToken(user._id),
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

    const user = await User.findOne({ email }).select('+emailVerificationCode +emailVerificationExpire');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.isEmailVerified) {
      return res.json({ message: 'Email déjà vérifié', isEmailVerified: true });
    }

    if (!user.emailVerificationCode || user.emailVerificationExpire < Date.now()) {
      return res.status(400).json({ message: 'Code expiré. Demande un nouveau code.' });
    }

    if (user.emailVerificationCode !== code) {
      return res.status(400).json({ message: 'Code incorrect' });
    }

    user.isEmailVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();

    res.json({
      message: 'Email vérifié avec succès !',
      isEmailVerified: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      joinedAt: user.joinedAt,
      favorites: user.favorites || [],
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Erreur verifyEmail:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Renvoyer le code de vérification
// @route   POST /api/auth/resend-verification
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.isEmailVerified) {
      return res.json({ message: 'Email déjà vérifié' });
    }

    const verificationCode = generateVerificationCode();
    user.emailVerificationCode = verificationCode;
    user.emailVerificationExpire = Date.now() + 30 * 60 * 1000;
    await user.save();

    await sendVerificationEmail(email, user.name, verificationCode);

    res.json({ message: 'Nouveau code envoyé !' });
  } catch (err) {
    console.error('Erreur resendVerification:', err);
    res.status(500).json({ message: 'Erreur serveur' });
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

    // Check if this is a Google-only account
    if (user.googleId && !user.password) {
      return res.status(400).json({ message: 'Ce compte utilise Google. Connecte-toi avec Google.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Check email verification
    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: 'Email non vérifié. Vérifie ton email avant de te connecter.',
        needsVerification: true,
        email: user.email,
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      joinedAt: user.joinedAt,
      isEmailVerified: true,
      lastSelectedCourse: user.lastSelectedCourse,
      favorites: user.favorites || [],
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Google OAuth
// @route   POST /api/auth/google
const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    console.log('Tentative de connexion Google reçue');

    // Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    console.log('Token Google vérifié pour:', email);

    // Check if user exists
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      console.log('Utilisateur existant trouvé:', user.email);
      // Update Google ID if not set
      if (!user.googleId) {
        user.googleId = googleId;
      }
      // Google users are auto-verified
      if (!user.isEmailVerified) {
        user.isEmailVerified = true;
      }
      if (picture && !user.avatar) {
        user.avatar = picture;
      }
      await user.save();
    } else {
      console.log('Nouvel utilisateur Google:', email);
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture || null,
        isEmailVerified: true, // Google accounts are pre-verified
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      joinedAt: user.joinedAt,
      isEmailVerified: true,
      lastSelectedCourse: user.lastSelectedCourse,
      favorites: user.favorites || [],
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Erreur Google Auth:', err);
    res.status(401).json({ message: 'Échec de l\'authentification Google' });
  }
};

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
    const { name, email, avatar, lastSelectedCourse } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;
    if (lastSelectedCourse !== undefined) user.lastSelectedCourse = lastSelectedCourse;
    if (req.body.favorites !== undefined) user.favorites = req.body.favorites;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      joinedAt: user.joinedAt,
      isEmailVerified: user.isEmailVerified,
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Aucun utilisateur avec cet email' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message = `
      <h1>Réinitialisation de mot de passe</h1>
      <p>Clique sur ce lien pour réinitialiser ton mot de passe :</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      <p>Ce lien expire dans 1 heure.</p>
    `;

    await sendMail(email, 'Réinitialisation de mot de passe', message);
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

    // Google users can't change password
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
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: 'Compte supprimé' });
  } catch (err) {
    console.error('Erreur deleteAccount:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  register,
  login,
  googleAuth,
  verifyEmail,
  resendVerification,
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  forgotPassword,
  resetPassword,
  nukeUsers,
};