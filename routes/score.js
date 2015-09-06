var express = require('express');
var router = express.Router();

/* GET all courses */
router.get('/', function(req, res, next) {
   var db = req.db;
   var collection = db.get('score');
   collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.post('/', function(req, res) {
	var db = req.db;
	var collection = db.get('score');
	collection.update({_id: req.body.id}, {$set: { gold_score: req.body.gold_score } } );
	res.send(req.body.id);
});


module.exports = router;