const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const errorResponse = require('../utils/errorResponse');
const sharp = require('sharp');

// @desc   Get HTML for User register
// @route  GET /api/v2/auth/register
// @access Public

exports.getRegisterUserHTML = (req, res) => {

    res.status(200).render('user_registration', {title: 'Registracija novog korisnika', path: 'none', lang: 'none'});
};


// @desc   Register User
// @route  POST /api/v1/auth/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
    
    const {name, email, password, role} = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
        role
    });
    // umesto ovoga ispod stavlja se response koji u sebi ukljucuju cookie
    await sendTokenResponse(user, 200, res);
    
    // // nakon sto je iznad sve prošlo kreiraj token i uključi ga u response
    // const token = user.getSignedJwtToken();
    
    // res.status(200).json({
        //     success: true,
        //     token
        // });
    });
    
// @desc   Get HTML for User login
// @route  GET /api/v2/auth/login
// @access Public

exports.getLoginUserHTML = (req, res) => {

    res.status(200).render('user_login', {title: 'Prijava korisnika', path: 'none', lang: 'none'});
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
        return next(new errorResponse('Unesite email i šifru', 400));
    }
    // gore iznad select: false znaci da nam ne vraca sifru, ali ovde nam je potrebna da bi mogli da uporedimo sifre i dodajemo select(+password)
    const user = await User.findOne({email}).select('+password');

    if (!user) {
        return next(new errorResponse('Pogrešno uneti podaci. Invalid credentials.', 401));
    }
    // pozivanje methods iz User modela za proveru sifre
    const isMatch = await user.passwordMatchCheck(password);

    if (!isMatch) {
        return next(new errorResponse('Pogrešno uneti podaci. Invalid credentials.', 401));
    }

    // umesto ovoga ispod stavlja se response koji u sebi ukljucuju cookie
    await sendTokenResponse(user, 200, res);

    // // nakon sto je iznad sve prošlo kreiraj token i uključi ga u response
    // const token = user.getSignedJwtToken();

    // res.status(200).json({
    //     success: true,
    //     token
    // });
}); 


// @desc   Get loged user
// @route  GET /api/v2/auth/me
// @access Private

exports.getMe = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id).populate({
        path: 'products',
        select:'proizvod sifra'
    });
    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Update loged user info 
// @route   GET /api/v2/auth/updateDetails
// @access  Private

exports.updateDetails = asyncHandler(async (req, res, next) => {
    const { name, email } = req.body;
    
    const user = await User.findByIdAndUpdate(req.user.id, {name, email}, {
        new: true,
        runValidators: true
    });  
    
    res.status(200).json({
        success: true,
        data: user
    });    
    
}); 

// @desc    Create / Update user avatar
// @route   POST /api/v2/auth/me/avatar
// @access  Private

exports.updateAvatar = asyncHandler(async (req, res, next) => {
    // samo ako u multer.options nemamo dest onda ovde preko req.file mozemo da mu pristupimo
    if (!req.file) {
        return next(new errorResponse('Niste izabrali avatar sliku', 400));
    }
    
    //req.user.avatar = req.file.buffer;
    // dodavanje sharp modula za narmalizaciju slike resize / png i vracanje u buffer format zbog snimanja u db
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();

    //const user = await req.user.save();
    const user = await User.findByIdAndUpdate(req.user.id, {avatar: buffer}, {
        new: true
    });

    res.status(200).json({
        success: true,
        data: user
    });    
    
}); 

// @desc    Delete user avatar
// @route   DELETE /api/v2/auth/me/avatar
// @access  Private

exports.deleteAvatar = asyncHandler(async (req, res, next) => {
        
   req.user.avatar = void 0;

    //const user = await req.user.save();
    const user = await User.findByIdAndUpdate(req.user.id, {avatar: req.user.avatar}, {
        new: true
    });

    res.status(200).json({
        success: true,
        data: user
    });    
    
}); 


// @desc    Log user out & clear cookie 
// @route   GET /api/v2/auth/logout
// @access  Private

exports.logout = asyncHandler(async (req, res, next) => {

    // brisanje tokena iz kog hocemo da se izlogujemo, ostali ostaju
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.cookies.token );    
    await req.user.save();

    // postavljanje cookija na vrednost none
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    
    res.status(200).json({
        success: true,
        data: "Current user session logged out"
    });

}); 

// @desc    Log user out & clear cookie 
// @route   GET /api/v2/auth/logoutAll
// @access  Private

exports.logoutAll = asyncHandler(async (req, res, next) => {
    
    // brisanje svih tokena tj brisanje svoh sessions, izlogujemo se iz svih uređaja
    req.user.tokens = [];
    await req.user.save();

    // postavljanje cookija na vrednost none
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    
    res.status(200).json({
        success: true,
        data: "All user's sessions logged out"
    });

}); 

// kreiranje tokena, cookie i generisanje responsa
// tokenu na FE se može pristupiti preko local Storage ili preko cookie što je sigurnije 
const sendTokenResponse = async (user, statusCode, res) => {
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

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        token
    })
};