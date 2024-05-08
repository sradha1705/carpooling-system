const mongoose = require('mongoose')
const login_table = new mongoose.Schema({
    username: {
        type: String, require: true
    },
   
    password: {
        type: String, require: true
    }, 
    cnpassword: {
        type: String, require: true
    },
    role: {
        type: String, required: true
    },
    status: {
        type: String, required: true
    }
})
var loginData = mongoose.model('login_tb', login_table)
module.exports = loginData