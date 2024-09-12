const express = require("express"); 
const rateLimit = require('express-rate-limit');
var router = express.Router(); 

const AuthController = require("../controllers/authController"); 


const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many login attempts, please try again later.'
});

router.post("/signup", AuthController.signUp); 
router.post("/login",loginLimiter, AuthController.login); 

module.exports = router
