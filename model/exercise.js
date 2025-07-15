const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Exercise",schema);