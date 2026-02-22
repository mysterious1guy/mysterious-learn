const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    },
    firstName: {
      type: String,
      required: [true, 'Le prénom est requis'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Email invalide'],
    },
    password: {
      type: String,
      minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
      select: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    adminTier: {
      type: String,
      enum: ['standard', 'owner'],
      default: 'standard',
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    // Google OAuth
    googleId: {
      type: String,
      default: null,
    },
    // Email Verification
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationCode: {
      type: String,
      select: false,
    },
    emailVerificationExpire: {
      type: Date,
      select: false,
    },
    // Password Reset
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // Track last selected course
    lastSelectedCourse: {
      type: String,
      default: null,
    },
    // Persistent favorites
    favorites: {
      type: [String],
      default: [],
    },
    // Profile additionnel
    bio: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    // Onboarding & Flow
    hasCompletedOnboarding: {
      type: Boolean,
      default: false,
    },
    preferences: {
      theme: { type: String, default: 'dark' },
      language: { type: String, default: 'fr' },
      soundEnabled: { type: Boolean, default: true },
    },
    // Progressive learning tracking
    completedModules: {
      type: [String],
      default: [],
    },
    unlockedCourses: {
      type: [String],
      default: [],
    },
    onboardingProfile: {
      goal: { type: String, default: null },
      startingLevel: { type: String, enum: ['Débutant', 'Amateur', 'Expérimenté'], default: null },
    },
    // Email Change Verification
    pendingEmail: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, 'Email invalide'],
    },
    emailChangeCode: {
      type: String,
      select: false,
    },
    emailChangeCodeExpire: {
      type: Date,
      select: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    // Personalization
    programmingLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Cascade delete: Supprimer les données associées quand un utilisateur est supprimé
userSchema.pre('findOneAndDelete', async function (next) {
  try {
    const docQuery = this.getQuery();
    const User = this.model;
    const user = await User.findOne(docQuery);

    if (user) {
      // Supprimer les progressions
      await mongoose.model('Progress').deleteMany({ user: user._id });
      // Supprimer la 2FA
      await mongoose.model('TwoFactorAuth').deleteOne({ userId: user._id });
      // Possibilité d'étendre avec la suppression de commentaires, etc.
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);