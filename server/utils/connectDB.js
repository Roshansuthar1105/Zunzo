const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Successfully Connected to mongodb");
  } catch (error) {
    console.log("Connection Failed: ",error);
    process.exit(0);
  }
};

module.exports =  connectDB ;
