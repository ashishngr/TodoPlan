const StorageUtils = module.exports ; 

const STORAGE_KEYS = {
    ACCESS_TOKEN : "access_token", 
    USER_PROFILE : "user_profile"
}
StorageUtils.getAPIToken = () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN); 
StorageUtils.setAPIToken = (token) => localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token); 
StorageUtils.getUserProfile = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_PROFILE))
    } catch (error) {
        return null; 
    }   
}
StorageUtils.setUserProfile = (user) => {
    if(user){
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user))
    }
}
StorageUtils.removeAll = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN); 
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
}