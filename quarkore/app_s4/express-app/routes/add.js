var express = require('express');
var router = express.Router();
var Firebase = require('firebase');

/* GET add page. */
router.get('/', function(req, res, next) {
  res.render('add', { title: 'Express' });
});

/* POST add page. */
router.post('/', function(req, res, next) {
    var fbBD = new Firebase('https://node-test-q.firebaseio.com/app_s3');

        var addElement = {
            title : 'Express',
            name : req.body.name,
            country : req.body.country,
            email : req.body.email,
            message : req.body.message
        };
        if(addElement.name && addElement.country && addElement.email && addElement.message){
            fbBD.push(addElement);
        }
        res.render('add', addElement);
        
});

module.exports = router;
