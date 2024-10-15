const { User } = require("../models/Auth");
const { Invitee } = require("../models/InviteeSchema");
const { ERRORS } = require("../constants");
const ErrorUtils = require("../utils/errorUtils");
const bcrypt = require("bcrypt");

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

    res.status(200).json({ basicDetails });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
ProfileController.updateBasicInformation = async (req, res) => {
  try {
    const { firstName, lastName, email, contactNumber, region, dob } = req.body;
    if (!firstName || !lastName || !email || !contactNumber || !dob) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
    }
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    //Update user
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.contactNumber = contactNumber || user.contactNumber; // Update if provided
    user.region = region || user.region; // Update if provided
    user.dob = dob || user.dob; // Update if provided
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
    return ErrorUtils.APIErrorResponse(res);
  }
};
ProfileController.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    if (!currentPassword && !newPassword) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
    }
    const user = await User.findById(userId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatch) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.INCORRECT_PASSWORD);
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
//TODO : CONTROLLER TO SEND INVITATION
ProfileController.senInvitee = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userId = req.user.id;
    if (!firstName || !lastName || !email) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.GENERIC_BAD_REQUEST);
    }
    const user = await User.findById(userId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }

    // Check if invitee already exists
    const invitees = await Invitee.findOne({ email });
    if (invitees) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.INVITEE_ALREADY_EXISTS);
    }
    const invitedUser = await User.findOne({ email }); 
    if(!invitedUser){
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const fullName = `${user.firstName}${user.lastName}` 

    const newInvitee = new Invitee({
      firstName: firstName,
      lastName: lastName,
      email: email,
      senderName : fullName,
      invitedBy: user._id,
      invitedUserId : invitedUser._id,
      status: "Pending",
      expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await newInvitee.save();
    return res.status(200).json({
      message: "Send Invitation succesfully",
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
// TODO : CONTROLLER TO RECEIVE INVITATION INFORMATION
ProfileController.getInvitation = async(req, res) =>{
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId); 
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const invitations = await Invitee.find({
      invitedUserId: user._id, 
      status: "Pending" 
    }); 
    if(!invitations){
      return res.status(200).json({
        message : "You do not have any invitations"
      })
    }
    return res.status(200).json({
      message : "invitations found successfully", 
      invitations : invitations
    })
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
}
// TODO : CONTROLLER TO GET ACCEPTED INVITAION
ProfileController.getAcceptedInvitations = async(req, res) =>{
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId); 
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
     // Fetch invitations with status "Accepted" for the logged-in user
     const acceptedInvitations = await Invitee.find({ 
      invitedUserId: user._id, 
      status: "Accepted" 
    }).populate('invitedBy', 'firstName lastName email'); 

    if (!acceptedInvitations || acceptedInvitations.length === 0) {
      return res.status(200).json({
        message: "No accepted invitations found",
      });
    }
    return res.status(200).json({
      message: "Accepted invitations found successfully", 
      invitations: acceptedInvitations,
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
}
//TODO : CONTROLLER TO ACCEPT INVITATION
ProfileController.acceptInvitation = async(req, res) =>{
  try {
    const userId = req.user.id;
    const { invitationId } = req.params; 
    // Find the invitation by ID
    const invitee = await Invitee.findById(invitationId); 
    if (!invitee) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.INVITATION_NOT_FOUND);
    }
    if (invitee.invitedUserId.toString() !== userId) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.USER_HAS_NO_INIVITATION);
    }
    // Update the invitation status to "Accepted"
    invitee.status = "Accepted";
    invitee.statusLog.push({ status: "Accepted" });
    await invitee.save();
    return res.status(200).json({
      message: "Invitation accepted successfully.",
      invitee,
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
}

//TODO : CONTROLLER TO REJECT INVITATION
ProfileController.rejectInvitation = async(req, res) =>{
  try {
    const { invitationId } = req.params;
    const userId = req.user.id; 
    // Find the invitation by ID
    const invitee = await Invitee.findById(invitationId);
    if (!invitee) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.INVITATION_NOT_FOUND);
    }
    // Check if the user rejecting is the invited user
    if (invitee.invitedUserId.toString() !== userId) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.USER_HAS_NO_INIVITATION);
    }
    // Update the invitation status to "Rejected"
    invitee.status = "Rejected";
    invitee.statusLog.push({ status: "Rejected" });

    await invitee.save();
    return res.status(200).json({
      message: "Invitation rejected successfully.",
      invitee,
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
}
//TODO : CONTROLLER TO GET ALL INVITEE
ProfileController.getAllInvitees = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const invitees = await Invitee.find({
      invitedBy: user._id,
      status: "Accepted",
    });
    res.status(200).json({ invitees });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
//TODO : CONTROLLER TO GET ALL NON ACCEPTED STATUS INVITEES
ProfileController.getInviteesByStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const statuses = ["Draft", "Pending", "Rejected", "Resent", "Expired", "Deleted"];
    const invitees = await Invitee.find({
      invitedBy: user._id,
      status: { $in: statuses },
    });
    return res.status(200).json({
      invitees,
    });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
//TODO : CONTROLLER TO REMOVE INVITEE
ProfileController.DeleteInvitee = async (req, res) => {
  console.log("We are here")
  try {
    const inviteeId = req.params.id;
    console.log("invit id", inviteeId)
    const currentUserId = req.user.id;
    const user = await User.findById(currentUserId);
    if (!user) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.NO_USER_FOUND);
    }
    const invitee = await Invitee.findOne({
      _id: inviteeId,
      invitedBy: currentUserId,
    });
    if (!invitee) {
      return ErrorUtils.APIErrorResponse(res, ERRORS.INVITEE_NOT_FOUNT);
    }
    invitee.status = "Deleted";
    await invitee.save();

    return res.status(200).json({ maeeage: "Invitee status changed to 'Deleted' successfully" });
  } catch (error) {
    console.log(error);
    return ErrorUtils.APIErrorResponse(res);
  }
};
