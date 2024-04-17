const express = require('express');
const router = express.Router();
const { createEvent, getEventsByLocationAndArea } = require('../controllers/EventController');

router.route('/').post(createEvent).get(getEventsByLocationAndArea);

module.exports = router;