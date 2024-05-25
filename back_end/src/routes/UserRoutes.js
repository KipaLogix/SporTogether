const express = require('express');
const router = express.Router();

const { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser, registerUser } = require('../controllers/UserController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.route('/').post(createUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

//login route
router.post('/login', loginUser);

//signup route
router.post('/register', registerUser);

module.exports = router;
