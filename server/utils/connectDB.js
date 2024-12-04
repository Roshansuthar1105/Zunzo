const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const connectDB = async () => {
  console.log("Trying to connect to mongoDB")
  try {
    await mongoose.connect(uri);
    console.log("Successfully Connected to mongodb");
  } catch (error) {
    console.log("Connection Failed");
    process.exit(0);
  }
};

module.exports =  connectDB ;
