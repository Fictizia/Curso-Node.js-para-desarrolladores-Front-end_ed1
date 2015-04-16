var express = require('express');
var router = express.Router();
var Firebase = require('firebase');

/* GET search page. */
router.get('/', function(req, res, next) {
  res.render('search', { title: 'Express' });
});

/* POST search page. */
router.post('/', function(req, res, next) {
    var fbBD = new Firebase('https://node-test-q.firebaseio.com/app_s3');

    fbBD.once('value', function(snap){
        var results = {
            title : 'Express',
            name : req.body.name,
            country : req.body.country,
            email : req.body.email,
            rows: Object.keys(snap.val()).length,
            resultArray: snap.val()
        };
        
        res.render('search', results);      
    });
    
});

module.exports = router;
