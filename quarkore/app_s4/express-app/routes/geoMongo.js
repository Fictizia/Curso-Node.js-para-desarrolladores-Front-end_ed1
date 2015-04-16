// routes/newParking.js
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//GET RENDER PARKING
router.get('/', function(req, res, next) {
    res.render('parkings');
})

//POST LOCATION NEARBY
router.post('/', function(req, res, next) {
    var Parking = new Schema({
        name: {
            type: String,
            default: 'Without name'
        },
        location: {
            'type': {
                type: String, 
                enum: ['Point', 'LineString', 'Polygon'], 
                default: 'Point'
            }, 
            coordinates: {
                type: [Number],
                default: [0, 0]}
            }
    }, {collection: 'parkings'});
    
    Parking.index({location: '2dsphere'});
    
    mongoose.model('Parking', Parking);
    mongoose.connect('mongodb://0.0.0.0:27017/nodeDB_1');
        
    var db = mongoose.connection,
        oData = {
            name: req.body.name,
            location: {
                type: 'Point',
                coordinates: [req.body.lat, req.body.len]
            }
        },
        oParking = db.model('Parking');
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        oParking.create({
            name: req.body.name,
            location: {
                type: 'Point',
                coordinates: [req.body.lat, req.body.len]
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
                                coordinates: [req.body.lat, req.body.len]
                            },
                            $maxDistance: 100 // See * below
                        }
                    }, function (poError, poDocuments) {
                    if (poError) {
                        throw poError;
                    }
                    
                    oData.rows = poDocuments;
                    db.close();
                    res.render('parkings', oData);
                });
            });
    });
});

module.exports = router;