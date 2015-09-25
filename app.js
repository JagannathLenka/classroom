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

//services
var service = require('./services/service');

app.use(function(req,res,next){
    req.db = db;
    req.user = user; 
    req.jwt = jwt;
    req.secret = app.get('superSecret');
    req.service = service;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');


    next();
});


//==========Token Management================================
var router = express.Router();
//=========================================================

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.param('token') || req.headers['authorization'];

  console.log(req.headers);

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        console.log(decoded);
        req.decoded = decoded;  
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.'
    });
    
  }
  
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

router.get('/check', function(req, res) {
  res.json(req.decoded);
});

app.use('/api', router);

//==================================


//routes
app.use('/', routes);
app.use('/users', users);
app.use('/api/course', course);
app.use('/api/score', score);


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