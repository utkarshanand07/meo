import axios from "axios";

const API_URL = "https://meo-server.onrender.com";

export const signup = async (fullName, email, password) => {
    try {
      console.log("Signing up with:", { fullName, email, password }); // Debug
  
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        fullName,
        email,
        password,
      });
  
      console.log("Signup successful:", response.data); // Debug
      return response.data;
    } catch (error) {
      console.error("Signup Error:", error.response ? error.response.data : error);
  
      // Check if error.response exists to prevent crashing
      throw error.response ? error.response.data : "Unknown error occurred";
    }
  };
  

export const login = async (email, password) => {
    try {
      console.log("Logging in with:", email, password); // Debugging
  
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
  
      console.log("Login Success:", response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error);
      throw error.response ? error.response.data : "Unknown error occurred";
    }
  };
  

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/logout`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};