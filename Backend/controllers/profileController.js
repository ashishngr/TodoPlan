const { User } = require("../models/Auth");
const { ERRORS } = require("../constants");
const ErrorUtils = require("../utils/errorUtils");


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
  }
};
