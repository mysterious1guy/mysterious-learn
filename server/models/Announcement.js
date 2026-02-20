const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre est requis'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Le contenu est requis']
    },
    type: {
        type: String,
        enum: ['info', 'warning', 'success', 'critical'],
        default: 'info'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetAudience: {
        type: String,
        enum: ['all', 'students', 'admins'],
        default: 'all'
    },
    expiresAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Announcement', announcementSchema);
