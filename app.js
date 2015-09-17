//=============Packages====================//
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

//mongo
var mongo = require('mongodb');
var monk = require ('monk');
var mongoose = require('mongoose'); //for mongoose framework


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/style", express.static(path.join(__dirname , 'public/stylesheets')));
app.use("/js", express.static(path.join(__dirname , 'public/javascripts')));


//for mongoose framework
var config = require('./config/config');  
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

var db = monk('mongodb://jagannath_lenka:Apple123@ds035673.mongolab.com:35673/classroom');


//controllers
var routes = require('./routes/index');
var users = require('./routes/users');
var course = require('./routes/course');
var score = require('./routes/score');

//models
var user   = require('./models/user'); 

app.use(function(req,res,next){
    req.db = db;
    req.user = user; 
    req.jwt = jwt;
    req.secret = app.get('superSecret');
    next();
});


//routes
app.use('/', routes);
app.use('/users', users);
app.use('/course', course);
app.use('/score', score);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;