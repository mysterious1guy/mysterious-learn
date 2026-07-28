const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { getUsers, deleteUserProfile, updateProgrammingLevel, getLeaderboard, addXp } = require('../controllers/userController');
const { deleteUser } = require('../controllers/adminController');

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/leaderboard').get(protect, getLeaderboard);
router.route('/add-xp').post(protect, addXp);
router.route('/profile').delete(protect, deleteUserProfile);
router.route('/level').put(protect, updateProgrammingLevel);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;