const {validationResult} = require('express-validator');

const ShiftReport = require('../models/ShiftReport');

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const { getCurrentDate } = require("../utils/getCurrentDate");

// @desc   Get Shift Reports HTML
// @route  GET /api/v2/reports/shift
// @access Public

exports.getShiftReportsHTML = (req, res, next) => {
    

    // dodaj danasnji datum ukoliko se ucitava prazan template
    const report = {}
    report["datum"] = getCurrentDate();
    
    res.status(200).render("shiftReports", {
        title: "Smenski izveštaj o radu",
        path: "shift",
        isAuthenticated: req.session.isLoggedIn,
        avatarUrl: req.session.avatarUrl,
        userName: req.session.name,
        report
    });
};

// @desc   Create Report
// @route  POST /api/v2/reports/shift
// @access Private

exports.createShiftReport = asyncHandler( async(req, res, next) => {

    req.body.createdByUser = req.user.id;

    // cupanje errors iz express-validator
    const errors = validationResult(req);
    //console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(422).render("shiftReports", {
            title: "Smenski izveštaj o radu",
            path: "shift",
            userName: req.session.name,
            avatarUrl: req.session.avatarUrl,
            errorMessage: errors.array()[0].msg,
            report: req.body            
        })
    }

    const report = await ShiftReport.create(req.body);

    res.status(201).render("shiftReports", {
        title: "Smenski izveštaj o radu",
        path: "shift",
        userName: req.session.name,
        avatarUrl: req.session.avatarUrl,
        successMessage: 'Izveštaj je uspešno kreiran',
        report            
    })
});


// @desc   Get Report
// @route  GET /api/v2/reports/shift/:id
// @access Private

exports.getShiftReport = asyncHandler( async(req, res, next) => {
    //let report = {}

    let report = await ShiftReport.findById(req.params.id).populate({
        path: 'createdByUser',
        select: 'name'
    });

    //console.log(report);
        
    if (!report) {
        return res.status(404).render("shiftReports", {
            title: "Smenski izveštaj o radu",
            path: "shift",
            userName: req.session.name,
            avatarUrl: req.session.avatarUrl,
            errorMessage: 'Traženi izveštaj ne postoji ili je izbrisan.',
        });
    }
    
    if (!report.datum) {
        report["datum"] = getCurrentDate();
    }

    res.status(200).render("shiftReports", {
        title: "Smenski izveštaj o radu",
        path: "shift",
        userName: req.session.name,
        avatarUrl: req.session.avatarUrl,
        report            
    });
 });

// @desc   Shift Reports - all
// @route  GET /api/v2/reports/shift/allReports
// @access Private
 exports.getAllShiftReportsHTML = asyncHandler(async(req, res) => {
    const reports = res.advancedResults;
    //console.log(reports);

    res.status(200).render("shiftReportsAll", {
        title: "Smenski izveštaj o radu",
        path: "shift",
        userName: req.session.name,
        avatarUrl: req.session.avatarUrl,
        reports
    });
});

// @desc   Get All Reports in JSON
// @route  GET /api/v2/reports/shift/json
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
    
    if (req.user.id !== report.createdByUser.toString()) {
        return next(new ErrorResponse(`Možete vršiti izmene samo na izveštaju koji ste vi kreirali`, 403));
    }

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