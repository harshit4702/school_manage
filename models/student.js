const jwt= require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 150
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 3,
        unique: true,
        maxlength: 150,
    },
    password: { 
        type: String,
        required: true,
        min: 10,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
    }, 
 });

studentSchema.methods.generateAuthToken = function(){ 
    const token = jwt.sign({_id: this._id } , config.get('jwtPrivateKey'));
    return token;
} 

const Student = mongoose.model('student', studentSchema);

function validateStudent(student){
    const schema = Joi.object(
        { 
            name: Joi.string().min(1).max(150).required() ,
            email: Joi.string().min(1).max(150).required().email() ,
            password: Joi.string().min(5).max(150).required() 
        }
    );        
    return schema.validate(student);
}
exports.Student = Student;
exports.validate = validateStudent;
