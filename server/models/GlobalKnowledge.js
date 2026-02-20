const mongoose = require('mongoose');

const globalKnowledgeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String, // 'pedagogy', 'research', 'general', 'documentation'
        default: 'general'
    },
    tags: [String],
    source: String, // Optional: where this info comes from
    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('GlobalKnowledge', globalKnowledgeSchema);
