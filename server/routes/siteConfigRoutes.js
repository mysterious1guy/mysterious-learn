const express = require('express');
const router = express.Router();
const { getSiteConfig, updateSiteConfig } = require('../controllers/siteConfigController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getSiteConfig);
router.put('/', protect, admin, updateSiteConfig);

module.exports = router;
