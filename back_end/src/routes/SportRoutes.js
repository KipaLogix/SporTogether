const express = require('express');
const router = express.Router();
const { getEventsSports } = require('../controllers/SportController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.route('/').get(getEventsSports);

module.exports = router;