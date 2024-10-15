var express = require('express'); 
var router = express.Router();  

const ProfileController = require("../controllers/profileController"); 
const AdminAuthHelper = require("../helpers/AuthHelper")

let validateToken = AdminAuthHelper.validateToken; 

router.get("/basicDetails", validateToken, ProfileController.getUserBasicInfomation);
router.post("/basicDetails", validateToken, ProfileController.updateBasicInformation);
router.post("/updatePassowrd", validateToken, ProfileController.updatePassword); 
router.post("/sendInvitaion", validateToken, ProfileController.senInvitee); 
router.get("/invitees", validateToken, ProfileController.getAllInvitees); 
router.get("/invitees/status", validateToken, ProfileController.getInviteesByStatus)
router.put("/invitees/:id", validateToken, ProfileController.DeleteInvitee);
router.get("/invitations", validateToken, ProfileController.getInvitation);
router.post("/invitation/:invitationId/accept", validateToken, ProfileController.acceptInvitation); 
router.post("/invitation/:invitationId/reject", validateToken, ProfileController.rejectInvitation);
router.get("/accepted-invitations", validateToken, ProfileController.getAcceptedInvitations);
module.exports = router
