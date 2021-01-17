const express = require('express');
const router = express.Router();
const { authenStudents} = require('../controller/authenStuController');

router.post('/' , authenStudents);
    
module.exports = router;