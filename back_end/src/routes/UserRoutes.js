const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser } = require('../controllers/UserController');

router.route('/').post(createUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
