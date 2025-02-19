import axios from "axios";
//import { API_BASE_URL } from "@env"; // Import from .env

export const axiosInstance = axios.create({
  baseURL: "https://meo-server.onrender.com/api",
  withCredentials: true,
});
