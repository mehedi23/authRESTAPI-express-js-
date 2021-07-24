const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        min : 6 ,
        max : 100
    },
    email : {
        type : String ,
        required : true ,
        max : 200
    },
    password : {
        type : String ,
        required : true ,
        min : 6 ,
        max : 100
    },
    date : {
        type : Date ,
        default : Date.now
    }
})

module.exports = mongoose.models.User || mongoose.model( 'User' , userShema )