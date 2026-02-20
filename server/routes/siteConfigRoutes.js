const express = require('express');
const router = express.Router();
const { getSiteConfig, updateSiteConfig } = require('../controllers/siteConfigController');
const { protect, ownerAdmin } = require('../middleware/authMiddleware');

router.get('/', getSiteConfig);
router.put('/', protect, ownerAdmin, updateSiteConfig);

module.exports = router;
