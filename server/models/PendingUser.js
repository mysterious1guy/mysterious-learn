const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    verificationCode: { type: String, required: true },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now, expires: 1800 } // Auto-delete after 30 mins (1800 seconds)
});

module.exports = mongoose.model('PendingUser', pendingUserSchema);
