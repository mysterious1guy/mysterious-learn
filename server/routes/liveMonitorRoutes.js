const express = require('express');
const { getLiveMonitor, executeCommand, streamActions } = require('../controllers/liveMonitorController');

const router = express.Router();

router.get('/', getLiveMonitor);
router.post('/execute', executeCommand);
router.get('/stream', streamActions);

module.exports = router;
