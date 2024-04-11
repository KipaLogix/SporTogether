const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/UserController');

router.post('/post_user', createUser);
router.get('/get_users', getUsers);
router.get('/get_user/:id', getUserById);
router.put('/update_user/:id', updateUser);
router.delete('/delete_users/:id', deleteUser);

module.exports = router;
