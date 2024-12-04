require('dotenv').config(); // to access .env variables
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectDB.js");
const errorMiddleware = require('./middlewares/errorMiddleware.js');
const authRouter = require("./routes/authRoute.js");
const contactRouter = require("./routes/contactRouter.js");
const adminRoute = require("./routes/adminRoute.js");
const productRoute = require("./routes/productRoute.js");

const app = express();
// use cors to give access
const frontendUrl = process.env.FRONTEND_URI || "http://localhost:5173"
const corsOptions ={
    origin:frontendUrl,
    methods:"GET, POST, DELETE, PUT, PATCH, HEAD",
    credentials:true
}
app.use(cors(corsOptions));
// it is a middleware that parse the data into json type
app.use(express.json()); // to get json data in all over the application

app.get("/",(req,res)=>{
    res.status(200).send("Server is ready to use");
})
app.use("/api/auth",authRouter);
app.use("/api/contact",contactRouter);
app.use("/api/admin",adminRoute);
app.use("/api/products",productRoute);
// use error middleware at the bottom most position
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
connectDB().then(()=>app.listen(port,()=>{
    console.log(`Backend is Running`)
}))