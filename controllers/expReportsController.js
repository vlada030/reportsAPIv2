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

// @desc   Get All Reports
// @route  GET /api/v2/reports/exp/all
// @access Private

exports.getAllExpReports = asyncHandler( async(req, res, next) => {

//    const reports = await ExpReport.find().populate({
//        path: 'createdByUser',
//        select: 'name'
//    });

   res.status(200).json(res.advancedResults);
});

// @desc   Get Report
// @route  GET /api/v2/reports/exp/:id
// @access Private

exports.getExpReport = asyncHandler( async(req, res, next) => {

   const report = await ExpReport.findById(req.params.id).populate({
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

// @desc   Update Report
// @route  PUT /api/v2/reports/exp/:id
// @access Private

exports.updateExpReport = asyncHandler( async(req, res, next) => {
    
    let report = await ExpReport.findById(req.params.id);

    if (!report) {
        return next(new ErrorResponse('Zahtevani izvestaj ne postoji', 400));
    }
   
    req.body.updatedByUser = req.user.id;

    report = await ExpReport.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: false,
        new: true
    });

    res.status(200).json({
       success: true,
       data: report
   });
});

// @desc   Delete Report
// @route  DELETE /api/v2/reports/exp/:id
// @access Private

exports.deleteExpReport = asyncHandler( async(req, res, next) => {

    await ExpReport.findByIdAndDelete(req.params.id);

   res.status(200).json({
       success: true,
       data: {}
   });
});