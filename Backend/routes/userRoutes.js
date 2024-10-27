var express = require('express'); 
var router = express.Router();  

const UserController = require("../controllers/userController"); 
const AdminAuthHelper = require("../helpers/AuthHelper")

let validateToken = AdminAuthHelper.validateToken; 

router.get("/userInfo", validateToken, UserController.HomePageInfo); 

module.exports = router
