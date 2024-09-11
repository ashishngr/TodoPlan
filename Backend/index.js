const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require("dotenv").config()

const app = express(); 
const PORT = process.env.PORT || 8080; 
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser"); 
const cors = require("cors");   

const mongoUri = process.env.DATABASE; 
mongoose.set("strictQuery", false); 
mongoose.connect(mongoUri)
.then(()=>{
     console.log("MongoDB Database connected")
    }).catch((error)=>{
        console.error('Error connecting to MongoDB:', error);
}); 

//Import Routes 
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(cookieParser()); 

//Use Routes
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(cookieParser());  

app.listen(PORT,()=> console.log("Server is running on port : " + PORT))

