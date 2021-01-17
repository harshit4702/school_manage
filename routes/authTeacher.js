const express = require('express');
const { authenTeachers } = require('../controller/authenTeaController');
const router = express.Router();

router.post('/' ,authenTeachers);

module.exports = router;