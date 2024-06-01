const express = require('express');
const router = express.Router();
const { createMessage, getMessagesByEventId } = require('../controllers/MessageController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.route('/').post(createMessage);
router.route('/:eventId').get(getMessagesByEventId);

module.exports = router;