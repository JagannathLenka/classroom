var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   var db = req.db;
   var collection = db.get('course');
   collection.find({},{},function(e,docs){
        res.json(docs);
    });

  //courses = ['fun', 'math', 'science']; 	
  //res.render('course', { course: course });
  //res.json(courses);
});

module.exports = router;