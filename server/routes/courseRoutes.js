const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getProgress,
  updateProgress,
  getAllProgress,
} = require('../controllers/courseController');

const router = express.Router();

router.get('/progress/all', protect, getAllProgress);
router.get('/:courseId/progress', protect, getProgress);
router.post('/:courseId/progress', protect, updateProgress);

module.exports = router;