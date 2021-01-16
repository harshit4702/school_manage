const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Student , validate } = require('../models/student');
const express = require('express');

const router = express.Router();

// router.get('/me' , auth , async (req , res) => {
//     const user =  await User.findById(req.user._id).select('-password');
//     res.send(user);
// });

router.post('/' ,async (req , res) => {
    const { error } = validate(req.body) ;
    if(error) return res.status(400).send(error.details[0].message) ;

    let student = await Student.findOne({email: req.body.email});
    if(student) return res.status(400).send('Student already registered');
    
    student = new Student( _.pick(req.body , [ 'name' , 'email' , 'password' ]));

    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password , salt);
    await student.save(); 

    res.send( _.pick(student, ['_id' , 'name', 'email']));
});
module.exports = router;