const express = require('express');
const router = express.Router();
const { getUsers, registerUser, loginUser, getMe } = require('../controllers/usersController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;