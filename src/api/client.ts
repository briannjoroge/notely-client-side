import axios from "axios";

const axiosWithAuth = axios.create({
  baseURL: "https://notely-server-2.onrender.com/api",
});

axiosWithAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosWithAuth;
