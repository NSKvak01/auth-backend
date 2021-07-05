
// First we bring mongoose
const mongoose = require("mongoose")
// Then we create userSchema including fistName, lastName, username, email, password
const userSchema = new mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type:String
    },
    username:{
        type: String,
        unique:true
    },
    email:{
        type: String,
        unique:true
    },
    password:{
        type:String,
    }
})

// Then export userSchema and name mongoDB database "user"
module.exports = mongoose.model("user", userSchema)