import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";
const api = axios.create({
    baseURL:BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
  
    // Don't add token for registration or login routes
    if (
      token &&
      !config.url.includes("/auth/users/") &&
      !config.url.includes("/auth/jwt/create/")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  });

export default api;