import axios from "axios";

const API_URL = "https://meo-server.onrender.com";

export const authService = {
  /**
   * Check Authentication Function
   * @returns {Promise<any>}
   */
  checkAuth: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/check`);
      console.log("Check Auth successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Check Auth Error:", error.response ? error.response.data : error);
      throw error.response ? error.response.data : "Unknown error occurred";
    }
  },

  /**
   * Signup Function
   * @param {Object} data - { fullName, email, password }
   * @returns {Promise<any>}
   */
  signup: async (data) => {
    try {
      console.log("Signing up with:", data); // Debugging

      const response = await axios.post(`${API_URL}/api/auth/signup`, data);

      console.log("Signup successful:", response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error("Signup Error:", error.response ? error.response.data : error);
      
      throw error.response ? error.response.data : "Unknown error occurred";
    }
  },

  /**
   * Login Function
   * @param {Object} data - { email, password }
   * @returns {Promise<any>}
   */
  login: async (data) => {
    try {
      console.log("Logging in with:", data); // Debugging

      const response = await axios.post(`${API_URL}/api/auth/login`, data);

      console.log("Login Success:", response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error);
      
      throw error.response ? error.response.data : "Unknown error occurred";
    }
  },

  /**
   * Logout Function
   * @returns {Promise<any>}
   */
  logout: async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/logout`);
      console.log("Logout successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Logout Error:", error.response ? error.response.data : error);
      throw error.response ? error.response.data : "Unknown error occurred";
    }
  },

  /**
   * Update Profile Function
   * @param {Object} data - Profile data to update
   * @returns {Promise<any>}
   */
  updateProfile: async (data) => {
    try {
      const response = await axios.put(`${API_URL}/api/auth/update-profile`, data);
      console.log("Profile updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Update Profile Error:", error.response ? error.response.data : error);
      throw error.response ? error.response.data : "Unknown error occurred";
    }
  },
};


// import axios from "axios";

// const API_URL = "https://meo-server.onrender.com";

// export const authService = {
//   checkAuth: async () => {
//     const response = await axios.get(`${API_URL}/api/auth/check`);
//     return response.data;
//   },

//   signup: async (data) => {
//     const response = await axios.post(`${API_URL}/api/auth/signup`, data);
//     return response.data;
//   },

//   login: async (data) => {
//     const response = await axios.post(`${API_URL}/api/auth/login`, data);
//     return response.data;
//   },

//   logout: async () => {
//     const response = await axios.post(`${API_URL}/api/auth/logout`);
//     return response.data;
//   },

//   updateProfile: async (data) => {
//     const response = await axios.put(`${API_URL}/api/auth/update-profile`, data);
//     return response.data;
//   },
// };
