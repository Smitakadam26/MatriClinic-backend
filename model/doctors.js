const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
    },
    password : {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    mobileNumber: {
        type:String,
        required:true,
    },
    gender: {
        type:String,
        required:true,
    },
    dateOfBirth: {
        type:String,
        required:true,
    },
    nationality: {
        type:String,
        required:true,
    },
    address: {
        type:String,
        required:true,
    },
    identity: {
        type:Number,
        required:true,
    },
    age: {
        type:Number,
        required:true,
    },
    specialization: {
        type:String,
        required:true,
    },
    qualification: {
        type:String,
        required:true,
    },
    yearofExper: {
        type:Number,
        required:true,
    },
});


module.exports = mongoose.model("Doctor",schema);