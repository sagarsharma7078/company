const mongoose =require("mongoose")
const sagarschema =new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure that each email is unique
    },
    password: {
        type: String,
        required: true
    },
   
})

module.exports=mongoose.model("sagar",sagarschema)