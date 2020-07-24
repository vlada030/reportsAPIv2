const express = require('express');
const {register, login, getMe, logout, logoutAll, getRegisterUserHTML, getLoginUserHTML, updateDetails, updateAvatar, deleteAvatar} = require('../controllers/auth');


const router = express.Router();

// importuj middleware za autentikaciju
const { protect } = require('../middleware/auth');
const ErrorResponse = require('../utils/errorResponse');

const multer = require('multer');
const upload = multer({
    // kada je ovo podeseno ONDA SE NE VIDI FAJL u req.file i plus posto se ceo kod aploaduje na heroku, AWS, prilikom svakog pokretanja app ceo file sistem SE BRISE zato moraju slike da se sacuvaju u db    
    //dest: 'avatar/'
    limits: {
        fileSize: 10*1024*1024
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg|bmp)$/)) {
            return cb(new ErrorResponse('Izabrani fajl nije slika, ponovite unos i izaberite sliku', 400))
        }
        // ovo je default ako je validacija true
        cb(undefined, true);
    }        
});

router.route('/register').get(getRegisterUserHTML).post(register);
router.route('/login').get(getLoginUserHTML).post(login);
router.get('/me', protect, getMe);
router.post('/me/avatar', protect, upload.single('avatar'), updateAvatar);
router.delete('/me/avatar', protect, deleteAvatar);
router.get('/logout', protect, logout);
router.get('/logoutAll', protect, logoutAll);
router.put('/update', protect, updateDetails);

module.exports = router;