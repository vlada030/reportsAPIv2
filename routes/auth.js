const express = require('express');
const {register, login, getMe, logout, getRegisterUserHTML, getLoginUserHTML, updateDetails, updateAvatar} = require('../controllers/auth');

const multer = require('multer');
const upload = multer({
    dest: 'avatar'
});

const router = express.Router();

// importuj middleware za autentikaciju
const { protect } = require('../middleware/auth');

router.route('/register').get(getRegisterUserHTML).post(register);
router.route('/login').get(getLoginUserHTML).post(login);
router.get('/me', protect, getMe);
router.post('/me/avatar', protect, upload.single('avatar'), updateAvatar);
router.get('/logout', protect, logout);
router.put('/update', protect, updateDetails);

module.exports = router;