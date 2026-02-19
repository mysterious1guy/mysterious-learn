const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');

// @desc    Get all notifications for the user
// @route   GET /api/notifications
router.get('/', protect, async (req, res) => {
    try {
        // On récupère les notifications globales ('all')
        const notifications = await Notification.find({ targetUsers: 'all' })
            .sort({ createdAt: -1 })
            .limit(20);

        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
