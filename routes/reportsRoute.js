const express = require('express');

const {body} = require('express-validator'); 

const {getDomReportsHTML, getAllDomReportsHTML, createDomReport, getAllDomReports, getDomReport, updateDomReport, deleteDomReport} = require('../controllers/domReportsController');

const { getExpReportsHTML, createExpReport, getAllExpReports, getExpReport, updateExpReport, deleteExpReport } = require('../controllers/expReportsController');

const {getShiftReportsHTML, createShiftReport, getAllShiftReports, getShiftReport, updateShiftReport, deleteShiftReport} = require('../controllers/shiftReportsController');

const {protect} = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const ExpReport = require('../models/ExpReport');
const DomReport = require('../models/DomReport');
const ShiftReport = require('../models/ShiftReport');

const router = express.Router();

router
    .route("/dom")
    .get(getDomReportsHTML)
    .post(
        protect,[
        body("sifra", "Šifra se sastoji od 7 cifara")
            .isNumeric()
            .isLength({min: 7, max: 7})
            .trim(),
        body("radniNalog", "Radni nalog sastoji se od 8 cifara")
            .isNumeric()
            .isLength({min: 8, max: 8})
            .trim(),
        body("MISBroj")
            .isNumeric()
            .isLength({min: 7, max: 7})
            .withMessage("MIS broj sastoji se od 7 cifara")
            .custom(async (value) => {
                const report = await DomReport.findOne({ MISBroj: value });

                if (report) {
                    throw new Error("Izveštaj pod ovim MIS brojem postoji!");
                }
                return true;
            })
            .trim(),
        body("duzina", "Najmanja dužina je 1m, a najveća 3000m")
            .isNumeric()
            .isInt({ gt: 1, lt: 3000 })
            .trim(),
        body("neto", "Najmanja težina je 1kg, a najveća 5000kg")
            .isNumeric()
            .isInt({ gt: 1, lt: 5000 })
            .trim(),
        body("bruto")
            .isNumeric()
            .isInt({ gt: 1, lt: 6000 })
            .withMessage('Najmanja težina je 1kg, a najveća 6000kg')
            .custom((value, {req}) => {
                if (parseInt(req.body.neto, 10) > parseInt(value, 10) ) {
                    throw new Error("Bruto težina mora da bude veća od neto težine");
                }
                return true;
            })
            .trim()],
        createDomReport
    );
router.route('/dom/all').get(protect, advancedResults(DomReport, {path: 'createdByUser', select: 'name'}), getAllDomReports);
router.route('/dom/allReports').get(getAllDomReportsHTML);
router.route('/dom/:id').get(getDomReport).delete(protect, deleteDomReport).put(protect, updateDomReport);

router.route('/exp').get(getExpReportsHTML).post(protect, createExpReport);
router.route('/exp/all').get(protect,advancedResults(ExpReport, {path: 'createdByUser', select: 'name'}),  getAllExpReports);
router.route('/exp/:id').get(getExpReport).delete(protect, deleteExpReport).put(protect, updateExpReport);

router.route('/shift').get(getShiftReportsHTML).post(protect, createShiftReport);
router.route('/shift/all').get(protect, advancedResults(ShiftReport, {path: 'createdByUser', select: 'name'}), getAllShiftReports);
router.route('/shift/:id').get(protect, getShiftReport).put(protect, updateShiftReport).delete(protect, deleteShiftReport);

module.exports = router;