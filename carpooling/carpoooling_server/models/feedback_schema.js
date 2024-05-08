const mongoose=require('mongoose')
const feedback_schema=new mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    }
})
var feedbackData=mongoose.model('feedback_tb',feedback_schema)
module.exports=feedbackData