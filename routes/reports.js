const express = require('express');
const {getDomReportsHTML, getExpReportsHTML, getShiftReportsHTML} = require('../controllers/reports');

const router = express.Router();

router.route('/dom').get(getDomReportsHTML);
router.route('/exp').get(getExpReportsHTML);
router.route('/shift').get(getShiftReportsHTML);

module.exports = router;