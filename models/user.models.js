const mongoose = require("mongoose")

/**
 * We will be creating the user schema
 */

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : Number,
        required : false,
        unique : true
    },
    userType : {
        type : String,
        required : true,
        default : "CUSTOMER",
        enum : ["CUSTOMER", "ADMIN"]
    }
}, {timestamps : true, versionKey : false})

module.exports = mongoose.model("User", userSchema)