const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// prilikom kreiranja novog proizvoda potrebno je da user bude logovan tako da ova middleware fja najpre preuzima token iz requesta, dekodira id i proverava usera
// token moze biti smesten na dva mesta ili u cookie ili u headers.authorization (string pocinje sa Bearer pa razmak pa token) 
exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    //console.log('poziva se protect, provera cookie / bearer');
    if (req.session && req.session.token) {
        token = req.session.token;
        //console.log('token je prosao preko bearer');
    } 
    
    // ako token ne postoji znaci da korisnik nije logovan
    if (!token) {
        //return next(new ErrorResponse('Korisnik nema autorizaciju da pristupi ovoj ruti.', 401));
        return res.redirect('/api/v2/auth/login');
    }

    try {
        // verifikacija tokena tj token se razlaze na JWT payload (id, issuedAt/iat, exp)
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // veoma prakticno da se ovako izvede jer nadalje request sadrzi usera
        req.user = await User.findById(decode.id);

        // mora i ovo da se doda ako je u medjuvremenu korisnik obrisan, a ostao je token - više teoretski, nakon postman testiranja
        if (!req.user) {
            //return next(new ErrorResponse('Ulogujte se ponovo, korisnik nema autorizaciju da pristupi ovoj ruti, ', 401));
            return res.redirect('/api/v2/auth/login');
        }

        next();
    } catch (err) {
            // return next(new ErrorResponse('Korisnik nema autorizaciju da pristupi ovoj ruti', 401));
            return res.redirect('/api/v2/auth/login');
    }
});

// odobri pristup samo određenim user roles
exports.authorize = (...roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return next(new ErrorResponse(`Korisnik sa role: ${req.user.role} ne može da pristupi ovoj ruti`, 403));
            }
            next();
    }
};