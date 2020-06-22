const express = require('express');

const {userLoginForm} = require('../controllers/userHTML');
const {protect} = require('../middleware/auth');

const router = express.Router();

router.route('/').get(userLoginForm);

module.exports = router;