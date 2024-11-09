import axios from "axios";

const StorageUtils = require("./storageUtils");
let API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

const getHeadersWithToken = () => {
  let token = StorageUtils.getAPIToken();
  StorageUtils.getAPIToken();
  console.log("Token from storage", token);
  return {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token, // Ensure the header is 'x-auth-token'
    },
  };
};
const API = {
  login: async (payload) => {
    console.log("login api");
    return await axios.post(`${API_BASE_URL}/api/v1/login`, payload);
  },
  signup: async (payload) => {
    return await axios.post(`${API_BASE_URL}/api/v1/signup`, payload);
  },
  
  createTask: async (payload) => {
    console.log("Payload");
    return await axios.post(
      `${API_BASE_URL}/api/v1/task`,
      payload,
      getHeadersWithToken()
    );
  },
  getUserProfile: async () => {
    return await axios.get(
      `${API_BASE_URL}/api/v1/basicDetails`,
      getHeadersWithToken()
    );
  },
  updateUserProfile: async (payload) => {
    console.log(payload);
    return await axios.post(
      `${API_BASE_URL}/api/v1/basicDetails`,
      payload,
      getHeadersWithToken()
    );
  },
  updatePassword: async (payload) => {
    return await axios.post(
      `${API_BASE_URL}/api/v1/updatePassowrd`,
      payload,
      getHeadersWithToken()
    );
  },
  addInvitee: async (payload) => {
    return await axios.post(
      `${API_BASE_URL}/api/v1/sendInvitaion`,
      payload,
      getHeadersWithToken()
    );
  },
  getInactiveInvitees: async () => {
    return await axios.get(
      `${API_BASE_URL}/api/v1/invitees/status`,
      getHeadersWithToken()
    );
  },
  getInvitees: async () => {
    return await axios.get(
      `${API_BASE_URL}/api/v1/invitees`,
      getHeadersWithToken()
    );
  },
  deleteInvitee: async (id, payload) => {
    return await axios.put(
      `${API_BASE_URL}/api/v1/invitees/${id}`,
      payload,
      getHeadersWithToken()
    );
  },
  createManualTask: async (payload) => {
    return axios.post(
      `${API_BASE_URL}/api/v1/task/manual`,
      payload,
      getHeadersWithToken()
    );
  },
  getAllTask: async (params) => {
    const taskType = params.params.taskType
    console.log("^^^^^^^^^^^^^^^^^^", taskType)
    return axios.get(`${API_BASE_URL}/api/v1/task?taskType=${taskType}`, getHeadersWithToken());
  },
  getManualTask: async (id) => {
    return axios.get(
      `${API_BASE_URL}/api/v1/task/${id}`,
      getHeadersWithToken()
    );
  },
  getInvitations: async () => {
    return axios.get(
      `${API_BASE_URL}/api/v1/invitations`,
      getHeadersWithToken()
    );
  },
  acceptInvitation: async (invitationId, payload) => {
    return axios.post(
      `${API_BASE_URL}/api/v1/invitation/${invitationId}/accept`,
      payload,
      getHeadersWithToken()
    );
  },
  rejectInvitation: async (invitationId, payload) => {
    return axios.post(
      `${API_BASE_URL}/api/v1/${invitationId}/reject`,
      payload,
      getHeadersWithToken()
    );
  },
  getAcceptedInvitations: async () => {
    return axios.get(
      `${API_BASE_URL}/api/v1/accepted-invitations`,
      getHeadersWithToken()
    );
  },
  updateManualTaskBasicInfo: async (taskId, payload) => {
    return axios.put(
      `${API_BASE_URL}/api/v1/manualTask/${taskId}`,
      payload,
      getHeadersWithToken()
    );
  },
  addSubTask: async (taskId, payload) => {
    return axios.post(
      `${API_BASE_URL}/api/v1/task/${taskId}/subtask`,
      payload,
      getHeadersWithToken()
    );
  },
  getSubTasks: async (taskId) => {
    return axios.get(
      `${API_BASE_URL}/api/v1/subtask/${taskId}`,
      getHeadersWithToken()
    );
  },
  deleteSubtask: async (taskId, subTaskId) => {
    return axios.delete(
      `${API_BASE_URL}/api/v1/task/${taskId}/subTask/${subTaskId}`,
      getHeadersWithToken()
    );
  },
  updateSubTaskStatus: async (taskId, subTaskId, payload) => {
    return await axios.put(
      `${API_BASE_URL}/api/v1/task/${taskId}/subTask/${subTaskId}/status`,
      payload,
      getHeadersWithToken()
    );
  },
  getAtivityData: async (taskId) => {
    return await axios.get(
      `${API_BASE_URL}/api/v1/activity/${taskId}`,
      getHeadersWithToken()
    );
  },
  addComment: async (taskId, payload) => {
    return await axios.post(
      `${API_BASE_URL}/api/v1/task/${taskId}/comment`,
      payload,
      getHeadersWithToken()
    );
  },
  getComments: async (taskId) => {
    return await axios.get(
      `${API_BASE_URL}/api/v1/task/${taskId}/comment`,
      getHeadersWithToken()
    );
  },
  getUserHomePageInfo : async() =>{
    return await axios.get(`${API_BASE_URL}/api/v1/userInfo`, getHeadersWithToken());
  }
};

export default API;
