const mongoose = require('mongoose')
const booking_schema = new mongoose.Schema({
    loginid: {
        type: mongoose.Types.ObjectId, ref: 'login_tb'
    },
    username: {
        type: String,
    },
    passengers: {
        type: String,
    },
  
    time: {
        type: String,
    },
    pickup: {
        type: String,
    },
    drop: {
        type: String,
    },
    route: {
        type: String,
    },
    via: {
        type: String,
    },
    destination: {
        type: String,
    },
    car: {
        type: String,
    },
    status: {
        type: String,default:'pending'
    },
    payment: {
        type: String,
    }
})
var bookData = mongoose.model('booking_tb', booking_schema)
module.exports = bookData