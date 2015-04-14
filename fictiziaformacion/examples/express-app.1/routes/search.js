var express = require('express');
var router = express.Router();
var Firebase = require('firebase');

/* GET search page. */
router.get('/', function(req, res, next) {
  res.render('search', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    var oMiBDD = new Firebase('https://fictizia-node.firebaseio.com/alumni');
    
    // acceso base de datos
    oMiBDD.once("value", function(snap) {
        var oResults = {
            title: 'Express',
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            rows: snap.val()
        };
      
        // devolver json
        // pasarselo al template
        res.render('search', oResults);
    });
});

module.exports = router;