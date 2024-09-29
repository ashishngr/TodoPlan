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
    }
}