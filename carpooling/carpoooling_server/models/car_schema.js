const mongoose = require('mongoose')
const car_schema = new mongoose.Schema({
  
    photo: {
        type: String, 
    },
    model: {
        type: String, required: true
    },
    number: {
        type: String, required: true
    },
    type: {
        type: String, required: true
    },
    company: {
        type: String, required: true
    }
})
var carData = mongoose.model('car_tb', car_schema)
module.exports = carData