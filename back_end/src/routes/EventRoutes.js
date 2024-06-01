const express = require('express');
const router = express.Router();


const { createEvent, getEventsByLocationAndArea, getSports, addAllSports } = require('../controllers/EventController');

const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.route('/').post(createEvent);
router.route('/latitude=:latitude/longitude=:longitude/area=:area/:sportId?').get(getEventsByLocationAndArea);

router.route('/add').post(addAllSports);

router.route('/sports').get(getSports);

module.exports = router;