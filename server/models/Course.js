const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Programmation', 'Web', 'Data', 'Théorie', 'Mobile', 'DevOps']
  },
  level: {
    type: String,
    required: true,
    enum: ['Débutant', 'Intermédiaire', 'Avancé']
  },
  duration: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  students: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    default: 'french'
  },
  isFree: {
    type: Boolean,
    default: true
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  chapters: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    duration: {
      type: String,
      required: false,
      default: '15 min'
    },
    content: {
      type: String,
      required: true
    },
    objectives: [{
      type: String
    }],
    exercises: [{
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      difficulty: {
        type: String,
        enum: ['Facile', 'Moyen', 'Difficile'],
        default: 'Moyen'
      },
      solution: {
        type: String
      },
      hints: [{
        type: String
      }]
    }],
    resources: [{
      title: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ['video', 'article', 'code', 'download'],
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }],
    isCompleted: {
      type: Boolean,
      default: false
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index pour optimiser les recherches
courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ tags: 1 });
courseSchema.index(
  { title: 'text', description: 'text' },
  { language_override: 'dummy_language_override' } // Empêche MongoDB d'utiliser le champ 'language' (qui contient 'Français') comme langue de recherche textuelle
);

module.exports = mongoose.model('Course', courseSchema);
