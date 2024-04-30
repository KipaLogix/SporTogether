const express = require('express');
const router = express.Router();
const { createEvent, getEventsByLocationAndArea } = require('../controllers/EventController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.route('/').post(createEvent).get(getEventsByLocationAndArea);

module.exports = router;