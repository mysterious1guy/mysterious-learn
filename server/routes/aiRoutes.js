const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getGlobalKnowledge,
    upsertGlobalKnowledge,
    deleteGlobalKnowledge,
    aiChat
} = require('../controllers/aiController');

const router = express.Router();

// Knowledge management (Admin only)
router.route('/knowledge')
    .get(protect, admin, getGlobalKnowledge)
    .post(protect, admin, upsertGlobalKnowledge);

router.route('/knowledge/:id')
    .delete(protect, admin, deleteGlobalKnowledge);

// AI Interaction
router.route('/chat').post(protect, aiChat);

module.exports = router;
