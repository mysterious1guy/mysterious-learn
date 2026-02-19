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
  } catch (error) {
    console.error('❌ Register error:', error);
    res.status(500).json({ message: 'Erreur serveur: ' + error.message });
  }
};

// @desc    Inscription
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    console.log('📝 Register request body:', req.body);

    const { firstName, lastName, email, password } = req.body;
    const name = `${firstName} ${lastName}`;

    console.log('🔍 Checking if user exists:', email);
    const userExists = await User.findOne({ email });
    console.log('👤 User exists:', userExists ? 'YES' : 'NO');

    // Permettre l'inscription pour mouhamedfall@gmail.com (contourner la vérification)
    if (userExists && email !== 'mouhamedfall@gmail.com') {
      return res.status(400).json({
        message: 'Un compte existe déjà avec cet email'
      });
    }

    console.log('🔐 Hashing password...');
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationCode = generateVerificationCode();
    console.log('🔢 Verification code:', verificationCode);

    console.log('👤 Creating user...');
    const user = await User.create({
      name,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      emailVerificationCode: verificationCode,
      emailVerificationExpire: Date.now() + 30 * 60 * 1000,
      isEmailVerified: true, // ✅ AUTO-VERIFICATION (Email service disabled)
    });
    console.log('✅ User created successfully (Auto-verified)');

    // Désactiver l'email pour les tests
    // console.log('📧 Email de vérification (désactivé):', verificationCode);
    // await sendVerificationEmail(email, name, verificationCode);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      joinedAt: user.joinedAt,
      isEmailVerified: true,
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
  // Fonction gardée mais rendue quasi-inutile par l'auto-vérification
  res.json({ message: 'Email déjà vérifié automatiquement.' });
};

// @desc    Renvoyer le code de vérification
// @route   POST /api/auth/resend-verification
const resendVerification = async (req, res) => {
  res.json({ message: 'Vérification automatique active. Connectez-vous directement.' });
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

    if (user.googleId && !user.password) {
      return res.status(400).json({ message: 'Ce compte utilise Google. Connecte-toi avec Google.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

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

    // Permettre l'inscription pour mouhamedfall@gmail.com et mouhamedfall@esp.sn
    if (!email_verified) {
      return res.status(403).json({
        message: 'Email non vérifié. Vérifie ton email avant de te connecter.',
        needsVerification: true,
        email: email
      });
    }

    // Exception pour les emails autorisés à s'inscrire même si compte existe
    const allowedEmails = ['mouhamedfall@gmail.com', 'mouhamedfall@esp.sn'];
    let existingUser = await User.findOne({ $or: [{ googleId }, { email }] });

    if (existingUser && !allowedEmails.includes(email)) {
      return res.status(400).json({
        message: 'Un compte existe déjà avec cet email'
      });
    }

    if (existingUser) {
      console.log('Utilisateur existant trouvé:', existingUser.email);
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
      console.log('Nouvel utilisateur Google:', email);
      existingUser = await User.create({
        name: name || email.split('@')[0],
        email,
        googleId,
        avatar: picture || null,
        isEmailVerified: true,
        joinedAt: new Date(),
      });
    }

    res.json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      avatar: existingUser.avatar,
      role: existingUser.role,
      joinedAt: existingUser.joinedAt,
      isEmailVerified: true,
      lastSelectedCourse: existingUser.lastSelectedCourse,
      favorites: existingUser.favorites || [],
      token: generateToken(existingUser._id),
      lastSelectedCourse: user.lastSelectedCourse,
      favorites: user.favorites || [],
      token: generateToken(user._id),
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
    console.log('🔥 Google callback reçu avec code:', code ? 'CODE_REÇU' : 'CODE_MANQUANT');
    console.log('🔥 CLIENT_URL:', process.env.CLIENT_URL);
    console.log('🔥 Redirect URI configuré:', `${process.env.CLIENT_URL}/api/auth/google/callback`);

    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.CLIENT_URL}/api/auth/google/callback`  // URL explicite
    );

    console.log('🔥 OAuth2Client configuré, tentative getToken...');
    const { tokens } = await client.getToken(code);
    console.log('🔥 Tokens reçus de Google:', tokens.access_token ? 'ACCESS_TOKEN_OK' : 'ACCESS_TOKEN_MISSING');

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
      console.log('Utilisateur existant:', email);
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture || user.avatar;
        await user.save();
      }
    } else {
      console.log('Nouvel utilisateur:', email);
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        googleId,
        avatar: picture,
        isEmailVerified: true,
        joinedAt: new Date()
      });
    }

    const token = generateToken(user._id);

    console.log('Token généré, redirection vers dashboard...');
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);

  } catch (error) {
    console.error('Erreur Google callback:', error);
    res.redirect(`${process.env.CLIENT_URL}/auth?error=google_auth_failed`);
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
      lastName
    } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;
    if (lastSelectedCourse !== undefined) user.lastSelectedCourse = lastSelectedCourse;
    if (req.body.favorites !== undefined) user.favorites = req.body.favorites;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (phone !== undefined) user.phone = phone;
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;

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
    const existingUser = await User.findOne({ email });

    if (existingUser && email !== 'mouhamedfall@gmail.com') {
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

// @desc    Vérifier si un email existe déjà
// @route   POST /api/auth/check-email
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email requis' });
    }

    const user = await User.findOne({ email });
    res.json({ exists: !!user });
  } catch (err) {
    console.error('Erreur checkEmail:', err);
    res.status(500).json({ message: 'Erreur serveur' });
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
  nukeUsers,
  checkEmail, // ← AJOUTÉ
};