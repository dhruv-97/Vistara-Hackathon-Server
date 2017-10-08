var mongoose=require('mongoose');
var Details = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    flight_code: String,
    flight_number: Number,
    flight_name: String,
    departure: String,
    arrival: String,
    flight_duration: Number,
    departure_terminal: String,
    arrival_terminal: String,
    arrival_date: String,
    departure_date: String
});


module.exports=mongoose.model('Details',Details);