const express = require('express');

const {getDomReportsHTML, getAllDomReportsHTML, createDomReport, getAllDomReports, getDomReport, updateDomReport, deleteDomReport} = require('../controllers/domReportsController');

const { getExpReportsHTML, createExpReport, getAllExpReports, getExpReport, updateExpReport, deleteExpReport } = require('../controllers/expReportsController');

const {getShiftReportsHTML, createShiftReport, getAllShiftReports, getShiftReport, updateShiftReport, deleteShiftReport} = require('../controllers/shiftReportsController');

const {protect} = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const ExpReport = require('../models/ExpReport');
const DomReport = require('../models/DomReport');
const ShiftReport = require('../models/ShiftReport');

const router = express.Router();

router.route('/dom').get(getDomReportsHTML).post(protect, createDomReport);
router.route('/dom/all').get(protect, advancedResults(DomReport, {path: 'createdByUser', select: 'name'}), getAllDomReports);
router.route('/dom/allReports').get(getAllDomReportsHTML);
router.route('/dom/:id').get(getDomReport).delete(protect, deleteDomReport).put(protect, updateDomReport);;

router.route('/exp').get(getExpReportsHTML).post(protect, createExpReport);
router.route('/exp/all').get(protect,advancedResults(ExpReport, {path: 'createdByUser', select: 'name'}),  getAllExpReports);
router.route('/exp/:id').get(protect, getExpReport).delete(protect, deleteExpReport).put(protect, updateExpReport);

router.route('/shift').get(getShiftReportsHTML).post(protect, createShiftReport);
router.route('/shift/all').get(protect, advancedResults(ShiftReport, {path: 'createdByUser', select: 'name'}), getAllShiftReports);
router.route('/shift/:id').get(protect, getShiftReport).put(protect, updateShiftReport).delete(protect, deleteShiftReport);

module.exports = router;