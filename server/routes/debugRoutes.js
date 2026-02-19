const express = require('express');
const { checkPaths, fullStatusCheck, testGoogleOAuth } = require('../controllers/debugController');

const router = express.Router();

router.get('/paths', checkPaths);
router.get('/status', fullStatusCheck);
router.get('/google-oauth', testGoogleOAuth);

module.exports = router;
