const mongoose = require('mongoose')
const driver_reg_schema = new mongoose.Schema({
    loginid:{
        type:mongoose.Types.ObjectId,ref:'login_tb'
    },
    photo: {
        type: String,
    },
    phone: {
        type: Number, required: true
    },
    email: {
        type: String,
    },
    gender: {
        type: String, 
    },
    address: {
        type: String, required: true
    },
    dob: {
        type: String,
    },
    license: {
        type: Number, 
    },
    timings: {
        type: String, 
    },
    route: {
        type: String, 
    }

})
var driverregData = mongoose.model('driver_reg_details', driver_reg_schema)
module.exports = driverregData