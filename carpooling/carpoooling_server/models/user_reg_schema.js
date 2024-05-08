const mongoose = require('mongoose')
const user_reg_schema = new mongoose.Schema({
    loginid: {
        type: mongoose.Types.ObjectId, ref: 'login_tb'
    },
    phone: {
        type: Number, required: true
    },
    email: {
        type: String
    },
    gender: {
        type: String,
    },
    address: {
        type: String, required: true
    }

})
var userregData = mongoose.model('user_tb', user_reg_schema)
module.exports = userregData