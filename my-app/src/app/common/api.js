import axios from 'axios'; 

const StorageUtils = require("./storageUtils"); 
let API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080"; 

const getHeadersWithToken = () => {
    let token = StorageUtils.getAPIToken(); 
    StorageUtils.getAPIToken();
    console.log("Token from storage", token); 
    return {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token // Ensure the header is 'x-auth-token'
        }
    };
}
const API = {
    login : async (payload) => {
        console.log("login api")
        return await axios.post(`${API_BASE_URL}/api/v1/login`, payload); 
    },
    signup : async (payload) => {
        return await axios.post(`${API_BASE_URL}/api/v1/signup`, payload)
    }, 
    createTask : async(payload) =>{
        console.log("Payload"); 
        return await axios.post(`${API_BASE_URL}/api/v1/task`, payload, getHeadersWithToken()); 
    }, 
    getUserProfile : async() =>{
        return await axios.get(`${API_BASE_URL}/api/v1/basicDetails`, getHeadersWithToken());
    }
}
export default API; 
