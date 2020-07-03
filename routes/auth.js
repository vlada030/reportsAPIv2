const express = require('express');
const {register, login, getMe, logout, getRegisterUserHTML, getLoginUserHTML} = require('../controllers/auth');

const router = express.Router();

// importuj middleware za autentikaciju
const { protect } = require('../middleware/auth');

router.route('/register').get(getRegisterUserHTML).post(register);
router.route('/login').get(getLoginUserHTML).post(login);
router.get('/me', protect, getMe).get('/logout', protect, logout);

module.exports = router;