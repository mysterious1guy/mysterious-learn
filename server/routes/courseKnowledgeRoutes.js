const express = require('express');
const router = express.Router();
const courseKnowledgeController = require('../controllers/courseKnowledgeController');
const { protect } = require('../middleware/authMiddleware');

// Get knowledge for a specific course
router.get('/:courseId', courseKnowledgeController.getCourseKnowledge);

// Admin route to update or create course knowledge
router.post('/', protect, courseKnowledgeController.upsertCourseKnowledge);

module.exports = router;
