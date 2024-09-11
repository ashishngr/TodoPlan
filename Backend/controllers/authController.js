const {User} = require("../models/Auth"); 

const {ERRORS} = require("../constants"); 
const ErrorUtils = require("../utils/errorUtils"); 
const AdminAuthHelper = require("../helpers/AuthHelper"); 

const AuthController = module.exports; 

AuthController.SignUp = async(req, res) =>{
    try {
        const {firstName, lastName, email, password, purpose, contactNumber, dob, region} = req.body; 
        let user = await User.findOne({email: email}); 
        if(user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.USER_ALREADY_EXIST); 
        }
        user = new User({
            firstName, 
            lastName, 
            email, 
            password, 
            purpose, 
            contactNumber, 
            dob, 
            region
        }); 
        await user.save(); 
        const payload = {
            user: {
                id: adminUser.id
            }
        }
        const userToken = AdminAuthHelper.createJWTToken(payload); 
        return res.status(200).json({
            access_toke: accessToken, 
            message: "User Register Successfully"
        });
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}