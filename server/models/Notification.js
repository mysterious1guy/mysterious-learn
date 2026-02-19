const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['info', 'warning', 'success', 'announcement'],
        default: 'info',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    targetUsers: {
        type: String,
        enum: ['all', 'specific'],
        default: 'all',
    },
    isRead: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Notification', notificationSchema);
