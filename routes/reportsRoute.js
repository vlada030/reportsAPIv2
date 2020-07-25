const express = require('express');
const {getExpReportsHTML, getShiftReportsHTML} = require('../controllers/reportsController');
const {getDomReportsHTML, createDomReport, getDomReport} = require('../controllers/domReportsController');
const {protect} = require('../middleware/auth');

const router = express.Router();

router.route('/dom').get(getDomReportsHTML).post(protect, createDomReport);
router.route('/dom/:id').get(getDomReport);
router.route('/exp').get(getExpReportsHTML);
router.route('/shift').get(getShiftReportsHTML);

module.exports = router;