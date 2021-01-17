const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Student } = require('../models/student');

exports.getStudents = async (req,res) => {
    const students = await Student.find().sort('name');
    res.send(students);
};

exports.regStudents = async (req , res) => {
    let student = await Student.findOne({email: req.body.email});
    if(student) return res.status(400).send('Student already registered');
    
    student = new Student( _.pick(req.body , [ 'name' , 'email' , 'password' ]));

    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password , salt);
    await student.save(); 

    res.send( _.pick(student, ['_id' , 'name', 'email']));
};

exports.updateStudents = async (req,res) => {
    let student = await Student.findById(req.params.id);
    if(!teacher) return res.status(400).send('Invalid teacher');

    teacher = await Teacher.findByIdAndUpdate(req.params.id , {
        email: req.body.email , 
        password: req.body.password },{ new: true});

    const salt = await bcrypt.genSalt(10);
    teacher.password = await bcrypt.hash(teacher.password , salt);
    await teacher.save(); 

    res.send( _.pick(teacher, ['_id' , 'name', 'email']));
};

exports.delStudents = async (req , res) => {
    let student =  await Student.findByIdAndRemove(req.params.id);
    if(!student) return res.status(404).send('The student with the given Id was not found');
    res.send(student);
};