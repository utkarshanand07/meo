import axios from "axios";
//import { API_BASE_URL } from "@env"; // Import from .env

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});
