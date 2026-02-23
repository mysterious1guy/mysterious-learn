const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    }, // e.g., 'C', 'PHP', 'Python' - used to match with the user's completed courses
    level: {
        type: String,
        required: true,
        enum: ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'],
    },
    requirements: [{
        type: String,
    }], // List of features the project must have
    objectives: [{
        type: String,
    }], // What the user will learn/prove
    xpReward: {
        type: Number,
        default: 500,
    },
    difficulty: {
        type: String,
        enum: ['Facile', 'Moyen', 'Difficile', 'Extrême'],
        default: 'Moyen',
    },
    isRequiredForCertification: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Project', projectSchema);
