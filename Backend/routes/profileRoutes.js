var express = require('express'); 
var router = express.Router();  

const ProfileController = require("../controllers/profileController"); 
const AdminAuthHelper = require("../helpers/AuthHelper")

let validateToken = AdminAuthHelper.validateToken; 

router.get("/basicDetails", validateToken, ProfileController.getUserBasicInfomation);
router.post("/basicDetails", validateToken, ProfileController.updateBasicInformation);
router.post("/updatePassowrd", validateToken, ProfileController.updatePassword); 


module.exports = router
