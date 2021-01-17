const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const students = require('./routes/students');
const teachers = require('./routes/teachers');
const authStudents = require('./routes/authStudent');
const authTeachers = require('./routes/authTeacher');

mongoose.connect(config.get('db') , { useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => console.log(`Connected to ${config.get('db')}`))
    .catch(err =>  console.error('Could not connect to mongodb'));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
app.use(express.json());

// app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/students' , students);
app.use('/api/teachers' , teachers);
app.use('/api/authstudents' , authStudents);
app.use('/api/authteachers' , authTeachers);



// app.get('/logging',function(req,res){
//     res.sendFile('./public/logging.html',{root:__dirname});
// });


const port=process.env.PORT || 8000 ;
console.log(port);
const server = app.listen(port, ()=> console.log(`Listening on port ${port}...`));

// var env = process.env.NODE_ENV || 'development';
