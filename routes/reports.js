const express = require('express');
const {getDomReportsHTML, getExpReportsHTML, getShiftReportsHTML, proba} = require('../controllers/reports');

const router = express.Router();

router.route('/dom').get(getDomReportsHTML);
router.route('/exp').get(getExpReportsHTML);
router.route('/shift').get(getShiftReportsHTML);
router.route('/proba').get(proba);

module.exports = router;