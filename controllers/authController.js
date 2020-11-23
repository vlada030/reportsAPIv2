const fs = require('fs');
const crypto = require('crypto');
const {validationResult} = require('express-validator');

const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const { sendWelcomeEmail, sendCancelEmail, sendResetPasswordEmail } = require('../utils/sendEmail');

const sharp = require('sharp');
const multer = require('multer');

// disk storage ukoliko fajl direktno snimamo u public folder
// const multerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "/public/img/user");
//     },
//     filename: function (req, file, cb) {
//         const ext = file.mimetype.split("/")[1];

//         cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//     },
// });

// pošto koristimo sharp, bolje je da sliku preuzima iz memorije
const multerStorage = multer.memoryStorage();

// filtriranje input fajla
const multerFilter = (req, file, cb) => {
    if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg|bmp)$/)) {
        return cb(
            new ErrorResponse(
                "Izabrani fajl nije slika, ponovite unos i izaberite sliku",
                400
            ),
            false
        );
    }
    // ovo je default ako je validacija true
    cb(null, true);
};

const upload = multer({
    // kada je ovo podeseno ONDA SE NE VIDI FAJL u req.file i plus posto se ceo kod aploaduje na heroku, AWS, prilikom svakog pokretanja app ceo file sistem SE BRISE zato moraju slike da se sacuvaju u db    
    //dest: 'avatar/'
    limits: {
        fileSize: 10*1024*1024
    },
    storage: multerStorage,
    fileFilter: multerFilter
});

// middleware za upload avatar slike
exports.uploadUserPhoto = upload.single('avatar');


// @desc   Get HTML for User register
// @route  GET /api/v2/auth/register
// @access Public

exports.getRegisterUserHTML = (req, res) => {

    // ukoliko nema error, message je prazan niz pa ga pug ne vidi kao nepostojeci
    let message = req.flash('error');
    if (message.length === 0) {
        message = false
    }
    // implementirano pamcenje prethodnog unosa
    // pri prvom pokretanju nema vrednosti za ove ulaze
    res.status(200).render("user_registration", {
        title: "Registracija novog korisnika",
        errorMessage: message,
        oldInput: { name: "", email: "", password: "", confirmPassword: "" }
    });
};


// @desc   Register User
// @route  POST /api/v1/auth/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
    
    const {name, email, password, confirmPassword} = req.body;

    const errors = validationResult(req);
    //console.log(errors)
    
    // validacija preko express-validatora
    // implementirano pamcenje prethodnog unosa
    if (!errors.isEmpty()) {
        return res.status(422).render("user_registration", {
            title: "Registracija novog korisnika",
            errorMessage: errors.array()[0].msg,
            oldInput: {name, email, password, confirmPassword}
        })
    }

    const emailExist = await User.findOne({email});

    if (emailExist) {
        //req.flash('error', 'Korisnik sa unetim e-mailom postoji')
        // return res.redirect('/api/v2/auth/register');
        return res.status(422).render("user_registration", {
            title: "Registracija novog korisnika",
            errorMessage: 'Korisnik sa unetim e-mailom postoji',
            oldInput: {name, email, password, confirmPassword}
        })
    }

    const user = await User.create({
        name,
        email,
        password  
    });

    // slanje welcome emaila nakon uspesnog snimanja 
    sendWelcomeEmail(user.name, user.email);

    // generisi token i session podatke
    // postavi response status na 200 
    await sendTokenResponse(user, 200, res, req);

    res.redirect('/api/v2/reports/dom');
});
    
// @desc   Get HTML for User login
// @route  GET /api/v2/auth/login
// @access Public

exports.getLoginUserHTML = (req, res) => {
    //console.log(req.session);
    // ukoliko nema error, message je prazan hiz pa ga pug vidi kao postojeci
    
    let message =  req.flash('error');

    if (message.length === 0) {
        message = false
    } 

    res.status(200).render("user_login", {
        title: "Prijava korisnika",
        errorMessage: message,
        oldInput: {email: '', password:''}      
    });
};
    
// @desc   Login User
// @route  POST /api/v2/auth/login
// @access Public

exports.login = asyncHandler(async (req, res, next) => {
    
    // ako se podaci salju kao json, bodyparser ih ubacuje u req.body
    var {email, password} = req.body;

    // formidable pored podataka iz formData moze da prihvata i json , u tom slucaju ne treba bodyparser
    // ubacuje ih u body.fields
    //const {email, password} = req.fields;
    
    // validacija da li su polja prazna
    if (!email || !password) {
        //return next(new ErrorResponse('Unesite email i šifru', 400));
        //req.flash('error', 'Obavezna polja označena su zvezdicom');
        return res.status(422).render("user_login", {
            title: "Prijava korisnika",
            errorMessage: 'Obavezna polja označena su zvezdicom',
            oldInput: {email, password}
        });
    }
    // gore iznad select: false znaci da nam ne vraca sifru, ali ovde nam je potrebna da bi mogli da uporedimo sifre i dodajemo select(+password)
    const user = await User.findOne({email}).select('+password');

    if (!user) {
        // return next(new ErrorResponse('Pogrešno uneti podaci. Invalid credentials.', 401));
        //req.flash('error', 'Pogrešno uneti podaci');
        return res.status(422).render("user_login", {
            title: "Prijava korisnika",
            errorMessage: 'Pogrešno uneti podaci',
            oldInput: {email, password}
        });
    }
    // pozivanje methods iz User modela za proveru sifre
    const isMatch = await user.passwordMatchCheck(password);

    if (!isMatch) {
       // return next(new ErrorResponse('Pogrešno uneti podaci. Invalid credentials.', 401));
       //req.flash('error', 'Pogrešno uneti podaci');
       return res.status(422).render("user_login", {
            title: "Prijava korisnika",
            errorMessage: 'Pogrešno uneti podaci',
            oldInput: {email, password}
        });
    }
    
    // generisi token i session podatke
    // postavi response status na 200 
    await sendTokenResponse(user, 200, res, req);

    res.redirect('/api/v2/reports/dom');
    
}); 


// @desc   Get loged user
// @route  GET /api/v2/auth/me
// @access Private

exports.getMe = asyncHandler(async (req, res) => {

    // const user = await User.findById(req.user.id).populate({
    //     path: 'products',
    //     select:'proizvod sifra'
    // });

    res.status(200).render("user_panel", {
        title: "Kornički panel",
        userName: req.session.name,
        avatarUrl: req.session.avatarUrl,
        userEmail: req.session.email
    
    });
});

// @desc    Update loged user info 
// @route   PUT /api/v2/auth/me/update
// @access  Private

exports.updateDetails = asyncHandler(async (req, res, next) => {
    const  errors = validationResult(req);
    const errorsString = errors.array().reduce((acc, val) => {
        acc += `${val.msg}; `;
        return acc
    }, '');
        
    // validacija preko express-validatora
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errorsString
        })
    }

    const emailExist = await User.findOne({email: req.body.email});

    if (emailExist) {
        return res.status(400).json({
            success: false,
            error: 'Korisnik sa unetim e-mailom postoji'
        })
    }
    
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true
    });  

    // generisi novi token i session podatke
    // postavi response status na 200
    await sendTokenResponse(user, 200, res, req);
    
    // refresh stranice da se vide izmene
    res.json({success: true});    
    
});  

// @desc    Update loged user password 
// @route   PUT /api/v2/auth/me/updatePassword
// @access  Private

exports.updatePassword = asyncHandler(async (req, res, next) => {
    
    const  errors = validationResult(req);
    const errorsString = errors.array().reduce((acc, val) => {
        acc += `${val.msg}; `;
        return acc
    }, '');
        
    // validacija preko express-validatora
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errorsString
        })
    }

    const user = await User.findById(req.user.id).select('+password');

    // pozivamo methods iz User modela
    if (!(await user.passwordMatchCheck(req.body.currentPassword))) {
        return next(new ErrorResponse('Unesite ispravnu tekuću šifru', 401));
    }

    user.password = req.body.newPassword;

    // izbrisi sve tokene iz tokens array
    user.tokens = [];

    await user.save();
    // prilikom promene ili resetovanja sifre VRACA SE TOKEN - pravilo
    // jer je sada korisnik sa drugom sifrom
    await sendTokenResponse(user, 200, res, req);  
    
    res.json({success: true});
}); 

// @desc    Forgotten password HTML
// @route   GET /api/v2/auth/resetpassword
// @access  Public

exports.getForgottenPasswordHTML = asyncHandler((req, res) => {
    
    res.status(200).render('user_resetpassword_email', {
        title: "Zaboravljena šifra"
    })
});

// @desc    Forgotten password link
// @route   POST /api/v2/auth/resetpassword
// @access  Public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    // nadji korisnika preko unetog emaila
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        //return next(new ErrorResponse('Ne postoji korisnik sa tom e-mail adresom!', 404));
        return res.status(404).render('user_resetpassword_email', {
            title: "Zaboravljena šifra",
            errorMessage: 'Ne postoji korisnik sa tom e-mail adresom',
            oldInputEmail: req.body.email
        });
    }
    //generisi reset token i dodavanje useru token / vreme isteka
    const resetToken = user.getResetPasswordToken();

    // snimanje hashovanog tokena i vremena isteka
    await user.save();

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v2/auth/resetpassword/${resetToken}`;

    console.log(resetUrl);

    //slanje emaila sa linkom za reset
    try {
        await sendResetPasswordEmail(
            user.name, 
            user.email, 
            resetUrl);

            console.log(`Uspešno poslata poruka na adresu ${user.email}`.green);

            req.flash('error', 'Link za reset šifre je uspešno poslat. Proverite email')
            res.redirect('/api/v2/auth/login');
                
                    
    } catch (error) {
        console.log(`Poruka nije poslata na adresu ${user.email}. Error message: ${error}`.red);
        // resetuj reset polja i snimi ih
        user.resetPasswordToken = void 0;
        user.resetPasswordExpire = void 0;
        await user.save();

        //return next(new ErrorResponse('Došlo je do greške, poruka nije poslata'), 500);
        res.status(500).render('user_resetpassword_email', {
            title: "Zaboravljena šifra",
            errorMessage: 'Došlo je do greške, poruka nije poslata, pokušajte ponovo.'
        });
    }
});

// @desc    Open Forgotten password link HTML
// @route   GET /api/v2/auth/resetpassword/:resettoken
// @access  Public

exports.getOpenForgottenPasswordLinkHTML = asyncHandler((req, res) => {
    let message = req.flash('error');
    if (message.length === 0) {
        message = false
    }
    res.status(200).render('user_resetpassword_link', {
        title: 'Zaboravljena šifra',
        errorMessage: message
    });
});

// @desc    Reset password
// @route   PUT /api/v2/auth/resetpassword/:resettoken
// @access  Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    // validacija input password
    const  errors = validationResult(req);
    const errorsString = errors.array().reduce((acc, val) => {
        acc += `${val.msg}; `;
        return acc
    }, '');
        
    // validacija preko express-validatora
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errorsString
        })
    }

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()} 
    });

    if (!user) {
        //return next(new ErrorResponse('Neispravan token. Obratite pažnju da imate 10 minuta od momenta pristizanja emaila da resetujete zaboravljenu šifru.', 400));
        return res.status(422).render("user_login", {
            title: "Prijava korisnika",
            errorMessage: 'Neispravan token. Obratite pažnju da imate 10 minuta od momenta pristizanja emaila da resetujete zaboravljenu šifru.',
            oldInput: {email: '', password:''}
        });
    }

    user.password = req.body.password;
    user.resetPasswordToken = void 0;
    user.resetPasswordExpire = void 0;

    await user.save();

    await sendTokenResponse(user, 200, res, req);

    res.json({sucess: true});

});

// @desc    Update user avatar
// @route   PUT /api/v2/auth/me/avatar
// @access  Private

exports.updateAvatar = asyncHandler(async (req, res, next) => {
    // samo ako u multer.options nemamo dest onda ovde preko req.file mozemo da mu pristupimo
    if (!req.file) {
        return next(new ErrorResponse('Niste izabrali avatar sliku', 400));
    }
    // VARIJANTA AVATAR U PUBLIC
    // zapamti ime slike koje treba da se izbrise nakon update
    // const removeFromPublic = req.user.avatar;

    // VARIJANTA AVATAR U PUBLIC
    //const ext = req.file.mimetype.split("/")[1];
    // const url = `user/user-${req.user.id}-${Date.now()}.jpeg`;

    // VARIJANTA AVATAR U PUBLIC
    // sharp modula za narmalizaciju slike resize / jpeg, prihvata se kao buffer i nakon obrade snima se u fajl
    // await sharp(req.file.buffer).resize({width: 500, height: 500}).toFormat('jpeg').jpeg({quality: 90}).toFile(`public/img/${url}`);

    // VARIJANTA AVATAR U PUBLIC
    // const user = await User.findByIdAndUpdate(req.user.id, {avatar: url}, {
    //     new: true
    // });

    // VARIJANTA AVATAR U PUBLIC
    // izbriši avatar iz public foldera osim ako je default
    // if (!removeFromPublic.endsWith('.png')) {
    //     fs.unlink(`public/img/${removeFromPublic}`, (err) => {
    //         if (err) {
    //             console.log('Slika ne postoji u Public folderu.');
    //         } else {
    //             console.log('Slika uspešno obrisana iz Public foldera.');
    //         }
    //    })
    // }

    // dodavanje sharp modula za narmalizaciju slike resize / jpeg i vracanje buffer formata zbog snimanja u db
    const buffer = await sharp(req.file.buffer).resize({width: 500, height: 500}).toFormat('jpeg').jpeg({quality: 90}).toBuffer();

    const user = await User.findByIdAndUpdate(req.user.id, {avatar: buffer}, {
        new: true
    });
    
    // nema refresh stranice
    // res.status(200).json({
    //     success: true,
    //     data: user
    // });  

    // generisi novi token i session podatke
    // postavi response status na 200
    await sendTokenResponse(user, 200, res, req);
    
    // refresh stranice da se vide izmene
    res.json({success: true});   
    
});

// @desc    Delete user avatar
// @route   DELETE /api/v2/auth/me/avatar
// @access  Private

exports.deleteAvatar = asyncHandler(async (req, res, next) => {
    let user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorResponse(`Korisnik sa trazenim id ${req.user.id} ne postoji`, 400));
    }
    // VARIJANTA AVATAR U PUBLIC
    //const removeFromPublic = req.user.avatar;

    // VARIJANTA AVATAR U PUBLIC
    // vrati vrednost polja na default
    //req.user.avatar = 'user/user-default.png';

    req.user.avatar = void 0;

    user = await User.findByIdAndUpdate(req.user.id, {avatar: req.user.avatar}, {
        new: true
    });

    // VARIJANTA AVATAR U PUBLIC
    // izbriši avatar iz public foldera osim ako je default
    // if (!removeFromPublic.endsWith('.png')) {
    //     fs.unlink(`public/img/${removeFromPublic}`, (err) => {
    //         if (err) {
    //             console.log('Slika ne postoji u Public folderu.');
    //         } else {
    //             console.log('Slika uspešno obrisana iz Public foldera.');
    //         }
    //    })
    // }

    // generisi novi token i session podatke
    // postavi response status na 200
    await sendTokenResponse(user, 200, res, req);
    
    // refresh stranice da se vide izmene
    res.json({success: true});        
});

// @desc    Log user out & clear cookie 
// @route   POST /api/v2/auth/logout
// @access  Private

exports.logout = asyncHandler(async (req, res, next) => {

    // brisanje tokena iz kog hocemo da se izlogujemo, ostali ostaju
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.session.token );    
    await req.user.save();

    // postavljanje cookija na vrednost none
    // res.cookie('token', 'none', {
    //     expires: new Date(Date.now() + 10 * 1000),
    //     httpOnly: true
    // });

    
    // res.status(200).json({
        //     success: true,
        //     data: "Current user session logged out"
        // });
        
    // brisanje session
    req.session.destroy(err => {
        //console.log(err);
        res.redirect('/api/v2/reports/dom');
    });
}); 

// @desc    Log user out & clear cookie 
// @route   POST /api/v2/auth/logoutAll
// @access  Private

exports.logoutAll = asyncHandler(async (req, res, next) => {
    
    // brisanje svih tokena tj brisanje svoh sessions, izlogujemo se iz svih uređaja
    req.user.tokens = [];
    await req.user.save();

    // postavljanje cookija na vrednost none
    // res.cookie('token', 'none', {
    //     expires: new Date(Date.now() + 10 * 1000),
    //     httpOnly: true
    // });
    
    // res.status(200).json({
    //     success: true,
    //     data: "All user's sessions logged out"
    // });
    
    // brisanje session
    req.session.destroy(err => {
        //console.log(err);
        res.redirect('/api/v2/reports/dom');
    });

});

// @desc    Delete Logged user 
// @route   DELETE /api/v2/auth/me
// @access  Private

exports.deleteMe = asyncHandler(async (req, res, next) => {
    
    await User.findByIdAndDelete(req.user.id);

    // postavljanje cookija na vrednost none
    // res.cookie('token', 'none', {
    //     expires: new Date(Date.now() + 10 * 1000),
    //     httpOnly: true
    // });

    // slanje emaila sa potvrdom brisanja svog accounta
    sendCancelEmail(req.user.name, req.user.email);

    // brisanje session
    req.session.destroy(err => {
        //console.log(err);
        res.status(200).redirect('/api/v2/auth/login');
    });

}); 

// kreiranje tokena, cookie i generisanje responsa
// tokenu na FE se može pristupiti preko local Storage ili preko cookie što je sigurnije 
const sendTokenResponse = async (user, statusCode, res, req) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        // cookie moze da procita samo http scripta na FE
        httpOnly: true,
        // domain: 'localhost',
        path: '/'
    };

    // kada se app pokreće u production modu pošalji cookie preko https, u tom slučaju postavi Security flag na true    
    if (process.env.NODE_ENV === "production") {
        // ovim se to postize
        options.secure = true;
    }

    // ubačeno snimanje tokena u model tj bazu kako bi se moglo napraviti "pravo" logovanje sa vise uređaja i odjavljivanje sa pojedinih dok ostali ostaju ulogovani
    // isto generisani token ostaje i dalje validan i nakon odjavljivanja pa to neko moze da zloupotrebi, ovim se to izbegava
    user.tokens = user.tokens.concat({token});
    await user.save();

    // dodavanje potrebnih informacija u session
    req.session.token = token;
    req.session.isLoggedIn = true;
    req.session.name = user.name;
    // ukoliko avatar binary postoji pretvori ga u string base64 (`data:image/jpeg;base64,${avatarUrl}`), a ukoliko ne preko pug postavi default src='/img/user/user-default.png'
    req.session.avatarUrl = user.avatar ? new Buffer.from(user.avatar).toString('base64') : null;
    req.session.email = user.email;    
    
    res
    .status(statusCode)
    
};