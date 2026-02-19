const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  loginTime: {
    type: Date,
    default: Date.now,
    required: true
  },
  logoutTime: {
    type: Date,
    default: null
  },
  duration: {
    type: Number, // en minutes
    default: 0
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  coursesViewed: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    viewTime: {
      type: Date,
      default: Date.now
    },
    duration: {
      type: Number, // temps passé sur la page en minutes
      default: 0
    },
    completed: {
      type: Boolean,
      default: false
    }
  }],
  exercisesCompleted: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    exerciseId: String,
    completedAt: {
      type: Date,
      default: Date.now
    },
    timeSpent: {
      type: Number, // en minutes
      default: 0
    },
    score: {
      type: Number,
      default: 0
    }
  }],
  sessionData: {
    totalTime: {
      type: Number, // temps total de la session en minutes
      default: 0
    },
    pagesVisited: [{
      page: String,
      visitTime: Date,
      duration: Number
    }],
    interactions: [{
      type: String, // 'click', 'scroll', 'hover', etc.
      timestamp: Date,
      target: String,
      metadata: mongoose.Schema.Types.Mixed
    }]
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
userActivitySchema.index({ userId: 1, loginTime: -1 });
userActivitySchema.index({ loginTime: -1 });

module.exports = mongoose.model('UserActivity', userActivitySchema);
