const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getGlobalKnowledge,
    upsertGlobalKnowledge,
    deleteGlobalKnowledge,
    aiChat,
    reviewCode,
    generateChallenge,
    adaptiveRoadmap,
    generateCertificate,
    generateTerminalMission
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
router.route('/review-code').post(protect, reviewCode);
router.route('/generate-challenge').post(protect, generateChallenge);
router.route('/adaptive-roadmap').post(protect, adaptiveRoadmap);
router.route('/generate-certificate').post(protect, generateCertificate);
router.route('/generate-terminal-mission').post(protect, generateTerminalMission);

module.exports = router;
