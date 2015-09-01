var express = require('express');
var router = express.Router();

/* GET all courses */
router.get('/', function(req, res, next) {
   var db = req.db;
   var collection = db.get('course');
   collection.find({},{},function(e,docs){
        res.json(docs);
    });

});


module.exports = router;