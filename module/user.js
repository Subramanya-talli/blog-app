const { string } = require("i/lib/util");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        typeof:String,
        required: true
    },
    email: {
        typeof:String,
        required: true,
        unique: true,
    },

    password: {
        typeof: String,
        required: true,
    },
})