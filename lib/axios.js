import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://meo-server.onrender.com", // Change this to your backend URL
  baseURL: "http://localhost:5001", // Change this to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});
