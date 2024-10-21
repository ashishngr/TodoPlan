exports.ERRORS = {
    GENERIC_BAD_REQUEST: {
        status_code: 400, 
        message: "Invalid Request Or Query Data"
    }, 
    NO_USER_FOUND: {
        status_code: 404, 
        message: "No User Found"
    }, 
    USER_CREDENTIALS_INVALID: {
        status_code: 401, 
        message: "User Credentials Invalid"
    }, 
    USER_ALREADY_EXIST: {
        status_code: 409,
        message: "User Already Exist"
    }, 
    NO_TASK_FOUND : {
        status_code: 404, 
        message: "No Task Found"
    }, 
    INCORRECT_PASSWORD : {
        status_code : 400, 
        message : "Incorrect password"
    }, 
    INVITEE_ALREADY_EXISTS : {
        status_code : 400, 
        message : "Invitee already exists"
    }, 
    INVITEE_NOT_FOUNT : {
        status_code : 404, 
        message : "Invitee not found or you don't have permission to delete this invitee"
    }, 
    INVITATION_NOT_FOUND : {
        status_code : 404, 
        message : "invitation not found"
    }, 
    USER_HAS_NO_INIVITATION : {
        status_code : 404, 
        message : "User has no invitation"
    }, 
    INVALID_SUTASK_STATUS :{
        status_code : 400, 
        message : "Invalid subtask status value"
    }, 
    NO_SUBTASK_FOUND : {
        status_code : 404, 
        message : "Subtask not found"
    }

}