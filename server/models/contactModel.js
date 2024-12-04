const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
    username:{type:String , require: true},
    email:{type:String , require: true},
    message:{type:String , require: true},
    createdAt:{type:Date , default:Date.now()}
})
const Contact= mongoose.model("Contact",contactSchema);
module.exports = Contact;