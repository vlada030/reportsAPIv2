const express = require('express');
const {getShiftReportsHTML} = require('../controllers/reportsController');

const {getDomReportsHTML, createDomReport, getDomReport} = require('../controllers/domReportsController');

const { getExpReportsHTML, createExpReport, getAllExpReports, getExpReport, updateExpReport, deleteExpReport } = require('../controllers/expReportsController');

const {protect} = require('../middleware/auth');

const router = express.Router();

router.route('/dom').get(getDomReportsHTML).post(protect, createDomReport);

router.route('/dom/:id').get(getDomReport);
router.route('/shift').get(getShiftReportsHTML);

router.route('/exp').get(getExpReportsHTML).post(protect, createExpReport);
router.route('/exp/all').get(protect, getAllExpReports);
router.route('/exp/:id').get(protect, getExpReport).delete(protect, deleteExpReport).put(protect, updateExpReport);


module.exports = router;