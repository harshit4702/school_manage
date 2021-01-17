const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Teacher } = require('../models/teacher');

exports.getTeachers = async (req,res) => {
    const teachers = await Teacher.find().sort('name');
    res.send(teachers);
};

exports.regTeachers = async (req , res) => {
    let teacher = await Teacher.findOne({email: req.body.email});
    if(teacher) return res.status(400).send('Teacher already registered');
    
    teacher = new Teacher( _.pick(req.body , [ 'name' , 'email' , 'password' ]));

    const salt = await bcrypt.genSalt(10);
    teacher.password = await bcrypt.hash(teacher.password , salt);
    await teacher.save(); 

    res.send( _.pick(teacher, ['_id' , 'name', 'email']));
};

exports.updateTeachers = async (req,res) => {    
    let teacher = await Teacher.findById(req.params.id);
    if(!teacher) return res.status(400).send('Invalid teacher');

    teacher = await Teacher.findByIdAndUpdate(req.params.id , {
        email: req.body.email , 
        password: req.body.password },{ new: true});

    const salt = await bcrypt.genSalt(10);
    teacher.password = await bcrypt.hash(teacher.password , salt);
    await teacher.save(); 

    res.send( _.pick(teacher, ['_id' , 'name', 'email']));
};

exports.delTeachers = async (req , res) => {
    let teacher =  await Teacher.findByIdAndRemove(req.params.id);
    if(!teacher) return res.status(404).send('The teacher with the given Id was not found');
    res.send(teacher);
};