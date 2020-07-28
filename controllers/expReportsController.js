const ExpReport = require('../models/ExpReport');

const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc   Get Export Reports HTML
// @route  GET /api/v2/reports/exp
// @access Private

exports.getExpReportsHTML = (req, res, next) => {
    const lang = req.query.lang;
    res.status(200).render('expReports', {title: 'Izveštaji za inostrano tržište', path: 'ino', lang: lang});
};

// @desc   Create Report
// @route  POST /api/v2/reports/exp
// @access Private

exports.createExpReport = asyncHandler( async(req, res, next) => {
    req.body.createdByUser = req.user.id;
    
    const report = await ExpReport.create(req.body);

    res.status(201).json({
       success: true,
       data: report
   });
});