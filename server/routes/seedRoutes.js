const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const networkCourses = require('../data/courses/network');

router.get('/seed-network', async (req, res) => {
    try {
        const courseData = networkCourses[0];

        const result = await Course.findOneAndUpdate(
            { id: courseData.id },
            { $set: courseData },
            { new: true, upsert: true }
        );

        res.json({ success: true, message: 'Network course updated to 3 levels', course: result.title });
    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
