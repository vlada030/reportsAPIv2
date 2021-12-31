const express = require('express');

const {body} = require('express-validator'); 

const {getDomReportHTML, getAllDomReportsHTML, createDomReport, getAllDomReports, getDomReport, updateDomReport, deleteDomReport} = require('../controllers/domReportsController');

const { getExpReportsHTML, createExpReport, getAllExpReports, getAllExpReportsHTML, getExpReport, updateExpReport, deleteExpReport } = require('../controllers/expReportsController');

const {getShiftReportsHTML, createShiftReport, getAllShiftReports, getAllShiftReportsHTML, getShiftReport, updateShiftReport, deleteShiftReport} = require('../controllers/shiftReportsController');

const {protect} = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const ExpReport = require('../models/ExpReport');
const DomReport = require('../models/DomReport');
const ShiftReport = require('../models/ShiftReport');

const router = express.Router();

router
    .route("/dom")
    .get(getDomReport)
    .post(
        protect,
        [
            body("sifra", "Šifra se sastoji od 7 cifara")
                .isNumeric()
                .isLength({ min: 7, max: 7 })
                .trim(),
            body("radniNalog", "Radni nalog sastoji se od 8 cifara")
                .isNumeric()
                .isLength({ min: 8, max: 8 })
                .trim(),
            body(
                "MISBroj",
                "Broj kalema je broj iz MIS-a i sastoji se od 7 cifara"
            )
                .isNumeric()
                .isLength({ min: 7, max: 7 })
                .custom(async (value) => {
                    const report = await DomReport.findOne({ MISBroj: value });

                    if (report) {
                        throw new Error(
                            "Izveštaj pod ovim MIS brojem postoji!"
                        );
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
                .withMessage("Najmanja težina je 1kg, a najveća 6000kg")
                .custom((value, { req }) => {
                    if (parseInt(req.body.neto, 10) > parseInt(value, 10)) {
                        throw new Error(
                            "Bruto težina mora da bude veća od neto težine"
                        );
                    }
                    return true;
                })
                .trim(),
            body("datum")
                .trim()
                .matches(/[0-9]{2}\.[0-9]{2}\.[0-9]{4}\./)
                .withMessage("Pogrešno unet format datuma, potrebno je dd.mm.gggg."),
        ],
        createDomReport
    );
router.route('/dom/json').get(protect, advancedResults(DomReport, 'proizvod'), getAllDomReports);

router.route('/dom/allReports').get(protect, advancedResults(DomReport, 'proizvod'), getAllDomReportsHTML);

router.route('/dom/:id').get(getDomReport).delete(protect, deleteDomReport).put(protect, updateDomReport);

router
    .route("/exp")
    .get(getExpReport)
    .post(
        protect,
        [
            body("sifra", "Šifra se sastoji od 7 cifara")
                .isNumeric()
                .isLength({ min: 7, max: 7 })
                .trim()
                .escape(),
            body("godina", "Godina sadrži 4 cifre")
                .isNumeric()
                .isLength({ min: 4, max: 4 })
                .trim()
                .escape(),
            // body("dobos_1", "Broj na stranici ili MIS Broj doboša može imati 7 - 10 karaktera")
            //     .isLength({ min: 7, max: 11 })
            //     .trim()
            //     .escape(),
            // body("duzina_1", "Najmanja dužina je 1m, a najveća 15000m")
            //     .isNumeric()
            //     .isInt({ gt: 1, lt: 15000 })
            //     .trim()
            //     .escape(),

            // custom validator za sva polja dobos / duzina
            body().custom((value, { req }) => {
                for (const key in req.body) {
                    if (key.startsWith("dobos")) {
                        if (
                            !(
                                req.body[key].length >= 7 &&
                                req.body[key].length <= 10
                            )
                        ) {
                            throw new Error(
                                "Broj na stranici ili MIS Broj doboša može imati 7 - 10 karaktera"
                            );
                        }
                    } else if (key.startsWith("duzina")) {
                        if (!(req.body[key] >= 1 && req.body[key] <= 15000)) {
                            throw new Error(
                                "Najmanja dužina je 1m, a najveća 15000m"
                            );
                        }
                    }
                }
                return true;
            }),
            body("datum")
                .trim()
                .matches(/[0-9]{2}\.[0-9]{2}\.[0-9]{4}\./)
                .withMessage(
                    "Pogrešno unet format datuma, potrebno je dd.mm.gggg."
                ),
        ],
        createExpReport
    );
router.route('/exp/json').get(protect,advancedResults(ExpReport, 'proizvod'),  getAllExpReports);

router.route('/exp/allReports').get(protect, advancedResults(ExpReport, 'proizvod'), getAllExpReportsHTML);

router.route('/exp/:id').get(getExpReport).delete(protect, deleteExpReport).put(protect, updateExpReport);

router
    .route("/shift")
    .get(getShiftReportsHTML)
    .post(
        protect,
        body().custom((value, { req }) => {
            for (const key in req.body) {
                if (key.startsWith("radnik1_0") || key.endsWith("vreme")) {
                    if (!(req.body[key] >= 1 && req.body[key] <= 12)) {
                        throw new Error(
                            "Vreme radnika provedeno na radu je između 1 - 12 sati"
                        );
                    }
                } else if (key.endsWith('nap') || key.endsWith('proizvod')) {
                    if (req.body[key].length > 200) {
                        throw new Error(
                            "Polja napomene i naziv proizvoda mogu da sadrže najviše 200 karaktera"
                        );
                    }
                } else if (key.endsWith('duz') || key.endsWith('rn')) {
                    if (req.body[key].toString().length > 8) {
                        throw new Error(
                            "Polja radni nalog i dužina proizvoda mogu da sadrže najviše 8 cifre"
                        );
                    }
                } else if (
                    key.startsWith("pr") ||
                    key.startsWith("kor") ||
                    key.startsWith("pp") ||
                    key.startsWith("tel") ||
                    key.startsWith("pak") ||
                    key.startsWith("radnik1")
                ) {
                    if (req.body[key] > 250 || req.body[key] < 0) {
                        throw new Error(
                            "Unešeni brojevi ne smeju biti negativni i veći od 250"
                        );
                    }
                }  
        }
            return true;
        }),
        body("datum")
                .trim()
                .matches(/[0-9]{2}\.[0-9]{2}\.[0-9]{4}\./)
                .withMessage(
                    "Pogrešno unet format datuma, potrebno je dd.mm.gggg."
                ), 
        createShiftReport
    );
router.route('/shift/json').get(protect, advancedResults(ShiftReport, {path: 'createdByUser', select: 'name'}), getAllShiftReports);

router.route('/shift/allReports').get(protect, advancedResults(ShiftReport, {path: 'createdByUser', select: 'name'}), getAllShiftReportsHTML);

router.route('/shift/:id').get(protect, getShiftReport).put(protect, updateShiftReport).delete(protect, deleteShiftReport);

module.exports = router;