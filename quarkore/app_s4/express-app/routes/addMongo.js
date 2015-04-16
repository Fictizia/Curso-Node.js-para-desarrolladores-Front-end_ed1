var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


/* GET add page. */
router.get('/', function(req, res, next) {
  res.render('addMongo', { title: 'Mongo-Express' });
});

/* POST add page. */
router.post('/', function(req, res, next) {
    var mongoBD = 'mongodb://0.0.0.0:27017/nodeDB_1';

    MongoClient.connect(mongoBD, function(err, db){
        if (err){
            throw err;
        }
        
        var addElement = {
            title : 'Mongo-Express',
            name : req.body.name,
            country : req.body.country,
            email : req.body.email,
            message : req.body.message
        };
        
        
        console.log('conectado a DB');
        addData(db, addElement, function(result){
                        console.log('added successfully');
                        db.close();
                        res.render('addMongo', addElement);
                    });
        
    });
        
/*        if(addElement.name && addElement.country && addElement.email && addElement.message){
            fbBD.push(addElement);
        }
*/
        
        
});

module.exports = router;

function addData (db, data, callback){
    var collection = db.collection('mongoADD');
    
    collection.insert(data, function(err, result){
        if (err){
            throw err;
        }
        console.log('insertada 1 entrada');
        console.log(result.ops[0]._id, result.ops[0].name);
        callback(result);
    });
}