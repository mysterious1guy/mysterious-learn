const mongoose = require('mongoose');

const adminNotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['video_error', 'system_error', 'user_report'],
        required: true
    },
    courseId: {
        type: String,
        default: null
    },
    chapterId: {
        type: String,
        default: null
    },
    videoId: {
        type: String,
        default: null
    },
    errorType: {
        type: String,
        default: null
    },
    url: {
        type: String,
        default: null
    },
    isRead: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AdminNotification', adminNotificationSchema);
