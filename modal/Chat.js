const mongoose  = require("mongoose")

const chatSchema = mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


module.exports = mongoose.model("chat" , chatSchema)