const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Teacher , validate } = require('../models/Teacher');
const { Student } = require('../models/Student');

const express = require('express');

const router = express.Router();

// router.get('/me' , auth , async (req , res) => {
//     const user =  await User.findById(req.user._id).select('-password');
//     res.send(user);
// });

router.get('/' ,async (req,res) => {
    const students = await Student.find().sort('name');
    res.send(students);
});

router.post('/' ,async (req , res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let teacher = await Teacher.findOne({email: req.body.email});
    if(teacher) return res.status(400).send('Teacher already registered');
    
    teacher = new Teacher( _.pick(req.body , [ 'name' , 'email' , 'password' ]));

    const salt = await bcrypt.genSalt(10);
    teacher.password = await bcrypt.hash(teacher.password , salt);
    await teacher.save(); 

    res.send( _.pick(teacher, ['_id' , 'name', 'email']));
});
module.exports = router;