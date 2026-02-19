const express = require('express');
const { checkPaths } = require('../controllers/debugController');

const router = express.Router();

router.get('/paths', checkPaths);

module.exports = router;
