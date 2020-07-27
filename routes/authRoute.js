const express = require('express');
const {register, login, getMe, deleteMe, logout, logoutAll, getRegisterUserHTML, getLoginUserHTML, updateDetails, updatePassword, forgotPassword, updateAvatar, deleteAvatar, resetPassword, uploadUserPhoto} = require('../controllers/authController');

const router = express.Router();

// importuj middleware za autentikaciju
const { protect } = require('../middleware/auth');

router.route('/register').get(getRegisterUserHTML).post(register);
router.route('/login').get(getLoginUserHTML).post(login);
router.route('/me').get(protect, getMe).delete(protect, deleteMe);
router.route('/me/avatar').post(protect, uploadUserPhoto, updateAvatar).delete(protect, deleteAvatar);
router.get('/logout', protect, logout);
router.get('/logoutAll', protect, logoutAll);
router.put('/update', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/resetpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;