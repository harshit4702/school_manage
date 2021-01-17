const bcrypt = require('bcrypt');
const { Teacher } = require('../models/teacher');

exports.authenTeachers = async (req , res) => {
    let teacher = await Teacher.findOne({email: req.body.email});
    if(!teacher) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password , teacher.password);
    if(!validPassword)  return res.status(400).send('Invalid email or password');  

    const token = teacher.generateAuthToken();
    res.send(token);
};
