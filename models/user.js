const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        fullname : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
            unique : true,
        },
        id : {
            type : String,
            required : true,
        },
        password : {
            type : String,
            required : true,
        },
        referenceId : {
            type : String,
            required : true,
        },
        donationRaised : {
            type : Number,
            default : 0,
        }
    }
)

const User = mongoose.model("user" , UserSchema);

module.exports = User;