const express = require('express');
const { checkPaths, fullStatusCheck, testGoogleOAuth, testEmail } = require('../controllers/debugController');

const router = express.Router();

router.get('/paths', checkPaths);
router.get('/status', fullStatusCheck);
router.get('/google-oauth', testGoogleOAuth);
router.get('/test-email', testEmail);

module.exports = router;
