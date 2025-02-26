import { create } from "zustand";
import { axiosInstance } from "../../app/lib/axios";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Constants from "expo-constants";

const SOCKET_URL = "http://localhost:5001";
// const BASE_URL =
//   Constants.expoConfig?.extra?.API_BASE_URL || "http://localhost:5001";
const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      await AsyncStorage.setItem("authUser", JSON.stringify(res.data));

      console.log("checking auth:", res.data);
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
      await AsyncStorage.removeItem("authUser");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      await AsyncStorage.setItem("authUser", JSON.stringify(res.data));

      console.log("user signed up:", res.data);
      Alert.alert("Success", "Account created successfully");
      get().connectSocket();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      await AsyncStorage.setItem("authUser", JSON.stringify(res.data));
      
      console.log("user logged in:", res.data);
      Alert.alert("Success", "Logged in successfully");
      get().connectSocket();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      await AsyncStorage.removeItem("authUser");
      
      console.log("user logged out");
      Alert.alert("Success", "Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      await AsyncStorage.setItem("authUser", JSON.stringify(res.data));

      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      Alert.alert("Error", error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
  
    const socket = io(SOCKET_URL, {
      query: { userId: authUser._id },
    });
  
    socket.connect();
    console.log("Attempting to connect socket...");
  
    socket.on("connect", () => {
      console.log("✅ Socket connected successfully! ID:", socket.id);
    });
  
    socket.on("connect_error", (error) => {
      console.log("❌ Socket connection error:", error);
    });
  
    set({ socket });
  },
  
}));
