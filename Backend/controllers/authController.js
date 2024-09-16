const bcrypt = require('bcrypt');
const {User} = require("../models/Auth"); 

const { ERRORS } = require("../constants"); 
const ErrorUtils = require("../utils/errorUtils"); 
const AdminAuthHelper = require("../helpers/AuthHelper"); 

const AuthController = module.exports; 

AuthController.signUp = async(req, res) =>{
    try {
        const {firstName, lastName, email, password, purposeOfUse, contactNumber, dob, region} = req.body; 
        let user = await User.findOne({email: email}); 
        if(user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.USER_ALREADY_EXIST)
        }
        
        user = new User({
            firstName, 
            lastName, 
            email, 
            password, 
            purposeOfUse, 
            contactNumber, 
            dob, 
            region
        }); 
        await user.save(); 
        const payload = {
            user: {
                id: user.id, 
                email: user.email
            }
        }
        const userToken = AdminAuthHelper.createJWTToken(payload); 
        return res.status(200).json({
            access_toke: userToken, 
            message: "User Register Successfully"
        });
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}; 
AuthController.login = async(req, res) =>{
    try {
        const {email, password } = req.body; 
        console.log("Req Body :", email)
        if(!email || !password){
            return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST); 
        }
        const user = await User.findOne({email : email}); 
        if(!user){
            return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND)
        }
        //Check password
        const isMatch = await bcrypt.compare(password, user.password); 
        if(!isMatch){
            return ErrorUtils.APIErrorResponse(res, ERRORS.USER_CREDENTIALS_INVALID)
        }
        const payload = {
            user: {
                id: user.id, 
                email: user.email
            }
        }
        const userToken = AdminAuthHelper.createJWTToken(payload); 

        res.cookie('userToken', userToken, {
            httpOnly: true, 
            secure: true, // Set this to true in production (HTTPS)
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        })
        
        res.status(200).json({
            message: "User Login Successfully", 
            token: userToken
        })
    } catch (error) {
        console.log(error); 
        return ErrorUtils.APIErrorResponse(res);
    }
}