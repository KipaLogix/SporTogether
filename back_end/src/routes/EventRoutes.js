const express = require('express');
const router = express.Router();


const { createEvent, getEventsByLocationAndArea, getEventById, addAllSports, getMyEvents } = require('../controllers/EventController');

const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.route('/').post(createEvent).get(getEventsByLocationAndArea);
router.route('/:id').get(getEventById);
router.route('/myEvents/:userId').get(getMyEvents);
router.route('/add').post(addAllSports);


module.exports = router;
