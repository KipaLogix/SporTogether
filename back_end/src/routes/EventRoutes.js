const express = require('express');
const router = express.Router();

const { createEvent, getEventsByLocationAndArea, getEventById, addAllSports, joinEvent, leaveEvent, cancelEvent, getMyEvents } = require('../controllers/EventController');

const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.route('/').post(createEvent).get(getEventsByLocationAndArea);
router.route('/:id').get(getEventById);
router.route('/myEvents/:userId').get(getMyEvents);
router.route('/add').post(addAllSports);
router.route('/join').post(joinEvent);
router.route('/leave').post(leaveEvent);
router.route('/cancel').delete(cancelEvent);


module.exports = router;
