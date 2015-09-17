var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/* GET users listing. */
router.get('/', function(req, res, next) {
	var User = req.user;

	User.find({}, function(err, users) {
	    res.json(users);
	 });

});


router.get('/setup', function(req, res) {

   var User = req.user;

  // create a sample user
  var name = new User({ 
    name: 'Jagannath', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  name.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

router.post('/authenticate', function(req, res){
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
				var token = jwt.sign(user, secret, {
          		expiresInMinutes: 1440 // expires in 24 hours
        		});

        		res.json({
        			success: true,
        			message: 'Enjoy your token !',
        			token: token
        		});
			}
		}
	});
});

module.exports = router;