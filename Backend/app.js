const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express(); 
const PORT = process.env.PORT || 8080; 

const mongoUri = process.env.DATABASE; 
mongoose.set("strictQuery", false); 
mongoose.connect(mongoUri, {serverSelectionTimeoutMS: 5000})
.then(()=>{
    c
}); 

//Import Routes 

const authRoutes = require("./routes/authRoutes"); 
const taskRoutes = require("./routes/taskRoutes"); 
const profileRoute = require("./routes/profileRoutes"); 
const userRoutes = require("./routes/userRoutes"); 

//Use Routes
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(cookieParser());  

app.use("/api/v1", authRoutes);
app.use("/api/v1", taskRoutes);
app.use("/api/v1", profileRoute);
app.use("/api/v1", userRoutes);

app.listen(PORT,()=> console.log("Server is running on port : " + PORT)); 

module.exports = app;





