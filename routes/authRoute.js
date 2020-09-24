const express = require('express');
const { check, body} = require('express-validator');

const {register, login, getMe, deleteMe, logout, logoutAll, getRegisterUserHTML, getLoginUserHTML, updateDetails, updatePassword, forgotPassword, updateAvatar, deleteAvatar, resetPassword, uploadUserPhoto} = require('../controllers/authController');

const router = express.Router();

// importuj middleware za autentikaciju
const { protect } = require('../middleware/auth');

router
    .route("/register")
    .get(getRegisterUserHTML)
    .post(
        [
            check("name")
                .not()
                .isEmpty()
                .withMessage("Unesite korisničko ime")
                .isLength({ max: 15 })
                .withMessage("Korisničko ime može sadržati najviše 15 karaktera")
                .trim(),
            check("email")
                .isEmail()
                .withMessage("Unesite ispravnu email adresu")
                .normalizeEmail(),
            check(
                "password",
                "Šifra treba da sadrži slova i brojeve, 7 - 15 karaktera"
            )
                .isLength({ min: 7, max: 15 })
                .isAlphanumeric(),
            body("confirmPassword").custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Šifre se ne podudaraju, ponovite unos");
                }
                return true;
            }),
        ],
        register
    );
router.route("/login").get(getLoginUserHTML).post(login);
router.post("/logout", protect, logout);
router.post("/logoutAll", protect, logoutAll);

router.route("/me").get(protect, getMe).delete(protect, deleteMe);
router
    .route("/me/avatar")
    .put(protect, uploadUserPhoto, updateAvatar)
    .delete(protect, deleteAvatar);

router.put(
    "/me/update",
    protect,
    [
        check("name")
            .optional()
            .isLength({ max: 15 })
            .withMessage("Korisničko ime može sadržati najviše 15 karaktera")
            .trim(),
        check("email")
            .optional()
            .isEmail()
            .withMessage("Unesite ispravnu email adresu")
            .normalizeEmail(),
    ],
    updateDetails
);

router.put(
    "/me/updatepassword",
    protect,
    [
        body(
            "currentPassword",
            "Polje Postojeća šifra treba da sadrži slova i brojeve, 7 - 15 karaktera"
        ).isLength({ min: 7, max: 15 }),
        body(
            "newPassword",
            "Polje Nova šifra treba da sadrži slova i brojeve, 7 - 15 karaktera"
        ).isLength({ min: 7, max: 15 })
    ],
    updatePassword
);

router.post("/resetpassword", forgotPassword);

router.put(
    "/resetpassword/:resettoken",
    [
        body(
            "password",
            "Šifra treba da sadrži slova i brojeve, 7 - 15 karaktera"
        ).isLength({ min: 7, max: 15 })
    ],
    resetPassword
);

module.exports = router;