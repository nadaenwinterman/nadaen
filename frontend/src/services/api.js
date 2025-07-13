import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // Use environment variable
  withCredentials: true, // If using cookies/session auth
});

// Optional: Add interceptors for tokens
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Changed from "access_token" to "token" to match AuthContext
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
