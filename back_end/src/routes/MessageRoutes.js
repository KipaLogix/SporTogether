const express = require('express');
const router = express.Router();
const { createMessage, getMessagesByEventId } = require('../controllers/MessageController');

router.route('/').post(createMessage);
router.route('/:eventId').get(getMessagesByEventId);

module.exports = router;