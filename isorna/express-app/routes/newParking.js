// routes/newParking.js
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

router.get('/', function(req, res, next) {
  res.render('newParking');
});

router.post('/', function(req, res, next) {
    var Parking = new Schema({
            name: {
                type: String,
                default: 'Without name'
            },
            location: {
                type: {
                    type: String, 
                    enum: ['Point', 'LineString', 'Polygon'], 
                    default: 'Point'
                }, 
                coordinates: {
                    type: [Number],
                    default: [0, 0]
                }
            }
        },
        {collection: 'parkings'});
    
    Parking.index({location: '2dsphere'});
    
    mongoose.model('Parking', Parking);
    
    mongoose.connect('mongodb://0.0.0.0:27017/mydb');
        
    var db = mongoose.connection,
        oData = {
            result: 'conexion ok',
            name: req.body.name,
            lat: req.body.lat,
            long: req.body.long
        },
        oParking = db.model('Parking');
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        oParking.create({
            name: req.body.name,
            location: {
                type: 'Point',
                coordinates: [req.body.lat, req.body.long]
            }
            }, function (poError) {
                if (poError) {
                    throw poError;
                }
                console.log('creation ok');
                
                oParking.find({
                        location: {
                            $near: {
                                type: 'Point',
                                coordinates: [req.body.lat, req.body.long]
                            },
                            $maxDistance: 500 // 500m
                        }
                    }, function (poError, poDocuments) {
                    if (poError) {
                        throw poError;
                    }
                    
                    oData.rows = poDocuments;
                    db.close();
                    res.render('newParking', oData);
                });
            });
    });
});

module.exports = router;