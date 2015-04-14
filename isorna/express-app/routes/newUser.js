var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET search page. */
router.get('/', function(req, res, next) {
  res.render('newUser');
});

router.post('/', function(req, res, next) {
    var cMongoDB_URL = 'mongodb://0.0.0.0:27017/mydb';
    
    MongoClient.connect(cMongoDB_URL, function(poError, db) {
        if (poError) {
            throw poError;
        }
        var oData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        };
        console.log("Connected correctly to server");
    
        insertUser(db, oData, function(poResult) {
            db.close();
            res.render('newUser', oData);
        });
    });
});

module.exports = router;

function insertUser (db, poData, callback) {
  // Get the documents collection
  var collection = db.collection('alumni');
  // Insert some documents
  collection.insertOne(poData, function(poError, poResult) {
    if (poError) {
        throw poError;
    }
    console.log("Inserted 1 documents into the document collection", [poResult.ops[0]._id, poResult.ops[0].firstname, poResult.ops[0].lastname]);
    callback(poResult);
  });
}