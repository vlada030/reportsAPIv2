const express = require('express');
const {getDomReportsHTML} = require('../controllers/reports');

const router = express.Router();

router.route('/dom').get(getDomReportsHTML);
//router.route('/exp').get(getExpReportsHTML);

module.exports = router;