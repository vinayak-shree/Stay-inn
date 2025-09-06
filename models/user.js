const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passsportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type : String,
        required : true,
    }
});

// pulgin --> automatically implement username password ---> hashed and salted form
userSchema.plugin(passsportLocalMongoose);
module.exports = mongoose.model("User" , userSchema);