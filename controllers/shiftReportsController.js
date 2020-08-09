const ShiftReport = require('../models/ShiftReport');

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc   Get Shift Reports HTML
// @route  GET /api/v2/reports/shift
// @access Public

exports.getShiftReportsHTML = (req, res, next) => {

    res.status(200).render("shiftReports", {
        title: "Smenski izveštaj o radu",
        path: "shift",
        isAuthenticated: req.session.isLoggedIn,
        userName: req.session.name
    });
};

// @desc   Create Report
// @route  POST /api/v2/reports/shift
// @access Private

exports.createShiftReport = asyncHandler( async(req, res, next) => {

    req.body.createdByUser = req.user.id;
    const report = await ShiftReport.create(req.body);

    res.status(201).json({
        success: true,
        data: report
    })
});


// @desc   Get Report
// @route  GET /api/v2/reports/shift/:id
// @access Private

exports.getShiftReport = asyncHandler( async(req, res, next) => {

    const report = await ShiftReport.findById(req.params.id).populate({
        path: 'createdByUser',
        select: 'name'
    });
 
    if (!report) {
        return next(new ErrorResponse(`Izabrani izvestaj ne postoji`, 400));
    }
 
    res.status(200).json({
        success: true,
        data: report
    });
 });

// @desc   Get All Reports
// @route  GET /api/v2/reports/shift/all
// @access Private

exports.getAllShiftReports = asyncHandler( async(req, res, next) => {

    res.status(200).json(res.advancedResults);

    });

// @desc   Update Report
// @route  PUT /api/v2/reports/shift/:id
// @access Private

exports.updateShiftReport = asyncHandler( async(req, res, next) => {
    
    let report = await ShiftReport.findById(req.params.id);

    if (!report) {
        return next(new ErrorResponse('Zahtevani izvestaj ne postoji', 400));
    }
   
    req.body.updatedByUser = req.user.id;

    report = await ShiftReport.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: false,
        new: true
    });

    res.status(200).json({
       success: true,
       data: report
   });
});

// @desc   Delete Report
// @route  DELETE /api/v2/reports/shift/:id
// @access Private

exports.deleteShiftReport = asyncHandler( async(req, res, next) => {

    await ShiftReport.findByIdAndDelete(req.params.id);

    res.status(200).json({
       success: true,
       data: {}
    });
});