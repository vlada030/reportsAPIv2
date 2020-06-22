const express = require('express');
const {register, login, getMe, logout} = require('../controllers/auth');

const router = express.Router();

// importuj middleware za autentikaciju
const { protect } = require('../middleware/auth');

router.route('/register').post(register);
router.post('/login', login);
router.get('/me', protect, getMe).get('/logout', protect, logout);

module.exports = router;