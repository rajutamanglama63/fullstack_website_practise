const mongoose = require("mongoose");
const validator = require("validator");

const visitorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3
    },
    address : {
        type : String,
        required : true,
        minlength : 3
    },
    email : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email");
            }
        }
    },
    phone : {
        type : Number,
        required : true,
        minlength : 10
    },
    message : {
        type : String,
        required : true,
        minlength : 3
    },
})

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;