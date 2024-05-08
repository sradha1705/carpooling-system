const mongoose=require('mongoose')
const paths= new mongoose.Schema({
    origin:{
        type:String,required:true 
    },
    destination:{
        type:String,required:true 
    },
    via:{
        type:String,required:true 
    }
    
})
var pathData= mongoose.model('path_tb',paths)
module.exports=pathData