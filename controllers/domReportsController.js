const DomReport = require("../models/DomReport");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc   Domestic Reports
// @route  GET /api/v2/reports/dom
// @access Private

exports.getDomReportsHTML = asyncHandler((req, res) => {
    const lang = req.query.lang || 'ser';

    res.status(200).render("domReports", {
        title: "Izveštaji za domaće tržište",
        path: "dom",
        lang,
        userName: req.session.name,
        readonlyInputStatus: false        
    });
});

// @desc   Domestic Reports - All
// @route  GET /api/v2/reports/dom/allReports
// @access Private

exports.getAllDomReportsHTML = asyncHandler(async(req, res) => {
    const reports = await DomReport.find().populate("proizvod");

    res.status(200).render("domReportsAll", {
        title: "Izveštaji za domaće tržište",
        path: "dom",
        userName: req.session.name,
        reports
    });
});

// @desc   Create Report
// @route  POST /api/v2/reports/dom
// @access Private

exports.createDomReport = asyncHandler(async (req, res, next) => {
    const lang = req.query.lang || 'ser';
    req.body.createdByUser = req.user.id;
    // const bruto = req.body.bruto;
    // const neto = req.body.neto;

    // if (neto > bruto) {
    //     return next(new ErrorResponse("Bruto mora biti veće od neto", 400));
    // }
    
    await DomReport.create(req.body);

    // ovo mora da se doda da bi se zadrzao unos , da ne brise unesene vrednosti
    const report = await DomReport.findOne({ MISBroj: req.body.MISBroj })
        .populate({
            path: "createdByUser",
            select: "name",
        })
        .populate({
            path: "updatedByUser",
            select: "name",
        })
        .populate("proizvod"); // popunjava virtuals polje

    res.status(201).render("domReports", {
        title: "Izveštaji za domaće tržište",
        path: "dom",
        lang,
        userName: req.session.name,
        successMessage: 'Izveštaj je uspešno snimljen u bazu.',
        report,
        readonlyInputStatus: false    
    });
});

// @desc   Get All Reports
// @route  GET /api/v2/reports/dom/all
// @access Private

exports.getAllDomReports = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc   Get Report
// @route  GET /api/v2/reports/dom/:id
// @access Private

exports.getDomReport = asyncHandler(async (req, res, next) => {
    const MISBroj = req.params.id;

    const report = await DomReport.findOne({ MISBroj })
        .populate({
            path: "createdByUser",
            select: "name",
        })
        .populate({
            path: "updatedByUser",
            select: "name",
        })
        .populate("proizvod"); // popunjava virtuals polje

    if (!report) {
        return next(
            new ErrorResponse(
                `Izveštaj sa MIS brojem ${MISBroj} ne postoji`,
                400
            ));
    }

    res.status(200).render('domReports', {
        title: "Izveštaji za domaće tržište",
        path: "dom",
        lang: 'ser',
        userName: req.session.name,
        report,
        readonlyInputStatus: true   
    })
    
});

// @desc   Update Report
// @route  PUT /api/v2/reports/dom/:id
// @access Private

exports.updateDomReport = asyncHandler(async (req, res, next) => {
    let report = await DomReport.findOne({ MISBroj: req.params.id });

    if (!report) {
        return next(new ErrorResponse("Zahtevani izvestaj ne postoji", 400));
    }

    req.body.updatedByUser = req.user.id;

    report = await DomReport.findOneAndUpdate(
        { MISBroj: req.params.id },
        req.body,
        {
            runValidators: false,
            new: true,
        }
    );

    res.status(200).json({
        success: true,
        data: report,
    });
});

// @desc   Delete Report
// @route  DELETE /api/v2/reports/dom/:id
// @access Private

exports.deleteDomReport = asyncHandler(async (req, res, next) => {
    await DomReport.findOneAndDelete({ MISBroj: req.params.id });

    res.status(200).json({
        success: true,
        data: {},
    });
});
