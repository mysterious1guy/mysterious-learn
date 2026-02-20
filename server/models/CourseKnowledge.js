const mongoose = require('mongoose');

const courseKnowledgeSchema = new mongoose.Schema({
    courseId: {
        type: String, // e.g., 'algo', 'python', 'c'
        required: true,
        unique: true
    },
    professorContext: {
        type: String, // High-level instruction for the AI persona
        required: true
    },
    modules: [{
        moduleId: String, // e.g., 'algo-intro'
        keywords: [String],
        response: String // Specific pre-programmed response for these keywords within this module
    }],
    generalFaq: [{
        keywords: [String],
        response: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('CourseKnowledge', courseKnowledgeSchema);
