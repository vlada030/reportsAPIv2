const express = require('express');
const {getShiftReportsHTML} = require('../controllers/reportsController');

const {getDomReportsHTML, createDomReport, getDomReport} = require('../controllers/domReportsController');

const { getExpReportsHTML, createExpReport } = require('../controllers/expReportsController');

const {protect} = require('../middleware/auth');

const router = express.Router();

router.route('/dom').get(getDomReportsHTML).post(protect, createDomReport);
router.route('/dom/:id').get(getDomReport);
router.route('/shift').get(getShiftReportsHTML);

router.route('/exp').get(getExpReportsHTML).post(protect, createExpReport);

module.exports = router;