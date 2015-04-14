var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* GET users listing. */
router.get('/', function(req, res, next) {
    mongoose.model('Alumn', new Schema({firstname: String, lastname: String}, {collection: 'alumni'}));
    mongoose.connect('mongodb://0.0.0.0:27017/mydb');
    
    var db = mongoose.connection,
        oData = {
            result: 'conexion ok'
        },
        oAlumn = db.model('Alumn');
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        oAlumn.find(function (poError, poDocuments) {
            if (poError) {
                throw poError;
            }
            console.log('conexion ok', poDocuments.length + ' registros encontrados');
            oData.rows = poDocuments;
            db.close();
            res.render('users', oData);
        });
    });
});

module.exports = router;
