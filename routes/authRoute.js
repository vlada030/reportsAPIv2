const express = require('express');
const {register, login, getMe, logout, logoutAll, getRegisterUserHTML, getLoginUserHTML, updateDetails, updatePassword, updateAvatar, deleteAvatar, uploadUserPhoto} = require('../controllers/authController');

const router = express.Router();

// importuj middleware za autentikaciju
const { protect } = require('../middleware/auth');

router.route('/register').get(getRegisterUserHTML).post(register);
router.route('/login').get(getLoginUserHTML).post(login);
router.get('/me', protect, getMe);
router.post('/me/avatar', protect, uploadUserPhoto, updateAvatar);
router.delete('/me/avatar', protect, deleteAvatar);
router.get('/logout', protect, logout);
router.get('/logoutAll', protect, logoutAll);
router.put('/update', protect, updateDetails);
router.put('/updatePassword', protect, updatePassword);

module.exports = router;