require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.get("/",(req,res)=>{
    res.status(200).send("Hello World, Home page");
})

app.get("/about",(req,res)=>{
    res.status(200).send("Zunzo – Everything You Need, One Click Away.");
})
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Backend is Running at http://localhost:${port}`)
})