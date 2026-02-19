const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { getUsers, deleteUserProfile } = require('../controllers/userController');
const { deleteUser } = require('../controllers/adminController');

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/profile').delete(protect, deleteUserProfile);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;