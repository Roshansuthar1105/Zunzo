const Contact = require("../models/contactModel.js");
const contactController = async (req,res)=>{
    try {
        const data = req.body;
        const dataSent = await Contact.create(data);
        console.log(dataSent);
        if(dataSent){
            res.status(200).json({"message":`message sent successfully !`});
        }else{
            res.status(400).json({"message":`message not sent !`});
        }
    } catch (error) {
        res.status(500).json({"message":"Internal Server Error !"});
    }
}
module.exports = contactController;