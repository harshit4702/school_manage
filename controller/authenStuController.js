const bcrypt = require('bcrypt');
const { Student } = require('../models/student');

exports.authenStudents = async (req , res) => {
    let student = await Student.findOne({email: req.body.email});
    if(!student) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password , student.password);
    if(!validPassword)  return res.status(400).send('Invalid email or password');  

    const token = student.generateAuthToken();
    res.send(token);
};
