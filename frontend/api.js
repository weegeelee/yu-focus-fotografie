import axios from "axios";

const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000" 
  : "https://yu-focus-fotografie.onrender.com";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      console.log("Request headers:", config.headers);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default api;