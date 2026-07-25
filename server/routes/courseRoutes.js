const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getAllCourses,
  getCourseById,
  getCategories,
  createCourse,
  deleteCourse,
  purgeCourses,
  getProgress,
  updateProgress,
  getAllProgress,
  getCourseStats,
} = require('../controllers/courseController');

const router = express.Router();

// Routes publiques
router.get('/', getAllCourses);
router.get('/stats', getCourseStats);
router.get('/categories', getCategories);
router.get('/:id', getCourseById);

// Routes protégées (nécessitent d'être authentifié)
router.post('/', protect, createCourse);
router.delete('/purge/all', protect, purgeCourses);
router.delete('/:id', protect, deleteCourse);
router.get('/progress/all', protect, getAllProgress);
router.get('/:courseId/progress', protect, getProgress);
router.post('/:courseId/progress', protect, updateProgress);

module.exports = router;