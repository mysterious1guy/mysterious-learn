const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: String, // ex: 'algo', 'react', etc.
      required: true,
    },
    completedLessons: {
      type: [String], // IDs des leçons terminées
      default: [],
    },
    progress: {
      type: Number,
      default: 0, // pourcentage
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index composé pour éviter doublons (un seul document par utilisateur et cours)
progressSchema.index({ user: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);