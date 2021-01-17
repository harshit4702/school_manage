const auth = require('../middleware/auth');
const express = require('express');

const router = express.Router();

const { getStudents , regStudents, updateStudents , delStudents } = require('../controller/studentController');

router.get('/' ,auth , getStudents);

router.post('/' ,regStudents);

router.put('/:id' ,auth, updateStudents);

router.delete('/:id' ,auth ,delStudents);

module.exports = router;