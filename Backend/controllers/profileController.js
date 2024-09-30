const { User } = require("../models/Auth");
const {Invitee} = require("../models/InviteeSchema")
const { ERRORS } = require("../constants");
const ErrorUtils = require("../utils/errorUtils");
const bcrypt = require('bcrypt');


const ProfileController = module.exports;

ProfileController.getUserBasicInfomation = async (req, res) => {
  // basic information will contain first name, last name, email, phone number, region, bate of birth
  const userId = req.user.id;

  try {
    const basicDetails = await User.findById(userId)
      .select("firstName lastName email contactNumber region dob") // Specify only the required fields
      .lean(); // Return a plain JS object for better performance

    if (!basicDetails) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }

    res.status(200).json( {basicDetails} );
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res)
  }
};
ProfileController.updateBasicInformation = async(req, res) =>{
  try {
    const { firstName, lastName, email, contactNumber, region, dob } = req.body;
    if (!firstName || !lastName || !email || !contactNumber || !dob) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
    }
    const userId = req.user.id; 
    const user = await User.findById(userId); 
    if(!user){
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND)
    }
    //Update user
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.contactNumber = contactNumber || user.contactNumber;  // Update if provided
    user.region = region || user.region;  // Update if provided
    user.dob = dob || user.dob;  // Update if provided
    // Save the updated user profile
    await user.save();

    // Respond with the updated user profile
    return res.status(200).json({
      message: "User information updated successfully.",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNumber: user.contactNumber,
        region: user.region,
        dob: user.dob,
      },
    });

  } catch (error) {
    console.log(error); 
    return ErrorUtils.APIErrorResponse(res)
  }
}
ProfileController.updatePassword = async(req, res) =>{
  try {
    const {currentPassword , newPassword} = req.body; 
    const userId = req.user.id; 
    if(!currentPassword && !newPassword){
        return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
    }
    const user = await User.findById(userId); 
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if(!isPasswordMatch){
      return ErrorUtils.APIErrorResponse(res, ERRORS.INCORRECT_PASSWORD)
    }
    user.password = newPassword; 
    await user.save(); 
    return res.status(200).json({
      message: 'Password updated successfully!',
    })
  } catch (error) {
    console.log(error); 
    return ErrorUtils.APIErrorResponse(res)
  }
}; 
//TODO : CONTROLLER TO SEND INVITATION 
ProfileController.senInvitee = async(req, res) =>{
  try {
    const {firstName, lastName, email} = req.body; 
    const userId = req.user.id; 
    if(!firstName || !lastName || !email){
        return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST)
    }
    const user = await User.findById(userId); 
    if(!user){
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND); 
    }

    // Check if invitee already exists
    const invitees = await Invitee.findOne({email}); 
    if(invitees){
      return ErrorUtils.APIErrorResponse(res, ERRORS.INVITEE_ALREADY_EXISTS)
    }
    const newInvitee = new Invitee({
      firstName : firstName,
      lastName : lastName, 
      email : email, 
      invitedBy: user._id,
      status : 'Pending'
    })
    await newInvitee.save();
    return res.status(200).json({
      message : "Send Invitation succesfully"
    })
  } catch (error) {
    console.log(error); 
    return ErrorUtils.APIErrorResponse(res); 
  }
}

//TODO : CONTROLLER TO GET ALL INVITEE 
//TODO : CONTROLLER TO GET ALL PENDING INVITEE 
//TODO : CONTROLLER TO REMOVE INVITEE 