const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
ejs = require('ejs');
//mongoose.Promise = global.Promise;
const route = require('./../routes/router');

//database connection
mongoose.connect('mongodb://den1.mongo1.gear.host:27001/taskcoderhouse',{ useNewUrlParser: true , user: "taskcoderhouse", pass:"Fx71?WmBVg!O",} )
.then (db => console.log('db is connection'))
.catch(err => console.log('error in the database'));



//Setting
app.set('port', process.env.PORT || 8080);

app.set('views', path.join(__dirname, './../views'));
app.set('view engine','ejs');

//static file
app.use(express.static(path.join(__dirname, './../public')));

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));


//routes
app.use(route);

//listen 
app.listen(app.get('port'), ()=>{
    console.log('listen on port')
});
