const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const errorResponse = require('../utils/errorResponse');
const errorHandler = require('../middleware/errorHandler');

// @desc    Get All Users
// @route   GET /api/v2/users
// @access  Private

exports.getUsers = asyncHandler(async (req, res, next) => {

    const users = await User.find().populate({
        path: 'products',
        select: 'sifra'
    });
 
    res.status(200).json({
        success: true,
        data: users
    });         
 }); 

// @desc    Get Users avatar
// @route   GET /api/v2/users/:id/avatar
// @access  Private

exports.getAvatar = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id).select('+avatar');

    if (!user || !user.avatar) {
        return next(new errorResponse(`Korisnik sa trazenim id ${req.params.id} ne postoji`, 400));
    }
    // nije bitna originalna extenzija slike bmp/jpg/jpeg/png
    res.set('Content-Type', 'image/jpeg');
 
    res.status(200).send(user.avatar);         
 }); 