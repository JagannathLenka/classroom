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

router.post('/', function(req, res) {
   newvideo = 
   {name: req.body.name,
    url:  'https://www.youtube.com/embed/' + req.body.url + '?autoplay=false',
    user_ratings: null,
    description: null,
    status: "approved"
	}	

   var db = req.db;
   var collection = db.get('course');
   collection.update({_id: req.body.id}, { $addToSet: { videos: newvideo } } );
   res.send(req.body.id);
});


module.exports = router;