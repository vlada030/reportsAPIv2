const express = require('express');
const { getUsers, getAvatar } = require('../controllers/usersController');

const router = express.Router();
router.route('/').get(getUsers);
router.route('/:id/avatar').get(getAvatar);

module.exports = router;