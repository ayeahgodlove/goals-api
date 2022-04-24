const express = require('express');
const router = express.Router();
const { getUsers, registerUser, loginUser, getMe } = require('../controllers/usersController')

router.get('/', getUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getMe);

module.exports = router;