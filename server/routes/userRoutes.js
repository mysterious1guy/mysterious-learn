const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { getUsers, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;