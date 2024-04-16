const express = require('express');
const router = express.Router();
const { createEvent, getEventsByLocationAndArea } = require('../controllers/EventController');

router.post('/addEvent', createEvent);
router.get('/getEvents', getEventsByLocationAndArea);

module.exports = router;