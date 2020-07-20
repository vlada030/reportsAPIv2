const DomReport = require('../models/DomReport');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @desc   Domestic Reports
// @route  GET /api/v2/reports/dom
// @access Private

exports.getDomReportsHTML = asyncHandler((req, res) => {
    const lang = req.query.lang;

    res.status(200).render('domReports', {title: 'Izveštaji za domaće tržište', path: 'dom', lang});
});

// @desc   Create Report
// @route  POST /api/v2/reports/dom
// @access Public

exports.createDomReport = asyncHandler( async(req, res, next) => {
    req.fields.createdByUser = req.user.id;
    const bruto = req.fields.bruto;
    const neto = req.fields.neto;

    if (neto > bruto) {
        return next(new ErrorResponse('Bruto mora biti veće od neto', 400));
    }
   const report = await DomReport.create(req.fields);

   res.status(201).json({
       success: true,
       data: report
   });
});

// @desc   Get Report
// @route  GET /api/v2/reports/dom/:id
// @access Public

exports.getDomReport = asyncHandler( async(req, res, next) => {
    const MISBroj = req.params.id;

   const report = await DomReport.find({MISBroj}).populate({
       path: 'createdByUser',
       select: 'name'
   });

   if (report.length !== 1) {
       return next(new ErrorResponse(`Izveštaj sa MIS brojem ${MISBroj} ne postoji`, 400));
   }

   res.status(201).json({
       success: true,
       data: report
   });
});