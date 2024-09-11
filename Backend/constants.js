exports.ERROR = {
    GENERIC_BAD_REQUEST: {
        status_code: 400, 
        message: "Invalid request or query data"
    }, 
    NO_USER_FOUND: {
        status_code: 404, 
        message: "No user found with this email"
    }, 
    USER_CREDENTIALS_INVALID: {
        status_code: 401, 
        message: "User credentials invalid"
    }, 
    USER_ALREADY_EXIST: {
        status_code: 409,
        message: "User already exist"
    }, 
}