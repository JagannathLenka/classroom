var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var service = require('../services/service.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
	var User = req.user;

	User.find({}, function(err, users) {
	    res.json(users);
	 });

});


router.post('/signup', function(req, res){
	var User = req.user;
	var jwt = req.jwt;
	var secret = req.secret;

	User.findOne({
		name: req.body.name
	}, function(err, user) {
		if (err) throw err;

		if (user) {
			res.json({success: false, message: 'User Already exists'});
		}
		else {
				var addUser = new User;
				addUser.name = req.body.name;
				addUser.password = req.body.password;
				addUser.token = jwt.sign(addUser, secret, {
          				expiresInMinutes: 1440 // expires in 24 hours
        			});
				addUser.save(function(err, user){
					if (err) {
						res.json({success: false, message: 'Not able to create new user'});
					}	
					res.json({
        			success: true,
        			message: 'Enjoy your token !',
        			token: addUser.token
        		});	
			})        		
		}
	});
});


router.post('/signin', function(req, res){
	var User = req.user;
	var jwt = req.jwt;
	var secret = req.secret;

	User.findOne({
		name: req.body.name
	}, function(err, user) {
		if (err) throw err;

		if (!user) {
			res.json({success: false, message: 'Authentication failed ! User not found'});
		}
		else if(user) {

			if (user.password != req.body.password) {
				res.json({success: false, message: 'Authentication failed ! Wrong password'});	
			} else {
        		res.json({
        			success: true,
        			message: 'Enjoy your token !',
        			token: user.token
        		});
			}
		}
	});
});


router.get('/me', service.ensureAuthorized, function(req, res) {
	var User = req.user;

    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else if(user) {
            res.json({
                type: true,
                data: user
            });
        } else {
        	 console.log(' me not working')
        	 console.log('me' +req.token)
        	 res.json({
                type: false,
                data: 'User not authorized'
            });
        }
    });
});


module.exports = router;