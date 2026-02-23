const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { createProject, getProjects, submitProject } = require('../controllers/projectController');

router.route('/')
    .get(protect, getProjects)
    .post(protect, admin, createProject);

router.route('/:id/submit')
    .post(protect, submitProject);

module.exports = router;
