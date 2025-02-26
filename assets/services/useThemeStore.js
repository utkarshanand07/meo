import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useThemeStore = create((set) => ({
  theme: "light", // Default theme

  loadTheme: async () => {
    try {
      const storedTheme = await AsyncStorage.getItem("chat-theme");
      if (storedTheme) {
        set({ theme: storedTheme });
      }
    } catch (error) {
      console.error("Failed to load theme", error);
    }
  },

  setTheme: async (theme) => {
    try {
      await AsyncStorage.setItem("chat-theme", theme);
      set({ theme });
    } catch (error) {
      console.error("Failed to save theme", error);
    }
  },
}));