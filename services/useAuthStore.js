import { create } from "zustand";
import { authService } from "../services/authService"; // Import API service
import { io } from "socket.io-client";

const BASE_URL = "https://meo-server.onrender.com"; // Adjust if needed

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  /** Check if user is authenticated */
  checkAuth: async () => {
    try {
      const user = await authService.checkAuth();
      set({ authUser: user });
      get().connectSocket(); // Auto-connect socket
    } catch (error) {
      console.error("CheckAuth Error:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  /** Signup */
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const user = await authService.signup(data);
      set({ authUser: user });
      get().connectSocket();
    } catch (error) {
      console.error("Signup Error:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  /** Login */
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const user = await authService.login(data);
      set({ authUser: user });
      get().connectSocket();
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  /** Logout */
  logout: async () => {
    try {
      await authService.logout();
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  },

  /** Update Profile */
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const user = await authService.updateProfile(data);
      set({ authUser: user });
    } catch (error) {
      console.error("Update Profile Error:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  /** Connect to WebSocket */
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, { query: { userId: authUser._id } });
    newSocket.connect();

    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  /** Disconnect WebSocket */
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
