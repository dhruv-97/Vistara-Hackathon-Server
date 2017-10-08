var express = require('express');
var router = express.Router();
require("dotenv").config();
var Details = require('../model/flight');
var unirest = require('unirest');
let weathers = [27, 31, 36, 46];
router.get('/', function (req, res, next) {
    console.log(req.user);
    res.json({
        status: "working details page"
    });
});

router.post('/flight', function (req, res, next) {

    // var flight_code = "6E";
    // var flight_number = "302";
    // var date = "2017/1/21";
    Details.findOne(req.body, function(err, detail){
        if(err) next(err);
        res.json(detail);
    })
    

});

router.post('/weather', function (req, res, next) {
    // var airport = "DEL";

    res.json({
        weather: 31
    });
});

router.post('/nearby', function (req, res, next) {
    // var lat="13.0827";
    // var lng="80.2707";
    var lat = req.body.lat;
    var lng = req.body.lng;
    var querry = req.body.querry;
    // var querry=
    // amusement_park
    // aquarium
    // art_gallery
    // atm
    // bakery
    // bank
    // bar
    // cafe
    // casino
    // hospital
    // liquor_store
    // lodging
    // movie_theater
    // museum
    // night_club
    // plumber
    // police
    // restaurant
    // shopping_mall
    // stadium
    // taxi_stand
    // train_station
    // zoo

    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=+" + lat + "," + lng + "&radius=500&type=+" + querry + "&key=AIzaSyCdsL8ZTLIXkt4YWDauPhW8cByPnz2g_ok";
    unirest.get(url)
        .end(function (data) {
            res.json({
                status: true,
                data:data.body.results
            });
        });
});

router.post('/addflight', function (req, res, next) {
    Details.create(req.body, function (err, Detail) {
        if (err) throw(err);
        console.log('Detail created!');
        var id = Detail._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the Detail with id: ' + id);
    });
});

router.put('/flight', function (req, res, next) {
    let flightId = req.body._id;
    Details.findByIdAndUpdate(flightId, {
        $set: req.body
    }, {
        new: true
    }, function (err, flight) {
        if (err) next(err);
        res.json(flight);
    });
});

module.exports = router;