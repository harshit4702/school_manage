const auth = require('../middleware/auth');
const express = require('express');

const router = express.Router();

const { getTeachers , regTeachers, updateTeachers , delTeachers } = require('../controller/teacherController');

router.get('/' ,auth , getTeachers);

router.post('/' ,regTeachers);

router.put('/:id' ,auth, updateTeachers);

router.delete('/:id' ,auth ,delTeachers);


module.exports = router;