const express = require('express');
const {register, login, getMe, deleteMe, logout, logoutAll, getRegisterUserHTML, getLoginUserHTML, updateDetails, updatePassword, forgotPassword, updateAvatar, deleteAvatar, uploadUserPhoto} = require('../controllers/authController');

const router = express.Router();

// importuj middleware za autentikaciju
const { protect } = require('../middleware/auth');

router.route('/register').get(getRegisterUserHTML).post(register);
router.route('/login').get(getLoginUserHTML).post(login);
router.get('/me', protect, getMe);
router.delete('/me', protect, deleteMe);
router.post('/me/avatar', protect, uploadUserPhoto, updateAvatar);
router.delete('/me/avatar', protect, deleteAvatar);
router.get('/logout', protect, logout);
router.get('/logoutAll', protect, logoutAll);
router.put('/update', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);

module.exports = router;