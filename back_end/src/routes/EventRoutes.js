const express = require('express');
const router = express.Router();


const { createEvent, getEventsByLocationAndArea, getEventById, addAllSports } = require('../controllers/EventController');

const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.route('/').post(createEvent);
router.route('/:id').get(getEventById);
router.route('/').get(getEventsByLocationAndArea);
router.route('/add').post(addAllSports);


module.exports = router;
