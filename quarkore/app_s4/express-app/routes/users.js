var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    mongoose.model('mensaje', new Schema({
            name : String,
            country : String,
            email : String,
            message : String
    }));
    var data = {
        result: 'conexion ok'
    }
    
    var mongoBD = 'mongodb://0.0.0.0:27017/nodeDB_1';
    
    
    
    mongoose.connect(mongoBD);
    
    
    var db = mongoose.connection;
    
    var mensajes = db.model('mensaje');
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      // yay!
      console.log('ok');
      mensajes.find(function(err, res){
          if(err){
              throw err;
          }
      });
      
      
    });
    
    
    
  res.send('users', data);
});

module.exports = router;
