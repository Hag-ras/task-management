import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks/";

// Helper to get the auth token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { "x-auth-token": token } : {};
};

const getTasks = () => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

const createTask = (taskData) => {
  return axios.post(API_URL, taskData, { headers: getAuthHeaders() });
};

const updateTask = (id, taskData) => {
  return axios.put(API_URL + id, taskData, { headers: getAuthHeaders() });
};

const deleteTask = (id) => {
  return axios.delete(API_URL + id, { headers: getAuthHeaders() });
};

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
